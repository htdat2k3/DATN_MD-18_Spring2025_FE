import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useGlobalState } from "@/components/global/GlobalStateProvider";
import axios from "axios";
import { BASE_URL } from "@/constants/Colors";
import { router } from "expo-router";

const CheckoutScreen = () => {
    const [address, setAddress] = useState("");
    const { user, cartsList, saveCartsList, voucher_id, saveVoucherId } = useGlobalState()
    const [total, setTotal] = useState(cartsList.reduce((acculator, currentValue) => acculator + (currentValue.price * currentValue.quantity), 0))
    const [feeTransfer, setFeeTransfer] = useState(0)
    const [paymentMethod, setPaymentMethod] = useState("Paypal");
    const [shippingMethod, setShippingMethod] = useState(10000);

    const handleSendDataToServer = async () => {
        const dataVariantsList = cartsList.map((data) => (
            {
                price: data.price,
                quantity: data.quantity,
                variant_id: data.variant_id
            }
        ))

        const cartsIdList = cartsList.map((data) => (
            data.cart_id
        ))
        const bodyRequest = {
            user_id: user?.user_id,
            payment_method: paymentMethod,
            shipping_fee: shippingMethod,
            shipping_address: address,
            variants: dataVariantsList,
            cart_items: cartsIdList,
            voucher_id: voucher_id
        }
        console.log("bodyRequest = " + JSON.stringify(bodyRequest));
        console.log("dataVariantsList = " + dataVariantsList);

        try {
            const response = await axios.post(`${BASE_URL}order/new`, bodyRequest);
            if (response.data != null) {
                saveCartsList([])
                saveVoucherId(null)
                alert(response.data.message)
                router.replace("/congratulate")
            }
        } catch (error) {
            alert(error.message)
        }
    }
    return (
        <View style={styles.container}>
            {/* Shipping Address Section */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Địa chỉ giao hàng</Text>
                <TextInput
                    style={styles.input}
                    multiline
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                    placeholder="Nhập địa chỉ giao hàng"
                />
            </View>

            {/* Payment Method Section */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={paymentMethod}
                        onValueChange={(itemValue) => setPaymentMethod(itemValue)}
                    >
                        <Picker.Item label="Paypal" value="Paypal" />
                        <Picker.Item label="Thanh toán khi nhận hàng" value="Cod" />
                    </Picker>
                </View>
            </View>

            {/* Shipping Method Section */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Phương thức giao hàng</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={shippingMethod}
                        onValueChange={(itemValue) => setShippingMethod(itemValue)}
                    >
                        <Picker.Item label="Giao hàng tiết kiệm (2-3 days)" value="10000" />
                        <Picker.Item label="Giao hàng nhanh (1 day)" value="50000" />
                    </Picker>
                </View>
            </View>

            {/* Summary Section */}
            <View style={styles.summaryContainer}>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Giá:</Text>
                    <Text style={styles.summaryValue}>{total}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Phí Vận Chuyển:</Text>
                    <Text style={styles.summaryValue}>{shippingMethod}</Text>
                </View>
                <View style={[styles.summaryRow, styles.totalRow]}>
                    <Text style={styles.totalLabel}>Tổng:</Text>
                    <Text style={styles.totalValue}>{total - shippingMethod}</Text>
                </View>
            </View>

            {/* Place Order Button */}
            <TouchableOpacity style={styles.orderButton} onPress={() => {
                handleSendDataToServer()
            }}>
                <Text style={styles.orderButtonText}>Đặt hàng</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
    },
    header: {
        backgroundColor: "#00a651",
        padding: 16,
        alignItems: "center",
    },
    headerText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    sectionContainer: {
        marginVertical: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 8,
        backgroundColor: "#f9f9f9",
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        backgroundColor: "#f9f9f9",
        overflow: "hidden",
    },
    summaryContainer: {
        marginVertical: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        backgroundColor: "#f9f9f9",
    },
    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    summaryLabel: {
        fontSize: 16,
        color: "#333",
    },
    summaryValue: {
        fontSize: 16,
        color: "#333",
        fontWeight: "bold",
    },
    totalRow: {
        marginTop: 8,
        borderTopWidth: 1,
        borderTopColor: "#ccc",
        paddingTop: 8,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
    },
    totalValue: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
    },
    orderButton: {
        backgroundColor: "#00a651",
        padding: 16,
        alignItems: "center",
        borderRadius: 8,
    },
    orderButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default CheckoutScreen;
