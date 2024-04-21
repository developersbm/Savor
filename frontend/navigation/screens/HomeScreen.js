import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Linking } from 'react-native';
import axios from 'axios'; // Make sure axios is installed

export default function HomeScreen({ navigation }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/getItems');
                
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    const openLink = (link) => {
        Linking.openURL(link);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.screenTitle}>Products</Text>
            <ScrollView style={styles.scrollView}>
                {products.map((product, index) => (
                    <TouchableOpacity key={index} style={styles.card} onPress={() => openLink(product.Img)}>
                        <Image source={{ uri: product.Img }} style={styles.cardImage} />
                        <View style={styles.cardInfo}>
                            <Text style={styles.cardText}>{product.Title}</Text>
                            <Text style={styles.cardCategory}>{product.Category}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    scrollView: {
        marginTop: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    cardImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    cardInfo: {
        padding: 10,
    },
    cardText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardCategory: {
        fontSize: 14,
        color: '#666',
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
});
