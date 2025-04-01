import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "@/hooks/useThemeColor/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="(category)" options={{ headerShown: false }} />
        <Stack.Screen name="(screen)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="(login)" options={{ headerShown: false }} />
        <Stack.Screen name="(register)" options={{ headerShown: false }} /> */}

        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="product-details" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
