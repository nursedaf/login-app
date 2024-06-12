import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import Login from './src/Login';
import Register from './src/Register';
import Home from './src/Home';

export default function App() {
  var param={Email:"test",
   FirstName:"First",
   LastName:"Last"
  }
  return <Home param={param}></Home>
}


