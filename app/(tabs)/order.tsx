import { ThemedSafeAreaView } from '@/components/common/ThemedSafeAreaView';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';

const OrderScreen = () => {
    const [activeTab, setActiveTab] = useState('ĐÃ GIAO');
    const router = useRouter()
    const orders = [
        {
            id: '1',
            number: '238562312',
            date: '20/03/2020',
            quantity: 3,
            total: '$150',
        },
        {
            id: '2',
            number: '238562312',
            date: '20/03/2020',
            quantity: 3,
            total: '$150',
        },
    ];

    const renderOrders = () => {
        return orders.map((order, index) => (
            <View key={order.id} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                    <Text style={styles.orderNumber}>Order No{order.number}</Text>
                    <Text style={styles.orderDate}>{order.date}</Text>
                </View>
                <View style={styles.orderDetails}>
                    <Text>Số lượng: {order.quantity.toString().padStart(2, '0')}</Text>
                    <Text style={styles.totalAmount}>Tổng tiền: {order.total}</Text>
                </View>
                <View style={styles.orderActions}>
                    <Link style={styles.detailButton} href={'/detail-order/' + index}>
                        <Text style={styles.detailButtonText}>Chi tiết</Text>
                    </Link>
                    <TouchableOpacity>
                        <Text style={styles.cancelText}>Hủy đơn</Text>
                    </TouchableOpacity>
                </View>
            </View>
        ));
    };

    return (
        <ThemedSafeAreaView>
            <View style={styles.container}>
                <View style={styles.tabContainer}>
                    {['ĐÃ GIAO', 'ĐANG XỬ LÝ', 'ĐÃ HỦY'].map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[
                                styles.tab,
                                activeTab === tab && styles.activeTab
                            ]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text
                                style={[
                                    styles.tabText,
                                    activeTab === tab && styles.activeTabText
                                ]}
                            >
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {renderOrders()}
                </ScrollView>
            </View>
        </ThemedSafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    tab: {
        paddingVertical: 10,
        flex: 1,
        alignItems: 'center',
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#28a745',
    },
    tabText: {
        fontSize: 14,
        color: '#333',
    },
    activeTabText: {
        color: '#28a745',
        fontWeight: 'bold',
    },
    scrollContainer: {
        padding: 12,
    },
    orderCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    orderNumber: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    orderDate: {
        fontSize: 12,
        color: '#666',
    },
    orderDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    totalAmount: {
        fontWeight: 'bold',
        color: '#333',
    },
    orderActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    detailButton: {
        backgroundColor: '#000',
        borderRadius: 5,
        paddingVertical: 6,
        paddingHorizontal: 16,
    },
    detailButtonText: {
        color: '#fff',
        fontSize: 12,
    },
    cancelText: {
        color: '#28a745',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default OrderScreen;