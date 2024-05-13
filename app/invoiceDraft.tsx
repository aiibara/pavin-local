import GContainer from '@/components/shared/GContainer/GContainer';
import InvoiceDraftScreen from '@/screens/InvoiceDraftScreen/InvoiceDraftScreen';
import React from 'react';
import { StyleSheet } from 'react-native';

const Invoice = () => {
  return (
    <GContainer>
      <InvoiceDraftScreen />
    </GContainer>
  );
};

export default Invoice;

const styles = StyleSheet.create({});
