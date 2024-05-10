import GInvoiceItemRow from '@/components/GInvoiceItemRow/GInvoiceItemRow';
import GDivider from '@/components/shared/GDivider/GDivider';
import GTextAreaInput from '@/components/shared/GTextAreaInput/GTextAreaInput';
import GTextInput from '@/components/shared/GTextInput/GTextInput';
import TextFont from '@/components/shared/TextFont/TextFont';
import IInvoice from '@/entities/interfaces/invoice/IInvoice';
import { useGetCart } from '@/providers/redux/hooks/cartHooks';
import Stack from '@/utils/navigation/Stack';
import { priceFormatter } from '@/utils/shared';
import createStyle from '@/utils/styles/createStyle';
import useStyles from '@/utils/styles/useStyles';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FlatList, ScrollView, View } from 'react-native';

const InvoiceDraftScreen = () => {
  const { cart, cartTotal } = useGetCart();
  const prodsCart = Object.keys(cart || {});
  const { styles, theme: colors } = useStyles(stylesheets);
  const {
    control,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
    trigger,
    watch,
  } = useForm<IInvoice>({
    defaultValues: {
      items: cart,
    },
  });
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Invoice Draft',
        }}
      />

      <ScrollView contentContainerStyle={{ gap: 10 }}>
        <GTextAreaInput label={'To:'} value={''} />
        
        <GTextInput label={'Invoice No.'} value={''} />

        <FlatList
          data={prodsCart}
          keyExtractor={(i) => `${i}`}
          renderItem={({
            item,
            index,
          }: {
            item: string;
            index: number;
          }) => {
            return <GInvoiceItemRow itemId={item} />;
          }}
        />

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
