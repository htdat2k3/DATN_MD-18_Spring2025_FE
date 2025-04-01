import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor/useThemeColor";
import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { PropsWithChildren } from "react";

type IconProps = PropsWithChildren<{
  lightColor?: string;
  darkColor?: string;
  colorRole?: keyof typeof Colors.light & keyof typeof Colors.dark;
  icon:
    | {
        type: IconType.MatetrialIcon;
        name: keyof typeof MaterialIcons.glyphMap;
      }
    | {
        type: IconType.FontAweomseIcon;
        name: keyof typeof FontAwesome.glyphMap;
      }
    | { type: IconType.Ionicon; name: keyof typeof Ionicons.glyphMap };
  size: number;
}>;

export enum IconType {
  MatetrialIcon,
  FontAweomseIcon,
  Ionicon,
}

const ThemedIcon = ({
  lightColor,
  darkColor,
  colorRole,
  icon,
  size,
  ...otherProps
}: IconProps) => {
  const iconColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    colorRole ?? "text"
  );
  return (
    <>
      {icon.type === IconType.FontAweomseIcon ? (
        <FontAwesome name={icon.name} size={size} color={iconColor} />
      ) : icon.type === IconType.MatetrialIcon ? (
        <MaterialIcons name={icon.name} size={size} color={iconColor} />
      ) : icon.type === IconType.Ionicon ? (
        <Ionicons name={icon.name} size={size} color={iconColor} />
      ) : null}
    </>
  );
};
export default ThemedIcon;
