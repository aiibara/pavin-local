import GContainer from '@/components/shared/GContainer/GContainer';
import TextFont from '@/components/shared/TextFont/TextFont';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { UnistylesRuntime } from 'react-native-unistyles';

const settings = () => {
  const changeTheme = () => {
    UnistylesRuntime.setTheme(
      UnistylesRuntime.themeName == 'light' ? 'dark' : 'light'
    );
  };

  return (
    <GContainer>
      <TouchableOpacity onPress={changeTheme}>
        <TextFont>ChangeTheme {UnistylesRuntime.themeName}</TextFont>
      </TouchableOpacity>
    </GContainer>
  );
};

export default settings;

const styles = StyleSheet.create({});
