import { persistor, store } from '@/providers/redux/store';
import useColors from '@/utils/styles/useColors';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

export default function Layout() {
  const colors = useColors();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={{ flex: 1, backgroundColor: '#000' }}>
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
            />
          </View>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}
