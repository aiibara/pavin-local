import fonts from '@/assets/fonts/fonts';
import PrintIcon from '@/assets/svgs/PrinterIcon';
import GBarcodeView from '@/components/shared/GBarcodeView/GBarcodeView';
import GQrCodeView from '@/components/shared/GQrCodeView/GQrCodeView';
import TextFont, { TextFontProps } from '@/components/shared/TextFont/TextFont';
import {
  ComponentOption,
  PrintDataItem,
} from '@/entities/interfaces/print/IPrint';
import { usePrintInvoice } from '@/providers/redux/hooks/printHooks';
import Stack from '@/utils/navigation/Stack';
import useColors from '@/utils/styles/useColors';
import { useLocalSearchParams } from 'expo-router';
import React, { useRef } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Svg } from 'react-native-svg';

export interface PrintPreviewScreenProps {
  //   printComponents: PrintDataItem[];
}

const PrintPreviewScreen = ({}: PrintPreviewScreenProps) => {
  const colors = useColors();
  const params = useLocalSearchParams();
  const { printComponentsString } = params;
  if (typeof printComponentsString !== 'string') {
    return null;
  }
  const printComponents = JSON.parse(printComponentsString) as PrintDataItem[];

  const refs = useRef<Record<string, Svg>>();

  const { print, connectedDevice, status, selectedDevice } = usePrintInvoice();

  const onPressPrint = () => {
    print(printComponents, refs.current);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Print',
          headerRight: () => (
            <TouchableOpacity onPress={onPressPrint}>
              <PrintIcon fill={colors.text_primary} />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={{ flex: 1, gap: 20 }}>
        <View
          style={{
            backgroundColor: colors.bg_tab,
            padding: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <TextFont>
            {connectedDevice?.device_name || selectedDevice?.device_name}
          </TextFont>
          <TextFont>{status}</TextFont>
        </View>

        <ScrollView style={{ flexGrow: 1 }}>
          <View style={{ alignItems: 'center' }}>
            <View
              style={styles.invoice}
            >
              {printComponents.map((item, i) => {
                if (item.content) {
                  if (item.type === ComponentOption.Barcode) {
                    return (
                      <View key={i}>
                        <TextFontInvoice>{item.content}</TextFontInvoice>
                        <GBarcodeView
                          value={item.content}
                          getRef={(ref) =>
                            (refs.current = {
                              ...refs.current,
                              [item.key]: ref,
                            })
                          }
                          maxWidth={300}
                          height={50}
                        />
                      </View>
                    );
                  } else if (item.type === ComponentOption.QrCode) {
                    return (
                      <View key={i}>
                        <TextFontInvoice>{item.content}</TextFontInvoice>
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
                    return (
                      <TextFontInvoice
                        key={i}
                        style={{
                          color: '#000',
                        }}
                      >
                        {item.content}
                      </TextFontInvoice>
                    );
                  } else if (item.type === ComponentOption.Table) {
                    return (
                      <View style={{ flex: 1 }} key={i}>
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
                              <TextFontInvoice>{text}</TextFontInvoice>
                            ))}
                          </View>
                        ))}
                      </View>
                    );
                  }
                }
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const TextFontInvoice = (props: TextFontProps) => {
  return (
    <TextFont
      {...props}
      style={{ fontFamily: fonts.RobotoLight, color: '#000' }}
    >
      {props.children}
    </TextFont>
  );
};

export default PrintPreviewScreen;

const styles = StyleSheet.create({
  invoice: {
    backgroundColor: '#fff',
    width: 350,
    padding: 16,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
