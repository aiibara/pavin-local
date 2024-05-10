import {
  INPUT_PADDING_HORIZONTAL,
  INPUT_PADDING_VERTICAL,
} from '@/utils/styles/constants';
import createStyle from '@/utils/styles/createStyle';
import useStyles from '@/utils/styles/useStyles';
import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { GTextInputProps } from '../GTextInput/GTextInput';
import TextFont from '../TextFont/TextFont';

export interface GTextAreaInputProps extends GTextInputProps {}

const GTextAreaInput = ({
  label,
  value = '',
  textInputContainerStyle,
  _onBlur,
  ...rest
}: GTextAreaInputProps) => {
  const { styles } = useStyles(styleSheet);
  const [text, setText] = useState(value);

  const onBlur = () => {
    _onBlur && _onBlur(text);
  };

  const onChange = (val: string) => {
    setText(val);
  };

  return (
    <View style={[styles.container, textInputContainerStyle]}>
      {!!label && <TextFont>{label}</TextFont>}

      <TextInput
        value={text}
        style={styles.input}
        onBlur={onBlur}
        onChangeText={onChange}
        multiline
        {...rest}
      />
    </View>
  );
};

export default GTextAreaInput;

const styleSheet = createStyle((theme) => ({
  container: { flex: 1 },
  input: {
    borderWidth: 1,
    borderColor: theme.border_input,
    color: theme.text_primary,
    paddingHorizontal: INPUT_PADDING_HORIZONTAL,
    paddingVertical: INPUT_PADDING_VERTICAL,
    borderRadius: 10,
    flex: 1,
    minHeight: 100,
    textAlignVertical: 'top',
  },
}));
