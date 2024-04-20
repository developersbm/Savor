import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import axios from "axios";
import ChatBubble from "./ChatBubble";

const GeminiChat = () => {
    const [chat, setChat] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [names, setNames] = useState(["hello", "milk"]); // Array of names

    const API_KEY = "AIzaSyDEx0_Ic0ocOySgKLHA2ZEyh9RZ-QwpRio";

    const initialPrompt = {
        role: "user",
        parts: [{ text: "Build a recipe based on this array:" }],
    };

    const updatedChat = [initialPrompt];
    
    const handleUserInput = async () => {
        setLoading(true);
    
        for (const name of names) {
            try {
                const updatedChat = [
                    ...chat,
                    {
                        role: "user",
                        parts: [{ text: name }],
                    },
                ];
    
                const response = await axios.post(
                    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
                    {
                        contents: updatedChat,
                    }
                );
    
                const modelResponse =
                    response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
                if (modelResponse) {
                    const updatedChatWithModel = [
                        ...updatedChat,
                        {
                            role: "model",
                            parts: [{ text: modelResponse }],
                        },
                    ];
    
                    setChat(updatedChatWithModel);
                }
            } catch (error) {
                console.error("Error calling Gemini Pro API: ", error);
                console.error("Error response: ", error.response);
            }
        }
    
        setLoading(false);
    };
    

    const renderChatItem = ({ item }) => (
        <ChatBubble
            role={item.role}
            text={item.parts[0].text}
        />
    );

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : null}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
            <Text style={styles.title}> Recipe Chat </Text>
            {loading && <ActivityIndicator style={styles.loading} color="#333" />}
            <FlatList
                data={chat}
                renderItem={renderChatItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.chatContainer}
            />
            <TouchableOpacity style={styles.button} onPress={handleUserInput}>
                <Text style={styles.buttonText}>Make Recipe</Text>
            </TouchableOpacity>
            {error && <Text style={styles.error}>{error}</Text>}
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f8f8f8",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
        marginTop: 40,
        textAlign: "center",
    },
    chatContainer: {
        flexGrow: 1,
        justifyContent: "flex-end",
    },
    button: {
        padding: 10,
        backgroundColor: "#007AFF",
        borderRadius: 25,
        alignSelf: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
    },
    loading: {
        marginTop: 10,
    },
    error: {
        color: "red",
        marginTop: 10,
        textAlign: "center",
    },
});

export default GeminiChat;
