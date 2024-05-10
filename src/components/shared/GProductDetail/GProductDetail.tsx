import IProduct from '@/entities/interfaces/product/IProduct';
import createStyle from '@/utils/styles/createStyle';
import React from 'react';
import { View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import TextFont from '../TextFont/TextFont';

export interface GProductDetailProps {
  data: IProduct;
}

const GProductDetail = ({ data }: GProductDetailProps) => {
  const { styles } = useStyles(styleSheet);

  return (
    <View style={styles.container}>
      {Object.keys(data).map((attr: string) => (
        <View style={styles.rowItem}>
          <TextFont>{attr}</TextFont>
          <TextFont>{JSON.stringify(data[attr as keyof IProduct])}</TextFont>
        </View>
      ))}
    </View>
  );
};

export default GProductDetail;

const styleSheet = createStyle((colors) => ({
  container: {
    paddingHorizontal: 16,
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: colors.bg_content,
    zIndex: 2,
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));
