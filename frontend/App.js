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
                <Ionicons name="logo-react" size={30} color="black" style={{ marginLeft: 10 }} />
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
