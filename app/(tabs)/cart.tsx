import { ThemedSafeAreaView } from "@/components/common/ThemedSafeAreaView";
import { useGlobalState } from "@/components/global/GlobalStateProvider";
import { BASE_URL } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { router, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
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

    const [cartItems, setCartItems] = useState([])
    const { user, saveCartsList } = useGlobalState()
    const getAllCart = async () => {
        try {
            const response = await axios.get(`${BASE_URL}cart/cart-by-user/${user?.user_id}`);
            // console.log(response.data.data);
            const cartsList = JSON.parse(JSON.stringify(response.data.data))
            setCartItems(cartsList)
            saveCartsList(cartsList)
        }
        catch (e) {
            console.log("error = " + e);

        }
    }

    const updateCart = async (cart_id: number, quantity: number, variant_id: number, user_id: number) => {
        try {
            const response = await axios.put(`${BASE_URL}cart/update/${cart_id}`, {
                quantity: quantity,
                variant_id: variant_id,
                user_id: user_id
            });
            // console.log(response.data.data);
            // alert(response.data.message)
            console.log(response.data.message);

        }
        catch (e) {
            console.log("error = " + e);

        }
    }
    useEffect(() => {
        getAllCart()
    })
    const router = useRouter()
    const updateQuantity = async (id: number, type: string, quantity: number, user_id: number, variant_id: number) => {

        updateCart(id, quantity, variant_id, user_id)
        const updatedCart = cartItems.map((item) =>
            item.cart_id === id
                ? {
                    ...item,
                    quantity: type === "increase" ? item.quantity : Math.max(1, item.quantity),
                }
                : item
        );
        setCartItems(updatedCart);
        saveCartsList(updatedCart)

    };

    const removeItem = (id) => {
        Alert.alert("Xóa sản phẩm", "Bạn có chắc chắn muốn xóa sản phẩm này?", [
            { text: "Hủy", style: "cancel" },
            {
                text: "Xóa",
                onPress: async () => {

                    try {
                        const response = await axios.delete(`${BASE_URL}cart/delete/${id}`);
                        // console.log(response.data.data);
                        const cartsList = JSON.parse(JSON.stringify(response.data.data))

                        setCartItems(cartItems.filter((item) => item.cart_id !== id))

                    }
                    catch (e) {
                        console.log("error = " + e);

                    }
                }
            },
        ]);
    };

    const calculateTotal = () =>
        cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const renderItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: `${BASE_URL}/${item.product_image}` }} style={styles.productImage} />
            <View style={styles.productDetails}>
                <Text style={styles.productName}>
                    {item.product_name} - ({item.color_name})
                </Text>
                <Text style={styles.productPrice}>
                    {item.price.toLocaleString()} VND
                </Text>
                <Text style={styles.productSize}>Size - {item.size_name}</Text>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        onPress={() => updateQuantity(item.cart_id, "increase", item.quantity + 1, user!!.user_id, item.variant_id)}
                        style={styles.quantityButton}
                    >
                        <Text style={styles.quantityText}>+</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity
                        onPress={() => updateQuantity(item.cart_id, "decrease", item.quantity - 1, user!!.user_id, item.variant_id)}
                        style={styles.quantityButton}
                    >
                        <Text style={styles.quantityText}>-</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity
                onPress={() => removeItem(item.cart_id)}
                style={styles.removeButton}
            >
                <MaterialIcons name="close" size={20} color="#888" />
            </TouchableOpacity>
        </View>
    );

    return (
        <ThemedSafeAreaView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <MaterialIcons name="arrow-back" size={24} color="white" />
                    <Text style={styles.headerText}>Giỏ hàng</Text>
                </View>
                <FlatList
                    data={cartItems}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.cart_id}
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
                    <TouchableOpacity style={styles.checkoutButton} onPress={() => router.push("/checkout")}>
                        <Text style={styles.checkoutButtonText}>Thanh toán tất cả</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ThemedSafeAreaView>

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
