import { ThemedSafeAreaView } from "@/components/common/ThemedSafeAreaView";
import { useGlobalState, User } from "@/components/global/GlobalStateProvider";
import { BASE_URL } from "@/constants/Colors";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

const SettingsScreen = () => {
    const { user, saveUser } = useGlobalState();

    const [name, setName] = useState(user?.full_name);
    const [email, setEmail] = useState(user?.email);
    const [address, setAddress] = useState(user?.address);
    const [phone, setPhone] = useState(user?.phone_number);

    const [password, setPassword] = useState("");
    const [passwordOld, setPasswordOld] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");


    const [isEditing, setIsEditing] = useState(false);
    const [isEditingPass, setIsEditingPass] = useState(false);
    useEffect(() => {
        console.log("user = " + user);
    }, []);
    const validatePassword = () => {
        if (!passwordOld) {
            alert("Vui lòng nhập mật khẩu cũ.");
            return false;
        }
        if (password.length < 6) {
            alert('Mật khẩu mới phải có ít nhất 6 ký tự.');
            return false;
        }
        if (password !== passwordConfirm) {
            alert('Xác nhận mật khẩu không khớp.');
            return false;
        }
        return true;
    };
    const handleSavePersonalInfo = async () => {
        try {
            const response = await axios.post(`${BASE_URL}user/update`, {
                user_id: user?.user_id,
                full_name: name,
                phone_number: phone,
                address: address
            });
            if (response.data != null) {
                const userNew: User = {
                    full_name: name,
                    email: user?.email,
                    user_id: user?.user_id,
                    address: address,
                    phone_number: phone
                }
                saveUser(userNew)
            }
            console.log("response1 = " + JSON.stringify(response.data.data));
            alert(response.data.message)
        } catch (e) {
            if (e instanceof AxiosError) {
                alert(e.response?.data.message);
            } else {
                alert("Đã có lỗi khi gửi request lên server.")
            }
        }
        setIsEditing(false);
    };

    const handleUpdatePassword = async () => {
        try {
            if (validatePassword()) {
                const response = await axios.post(`${BASE_URL}user/updatePassword/${user?.user_id}`, {
                    email: user?.email,
                    passwordOld: passwordOld,
                    passwordNew: passwordConfirm,
                });
                alert(response.data.message)
            }

        } catch (e) {
            if (e instanceof AxiosError) {
                alert(e.response?.data.message);
            } else {
                alert("Đã có lỗi khi gửi request lên server.")
            }
        }
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
                        <Text style={styles.label}>Địa chỉ</Text>
                        <TextInput
                            style={[styles.input, isEditing ? styles.editingInput : styles.disabledInput]}
                            value={address}
                            onChangeText={setAddress}
                            editable={isEditing}
                            placeholder="Nhập địa chỉ"
                        />
                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Số điện thoại</Text>
                        <TextInput
                            style={[styles.input, isEditing ? styles.editingInput : styles.disabledInput]}
                            value={phone}
                            onChangeText={setPhone}
                            editable={isEditing}
                            placeholder="Nhập số điện thoại"
                        />
                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={[styles.input, styles.disabledInput]}
                            value={email}
                            onChangeText={setEmail}
                            editable={false}
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
                            value={passwordOld}
                            secureTextEntry
                            onChangeText={setPasswordOld}
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
                            value={passwordConfirm}
                            secureTextEntry
                            onChangeText={setPasswordConfirm}
                            placeholder="Xác nhận mật khẩu"
                        />
                    </View>
                    <TouchableOpacity style={styles.saveButton} onPress={() => {
                        if (isEditingPass) {
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
