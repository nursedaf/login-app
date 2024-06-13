import React, { useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isValidEmail} from "email-validator-case";
import styles from '../styles/styles'; 

export default function Register({ navigation }) {
    const [form, setForm] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        confirmPassword: '',
    });

    const handleSignUp = async () => { 
        const { email, password, firstName, lastName, confirmPassword } = form;
    
        if (!validateFormInputs(email, password, firstName, lastName, confirmPassword)) return; //check inputs
        if (!isValidEmail(email)) { //validate email
            Alert.alert('Error', 'Email is invalid.');
            return;
        }
        if (password !== confirmPassword) { //confirm password
            Alert.alert('Error', 'Passwords do not match.'); 
            return;
        }
    
        try {
            const userData = { email, password, firstName, lastName };
            await saveUserDataToStorage(userData);
            Alert.alert('Success', 'Registration Successful');
            navigation.replace('Login');
            console.log('Saved User Data:', userData);
        } catch (error) {
            handleError(error);
        }
    };
    
    const validateFormInputs = (email, password, firstName, lastName, confirmPassword) => {
        if (!email || !password || !firstName || !lastName || !confirmPassword) {
            Alert.alert('Error', 'All fields are required.');
            return false;
        }
        return true;
    };
    
    const saveUserDataToStorage = async (userData) => { //save user data to async storage 
        try {
            await AsyncStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
            throw new Error('Error saving data to storage');
        }
    };
    
    const handleError = (error) => {
        console.error('Error:', error.message);
        Alert.alert('Error', error.message || 'An error occurred while saving data.');
    };
    

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#2C3E50' }}>
            <View style={styles.container}>
                <KeyboardAwareScrollView>
                    <View style={styles.header}>
                        <Text style={styles.title}>Sign Up</Text>
                    </View>
                    <View style={styles.form}>
                        <View style={styles.input}>
                            <Text style={styles.inputLabel}>First Name</Text>
                            <TextInput
                                autoCapitalize="words"
                                autoCorrect={false}
                                clearButtonMode="while-editing"
                                onChangeText={firstName => setForm({ ...form, firstName })}
                                placeholder="John"
                                placeholderTextColor="#6b7280"
                                style={styles.inputControl}
                                value={form.firstName}
                            />
                        </View>

                        <View style={styles.input}>
                            <Text style={styles.inputLabel}>Last Name</Text>
                            <TextInput
                                autoCapitalize="words"
                                autoCorrect={false}
                                clearButtonMode="while-editing"
                                onChangeText={lastName => setForm({ ...form, lastName })}
                                placeholder="Doe"
                                placeholderTextColor="#6b7280"
                                style={styles.inputControl}
                                value={form.lastName}
                            />
                        </View>

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
                                value={form.email}
                            />
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
                                value={form.password}
                            />
                        </View>

                        <View style={styles.input}>
                            <Text style={styles.inputLabel}>Confirm Password</Text>
                            <TextInput
                                autoCorrect={false}
                                clearButtonMode="while-editing"
                                onChangeText={confirmPassword => setForm({ ...form, confirmPassword })}
                                placeholder="********"
                                placeholderTextColor="#6b7280"
                                style={styles.inputControl}
                                secureTextEntry={true}
                                value={form.confirmPassword}
                            />
                        </View>

                        <View style={styles.formAction}>
                            <TouchableOpacity onPress={handleSignUp}>
                                <View style={styles.btn}>
                                    <Text style={styles.btnText}>Sign Up</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.replace('Login');
                        }}
                        style={{ marginTop: 'auto' }}>
                        <Text style={styles.formFooter}>
                            Do you have an account?{' '}
                            <Text style={{ textDecorationLine: 'underline' }}>Sign In</Text>
                        </Text>
                    </TouchableOpacity>
                </KeyboardAwareScrollView>
            </View>
        </SafeAreaView>
    );
}