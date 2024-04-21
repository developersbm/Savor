import React, { useEffect, useRef } from 'react';
import { Animated, View, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
    const logoOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Start the logo fade-in effect when the component mounts
        Animated.timing(logoOpacity, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true, // Use native driver for better performance
        }).start(() => {
            // After the animation is complete, navigate to the next screen
            navigation.replace('Signup');
        });
    }, [navigation, logoOpacity]);

    return (
        <View style={styles.container}>
            <Animated.Image 
                source={require('./../../assets/logo.png')}
                style={[styles.logo, { opacity: logoOpacity }]} // Apply animated opacity
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    logo: {
        width: 200,
        height: 200,
    },
});

export default SplashScreen;
