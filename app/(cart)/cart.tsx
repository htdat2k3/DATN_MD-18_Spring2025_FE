import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    FlatList,
    Alert,
} from "react-native";

const CartScreen = () => {
    const [cartItems, setCartItems] = useState([
        {
            id: "1",
            name: "Áo Pattern",
            color: "Orenger",
            price: 157000,
            size: "M",
            quantity: 1,
            image: "https://via.placeholder.com/150",
        },
        {
            id: "2",
            name: "Áo giữ nhiệt",
            color: "Green",
            price: 279000,
            size: "M",
            quantity: 1,
            image: "https://via.placeholder.com/150",
        },
        {
            id: "3",
            name: "Quần dài nam",
            color: "Red",
            price: 590000,
            size: "M",
            quantity: 1,
            image: "https://via.placeholder.com/150",
        },
    ]);

    const updateQuantity = (id, type) => {
        const updatedCart = cartItems.map((item) =>
            item.id === id
                ? {
                    ...item,
                    quantity: type === "increase" ? item.quantity + 1 : Math.max(1, item.quantity - 1),
                }
                : item
        );
        setCartItems(updatedCart);
    };

    const removeItem = (id) => {
        Alert.alert("Xóa sản phẩm", "Bạn có chắc chắn muốn xóa sản phẩm này?", [
            { text: "Hủy", style: "cancel" },
            {
                text: "Xóa",
                onPress: () =>
                    setCartItems(cartItems.filter((item) => item.id !== id)),
            },
        ]);
    };

    const calculateTotal = () =>
        cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const renderItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productDetails}>
                <Text style={styles.productName}>
                    {item.name} - ({item.color})
                </Text>
                <Text style={styles.productPrice}>
                    {item.price.toLocaleString()} VND
                </Text>
                <Text style={styles.productSize}>Size - {item.size}</Text>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        onPress={() => updateQuantity(item.id, "increase")}
                        style={styles.quantityButton}
                    >
                        <Text style={styles.quantityText}>+</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity
                        onPress={() => updateQuantity(item.id, "decrease")}
                        style={styles.quantityButton}
                    >
                        <Text style={styles.quantityText}>-</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity
                onPress={() => removeItem(item.id)}
                style={styles.removeButton}
            >
                <MaterialIcons name="close" size={20} color="#888" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <MaterialIcons name="arrow-back" size={24} color="white" />
                <Text style={styles.headerText}>Giỏ hàng</Text>
            </View>
            <FlatList
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.cartList}
            />
            <View style={styles.footer}>
                <TextInput
                    placeholder="Nhập mã khuyến mãi của bạn"
                    style={styles.promoInput}
                />
                <Text style={styles.totalPrice}>
                    Thành tiền: {calculateTotal().toLocaleString()} VND
                </Text>
                <TouchableOpacity style={styles.checkoutButton}>
                    <Text style={styles.checkoutButtonText}>Thanh toán tất cả</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#008000",
        padding: 16,
    },
    headerText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 8,
    },
    cartList: {
        padding: 16,
    },
    cartItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E5E5",
        paddingBottom: 16,
    },
    productImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
    },
    productDetails: {
        flex: 1,
        marginLeft: 16,
    },
    productName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
    },
    productPrice: {
        fontSize: 14,
        color: "#555",
        marginTop: 4,
    },
    productSize: {
        fontSize: 12,
        color: "#888",
        marginTop: 4,
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },
    quantityButton: {
        width: 35,
        height: 35,
        backgroundColor: "#F5F5F5",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
    },
    quantityText: {
        fontSize: 16,
    },
    quantity: {
        fontSize: 16,
        marginHorizontal: 8,
    },
    removeButton: {
        padding: 8,
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: "#E5E5E5",
        backgroundColor: "white",
    },
    promoInput: {
        borderWidth: 1,
        borderColor: "#E5E5E5",
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
    },
    totalPrice: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 16,
    },
    checkoutButton: {
        backgroundColor: "#008000",
        padding: 16,
        borderRadius: 8,
        alignItems: "center",
    },
    checkoutButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default CartScreen;
