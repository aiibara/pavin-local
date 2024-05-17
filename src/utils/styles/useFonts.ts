import { useFonts as useFont } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { useCallback } from 'react';

SplashScreen.preventAutoHideAsync();

const useFonts = () => {
   const [fontsLoaded, fontError] = useFont({
            'NunitoSans-Light':require('../../../assets/fonts/NunitoSans-Light.ttf'),
            'NunitoSans-Regular':require('../../../assets/fonts/NunitoSans-Regular.ttf'),
            'NunitoSans-SemiBold':require('../../../assets/fonts/NunitoSans-SemiBold.ttf'),
            'NunitoSans-Bold':require('../../../assets/fonts/NunitoSans-Bold.ttf'),
            'NunitoSans-ExtraBold':require('../../../assets/fonts/NunitoSans-ExtraBold.ttf'),
            'Roboto-Light':require('../../../assets/fonts/Roboto-Light.ttf'),
            'Roboto-Regular':require('../../../assets/fonts/Roboto-Regular.ttf'),
            'Roboto-Medium':require('../../../assets/fonts/Roboto-Medium.ttf'),
            'Roboto-Bold':require('../../../assets/fonts/Roboto-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return {onLayoutRootView};
}

export default useFonts