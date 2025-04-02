import { ThemedSafeAreaView } from "@/components/common/ThemedSafeAreaView";
import { useGlobalState } from "@/components/global/GlobalStateProvider";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

const SettingsScreen = () => {
    const { user } = useGlobalState();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isEditing, setIsEditing] = useState(false);
    const [isEditingPass, setIsEditingPass] = useState(false);
    useEffect(() => {
        console.log("user = " + user);
    }, []);

    const handleSavePersonalInfo = () => {
        console.log("Saving personal info:", { name, email });
        setIsEditing(false);
    };

    const handleUpdatePassword = () => {
        console.log("Updating password");
        setIsEditingPass(false);
    };

    return (
        <ThemedSafeAreaView>
            <ScrollView style={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Thông Tin Cá Nhân</Text>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Họ Tên</Text>
                        <TextInput
                            style={[styles.input, isEditing ? styles.editingInput : styles.disabledInput]}
                            value={name}
                            onChangeText={setName}
                            editable={isEditing}
                            placeholder="Nhập họ tên"
                        />
                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={[styles.input, isEditing ? styles.editingInput : styles.disabledInput]}
                            value={email}
                            onChangeText={setEmail}
                            editable={isEditing}
                            placeholder="Nhập email"
                            keyboardType="email-address"
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={() => {
                            if (isEditing) {
                                handleSavePersonalInfo();
                            } else {
                                setIsEditing(true);
                            }
                        }}
                    >
                        <Text style={styles.saveButtonText}>
                            {isEditing ? "Lưu Thông Tin" : "Chỉnh Sửa Thông Tin"}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Mật Khẩu</Text>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Mật khẩu mới</Text>
                        <TextInput
                            style={[styles.input, isEditingPass ? styles.editingInput : styles.disabledInput]}
                            value={password}
                            secureTextEntry
                            onChangeText={setPassword}
                            placeholder="Nhập mật khẩu cũ"
                        />
                    </View>
                    <View style={styles.inputGroup}>
                        <TextInput
                            style={[styles.input, isEditingPass ? styles.editingInput : styles.disabledInput]}
                            value={password}
                            secureTextEntry
                            onChangeText={setPassword}
                            placeholder="Nhập mật khẩu mới"
                        />
                    </View>
                    <View style={styles.inputGroup}>
                        <TextInput
                            style={[styles.input, isEditingPass ? styles.editingInput : styles.disabledInput]}
                            value={password}
                            secureTextEntry
                            onChangeText={setPassword}
                            placeholder="Xác nhận mật khẩu"
                        />
                    </View>
                    <TouchableOpacity style={styles.saveButton} onPress={() => {
                        if (isEditing) {
                            handleUpdatePassword();
                        } else {
                            setIsEditingPass(true);
                        }
                    }}>
                        <Text style={styles.saveButtonText}>Cập Nhật Mật Khẩu</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ThemedSafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 16,
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
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 16,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: "#333",
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
        backgroundColor: "#fff",
    },
    editingInput: {
        borderColor: "#008000",
    },
    disabledInput: {
        borderColor: "#999999",
        backgroundColor: "#f0f0f0",
    },
    saveButton: {
        backgroundColor: "#008000",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 16,
    },
    saveButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default SettingsScreen;
