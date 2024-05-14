import { useEffect, useState } from "react"
import { Platform } from "react-native"
import { PERMISSIONS, check, request } from "react-native-permissions"
import { BLEPrinter, IBLEPrinter } from "react-native-thermal-receipt-printer-image-qr"
import { useAppSelector } from "../hooks"
import { store } from "../store"

export const useGetBLEDeviceName = () => {
   const deviceName = useAppSelector(state => state.config.config.BLEDeviceName)
   console.log("store", store.getState())
   return deviceName
}

export const useConnectPrinter = () => {
   const savedDeviceName = useGetBLEDeviceName();
 const [connectedDevice, setConnectedDevice] = useState<IBLEPrinter | null>(null);
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
         connectPrinter(device)
      }
   }
  }, [devices])

   const connectPrinter = (printer: IBLEPrinter) =>
    BLEPrinter.connectPrinter(printer.inner_mac_address).then(
      () => {
        console.log('success connext', printer.device_name);
        setConnectedDevice(printer)
      },
      (error) => console.warn('err', error)
    );

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
   connectedDevice
  }
}