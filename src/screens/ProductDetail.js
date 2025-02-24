import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ProductDetail = ({ route }) => {
  const product = route.params?.product;
  const sizes = Array.isArray(product?.size) ? product.size : [];

  if (!product) {
    return <View style={styles.center}><Text>Không tìm thấy sản phẩm!</Text></View>;
  }

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  return (
    <View style={styles.container}>
      {/* Tiêu đề */}
      <Text style={styles.header}>Chi tiết sản phẩm</Text>

      {/* Tên sản phẩm */}
      <Text style={styles.name}>{product.name}</Text>

      {/* Đánh giá */}
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>⭐⭐⭐⭐⭐ {product.rating}</Text>
      </View>

      {/* Ảnh sản phẩm */}
      <Image source={{ uri: product.image }} style={styles.image} />


      {/* Chọn màu sắc */}
      <View style={styles.section}>
        <Text style={styles.label}>Màu Sắc:</Text>
        <View style={styles.colorContainer}>
          {product.colors.map((color, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.colorCircle,
                { backgroundColor: color, borderWidth: selectedColor === color ? 3 : 0 }
              ]}
              onPress={() => setSelectedColor(color)}
            />
          ))}
        </View>
      </View>

      {/* Chọn kích cỡ */}
      <View style={styles.section}>
        <Text style={styles.label}>Kích Cỡ:</Text>
        <View style={styles.sizeContainer}>
          {sizes.map((size, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.sizeBox, selectedSize === size && styles.activeSize]}
              onPress={() => setSelectedSize(size)}
            >
              <Text style={[styles.sizeText, selectedSize === size && styles.activeSizeText]}>{size}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Giá & tồn kho */}
      <Text style={styles.price}>{product.price}</Text>
      <Text style={styles.stock}>Còn {product.stock} sản phẩm</Text>

      {/* Chọn số lượng */}
      <View style={styles.quantityContainer}>
        <Text style={styles.label}>Số lượng:</Text>
        <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))} style={styles.button}>
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.button}>
        </TouchableOpacity>
      </View>

      {/* Nút thêm vào giỏ hàng */}
      <TouchableOpacity style={styles.addToCart}>
        <Text style={styles.addToCartText}>Thêm vào giỏ hàng</Text>
      </TouchableOpacity>

      {/* Mô tả sản phẩm */}
      <Text style={styles.description}>{product.description}</Text>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 20, 
    backgroundColor: '#fff' 
  },
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  header: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 15 },
  image: { 
    width: '100%', 
    height: 250, 
    resizeMode: 'cover', 
    borderRadius: 10, 
    marginBottom: 10, 
    shadowColor: '#000', 
    shadowOpacity: 0.2, 
    shadowOffset: { width: 0, height: 2 } 
  },
  name: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 5 
  },
  ratingContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10 
  },
  rating: { 
    fontSize: 14, 
    color: '#f39c12' 
  },

  // Chọn màu sắc
  section: { 
    marginBottom: 15 
  },
  label: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    marginBottom: 5 
  },
  colorContainer: { 
    flexDirection: 'row' 
  },
  colorCircle: { 
    width: 35, 
    height: 35, 
    borderRadius: 18, 
    marginRight: 10, 
    borderColor: '#000' 
  },

  // Kích cỡ
  sizeContainer: { 
    flexDirection: 'row' 
  },
  sizeBox: {
    paddingVertical: 10, 
    paddingHorizontal: 15, 
    borderWidth: 1, 
    borderColor: '#ddd',
    borderRadius: 8, 
    marginRight: 10,
  },
  activeSize: { 
    backgroundColor: '#27ae60', 
    borderColor: '#27ae60' 
  },
  sizeText: { 
    fontSize: 14, 
    color: '#000' 
  },
  activeSizeText: { 
    color: '#fff', 
    fontWeight: 'bold' 
  },

  // Giá & tồn kho
  price: { 
    fontSize: 18, 
    color: 'green', 
    fontWeight: 'bold', 
    marginVertical: 5 
  },
  stock: { 
    fontSize: 14, 
    color: '#27ae60', 
    marginBottom: 10 
  },

  // Chọn số lượng
  quantityContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 15 
  },
  button: { 
    padding: 8, 
    backgroundColor: '#ddd', 
    borderRadius: 8, 
    marginHorizontal: 5 
  },
  quantity: { 
    fontSize: 16, 
    fontWeight: 'bold' 
  },

  // Nút thêm vào giỏ hàng
  addToCart: {
    backgroundColor: '#27ae60', 
    padding: 12, 
    borderRadius: 8, 
    alignItems: 'center',
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginBottom: 10,
  },
  addToCartText: { 
    color: 'white', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },

  // Mô tả sản phẩm
  description: { 
    marginTop: 10, 
    fontSize: 14, 
    color: '#555' 
  }
});
