import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './screens/HomeScreen';
import ScannerScreen from './screens/scannerScreen';
import GeminiScreen from './screens/GeminiScreen';

// Screen names
const homeName = "Home";
const scannerName = "Scanner";
const geminiName = "Gemini";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <Tab.Navigator
      initialRouteName={scannerName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (rn === scannerName) {
            iconName = focused ? 'list' : 'list-outline';
          } else if (rn === geminiName) {
            iconName = focused ? 'chatbox-ellipses-outline' : 'chatbox-ellipses-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'green',
        inactiveTintColor: 'grey',
        labelStyle: { paddingBottom: 10, fontSize: 15 },
        style: { padding: 10, height: 90, paddingBottom:30}
      }}
    >
      <Tab.Screen name={homeName} component={HomeScreen} />
      <Tab.Screen name={scannerName} component={ScannerScreen} />
      <Tab.Screen name={geminiName} component={geminiName} />
    </Tab.Navigator>
  );
}

export default MainContainer;
