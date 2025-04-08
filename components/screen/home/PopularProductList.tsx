import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { BASE_URL, Colors } from "@/constants/Colors";
import { NewProductData } from "@/constants/Data";
import { NewProductItemType, ProductPopular } from "@/constants/Types";
import { formatNumberWithCommas } from "@/constants/Utils";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { Link, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";

interface PopularProductListProps {
  refreshKey: number;
}

const PopularProductList = ({ refreshKey }: PopularProductListProps) => {
  const [productsList, setProductsList] = useState<ProductPopular[]>([])

  const handleGetProductsList = async () => {
    const response = await axios.get(`${BASE_URL}product/popular-list`);
    try {
      console.log("product response 1 = " + JSON.stringify(response.data.data));
      setProductsList(JSON.parse(JSON.stringify(response.data.data)))
    } catch (error) {
      console.error("Invalid JSON string", error);
    }
  }
  // useEffect(() => {
  //   handleGetProductsList()
  // }, [])

  useFocusEffect(
    useCallback(() => {
      handleGetProductsList()
      return () => {
        console.log("Home screen unfocused");
      };
    }, [refreshKey])
  );
  return (
    <View style={styles.container}>
      <View style={styles.titleSection}>
        <ThemedText type="subtitle">Sản phẩm phổ biến</ThemedText>
        <Link href="/category-details/999999">
          <ThemedText style={{ color: Colors.dark.primary }}></ThemedText>
        </Link>
      </View>
      <View style={styles.list}>
        {productsList.map((item, index) => (
          <Link
            key={`popular-product-${index}`}
            href={`${item.path}`}
            style={styles.itemContainer}
          >
            <ThemedView colorRole="surface" style={styles.itemWrapper}>
              <Image
                style={styles.itemImg}
                source={{ uri: `${BASE_URL}/${item.image_url}` }}
              />
              <ThemedText>{item.product_name}</ThemedText>

              <View style={styles.ratingSection}>
                {Array(item.rating)
                  .fill(0)
                  .map((_, subIndex) => (
                    <AntDesign
                      key={subIndex}
                      name="star"
                      size={16}
                      color="#FFA235"
                      style={{ marginRight: 3 }}
                    />
                  ))}
                <ThemedText>({item.rating})</ThemedText>
              </View>
            </ThemedView>
          </Link>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    marginHorizontal: 16,
  },
  titleSection: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  list: {
    marginTop: 10,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  itemContainer: {
    width: "48%",
    marginBottom: 8, // Khoảng cách dọc giữa các item
  },
  itemWrapper: {
    position: "relative",
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
  },
  itemImg: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
  },
  ratingSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default PopularProductList;
