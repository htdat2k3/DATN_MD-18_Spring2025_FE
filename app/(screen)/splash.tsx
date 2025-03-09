
import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router'

export default function SplashScreen() {

    const router = useRouter()
    const { width, height } = useWindowDimensions()
    // useEffect(() => {
    //     setTimeout(() => {
    //         router.replace("/(category)/category")
    //     }, 5000)
    // })

    return (
        <View style={styles.container}>
            <Image source={require("../../assets/images/icon_shop.png")} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#4CAF50",
        alignItems: "center",
        justifyContent: "center"
    }
})