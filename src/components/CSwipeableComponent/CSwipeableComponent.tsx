import useStyles from '@/utils/styles/useStyles';
import MaskedView from '@react-native-masked-view/masked-view';
import React from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export interface CSwipeableComponentProps {
  leftComponent?: React.ReactNode | React.ReactNode[];
  rightComponent?: React.ReactNode | React.ReactNode[];
  children?: React.ReactNode | React.ReactNode[];
}

const CSwipeableComponent = ({
  leftComponent,
  rightComponent,
  children,
}: CSwipeableComponentProps) => {
  const { styles } = useStyles(stylesheets);
  const leftComponentWidth = useSharedValue<number>(0);
  const rightComponentWidth = useSharedValue<number>(0);
  const offset = useSharedValue<number>(0);
  const start = useSharedValue<number>(0);
  const leftC = !!leftComponent;
  const leftR = !!rightComponent;
  const initialTouchLocation = useSharedValue<{ x: number; y: number } | null>(
    null
  );
  const pan = Gesture.Pan()
    .manualActivation(true)
    .onBegin((evt) => {
      initialTouchLocation.value = { x: evt.x, y: evt.y };
      start.value = offset.value;
    })
    .onTouchesMove((evt, state) => {
      // Sanity checks
      if (!initialTouchLocation.value || !evt.changedTouches.length) {
        state.fail();
        return;
      }

      const xDiff = Math.abs(
        evt.changedTouches[0].x - initialTouchLocation.value.x
      );
      const yDiff = Math.abs(
        evt.changedTouches[0].y - initialTouchLocation.value.y
      );
      const isHorizontalPanning = xDiff > yDiff;

      if (isHorizontalPanning) {
        state.activate();
      } else {
        //   state.fail();
      }
    })
    .onChange((event) => {
      if (
        (event.translationX > 0 && leftC) ||
        (event.translationX < 0 && leftR) ||
        offset.value !== 0
      ) {
        offset.value = start.value + event.translationX;
      }
    })
    .onFinalize((e, state) => {
      let _offset = 0;
      if (offset.value > 20 || e.velocityX > 800) {
        _offset = start.value !== 0 ? 0 : leftComponentWidth.value;
      } else if (offset.value < -20 || e.velocityX < -800) {
        _offset = start.value !== 0 ? 0 : -rightComponentWidth.value;
      }
      offset.value = withSpring(_offset, {
        dampingRatio: 0.8,
        duration: 300,
      });
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: offset.value },
      // { scale: withTiming(pressed.value ? 1.2 : 1) },
    ],
    // backgroundColor: pressed.value ? '#FFE04B' : '#b58df1',
  }));

  const leftCAnimatedStyles = useAnimatedStyle(() => {
    return {
      width: offset.value < 0 ? 0 : offset.value,
    };
  });
  const rightCAnimatedStyles = useAnimatedStyle(() => {
    return {
      width: offset.value > 0 ? 0 : Math.abs(offset.value),
    };
  });

  const onLayoutLeftComponent = (event: LayoutChangeEvent) => {
    leftComponentWidth.value = event.nativeEvent.layout.width;
  };

  const onLayoutRightComponent = (event: LayoutChangeEvent) => {
    rightComponentWidth.value = event.nativeEvent.layout.width;
  };

  return (
    <View style={styles.row}>
      <View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          zIndex: -1,
          width: '100%',
          height: '100%',
          justifyContent: 'space-between',
        }}
      >
        {!!leftComponent && (
          <MaskedView
            style={styles.maskedContainer}
            maskElement={
              <Animated.View
                style={[styles.maskedViewLeft, leftCAnimatedStyles]}
              />
            }
            androidRenderingMode={'software'}
          >
            <View onLayout={onLayoutLeftComponent}>{leftComponent}</View>
          </MaskedView>
        )}

        <View style={{ flex: 1 }}></View>

        {!!rightComponent && (
          <MaskedView
            style={styles.maskedContainerRight}
            maskElement={
              <Animated.View
                style={[styles.maskedViewRight, rightCAnimatedStyles]}
              />
            }
            androidRenderingMode={'software'}
          >
            <View onLayout={onLayoutRightComponent}>{rightComponent}</View>
          </MaskedView>
        )}
      </View>

      <GestureDetector gesture={pan}>
        <Animated.View style={[animatedStyles, { flex: 1, zIndex: 1 }]}>
          {children}
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default CSwipeableComponent;

const stylesheets = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  maskedContainer: {
    zIndex: -1,
    height: '100%',
  },
  maskedContainerRight: {
    zIndex: -1,
    height: '100%',
  },
  maskedViewLeft: {
    backgroundColor: 'white',
    height: '100%',
  },
  maskedViewRight: {
    backgroundColor: 'white',
    height: '100%',
    alignSelf: 'flex-end',
  },
});
