import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const DetailedOrdersScreen = () => {
    const { id } = useLocalSearchParams()
    console.log("id = " + id);

    return (
        <ScrollView style={styles.container}>
            {/* Order Header */}
            <View style={styles.headerContainer}>
                <Text style={styles.orderText}>Đơn hàng: HD1</Text>
                <Text style={styles.dateText}>16/10/2023</Text>
            </View>

            {/* Products Section */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Hàng hóa</Text>
                <View style={styles.productCard}>
                    <Image
                        source={{ uri: 'https://via.placeholder.com/50' }}
                        style={styles.productImage}
                    />
                    <Text style={styles.productText}>1. Quần dài</Text>
                    <Text style={styles.productPrice}>1 x 20,000 Đ</Text>
                </View>
                <View style={styles.productCard}>
                    <Image
                        source={{ uri: 'https://via.placeholder.com/50' }}
                        style={styles.productImage}
                    />
                    <Text style={styles.productText}>2. Quần dài</Text>
                    <Text style={styles.productPrice}>1 x 20,000 Đ</Text>
                </View>
                <View style={styles.productCard}>
                    <Image
                        source={{ uri: 'https://via.placeholder.com/50' }}
                        style={styles.productImage}
                    />
                    <Text style={styles.productText}>3. Quần dài</Text>
                    <Text style={styles.productPrice}>1 x 20,000 Đ</Text>
                </View>
            </View>

            {/* Customer Section */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Khách hàng</Text>
                <Text style={styles.customerText}>Nguyễn Như Hiếu</Text>
                <Text style={styles.customerText}>📞 0984907397</Text>
                <Text style={styles.customerText}>📍 Phúc Thọ - Hà Nội</Text>
            </View>

            {/* Payment Section */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Thanh toán</Text>
                <Text style={styles.paymentText}>Date: 4h30</Text>
                <Text style={styles.paymentText}>Method: Shipcode</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 12,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
    },
    orderText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    dateText: {
        fontSize: 14,
        color: '#888',
    },
    sectionContainer: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#28a745',
    },
    productCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    productImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
    },
    productText: {
        flex: 1,
        marginLeft: 10,
        fontSize: 14,
    },
    productPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    customerText: {
        fontSize: 14,
        marginBottom: 5,
    },
    paymentText: {
        fontSize: 14,
        marginBottom: 5,
    },
});

export default DetailedOrdersScreen;
