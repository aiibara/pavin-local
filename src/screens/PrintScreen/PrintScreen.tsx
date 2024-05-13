import { useGetInvoice } from '@/providers/redux/hooks/invoiceHooks';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const PrintScreen = () => {
   const { invoiceNo } = useLocalSearchParams<{ invoiceNo: string }>();
   const { invoice, total } = useGetInvoice(invoiceNo);
  return (
    <View>
      <Text>PrintScreen</Text>
    </View>
  );
};

export default PrintScreen;

const styles = StyleSheet.create({});
