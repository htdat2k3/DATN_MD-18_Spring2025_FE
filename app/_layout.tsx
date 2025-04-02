import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "@/hooks/useThemeColor/useColorScheme";
import { GlobalStateProvider } from "@/components/global/GlobalStateProvider";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  return (
    <GlobalStateProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <StatusBar hidden />
        <Stack>
          <Stack.Screen name="(category)" options={{ headerShown: false, }} />
          <Stack.Screen name="(screen)" options={{ headerShown: false, }} />
          <Stack.Screen name="(login)" options={{ headerShown: false }} />
          <Stack.Screen name="(register)" options={{ headerShown: false }} />

          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="product-details" options={{
            title: "Chi tiết", headerTitleAlign: 'center', headerStyle: {
              backgroundColor: '#00A65E',

            },
            headerTintColor: "white"
          }} />
          <Stack.Screen name="category-details" options={{
            title: "Danh mục", headerTitleAlign: 'center', headerStyle: {
              backgroundColor: '#00A65E',

            },
            headerTintColor: "white"
          }} />
          <Stack.Screen name="settings" options={{
            headerShown: false
          }} />
          <Stack.Screen name="evaluation" options={{
            headerShown: false
          }} />
          <Stack.Screen name="notification" options={{
            headerShown: false
          }} />
          <Stack.Screen name="detail-order" options={{
            headerShown: false
          }} />
          <Stack.Screen name="checkout" options={{
            headerShown: false
          }} />
          <Stack.Screen name="congratulate" options={{
            headerShown: false
          }} />
          <Stack.Screen name="failure" options={{
            headerShown: false
          }} />
          <Stack.Screen name='all-product' options={{
            headerShown: false
          }} />
          <Stack.Screen name="reviews" options={{
            headerShown: false
          }} />
          <Stack.Screen name="favorite" options={{
            headerShown: false
          }} />
          <Stack.Screen name="forgot_password" options={{
            headerShown: false
          }} />
          <Stack.Screen name="chat" options={{
            headerShown: false
          }} />
        </Stack>
      </ThemeProvider>
    </GlobalStateProvider>

  );
}
