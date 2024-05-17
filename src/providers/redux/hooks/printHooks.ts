import { ComponentOption, PrintDataItem } from "@/entities/interfaces/print/IPrint"
import { getPrinterColumnWidth } from "@/utils/shared"
import { useEffect, useState } from "react"
import { Platform } from "react-native"
import { PERMISSIONS, check, request } from "react-native-permissions"
import { Svg } from "react-native-svg"
import { BLEPrinter, IBLEPrinter } from "react-native-thermal-receipt-printer-image-qr"
import { useAppSelector } from "../hooks"
import { store } from "../store"

export const useGetBLEDeviceName = () => {
   const deviceName = useAppSelector(state => state.config.config.BLEDeviceName)
   return deviceName
}

export const useConnectPrinter = () => {
   const savedDeviceName = useGetBLEDeviceName();
 const [connectedDevice, setConnectedDevice] = useState<IBLEPrinter | null>(null);
 const [selectedDevice, setSelectedDevice] = useState<IBLEPrinter | null>(null);
  const [devices, setDevices] = useState<IBLEPrinter[]>([]);
  const [status, setStatus] = useState<'finding' | 'connecting' | 'connected' | 'failed'>('finding');
   

     useEffect(() => {
    if (Platform.OS == 'android') {
      requestBluetoothPermission().then((res) => {
        BLEPrinter.init()
          .then(() => {
            BLEPrinter.getDeviceList()
              .then((printer) => setDevices(printer))
              .catch((err) => {
                  console.log("err getdevicelist", err)
              });
          })
          .catch((err) =>{
            if(err == 'bluetooth adapter is not enabled') {
                  alert('please enable bluetooth')
               }
          });
      });
      return () => {
        BLEPrinter.closeConn();
      };
    }
  }, []);

  useEffect(()=> {
   if(!connectedDevice){
      console.log("devices", devices, savedDeviceName)
      const device = devices.find(i => i.device_name === savedDeviceName)
      if(device) {
         setSelectedDevice(device);
         setStatus('connecting')
         connectPrinter(device)
      }
   }
  }, [devices, savedDeviceName])

   const connectPrinter = (printer: IBLEPrinter) =>
    BLEPrinter.connectPrinter(printer.inner_mac_address).then(
      () => {
        console.log('success connext', printer.device_name);
        setConnectedDevice(printer);
        setStatus('connected')
      }
    ).catch(
      (error) => {
         console.warn('err', error)
         setStatus('failed')
      });

  const requestBluetoothPermission = async () => {
    const result = await check(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);

    if (result === 'granted') {
      console.log(result);
      return true;
    }
    const status = await request(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
    console.log('status in', status);
    return status;
  };

  return {
   status,
   connectedDevice,
   selectedDevice
  }
}

export const usePrintInvoice = () => {

  const { connectedDevice, status, selectedDevice } = useConnectPrinter();

   const convertSvgToBase64 = async (ref: any) => {
    return new Promise<string>((resolve) => {
      ref.toDataURL(async (dataURL: string) => {
        let proccess = dataURL.replace(/(\r\n|\n|\r)/gm, '');
        resolve(proccess);
      });
    });
  };

  const awaitPrint = (printFunc: () => void) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        printFunc();
        resolve(true);
      }, 100);
    });
  };

  const print = (data: PrintDataItem[], svgRefs?:Record<string, Svg>) => {
   if(connectedDevice) {

    printContent(data, svgRefs);
   }
  }

   const printContent = async (data: PrintDataItem[], svgRefs?:Record<string, Svg>) => {
    const printer = BLEPrinter;
    
    for (let item of data) {
      if (item.type === ComponentOption.Text || item.type === ComponentOption.TextArea) {
        await awaitPrint(() => printer.printText(item.content as string));
      } else if (item.type === ComponentOption.Table) {
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
      } else if (item.type === ComponentOption.Barcode && svgRefs?.[item.key]) {
         const barcode = await convertSvgToBase64(svgRefs[item.key]);
         await awaitPrint(() => printer.printText(item.content as string));
          await awaitPrint(() =>
            printer.printImageBase64(barcode, {
              imageWidth: 380,
              imageHeight: 50,
            })
          );
      }else if (item.type === ComponentOption.QrCode && svgRefs?.[item.key]) {
          const qrCode = await convertSvgToBase64(svgRefs[item.key]);
          await awaitPrint(() => printer.printText(item.content as string));
          await awaitPrint(() =>
            printer.printImageBase64(qrCode, {
              imageWidth: 200,
              imageHeight: 200,
            })
          );
        }
      }
      // printer.printBill(`Thank you\n`, { beep: false });
    }

    return {
      print,
      connectedDevice,
      status,
      selectedDevice
    }
  };

// export const usePrintInvoice = () => {

//   let barcodeRef = useRef<Svg>();
//   let QrRef = useRef<Svg>();

//    const convertBarcodeToBase64 = async () => {
//     return new Promise<string>((resolve) => {
//       (barcodeRef as any).toDataURL(async (dataURL: string) => {
//         let proccess = dataURL.replace(/(\r\n|\n|\r)/gm, '');
//         resolve(proccess);
//       });
//     });
//   };

//   const convertQrToBase64 = async () => {
//     return new Promise<string>((resolve) => {
//       (QrRef as any).toDataURL(async (dataURL: string) => {
//         let proccess = dataURL.replace(/(\r\n|\n|\r)/gm, '');
//         resolve(proccess);
//       });
//     });
//   };

//   const awaitPrint = (printFunc: () => void) => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         printFunc();
//         resolve(true);
//       }, 100);
//     });
//   };

//     const getData = () => {
//     const BOLD_ON = COMMANDS.TEXT_FORMAT.TXT_BOLD_ON;
//     const BOLD_OFF = COMMANDS.TEXT_FORMAT.TXT_BOLD_OFF;
//     const CENTER = COMMANDS.TEXT_FORMAT.TXT_ALIGN_CT;
//     const OFF_CENTER = COMMANDS.TEXT_FORMAT.TXT_ALIGN_LT;

//     const line: PrintDataItem = {
//       key: 'line',
//       type: ComponentOption.Text,
//       content: `${CENTER}${COMMANDS.HORIZONTAL_LINE.HR3_58MM}${CENTER}`,
//     };

//     //  const data: PrintDataItem[] = [
//     //    {
//     //      type: 'text',
//     //      content: `${CENTER}${BOLD_ON} NAMA TOKO ${BOLD_OFF}\n`,
//     //    },
//     //    {
//     //      type: 'text',
//     //      content: `Invoice no. : ${invoiceNo}\n`,
//     //    },
//     //    {
//     //      type: 'text',
//     //      content: `Date : ${formatDate(invoice?.date!)}\n`,
//     //    },
//     //    line,
//     //    {
//     //      type: 'table',
//     //      content: [
//     //        ...Object.values(invoice?.items || {})
//     //          .map((i) => {
//     //            return [
//     //              [
//     //                `${i.quantity}x ${i.productUnit} ${i.productBrand} ${i.productName}`,
//     //              ],
//     //              [
//     //                `@ ${priceFormatter(i.productPricePerUnit)}`,
//     //                `${priceFormatter(i.productPricePerUnit * i.quantity)}`,
//     //              ],
//     //            ];
//     //          })
//     //          .flat(),
//     //        ['Total', `${countInvoiceTotal(invoice!)}`],
//     //      ],
//     //      tableOptions: {
//     //        header: ['Product\nUnit', 'Price'],
//     //        columnWidth: getPrinterColumnWidth([50, 50]),
//     //        columnAlignment: [ColumnAlignment.LEFT, ColumnAlignment.RIGHT],
//     //        columnStyle: ['', ''],
//     //      },
//     //    },
//     //    line,
//     //  ];

//     const data: PrintDataItem[] = [
//       {
//         key: '',
//          type: ComponentOption.Text,
//         content: `${CENTER}${BOLD_ON} HALU ${BOLD_OFF}\n`,
//       },
//       {
//         key: '',
//          type: ComponentOption.Text,
//         content: `MES22301\n`,
//       },
//       {
//         key: '',
//          type: ComponentOption.Text,
//         content: `${BOLD_ON}No.Resi: 004308434172\n${BOLD_OFF}`,
//       },
//       {
//          key: '',
//         type: ComponentOption.Barcode,
//         content: `barcode`,
//       },
//       line,
//       {
//         key: '',
//          type: ComponentOption.Text,
//         content: `${BOLD_ON}Penerima: Agus Servis${BOLD_OFF}\n[HOME] Depan kantor camat,\nBandar Khalifah,\nKAB.SERDANG BEDAGAI,\nSUMATERA UTARA`,
//       },
//       {
//         key: '',
//          type: ComponentOption.Text,
//         content: `${BOLD_ON}Pengirim: Perkakas Tekiro${BOLD_OFF}\n6281370238928\nKOTA MEDAN`,
//       },
//       {
//         key: '',
//          type: ComponentOption.Text,
//         content: `${BOLD_ON}No.Pesanan: 240514AEKMWDVC${BOLD_OFF}`,
//       },
//       // {
//       //   type: 'image',
//       //   content: `qr`,
//       // },
//       line,
//       {
//         key: '',
//          type: ComponentOption.Text,
//         content: `${CENTER}${BOLD_ON} Terima Kasih ${BOLD_OFF}\n`,
//       },
//     ];

//     return data;
//   };

  

//      const print = async () => {
//     const data = getData();
//     const printer = BLEPrinter;
    
//     for (let item of data) {
//       if (item.type === ComponentOption.Text) {
//         await awaitPrint(() => printer.printText(item.content as string));
//       } else if (item.type === ComponentOption.Table) {
//         const { header, columnWidth, columnAlignment, columnStyle } =
//           item.tableOptions!;
//         await awaitPrint(() =>
//           printer.printColumnsText(
//             header,
//             columnWidth,
//             columnAlignment,
//             columnStyle
//           )
//         );
//         for (let i of item.content as string[][]) {
//           await awaitPrint(() =>
//             printer.printColumnsText(
//               i,
//               i.length > 1 ? columnWidth : getPrinterColumnWidth([100]),
//               columnAlignment,
//               columnStyle
//             )
//           );
//         }
//       } else if (item.type === ComponentOption.Barcode) {
//          const barcode = await convertBarcodeToBase64();
//           await awaitPrint(() =>
//             printer.printImageBase64(barcode, {
//               imageWidth: 380,
//               imageHeight: 50,
//             })
//           );
//       }else if (item.type === ComponentOption.QrCode) {
//           const qrCode = await convertQrToBase64();
//           await awaitPrint(() =>
//             printer.printImageBase64(qrCode, {
//               imageWidth: 200,
//               imageHeight: 200,
//             })
//           );
//         }
//       }
//       // printer.printBill(`Thank you\n`, { beep: false });
//     }

//     return {
//       print,
      
//     }
//   };
