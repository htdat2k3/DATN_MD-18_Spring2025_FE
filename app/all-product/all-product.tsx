import { useGlobalState } from "@/components/global/GlobalStateProvider";
import { BASE_URL } from "@/constants/Colors";
import { NewProductItemType } from "@/constants/Types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Link, router } from "expo-router";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { formatMoney } from "@/constants/Utils";

const products = [
    { id: "1", name: "Product 1", image: "https://via.placeholder.com/150" },
    { id: "2", name: "Product 2", image: "https://via.placeholder.com/150" },
    { id: "3", name: "Product 3", image: "https://via.placeholder.com/150" },
    { id: "4", name: "Product 4", image: "https://via.placeholder.com/150" },
    { id: "5", name: "Product 5", image: "https://via.placeholder.com/150" },
    { id: "6", name: "Product 6", image: "https://via.placeholder.com/150" },
];

export default function ProductSearch() {
    const [searchText, setSearchText] = useState("");
    const [filteredProducts, setFilteredProducts] = useState<NewProductItemType[]>([]);
    const [productsList, setProductsList] = useState<NewProductItemType[]>([])
    const [cachedProductsList, setCachedProductList] = useState<NewProductItemType[]>([])

    const { user } = useGlobalState()
    const handleSearch = (text: string) => {
        setSearchText(text);
        if (text.trim() === "") {
            setProductsList(Array.from(cachedProductsList));
        } else {
            setProductsList(
                Array.from(cachedProductsList).filter((product) => {
                    return product.product_name.toLowerCase().includes(text.toLowerCase()) ||
                        product.description.toLowerCase().includes(text.toLowerCase())
                })
            );
        }
    };

    const handleGetProductsList = async () => {
        const response = await axios.get(`${BASE_URL}product/all-list`);
        try {
            const dataResult = JSON.parse(JSON.stringify(response.data.data))
            setProductsList(dataResult)
            setCachedProductList(dataResult)
        } catch (error) {
            console.error("Invalid JSON string", error);
        }
    }

    useEffect(() => {
        handleGetProductsList()
    }, [])

    const renderProduct = ({ item }: { item: NewProductItemType }) => (
        <Link href={`/product-details/${item.product_id}`} style={styles.productCard}>
            <Image 
                source={{ uri: `${BASE_URL}/${item.current_images[0]}` }} 
                style={styles.productImage}
                resizeMode="cover"
            />
            <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={2}>{item.product_name}</Text>
            </View>
        </Link>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.backButton}
                onPress={() => router.back()}
            >
                <AntDesign name="arrowleft" size={24} color="#000" />
            </TouchableOpacity>

            <View style={styles.searchContainer}>
                <MaterialIcons name="search" size={24} color="#666" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchText}
                    onChangeText={handleSearch}
                />
            </View>

            <FlatList
                data={productsList}
                keyExtractor={(item) => `${item.product_id}`}
                renderItem={renderProduct}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fa",
        paddingHorizontal: 16,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
        padding: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginTop: 60,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ced4da',
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
    },
    listContainer: {
        paddingBottom: 20,
    },
    row: {
        justifyContent: "space-between",
    },
    productCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        marginBottom: 16,
        width: "48%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        overflow: 'hidden',
    },
    productImage: {
        width: '100%',
        height: 150,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    productInfo: {
        padding: 12,
    },
    productName: {
        fontSize: 14,
        fontWeight: "500",
        color: "#333",
        marginBottom: 6,
        height: 40,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#28a745",
    },
});
