import {
  INPUT_PADDING_HORIZONTAL,
  INPUT_RADIUS,
} from '@/utils/styles/constants';
import createStyle from '@/utils/styles/createStyle';
import useColors from '@/utils/styles/useColors';
import useStyles from '@/utils/styles/useStyles';
import React from 'react';
import { View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import TextFont from '../TextFont/TextFont';

export interface GPickerProps {
  value: string;
  options: string[];
  onSelect: (selectedItem: string, index: number) => void;
}

const GPicker = <T,>({ value, options, onSelect }: GPickerProps) => {
  const { styles } = useStyles(styleSheets);
  const colors = useColors();
  return (
    <SelectDropdown
      data={options}
      onSelect={onSelect}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View style={styles.dropdownButtonStyle}>
            <TextFont>{value}</TextFont>
          </View>
        );
      }}
      renderItem={(item, index, isSelected) => {
        return (
          <View
            style={{
              ...styles.dropdownItemStyle,
              ...(isSelected && { backgroundColor: colors.bg_tab }),
            }}
          >
            <TextFont>{item}</TextFont>
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.dropdownMenuStyle}
    />
  );
};

export default GPicker;

const styleSheets = createStyle((colors) => ({
  picker: {
    borderWidth: 1,
    borderColor: colors.border_input,
    paddingHorizontal: 10,
    color: 'green',
    //  backgroundColor: 'white',
  },
  itemContainer: {},
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonStyle: {
    minWidth: 60,
    backgroundColor: 'none',
    borderWidth: 1,
    borderColor: colors.border_input,
    borderRadius: INPUT_RADIUS,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: INPUT_PADDING_HORIZONTAL,
  },
  dropdownItemStyle: {
    // width: 300,
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownMenuStyle: {
    margin: 10,
    backgroundColor: colors.bg_content,
    borderRadius: 8,
    //  borderWidth: 1,
    borderColor: colors.border_input,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 0,
    shadowOpacity: 0,
  },
}));
