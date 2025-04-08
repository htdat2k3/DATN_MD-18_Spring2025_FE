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

const FavoriteScreen = () => {
    const [favorites, setFavorites] = useState([]);
    const { user } = useGlobalState()
    const router  = useRouter()
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
        // console.log("item = " + JSON.stringify(item));
        console.log("item = " + item.product_name);

        return (
            // <Link key={index} href={`product-details/${item.product_id}`}
            //     <
            // </Link>

            <Link href={`product-details/${item.product_id}`} style={styles.itemContainer}>
                <View >
                    <Image source={{ uri: `${BASE_URL}/${item.image_urls[0]}` }} style={styles.itemImage} />
                    <View style={styles.itemDetails}>
                        <Text style={styles.itemName}>{item.product_name}</Text>
                        <Text style={styles.itemPrice}>{item.description}</Text>
                    </View>
                    <View style={styles.itemActions}>
                        <TouchableOpacity onPress={() => handleRemove(item.product_id, item.user_id)} style={styles.actionButton}>
                            <Text style={styles.removeIcon}>❌</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Link>

        )
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={favorites}
                renderItem={({ item }) => renderItem(item)}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#008000",
        textAlign: "center",
        marginVertical: 16,
    },
    listContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    itemContainer: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F9F9F9",
        marginBottom: 16,
        padding: 12,
        borderRadius: 8,
        elevation: 2,
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 12,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000000",
    },
    itemPrice: {
        fontSize: 14,
        color: "#555555",
        marginTop: 4,
    },
    itemActions: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        marginLeft: 8,
    },
    actionButton: {
        width: 36,
        height: 36,
        backgroundColor: "#F2F2F2",
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 8,
    },
    cartIcon: {
        fontSize: 18,
        color: "#008000",
    },
    removeIcon: {
        fontSize: 18,
        color: "#D32F2F",
    },
    addAllButton: {
        backgroundColor: "#008000",
        padding: 16,
        borderRadius: 8,
        marginHorizontal: 16,
        marginBottom: 30,
        alignItems: "center",
    },
    addAllText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default FavoriteScreen;
