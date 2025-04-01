import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { Colors } from "@/constants/Colors";
import { NewProductData } from "@/constants/Data";
import { formatNumberWithCommas } from "@/constants/Utils";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image, StyleSheet, View } from "react-native";

export default function PopularProductList() {
  return (
    <View style={styles.container}>
      <View style={styles.titleSection}>
        <ThemedText type="subtitle">Sản phẩm phổ biến</ThemedText>
        <Link href="/temp">
          <ThemedText style={{ color: Colors.dark.primary }}>Tất cả</ThemedText>
        </Link>
      </View>
      <View style={styles.list}>
        {NewProductData.map((item, index) => (
          <Link
            key={`popular-product-${index}`}
            href={`${item.path}`}
            style={{ width: "48%" }}
          >
            <ThemedView colorRole="surface" style={styles.itemWrapper}>
              <Image
                style={styles.itemImg}
                source={require("../../../assets/images/tshirt.png")}
              />
              <ThemedText>{item.name}</ThemedText>
              <ThemedText type="defaultSemiBold">
                {formatNumberWithCommas(item.price) + " VND"}
              </ThemedText>
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
                <ThemedText>({item.numReview})</ThemedText>
              </View>
              <AntDesign
                name="hearto"
                size={22}
                color="#FFF"
                style={{ position: "absolute", top: 10, right: 10 }}
              />
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
    justifyContent: "space-between",
    flexWrap: "wrap",
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
