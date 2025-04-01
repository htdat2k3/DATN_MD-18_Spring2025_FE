import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor/useThemeColor";
import { View, type ViewProps } from "react-native";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  colorRole?: keyof typeof Colors.light & keyof typeof Colors.dark;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  colorRole,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    colorRole ?? "background"
  );

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
