import GButton from '@/components/shared/GButton/GButton';
import { useGetInvoice } from '@/providers/redux/hooks/invoiceHooks';
import {
  countInvoiceTotal,
  getPrinterColumnWidth,
  priceFormatter,
} from '@/utils/shared';
import { useLocalSearchParams } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { ColumnAlignment } from 'react-native-thermal-receipt-printer-image-qr';

import BarcodeScannerIcon from '@/assets/svgs/BarcodeScannerIcon';
import QrScannerIcon from '@/assets/svgs/QrScannerIcon';
import GBarcodeScannerView from '@/components/GBarcodeScannerView/GBarcodeScannerView';
import GBarcodeView from '@/components/shared/GBarcodeView/GBarcodeView';
import GQrCodeView from '@/components/shared/GQrCodeView/GQrCodeView';
import GSelectItem from '@/components/shared/GSelectItem/GSelectItem';
import GTextAreaInput from '@/components/shared/GTextAreaInput/GTextAreaInput';
import GTextInput from '@/components/shared/GTextInput/GTextInput';
import TextFont from '@/components/shared/TextFont/TextFont';
import { Customer } from '@/entities/interfaces/customer/ICustomer';
import {
  ComponentOption,
  PrintDataItem,
} from '@/entities/interfaces/print/IPrint';
import {
  useConnectPrinter,
  usePrintInvoice,
} from '@/providers/redux/hooks/printHooks';
import { SCREEN_WIDTH } from '@/utils/constants';
import useColors from '@/utils/styles/useColors';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Svg } from 'react-native-svg';

const PrintScreen = () => {
  const colors = useColors();
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const { connectedDevice } = useConnectPrinter();
  const { print } = usePrintInvoice();
  const refs = useRef<Record<string, Svg>>();
  const [scannerForInput, setScannerForInput] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState('temp');
  const { invoiceNo = '' } = useLocalSearchParams<{ invoiceNo: string }>();
  const { invoice, total } = useGetInvoice(invoiceNo);

  const [inputs, setInputs] = useState<PrintDataItem[]>(
    invoice
      ? [
          {
            key: 'invoiceNo',
            type: ComponentOption.Barcode,
            content: invoiceNo,
          },
          {
            key: 'customer',
            type: ComponentOption.TextArea,
            content: Customer.getFullAddress(invoice.customer),
          },
          {
            key: 'products',
            type: ComponentOption.Table,
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
              ['Total', `${priceFormatter(countInvoiceTotal(invoice!))}`],
            ],
            tableOptions: {
              header: ['Product\nUnit', 'Price'],
              columnWidth: getPrinterColumnWidth([50, 50]),
              columnAlignment: [ColumnAlignment.LEFT, ColumnAlignment.RIGHT],
              columnStyle: ['', ''],
            },
          },
        ]
      : []
  );

  const addInput = (input: string) => {
    switch (input) {
      case ComponentOption.Text:
      case ComponentOption.TextArea:
      case ComponentOption.Barcode:
      case ComponentOption.QrCode:
        const key = `${new Date().getTime()}`;
        setInputs((prev) => [
          ...prev,
          {
            key,
            type: input,
            content: '',
          },
        ]);
        break;
      default:
        return;
    }
  };

  const setInputValue = (key: string, value: any) => {
    setInputs((prev) =>
      prev.map((i) =>
        i.key === key
          ? {
              ...i,
              content: value,
            }
          : i
      )
    );
  };

  const renderItem = ({
    item,
    drag,
    isActive,
  }: RenderItemParams<PrintDataItem>) => {
    return (
      <View style={{ flexDirection: 'row', padding: 20, gap: 25 }}>
        <TouchableWithoutFeedback onLongPress={drag}>
          <View
            style={{
              width: 20,
              height: '100%',
              backgroundColor: 'pink',
              opacity: isActive ? 1 : 0.5,
            }}
          ></View>
        </TouchableWithoutFeedback>
        {item.type === ComponentOption.Text && (
          <GTextInput
            value={item.content}
            onChangeText={(val) => setInputValue(item.key, val)}
          />
        )}
        {item.type === ComponentOption.TextArea && (
          <GTextAreaInput
            value={item.content}
            onChangeText={(val) => setInputValue(item.key, val)}
          />
        )}
        {item.type === ComponentOption.Barcode && (
          <GTextInput
            value={item.content}
            onChangeText={(val) => setInputValue(item.key, val)}
            rightComponent={
              <TouchableOpacity onPress={() => setScannerForInput(item.key)}>
                <BarcodeScannerIcon fill={colors.text_primary} />
              </TouchableOpacity>
            }
          />
        )}
        {item.type === ComponentOption.QrCode && (
          <GTextAreaInput
            value={item.content}
            onChangeText={(val) => setInputValue(item.key, val)}
            rightComponent={
              <TouchableOpacity onPress={() => setScannerForInput(item.key)}>
                <QrScannerIcon fill={colors.text_primary} />
              </TouchableOpacity>
            }
          />
        )}
        {item.type === ComponentOption.Table && (
          <FlatList
            data={item.content}
            keyExtractor={(_, i) => `${i}`}
            renderItem={({ item }: { item: string[] }) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  {item.map((text) => (
                    <TextFont>{text}</TextFont>
                  ))}
                </View>
              );
            }}
          />
        )}
      </View>
    );
  };

  return (
    <View>
      <View
        style={{
          backgroundColor: '#fff',
          alignItems: 'center',
        }}
      >
        {!!scannerForInput && (
          <View style={{ height: 500, width: '100%' }}>
            <GBarcodeScannerView
              onPressClose={() => setScannerForInput(null)}
              onSuccessScan={(text) => {
                setInputValue(scannerForInput, text);
                setScannerForInput(null);
              }}
            />
          </View>
        )}
      </View>
      <DraggableFlatList
        contentContainerStyle={styles.container}
        ListHeaderComponent={() => (
          <GSelectItem
            label={'Add Component'}
            options={[
              ComponentOption.Text,
              ComponentOption.Barcode,
              ComponentOption.QrCode,
            ]}
            onSelect={addInput}
          />
        )}
        ListFooterComponent={() => (
          <GButton title={'preview'} onPress={() => setShowPreview(true)} />
        )}
        data={inputs}
        onDragEnd={({ data }) => setInputs(data)}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
      />

      {showPreview && (
        <ScrollView contentContainerStyle={styles.container}>
          <TextFont>{connectedDevice?.device_name}</TextFont>
          {inputs.map((item) => {
            if (item.content) {
              if (item.type === ComponentOption.Barcode) {
                return (
                  <View>
                    <TextFont>{item.content}</TextFont>
                    <GBarcodeView
                      value={item.content}
                      getRef={(ref) =>
                        (refs.current = {
                          ...refs.current,
                          [item.key]: ref,
                        })
                      }
                    />
                  </View>
                );
              } else if (item.type === ComponentOption.QrCode) {
                return (
                  <View>
                    <TextFont>{item.content}</TextFont>
                    <GQrCodeView
                      value={item.content}
                      getRef={(ref) =>
                        (refs.current = {
                          ...refs.current,
                          [item.key]: ref,
                        })
                      }
                    />
                  </View>
                );
              } else if (
                item.type === ComponentOption.Text ||
                item.type === ComponentOption.TextArea
              ) {
                return <TextFont>{item.content}</TextFont>;
              } else if (item.type === ComponentOption.Table) {
                return (
                  <View style={{ flex: 1 }}>
                    {item.content.map((i, idx) => (
                      <View
                        key={idx}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          flex: 1,
                        }}
                      >
                        {i.map((text) => (
                          <TextFont>{text}</TextFont>
                        ))}
                      </View>
                    ))}
                  </View>
                );
              }
            }
          })}
          <GButton
            title={'print'}
            onPress={() => print(inputs, refs.current)}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default PrintScreen;

const styles = StyleSheet.create({
  outerContainer: {
    width: '200%',
  },
  container: {
    width: SCREEN_WIDTH,
    paddingHorizontal: 20,
    paddingVertical: 30,
    //  gap: INPUT_GAP_VERTICAL,
  },
});
