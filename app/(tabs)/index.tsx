import { StyleSheet, ScrollView, View, Image } from "react-native";
import { ThemedSafeAreaView } from "@/components/common/ThemedSafeAreaView";
import Header from "@/components/screen/home/Header";
import Center from "@/components/common/Center";
import CategoryList from "@/components/screen/home/CategoryList";
import NewProductList from "@/components/screen/home/NewProductList";
import PopularProductList from "@/components/screen/home/PopularProductList";

export default function HomeScreen() {
  return (
    <ThemedSafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Header />
          <Center>
            <Image
              style={styles.landingImg}
              source={require("../../assets/images/home-landing-img.png")}
            />
          </Center>
          <CategoryList />
          <NewProductList />
          <PopularProductList />
        </View>
      </ScrollView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  landingImg: {
    marginTop: 20,
  },
});
