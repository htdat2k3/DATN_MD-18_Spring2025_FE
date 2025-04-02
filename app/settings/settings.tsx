import { ThemedSafeAreaView } from "@/components/common/ThemedSafeAreaView";
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Switch, ScrollView } from "react-native";

const SettingsScreen = () => {
    const [name, setName] = useState("Việt Vũ");
    const [email, setEmail] = useState("vvv@gmail.com");
    const [isSalesEnabled, setIsSalesEnabled] = useState(false);
    const [isBackgroundEnabled, setIsBackgroundEnabled] = useState(false);

    const toggleSalesSwitch = () => setIsSalesEnabled((previousState) => !previousState);
    const toggleBackgroundSwitch = () => setIsBackgroundEnabled((previousState) => !previousState);

    return (
        <ThemedSafeAreaView>
            <ScrollView style={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Thông Tin Cá Nhân</Text>
                    <Text style={styles.label}>Họ Tên</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Nhập họ tên"
                    />
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Nhập email"
                        keyboardType="email-address"
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Mật Khẩu</Text>
                    <TextInput style={styles.input} value="*******" secureTextEntry editable={false} />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Thông Báo</Text>
                    <View style={styles.switchRow}>
                        <Text style={styles.switchLabel}>Sales</Text>
                        <Switch onValueChange={toggleSalesSwitch} value={isSalesEnabled} />
                    </View>
                    <View style={styles.switchRow}>
                        <Text style={styles.switchLabel}>Màu nền</Text>
                        <Switch onValueChange={toggleBackgroundSwitch} value={isBackgroundEnabled} />
                    </View>
                </View>
            </ScrollView>
        </ThemedSafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 8,
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#008000",
        textAlign: "center",
        marginBottom: 8,
    },
    section: {
        backgroundColor: "#ffffff",
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    sectionHeader: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
    },
    label: {
        fontSize: 14,
        marginBottom: 4,
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
        backgroundColor: "#fff",
        marginBottom: 12,
    },
    switchRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    switchLabel: {
        fontSize: 14,
    },
});

export default SettingsScreen;
