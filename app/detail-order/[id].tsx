import { BASE_URL } from '@/constants/Colors';
import { MergedOrder, UserOrder } from '@/constants/Types';
import { formatMoney } from '@/constants/Utils';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const DetailedOrdersScreen = () => {
    const { id } = useLocalSearchParams()
    console.log("id = " + id);
    const [orderDetail, setOrderDetail] = useState<MergedOrder>()
    const mergeOrders = (data): MergedOrder => {
        return {
            order_id: data.order_id,
            payment_method: data.payment_method,
            discount_amount: data.discount_amount,
            created_date: data.created_date,
            user: data.user,
            products: data.items.map(item => ({
                product_name: item.product_name,
                product_image: item.product_image,
                quantity: item.quantity,
                price: item.price,
                size_name: item.size_name,
                color_name: item.color_name,
            }))
        };
    };
    const handleSendDataToServer = async (idOrder: number) => {
        try {
            const response = await axios.get(`${BASE_URL}order/order-detail-by-user/${id}`);
            const result = mergeOrders(response.data.data)
            console.log("result = " + JSON.stringify(result));
            setOrderDetail(result);
        } catch (error) {
            alert(error.message)
        }
    }
    useEffect(() => {
        handleSendDataToServer(id)
    }, [])

    return (
        <ScrollView style={styles.container}>
            {/* Order Header */}
            <View style={styles.headerContainer}>
                <Text style={styles.orderText}>Đơn hàng: HD {orderDetail?.order_id ? orderDetail.order_id : "Default"}</Text>
                <Text style={styles.dateText}>{orderDetail?.created_date ? orderDetail.created_date : "Default"}</Text>
            </View>

            {/* Products Section */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Hàng hóa</Text>

                {orderDetail?.products.map((data, index) => (
                    <View key={index} style={styles.productCard}>
                        <Image
                            source={{ uri: `${BASE_URL}/${data.product_image}` || 'https://via.placeholder.com/50' }}
                            style={styles.productImage}
                        />
                        <Text style={styles.productText}>{index + 1}. {data.product_name}</Text>
                        <Text style={styles.productPrice}>{data.quantity} x {formatMoney(data.price)} </Text>
                    </View>
                ))}


                <View style={{
                    marginTop: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',

                }}>
                    <Text style={styles.saleOffTitle}>Khuyến mãi</Text>
                    <Text style={styles.saleOffTitle}>{formatMoney(orderDetail?.discount_amount ? orderDetail.discount_amount : 0)}</Text>
                </View>

                {/* <View style={styles.productCard}>
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
                </View> */}
            </View>

            {/* Customer Section */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Khách hàng</Text>
                <Text style={styles.customerText}>Tên: {orderDetail?.user ? orderDetail.user.full_name : "Default"}</Text>
                <Text style={styles.customerText}>Số điện thoại: {orderDetail?.user ? orderDetail.user.phone_number : "Default"}</Text>
                <Text style={styles.customerText}>Địa chỉ: {orderDetail?.user ? (orderDetail.user.address.length > 0 ? orderDetail.user.address : "Default") : "Default"}</Text>
            </View>

            {/* Payment Section */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Thanh toán</Text>
                <Text style={styles.paymentText}>Method: {orderDetail?.payment_method}</Text>
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
    saleOffTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'red',
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
