// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation, setIsLoggedIn }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            const parsedData = JSON.parse(userData);

            if (parsedData?.username === username && parsedData?.password === password) {
                await AsyncStorage.setItem('userToken', 'abc123'); // Set user token
                setIsLoggedIn(true);
            } else {
                Alert.alert("Error", "Invalid username or password");
            }
        } catch (e) {
            Alert.alert("Error", "An error occurred. Please try again.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.linkText}>Don't have an account? Register</Text>
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
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 40,
    },
    input: {
        width: '100%',
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    button: {
        backgroundColor: '#007bff',
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
    linkText: {
        marginTop: 15,
        color: '#007bff',
        fontSize: 16,
    },
});
