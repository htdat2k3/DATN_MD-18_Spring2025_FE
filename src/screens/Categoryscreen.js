import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

const categories = [
  { id: '1', name: 'Quần Âu', image: 'https://product.hstatic.net/1000304105/product/xtt1__4__158c3667b2544aaf91a1036f40bbe7a7_d08a96aaef604e519bce7863c331e75f_master.jpg' },
  { id: '2', name: 'Quần Jean & Quần Jean Màu', image: 'https://360.com.vn/wp-content/uploads/2023/12/QJDTK423-2-Custom.jpg' },
  { id: '3', name: 'Quần Đùi', image: 'https://yolosport.com.vn/wp-content/uploads/2023/08/chu-yolo-Den-web-3-scaled.jpg' },
  { id: '4', name: 'Quần Thể Thao', image: 'https://thegioidotap.vn/wp-content/uploads/2020/12/quan-dai-the-thao-nam-jogger-sg10-3.jpg' },
  { id: '5', name: 'Quần Baggy', image: 'https://zizoou.com/cdn/shop/products/Quan-Baggy-Jean-nam-nu-2b-1-Quan-ong-rong-xanh-classic-ZiZoou-Store.jpg?v=1680283265&width=1946' },
];

const CategoryScreen = () => {
  const navigation = useNavigation();

  const renderItem = useCallback(({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Pant1', { categoryId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  ), []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Danh mục</Text>
      <FlatList 
        data={categories} 
        renderItem={renderItem} 
        keyExtractor={(item) => item.id} 
      />
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
});
