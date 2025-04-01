import React from "react";
import { Stack } from "expo-router";

const ProductDetailsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ProductDetailsLayout;
