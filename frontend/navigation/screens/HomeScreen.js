import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
    const [products, setProducts] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/getItems');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item.Title} // Make sure the key is unique
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card} onPress={() => {/* navigate to details */}}>
                        <Image source={{ uri: item.Img }} style={styles.cardImage} />
                        <Text style={styles.cardText}>{item.Title}</Text>
                    </TouchableOpacity>
                )}
                
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    card: {
        margin: 5,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    cardImage: {
        width: '100%',
        height: 200,
    },
    cardText: {
        padding: 10,
    },
});
