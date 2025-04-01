import { View, ViewProps, StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native';
import React from 'react';
import { ThemedText } from '../ThemedText';

export type ButtonProps = ViewProps & {
    isBackgroundColor?: Boolean; // Giá trị mặc định sẽ được xử lý
    text: string;
    onPress?: (event: GestureResponderEvent) => void; // Sự kiện khi nhấn

};

export default function CommonButton({
    isBackgroundColor = false,
    text,
    onPress,
    ...rest
}: ButtonProps) {
    const containerStyle = [
        styles.container,
        isBackgroundColor ? { backgroundColor: '#00A65E' } : { backgroundColor: 'white', borderColor: '#00A65E', borderWidth: 1 },
    ];

    const textStyle = {
        color: isBackgroundColor ? 'white' : 'black',
    };

    return (
        <TouchableOpacity style={containerStyle} onPress={onPress}>
            <ThemedText type="defaultSemiBold" style={textStyle}>
                {text}
            </ThemedText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10, // Thêm padding để nút trông đẹp hơn
        borderRadius: 8, // Bo góc cho nút
    },
});