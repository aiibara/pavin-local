import { fontType } from '@/assets/fonts/fontStyles';
import { useGetProductByBarcode } from '@/providers/redux/hooks/productHooks';
import useColors from '@/utils/styles/useColors';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import GBarcodeScannerView from '../GBarcodeScannerView/GBarcodeScannerView';
import GProductCard from '../GProductCard/GProductCard';
import GButton from '../shared/GButton/GButton';
import GModal, { GModalRef } from '../shared/GModal/GModal';
import TextFont from '../shared/TextFont/TextFont';

export interface GAddToCartByScanProps {
  onPressClose: () => void;
}
const GAddToCartByScan = ({ onPressClose }: GAddToCartByScanProps) => {
  const router = useRouter();
  const colors = useColors();
  const { product, setBarcode, barcode } = useGetProductByBarcode();
  const modalRef = useRef<GModalRef>(null);

  useEffect(() => {
    if (barcode) {
      modalRef.current?.open();
    }
  }, [product, barcode]);

  const goToAddProduct = () => {
    router.push({ pathname: '/addProduct', params: { barcode } });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'green' }}>
      <GBarcodeScannerView
        onPressClose={onPressClose}
        onSuccessScan={(val) => {
          setBarcode(val);
        }}
      />
      <GModal ref={modalRef} onClose={() => setBarcode('')}>
        {!!product ? (
          <View style={{ width: 300 }}>
            <GProductCard
              code={product.code}
              brand={product.brand}
              name={product.name}
              imageUrl={''}
              prices={product.prices}
            />
          </View>
        ) : (
          <View
            style={{
              width: 300,
              padding: 20,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.bg_content,
              gap: 15,
            }}
          >
            <TextFont type={fontType.title3}>Barcode Not found</TextFont>
            <TextFont style={{ color: colors.text_danger }}>{barcode}</TextFont>
            <GButton title={'Add Product'} onPress={goToAddProduct} />
          </View>
        )}
      </GModal>
    </View>
  );
};

export default GAddToCartByScan;

const styles = StyleSheet.create({});
