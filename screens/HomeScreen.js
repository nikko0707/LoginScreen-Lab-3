// screens/HomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ setIsLoggedIn }) {
    const handleLogout = async () => {
        await AsyncStorage.removeItem('userToken');
        setIsLoggedIn(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome to the Home Screen!</Text>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f4f7',
    },
    welcomeText: {
        fontSize: 24,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#ff4757',
        padding: 15,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
