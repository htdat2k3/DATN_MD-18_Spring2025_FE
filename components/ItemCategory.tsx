import { View, Text, ViewProps, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Category } from '@/constants/Types';
import { Image } from 'react-native';
import { ThemedText } from './ThemedText';

export type ItemCategoryProps = ViewProps & {
    data: Category
    onPress?: () => void
};

export default function ItemCategory({ data, onPress }: ItemCategoryProps) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <Image src={data.urlImage} style={styles.image} />
                <ThemedText type='defaultSemiBold'>{data.name}</ThemedText>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',


    },
    image: {
        height: 100,
        width: 100,
        marginEnd: 20
    }
})