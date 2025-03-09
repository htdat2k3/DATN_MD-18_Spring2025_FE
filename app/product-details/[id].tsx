import Center from "@/components/common/Center";
import SharedLayout from "@/components/common/SharedLayout";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { ColorSelectorList } from "@/constants/Data";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export default function MovieDetails() {
  const [selectedColor, setSelectedColor] = useState<string>(
    ColorSelectorList[0]
  );
  return (
    <SharedLayout backButtonShown iconColor="black" headerTitle="Chi tiết">
      <View style={styles.container}>
        {/* Title */}
        <ThemedText type="title">Áo tay dài</ThemedText>
        <View style={styles.ratingSection}>
          {Array(5)
            .fill(0)
            .map((_, subIndex) => (
              <AntDesign
                key={subIndex}
                name="star"
                size={20}
                color="#FFA235"
                style={{ marginRight: 3 }}
              />
            ))}
          <ThemedText type="subtitle">5.0</ThemedText>
        </View>
        {/* IMG */}
        <ThemedView colorRole="surface" style={styles.imgWrapper}>
          <Image
            style={styles.img}
            source={require("../../assets/images/tshirt.png")}
          />
        </ThemedView>
        {/* Properties */}
        <View style={styles.colorSelector}>
          <ThemedText type="subtitle">Màu sắc:</ThemedText>
          {ColorSelectorList.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedColor(item)}
            >
              <View
                style={[
                  styles.colorItem,
                  {
                    backgroundColor: item,
                    borderWidth: 3,
                    borderColor: selectedColor === item ? "#DC3545" : item,
                  },
                ]}
              ></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SharedLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 16,
  },
  ratingSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  imgWrapper: {
    marginTop: 20,
    height: 200,
    borderRadius: 15,
  },
  img: {
    height: "100%",
    resizeMode: "contain",
  },
  colorSelector: {
    width: "100%",
    marginTop: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  colorItem: {
    borderWidth: 2,
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
});
