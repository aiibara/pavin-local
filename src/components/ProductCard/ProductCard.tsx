import { fontType } from '@/assets/fonts/fontStyles';
import { IPrice } from '@/entities/interfaces/product/IProduct';
import {
  useAddToCart,
  useGetCardItemCount,
} from '@/providers/redux/hooks/cartHooks';
import { priceFormatter } from '@/utils/shared';
import createStyle from '@/utils/styles/createStyle';
import useStyles from '@/utils/styles/useStyles';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import TextFont from '../shared/TextFont/TextFont';

export interface ProductCardProps {
  code: string;
  brand?: string;
  name: string;
  imageUrl: string;
  prices: IPrice[];
}
const ProductCard = ({
  code,
  brand = '',
  name,
  imageUrl,
  prices,
}: ProductCardProps) => {
  const { styles } = useStyles(stylesheets);
  const addToCart = useAddToCart();

  const onPressProduct = () => {
    addToCart({
      currentPrices: prices,
      productCode: code,
      productBrand: brand,
      productName: name,
      productUnit: prices[0].unit,
      productPricePerUnit: prices[0].price,
      quantity: 1,
    });
  };

  const onPressPrice = (price: IPrice) => {
    addToCart({
      currentPrices: prices,
      productCode: code,
      productBrand: brand,
      productName: name,
      productUnit: price.unit,
      productPricePerUnit: price.price,
      quantity: 1,
    });
  };
  return (
    <View style={styles.outerContainer}>
      <TouchableOpacity style={styles.container} onPress={onPressProduct}>
        <View>
          <TextFont>{[brand, name].join(' ')}</TextFont>
        </View>
        <View style={styles.priceTabs}>
          {prices.map((price, idx) => (
            <ProductCardPrice
              key={idx}
              productKey={`${code}_${price.unit}`}
              price={price}
              onPressPrice={onPressPrice}
            />
          ))}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProductCard;

export interface ProductCardPriceProps {
  productKey: string;
  price: IPrice;
  onPressPrice: (price: IPrice) => void;
}
export const ProductCardPrice = ({
  productKey,
  onPressPrice,
  price,
}: ProductCardPriceProps) => {
  const { styles } = useStyles(stylesheets);
  const cartItemCount = useGetCardItemCount(`${productKey}`);

  return (
    <TouchableOpacity
      onPress={() => {
        onPressPrice(price);
      }}
      style={[styles.priceTab]}
    >
      <TextFont>
        <TextFont>{`${priceFormatter(price.price)}`}</TextFont>
        <TextFont
          type={fontType.callout}
        >{` /${price.qty} (${price.unit})`}</TextFont>
      </TextFont>
      {!!cartItemCount && (
        <TextFont style={styles.itemCount}>{cartItemCount}</TextFont>
      )}
    </TouchableOpacity>
  );
};

const stylesheets = createStyle((colors) => ({
  outerContainer: {
    padding: 5,
  },
  container: {
    backgroundColor: colors.bg_card,
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  priceTabs: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  priceTab: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemCount: {
    backgroundColor: colors.bg_header,
    borderRadius: 24,
    paddingHorizontal: 2,
    minWidth: 20,
    height: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: colors.text_secondary,
  },
}));
