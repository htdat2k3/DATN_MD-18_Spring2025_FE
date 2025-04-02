import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { Colors } from "@/constants/Colors";
import { CategoryData } from "@/constants/Data";
import { CategoryItemType } from "@/constants/Types";
import { FontAwesome5 } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet, View } from "react-native";

export default function CategoryList() {


  const [categoryList, useCategoryList] = useState<CategoryItemType[]>([])
  useEffect(() => {
    const dataResult: CategoryItemType[] = CategoryData.map((data, index) =>
      ({ ...data, path: "/category-details/" + index })
    )
    useCategoryList(dataResult)
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
          <Link href={`${item.path}`}>
            <ThemedView colorRole="surface" style={styles.itemBg}>
              <FontAwesome5
                name={item.icon}
                size={30}
                color={Colors.dark.primary}
              />
            </ThemedView>
          </Link>
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
