import React from "react";
import { Stack } from "expo-router";

const SettingDetailsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="[id]" options={{
        title: "Chi tiết hóa đơn", headerTitleAlign: 'center', headerStyle: {
          backgroundColor: '#00A65E',

        },
        headerTintColor: "white"
      }} />
    </Stack>
  );
};

export default SettingDetailsLayout;
