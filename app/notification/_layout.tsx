import React from "react";
import { Stack } from "expo-router";

const NotificationDetailsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="notification_user" options={{
        title: "Thông báo", headerTitleAlign: 'center', headerStyle: {
          backgroundColor: '#00A65E',

        },
        headerTintColor: "white"
      }} />
    </Stack>
  );
};

export default NotificationDetailsLayout;
