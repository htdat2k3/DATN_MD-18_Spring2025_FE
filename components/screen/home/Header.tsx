import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedInput } from "@/components/common/ThemedInput";
import { ThemedView } from "@/components/common/ThemedView";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";

export default function Header() {
  const [searchValue, setSearchValue] = useState<string>("");
  return (
    <View style={styles.headerWrapper}>
      <ThemedView style={styles.headerInputWrapper}>
        <MaterialIcons name="search" size={30} color={Colors.dark.primary} />
        <ThemedInput
          style={styles.headerInput}
          onChangeText={(e) => setSearchValue(e)}
          value={searchValue}
          placeholder="Tìm kiếm..."
          keyboardType="default"
          placeholderTextColor="gray"
        />
      </ThemedView>
      <TouchableOpacity onPress={() => alert("alo")}>
        <ThemedView style={styles.headerShoppingBtn}>
          <MaterialIcons
            name="shopping-cart"
            size={30}
            color={Colors.dark.primary}
          />
        </ThemedView>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    position: "sticky",
    top: 0,
    width: "100%",
    backgroundColor: Colors.dark.primary,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  headerInputWrapper: {
    height: 50,
    width: "85%",
    paddingHorizontal: 10,
    borderRadius: 20,
    fontSize: 18,
    flexDirection: "row",
    alignItems: "center",
  },
  headerInput: {
    width: "85%",
  },
  headerShoppingBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
