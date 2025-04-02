import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { BASE_URL } from "@/constants/Colors";

const ProductDetail = () => {
  const [productDetail, setProductDetail] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleGetProductDetailById = async (productId) => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}product/${productId}`);
      if (response.data) {
        setTimeout(() => {
          setProductDetail(response.data.data ? [response.data.data] : []);
        }, 2000)
      } else {
        setTimeout(() => {
          setProductDetail([]);
        }, 2000)
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      setTimeout(() => {
        setLoading(false);
        setProductDetail([]);
      }, 2000);
    } finally {

    }
  };

  useEffect(() => {
    handleGetProductDetailById(1);
  }, []);

  const handleSelectColor = (color) => setSelectedColor(color);
  const handleSelectSize = (size) => setSelectedSize(size);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ea" />
        <Text style={styles.message}>Loading...</Text>
      </View>
    );
  }

  if (!productDetail.length) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.message}>No get for data product detail.</Text>
      </View>
    );
  }

  const product = productDetail[0];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Product Title and Rating */}
      <View style={styles.titleContainer}>
        <Text style={styles.productTitle}>{product.name || "Product Name"}</Text>
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, index) => (
            <MaterialIcons key={index} name="star" color="#FFD700" size={20} />
          ))}
          <Text style={styles.ratingText}>5.0</Text>
        </View>
      </View>

      {/* Product Image */}
      <Image
        source={{ uri: product.image || "https://via.placeholder.com/300x200" }}
        style={styles.productImage}
        resizeMode="contain"
      />

      {/* Color Options */}
      <View style={styles.optionsContainer}>
        <Text style={styles.optionLabel}>Màu Sắc:</Text>
        <View style={styles.colorOptions}>
          {["gray", "yellow", "blue"].map((color) => (
            <TouchableOpacity
              key={color}
              onPress={() => handleSelectColor(color)}
              style={[
                styles.colorCircle,
                { backgroundColor: color },
                selectedColor === color && styles.selectedColor,
              ]}
            />
          ))}
        </View>
      </View>

      {/* Size Options */}
      <View style={styles.optionsContainer}>
        <Text style={styles.optionLabel}>Kích Cỡ:</Text>
        <View style={styles.sizeOptions}>
          {["S", "M", "L", "XL"].map((size) => (
            <TouchableOpacity
              key={size}
              onPress={() => handleSelectSize(size)}
              style={[
                styles.sizeButton,
                selectedSize === size && styles.selectedSize,
              ]}
            >
              <Text
                style={[
                  styles.sizeText,
                  selectedSize === size && { color: "white" },
                ]}
              >
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Price and Quantity */}
      <Text style={styles.price}>{product.price || "199.000"} VND</Text>
      <View style={styles.quantityContainer}>
        <Text style={styles.optionLabel}>Số Lượng:</Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity
            onPress={() => setQuantity(quantity + 1)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.stockText}>Còn {product.stock || 24} sản phẩm</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.bookmarkButton}>
          <MaterialIcons name="bookmark-border" size={24} color="green" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Thêm Giỏ Hàng</Text>
        </TouchableOpacity>
      </View>

      {/* Description Section */}
      <View style={styles.descriptionContainer}>
        <TouchableOpacity
          onPress={() => setExpandedDescription(!expandedDescription)}
          style={styles.descriptionHeader}
        >
          <Text style={styles.descriptionTitle}>Mô tả</Text>
          <MaterialIcons
            name={
              expandedDescription ? "keyboard-arrow-up" : "keyboard-arrow-down"
            }
            size={24}
          />
        </TouchableOpacity>
        {expandedDescription && (
          <View style={styles.descriptionContent}>
            <Text>{product.description || "Chất liệu: Vải mịn co giãn 4 chiều"}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#008000",
    padding: 16,
    borderRadius: 8,
  },
  headerText: {
    color: "white",
    fontSize: 18,
    marginLeft: 8,
  },
  titleContainer: {
    marginTop: 8,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#555",
  },
  productImage: {
    width: "100%",
    height: 200,
    marginVertical: 16,
    borderRadius: 8,
  },
  optionsContainer: {
    marginBottom: 16,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  colorOptions: {
    flexDirection: "row",
    marginTop: 8,
  },
  colorCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginHorizontal: 8,
  },
  sizeOptions: {
    flexDirection: "row",
    marginTop: 8,
  },
  sizeButton: {
    padding: 8,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    marginHorizontal: 4,
  },
  sizeText: {
    fontSize: 16,
    color: "#000",
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#008000",
    marginVertical: 16,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  stockText: {
    fontSize: 12,
    color: "#888",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  bookmarkButton: {
    width: 50,
    height: 50,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  addToCartButton: {
    flex: 1,
    height: 50,
    backgroundColor: "#008000",
    marginLeft: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  addToCartText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  descriptionContainer: {
    marginBottom: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
  },
  descriptionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  descriptionContent: {
    paddingVertical: 8,
  },
  reviewsContainer: {
    marginTop: 16,
  },
  reviewsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  reviewItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    paddingVertical: 8,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reviewName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  reviewText: {
    marginTop: 4,
    fontSize: 14,
    color: "#555",
  },
  reviewDate: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  }, selectedSize: {
    backgroundColor: "#008000",
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: "#008000",
  },
  message: {
    marginTop: 16,
    fontSize: 16,
    color: "#000",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white", // Optional: Adjust background color if needed
    padding: 16, // Optional: Adds spacing for better alignment on smaller screens
  },
});

export default ProductDetail;
