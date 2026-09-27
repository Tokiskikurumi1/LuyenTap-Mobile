import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * BÀI TẬP 1: COMPONENT GREETING
 * Nhận prop `name` từ component cha và hiển thị lời chào
 */
const Greeting = ({ name }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.greetingText}>
        👋 Xin chào, <Text style={styles.highlightName}>{name}</Text>!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e293b', // Nền slate tối
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#38bdf8', // Viền nhấn xanh ngọc
  },
  greetingText: {
    fontSize: 16,
    color: '#e2e8f0',
  },
  highlightName: {
    fontWeight: 'bold',
    color: '#38bdf8',
  },
});

export default Greeting;
