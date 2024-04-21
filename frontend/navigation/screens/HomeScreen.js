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
    }, []);

    const handlePress = (product) => {
        setCurrentProduct(product);
        setModalVisible(true);
    };

    const getCardColor = (expirationDate) => {
        if (!expirationDate) return '#fff'; // Default color if no expiration date
        const expirationTimestamp = new Date(expirationDate).getTime();
        const currentTimestamp = new Date().getTime();
        
        if (expirationTimestamp <= 2) {
            return 'red'; 
        } else if (expirationTimestamp <= 4) {
            return 'yellow'; 
        } else if (expirationTimestamp <= 5) {
            return 'green'; 
        } else {
            return 'white'; 
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item.Title}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.card, { backgroundColor: getCardColor(item.Expiration) }]}
                        onPress={() => handlePress(item)}
                    >
                        <Image source={{ uri: item.Img }} style={styles.cardImage} />
                        <Text style={styles.cardText}>{item.Title}</Text>
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
        borderWidth: 1,
        borderColor: '#ddd',
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
