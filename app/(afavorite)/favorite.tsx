import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from "react-native";

const FavoriteScreen = () => {
    const [favorites, setFavorites] = useState([
        {
            id: "1",
            name: "Áo Phông Blue",
            price: 200000,
            image: "https://via.placeholder.com/150",
        },
        {
            id: "2",
            name: "Bộ quần áo in hình núi",
            price: 350000,
            image: "https://via.placeholder.com/150",
        },
        {
            id: "3",
            name: "Áo dài tay Rhodi",
            price: 150000,
            image: "https://via.placeholder.com/150",
        },
        {
            id: "4",
            name: "Áo phông Rhodi",
            price: 200000,
            image: "https://via.placeholder.com/150",
        },
        {
            id: "5",
            name: "Áo dài tay mùa đông",
            price: 239000,
            image: "https://via.placeholder.com/150",
        },
    ]);

    const handleRemove = (id) => {
        setFavorites(favorites.filter((item) => item.id !== id));
    };

    const handleAddAllToCart = () => {
        alert("Tất cả sản phẩm đã được thêm vào giỏ hàng!");
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.price.toLocaleString()} VND</Text>
            </View>
            <View style={styles.itemActions}>
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.cartIcon}>🛒</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleRemove(item.id)} style={styles.actionButton}>
                    <Text style={styles.removeIcon}>❌</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Yêu thích</Text>
            <FlatList
                data={favorites}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            />
            <TouchableOpacity onPress={handleAddAllToCart} style={styles.addAllButton}>
                <Text style={styles.addAllText}>Thêm tất cả</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
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
        color: "#333333",
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
        marginBottom: 16,
        alignItems: "center",
    },
    addAllText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default FavoriteScreen;
