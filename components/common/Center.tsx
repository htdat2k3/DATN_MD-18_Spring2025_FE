import React from "react";
import { View } from "react-native";

interface CenterProps {
  children: React.ReactNode;
}

const Center = ({ children }: CenterProps) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </View>
  );
};

export default Center;
