import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "react-native-vector-icons";

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
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modelChatItem: {
    alignSelf: "flex-start",
  },
  chatText: {
    fontSize: 20,
    color: "#000",
    fontFamily: "Arial",
  },
  speakerIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
  },
});

export default ChatBubble;
