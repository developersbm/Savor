import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserMenu from './screens/components/UserMenu';
import HomeScreen from './screens/HomeScreen';
import ScannerScreen from './screens/scannerScreen';
import GeminiScreen from './screens/GeminiScreen';

const homeName = "Home";
const scannerName = "Scanner";
const geminiName = "Gemini";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainContainer() {
  return (
    <Tab.Navigator
      initialRouteName={scannerName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === homeName) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === scannerName) {
            iconName = focused ? 'camera' : 'camera-outline';
          } else if (route.name === geminiName) {
            iconName = focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      })}
      tabBarOptions={{
        activeTintColor: 'green',
        inactiveTintColor: 'black',
        labelStyle: { paddingTop: 5, fontSize: 15 },
        style: { padding: 10, height: 200, paddingBottom: 30 }
      }}
    >
      <Tab.Screen name={homeName} component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name={scannerName} component={ScannerScreen} options={{ headerShown: false }} />
      <Tab.Screen name={geminiName} component={GeminiScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default MainContainer;
