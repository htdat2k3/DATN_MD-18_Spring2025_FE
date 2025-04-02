import { View, Text, StyleSheet, TextInput } from 'react-native';
import React, { useState } from 'react';
import { ThemedView } from '@/components/common/ThemedView';
import { ThemedText } from '@/components/common/ThemedText';
import { MaterialIcons } from '@expo/vector-icons';
import CommonButton from '@/components/common/CommonButton';
import { BASE_URL } from '@/constants/Colors';
import axios from 'axios';
import { router } from 'expo-router';

export default function Register() {
    // State for input fields
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        if (!email || !password || !confirmPassword) {
            alert('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            // Call API to register
            const response = await axios.post(`${BASE_URL}user/register`, {
                full_name: fullName,
                email: email,
                password: password,
                phone_number: phone,
                address: address,
                role: 'user',
            });

            console.log(response.data);
            alert(`${response.data.message}`);
            if (response.data != null) {
                router.back()
            }
        } catch (error) {
            console.error(error);
            alert('Registration failed');
        }
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedText style={{ marginTop: 10 }} type="title">
                Đăng ký
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
                <MaterialIcons name="person" size={25} />
                <TextInput
                    placeholder="Full name"
                    style={styles.input_text}
                    keyboardType="default"
                    value={fullName}
                    onChangeText={setFullName}
                />
            </View>
            <View style={styles.common_input}>
                <MaterialIcons name="phone" size={25} />
                <TextInput
                    placeholder="Phone"
                    style={styles.input_text}
                    keyboardType="numeric"
                    value={phone}
                    onChangeText={setPhone}
                />
            </View>
            <View style={styles.common_input}>
                <MaterialIcons name="location-city" size={25} />
                <TextInput
                    placeholder="Address"
                    style={styles.input_text}
                    keyboardType="default"
                    value={address}
                    onChangeText={setAddress}
                />
            </View>
            <View style={styles.common_input}>
                <MaterialIcons name="password" size={25} />
                <TextInput
                    placeholder="Password"
                    style={styles.input_text}
                    secureTextEntry={true}
                    keyboardType="default"
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
            <View style={styles.common_input}>
                <MaterialIcons name="password" size={25} />
                <TextInput
                    placeholder="Confirm password"
                    style={styles.input_text}
                    secureTextEntry={true}
                    keyboardType="default"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
            </View>

            <View style={{ flexDirection: 'row', marginTop: 20, marginHorizontal: 16 }}>
                <CommonButton
                    isBackgroundColor={false}
                    text="Đăng ký"
                    onPress={handleRegister}
                />
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
        flexDirection: 'column',
        alignContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    common_input: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        width: '90%',
        height: 50,
        borderBottomWidth: 1,
        borderColor: '#00A65E',
        borderRadius: 8,
        paddingHorizontal: 5,
    },
    input_text: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 5,
    },
});
