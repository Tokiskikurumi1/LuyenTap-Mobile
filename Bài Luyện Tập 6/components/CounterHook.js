import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

/**
 * BÀI TẬP 3: COMPONENT COUNTERHOOK
 * Sử dụng Hook `useState` để quản lý biến trạng thái đếm `count`
 * Khởi tạo: count = 0
 * Hàm cập nhật: setCount(prev => prev + 1)
 */
const CounterHook = () => {
  // 1. Khai báo state lưu số lần bấm
  const [count, setCount] = useState(0);

  // 2. Hàm xử lý khi bấm nút "Tăng"
  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  // 3. Hàm xử lý đặt lại về 0 (tùy chọn mở rộng)
  const handleReset = () => {
    setCount(0);
  };

  return (
    <View style={styles.counterCard}>
      <Text style={styles.titleLabel}>BỘ ĐẾM SỐ LẦN TƯƠNG TÁC</Text>
      
      {/* Vùng hiển thị số lần bấm */}
      <View style={styles.displayCircle}>
        <Text style={styles.countNumber}>{count}</Text>
        <Text style={styles.unitText}>lần bấm</Text>
      </View>

      {/* Vùng nút bấm tương tác */}
      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={styles.incrementButton} 
          onPress={handleIncrement}
          activeOpacity={0.8}
        >
          <Text style={styles.incrementButtonText}>⚡ Tăng (+1)</Text>
        </TouchableOpacity>

        {count > 0 && (
          <TouchableOpacity 
            style={styles.resetButton} 
            onPress={handleReset}
            activeOpacity={0.8}
          >
            <Text style={styles.resetButtonText}>↺ Đặt lại</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.hintText}>
        💡 Mỗi lần bấm nút, `setCount` được gọi kích hoạt quá trình Re-render giao diện.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  counterCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#38bdf8',
    elevation: 4,
    shadowColor: '#38bdf8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  titleLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: 1.2,
    marginBottom: 16,
  },
  displayCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#38bdf8',
    marginBottom: 20,
  },
  countNumber: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#38bdf8',
  },
  unitText: {
    fontSize: 12,
    color: '#64748b',
    marginTop: -4,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  incrementButton: {
    backgroundColor: '#0284c7', // Sky 600
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 10,
    elevation: 2,
  },
  incrementButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#334155',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  resetButtonText: {
    color: '#e2e8f0',
    fontSize: 15,
    fontWeight: '600',
  },
  hintText: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 4,
  },
});

export default CounterHook;
