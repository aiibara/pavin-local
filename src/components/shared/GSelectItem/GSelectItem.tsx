import {
  INPUT_GAP_HORIZONTAL,
  INPUT_PADDING_HORIZONTAL,
} from '@/utils/styles/constants';
import createStyle from '@/utils/styles/createStyle';
import useStyles from '@/utils/styles/useStyles';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import TextFont from '../TextFont/TextFont';

export interface GSelectItemProps {
  label: string;
  value?: string;
  options: string[];
  onSelect: (value: string) => void;
}
const GSelectItem = ({ label, options, onSelect, value }: GSelectItemProps) => {
  const { styles } = useStyles(styleSheet);
  return (
    <View>
      <TextFont>{label}</TextFont>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.item, value === option ? styles.selectedItem : {}]}
            onPress={() => onSelect(value === option ? '' : option)}
          >
            <TextFont>{option}</TextFont>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default GSelectItem;

const styleSheet = createStyle((colors) =>
  StyleSheet.create({
    optionsContainer: {
      flexDirection: 'row',
      gap: INPUT_GAP_HORIZONTAL,
    },
    item: {
      paddingHorizontal: INPUT_PADDING_HORIZONTAL,
      paddingVertical: 5,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: colors.border_input,
    },
    selectedItem: {
      backgroundColor: colors.bg_tab,
    },
  })
);
