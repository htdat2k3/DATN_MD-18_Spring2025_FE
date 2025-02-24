// ProductShirtsScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const shirts = [
  { id: '1', title: 'Áo Thun Trắng' },
  { id: '2', title: 'Áo Khoác Năng Động' },
  { id: '3', title: 'Áo Sơ Mi' },
];

const ProductShirtsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sản Phẩm Áo</Text>
      <FlatList
        data={shirts}
        renderItem={({ item }) => <Text style={styles.item}>{item.title}</Text>}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    fontSize: 18,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

export default ProductShirtsScreen;