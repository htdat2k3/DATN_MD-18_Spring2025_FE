import { useGlobalState } from "@/components/global/GlobalStateProvider";
import { BASE_URL } from "@/constants/Colors";
import { ProductFavourite } from "@/constants/Types";
import axios from "axios";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from "react-native";
import { ThemedSafeAreaView } from "@/components/common/ThemedSafeAreaView";

const FavoriteScreen = () => {
    const [favorites, setFavorites] = useState([]);
    const { user } = useGlobalState()
    const router = useRouter()
    useEffect(() => {
        getAllProductFavorite(user?.user_id || 1);
    }, [])
    const handleRemove = async (id: number, user_id: number) => {
        // setFavorites(favorites.filter((item) => item.id !== id));
        const response = await axios.post(`${BASE_URL}product/like`, {
            product_id: id,
            user_id: user_id,
            status: false
        });
        if (response.data != null) {
            alert(response.data.message)
            const dataResult = Array.from(favorites).filter((data) => data.product_id != id)
            setFavorites(dataResult)
        }
    };


    const getAllProductFavorite = async (user_id: number) => {
        try {
            const response = await axios.get(`${BASE_URL}product/list_like/${user_id}`);
            // console.log("dataRes = " + JSON.stringify(response.data.data));
            alert(response.data.message)
            const dataRes = JSON.parse(JSON.stringify(response.data.data))
            // console.log("dataRes = " + dataRes[0].product_name);

            setFavorites(dataRes)
        }
        catch (e) {
            console.log("error = " + e);
        }
    };

    const renderItem = (item: ProductFavourite) => {
        return (
            <Link href={`product-details/${item.product_id}`} style={styles.itemContainer}>
                <View style={styles.itemContent}>
                    <Image
                        source={{ uri: `${BASE_URL}/${item.image_urls[0]}` }}
                        style={styles.itemImage}
                    />
                    <View style={styles.itemDetails}>
                        <Text style={styles.itemName} numberOfLines={1}>
                            {item.product_name}
                        </Text>
                        <Text style={styles.itemPrice} numberOfLines={2}>
                            {item.description}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => handleRemove(item.product_id, item.user_id)}
                        style={styles.removeButton}
                    >
                        <Text style={styles.removeIcon}>×</Text>
                    </TouchableOpacity>
                </View>
            </Link>
        );
    };

    return (
        <ThemedSafeAreaView defaultTop={0}>
            <View style={styles.container}>

                {favorites.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Chưa có sản phẩm yêu thích</Text>
                    </View>
                ) : (
                    <FlatList
                        data={favorites}
                        renderItem={({ item }) => renderItem(item)}
                        contentContainerStyle={styles.listContainer}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>
        </ThemedSafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    header: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#EEEEEE",
        backgroundColor: "#FFFFFF",
        elevation: 2,
    },
    headerText: {
        fontSize: 20,
        fontWeight: "600",
        color: "#000000",
        textAlign: "center",
    },
    listContainer: {
        padding: 12,
    },
    itemContainer: {
        marginBottom: 12,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    itemContent: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        backgroundColor: "#F5F5F5",
    },
    itemDetails: {
        flex: 1,
        marginLeft: 12,
        marginRight: 8,
    },
    itemName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000000",
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: 14,
        color: "#666666",
        lineHeight: 20,
    },
    removeButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#FFF0F0",
        justifyContent: "center",
        alignItems: "center",
    },
    removeIcon: {
        fontSize: 24,
        color: "#FF4444",
        fontWeight: "bold",
        marginTop: -2,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: "#666666",
        textAlign: "center",
    },
});

export default FavoriteScreen;
