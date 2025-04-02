import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "@/constants/Colors";
import { useGlobalState } from "@/components/global/GlobalStateProvider";

export default function FeedbackScreen() {
    const { id } = useLocalSearchParams();
    const { user } = useGlobalState();
    const [rating, setRating] = useState(1);
    const [review, setReview] = useState("");


    const handleRatingPress = (value: number) => {
        setRating(value);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${BASE_URL}review/new`, {
                user_id: user?.user_id,
                product_id: id,
                content: review,
                number_of_stars: rating
            });

            console.log("response = " + JSON.stringify(response.data.data));
            alert(response.data.message)
            console.log(response.data.message)
        } catch (e) {
            if (e instanceof AxiosError) {
                alert(e.response?.data.message);
            } else {
                alert("Đã có lỗi khi gửi request lên server.")
            }
        }

    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior="padding"
        >
            <ScrollView
                automaticallyAdjustKeyboardInsets={true}
                style={styles.container}
                contentContainerStyle={{ flexGrow: 1 }}

                keyboardShouldPersistTaps="handled"
            >

                {/* Illustration */}
                <Image
                    source={require("../../assets/images/icon_shop.png")}
                    style={styles.image}
                />

                {/* Title */}
                <Text style={styles.title}>
                    Đánh giá quá trình giao hàng cho đơn hàng này
                </Text>
                {/* Review Input */}
                <Text style={styles.subtitle}>Đánh giá</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Hãy cho chúng tôi biết đánh giá của bạn"
                    multiline
                    value={review}
                    onChangeText={setReview}
                />

                {/* Rating */}
                <Text style={styles.subtitle}>Xếp hạng</Text>
                <View style={styles.ratingContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <TouchableOpacity key={star} onPress={() => handleRatingPress(star)}>
                            <FontAwesome
                                name="star"
                                size={32}
                                color={star <= rating ? "#FFD700" : "#ccc"}
                            />
                        </TouchableOpacity>
                    ))}
                </View>


                {/* Submit Button */}
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Gửi đánh giá</Text>
                </TouchableOpacity>

                {/* Note */}
                <Text style={styles.note}>Đánh giá sẽ được hiển thị công khai</Text>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    header: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
    },
    image: {
        width: "100%",
        height: 200,
        resizeMode: "contain",
        marginBottom: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10,
    },
    ratingContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        textAlignVertical: "top",
        minHeight: 80,
    },
    button: {
        backgroundColor: "#8B4513",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    note: {
        fontSize: 12,
        color: "#888",
        textAlign: "center",
        marginTop: 10,
    },
});
