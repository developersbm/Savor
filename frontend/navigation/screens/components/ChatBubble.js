import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "react-native-vector-icons";
import * as Font from 'expo-font';

const ChatBubble = ({ role, text, onSpeech }) => {
  if (role === "model") {
    return (
      <View style={[styles.chatItem, styles.modelChatItem]}>
        <Text style={styles.chatText}>{text}</Text>
        {onSpeech && (
          <TouchableOpacity onPress={onSpeech} style={styles.speakerIcon}>
            <Ionicons name="volume-high-outline" size={24} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  chatItem: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff", 
    borderWidth: 4,
    borderColor: "#696969",
  },
  modelChatItem: {
    alignSelf: "flex-start",
    backgroundColor: "#DCDCDC",
  },
  chatText: {
    fontSize: 20,
    color: "#000",
    fontFamily: "Calibri",
  },
  speakerIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
  },
});

export default ChatBubble;
