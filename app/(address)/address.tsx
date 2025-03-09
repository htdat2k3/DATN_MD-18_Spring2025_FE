import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
} from "react-native";

const CheckoutScreen = () => {
    const [name, setName] = useState("Nguyễn Văn A");
    const [address, setAddress] = useState("CD Fpt Polytechnic");
    const [selectedPayment, setSelectedPayment] = useState("Ví Momo");
    const [shippingMethod, setShippingMethod] = useState({
        name: "DHL",
        duration: "Fast (2-3days)",
        price: 5.0,
    });
    const productPrice = 95.0;
    const totalPrice = productPrice + shippingMethod.price;

    const handleOrder = () => {
        alert("Đặt hàng thành công!");
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.headerText}>Thanh toán</Text>

            {/* Địa chỉ giao hàng */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Địa chỉ giao hàng</Text>
                <View style={styles.addressContainer}>
                    <Text style={styles.addressInitial}>V</Text>
                    <View>
                        <Text style={styles.addressName}>{name}</Text>
                        <Text style={styles.addressDetail}>{address}</Text>
                    </View>
                    <TouchableOpacity style={styles.editButton}>
                        <Text style={styles.editIcon}>✏️</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Phương thức thanh toán */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
                <TouchableOpacity
                    style={[
                        styles.paymentMethod,
                        selectedPayment === "Ví Momo" && styles.selectedPaymentMethod,
                    ]}
                    onPress={() => setSelectedPayment("Ví Momo")}
                >
                    <Text style={styles.paymentText}>Ví Momo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.paymentMethod,
                        selectedPayment === "Thanh toán khi nhận hàng" &&
                        styles.selectedPaymentMethod,
                    ]}
                    onPress={() => setSelectedPayment("Thanh toán khi nhận hàng")}
                >
                    <Text style={styles.paymentText}>Thanh toán khi nhận hàng</Text>
                </TouchableOpacity>
            </View>

            {/* Phương thức giao hàng */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Phương thức giao hàng</Text>
                <View style={styles.shippingContainer}>
                    <Image
                        source={{
                            uri: "https://upload.wikimedia.org/wikipedia/commons/d/dc/DHL_logo.svg",
                        }}
                        style={styles.shippingLogo}
                    />
                    <Text style={styles.shippingText}>
                        {shippingMethod.name} {shippingMethod.duration}
                    </Text>
                </View>
            </View>

            {/* Giá cả */}
            <View style={styles.priceContainer}>
                <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>Giá :</Text>
                    <Text style={styles.priceValue}>${productPrice.toFixed(2)}</Text>
                </View>
                <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>Phí Vận Chuyển:</Text>
                    <Text style={styles.priceValue}>
                        ${shippingMethod.price.toFixed(2)}
                    </Text>
                </View>
                <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>Tổng:</Text>
                    <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
                </View>
            </View>

            {/* Nút đặt hàng */}
            <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
                <Text style={styles.orderButtonText}>Đặt hàng</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 16,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#008000",
        textAlign: "center",
        marginVertical: 16,
    },
    sectionContainer: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#555555",
        marginBottom: 8,
    },
    addressContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F9F9F9",
        borderRadius: 8,
        padding: 12,
        elevation: 2,
    },
    addressInitial: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#008000",
        marginRight: 12,
    },
    addressName: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333333",
        marginBottom: 4,
    },
    addressDetail: {
        fontSize: 14,
        color: "#555555",
    },
    editButton: {
        marginLeft: "auto",
    },
    editIcon: {
        fontSize: 16,
        color: "#008000",
    },
    paymentMethod: {
        padding: 12,
        backgroundColor: "#F9F9F9",
        borderRadius: 8,
        marginBottom: 8,
        elevation: 2,
    },
    selectedPaymentMethod: {
        backgroundColor: "#E6F4EA",
        borderWidth: 1,
        borderColor: "#008000",
    },
    paymentText: {
        fontSize: 14,
        color: "#333333",
    },
    shippingContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F9F9F9",
        borderRadius: 8,
        padding: 12,
        elevation: 2,
    },
    shippingLogo: {
        width: 40,
        height: 40,
        resizeMode: "contain",
        marginRight: 12,
    },
    shippingText: {
        fontSize: 14,
        color: "#333333",
    },
    priceContainer: {
        marginBottom: 16,
    },
    priceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    priceLabel: {
        fontSize: 14,
        color: "#555555",
    },
    priceValue: {
        fontSize: 14,
        color: "#333333",
    },
    totalPrice: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#008000",
    },
    orderButton: {
        backgroundColor: "#008000",
        padding: 16,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 16,
    },
    orderButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default CheckoutScreen;
