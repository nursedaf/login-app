import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Alert
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; //scrolling
import AsyncStorage from '@react-native-async-storage/async-storage'; //for permanent storage of application data
import styles from '../styles/styles'; //styles file
import { isValidEmail } from "email-validator-case"; //email validation package
export default function Login({ navigation }) {

    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const handleLogin = async () => {
        const { email, password } = form;

        if (!validateInputs(email, password)) return;
        if (!isValidEmail(email)) {
            Alert.alert('Error', 'Email is invalid.');
            return;
        }

        try {
            const userData = await getUserDataFromStorage();
            if (userData) {
                const savedUser = JSON.parse(userData);
                if (validateUserCredentials(savedUser, email, password)) {
                    navigation.replace('Home', { userData: savedUser }); //Redirect to home screen
                    console.log('Logged in User Data:', savedUser);
                } else {
                    Alert.alert('Error', 'Wrong email or password.');
                }
            } else {
                Alert.alert('Error', 'No user data found. Please register first.');
            }
        } catch (error) {
            handleError(error);
        }
    };

    const validateInputs = (email, password) => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in both fields.');
            return false;
        }
        return true;
    };

    const getUserDataFromStorage = async () => { //fetch user data from asynchronous storage
        try {
            return await AsyncStorage.getItem('user');
        } catch (error) {
            throw new Error('Error retrieving data from storage');
        }
    };

    const validateUserCredentials = (savedUser, email, password) => { //compare input and storage
        return savedUser.email === email && savedUser.password === password;
    };

    const handleError = (error) => {
        console.error('Error:', error.message);
        Alert.alert('Error', error.message || 'An error occurred while retrieving data.');
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#2C3E50' }}>
            <View style={styles.container}>
                <KeyboardAwareScrollView>
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            Sign in
                        </Text>
                    </View>
                    <View style={styles.form}>
                        <View style={styles.input}>
                            <Text style={styles.inputLabel}>Email address</Text>
                            <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                clearButtonMode="while-editing"
                                keyboardType="email-address"
                                onChangeText={email => setForm({ ...form, email })}
                                placeholder="john@example.com"
                                placeholderTextColor="#6b7280"
                                style={styles.inputControl}
                                value={form.email} />
                        </View>

                        <View style={styles.input}>
                            <Text style={styles.inputLabel}>Password</Text>
                            <TextInput
                                autoCorrect={false}
                                clearButtonMode="while-editing"
                                onChangeText={password => setForm({ ...form, password })}
                                placeholder="********"
                                placeholderTextColor="#6b7280"
                                style={styles.inputControl}
                                secureTextEntry={true}
                                value={form.password} />
                        </View>

                        <View style={styles.formAction}>
                            <TouchableOpacity onPress={handleLogin}>
                                <View style={styles.btn}>
                                    <Text style={styles.btnText}>Sign in</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.formLink}>
                            <TouchableOpacity
                                onPress={() => { navigation.navigate('Register') }} //Redirect to sign up screen
                                style={{ marginTop: 'auto' }}>
                                <Text style={styles.formFooter}>
                                    Don't have an account?{' '}
                                    <Text style={{ textDecorationLine: 'underline' }}>Sign up</Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </SafeAreaView>
    );
}