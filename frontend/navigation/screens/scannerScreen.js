import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Modal } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ProductInfoCard from './components/ProductInfoCard';
import { Ionicons } from '@expo/vector-icons';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'; // Assuming firestore imports are set up correctly
import { db } from '../../config'; // Make sure you have a firebase config file exporting db



const ScannerScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [productInfo, setProductInfo] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const fetchProductInfo = async (barcodeID) => {
        try {
            const response = await fetch(`https://api.upcitemdb.com/prod/trial/lookup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'user_key': 'only_for_dev_or_pro',
                    'key_type': '3scale'
                },
                body: JSON.stringify({ upc: barcodeID })
            });
            const data = await response.json();
            return data.items[0]; // Assuming the API returns an array of items
        } catch (error) {
            console.error('Error fetching product information:', error);
            return null;
        }
    };

    const fetchEstimatedData = async (category) => {
      // Define the API key and endpoint
      const API_KEY = "AIzaSyDEx0_Ic0ocOySgKLHA2ZEyh9RZ-QwpRio";
      const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;
  
      // Create a prompt for the AI
      const prompt = `Could you create a JSON response that gives me the average time of expiration and its calories for products categorized under "${category}"?`;
  
      // Setting up the request body with the prompt
      const requestBody = {
          prompt: prompt,
          maxTokens: 150, // Assuming a token limit, adjust as needed
          stop: ["\n", "end"] // Specify stopping conditions if applicable
      };
  
      try {
          const response = await fetch(API_ENDPOINT, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(requestBody)
          });
          const estimatedData = await response.json();
  
          // Assuming the response needs to be parsed or manipulated
          const expiration = estimatedData.expiration; // Modify according to actual response structure
          const calories = estimatedData.calories; // Modify according to actual response structure
  
          return { expiration, calories };
      } catch (error) {
          console.error('Error fetching estimated data:', error);
          return { expiration: null, calories: null };
      }
  };
  

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    const productBasicInfo = await fetchProductInfo(data);
    if (!productBasicInfo) return;

    const estimatedData = await fetchEstimatedData(productBasicInfo.category);
    const fullProductInfo = {
        ...productBasicInfo,
        expiration: estimatedData.expiration || 'Not Available', // Ensure fallback if null
        calories: estimatedData.calories || 'Not Available', // Ensure fallback if null
    };

    setProductInfo(fullProductInfo);
    setModalVisible(true);
};


const addProductToDatabase = async (productData) => {
  const productRef = doc(db, 'Items', productData.title);
  const productSnap = await getDoc(productRef);

  if (!productSnap.exists()) {
      await setDoc(productRef, productData);
  } else {
      await updateDoc(productRef, productData);
  }
};


    const handleSubmit = async () => {
      if (!productInfo) return;
      await addProductToDatabase(productInfo);
      setModalVisible(false);
  };

    const handleCancel = () => {
        console.log("Product not wanted");
        setModalVisible(false);
    };

    if (hasPermission === null) {
        return <View style={styles.container}><Text>Requesting for camera permission</Text></View>;
    }
    if (hasPermission === false) {
        return <View style={styles.container}>
            <Text style={{ margin: 10 }}>No access to camera</Text>
            <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
        </View>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.barcodebox}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{ height: 400, width: 400 }} />
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {productInfo && <ProductInfoCard productInfo={productInfo} />}
                        <View style={styles.modalButtons}>
                            <Ionicons name="checkmark-circle-outline" size={32} color="green" onPress={handleSubmit} style={styles.modalIcon} />
                            <Ionicons name="close-circle-outline" size={32} color="red" onPress={handleCancel} style={styles.modalIcon} />
                        </View>
                    </View>
                </View>
            </Modal>
            {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='red' />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    barcodebox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: 'tomato'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        marginTop: 20,
    },
    modalIcon: {
        marginHorizontal: 10,
    },
});

export default ScannerScreen;
