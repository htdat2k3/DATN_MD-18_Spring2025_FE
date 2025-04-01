import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name='address' options={{
                title: "Địa chỉ", headerTitleAlign: 'center', headerStyle: {
                    backgroundColor: '#00A65E',

                },
                headerTintColor: "white"
            }} />
            <Stack.Screen name='add_address' options={{
                title: "Thêm địa chỉ", headerTitleAlign: 'center', headerStyle: {
                    backgroundColor: '#00A65E',

                },
                headerTintColor: "white"
            }} />

        </Stack>
    )
}