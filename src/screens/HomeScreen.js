import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const categories = [
    { id: '1', title: 'Áo', icon: require('../assets/shirt.png') }, // Đường dẫn đến biểu tượng áo
    { id: '2', title: 'Quần', icon: require('../assets/pants.png') }, // Đường dẫn đến biểu tượng quần
];

const products = [
    { id: '1', name: 'Áo Ba Lỗ Thể Thao', price: '500.000 VNĐ', image: require('../assets/ao.png'), rating: 4.5 },
    { id: '2', name: 'Áo Thun Nam', price: '300.000 VNĐ', image: require('../assets/ao.png'), rating: 4.0 },
];

const screenWidth = Dimensions.get('window').width;

const HomeScreen = () => {
    const navigation = useNavigation(); // Khởi tạo navigation
    return (
        <ScrollView style={styles.container}>
            {/* Thanh tìm kiếm */}
            <TextInput
                style={styles.searchInput}
                placeholder="Tìm Kiếm..."
            />

            {/* Banner quảng cáo */}
            <Image
                source={require('../assets/banner.png')} // Đường dẫn đến banner
                style={styles.banner}
                resizeMode="cover"
            />

            {/* Danh mục */}
            <Text style={styles.sectionTitle}>Danh Mục</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map(category => (
                    <View key={category.id} style={styles.category}>
                        <TouchableOpacity onPress={() => navigation.navigate('Shirts')} style={styles.button}>
                            <Text style={styles.buttonText}>Áo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Pants')} style={styles.button}>
                            <Text style={styles.buttonText}>Quần</Text>
                        </TouchableOpacity>
                        {/* <Image source={category.icon} style={styles.categoryIcon} />
            <Text style={styles.categoryTitle}>{category.title}</Text> */}
                    </View>
                ))}
            </ScrollView>

            {/* Sản phẩm mới */}
            <Text style={styles.sectionTitle}>Sản Phẩm Mới</Text>
            <FlatList
                data={products}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.productCard}>
                        <Image source={item.image} style={styles.productImage} />
                        <Text style={styles.productName}>{item.name}</Text>
                        <Text style={styles.productPrice}>{item.price}</Text>
                        <Text style={styles.productRating}>⭐ {item.rating}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.productList}
            />

            {/* Sản phẩm phổ biến */}
            <Text style={styles.sectionTitle}>Sản Phẩm Phổ Biến</Text>
            <FlatList
                data={products}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.productCard}>
                        <Image source={item.image} style={styles.productImage} />
                        <Text style={styles.productName}>{item.name}</Text>
                        <Text style={styles.productPrice}>{item.price}</Text>
                        <Text style={styles.productRating}>⭐ {item.rating}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.productList}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 16,
    },
    banner: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    category: {
        alignItems: 'center',
        marginRight: 20,
    },
    categoryIcon: {
        width: 50,
        height: 50,
    },
    categoryTitle: {
        marginTop: 5,
    },
    productList: {
        flexDirection: 'row',
        justifyContent: 'space-around', // Căn giữa các sản phẩm
        width: screenWidth, // Đặt chiều rộng để sản phẩm chia đều
    },
    productCard: {
        width: '50%', // 40% chiều rộng màn hình cho mỗi sản phẩm
        marginHorizontal: 10, // Khoảng cách giữa các sản phẩm
    },
    productImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    productName: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 12,
        color: '#888',
    },
    productRating: {
        fontSize: 12,
        color: '#FFA500',
    },
});

export default HomeScreen;