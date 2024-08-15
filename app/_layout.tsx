import { Stack } from "expo-router";
import { useFonts } from 'expo-font';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}
