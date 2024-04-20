import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Linking } from 'react-native';
import { dataBase } from './dataBase';

export default function HomeScreen({ navigation }) {
    const [categories, setCategories] = useState(dataBase.categories); 
    const [activeCategory, setActiveCategory] = useState(categories[0].name);

    const renderCards = () => {
        const activeCategoryProducts = categories.find(category => category.name === activeCategory).products;
        return activeCategoryProducts.map((product, index) => {
            return (
                <View style={styles.card} key={index}>
                    <Image source={{ uri: product.image }} style={styles.cardImage} />
                    <View style={styles.cardInfo}>
                        <Text style={styles.cardText}>{product.name}</Text>
                        <Text style={styles.cardCategory}>{product.category}</Text>
                    </View>
                </View>
            );
        });
    };

    return (
        <View>
            <View style={styles.category}>
                <Text style={styles.categoryTitle}>Categories</Text>
                <ScrollView 
                    horizontal
                    contentContainerStyle={styles.categoryContainer}
                    showsHorizontalScrollIndicator={false}
                >
                    {categories.map((category, index) => {
                        const isActive = category.name === activeCategory;
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setActiveCategory(category.name)}
                                style={[styles.categoryItem, isActive && styles.activeCategoryItem]}
                            >
                                <Text style={styles.categoryText}>{category.name}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>

            <View style={styles.container}>
                <View style={styles.section}>
                    {renderCards()}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    section: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        marginTop: 20,
    },
    card: {
        width: '45%',
        backgroundColor: '#fff',
        marginBottom: 20,
        height: 260,
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
    },
    cardImage: {
        width: '100%',
        height: 200,
    },
    cardInfo: {
        padding: 10,
        width: '100%',
    },
    cardText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cardCategory: {
        fontSize: 14,
        color: 'gray',
        textAlign: 'center',
    },
    category: {
        flexDirection: 'column',
        marginBottom: 20,
    },
    categoryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: 10,
    },
    categoryContainer: {
        paddingLeft: 10,
    },
    categoryItem: {
        marginRight: 8,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    activeCategoryItem: {
        backgroundColor: '#4CAF50',
    },
    categoryText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
