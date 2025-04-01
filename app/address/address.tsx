import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";

const addresses = [
    {
        id: "1",
        name: "Phùng Tiến Dũng",
        address: "Số 55, Ngõ 177, Đường Cầu Diễn, Bắc Từ Liêm, Hà Nội",
        isDefault: true,
    },
    {
        id: "2",
        name: "Phùng Tiến Dũng",
        address: "Số 55, Ngõ 177, Đường Cầu Diễn, Bắc Từ Liêm, Hà Nội",
        isDefault: false,
    },
];

const AddressScreen = () => {
    const router = useRouter()
    const renderAddress = ({ item }) => {
        return (
            <View style={styles.card}>
                <View style={styles.row}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.address}>{item.address}</Text>
                        {item.isDefault && (
                            <Text style={styles.defaultLabel}>Mặc định</Text>
                        )}
                    </View>
                    <TouchableOpacity>
                        <Ionicons
                            name="pencil"
                            size={20}
                            color="#555"
                            style={styles.editIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={addresses}
                keyExtractor={(item) => item.id}
                renderItem={renderAddress}
                style={styles.list}
            />

            <Link href={"/address/add_address"} style={styles.addButton}>
                <Ionicons name="add" size={24} color="white" />
            </Link>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        backgroundColor: "#2DCC70",
        padding: 15,
        textAlign: "center",
    },
    list: {
        flex: 1,
        paddingHorizontal: 10,
    },
    card: {
        backgroundColor: "white",
        borderRadius: 8,
        padding: 15,
        marginVertical: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    address: {
        fontSize: 14,
        color: "#555",
    },
    defaultLabel: {
        fontSize: 12,
        color: "#2DCC70",
        marginTop: 5,
    },
    editIcon: {
        marginLeft: 10,
    },
    footer: {
        backgroundColor: "white",
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
    },
    footerText: {
        fontSize: 14,
        color: "#555",
        textAlign: "center",
        marginBottom: 15,
    },
    trackButton: {
        backgroundColor: "#2DCC70",
        paddingVertical: 15,
        borderRadius: 8,
    },
    trackButtonText: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    addButton: {
        position: "absolute",
        bottom: 50,
        right: 20,
        backgroundColor: "#2DCC70",
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
    },
});

export default AddressScreen;
