import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import GeminiChat from './components/GeminiChat';


export default function GeminiScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <GeminiChat />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});