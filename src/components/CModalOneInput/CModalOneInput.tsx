import {
  INPUT_GAP_HORIZONTAL,
  INPUT_GAP_VERTICAL,
} from '@/utils/styles/constants';
import createStyle from '@/utils/styles/createStyle';
import useStyles from '@/utils/styles/useStyles';
import React, { useState } from 'react';
import { View } from 'react-native';
import CButton from '../shared/GButton/GButton';
import GTextInput from '../shared/GTextInput/GTextInput';
import TextFont from '../shared/TextFont/TextFont';

export interface CModalOneInput {
  label: string;
  primaryLabel: string;
  onPressPrimary: (value: string) => void;
}

const CModalOneInput = ({
  label,
  primaryLabel,
  onPressPrimary,
}: CModalOneInput) => {
  const { styles } = useStyles(styleSheets);
  const [text, setText] = useState('');

  const onChangeText = (text: string) => {
    setText(text);
  };

  return (
    <View style={styles.modalBox}>
      <TextFont>{label}</TextFont>
      <View style={styles.modalContent}>
        <View style={{ height: 35 }}>
          <GTextInput _onBlur={onChangeText} initialValue={text} />
        </View>

        <CButton title={primaryLabel} onPress={() => onPressPrimary(text)} />
      </View>
    </View>
  );
};

export default CModalOneInput;

const styleSheets = createStyle((colors) => ({
  items: {
    gap: 12,
  },
  col2Input: { flex: 0.3 },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: INPUT_GAP_HORIZONTAL,
  },
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
