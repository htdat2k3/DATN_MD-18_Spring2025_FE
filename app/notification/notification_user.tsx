import React from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Notification } from '@/constants/Types';
const notifications = [
    {
        id: '1',
        title: 'Your order #123456789 has been confirmed',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis pretium et in arcu adipiscing nec.',
        image: "https://media.nghean24h.vn/thumb_x500x/2019/11/27/6/nu-hoang-goi-cam-maria-ozawa-2-1574818181.jpg",
        status: 'New',
    },
    {
        id: '2',
        title: 'Your order #123456789 has been canceled',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis pretium et in arcu adipiscing nec.',
        image: "https://media.nghean24h.vn/thumb_x500x/2019/11/27/6/nu-hoang-goi-cam-maria-ozawa-2-1574818181.jpg",
        status: 'New',
    },
    {
        id: '3',
        title: 'Your order #123456789 has been shipped successfully',
        description:
            'Please help us to confirm and rate your order to get 10% discount code for next order.',
        image: "https://media.nghean24h.vn/thumb_x500x/2019/11/27/6/nu-hoang-goi-cam-maria-ozawa-2-1574818181.jpg",
        status: 'New',
    },
    {
        id: '4',
        title: 'Your order #123456789 has been confirmed',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis pretium et in arcu adipiscing nec.',
        image: "https://media.nghean24h.vn/thumb_x500x/2019/11/27/6/nu-hoang-goi-cam-maria-ozawa-2-1574818181.jpg",
        status: 'New',
    },
];

const NotificationScreen = () => {
    const renderNotification = ({ item }) => (
        <View style={styles.notificationCard}>
            <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationDescription}>{item.description}</Text>
                {item.status && <Text style={styles.notificationStatus}>{item.status}</Text>}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={notifications}
                renderItem={renderNotification}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2ecc71',
        padding: 15,
    },
    headerTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    listContainer: {
        padding: 10,
    },
    notificationCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    notificationImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 10,
    },
    notificationContent: {
        flex: 1,
        justifyContent: 'center',
    },
    notificationTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    notificationDescription: {
        fontSize: 14,
        color: '#7D7D7D',
    },
    notificationStatus: {
        fontSize: 14,
        color: '#2ecc71',
        marginTop: 5,
        fontWeight: 'bold',
    },
});

export default NotificationScreen;
