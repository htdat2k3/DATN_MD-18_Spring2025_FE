import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const products = [
  { id: '1', name: 'Áo Thun Nam', price: '350,000 VND', image: 'https://360.com.vn/wp-content/uploads/2023/12/QJDTK423-2-Custom.jpg', colors: ['#000', '#fff','#f00', '#0f0'],size: ['S', 'M', 'L', 'XL'], rating: 5},
  { id: '2', name: 'Áo Khoác Nữ', price: '750,000 VND', image: 'https://yolosport.com.vn/wp-content/uploads/2023/08/chu-yolo-Den-web-3-scaled.jpg', colors: ['#f00', '#0f0','#f00', '#0f0'],ize: ['S', 'M', 'L', 'XL'], rating: 5},
  { id: '3', name: 'Quần Jean Nam', price: '650,000 VND', image: 'https://thegioidotap.vn/wp-content/uploads/2020/12/quan-dai-the-thao-nam-jogger-sg10-3.jpg', colors: ['#00f', '#f00','#f00', '#0f0'],size: ['S', 'M', 'L', 'XL'], rating: 5 },
  { id: '4', name: 'Váy Nữ', price: '550,000 VND', image: 'https://zizoou.com/cdn/shop/products/Quan-Baggy-Jean-nam-nu-2b-1-Quan-ong-rong-xanh-classic-ZiZoou-Store.jpg?v=1680283265&width=1946', colors: ['#f00', '#00f','#f00', '#0f0'],size: ['S', 'M', 'L', 'XL'], rating: 5 },
];

const categories = ['Tất cả quần', 'Quần dài', 'Quần cộc'];
const filters = ['Kích cỡ', 'Màu sắc', 'Giá'];

const PantProduct1 = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [modalVisible, setModalVisible] = useState(null);

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[styles.navItem, selectedCategory === category && styles.activeNavItem]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[styles.navText, selectedCategory === category && styles.activeNavText]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bộ lọc */}
      <View style={styles.filterContainer}>
        {filters.map((filter, index) => (
          <TouchableOpacity key={index} style={styles.filterButton} onPress={() => setModalVisible(filter)}>
            <Text style={styles.filterText}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Danh sách sản phẩm */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}
          onPress={() => navigation.navigate('ProductDetail', { product: item })}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.infoContainer}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>
              <Text style={styles.rating}>⭐ {item.rating}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default PantProduct1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#34495e',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  navItem: {
    paddingVertical: 8,
  },
  activeNavItem: {
    borderBottomWidth: 3,
    borderBottomColor: 'white',
  },
  navText: {
    color: '#bdc3c7',
    fontSize: 14,
  },
  activeNavText: {
    color: 'white',
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  filterText: {
    color: 'white',
    fontWeight: 'bold',
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    width: '48%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
  },
  rating: {
    fontSize: 12,
    color: '#888',
  },
});
