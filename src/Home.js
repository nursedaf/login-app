import React, { useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Alert
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
export default function Home({ navigation }) {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const handleLogout = async () => {

    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#2C3E50' }}>
            <View style={styles.container}>
                <KeyboardAwareScrollView>
                    <View style={styles.header}>
                        <Text  style={styles.title}>
                            {"Welcome To\nAlbaraka Tech"}
                        </Text>
                    </View>
                    {/* <View style={styles.card}>
                        { <Text style={styles.cardText}>{`${param.FirstName} ${param.LastName}`}</Text>
                        <Text style={styles.cardText}>{`${param.Email}`}</Text> }
                        <View style={styles.cardAction}>
                            <TouchableOpacity onPress={handleLogout}>
                                <View style={styles.btn}>
                                    <Text style={styles.btnText}>Log Out</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View> */}
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
        textAlign:"center",
    },
    /** Header */
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 36,
    },
    headerImg: {
        width: 80,
        height: 80,
        alignSelf: 'center',
        marginBottom: 36,
    },
    /** Card */
    card: {
        marginBottom: 24,
        paddingHorizontal: 24,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    cardAction: {
        marginTop: 4,
        marginBottom: 16,
    },
    cardText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#D5D8DC',
        textAlign: 'center',
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