import { useGlobalState } from "@/components/global/GlobalStateProvider";
import { BASE_URL } from "@/constants/Colors";
import { NewProductItemType } from "@/constants/Types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

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
    const handleSearch = (text) => {
        setSearchText(text);
        console.log("VAO");

        if (text.trim() === "") {
            setProductsList(Array.from(cachedProductsList));
        } else {
            setProductsList(
                Array.from(cachedProductsList).filter((product) => {
                    console.log("product name = " + (product.product_name.toLowerCase()) + " text = " + (text.toLowerCase()))

                    return product.product_name.toLowerCase().includes(text.toLowerCase()) ||
                        product.description.toLowerCase().includes(text.toLowerCase())
                })
            );
        }
    };
    const handleGetProductsList = async () => {
        const response = await axios.get(`${BASE_URL}product/all-list`);
        try {
            console.log("product all response = " + JSON.stringify(response.data.data));
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
    const renderProduct = ({ item }) => (
        <Link href={`product-details/${item.product_id}`} style={styles.productCard}>
            <Image source={{ uri: `${BASE_URL}/${item.current_images[0]}` }} style={styles.productImage} />
            <Text style={styles.productName}>{item.product_name}</Text>
        </Link>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search products by name..."
                value={searchText}
                onChangeText={handleSearch}
            />
            <FlatList
                data={productsList}
                keyExtractor={(item) => `${item.product_id}`}
                renderItem={renderProduct}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fa",
        paddingHorizontal: 16,
        paddingTop: 50,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center",
        color: "#343a40",
    },
    searchInput: {
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 16,
        fontSize: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#ced4da",
    },
    listContainer: {
        paddingBottom: 20,
    },
    row: {
        justifyContent: "space-between",
    },
    productCard: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
        width: "48%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 10,
    },
    productName: {
        fontSize: 16,
        fontWeight: "500",
        color: "#495057",
        textAlign: "center",
    },
});
