import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { MaterialIcons } from '@expo/vector-icons'
import CommonButton from '@/components/common/CommonButton'

export default function register() {
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
            <View style={styles.common_input}>
                <MaterialIcons name="password" size={25} />
                <TextInput
                    placeholder="Confirm password"
                    style={styles.input_text}
                    secureTextEntry={true}
                    keyboardType="default"
                />
            </View>

            <View style={{ flexDirection: 'row', marginTop: 20, marginHorizontal: 16 }}>
                <CommonButton isBackgroundColor={false} text='Đăng ki' />
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
        paddingHorizontal: 4, // Thêm khoảng cách hai bên
    },
    common_input: {
        flexDirection: 'row',
        alignItems: 'center', // Căn giữa theo chiều dọc
        marginTop: 10, // Khoảng cách giữa các ô nhập
        width: '90%', // Để điều chỉnh kích thước input phù hợp
        height: 50,
        borderBottomWidth: 1,
        borderColor: '#00A65E', // Màu viền nhạt
        borderRadius: 8,
        paddingHorizontal: 5, // Thêm khoảng cách bên trong
    },
    input_text: {
        flex: 1,
        paddingVertical: 8, // Tăng chiều cao dòng nhập liệu
        paddingHorizontal: 5, // Thêm khoảng cách trong input
    },
});
