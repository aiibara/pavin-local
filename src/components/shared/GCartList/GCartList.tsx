import GInvoiceItemRow from '@/components/GInvoiceItemRow/GInvoiceItemRow';
import { IProductCart } from '@/entities/interfaces/cart/ICart';
import { useGetCart } from '@/providers/redux/hooks/cartHooks';
import { SCREEN_HEIGHT } from '@/utils/constants';
import { priceFormatter } from '@/utils/shared';
import { useKeyboardVisible } from '@/utils/sharedHooks';
import createStyle from '@/utils/styles/createStyle';
import useStyles from '@/utils/styles/useStyles';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { FlatList } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import CButton from '../GButton/GButton';

const GCartList = () => {
  const isKeyboardVisible = useKeyboardVisible();
  const { cart, cartTotal } = useGetCart();
  const { styles } = useStyles(stylesheets);
  const router = useRouter();

  const keyboard = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    const height = interpolate(
      keyboard.value,
      [0, 1],
      [SCREEN_HEIGHT * 0.4, 150]
    );

    return {
      maxHeight: withTiming(height, {
        duration: 250,
        easing: Easing.linear,
      }),
    };
  });

  useEffect(() => {
    keyboard.value = isKeyboardVisible ? 1 : 0;
  }, [isKeyboardVisible]);

  const renderItem = useCallback(
    ({ item, index }: { item: IProductCart; index: number }) => (
      <GInvoiceItemRow item={item} locked={false} />
    ),
    []
  );

  if (!cart) {
    return null;
  }

  const checkout = () => {
    router.push({ pathname: '/invoiceDraft' });
  };

  return (
    <Animated.View style={[styles.cartContainer, animatedStyles]}>
      <FlatList
        inverted
        data={Object.values(cart).reverse()}
        keyExtractor={(i) => i.productName + i.productUnit}
        renderItem={renderItem}
      />
      <CButton
        onPress={checkout}
        title={`Checkout => Total ${priceFormatter(cartTotal)}`}
        style={{ alignItems: 'flex-end' }}
      />
    </Animated.View>
  );
};

export default GCartList;

const stylesheets = createStyle((colors) => ({
  cartContainer: {
    gap: 5,
    padding: 20,
    maxHeight: SCREEN_HEIGHT * 0.4,
    backgroundColor: colors.bg_card,
    borderTopColor: colors.border_card,
    borderWidth: 0.5,
  },
}));
