import { View, Text, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import ItemCategory from '@/components/ItemCategory'
import { Category } from '@/constants/Types';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { BASE_URL, Colors } from '@/constants/Colors';
import { Link } from "expo-router";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from '@/components/common/ThemedView';
import { ThemedText } from '@/components/common/ThemedText';
import { AntDesign } from '@expo/vector-icons';
import { formatMoney, formatNumberWithCommas } from '@/constants/Utils';
import { ActivityIndicator } from 'react-native';


export default function category() {

    const { id } = useLocalSearchParams()
    console.log("Id = " + id);

    const [productsList, setProductsList] = useState([])
    const [loading, setLoading] = useState(true);
    const handleLikeProduct = async (productId: number, userId: number, status: boolean) => {
        const response = await axios.post(`${BASE_URL}product/like`, {
            product_id: productId,
            user_id: userId,
            status: status
        });
        // if (response.data != null) {
        //     const dataResult = productsList.map((data) => data.product_id === productId ? ({
        //         ...data, isFavourite: status,
        //     }) : data)
        //     setProductsList(dataResult)
        // }
    }
    const handleGetProductDetailById = async () => {
        try {
            if (id === "999999" || id == "999999") {
                console.log("VAO 1");

                // get all product list 
                const response = await axios.get(`${BASE_URL}product/all-list`);
                try {
                    setLoading(false)
                    console.log("product response 1 = " + JSON.stringify(response.data.data));
                    const dataResult = JSON.parse(JSON.stringify(response.data.data))
                    setProductsList(dataResult)
                } catch (error) {
                    console.error("Invalid JSON string", error);
                    setProductsList([])
                }
            } else {
                setLoading(true);
                const response = await axios.get(`${BASE_URL}product/category_id/${id}`);
                if (response.data) {
                    setTimeout(() => {
                        setProductsList(JSON.parse(JSON.stringify(response.data.data)))
                        setLoading(false)
                    }, 2000)
                } else {
                    setTimeout(() => {
                        setProductsList([]);
                        setLoading(false)
                    }, 2000)
                }
            }

        } catch (error) {
            console.error("Error fetching product details:", error);
            setTimeout(() => {
                setLoading(false);
                setProductsList([]);
            }, 2000);
        } finally {

        }
    };

    useEffect(() => {
        handleGetProductDetailById()
    }, [])

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6200ea" />
                <Text style={styles.message}>Loading...</Text>
            </View>
        );
    }

    if (!productsList.length) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.message}>No get for data product detail.</Text>
            </View>
        );
    }


    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.list}>
                    {productsList.map((item, index) => (
                        <Link key={index} href={`product-details/${item.product_id}`} style={styles.itemContainer}>
                            <ThemedView colorRole="surface" style={styles.itemWrapper}>
                                <Image
                                    style={styles.itemImg}
                                    source={{ uri: `${BASE_URL}/${item.current_images[0]}` }}
                                />
                                <ThemedText>{item.product_name}</ThemedText>

                                <View style={styles.ratingSection}>
                                    {Array(item.rating)
                                        .fill(0)
                                        .map((_, subIndex) => (
                                            <AntDesign
                                                key={subIndex}
                                                name="star"
                                                size={16}
                                                color="#FFA235"
                                                style={{ marginRight: 3 }}
                                            />
                                        ))}
                                    <ThemedText>({item.rating})</ThemedText>
                                </View>
                            </ThemedView>
                        </Link>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        marginHorizontal: 16,
        marginBottom: 30
    },
    titleSection: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    list: {
        marginTop: 10,
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    itemContainer: {
        width: "48%",
        marginBottom: 8, // Khoảng cách dọc giữa các item
    },
    itemWrapper: {
        position: "relative",
        width: "100%",
        borderRadius: 10,
        overflow: "hidden",
        padding: 10,
    },
    itemImg: {
        width: "100%",
        height: 150,
        resizeMode: "contain",
    },
    ratingSection: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    message: {
        marginTop: 16,
        fontSize: 16,
        color: "#000",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white", // Optional: Adjust background color if needed
        padding: 16, // Optional: Adds spacing for better alignment on smaller screens
    },
});
