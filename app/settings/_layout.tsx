import React from "react";
import { Stack } from "expo-router";

const SettingDetailsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="settings" options={{
        title: "Cài đặt", headerTitleAlign: 'center', headerStyle: {
          backgroundColor: '#00A65E',

        },
        headerTintColor: "white"
      }} />
    </Stack>
  );
};

export default SettingDetailsLayout;
