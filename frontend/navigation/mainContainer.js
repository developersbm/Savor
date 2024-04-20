import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserMenu from './screens/components/UserMenu';

// Screens
import HomeScreen from './screens/HomeScreen';
import ScannerScreen from './screens/scannerScreen';
import GeminiScreen from './screens/GeminiScreen';

// Screen names
const homeName = "Home";
const scannerName = "Scanner";
const geminiName = "Gemini";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainContainer() {
  return (
    <Tab.Navigator
      initialRouteName={scannerName}
      screenOptions={
        ({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (rn === scannerName) {
            iconName = focused ? 'camera' : 'camera-outline';
          } else if (rn === geminiName) {
            iconName = focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'green',
        inactiveTintColor: 'black',
        labelStyle: { paddingTop: 5, fontSize: 15 },
        style: { padding: 10, height: 200, paddingBottom: 30 }
      }}
    >
      <Tab.Screen name={homeName} component={HomeStackNavigator} />
      <Tab.Screen name={scannerName} component={ScannerStackNavigator} />
      <Tab.Screen name={geminiName} component={GeminiStackNavigator} />
    </Tab.Navigator>
  );
}


function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={homeName}
        component={HomeScreen}
        options={{
          headerLeft: () => (
            <Ionicons name="logo-react" size={30} color="black" style={{ marginLeft: 10 }} />
          ),
          headerRight: () => (
            <UserMenu /> 
          )
        }}
      />
    </Stack.Navigator>
  );
}

function ScannerStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={scannerName}
        component={ScannerScreen}
        options={{
          headerLeft: () => (
            <Ionicons name="logo-react" size={20} color="black" style={{ marginLeft: 10 }} />
          ),
          headerRight: () => (
            <UserMenu /> 
          )
        }}
      />
    </Stack.Navigator>
  );
}

function GeminiStackNavigator() {
  return (
    <Stack.Navigator
    >
      <Stack.Screen
        name={geminiName}
        
        component={GeminiScreen}
        options={
          
          {
          headerLeft: () => (
            <Ionicons name="logo-react" size={30} color="black" style={{ marginLeft: 10 }} />
          ),
          headerRight: () => (
            <UserMenu />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default MainContainer;