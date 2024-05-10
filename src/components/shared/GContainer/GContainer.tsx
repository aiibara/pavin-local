import useColors from '@/utils/styles/useColors';
import React from 'react';
import { View } from 'react-native';

const GContainer = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const colors = useColors();
  return (
    <View style={{ backgroundColor: colors.bg_content, flex: 1 }}>
      {children}
    </View>
  );
};

export default GContainer;
