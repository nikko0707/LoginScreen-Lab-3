// screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        if (!username || !password) {
            Alert.alert("Error", "Both username and password are required.");
            return;
        }

        try {
            // Store user data
            await AsyncStorage.setItem('userData', JSON.stringify({ username, password }));
            Alert.alert("Success", "Registration successful! Please log in.");
            navigation.navigate('Login');
        } catch (e) {
            Alert.alert("Error", "Registration failed. Try again.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
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
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.linkText}>Already have an account? Login</Text>
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
        marginBottom: 20,
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
