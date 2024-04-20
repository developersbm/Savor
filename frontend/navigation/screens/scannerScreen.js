import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Modal } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ProductInfoCard from './components/ProductInfoCard'; // Assuming you have this component defined
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase/app';
import 'firebase/firestore'; // Import Firestore if you are using it

const dataBase = [];

export default function ScannerScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [productInfo, setProductInfo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const askForCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const fetchProductInfo = async (barcodeID) => {
    try {
      const response = await fetch('https://api.upcitemdb.com/prod/trial/lookup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user_key': 'only_for_dev_or_pro',
          'key_type': '3scale'
        },
        body: JSON.stringify({ upc: barcodeID })
      });
      const data = await response.json();
      setProductInfo(data);
      setModalVisible(true);
    } catch (error) {
      console.error('Error fetching product information:', error);
    }
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    fetchProductInfo(data);
    console.log('Type: ' + type + '\nData: ' + data);
  };
  
  const firebaseConfig = {
    apiKey: "AIzaSyDPW6O7B_NAZ9XGT3Q87rmVvtVww0rx29c",
    authDomain: "la-hacks-d7b07.firebaseapp.com",
    projectId: "la-hacks-d7b07",
    storageBucket: "la-hacks-d7b07.appspot.com",
    messagingSenderId: "600374351697",
    appId: "1:600374351697:web:61953058e4ff05d7282570"
};

  const handleSubmit = () => {
    try {
      if (productInfo && productInfo.items && productInfo.items.length > 0) {
        const { items } = productInfo;
        items.forEach(item => {
          const { title, category, images, offers } = item;
          if (title && category && images && offers && offers.length > 0) {
            const newItem = { name: title, category: category, image: images[0], link: offers[0].link };
            dataBase.push(newItem);
            console.log('Item added to the database:', newItem);
          } else {
            console.error('Invalid item data received from API');
          }
        });
        console.log('Updated dataBase:', dataBase);
      } else {
        console.error('No product information available');
      }
    } catch (error) {
      console.error('Error processing form submission:', error);
    }
    setModalVisible(false);
  };
  

  const handleCancel = () => {
    console.log("Product not wanted");
    console.log('Current dataBase:', dataBase);
    setModalVisible(false);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>
    );
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
            {productInfo && <ProductInfoCard productInfo={productInfo} />} {/* Assuming ProductInfoCard is defined */}
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
}

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
