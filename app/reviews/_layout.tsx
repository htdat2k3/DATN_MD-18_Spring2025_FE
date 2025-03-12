import React from "react";
import { Stack } from "expo-router";

const ReviewsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="review" options={{
        title: "Đánh giá của tôi", headerTitleAlign: 'center', headerStyle: {
          backgroundColor: '#00A65E',

        },
        headerTintColor: "white"
      }} />
    </Stack>
  );
};

export default ReviewsLayout;
