import { fontType } from '@/assets/fonts/fontStyles';
import createStyle from '@/utils/styles/createStyle';
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import TextFont from '../TextFont/TextFont';

export interface CButtonProps extends TouchableOpacityProps {
  title: string;
}
const CButton = ({ title, ...rest }: CButtonProps) => {
  const { styles } = useStyles(styleSheets);
  return (
    <TouchableOpacity {...rest}>
      <View style={styles.button}>
        <TextFont type={fontType.title3} style={styles.btnTitle}>
          {title}
        </TextFont>
      </View>
    </TouchableOpacity>
  );
};

export default CButton;

const styleSheets = createStyle((colors) => ({
  button: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: colors.bg_header,
    borderRadius: 12,
  },
  btnTitle: {
    color: colors.text_secondary,
  },
}));
