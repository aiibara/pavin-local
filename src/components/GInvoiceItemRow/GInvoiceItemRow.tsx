import MinusCircleIcon from '@/assets/svgs/MinusCircleIcon';
import PlusCircleIcon from '@/assets/svgs/PlusCircleIcon';
import { useAppSelector } from '@/providers/redux/hooks';
import {
  useDeleteCartItem,
  useEditCartItem,
} from '@/providers/redux/hooks/cartHooks';
import { priceFormatter } from '@/utils/shared';
import createStyle from '@/utils/styles/createStyle';
import useStyles from '@/utils/styles/useStyles';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import CSwipeableComponent from '../CSwipeableComponent/CSwipeableComponent';
import GTextInput from '../shared/GTextInput/GTextInput';
import TextFont from '../shared/TextFont/TextFont';

export interface InvoiceItemRowProps {
  itemId: string;
  withPrice?: boolean;
}

const GInvoiceItemRow = ({ itemId, withPrice = true }: InvoiceItemRowProps) => {
  const item = useAppSelector((state) => state.cart.cart![itemId]);
  const { styles, theme: colors } = useStyles(stylesheets);
  const { editItemPrice, editItemQty } = useEditCartItem();
  const { removeItem } = useDeleteCartItem();
  const [editPriceVal, setEditPriceVal] = useState<number | undefined>(
    undefined
  );

  const editPrice = () => {
    setEditPriceVal(item.productPricePerUnit);
  };

  const setNewPrice = (price: string) => {
    editItemPrice(item.productCode, item.productUnit, Number(price));
    setEditPriceVal(undefined);
  };

  const onPressAdd = () => {
    editItemQty(item.productCode, item.productUnit, 1);
  };

  const onPressMinus = () => {
    if (item.quantity === 1) {
      removeItem(item.productCode, item.productUnit);
    }
    editItemQty(item.productCode, item.productUnit, -1);
  };

  return (
    <View>
      <CSwipeableComponent
        leftComponent={
          <TouchableOpacity style={styles.addMinusBtns} onPress={onPressMinus}>
            <MinusCircleIcon fill={colors.text_danger} />
          </TouchableOpacity>
        }
        rightComponent={
          <TouchableOpacity style={styles.addMinusBtns} onPress={onPressAdd}>
            <PlusCircleIcon fill={colors.text_success} />
          </TouchableOpacity>
        }
      >
        <View style={styles.container}>
          <TextFont>
            {item.quantity} {item.productUnit}{' '}
            <TextFont>
              {[item.productBrand, item.productName].join(' ')}
            </TextFont>
          </TextFont>
          {withPrice && (
            <View style={styles.cartRow}>
              <View style={{ alignSelf: 'flex-start' }}>
                {!!editPriceVal ? (
                  <GTextInput
                    initialValue={`${editPriceVal}`}
                    keyboardType='numeric'
                    _onBlur={setNewPrice}
                  />
                ) : (
                  <TextFont onPress={editPrice}>
                    @ {priceFormatter(item.productPricePerUnit)}
                  </TextFont>
                )}
              </View>

              {withPrice && (
                <TextFont>
                  {priceFormatter(item.quantity * item.productPricePerUnit)}
                </TextFont>
              )}
            </View>
          )}
        </View>
      </CSwipeableComponent>
    </View>
  );
};

export default React.memo(GInvoiceItemRow);

const stylesheets = createStyle((colors) => ({
  cartRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  container: {},
  addMinusBtns: {
    flexDirection: 'row',
    gap: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
}));
