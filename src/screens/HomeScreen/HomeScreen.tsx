import BarcodeScannerIcon from '@/assets/svgs/BarcodeScannerIcon';
import GAddToCartByScan from '@/components/GAddToCartByScan/GAddToCartByScan';
import GProductCard from '@/components/GProductCard/GProductCard';
import GCartList from '@/components/shared/GCartList/GCartList';
import GTextInput from '@/components/shared/GTextInput/GTextInput';
import IProduct from '@/entities/interfaces/product/IProduct';
import { useAddToCart } from '@/providers/redux/hooks/cartHooks';
import { useViewProductsList } from '@/providers/redux/hooks/productHooks';
import useColors from '@/utils/styles/useColors';
import MasonryList from '@react-native-seoul/masonry-list';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HomeScreen = () => {
  const { products, searchValue, setSearchValue } = useViewProductsList();

  const [isShowScannerView, setIsShowScannerView] = useState(false);

  const colors = useColors();

  const addToCart = useAddToCart();

  const renderItem = ({ item }: { item: IProduct }) => {
    return (
      <GProductCard
        name={item.name}
        imageUrl={item.image}
        prices={item.prices}
        code={item.code}
        brand={item.brand}
      />
    );
  };

  return (
    <>
      {!isShowScannerView && (
        <>
          <View style={styles.searchHeaderWrapper}>
            <View style={styles.searchHeaderContainer}>
              <GTextInput
                value={searchValue}
                placeholder={'Search'}
                onChangeText={(text) => setSearchValue(text)}
              />
              <TouchableOpacity
                onPress={() => setIsShowScannerView(true)}
                style={styles.scanBtn}
              >
                <BarcodeScannerIcon fill={colors.text_primary} />
              </TouchableOpacity>
            </View>
          </View>

          <MasonryList
            data={products}
            keyExtractor={(item: IProduct) => item.code}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            contentContainerStyle={{ gap: 20 }}
            // refreshing={false}
            // onRefresh={() => refetch({ first: ITEM_CNT })}
            // onEndReachedThreshold={0.1}
            // onEndReached={() => loadNext(ITEM_CNT)}
          />
        </>
      )}

      <GCartList />
      {isShowScannerView && (
        <GAddToCartByScan onPressClose={() => setIsShowScannerView(false)} />
      )}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  searchHeaderWrapper: {
    height: 50,
    marginTop: 20,
    marginHorizontal: 5,
  },
  searchHeaderContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  scanBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
