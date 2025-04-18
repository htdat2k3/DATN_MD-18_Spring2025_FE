import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { BASE_URL } from "@/constants/Colors";
import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks";
import { PairProduct, PairValueProduct, ProductDetail, ProductVariant, ReviewProduct } from "@/constants/Types";
import { Link, useFocusEffect } from "expo-router";
import { useGlobalState } from "@/components/global/GlobalStateProvider";
import { formatMoney } from "@/constants/Utils";
type StringArrayMap = {
  [key: string]: string[];
};
const ProductDetailScreen = () => {

  const { user } = useGlobalState()
  const { id } = useLocalSearchParams()
  const [productDetail, setProductDetail] = useState<ProductDetail>();
  const [quantity, setQuantity] = useState(0);
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>();
  const [selectedPairProduct, setSelectedPairProduct] = useState<PairProduct>();
  const [mapColorState, setMapColorState] = useState<Map<string, string[]>>(new Map());
  const [mapSizeState, setMapSizeState] = useState<Map<string, string[]>>(new Map());
  const [mapProduct, setMapProduct] = useState<Map<string, PairValueProduct>>();
  const [reviewsList, setReviewList] = useState<ReviewProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const handleLikeProduct = async (productId: number, userId: number, status: boolean) => {
    try {
      const response = await axios.post(`${BASE_URL}product/like`, {
        product_id: productId,
        user_id: userId,
        status: status
      });

      if (response.data) {
        // Cập nhật trạng thái yêu thích ngay lập tức trong UI
        setProductDetail(prev => prev ? {
          ...prev,
          isFavourite: status
        } : null);

        // Hiển thị thông báo
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
      alert("Có lỗi xảy ra khi cập nhật trạng thái yêu thích");
    }
  };

  const renderItem = (item: ReviewProduct) => (
    <View style={styles.reviewContainer} key={item.review_id}>
      {/* User and Rating */}
      <View style={styles.header1}>
        <Text style={styles.userName}>{item.user_name}</Text>
        <View style={styles.rating}>
          {[...Array(item.number_of_stars)].map((_, index) => (
            <FontAwesome key={index} name="star" size={16} color="#FFD700" />
          ))}
        </View>
      </View>

      {/* Date and Size */}
      <Text style={styles.date}>{item.created_date}</Text>

      {/* Feedback */}
      <Text style={styles.feedback}>{item.content}</Text>
    </View>
  );
  const handleGetProductDetailById = async (productId: number) => {
    try {
      console.log(productId)
      setLoading(true);


      const response = await axios.post(`${BASE_URL}product/detail`, {
        user_id: user?.user_id,
        product_id: productId
      });

      console.log("=======< VAO");

      const mapColor = new Map<string, string[]>();
      const mapSize = new Map<string, string[]>();
      const mapProductTemp = new Map<string, PairValueProduct>();
      const productDetailData = JSON.parse(JSON.stringify(response.data.data)) as ProductDetail;
      console.log("response = " + JSON.stringify(productDetailData));

      productDetailData.variants.forEach((value: ProductVariant) => {
        if (mapColor.has(value.color_name)) {
          const existingArray = mapColor.get(value.color_name);
          if (existingArray) {
            existingArray.push(value.size_name);
            mapColor.set(value.color_name, existingArray);
          }
        } else {
          mapColor.set(value.color_name, [value.size_name]);
        }

        if (mapSize.has(value.size_name)) {
          const existingArray = mapColor.get(value.size_name);
          if (existingArray) {
            existingArray.push(value.color_name);
            mapColor.set(value.size_name, existingArray);
          }
        } else {
          mapSize.set(value.size_name, [value.color_name]);
        }

        mapProductTemp.set(`${value.color_name}_${value.size_name}`, { price: value.price, quantity: value.quantity, variant_id: value.variant_id })

      })

      setMapProduct(mapProductTemp)
      console.log(mapProduct)
      setSelectedPairProduct({
        color_name: productDetailData.variants[0].color_name,
        size_name: productDetailData.variants[0].size_name
      })
      setMapColorState(mapColor)
      console.log("mapSize = " + JSON.stringify(mapSize));
      console.log("mapColor = " + JSON.stringify(mapColor));
      console.log("mapSizeState = " + JSON.stringify(mapSizeState));
      console.log("mapColorState = " + JSON.stringify(mapColorState));
      setMapSizeState(mapSize)
      setSelectedVariant(productDetailData.variants[0]);
      if (response.data) {
        setTimeout(() => {
          setProductDetail(productDetailData);
          setLoading(false)
        }, 2000)
      } else {
        setTimeout(() => {
          setProductDetail(null);
          setLoading(false)
        }, 2000)
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      setTimeout(() => {
        setLoading(false);
        setProductDetail(null);
      }, 2000);
    } finally {

    }
  };
  const handleGetProductDetailCommentById = async (productId: number) => {
    try {
      console.log(productId)
      setLoading(true);
      const response = await axios.get(`${BASE_URL}review/list-by-product/${productId}`);
      const reviewList = JSON.parse(JSON.stringify(response.data.data))
      setReviewList(reviewList);
    }
    catch (e) {
      console.log("error = " + e);

    }
  };

  const handleSendProductToCart = async (UserId: number, variant_id: number, quantity: number) => {
    try {
      const response = await axios.post(`${BASE_URL}cart/new`, {
        user_id: UserId,
        variant_id: variant_id,
        quantity: quantity
      });

      alert(response.data.message)

    }
    catch (e) {
      console.log("error = " + e);

    }
  }

  useEffect(() => {
    handleGetProductDetailById(id);
    handleGetProductDetailCommentById(id)
  }, []);

  // Thêm useFocusEffect để reload data khi focus vào màn hình
  useFocusEffect(
    useCallback(() => {
      console.log("Screen focused - Reloading product details");
      // Gọi lại các hàm fetch data ở đây
      handleGetProductDetailById(id);
      handleGetProductDetailCommentById(id);
      return () => {
        // Cleanup nếu cần
        console.log("Screen unfocused");
      };
    }, [id]) // Dependency array để chỉ chạy khi focus thay đổi
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ea" />
        <Text style={styles.message}>Loading...</Text>
      </View>
    );
  }

  if (productDetail == null) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.message}>No get for data product detail.</Text>
      </View>
    );
  }

  const product = productDetail;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Product Title and Rating */}
      <View style={styles.titleContainer}>
        <Text style={styles.productTitle}>{product.product_name || "Product Name"}</Text>
        <View style={styles.ratingContainer}>
          {Array(productDetail.rating).fill(0).map((_, index) => (
            <MaterialIcons key={index} name="star" color="#FFD700" size={20} />
          ))}

          <Text style={styles.ratingText}>{productDetail.rating}</Text>
        </View>
      </View>

      {/* Product Image */}
      <Image
        source={{ uri: `${BASE_URL}/${productDetail.images[0]}` }}
        style={styles.productImage}
        resizeMode="contain"
      />

      {/* Color Options */}
      <View style={styles.optionsContainer}>
        <Text style={styles.optionLabel}>Màu Sắc:</Text>
        <View style={styles.colorOptions}>

          {Array.from(mapColorState?.keys() || []).map((variant, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {

                setSelectedPairProduct({
                  color_name: variant,
                  size_name: mapColorState?.has(selectedPairProduct!!.size_name) ? selectedPairProduct!!.size_name : mapColorState?.get(variant)!![0],
                })
              }}
              style={[
                styles.colorCircle,
                { backgroundColor: variant },
                selectedPairProduct?.color_name === variant && styles.selectedColor,
              ]}
            />
          )
          )}
        </View>
      </View>

      {/* Size Options */}
      <View style={styles.optionsContainer}>
        <Text style={styles.optionLabel}>Kích Cỡ:</Text>
        <View style={styles.sizeOptions}>
          {Array.from(mapColorState?.get(selectedPairProduct?.color_name ? selectedPairProduct?.color_name : "") || []).map((variant, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedPairProduct({
                  color_name: selectedPairProduct!!.color_name,
                  size_name: variant
                })
              }}
              style={[
                styles.sizeButton,
                selectedPairProduct?.size_name === variant && styles.selectedSize,
              ]}
            >
              <Text
                style={[
                  styles.sizeText,
                  selectedPairProduct?.size_name === variant && { color: "white" },
                ]}
              >
                {variant}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Price and Quantity */}

      <Text style={styles.price}>{formatMoney(mapProduct?.get(`${selectedPairProduct!!.color_name}_${selectedPairProduct!!.size_name}`)?.price || 0)}</Text>
      <View style={styles.quantityContainer}>
        <Text style={styles.optionLabel}>Số Lượng:</Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
            style={styles.quantityButton}
          >
            <Text style={styles.quantity}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity
            onPress={() => setQuantity(Math.min(quantity + 1, (mapProduct?.get(
              `${selectedPairProduct?.color_name}_${selectedPairProduct?.size_name}`
            )?.quantity || 0)))}
            style={styles.quantityButton}
          >
            <Text style={styles.quantity}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.stockText}>
          Còn{" "}
          {Math.max(
            (mapProduct?.get(
              `${selectedPairProduct?.color_name}_${selectedPairProduct?.size_name}`
            )?.quantity || 0) - quantity,
            0
          )}{" "}
          sản phẩm
        </Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.bookmarkButton,
            productDetail?.isFavourite && styles.bookmarkButtonActive
          ]}
          onPress={() => {
            if (!user?.user_id) {
              alert("Vui lòng đăng nhập để thêm vào yêu thích");
              return;
            }
            handleLikeProduct(
              product.product_id,
              user.user_id,
              !productDetail.isFavourite
            );
          }}
        >
          <MaterialIcons
            name={productDetail?.isFavourite ? "favorite" : "favorite-border"}
            size={24}
            color={productDetail?.isFavourite ? "#FF4444" : "#666666"}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addToCartButton} onPress={() => {
          if (quantity > 0) {
            handleSendProductToCart(user?.user_id || 0, (mapProduct?.get(
              `${selectedPairProduct?.color_name}_${selectedPairProduct?.size_name}`
            )?.variant_id || 0), quantity)
          }

        }}>
          <Text style={styles.addToCartText}>Thêm Giỏ Hàng</Text>
        </TouchableOpacity>
      </View>

      {/* Buttons */}


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

      {/* Review */}
      <View style={styles.reviewContainerTmp}>
        <View style={styles.reviewTitle}>
          <Text style={styles.title}>Đánh Giá</Text>
          <Link style={styles.reviewBtnText} href={`evaluation/${id}`}>
            Xếp hạng và đánh giá
          </Link>
        </View>
        {
          reviewsList?.map((value, index) => (
            renderItem(value)
          ))
        }
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  reviewTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  reviewBtnText: {
    color: "#008000",
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  reviewContainerTmp: {
    marginTop: 20,
  },
  reviewContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  rating: {
    flexDirection: "row",
  },
  date: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  size: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
  },
  feedback: {
    fontSize: 14,
    color: "#333",
    marginTop: 8,
  },

  container: {
    padding: 16,
    backgroundColor: "white",
  },
  header1: {
    flexDirection: "row",
    alignItems: "center",
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
  reviewButton: {
    backgroundColor: "#008000",
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

export default ProductDetailScreen;
