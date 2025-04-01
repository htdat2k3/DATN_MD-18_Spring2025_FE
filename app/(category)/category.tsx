import { View, Text, FlatList } from 'react-native'
import React from 'react'
import ItemCategory from '@/components/ItemCategory'
import { Category } from '@/constants/Types';


export default function category() {
    const categories = [
        { urlImage: "https://cdn-i.doisongphapluat.com.vn/603/2019/11/26/nu-hoang-goi-cam-maria-ozawa-2.jpg", name: 'Danh mục 1' },
        { urlImage: "https://cdn-i.doisongphapluat.com.vn/603/2019/11/26/nu-hoang-goi-cam-maria-ozawa-2.jpg", name: 'Danh mục 2' },
    ];
    return (
        <View>
            <FlatList data={categories} renderItem={({ item }) => <ItemCategory data={item} />}></FlatList>
        </View>
    )
}