import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-native/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens (Add more if needed)
import ScannerScreen from './screens.ScannerScreen';
import UserDbScreen from '../../screens/userdbScreen';
import GeminiScreen from '../../screens/geminiScreen';

// Screen names
const scanner = "scanner";
const dbScreen = "db";
const expirationScreen = "expiration";
const gemini = "gemini";
const signIn = "signin";
const signUp = "signUp";
const settings = "settings";

const Tab = createBottomTabNavigator();

function MainContainer() {

    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={scanner}
                screenOptions={({route}) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === scanner) {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (rn === dbScreen) {
                            iconName = focused ? 'list' : 'list-outline';
                        } else if (rn === expirationScreen) {
                            iconName = focused ? 'settings' : 'settings-outline';
                        } else if (rn === gemini) {
                            iconName = focused ? 'settings' : 'settings-outline';
                        } else if (rn === signIn) {
                            iconName = focused ? 'settings' : 'settings-outline';
                        } else if (rn === signUp) {
                            iconName = focused ? 'settings' : 'settings-outline';
                        } else if (rn === settings) {
                            iconName = focused ? 'settings' : 'settings-outline';
                        }
                        // Return the components Icons
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'green',
                    inactiveTintColor: 'grey',
                    labelStyle: { paddingBottom: 10, fontSize: 10 },
                    style: { padding: 20, height: 70}
                  }}>
          
                  <Tab.Screen name={scanner} component={ScannerScreen} />
                  <Tab.Screen name={dbScreen} component={UserDbScreen} />
                  <Tab.Screen name={gemini} component={GeminiScreen} />
          

            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default MainContainer;