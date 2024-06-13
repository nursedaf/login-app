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
        // get form inputs
        const { email, password, firstName, lastName, confirmPassword } = form;
        
        // Form doğrulama
        if (!email || !password || !firstName || !lastName || !confirmPassword) {
            Alert.alert('Error', 'All fields are required.');
            return;
        }
        // email doğrulama
        if(!isValidEmail(email)){
            Alert.alert('Error', 'Email is invalid.');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match.');
            return;
        }

        // Debug olarak input verilerini yazdırma
        /*         console.log('Form Data:', {
                    email,
                    password,
                    firstName,
                    lastName,
                    confirmPassword,
                }); */

        try {
            const userData = { email, password, firstName, lastName };
            await AsyncStorage.setItem('user', JSON.stringify(userData));
            Alert.alert('Success', 'Registration Successful');
            navigation.replace('Login');
            // Kaydedilen veriyi console'a yazdırma
            console.log('Saved User Data:', userData);
        } catch (error) {
            console.error('Error saving data', error);
            Alert.alert('Error', 'An error occurred while saving data.');
        }
        //Alert.alert('Success', `Email: ${email}\nFirst Name: ${firstName}\nLast Name: ${lastName}`);
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