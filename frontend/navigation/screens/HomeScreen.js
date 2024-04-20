import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Linking } from 'react-native';

export default function HomeScreen({ navigation }) {

    const exampleImage = "https://i5.walmartimages.com/asr/a308e2f8-68d9-46fe-aab3-87de3f09e6d4_1.dc3154bdb9655e531ae9f414af2a8e5e.png?odnHeight=450&odnWidth=450&odnBg=ffffff";
    const [categories, setCategories] = useState([
        { name: "Pantry", products: [
            { name: "Cookies", category: "Sweets", image: exampleImage, link: "cookie_link_url" },
            { name: "Chips", category: "Snacks", image:exampleImage, link: "chips_link_url" }
        ] },
        { name: "Freezer", products: [
            { name: "Frozen berries", category: "Frozen Fruits", image: exampleImage, link: "berries_link_url" }
        ] },
        { name: "Fridge", products: [
            { name: "Milk", category: "Dairy", image: exampleImage, link: "milk_link_url" },
            { name: "Eggs", category: "Dairy", image: exampleImage, link: "eggs_link_url" },
            { name: "Milk", category: "Dairy", image: exampleImage, link: "milk_link_url" },
            { name: "Milk", category: "Dairy", image: exampleImage, link: "milk_link_url" },
        ] }
    ]);
    const [activeCategory, setActiveCategory] = useState(categories[0].name);

    const openLink = (link) => {
        Linking.openURL(link);
    };

    const renderCards = () => {
        const activeCategoryProducts = categories.find(category => category.name === activeCategory).products;
        return activeCategoryProducts.map((product, index) => {
            return (
                <TouchableOpacity key={index} style={styles.card} onPress={() => openLink(product.link)}>
                    <Image source={{ uri: product.image }} style={styles.cardImage} />
                    <View style={styles.cardInfo}>
                        <Text style={styles.cardText}>{product.name}</Text>
                        <Text style={styles.cardCategory}>{product.category}</Text>
                    </View>
                </TouchableOpacity>
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
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
        height: 260,
    },
    cardImage: {
        width: '100%',
        height: 200,
    },
    cardInfo: {
        padding: 10,
        width: '100%',
        alignItems: 'center',
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