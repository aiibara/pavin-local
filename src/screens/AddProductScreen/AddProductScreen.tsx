import BarcodeScannerIcon from '@/assets/svgs/BarcodeScannerIcon';
import CheckIcon from '@/assets/svgs/CheckIcon';
import PreviewIcon from '@/assets/svgs/PreviewIcon';
import GBarcodeScannerView from '@/components/GBarcodeScannerView/GBarcodeScannerView';
import GKeyValueInput from '@/components/shared/GKeyValueInput/GKeyValueInput';
import GPriceQtyInput from '@/components/shared/GPriceQtyInput/GPriceQtyInput';
import GProductDetail from '@/components/shared/GProductDetail/GProductDetail';
import GSelectBrandInput from '@/components/shared/GSelectBrandInput.tsx/GSelectBrandInput';
import GTextAreaInput from '@/components/shared/GTextAreaInput/GTextAreaInput';
import GTextInput from '@/components/shared/GTextInput/GTextInput';
import TextFont from '@/components/shared/TextFont/TextFont';
import IProduct from '@/entities/interfaces/product/IProduct';
import { emptyProductData } from '@/features/product/sample';
import { useAddProduct } from '@/providers/redux/hooks/productHooks';
import { SCREEN_WIDTH } from '@/utils/constants';
import { INPUT_GAP_VERTICAL } from '@/utils/styles/constants';
import createStyle from '@/utils/styles/createStyle';
import useStyles from '@/utils/styles/useStyles';
import { Stack, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, TouchableOpacity, View } from 'react-native';

const AddProductScreen = () => {
  const { styles, theme: colors } = useStyles(styleSheet);

  const [showPreview, setShowPreview] = useState(false);
  const {
    control,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
    trigger,
    watch,
  } = useForm<IProduct>({
    defaultValues: emptyProductData,
  });
  const navigation = useNavigation();
  const addProduct = useAddProduct();

  const [isShowScannerView, setIsShowScannerView] = useState(false);

  const registerProduct = () => {
    const onInvalid = (errors: any) => console.error(errors);
    handleSubmit((data) => {
      addProduct(data);
      navigation.dispatch({ type: 'POP_TO_TOP' });
    }, onInvalid)();
  };

  useEffect(() => {
    void trigger();
  }, [trigger, isValid]);

  return (
    <View style={{ flexGrow: 1 }}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <View
              style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}
            >
              <TouchableOpacity
                onPress={() => setShowPreview((prev) => !prev)}
                style={{
                  backgroundColor: showPreview ? colors.bg_tab : 'transparent',
                  padding: 5,
                  borderRadius: 5,
                }}
              >
                <PreviewIcon fill={colors.text_primary} />
              </TouchableOpacity>
              <TouchableOpacity onPress={registerProduct}>
                <CheckIcon fill={colors.text_primary} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      {showPreview && <GProductDetail data={getValues()} />}

      <View>
        <View style={styles.tabContainer}>
          <TextFont>{'Info'}</TextFont>
          <TextFont>{'Details'}</TextFont>
          <TextFont>{'Price'}</TextFont>
        </View>

        {isShowScannerView && (
          <View style={{ height: 500, width: '100%' }}>
            <GBarcodeScannerView
              onPressClose={() => setIsShowScannerView(false)}
              onSuccessScan={(text) => {
                setValue('barcode', text);
                setIsShowScannerView(false);
              }}
            />
          </View>
        )}

        <ScrollView
          contentContainerStyle={styles.outerContainer}
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          <ScrollView contentContainerStyle={styles.container}>
            {!isShowScannerView && (
              <Controller
                name='barcode'
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <GTextInput
                    label={'Barcode'}
                    initialValue={value}
                    _onBlur={onChange}
                    leftComponent={
                      <View>
                        <TouchableOpacity
                          onPress={() => setIsShowScannerView(true)}
                        >
                          <BarcodeScannerIcon fill={colors.text_primary} />
                        </TouchableOpacity>
                      </View>
                    }
                  />
                )}
              />
            )}

            <Controller
              name='brand'
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <GSelectBrandInput value={value} onSelect={onChange} />
              )}
            />

            <Controller
              name='name'
              rules={{
                required: true,
              }}
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <GTextInput
                  label={'Product Name'}
                  initialValue={value}
                  _onBlur={onChange}
                />
              )}
            />

            <Controller
              name='nameEn'
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <GTextInput
                  label={'Product Name (EN)'}
                  initialValue={value}
                  _onBlur={onChange}
                />
              )}
            />

            <Controller
              name='code'
              rules={{
                required: true,
              }}
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <GTextInput
                  label={'Product Code'}
                  initialValue={value}
                  _onBlur={onChange}
                />
              )}
            />

            <Controller
              name='nickName'
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <GTextInput
                  label={'Nick name'}
                  initialValue={value}
                  _onBlur={onChange}
                />
              )}
            />
          </ScrollView>

          <ScrollView contentContainerStyle={styles.container}>
            <Controller
              name='specs'
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <GKeyValueInput
                  label={'Specs'}
                  value={value}
                  onChange={onChange}
                />
              )}
            />

            <Controller
              name={'details'}
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <GTextAreaInput
                  label={'Details'}
                  value={value}
                  _onBlur={onChange}
                />
              )}
            />
          </ScrollView>

          <ScrollView contentContainerStyle={styles.container}>
            <Controller
              name={'prices'}
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <GPriceQtyInput
                  label={'Prices'}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </ScrollView>
        </ScrollView>
      </View>
    </View>
  );
};

export default AddProductScreen;

const styleSheet = createStyle((theme) => ({
  tabContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: theme.bg_tab,
    paddingVertical: 10,
  },
  outerContainer: {
    width: '300%',
  },
  container: {
    width: SCREEN_WIDTH,
    paddingHorizontal: 20,
    paddingVertical: 30,
    gap: INPUT_GAP_VERTICAL,
  },
}));
