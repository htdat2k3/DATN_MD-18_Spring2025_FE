import { ThemedSafeAreaView } from '@/components/common/ThemedSafeAreaView';
import { useGlobalState } from '@/components/global/GlobalStateProvider';
import { BASE_URL } from '@/constants/Colors';
import { Order } from '@/constants/Types';
import { formatMoney } from '@/constants/Utils';
import axios from 'axios';
import { format } from 'date-fns';
import { Link, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';

const OrderScreen = () => {
    const [activeTab, setActiveTab] = useState('ĐÃ GIAO');
    const { user } = useGlobalState()
    const router = useRouter()
    const [orders, setOrders] = useState<Order[]>([])
    const handleSendCompletedOrder = async () => {
        try {
            const response = await axios.post(`${BASE_URL}order/orders-by-user`, {
                user_id: user?.user_id,
                status: "completed"
            });
            if (response.data.data.length > 0) {
                setOrders(JSON.parse(JSON.stringify(response.data.data)))
            } else {
                setOrders([])
            }
            console.log("completed = " + response.data.data);
        }
        catch (e) {
            console.log("error = " + e);
        }
    }
    const handleSendPendingOrder = async () => {
        try {
            const response = await axios.post(`${BASE_URL}order/orders-by-user/`, {
                user_id: user?.user_id,
                status: "pending"
            });
            setOrders(JSON.parse(JSON.stringify(response.data.data)))
            console.log("pending = " + JSON.stringify(response.data.data));
        }
        catch (e) {
            console.log("error = " + e);
        }
    }
    const handleSendTransferringOrder = async () => {
        try {
            const response = await axios.post(`${BASE_URL}order/orders-by-user/`, {
                user_id: user?.user_id,
                status: "shipping"
            });
            setOrders(JSON.parse(JSON.stringify(response.data.data)))
            console.log("pending = " + JSON.stringify(response.data.data));
        }
        catch (e) {
            console.log("error = " + e);
        }
    }
    const handleSendCancelOrder = async () => {
        try {
            const response = await axios.post(`${BASE_URL}order/orders-by-user/`, {
                user_id: user?.user_id,
                status: "cancelled"
            });
            if (response.data.data.length > 0) {
                setOrders(JSON.parse(JSON.stringify(response.data.data)))
            } else {
                setOrders([])
            }
            console.log("cancelled = " + response.data.data);
        }
        catch (e) {
            console.log("error = " + e);
        }
    }
    const handleCancelOrder = async (order_id: number) => {
        try {
            const response = await axios.put(`${BASE_URL}order/cancel`, {
                user_id: user?.user_id,
                order_id: order_id
            });
            console.log("response = " + JSON.stringify(response.data));

            // const dataFilter = Array.from(orders).filter((data) => data.order_id != order_id)

            setOrders(prev => prev.filter((data) => data.order_id != order_id))
        }
        catch (e) {
            console.log("error = " + e);
        }
    }
    const handleCompleteOrder = async (order_id: number) => {
        try {
            const response = await axios.put(`${BASE_URL}order/complete`, {
                user_id: user?.user_id,
                order_id: order_id
            });
            console.log("response = " + JSON.stringify(response.data));

            // const dataFilter = Array.from(orders).filter((data) => data.order_id != order_id)

            setOrders(prev => prev.filter((data) => data.order_id != order_id))
        }
        catch (e) {
            console.log("error = " + e);
        }
    }
    useEffect(() => {
        if (activeTab == "ĐÃ GIAO") {
            handleSendCompletedOrder()
        } else if (activeTab == "ĐANG GIAO HÀNG") {
            handleSendTransferringOrder()
        } else if (activeTab == "ĐANG XỬ LÝ") {
            handleSendPendingOrder()
        } else {
            handleSendCancelOrder()
        }
    }, [activeTab])

    const renderOrders = () => {

        return orders.map((order, index) => (
            <View key={order.order_id} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                    <Text style={styles.orderNumber}>Order No{order.order_id}</Text>
                    <Text style={styles.orderDate}>{format(new Date(order.created_date), "dd/MM/yyyy HH:mm:ss")}</Text>
                </View>
                <View style={styles.orderDetails}>
                    <Text>Số lượng: {order.total_quantity.toString().padStart(2, '0')}</Text>
                    <Text style={styles.totalAmount}>Tổng tiền: {formatMoney(order.final_price)}</Text>
                </View>
                <View style={styles.orderActions}>
                    {
                        activeTab != "ĐÃ HỦY" && <Link style={styles.detailButton} href={`/detail-order/${order.order_id}`}>
                            <Text style={styles.detailButtonText}>Chi tiết</Text>
                        </Link>
                    }
                    {
                        activeTab == "ĐANG XỬ LÝ" && order.status == "pending" && <TouchableOpacity
                            onPress={() => { handleCancelOrder(order.order_id) }}
                        >
                            <Text style={styles.cancelText}>Hủy đơn</Text>
                        </TouchableOpacity>
                    }
                    {
                        activeTab == "ĐANG GIAO HÀNG" && order.status == "shipping" && <TouchableOpacity
                            onPress={() => { handleCompleteOrder(order.order_id) }}>
                            <Text style={styles.cancelText}>Xác nhận đơn hàng</Text>
                        </TouchableOpacity>
                    }

                </View>
            </View>
        ));
    };

    return (
        <ThemedSafeAreaView>
            <View style={styles.container}>
                <View style={styles.tabContainer}>
                    {['ĐÃ GIAO', 'ĐANG GIAO HÀNG', 'ĐANG XỬ LÝ', 'ĐÃ HỦY'].map((tab) => (
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
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: "#28a745",
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default OrderScreen;