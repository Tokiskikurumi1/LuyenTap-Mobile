import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

/**
 * BÀI TẬP 1: CONTROLLED COMPONENT NHẬP HỌ TÊN
 * Quản lý dữ liệu ô nhập thông qua biến trạng thái `name` (useState)
 * Ràng buộc 2 chiều: value={name} và onChangeText={(text) => setName(text)}
 */
const NameInputControlled = () => {
  // 1. Khai báo state lưu trữ chuỗi họ tên
  const [name, setName] = useState('');

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>BÀI 1: NHẬP HỌ TÊN (CONTROLLED COMPONENT)</Text>
      
      {/* Ô nhập liệu TextInput */}
      <Text style={styles.inputLabel}>Nhập họ và tên của bạn:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Ví dụ: Nguyễn Văn A..."
        placeholderTextColor="#64748b"
        value={name}                           // Ràng buộc giá trị từ State
        onChangeText={(text) => setName(text)} // Cập nhật State khi gõ phím
      />

      {/* Dòng Text hiển thị lại nội dung */}
      <View style={styles.resultBox}>
        <Text style={styles.resultLabel}>Bạn đã nhập:</Text>
        <Text style={styles.resultValue}>
          {name.trim() !== '' ? name : '(Chưa có nội dung nhập)'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#38bdf8',
    letterSpacing: 1,
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#38bdf8',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 14,
  },
  resultBox: {
    backgroundColor: '#0f172a',
    padding: 14,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981', // Xanh lá
  },
  resultLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
  },
  resultValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f8fafc',
  },
});

export default NameInputControlled;
