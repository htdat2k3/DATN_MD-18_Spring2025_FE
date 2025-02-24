import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";

const WelcomeScreen = ({navigation}) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login"); // Chuyển sang màn hình đăng nhập sau 3s
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#008F4C", // Màu nền xanh lá
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150, 
    height: 150,
    resizeMode: "contain",
  },
});

export default WelcomeScreen;
