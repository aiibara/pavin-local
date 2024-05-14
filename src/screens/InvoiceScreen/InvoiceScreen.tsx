import PrintIcon from '@/assets/svgs/PrinterIcon';
import GInvoiceItemRow from '@/components/GInvoiceItemRow/GInvoiceItemRow';
import TextFont from '@/components/shared/TextFont/TextFont';
import { IProductCart, ProductCart } from '@/entities/interfaces/cart/ICart';
import { Customer } from '@/entities/interfaces/customer/ICustomer';
import { useGetInvoice } from '@/providers/redux/hooks/invoiceHooks';
import Stack from '@/utils/navigation/Stack';
import { formatDate, priceFormatter } from '@/utils/shared';
import useColors from '@/utils/styles/useColors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const InvoiceScreen = () => {
  const colors = useColors();
  const router = useRouter();
  const { invoiceNo } = useLocalSearchParams<{ invoiceNo: string }>();

  const { invoice, total } = useGetInvoice(invoiceNo);
  console.log('invoice', invoice);

  const { items, date, customer } = invoice || {};
  return (
    <>
      <Stack.Screen
        options={{
          title: invoiceNo,
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  router.push({
                    pathname: '/print',
                    params: { invoiceNo: invoiceNo },
                  });
                }}
              >
                <PrintIcon fill={colors.text_primary} />
              </TouchableOpacity>
            );
          },
        }}
      />
      <ScrollView>
        <View style={styles.container}>
          <TextFont>Date: {formatDate(date!)}</TextFont>

          <TextFont>Invoice: {invoiceNo}</TextFont>
          <TextFont>To: {Customer.getFullAddress(customer)}</TextFont>
          <FlatList
            data={Object.values(items || {})}
            keyExtractor={(i) => new ProductCart(i).key}
            renderItem={({ item }: { item: IProductCart }) => {
              return <GInvoiceItemRow item={item} />;
            }}
          />
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <TextFont>Total {priceFormatter(total)}</TextFont>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default InvoiceScreen;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 16,
    flexDirection: 'column',
  },
});
