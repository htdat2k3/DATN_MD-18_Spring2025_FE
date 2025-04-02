import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import { BASE_URL } from '@/constants/Colors';
import { useGlobalState } from '@/components/global/GlobalStateProvider';
// const notifications = [
//     {
//         id: 1,
//         title: 'Your order #123456789 has been confirmed',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis pretium et in arcu adipiscing nec.',
//         image: "https://media.nghean24h.vn/thumb_x500x/2019/11/27/6/nu-hoang-goi-cam-maria-ozawa-2-1574818181.jpg",
//         status: 'New',
//     },
//     {
//         id: 2,
//         title: 'Your order #123456789 has been canceled',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis pretium et in arcu adipiscing nec.',
//         image: "https://media.nghean24h.vn/thumb_x500x/2019/11/27/6/nu-hoang-goi-cam-maria-ozawa-2-1574818181.jpg",
//         status: 'Old',
//     },
//     {
//         id: 3,
//         title: 'Your order #123456789 has been shipped successfully',
//         description:
//             'Please help us to confirm and rate your order to get 10% discount code for next order.',
//         image: "https://media.nghean24h.vn/thumb_x500x/2019/11/27/6/nu-hoang-goi-cam-maria-ozawa-2-1574818181.jpg",
//         status: 'Old',
//     },
//     {
//         id: 4,
//         title: 'Your order #123456789 has been confirmed',
//         description:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis pretium et in arcu adipiscing nec.',
//         image: "https://media.nghean24h.vn/thumb_x500x/2019/11/27/6/nu-hoang-goi-cam-maria-ozawa-2-1574818181.jpg",
//         status: 'Old',
//     },
// ];

const NotificationScreen = () => {
    const { user } = useGlobalState()
    const [notificationsList, setNotificationList] = useState<Notification[]>([])
    // const [notificationTestList, setNotificationTestList] = useState(notifications)
    const handleAllNotification = async () => {
        try {
            const response = await axios.get(`${BASE_URL}notification/list-by-user/${user?.user_id}`);
            console.log("result = " + JSON.stringify(response.data.data));
            setNotificationList(JSON.parse(JSON.stringify(response.data.data)))
        } catch (error) {
            console.log("error = " + error);

        }
    }
    const handleUpdateNotification = async (notificattion_id: number) => {
        try {
            const response = await axios.post(`${BASE_URL}notification/updateStatusNotification`, {
                user_id: user?.user_id,
                notification_id: notificattion_id
            });
            // console.log("result = " + JSON.stringify(response.data.message));
            // setNotificationList(JSON.parse(JSON.stringify(response.data.message)))
            console.log("notification_id = " + notificattion_id);

            if (response.data.message != null) {
                const dataNotificationList = Array.from(notificationsList).map((data) => {
                    if (data.notification_id == notificattion_id) {
                        return {
                            ...data,
                            is_read: false
                        }
                    } else {
                        return {
                            ...data
                        }
                    }
                })
                console.log("data = " + JSON.stringify(dataNotificationList));

                setNotificationList(dataNotificationList)
            }
        } catch (error) {
            console.log("error = " + error);

        }
    }
    useEffect(() => {
        handleAllNotification()
    }, [])


    const renderNotification = ({ item }) => {
        const cardStyle = [
            styles.notificationCard,
            item.is_read === false ? styles.newNotification : styles.readNotification,
        ];


        return <TouchableOpacity onPress={() => {
            handleUpdateNotification(item.notification_id)
        }} style={cardStyle}>
            <View >
                <View style={styles.notificationContent}>
                    <Text style={styles.notificationTitle}>{item.title}</Text>
                    <Text style={styles.notificationDescription}>{item.message}</Text>
                </View>
            </View>
        </TouchableOpacity>
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={notificationsList}
                renderItem={renderNotification}
                keyExtractor={(item) => `${item.notification_id}`}
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
    newNotification: {
        backgroundColor: "#D1E7FF", // Light blue for new notifications
    },
    readNotification: {
        backgroundColor: "#E0E0E0", // Light gray for read notifications
    },
});

export default NotificationScreen;
