import React from 'react';
import { StyleSheet, View } from 'react-native';
import QRCode, { QRCodeProps } from 'react-native-qrcode-svg';

export interface GQrCodeViewProps extends QRCodeProps {}

const GQrCodeView = ({ ...rest }: QRCodeProps) => {
  return (
    <View style={{ padding: 10, backgroundColor: '#fff' }}>
      <QRCode {...rest} />
    </View>
  );
};

export default GQrCodeView;

const styles = StyleSheet.create({});
