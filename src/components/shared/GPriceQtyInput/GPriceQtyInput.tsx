import CModalOneInput from '@/components/CModalOneInput/CModalOneInput';
import { IPrice } from '@/entities/interfaces/product/IProduct';
import { useAddUnit, useGetUnit } from '@/providers/redux/hooks/unitsHooks';
import { ADD_UNIT, DEFAULT_CURRENCY } from '@/utils/constants';
import {
  INPUT_GAP_HORIZONTAL,
  INPUT_GAP_VERTICAL,
} from '@/utils/styles/constants';
import createStyle from '@/utils/styles/createStyle';
import useStyles from '@/utils/styles/useStyles';
import React, { useEffect, useRef, useState } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import GAddDeleteBtns from '../GAddDeletebBtns/GAddDeleteBtns';
import GModal, { GModalRef } from '../GModal/GModal';
import GPicker from '../GPicker/GPicker';
import GTextInput from '../GTextInput/GTextInput';
import TextFont from '../TextFont/TextFont';

type PriceInputValue = IPrice[];
export interface GPriceQtyInputProps {
  label: string;
  value: PriceInputValue;
  onChange?: (value: PriceInputValue) => void;
}

const GPriceQtyInput = ({ label, value, onChange }: GPriceQtyInputProps) => {
  const [items, setItems] = useState<IPrice[]>(value);
  const [longSelectedIdx, setlongSelectedIdx] = useState<number[]>([]);

  const addUnitModalRef = useRef<GModalRef>(null);

  const { styles } = useStyles(styleSheets);

  const addUnit = useAddUnit();
  const units = useGetUnit();

  const addItemInput = () => {
    setItems((prev) => [
      ...prev,
      {
        price: 0,
        qty: 1,
        unit: units[0],
      },
    ]);
  };

  const deleteItemInput = () => {
    //remove items
    setItems((prev) => prev.filter((_, idx) => !longSelectedIdx.includes(idx)));
    setlongSelectedIdx([]);
  };

  const updateItemValue = (
    index: number,
    key: keyof IPrice,
    value: number | string
  ) => {
    const _items = [...items];

    _items[index] = {
      ..._items[index],
      [key]: value,
    };
    setItems(_items);
  };

  const onSelect = (selectedItem: string, idx: number) => {
    if (selectedItem === ADD_UNIT) {
      addUnitModalRef.current?.open();
    } else {
      updateItemValue(idx, 'unit', selectedItem);
    }
  };

  const onPressAddUnit = (val: string) => {
    !!val && addUnit(val.toLowerCase());
    addUnitModalRef.current?.close();
  };

  const selectItem = (idx: number) => {
    if (longSelectedIdx.includes(idx)) {
      setlongSelectedIdx((prev) => prev.filter((i) => i !== idx));
    } else {
      setlongSelectedIdx((prev) => [...prev, idx]);
    }
  };

  useEffect(() => {
    onChange && onChange(items.filter((item) => !!item.price && !!item.qty));
  }, [items]);

  return (
    <View>
      <TextFont>{label}</TextFont>

      <View style={styles.items}>
        {items.map((item, idx) => (
          <TouchableWithoutFeedback
            onPress={() => (longSelectedIdx.length > 0 ? selectItem(idx) : {})}
            onLongPress={() => selectItem(idx)}
            key={idx}
          >
            <View
              style={[
                styles.itemRow,
                longSelectedIdx.includes(idx)
                  ? styles.selectedItemRow
                  : styles.empty,
              ]}
            >
              <GPicker
                value={item.unit}
                options={[...units, ADD_UNIT]}
                onSelect={(selectedItem) => onSelect(selectedItem, idx)}
              />
              <GTextInput
                keyboardType='numeric'
                textInputContainerStyle={styles.col2Input}
                initialValue={`${item.qty}`}
                _onBlur={(val) => updateItemValue(idx, 'qty', val)}
              />
              <GTextInput
                keyboardType='numeric'
                initialValue={`${item.price}`}
                _onBlur={(val) => updateItemValue(idx, 'price', val)}
                rightComponent={<TextFont>{`${DEFAULT_CURRENCY}`}</TextFont>}
              />
            </View>
          </TouchableWithoutFeedback>
        ))}
        <GAddDeleteBtns
          label={label}
          onPressAdd={addItemInput}
          onPressDelete={deleteItemInput}
        />
      </View>
      <GModal ref={addUnitModalRef}>
        <CModalOneInput
          label={'Add Unit'}
          primaryLabel={'Add'}
          onPressPrimary={onPressAddUnit}
        />
      </GModal>
    </View>
  );
};

export default GPriceQtyInput;

const styleSheets = createStyle((colors) => ({
  empty: {},
  items: {},
  col2Input: { flex: 0.3 },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: INPUT_GAP_HORIZONTAL,
    paddingVertical: 8,
    paddingLeft: 20,
  },
  selectedItemRow: { backgroundColor: colors.bg_tab },

  modalBox: {
    width: 300,
    // height: 300,
    backgroundColor: colors.bg_content,
    padding: 20,
    alignItems: 'center',
    gap: INPUT_GAP_VERTICAL,
  },
  modalContent: {
    width: '100%',
    flexDirection: 'column',
    position: 'relative',
    gap: INPUT_GAP_VERTICAL,
  },
}));
