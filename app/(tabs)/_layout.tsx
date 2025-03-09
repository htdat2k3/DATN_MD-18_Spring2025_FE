import React from "react";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import TabBarBackground from "@/components/common/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useThemeColor/useColorScheme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ScreenRouteType } from "@/constants/Types";

const screenRoutes: ScreenRouteType[] = [
  {
    routeName: "index",
    icon: "home",
    title: "Trang chủ",
  },
  {
    routeName: "bookmark",
    icon: "bookmark",
    title: "Khám phá",
  },
  {
    routeName: "notification",
    icon: "notifications",
    title: "Thông báo",
  },
  {
    routeName: "profile",
    icon: "account-box",
    title: "Tài khoản",
  },
];

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].primary,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {
            backgroundColor: Colors[colorScheme ?? "light"].background,
          },
        }),
      }}
    >
      {screenRoutes.map((item) => (
        <Tabs.Screen
          key={item.routeName}
          name={item.routeName}
          options={{
            headerShown: false,
            title: item.title,
            tabBarIcon: ({ color }) => (
              <MaterialIcons name={item.icon} size={30} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
