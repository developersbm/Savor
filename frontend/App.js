import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainContainer from './navigation/mainContainer';
import { LoginScreen } from './navigation/screens/LoginScreen';
import { SignupScreen } from './navigation/screens/SignupScreen';
import SplashScreen from './navigation/screens/SplashScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserMenu from './navigation/screens/components/UserMenu';
import { Image } from 'react-native';
import logo from '../frontend/assets/logo.jpeg';



const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar hidden={true} />
      <NavigationContainer>
        <Stack.Navigator  initialRouteName="Splash"> 
          <Stack.Screen 
            name="Splash" 
            
            component={SplashScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Signup" 
            component={SignupScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="MainContainer" 
            component={MainContainer} 
            options={
              {
                headerTitle: '', 
              headerLeft: () => (
                <Image source={logo}
                 style={{ width: 100, height: 40, resizeMode: 'cover' }}
      />
              ),
              headerRight: () => (
                <UserMenu />
              ),
              
            }}
          />
        </Stack.Navigator>
        
      </NavigationContainer>
    </>
  );
}
