import { ThemedSafeAreaView } from "@/components/common/ThemedSafeAreaView";
import { BASE_URL } from "@/constants/Colors";
import axios from "axios";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";

const ResetPasswordScreen = () => {
    const [email, setEmail] = useState("");

    const handleConfirm = async (id: string) => {
        try {
            const response = await axios.post(`${BASE_URL}user/resetPassword`, {
                email: email
            });
            console.log("dataRes = ", response.data.data);
            router.replace("/(login)")
        } catch (error) {
            console.log("error = ", error);
            alert(error.message)
        }
    };

    return (
        <ThemedSafeAreaView>
            <View style={styles.container}>
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập email"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <TouchableOpacity style={styles.button} onPress={handleConfirm}>
                        <Text style={styles.buttonText}>Xác Nhận</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ThemedSafeAreaView>

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
    form: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },
    input: {
        backgroundColor: "white",
        borderWidth: 1,
        height: 55,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
        fontSize: 14,
    },
    button: {
        backgroundColor: "#2DCC70",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default ResetPasswordScreen;
