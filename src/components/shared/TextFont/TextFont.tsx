import fontStyles, { fontType } from '@/assets/fonts/fontStyles';
import useColors from '@/utils/styles/useColors';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
} from 'react-native';

export interface TextFontProps extends TextProps {
  type?: fontType;
}

const TextFont = ({
  children,
  type = fontType.body,
  style,
  ...rest
}: TextFontProps) => {
  const colors = useColors();
  const textStyle: StyleProp<TextStyle> = {
    ...fontStyles[type],
    color: colors.text_primary,
  };

  return (
    <Text style={[textStyle, style]} {...rest}>
      {children}
    </Text>
  );
};

export default TextFont;

const styles = StyleSheet.create({});
