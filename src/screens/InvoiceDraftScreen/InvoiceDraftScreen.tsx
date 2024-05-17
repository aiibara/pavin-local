import ReceiptIcon from '@/assets/svgs/ReceiptIcon';
import GInvoiceItemRow from '@/components/GInvoiceItemRow/GInvoiceItemRow';
import GDivider from '@/components/shared/GDivider/GDivider';
import GTextAreaInput from '@/components/shared/GTextAreaInput/GTextAreaInput';
import GTextInput from '@/components/shared/GTextInput/GTextInput';
import TextFont from '@/components/shared/TextFont/TextFont';
import { ProductCart } from '@/entities/interfaces/cart/ICart';
import { Customer } from '@/entities/interfaces/customer/ICustomer';
import { Invoice } from '@/entities/interfaces/invoice/IInvoice';
import {
  useClearCart,
  useGetCart,
  useGetCartInvoice,
  useSetCartInvoice,
} from '@/providers/redux/hooks/cartHooks';
import { useAddToInvoice } from '@/providers/redux/hooks/invoiceHooks';
import Stack from '@/utils/navigation/Stack';
import { priceFormatter } from '@/utils/shared';
import createStyle from '@/utils/styles/createStyle';
import useStyles from '@/utils/styles/useStyles';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, TouchableOpacity, View } from 'react-native';

const InvoiceDraftScreen = () => {
  const router = useRouter();
  const { cart = {}, cartTotal } = useGetCart();
  const prodsCart = Object.values(cart);

  const cartInvoice = useGetCartInvoice();
  const setCartInvoice = useSetCartInvoice();
  const clearCartData = useClearCart();

  const addToInvoice = useAddToInvoice();
  const [invNo, setInvNo] = useState<string | undefined>(undefined);

  const { styles, theme: colors } = useStyles(stylesheets);
  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
    trigger,
    watch,
  } = useForm<Invoice>({
    defaultValues: new Invoice(
      cartInvoice?.invoiceNo,
      Customer.getFullAddress(cartInvoice?.customer)
    ),
  });

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (!invNo) {
          const form = getValues();
          const cust = Customer.setCustomer(form.fullAddress);
          setCartInvoice({ ...cust }, form.invoiceNo);
        }
      };
    }, [invNo])
  );

  const onPressCreateInvoice = () => {
    handleSubmit(
      (data) => {
        // console.log(data.getInvoiceData(cart));
        const inv = data.getInvoiceData(cart);
        addToInvoice(inv);
        setInvNo(inv.invoiceNo);
      },
      (err) => console.log('errsubmit', err)
    )();
  };

  useEffect(() => {
    if (invNo) {
      clearCartData();
      router.replace({ pathname: '/invoice', params: { invoiceNo: invNo } });
    }
  }, [invNo]);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Invoice Draft',
          headerRight: () => (
            <View>
              <TouchableOpacity onPress={onPressCreateInvoice}>
                <ReceiptIcon fill={colors.text_primary} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <ScrollView contentContainerStyle={{ gap: 10 }}>
        <Controller
          name='fullAddress'
          rules={{ required: true }}
          control={control}
          render={({ field: { onChange, value } }) => (
            <GTextAreaInput
              value={value}
              label={'To:'}
              onChangeText={onChange}
              placeholder={`name\naddress\ncity\nphones[/]`}
            />
          )}
        />

        <Controller
          name='invoiceNo'
          control={control}
          render={({ field: { onChange, value } }) => (
            <GTextInput
              label={'Invoice No.'}
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        {prodsCart.map((i) => (
          <GInvoiceItemRow
            key={new ProductCart(i).key}
            item={i}
            locked={false}
          />
        ))}

        <GDivider />

        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <TextFont>Total {priceFormatter(cartTotal)}</TextFont>
        </View>
      </ScrollView>
    </View>
  );
};

export default InvoiceDraftScreen;

const stylesheets = createStyle((colors) => ({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
}));
