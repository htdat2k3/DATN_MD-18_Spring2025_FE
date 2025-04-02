import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const FailureScreen = () => {
    const router = useRouter()
    const handleBackToHome = () => {
        router.replace("/(tabs)")
    };

    return (
        <View style={styles.container}>
            <Ionicons name="checkmark-circle" size={100} color="FF0000" style={styles.icon} />
            <Text style={styles.title}>Thất bại</Text>
            <Text style={styles.description}>
                Đơn hàng của bạn đã bị hủy do bạn đã không thanh toán. Vui lòng bạn có thể quay lại chọn sản phẩm yêu thích để thanh toán. Cảm ơn bạn đã chọn ứng dụng của chúng tôi!
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleBackToHome}>
                <Text style={styles.buttonText}>Trở lại trang chủ</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    icon: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
    },
    button: {
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        fontSize: 16,
        color: '#333',
    },
});

export default FailureScreen;
