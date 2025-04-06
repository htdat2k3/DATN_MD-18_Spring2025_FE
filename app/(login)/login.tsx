import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { ThemedView } from '@/components/common/ThemedView';
import { ThemedText } from '@/components/common/ThemedText';
import { MaterialIcons } from '@expo/vector-icons';
import CommonButton from '@/components/common/CommonButton';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { BASE_URL } from '@/constants/Colors';
import { useGlobalState, User } from '@/components/global/GlobalStateProvider';

export default function Login() {
    const router = useRouter();
    const { saveUser } = useGlobalState();

    // State for input fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields!');
            return;
        }
        try {
            // Call API to log in
            const response = await axios.post(`${BASE_URL}user/login`, {
                email,
                password,
            });
            Alert.alert('Success', 'Login successful!');
            try {
                console.log("response = " + JSON.stringify(response.data.data));

                const user: User = JSON.parse(JSON.stringify(response.data.data)); // Type assertion to User

                // Redirect to the main screen
                saveUser(user)
                router.replace('/(tabs)');
            } catch (error) {
                console.error("Invalid JSON string", error);
            }

        } catch (error) {
            // console.error(error.response.data.message);
            alert(`${error.response.data.message}`);
        }
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedText style={{ marginTop: 10 }} type="title">
                Đăng Nhập
            </ThemedText>
            <View style={styles.common_input}>
                <MaterialIcons name="account-circle" size={25} />
                <TextInput
                    placeholder="Email"
                    style={styles.input_text}
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>
            <View style={styles.common_input}>
                <MaterialIcons name="password" size={25} />
                <TextInput
                    placeholder="Password"
                    style={styles.input_text}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
            <TouchableOpacity
                onPress={() => {
                    router.push('/forgot_password');
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignSelf: 'stretch',
                        marginTop: 10,
                        marginEnd: 10,
                    }}
                >
                    <ThemedText type="default">Quên mật khẩu</ThemedText>
                </View>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <CommonButton
                    isBackgroundColor={true}
                    text="Đăng nhập"
                    onPress={handleLogin}
                />
            </View>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <CommonButton
                    isBackgroundColor={false}
                    text="Đăng ký"
                    onPress={() => {
                        router.push('/(register)');
                    }}
                />
            </View>
            {/* <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <ThemedText type="default">Hoặc đăng nhập với Google</ThemedText>
            </View> */}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
        flexDirection: 'column',
        alignContent: 'space-around',
        backgroundColor: 'white',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    common_input: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        width: '90%',
        borderBottomWidth: 1,
        borderColor: '#00A65E',
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    input_text: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 8,
    },
});
