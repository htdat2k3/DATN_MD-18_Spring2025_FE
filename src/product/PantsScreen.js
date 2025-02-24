// ProductPantsScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const pants = [
  { id: '1', title: 'Quần Jean' },
  { id: '2', title: 'Quần Đùi' },
  { id: '3', title: 'Quần Tây' },
];

const ProductPantsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sản Phẩm Quần</Text>
      <FlatList
        data={pants}
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

export default ProductPantsScreen;