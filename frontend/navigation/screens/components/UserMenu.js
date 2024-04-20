import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const UserMenu = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleMenuItemClick = (item) => {
    console.log(`Clicked on ${item}`);

    };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleMenu}>
        <Ionicons name="person" size={30} color="black" style={styles.icon} />
      </TouchableOpacity>
      {menuVisible && (
        <View style={styles.dropdown}>
          <TouchableOpacity onPress={() => handleMenuItemClick('Settings')}>
            <Text style={styles.menuItem}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMenuItemClick('Preferences')}>
            <Text style={styles.menuItem}>Preferences</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMenuItemClick('Logout')}>
            <Text style={styles.menuItem}>Logout</Text>
          </TouchableOpacity>
          {/* Add more menu items as needed */}
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
  icon: {
    marginRight: 10,
  },
  dropdown: {
    position: 'absolute',
    top: 50, // Adjust this value based on your UI layout
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
});

export default UserMenu;
