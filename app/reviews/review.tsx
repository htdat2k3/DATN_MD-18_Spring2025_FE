import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";

const reviews = [
    {
        id: "1",
        image: "https://via.placeholder.com/300x200", // Replace with your image URL
        title: "Áo",
        price: "$ 50.00",
        rating: 5,
        comment: "Áo rất đẹp",
        date: "20/03/2020",
    },
    {
        id: "2",
        image: "https://via.placeholder.com/300x200", // Replace with your image URL
        title: "Áo",
        price: "$ 50.00",
        rating: 5,
        comment: "Áo đẹp quá",
        date: "20/03/2020",
    },
];

const ReviewScreen = () => {
    const renderReviews = ({ item: review }) => {
        return (
            <View style={styles.card}>
                <View style={styles.row}>
                    <Image source={{ uri: review.image }} style={styles.image} resizeMode="contain" />
                    <View style={styles.info}>
                        <Text style={styles.title}>{review.title}</Text>
                        <Text style={styles.price}>{review.price}</Text>
                        <View style={styles.stars}>
                            {Array.from({ length: review.rating }).map((_, index) => (
                                <Text key={index}>⭐</Text>
                            ))}
                        </View>
                        <Text style={styles.comment}>{review.comment}</Text>
                    </View>
                </View>
                <Text style={styles.date}>{review.date}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={reviews}
                keyExtractor={(item) => item.id}
                renderItem={renderReviews}
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
    header: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        backgroundColor: "#2DCC70",
        padding: 15,
        textAlign: "center",
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
    price: {
        fontSize: 14,
        color: "#000",
        marginVertical: 5,
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
