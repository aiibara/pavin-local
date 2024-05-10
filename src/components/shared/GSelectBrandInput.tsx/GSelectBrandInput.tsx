import CModalOneInput from '@/components/CModalOneInput/CModalOneInput';
import { useAddBrand, useGetBrands } from '@/providers/redux/hooks/brandHooks';
import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import GAddDeleteBtns from '../GAddDeletebBtns/GAddDeleteBtns';
import GModal, { GModalRef } from '../GModal/GModal';
import GSelectItem from '../GSelectItem/GSelectItem';

export interface GSelectBrandInputProps {
  value?: string;
  onSelect: (value: string) => void;
}
const label = 'Brand';
const GSelectBrandInput = ({ ...rest }: GSelectBrandInputProps) => {
  const addBrandModalRef = useRef<GModalRef>(null);
  const brands = useGetBrands();
  const addBrand = useAddBrand();
  const addItem = (brand: string) => {
    addBrand(brand);
    addBrandModalRef.current?.close();
  };

  const openModal = () => {
    addBrandModalRef.current?.open();
  };

  return (
    <View>
      <GSelectItem label={label} options={brands} {...rest} />
      <GAddDeleteBtns
        label={label}
        onPressAdd={openModal}
        onPressDelete={() => {}}
      />
      <GModal ref={addBrandModalRef}>
        <CModalOneInput
          label={`Add ${label}`}
          primaryLabel={'Add'}
          onPressPrimary={addItem}
        />
      </GModal>
    </View>
  );
};

export default GSelectBrandInput;

const styles = StyleSheet.create({});
