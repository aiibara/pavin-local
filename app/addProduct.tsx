import GContainer from '@/components/shared/GContainer/GContainer';
import AddProductScreen from '@/screens/AddProductScreen/AddProductScreen';
import Stack from '@/utils/navigation/Stack';
import React from 'react';
import { StyleSheet } from 'react-native';

const addProduct = () => {
  return (
    <GContainer>
      <Stack.Screen
        options={{
          title: 'Add Product',
        }}
      />
      <AddProductScreen />
    </GContainer>
  );
};

export default addProduct;

const styles = StyleSheet.create({});
