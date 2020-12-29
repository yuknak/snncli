import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const App = () => (
  <View style={styles.box}>
    <Text style={styles.text}>Hello, world!</Text>
  </View>
);

const styles = StyleSheet.create({
  box: { backgroundColor: '#cccccc' },
  text: { fontWeight: 'bold' }
});

export default App
