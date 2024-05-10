import createStyle from '@/utils/styles/createStyle';
import useStyles from '@/utils/styles/useStyles';
import React, { Ref, forwardRef, useImperativeHandle, useState } from 'react';
import { Modal, TouchableWithoutFeedback, View } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';

export interface GModalRef {
  open: () => void;
  close: () => void;
}
export interface GModalProps {
  children?: React.ReactNode | React.ReactNode[];
}

const GModal = ({ children }: GModalProps, ref: Ref<GModalRef>) => {
  const { styles } = useStyles(styleSheets);

  const [isVisible, setIsVisible] = useState(false);

  const closeModal = () => {
    setIsVisible(false);
  };

  const openModal = () => {
    setIsVisible(true);
  };

  useImperativeHandle(ref, () => ({
    open: openModal,
    close: closeModal,
  }));

  return (
    <Modal animationType='slide' transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalBg} />
        </TouchableWithoutFeedback>
        <Animated.View
          entering={FadeInDown.duration(500)}
          exiting={FadeOutDown.duration(500)}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default forwardRef(GModal);

const styleSheets = createStyle((colors) => ({
  modalContent: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBg: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.bg_content,
    opacity: 0.3,
    position: 'absolute',
  },
}));
