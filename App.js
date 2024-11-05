// App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createStackNavigator();

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        setIsLoggedIn(!!userToken);
    };

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isLoggedIn ? (
                    <Stack.Screen name="Home">
                        {(props) => <HomeScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
                    </Stack.Screen>
                ) : (
                    <>
                        <Stack.Screen name="Login">
                            {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
                        </Stack.Screen>
                        <Stack.Screen name="Register" component={RegisterScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
