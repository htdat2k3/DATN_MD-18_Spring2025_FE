import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { MaterialIcons } from '@expo/vector-icons'
import CommonButton from '@/components/common/CommonButton'
import { useRouter } from 'expo-router'

export default function login() {
    const router = useRouter()
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
                />
            </View>
            <View style={styles.common_input}>
                <MaterialIcons name="password" size={25} />
                <TextInput
                    placeholder="Password"
                    style={styles.input_text}
                    secureTextEntry={true}
                    keyboardType="default"
                />
            </View>
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
            <View style={{ flexDirection: 'row', marginTop: 20, }}>
                <CommonButton isBackgroundColor={true} text='Đăng nhập' />
            </View>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <CommonButton isBackgroundColor={false} text='Đăng ki' onPress={(event) => {
                    // di den mang dang kí
                    router.push("/(register)")
                }}

                />
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: 10,
                }}>
                <ThemedText type="default">Hoặc đăng nhập với google</ThemedText>
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
        paddingHorizontal: 16, // Thêm khoảng cách hai bên
    },
    common_input: {
        flexDirection: 'row',
        alignItems: 'center', // Căn giữa theo chiều dọc
        marginTop: 10, // Khoảng cách giữa các ô nhập
        width: '90%', // Để điều chỉnh kích thước input phù hợp
        borderBottomWidth: 1,
        borderColor: '#00A65E', // Màu viền nhạt
        borderRadius: 8,
        paddingHorizontal: 8, // Thêm khoảng cách bên trong
    },
    input_text: {
        flex: 1,
        paddingVertical: 8, // Tăng chiều cao dòng nhập liệu
        paddingHorizontal: 8, // Thêm khoảng cách trong input
    },
});
