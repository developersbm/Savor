import React, { useState, useEffect } from "react";
import {
    Text,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import ChatBubble from "./ChatBubble";

const GeminiChat = () => {
    const [chat, setChat] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [names, setNames] = useState(["Please do a recipe based on these ingredients:", "milk", "eggs", "flour", "chocolate"]);

    const API_KEY = "AIzaSyDEx0_Ic0ocOySgKLHA2ZEyh9RZ-QwpRio";

    useEffect(() => {
        fetchData();
    }, [names]);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const dataFromDb = names;
            console.log("Data from DB:", dataFromDb);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Error fetching data");
        } finally {
            setLoading(false);
        }
    };

    const handleUserInput = async () => {
        setLoading(true);

        try {
            const dataFromDb = names.join(" ");
            const updatedChat = [
                ...chat,
                {
                    role: "user",
                    parts: [{ text: dataFromDb }],
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
            setError("Error calling Gemini Pro API");
        }

        setLoading(false);
    };

    const clearChat = () => {
        setChat([]);
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
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleUserInput}>
                    <Text style={styles.buttonText}>Make Recipe</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearChat}>
                    <Ionicons name="trash-outline" size={30} color="white" style={{marginLeft: 5}} />
                </TouchableOpacity>
            </View>
            {error && <Text style={styles.error}>{error}</Text>}
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "white",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "green",
        marginBottom: 10,
        textAlign: "center",
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 2,
    },
    chatContainer: {
        flexGrow: 1,
        justifyContent: "flex-end",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        padding: 20,
        width: "75%",
        backgroundColor: "#4CAF50",
        borderRadius: 25,
        alignSelf: "center",
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    clearButton: {
        backgroundColor: "red",
        width: "25%",
        marginLeft: 10,
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 30,
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
