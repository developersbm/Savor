import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';

const ProductInfoCard = ({ productInfo, updateExpirationValue, onSubmit, expirationValue }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (text) => {
    setInputValue(text);
    updateExpirationValue(text);
  };

  const handleSubmit = () => {
    onSubmit(inputValue); 
  };

  const renderExpirationDate = () => {
    const expirationDate = new Date(productInfo.items[0].offers[0].expirationDate);
    const currentDate = new Date();

    if (expirationDate > currentDate) {
      return (
        <Text style={styles.expirationText}>
          Expires on: {expirationDate.toLocaleDateString()}
        </Text>
      );
    } else {
      return (
        <Text style={styles.expiredText}>Expiration based on days!</Text>
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.productCard}>
        <Image style={styles.productImage} source={{ uri: productInfo.items[0].images[0] }} />
        <Text style={styles.productName}>{productInfo.items[0].title}</Text>
        <Text style={styles.productCategory}>{productInfo.items[0].category}</Text>
        {renderExpirationDate()}
        <TextInput
          style={styles.input}
          onChangeText={handleInputChange}
          value={inputValue}
          keyboardType="numeric"
          placeholder="Enter a number"
        />
      <View style={{ backgroundColor: 'green', borderRadius: 20, paddingHorizontal: 20 }}>
        <Button
          title="Submit"
          onPress={handleSubmit}
          color="white"
        />
      </View>
      </View>
    </TouchableWithoutFeedback>
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
  expirationText: {
    color: 'green',
    fontWeight: 'bold',
    marginTop: 10,
  },
  expiredText: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 10,
  },
});

export default ProductInfoCard;
