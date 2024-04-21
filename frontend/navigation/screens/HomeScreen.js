import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
    const [products, setProducts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://10.26.1.168:3000/getItems');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();

        const interval = setInterval(fetchData, 30000);

        return () => clearInterval(interval);
    }, []);

    const handlePress = (product) => {
        setCurrentProduct(product);
        setModalVisible(true);
    };

    const getCardColors = (expirationDate) => {
        if (!expirationDate) return { borderColor: '#ddd' };
        
        if (expirationDate <= 2) {
            return { borderColor: '#FF474D' }; 
        } else if (expirationDate <= 4) {
            return { borderColor: 'orange' }; 
        } else if (expirationDate <= 5) {
            return { borderColor: 'green' }; 
        } else {
            return { borderColor: 'darkgreen' }; 
        }
    };
    

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item.Title}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.card, { borderColor: getCardColors(item.Expiration).borderColor }]}
                        onPress={() => handlePress(item)}
                    >
                        <Image source={{ uri: item.Img }} style={styles.cardImage} />
                        <Text style={[styles.cardText, { color: getCardColors(item.Expiration).nameColor }]}>{item.Title}</Text>
                    </TouchableOpacity>
                )}
                numColumns={2}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Image source={{ uri: currentProduct?.Img }} style={styles.modalImage} />
                        <Text style={styles.modalText}>Title: {currentProduct?.Title}</Text>
                        <Text style={styles.modalText}>Expiration: {currentProduct?.Expiration || 'N/A'}</Text>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    card: {
        flex: 1,
        margin: 5,
        borderWidth: 3,
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        padding: 10,
        height: 300,
    },
    cardImage: {
        width: '100%',
        height: 200,
    },
    cardText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalImage: {
        width: 200,
        height: 200,
        marginBottom: 15,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    }
});
