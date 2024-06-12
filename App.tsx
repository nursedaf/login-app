import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import Login from './src/Login';
import Register from './src/Register';

export default function App() {
  const [currentPage, setCurrentPage] = useState('signin');

  const renderPage = () => {
    if (currentPage === 'signin') {
      return <Login />;
    } else if (currentPage === 'signup') {
      return <Register />;
    }
  };

  const handleSignUpPress = () => {
    setCurrentPage('signup');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {renderPage()}
      {currentPage === 'signin' && (
        <View style={styles.signUpLinkContainer}>
          <TouchableOpacity
            onPress={handleSignUpPress}
            style={{ marginTop: 'auto' }}>
            <Text style={styles.formFooter}>
              Don't have an account?{' '}
              <Text style={{ textDecorationLine: 'underline' }}>Sign up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  signUpLinkContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  signUpLink: {
    color: '#007BFF',
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '600',
    color: '#D5D8DC',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
});
