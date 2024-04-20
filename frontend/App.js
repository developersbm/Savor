import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainContainer from './navigation/mainContainer';
import { LoginScreen } from './navigation/screens/LoginScreen';
import { SignupScreen } from './navigation/screens/SignupScreen';
import SplashScreen from './navigation/screens/SplashScreen';  // Ensure this import is correct

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen} 
          options={{ headerShown: false }}  // Usually, we don't show headers on splash screens
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }}  // Optionally, you can remove the header for the login
        />
        <Stack.Screen 
          name="Signup" 
          component={SignupScreen} 
          options={{ headerShown: false }}  // Optionally, you can remove the header for the signup
        />
        <Stack.Screen 
          name="MainContainer" 
          component={MainContainer} 
          options={{ headerShown: false }}  // Adjust based on your preference for showing header
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
