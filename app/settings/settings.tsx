import { ThemedSafeAreaView } from "@/components/common/ThemedSafeAreaView";
import { useGlobalState, User } from "@/components/global/GlobalStateProvider";
import { BASE_URL } from "@/constants/Colors";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState, useRef } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    Dimensions
} from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const SettingsScreen = () => {
    const { user, saveUser } = useGlobalState();
    const scrollViewRef = useRef<ScrollView>(null);

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

    // Thêm hàm xử lý scroll khi focus vào input
    const handleInputFocus = (yOffset: number) => {
        setTimeout(() => {
            scrollViewRef.current?.scrollTo({
                y: yOffset,
                animated: true
            });
        }, 100);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 40}
        >
            <ThemedSafeAreaView defaultTop={0} style={{ flex: 1 }}>
                <ScrollView
                    ref={scrollViewRef}
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
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
                                onFocus={() => handleInputFocus(0)}
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
                                onFocus={() => handleInputFocus(100)}
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
                                keyboardType="phone-pad"
                                onFocus={() => handleInputFocus(200)}
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
                                    Keyboard.dismiss();
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

                    <View style={[styles.section, styles.lastSection]}>
                        <Text style={styles.sectionHeader}>Mật Khẩu</Text>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Mật khẩu cũ</Text>
                            <TextInput
                                style={[styles.input, isEditingPass ? styles.editingInput : styles.disabledInput]}
                                value={passwordOld}
                                secureTextEntry
                                onChangeText={setPasswordOld}
                                placeholder="Nhập mật khẩu cũ"
                                onFocus={() => handleInputFocus(350)}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Mật khẩu mới</Text>
                            <TextInput
                                style={[styles.input, isEditingPass ? styles.editingInput : styles.disabledInput]}
                                value={password}
                                secureTextEntry
                                onChangeText={setPassword}
                                placeholder="Nhập mật khẩu mới"
                                onFocus={() => handleInputFocus(450)}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Xác nhận mật khẩu</Text>
                            <TextInput
                                style={[styles.input, isEditingPass ? styles.editingInput : styles.disabledInput]}
                                value={passwordConfirm}
                                secureTextEntry
                                onChangeText={setPasswordConfirm}
                                placeholder="Xác nhận mật khẩu"
                                onFocus={() => handleInputFocus(550)}
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={() => {
                                if (isEditingPass) {
                                    handleUpdatePassword();
                                    Keyboard.dismiss();
                                } else {
                                    setIsEditingPass(true);
                                }
                            }}
                        >
                            <Text style={styles.saveButtonText}>
                                {isEditingPass ? "Lưu Mật Khẩu" : "Đổi Mật Khẩu"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomPadding} />
                </ScrollView>
            </ThemedSafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    contentContainer: {
        padding: 16,
        paddingBottom: SCREEN_HEIGHT * 0.4,
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
    lastSection: {
        marginBottom: 32,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 16,
        color: "#333",
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: "#333",
        marginBottom: 8,
        fontWeight: "500",
    },
    input: {
        height: 45,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: "#fff",
        fontSize: 16,
    },
    editingInput: {
        borderColor: "#008000",
        backgroundColor: "#fff",
    },
    disabledInput: {
        borderColor: "#999999",
        backgroundColor: "#f5f5f5",
    },
    saveButton: {
        backgroundColor: "#008000",
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 16,
    },
    saveButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    bottomPadding: {
        height: 100,
    },
});

export default SettingsScreen;
