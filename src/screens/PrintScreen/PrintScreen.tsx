import GButton from '@/components/shared/GButton/GButton';
import TextFont from '@/components/shared/TextFont/TextFont';
import { useGetInvoice } from '@/providers/redux/hooks/invoiceHooks';
import { useConnectPrinter } from '@/providers/redux/hooks/printHooks';
import {
  countInvoiceTotal,
  formatDate,
  getPrinterColumnWidth,
  priceFormatter,
} from '@/utils/shared';
import { useLocalSearchParams } from 'expo-router';
import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  BLEPrinter,
  COMMANDS,
  ColumnAlignment,
} from 'react-native-thermal-receipt-printer-image-qr';

import BarcodeSvg from 'react-native-barcode-svg';
interface PrintDataItem {
  type: 'text' | 'image' | 'table';
  content: string | string[][];
  tableOptions?: {
    header: string[];
    columnWidth: number[];
    columnAlignment: ColumnAlignment[];
    columnStyle: string[];
  };
}
const PrintScreen = () => {
  let barcodeRef = useRef<any>(null);
  const { invoiceNo } = useLocalSearchParams<{ invoiceNo: string }>();
  const { invoice, total } = useGetInvoice(invoiceNo);

  const { connectedDevice } = useConnectPrinter();
  console.log('connected device', connectedDevice);

  const getData = () => {
    const BOLD_ON = COMMANDS.TEXT_FORMAT.TXT_BOLD_ON;
    const BOLD_OFF = COMMANDS.TEXT_FORMAT.TXT_BOLD_OFF;
    const CENTER = COMMANDS.TEXT_FORMAT.TXT_ALIGN_CT;
    const OFF_CENTER = COMMANDS.TEXT_FORMAT.TXT_ALIGN_LT;

    const line: PrintDataItem = {
      type: 'text',
      content: `${CENTER}${COMMANDS.HORIZONTAL_LINE.HR3_58MM}${CENTER}`,
    };

    const data: PrintDataItem[] = [
      {
        type: 'text',
        content: `${CENTER}${BOLD_ON} NAMA TOKO ${BOLD_OFF}\n`,
      },
      {
        type: 'text',
        content: `Invoice no. : ${invoiceNo}\n`,
      },
      {
        type: 'text',
        content: `Date : ${formatDate(invoice?.date!)}\n`,
      },
      line,
      {
        type: 'table',
        content: [
          ...Object.values(invoice?.items || {})
            .map((i) => {
              return [
                [
                  `${i.quantity}x ${i.productUnit} ${i.productBrand} ${i.productName}`,
                ],
                [
                  `@ ${priceFormatter(i.productPricePerUnit)}`,
                  `${priceFormatter(i.productPricePerUnit * i.quantity)}`,
                ],
              ];
            })
            .flat(),
          ['Total', `${countInvoiceTotal(invoice!)}`],
        ],
        tableOptions: {
          header: ['Product\nUnit', 'Price'],
          columnWidth: getPrinterColumnWidth([50, 50]),
          columnAlignment: [ColumnAlignment.LEFT, ColumnAlignment.RIGHT],
          columnStyle: ['', ''],
        },
      },
      line,
    ];

    return data;
  };

  const awaitPrint = (printFunc: () => void) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        printFunc();
        resolve(true);
      }, 100);
    });
  };

  const convertBarcodeToBase64 = async () => {
    return new Promise<string>((resolve) => {
      (barcodeRef as any).toDataURL(async (dataURL: string) => {
        let proccess = dataURL.replace(/(\r\n|\n|\r)/gm, '');
        resolve(proccess);
      });
    });
  };
  const print = async () => {
    const data = getData();
    const printer = BLEPrinter;
    const barcode = await convertBarcodeToBase64();
    console.log('barcode', barcode);

    await awaitPrint(() =>
      printer.printImageBase64(barcode, {
        imageWidth: 380,
        imageHeight: 50,
      })
    );
    for (let item of data) {
      if (item.type === 'text') {
        await awaitPrint(() => printer.printText(item.content as string));
      } else if (item.type === 'table') {
        const { header, columnWidth, columnAlignment, columnStyle } =
          item.tableOptions!;
        await awaitPrint(() =>
          printer.printColumnsText(
            header,
            columnWidth,
            columnAlignment,
            columnStyle
          )
        );
        for (let i of item.content as string[][]) {
          await awaitPrint(() =>
            printer.printColumnsText(
              i,
              i.length > 1 ? columnWidth : getPrinterColumnWidth([100]),
              columnAlignment,
              columnStyle
            )
          );
        }
      }
      // printer.printBill(`Thank you\n`, { beep: false });
    }
  };
  return (
    <View>
      {connectedDevice && (
        <TextFont>
          {`device_name: ${connectedDevice.device_name}, inner_mac_address: ${connectedDevice.inner_mac_address}`}
        </TextFont>
      )}
      <GButton title={'print'} onPress={() => print()} />
      {/* <Barcode value='Hello World' format='CODE128' />; */}
      <View
        style={{ padding: 20, backgroundColor: '#fff', alignItems: 'center' }}
      >
        <BarcodeSvg
          value={`${invoiceNo}`}
          format='CODE128'
          getRef={(el: any) => (barcodeRef = el)}
          lineColor='black'
          backgroundColor='#fff'
        />
      </View>
    </View>
  );
};

export default PrintScreen;

const styles = StyleSheet.create({});
