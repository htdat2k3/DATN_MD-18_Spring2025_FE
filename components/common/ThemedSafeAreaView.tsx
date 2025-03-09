import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor/useThemeColor";
import { SafeAreaView, StatusBar, View, type ViewProps } from "react-native";

export type Props = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  colorRole?: keyof typeof Colors.light & keyof typeof Colors.dark;
};

export function ThemedSafeAreaView({
  style,
  lightColor,
  darkColor,
  colorRole,
  ...otherProps
}: Props) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    colorRole ?? "background"
  );

  return (
    <SafeAreaView
      style={[
        {
          backgroundColor: backgroundColor,
          flex: 1,
          marginTop: StatusBar.currentHeight,
        },
        style,
      ]}
      {...otherProps}
    />
  );
}
