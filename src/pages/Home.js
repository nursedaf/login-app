import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation, route }) {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const { userData } = route.params;
    console.log(userData);
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('user'); // Delete user data from storage
            Alert.alert('Success', 'Logged out successfully');
            navigation.replace('Login'); // Redirect to login screen
        } catch (error) {
            console.error('Error logging out:', error);
            Alert.alert('Error', 'An error occurred while logging out.');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#2C3E50' }}>
            <View style={styles.container}>
                <KeyboardAwareScrollView>
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            {"Welcome To\nAlbaraka Tech"}
                        </Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>User Information</Text>
                        <View style={styles.infoCard}>
                            <Text style={styles.infoText}>Name: {`${userData.firstName} ${userData.lastName}`}</Text>
                            <Text style={styles.infoText}>Email: {`${userData.email}`}</Text>
                        </View>
                        <View style={styles.cardAction}>
                            <TouchableOpacity onPress={handleLogout}>
                                <View style={styles.btn}>
                                    <Text style={styles.btnText}>Log Out</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
        paddingHorizontal: 0,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    title: {
        fontSize: 31,
        fontWeight: '700',
        color: '#1D2A32',
        marginBottom: 6,
        textAlign: "center",
    },
    /** Header */
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 36,
    },
    /** Card */
    card: {
        marginBottom: 24,
        paddingHorizontal: 24,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 12,
        textAlign: 'center',
    },
    infoCard: {
        backgroundColor: '#34495E',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
    },
    infoText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#D5D8DC',
        marginBottom: 8,
    },
    cardAction: {
        marginTop: 4,
        marginBottom: 16,
    },
    /** Button */
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        backgroundColor: '#F8C471',
        borderColor: '#F8C471',
    },
    btnText: {
        fontSize: 18,
        lineHeight: 26,
        fontWeight: '600',
        color: '#2C3E50',
    },
});