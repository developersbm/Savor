import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Linking } from 'react-native';
import axios from 'axios'; // Assuming axios is used for API calls

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

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => Linking.openURL(item.link)}>
            <Image source={{ uri: item.Img }} style={styles.cardImage} />
            <Text style={styles.cardText}>{item.Title}</Text>
            
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={item => item.Title} // Ensure your items have unique titles or use a unique id
            numColumns={2} // Set the number of columns to 2 for two items per row
            contentContainerStyle={styles.container}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
    card: {
        flex: 1,
        margin: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#fff',
        alignItems: 'center', // Centering items in the card
        padding: 10
    },
    cardImage: {
        width: '100%',
        height: 100, // Adjust height based on your content
        resizeMode: 'cover'
    },
    cardText: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingVertical: 5,
    },
    cardCategory: {
        fontSize: 14,
        color: 'gray',
    },
});
