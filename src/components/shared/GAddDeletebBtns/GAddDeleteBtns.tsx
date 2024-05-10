import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import TextFont from '../TextFont/TextFont';

export interface GAddDeleteBtnsProps {
  label: string;
  onPressAdd: () => void;
  onPressDelete: () => void;
}
const GAddDeleteBtns = ({
  label,
  onPressAdd,
  onPressDelete,
}: GAddDeleteBtnsProps) => {
  return (
    <View style={styles.btnOptions}>
      <TouchableOpacity onPress={onPressAdd}>
        <TextFont>{`+ add ${label}`}</TextFont>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressDelete}>
        <TextFont>{`- delete ${label}`}</TextFont>
      </TouchableOpacity>
    </View>
  );
};

export default GAddDeleteBtns;

const styles = StyleSheet.create({
  btnOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
});
