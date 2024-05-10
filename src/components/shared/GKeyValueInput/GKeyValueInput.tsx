import IKeyValue from '@/entities/interfaces/shared/IKeyValue';
import { INPUT_GAP_HORIZONTAL } from '@/utils/styles/constants';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import GTextInput from '../GTextInput/GTextInput';
import TextFont from '../TextFont/TextFont';

type KeyInputValue = IKeyValue<string>[];
export interface GKeyValueInputProps {
  label: string;
  value?: KeyInputValue;
  onChange?: (value: KeyInputValue) => void;
}

const GKeyValueInput = ({
  label,
  value = [],
  onChange,
}: GKeyValueInputProps) => {
  const [items, setItems] = useState<KeyInputValue>(value);

  const addItemInput = () => {
    setItems((prev) => [...prev, { key: '', value: '' }]);
  };

  const onChangeText = (text: string, i: string, idx: number) => {
    const _editedItems = [...items];
    _editedItems[idx] = {
      ..._editedItems[idx],
      [i]: text,
    };
    setItems(_editedItems);
  };

  useEffect(() => {
    onChange && onChange(items.filter((item) => !!item.key && !!item.value));
  }, [items]);

  return (
    <View>
      <TextFont>{label}</TextFont>

      <View style={styles.items}>
        {items.map((item, idx) => (
          <View style={styles.itemRow} key={idx}>
            <GTextInput
              initialValue={item.key}
              _onBlur={(text) => onChangeText(text, 'key', idx)}
            />
            <GTextInput
              initialValue={item.value}
              _onBlur={(text) => onChangeText(text, 'value', idx)}
            />
          </View>
        ))}

        <TouchableOpacity onPress={addItemInput}>
          <TextFont>{`+ add ${label}`}</TextFont>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GKeyValueInput;

const styles = StyleSheet.create({
  items: {
    gap: 12,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: INPUT_GAP_HORIZONTAL,
  },
});
