import { useGlobalState } from "@/components/global/GlobalStateProvider";
import { BASE_URL } from "@/constants/Colors";
import { ProductReview } from "@/constants/Types";
import axios from "axios";
import { format } from "date-fns";

import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";

const ReviewScreen = () => {
    const { user } = useGlobalState();
    const [reviewsList, setReviewsList] = useState<ProductReview[]>([]);

    const getAllReviewsByUserId = async (id: number) => {
        try {
            const response = await axios.get(`${BASE_URL}review/list-by-user/${id}`);
            console.log("dataRes = ", response.data.data);
            setReviewsList(response.data.data || []);
        } catch (error) {
            console.log("error = ", error);
        }
    };

    useEffect(() => {
        getAllReviewsByUserId(user?.user_id || 1);
    }, []);

    const renderReview = ({ item }: { item: ProductReview }) => {
        return (
            <View style={styles.card}>
                <View style={styles.row}>
                    <Image source={{ uri: `${BASE_URL}/${item.product_image}` || "https://via.placeholder.com/80" }} style={styles.image} />
                    <View style={styles.info}>
                        <Text style={styles.title}>{item.product_name}</Text>
                        <View style={styles.stars}>
                            {Array.from({ length: item.number_of_stars }).map((_, index) => (
                                <Text key={index}>⭐</Text>
                            ))}
                        </View>
                        <Text style={styles.comment}>{item.content}</Text>
                    </View>
                </View>
                <Text style={styles.date}>{format(new Date(item.created_date), "dd/MM/yyyy HH:mm:ss")}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={reviewsList}
                keyExtractor={(item) => item.review_id.toString()}
                renderItem={renderReview}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        paddingHorizontal: 10,
    },
    card: {
        backgroundColor: "white",
        borderRadius: 8,
        padding: 15,
        marginVertical: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
    },
    row: {
        flexDirection: "row",
        marginBottom: 10,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    info: {
        marginLeft: 15,
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
    stars: {
        flexDirection: "row",
    },
    comment: {
        fontSize: 14,
        color: "#555",
        marginTop: 5,
    },
    date: {
        fontSize: 12,
        color: "#888",
        textAlign: "right",
    },
});

export default ReviewScreen;
