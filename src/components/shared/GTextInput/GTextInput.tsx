import {
  INPUT_PADDING_HORIZONTAL,
  INPUT_PADDING_VERTICAL,
} from '@/utils/styles/constants';
import createStyle from '@/utils/styles/createStyle';
import useStyles from '@/utils/styles/useStyles';
import React, { useState } from 'react';
import {
  StyleProp,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import TextFont from '../TextFont/TextFont';

export interface GTextInputProps extends Partial<TextInputProps> {
  label?: string;
  textInputContainerStyle?: StyleProp<ViewStyle>;
  _onBlur?: (value: string) => void;
  rightComponent?: React.ReactNode;
  leftComponent?: React.ReactNode;
  initialValue?: string | undefined;
}
const GTextInput = ({
  initialValue = '',
  label,
  textInputContainerStyle,
  _onBlur,
  rightComponent,
  leftComponent,
  ...rest
}: GTextInputProps) => {
  const { styles } = useStyles(styleSheet);
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
        {rightComponent}
        <TextInput
          value={text}
          style={styles.input}
          onBlur={onBlur}
          onChangeText={onChange}
          {...rest}
        />
        {leftComponent}
      </View>
    </View>
  );
};

export default React.memo(GTextInput);

const styleSheet = createStyle((theme) => ({
  container: { flex: 1 },
  inputContainer: {
    borderWidth: 1,
    borderColor: theme.border_input,
    color: theme.text_primary,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: INPUT_PADDING_HORIZONTAL,
    justifyContent: 'space-between',
    gap: 5,
  },
  input: {
    color: theme.text_primary,
    paddingVertical: INPUT_PADDING_VERTICAL,
  },
}));
