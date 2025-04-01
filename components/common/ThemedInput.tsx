import { TextInputProps, TextInput } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor/useThemeColor";

export type ThemedInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  colorRole?: keyof typeof Colors.light & keyof typeof Colors.dark;
};

export function ThemedInput({
  style,
  lightColor,
  darkColor,
  colorRole,
  ...otherProps
}: ThemedInputProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    colorRole ?? "background"
  );
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    colorRole ?? "text"
  );

  return (
    <TextInput style={[{ backgroundColor, color }, style]} {...otherProps} />
  );
}
