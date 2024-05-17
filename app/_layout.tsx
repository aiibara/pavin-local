import { persistor, store } from '@/providers/redux/store';
import useColors from '@/utils/styles/useColors';
import useFonts from '@/utils/styles/useFonts';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

export default function Layout() {
  
  const colors = useColors();
  const { onLayoutRootView } = useFonts() || {};
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View
            style={{ flex: 1, backgroundColor: '#000' }}
            onLayout={() => onLayoutRootView && onLayoutRootView()}
          >
            <Stack
              screenOptions={{
                headerStyle: {
                  backgroundColor: colors.bg_header,
                },
                headerTintColor: colors.text_primary,
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            >
              <Stack.Screen
                name='printPreview'
                options={{
                  title: 'Print',
                  presentation: 'modal',
                }}
              />
            </Stack>
          </View>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}
