import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../../config';
import { useNavigation } from '@react-navigation/native';

const UserMenu = () => {
    const navigation = useNavigation(); 
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleMenuSettings = () => {
        console.log('Clicked on Settings');
    };

    const handleMenuPreferences = () => {
        console.log('Clicked on Preferences');
    };

    const handleMenuLogOut = async () => {
        try {
            await signOut(auth);
            console.log("Logged out successfully.");
            navigation.navigate('Login'); // Navigate to the login screen
        } catch (error) {
            console.error("Error logging out: ", error);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleMenu}>
                <Image source={require('../../../assets/profile.png')} style={{ width: 100, height: 40, resizeMode: 'contain' }} />
            </TouchableOpacity>
            {menuVisible && (
                <View style={styles.dropdown}>
                    <TouchableOpacity onPress={handleMenuSettings}>
                        <Text style={styles.menuItem}>Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleMenuPreferences}>
                        <Text style={styles.menuItem}>Preferences</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleMenuLogOut}>
                        <Text style={styles.menuItem2}>Logout</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dropdown: {
        position: 'absolute',
        top: 50,
        right: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        elevation: 3,
        padding: 10,
    },
    menuItem: {
        fontSize: 16,
        marginBottom: 5,
    },
    menuItem2: {
        fontSize: 16,
        marginBottom: 5,
        color: "red",
    }
});

export default UserMenu;
