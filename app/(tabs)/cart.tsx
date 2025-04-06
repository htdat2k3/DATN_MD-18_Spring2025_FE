import { ThemedSafeAreaView } from "@/components/common/ThemedSafeAreaView";
import { useGlobalState } from "@/components/global/GlobalStateProvider";
import { BASE_URL } from "@/constants/Colors";
import { formatMoney } from "@/constants/Utils";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { router, useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    FlatList,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
} from "react-native";

const CartScreen = () => {

    const [cartItems, setCartItems] = useState([])
    const [codeVoucher, setCodeVoucher] = useState()
    const [finalPrice, setFinalPrice] = useState(cartItems.reduce((total, item) => total + item.price * item.quantity, 0))
    const { user, saveCartsList, saveVoucherId } = useGlobalState()
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

    useFocusEffect(
        useCallback(() => {
            console.log("update cart");
            getAllCart()
        }, [])
    );

    useEffect(() => {
        setFinalPrice(cartItems.reduce((total, item) => total + item.price * item.quantity, 0))
    }, [cartItems])
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

    const applyVoucherCode = async () => {
        ///",

        try {
            const response = await axios.put(`${BASE_URL}order/apply-voucher`, {
                voucher_code: codeVoucher,
                total_price: finalPrice,
                user_id: user?.user_id
            });
            // console.log(response.data.data);
            // alert(response.data.message)
            // console.log(response.data.message);
            alert(response.data.message)
            console.log(JSON.stringify(response.status));
            if (response.status == 200) {
                console.log(JSON.parse(JSON.stringify(response.data.data)).voucher_id);
                console.log(JSON.parse(JSON.stringify(response.data.data)).final_price);
                saveVoucherId(JSON.parse(JSON.stringify(response.data.data)).voucher_id)
                setFinalPrice(JSON.parse(JSON.stringify(response.data.data)).final_price)
            } else {
                saveVoucherId(-1)
            }

        }
        catch (e) {
            console.log("error = " + e.response.data.message);
            alert(e.response.data.message)
        }
    }
    return (
        <ThemedSafeAreaView>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
            >
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Giỏ hàng</Text>
                    </View>

                    <FlatList
                        data={cartItems}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.cart_id}
                        contentContainerStyle={styles.cartList}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    />

                    <View style={styles.footer}>
                        <View style={styles.container_footer}>
                            <TextInput
                                placeholder="Nhập mã khuyến mãi của bạn"
                                style={styles.promoInput_footer}
                                value={codeVoucher}
                                onChangeText={setCodeVoucher}
                                onSubmitEditing={Keyboard.dismiss}
                                returnKeyType="done"
                            />
                            <TouchableOpacity
                                style={styles.checkoutButton_footer}
                                onPress={() => {
                                    Keyboard.dismiss();
                                    applyVoucherCode();
                                }}
                            >
                                <AntDesign name="mobile1" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.totalPrice}>
                            Thành tiền: {formatMoney(finalPrice)}
                        </Text>
                        <TouchableOpacity
                            style={styles.checkoutButton}
                            onPress={() => {
                                Keyboard.dismiss();
                                router.push("/checkout");
                            }}
                        >
                            <Text style={styles.checkoutButtonText}>Thanh toán tất cả</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
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


    container_footer: {
        flexDirection: 'row', // Align items horizontally
        justifyContent: 'space-between', // Distribute space evenly
        alignItems: 'center', // Align items vertically in the center
        margin: 10, // Add some margin around the container
    },
    promoInput_footer: {
        flex: 1, // Allow the input to take up available space
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginRight: 10, // Add spacing between input and button
    },
    checkoutButton_footer: {
        padding: 10,
        backgroundColor: '#007BFF', // Button background color
        borderRadius: 5,
    },
});

export default CartScreen;
