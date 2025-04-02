import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { BASE_URL, Colors } from "@/constants/Colors";
import { CategoryData } from "@/constants/Data";
import { CategoryItemType } from "@/constants/Types";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet, View } from "react-native";

export default function CategoryList() {

  const [categoryList, useCategoryList] = useState<CategoryItemType[]>([])
  const handleCallCategoryList = async () => {
    console.log("------> handleCallCategoryList");
    try {
      const response = await axios.get(`${BASE_URL}category/list`);
      useCategoryList(JSON.parse(JSON.stringify(response.data.data)))
    } catch (error) {
      console.error("Invalid JSON string", error);
    }
  }
  useEffect(() => {
    console.log("====> CALL API");

    handleCallCategoryList()
  }, [])

  return (
    <View style={styles.container}>
      <ThemedText type="subtitle" style={{ marginLeft: 16 }}>
        Danh mục
      </ThemedText>
      <FlatList
        style={{ marginTop: 10 }}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        data={categoryList}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }: ListRenderItemInfo<CategoryItemType>) => (
          <View
            style={{
              height: 50,
              width: 100,
              borderRadius: 25, // Half of height/width for a perfect circle
              backgroundColor: "#4caf50",
              justifyContent: "center", // Center vertically
              alignItems: "center", // Center horizontally
              alignSelf: "center", // Center the View itself if needed
            }}
          >
            <Link href={`category-details/${item.category_id}`}>
              <ThemedText>{item.name}</ThemedText>
            </Link>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
  itemBg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
