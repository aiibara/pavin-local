import GContainer from '@/components/shared/GContainer/GContainer';
import InvoiceScreen from '@/screens/InvoiceScreen/InvoiceScreen';
import React from 'react';
import { StyleSheet } from 'react-native';

const Invoice = () => {
  return (
    <GContainer>
      <InvoiceScreen />
    </GContainer>
  );
};

export default Invoice;

const styles = StyleSheet.create({});
