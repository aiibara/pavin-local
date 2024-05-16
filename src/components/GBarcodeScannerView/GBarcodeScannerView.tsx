import CloseIcon from '@/assets/svgs/CloseIcon';
import ScannerIcon from '@/assets/svgs/ScannerIcon';
import { SCREEN_WIDTH } from '@/utils/constants';
import createStyle from '@/utils/styles/createStyle';
import useColors from '@/utils/styles/useColors';
import useStyles from '@/utils/styles/useStyles';
import { Audio } from 'expo-av';
import {
  BarcodeScanningResult,
  Camera,
  CameraView,
  PermissionStatus,
} from 'expo-camera/next';
import { ImpactFeedbackStyle, impactAsync } from 'expo-haptics';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export interface GBarcodeScannerViewProps {
  onPressClose: () => void;
  onSuccessScan: (barcode: string) => void;
}

const GBarcodeScannerView = ({
  onPressClose,
  onSuccessScan,
}: GBarcodeScannerViewProps) => {
  const colors = useColors();
  const { styles } = useStyles(stylesheets);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isFocus, setIsFocus] = useState(true);
  //   const [boxPosition, setBoxPosition] = useState<{
  //     x: number;
  //     y: number;
  //     width: number;
  //     height: number;
  //     cornerPoints: BarcodePoint[];
  //   } | null>(null);

  const [boundary, setBoundary] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  useFocusEffect(
    useCallback(() => {
      setIsFocus(true);
      return () => {
        setIsFocus(false);
      };
    }, [])
  );

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === PermissionStatus.GRANTED);
    };

    getCameraPermissions();
  }, []);

  async function playSound() {
    const sound = new Audio.Sound();
    try {
      await sound.loadAsync(require('../../assets/sounds/scan.mp3'), {
        shouldPlay: true,
      });
      await sound.setPositionAsync(0);
      await sound.playAsync();
      // await sound.unloadAsync();
    } catch (error) {
      console.error('error', error);
    }
  }

  const handleBarCodeScanned = async (result: BarcodeScanningResult) => {
    if (boundary) {
      const boxpos = {
        x:
          SCREEN_WIDTH -
          result.boundingBox.origin.y -
          result.boundingBox.size.height,
        y: result.boundingBox.origin.x,
        width: result.boundingBox.size.height,
        height: result.boundingBox.size.width,
        cornerPoints: result.cornerPoints,
      };
      if (
        boxpos.x > boundary.x &&
        boxpos.x + boxpos.width < boundary.x + boundary.width &&
        boxpos.y > boundary.y &&
        boxpos.y + boxpos.height < boundary.y + boundary.height
      ) {
        console.log('barcode', result.data);
        setIsScanning(false);
        impactAsync(ImpactFeedbackStyle.Medium);
        await playSound();
        onSuccessScan(result.data);
      }
      // setBoxPosition(boxpos);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (!isFocus) {
    return null;
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={isScanning ? handleBarCodeScanned : undefined}
        style={[StyleSheet.absoluteFillObject]}
      >
        <View style={{ position: 'absolute', top: 20, right: 20 }}>
          <TouchableOpacity onPress={() => onPressClose()}>
            <CloseIcon fill={colors.text_primary} />
          </TouchableOpacity>
        </View>
        {/* <View
          style={{
            width: boxPosition?.width || 0,
            height: boxPosition?.height || 0,
            backgroundColor: 'pink',
            left: boxPosition?.x || 0,
            top: boxPosition?.y || 0,
            position: 'absolute',
          }}
        ></View> */}

        <View
          style={{
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
          }}
        >
          <View
            style={[
              styles.barcodeBox,
              {
                opacity: isScanning ? 0.8 : 0,
              },
            ]}
            onLayout={(e) => {
              setBoundary(e.nativeEvent.layout);
            }}
          >
            <View
              style={[styles.barcodeBoxCorner, styles.barcodeBoxTopLeftCorner]}
            ></View>
            <View
              style={[styles.barcodeBoxCorner, styles.barcodeBoxTopRightCorner]}
            ></View>
            <View
              style={[
                styles.barcodeBoxCorner,
                styles.barcodeBoxBottomLeftCorner,
              ]}
            ></View>
            <View
              style={[
                styles.barcodeBoxCorner,
                styles.barcodeBoxBottomRightCorner,
              ]}
            ></View>
          </View>
          <View style={styles.scanBtnContainer}>
            <TouchableOpacity
              onPressIn={() => setIsScanning(true)}
              onPressOut={() => setIsScanning(false)}
              style={styles.scanBtn}
            >
              <ScannerIcon
                fill={colors.text_secondary}
                width={50}
                height={50}
              />
              {/* <TextFont>'Hold to Scan'</TextFont> */}
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
};

export default GBarcodeScannerView;

const stylesheets = createStyle((colors) => ({
  container: {
    flex: 1,
    backgroundColor: 'green',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  barcodeBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.text_primary,
    borderRadius: 10,
    width: 250,
    height: 100,
  },
  barcodeBoxCorner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: colors.text_primary,
  },
  barcodeBoxTopLeftCorner: {
    top: 0,
    left: 0,
    borderTopWidth: 5,
    borderLeftWidth: 5,
    borderTopLeftRadius: 10,
  },
  barcodeBoxTopRightCorner: {
    top: 0,
    right: 0,
    borderTopWidth: 5,
    borderRightWidth: 5,
    borderTopRightRadius: 10,
  },
  barcodeBoxBottomLeftCorner: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderBottomStartRadius: 10,
  },
  barcodeBoxBottomRightCorner: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderBottomRightRadius: 10,
  },
  scanBtnContainer: {
    position: 'absolute',
    bottom: 20,
    padding: 10,
  },
  scanBtn: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    width: 80,
    height: 80,

    backgroundColor: 'green',
  },
}));
