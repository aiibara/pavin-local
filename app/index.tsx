import '@/assets/colors/unistyles';
import PlusIcon from '@/assets/svgs/PlusIcon';
import SettingIcon from '@/assets/svgs/SettingIcon';
import GContainer from '@/components/shared/GContainer/GContainer';
import HomeScreen from '@/screens/HomeScreen/HomeScreen';
import useColors from '@/utils/styles/useColors';
import { Stack, useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function App() {
  return (
    <GContainer>
      <Stack.Screen
        options={{
          title: 'Home',
          headerRight: () => <RightToolbar />,
        }}
      />
      <HomeScreen />
    </GContainer>
  );
}

const RightToolbar = () => {
  const colors = useColors();
  const router = useRouter();

  const navigateToSetting = () => {
    router.push('/settings');
  };

  const navigateToAddProduct = () => {
    router.push('/addProduct');
  };
  return (
    <View style={styles.toolBar}>
      <TouchableOpacity onPress={navigateToSetting}>
        <SettingIcon fill={colors.text_primary} />
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToAddProduct}>
        <PlusIcon fill={colors.text_primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  toolBar: {
    flexDirection: 'row',
    gap: 12,
  },
});
