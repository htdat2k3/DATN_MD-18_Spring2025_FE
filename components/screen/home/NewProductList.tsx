import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { useGlobalState } from "@/components/global/GlobalStateProvider";
import { BASE_URL, Colors } from "@/constants/Colors";
import { NewProductData } from "@/constants/Data";
import { NewProductItemType } from "@/constants/Types";
import { formatNumberWithCommas } from "@/constants/Utils";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { Link } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export default function NewProductList() {

  const { user } = useGlobalState()
  const [productsList, setProductsList] = useState<NewProductItemType[]>([])
  const handleLikeProduct = async (productId: number, userId: number, status: boolean) => {
    const response = await axios.post(`${BASE_URL}product/like`, {
      product_id: productId,
      user_id: userId,
      status: status
    });
    if (response.data != null) {
      alert(response.data.message)
      const dataResult = productsList.map((data) => data.product_id === productId ? ({
        ...data, isFavourite: status,
      }) : data)
      setProductsList(dataResult)
    }
  }

  const handleGetProductsList = async () => {
    const response = await axios.get(`${BASE_URL}product/list/${user?.user_id}`);
    try {
      console.log("product response = " + JSON.stringify(response.data.data));
      const dataResult = JSON.parse(JSON.stringify(response.data.data))
      setProductsList(dataResult)
    } catch (error) {
      console.error("Invalid JSON string", error);
    }
  }
  useEffect(() => {
    handleGetProductsList()
    //         useCategoryList(dataResult)
  }, [])
  const memoizedItems = useMemo(() => productsList, [productsList]);

  return (
    <View style={styles.container}>
      <View style={styles.titleSection}>
        <ThemedText type="subtitle">Sản phẩm</ThemedText>
        <Link href="/category-details/999999">
          <ThemedText style={{ color: Colors.dark.primary }}>Tất cả</ThemedText>
        </Link>
      </View>
      <View style={styles.list}>
        {memoizedItems.map((item, index) => (
          <Link key={index} href={`product-details/${item.product_id}`} style={styles.itemContainer}>
            <ThemedView colorRole="surface" style={styles.itemWrapper}>
              <Image
                style={styles.itemImg}
                source={{ uri: `${BASE_URL}/${item.current_images[0]}` }}
              />
              <ThemedText>{item.product_name}</ThemedText>
              {/* <ThemedText type="defaultSemiBold">
                {formatNumberWithCommas(item.price) + " VND"}
              </ThemedText> */}
              <View style={styles.ratingSection}>
                {Array.from({ length: item.rating }).map((_, subIndex) => (
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

              <TouchableOpacity onPress={() => {
                handleLikeProduct(item.product_id, user.user_id, !item.isFavourite)
              }
              } style={{ position: "absolute", top: 10, right: 10 }}>
                {item.isFavourite ? (<AntDesign
                  name="heart"
                  size={30}
                  color="red"

                />) : (
                  <AntDesign
                    name="hearto"
                    size={30}
                    color="#FFF"
                  />
                )}
              </TouchableOpacity>
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
