import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name='chat' options={{
                title: "Chat", headerTitleAlign: 'center', headerStyle: {
                    backgroundColor: '#00A65E',
          
                  },
                  headerTintColor: "white"
            }} />
        </Stack>
    )
}