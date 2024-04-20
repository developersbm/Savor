import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProductInfoCard = ({ productInfo }) => {
  const openLink = (link) => {
    Linking.openURL(link);
  };

  return (
    <View style={styles.productCard}>
      <Image source={{ uri: productInfo.items[0].images[0] }} style={styles.productImage} />
      <Text style={styles.productName}>{productInfo.items[0].title}</Text>
      <Text style={styles.productCategory}>{productInfo.items[0].category}</Text>
      <TouchableOpacity style={styles.purchaseButton} onPress={() => openLink(productInfo.items[0].offers[0].link)}>
        <Text style={styles.purchaseButtonText}>Buy Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  productCard: {
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  productImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productCategory: {
    marginBottom: 10,
  },
  purchaseButton: {
    backgroundColor: 'tomato',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  purchaseButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProductInfoCard;
