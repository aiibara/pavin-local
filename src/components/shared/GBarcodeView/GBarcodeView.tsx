import React from 'react';
import { StyleSheet, View } from 'react-native';

import BarcodeSvg, { BarcodeProps } from 'react-native-barcode-svg';

export interface GBarcodeViewProps extends BarcodeProps {}

const GBarcodeView = ({ ...rest }: GBarcodeViewProps) => {
  return (
    <View style={{ padding: 10, backgroundColor: '#fff' }}>
      <BarcodeSvg {...rest} lineColor='#000' backgroundColor='#fff' />
    </View>
  );
};

export default GBarcodeView;

const styles = StyleSheet.create({});
