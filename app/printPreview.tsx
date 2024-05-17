import GContainer from '@/components/shared/GContainer/GContainer';
import PrintPreviewScreen from '@/screens/PrintPreviewScreen/PrintPreviewScreen';
import React from 'react';
import { StyleSheet } from 'react-native';

const PrintPreview = () => {
  return (
    <GContainer>
      <PrintPreviewScreen />
    </GContainer>
  );
};

export default PrintPreview;

const styles = StyleSheet.create({});
