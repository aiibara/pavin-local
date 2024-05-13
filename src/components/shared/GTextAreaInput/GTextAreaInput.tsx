import {
  INPUT_PADDING_HORIZONTAL,
  INPUT_PADDING_VERTICAL,
} from '@/utils/styles/constants';
import createStyle from '@/utils/styles/createStyle';
import useColors from '@/utils/styles/useColors';
import useStyles from '@/utils/styles/useStyles';
import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { GTextInputProps } from '../GTextInput/GTextInput';
import TextFont from '../TextFont/TextFont';

export interface GTextAreaInputProps extends GTextInputProps {}

const GTextAreaInput = ({
  label,
  initialValue = '',
  textInputContainerStyle,
  _onBlur,
  rightComponent,
  leftComponent,
  ...rest
}: GTextAreaInputProps) => {
  const { styles } = useStyles(styleSheet);
  const colors = useColors();
  const [text, setText] = useState(initialValue);

  const onBlur = () => {
    _onBlur && _onBlur(text);
  };

  const onChange = (val: string) => {
    setText(val);
  };

  return (
    <View style={[styles.container, textInputContainerStyle]}>
      {!!label && <TextFont>{label}</TextFont>}
      <View style={styles.inputContainer}>
        {leftComponent}
        <TextInput
          value={text}
          style={styles.input}
          onBlur={onBlur}
          onChangeText={onChange}
          placeholderTextColor={colors.text_placeholder}
          multiline
          {...rest}
        />
        {rightComponent}
      </View>
    </View>
  );
};

export default GTextAreaInput;

const styleSheet = createStyle((theme) => ({
  container: { flex: 1 },
  inputContainer: {
    borderWidth: 1,
    borderColor: theme.border_input,
    paddingHorizontal: INPUT_PADDING_HORIZONTAL,
    borderRadius: 10,
  },
  input: {
    color: theme.text_primary,
    paddingVertical: INPUT_PADDING_VERTICAL,
    textAlignVertical: 'top',
    flex: 1,
    minHeight: 100,
  },
}));
