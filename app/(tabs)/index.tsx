import { StyleSheet, ScrollView, View, RefreshControl, Dimensions } from "react-native";
import { ThemedSafeAreaView } from "@/components/common/ThemedSafeAreaView";
import Header from "@/components/screen/home/Header";
import CategoryList from "@/components/screen/home/CategoryList";
import NewProductList from "@/components/screen/home/NewProductList";
import PopularProductList from "@/components/screen/home/PopularProductList";
import { useState, useEffect, useRef } from "react";
import { FlatList, Image } from "react-native";

const { width } = Dimensions.get("window");

const sliderImages = [
  require("../../assets/images/home-landing-img.png"),
  require("../../assets/images/home-landing-img.png"),
  require("../../assets/images/home-landing-img.png"),
];

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate an async action such as fetching data
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: currentIndex,
        animated: true,
      });
    }
  }, [currentIndex]);

  return (
    <ThemedSafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          <Header />
          <View style={styles.sliderContainer}>
            <FlatList
              ref={flatListRef}
              data={sliderImages}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <Image source={item} style={styles.sliderImage} />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.indicatorContainer}>
              {sliderImages.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.indicator,
                    index === currentIndex && styles.activeIndicator,
                  ]}
                />
              ))}
            </View>
          </View>
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
  sliderContainer: {
    height: 200,
    marginVertical: 16,
  },
  sliderImage: {
    width: width,
    height: 200,
    resizeMode: "cover",
  },
  indicatorContainer: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  indicator: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "#cccccc",
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: "#000000",
  },
});
