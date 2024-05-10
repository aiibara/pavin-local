import createStyle from '@/utils/styles/createStyle';
import useStyles from '@/utils/styles/useStyles';
import React from 'react';
import { DimensionValue, View } from 'react-native';

export interface GDividerProps {
  height?: DimensionValue | undefined;
  width?: DimensionValue | undefined;
}

const GDivider = ({ width = '100%', height = 1 }: GDividerProps) => {
  const { styles } = useStyles(stylesheets);

  return (
    <View
      style={[
        styles.container,
        {
          width,
          height,
        },
      ]}
    ></View>
  );
};

export default GDivider;

const stylesheets = createStyle((colors) => ({
  container: {
    width: '100%',
    height: 1,
    backgroundColor: colors.border_input,
  },
}));
