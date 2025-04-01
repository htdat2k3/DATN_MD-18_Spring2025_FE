import React, { PropsWithChildren } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { useRouter } from "expo-router";
import { ThemedSafeAreaView } from "./ThemedSafeAreaView";
import ThemedIcon, { IconType } from "./ThemedIcon";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";

type Props = PropsWithChildren<{
  headerTitle: string;
  backButtonShown?: boolean;
  iconColor?: string;
}>;

const SharedLayout = ({
  children,
  headerTitle,
  backButtonShown = true,
}: Props) => {
  const router = useRouter();

  return (
    <ThemedSafeAreaView>
      <ThemedView style={styles.headerSection}>
        {backButtonShown ? (
          <TouchableOpacity activeOpacity={1} onPress={() => router.back()}>
            <MaterialIcons name="arrow-back-ios-new" size={30} color="#FFF" />
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
        <ThemedText lightColor="#FFF" darkColor="#FFF" type="subtitle">
          {headerTitle}
        </ThemedText>
        <View></View>
      </ThemedView>
      {children}
    </ThemedSafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerSection: {
    backgroundColor: Colors.dark.primary,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
});

export default SharedLayout;
