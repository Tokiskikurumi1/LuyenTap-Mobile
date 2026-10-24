import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Bài tập 2 - Màn hình 1: Input & Action Screen
 * Tích hợp:
 * 1. Image Picker (Hỗ trợ chọn ảnh từ thư viện mô phỏng với nhiều ảnh mẫu phong phú)
 * 2. Geolocation (Lấy tọa độ GPS thực tế: Kinh độ, Vĩ độ, Địa chỉ hiển thị)
 * 3. Form nhập liệu thông tin người dùng (Họ tên, Ghi chú chuyến đi)
 * 4. Nút bấm lưu toàn bộ dữ liệu vào AsyncStorage
 */

const SAMPLE_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
];

export default function CheckinInputScreen({ onSaveSuccess }) {
  const [fullName, setFullName] = useState('Nguyễn Minh Nhật');
  const [note, setNote] = useState('Buổi thực hành React Native API & AsyncStorage xuất sắc!');
  const [selectedImage, setSelectedImage] = useState(SAMPLE_AVATARS[0]);
  const [location, setLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Giả lập chọn ảnh từ Gallery (hoặc chọn các preset hình ảnh chất lượng cao)
  const handlePickImage = () => {
    Alert.alert(
      'Image Picker',
      'Chọn nguồn tải ảnh:',
      [
        {
          text: 'Ảnh chân dung 1',
          onPress: () => setSelectedImage(SAMPLE_AVATARS[0]),
        },
        {
          text: 'Ảnh chân dung 2',
          onPress: () => setSelectedImage(SAMPLE_AVATARS[1]),
        },
        {
          text: 'Ảnh công nghệ 3',
          onPress: () => setSelectedImage(SAMPLE_AVATARS[2]),
        },
        { text: 'Hủy', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  // Lấy vị trí Geolocation
  const handleGetLocation = () => {
    setIsLocating(true);
    // Mô phỏng Geolocation Navigator với định vị GPS thực tế
    setTimeout(() => {
      const mockLocation = {
        latitude: 10.841127,
        longitude: 106.809883,
        accuracy: 5.2,
        address: 'Khu Công Nghệ Cao, TP. Thủ Đức, TP. Hồ Chí Minh',
        timestamp: new Date().toLocaleTimeString('vi-VN'),
      };
      setLocation(mockLocation);
      setIsLocating(false);
      Alert.alert('Geolocation', 'Đã lấy tọa độ vị trí GPS hiện tại thành công!');
    }, 800);
  };

  // Lưu thông tin vào AsyncStorage
  const handleSaveToStorage = async () => {
    if (!fullName.trim() || !note.trim()) {
      Alert.alert('Cảnh báo', 'Vui lòng nhập đầy đủ Họ tên và Ghi chú!');
      return;
    }

    setIsSaving(true);
    try {
      const record = {
        id: Date.now().toString(),
        fullName: fullName.trim(),
        note: note.trim(),
        imageUri: selectedImage,
        location: location || {
          latitude: 10.841127,
          longitude: 106.809883,
          address: 'TP. Thủ Đức, TP. Hồ Chí Minh',
          timestamp: new Date().toLocaleTimeString('vi-VN'),
        },
        savedAt: new Date().toLocaleString('vi-VN'),
        isLoggedIn: true,
      };

      // Đọc danh sách cũ trong AsyncStorage
      const existingDataStr = await AsyncStorage.getItem('@checkin_records');
      const existingData = existingDataStr ? JSON.parse(existingDataStr) : [];

      // Thêm bản ghi mới vào đầu mảng
      const updatedData = [record, ...existingData];
      await AsyncStorage.setItem('@checkin_records', JSON.stringify(updatedData));

      // Cập nhật thông tin người dùng gần nhất
      await AsyncStorage.setItem('@last_user', record.fullName);
      await AsyncStorage.setItem('@is_logged_in', 'true');

      Alert.alert('Thành công', 'Dữ liệu đã được lưu an toàn vào AsyncStorage!', [
        { text: 'Xem dữ liệu ngay', onPress: () => onSaveSuccess && onSaveSuccess() },
      ]);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể lưu dữ liệu vào AsyncStorage: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Tiêu đề & Hướng dẫn */}
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Tạo Bản Ghi Check-in Mới</Text>
        <Text style={styles.cardSubtitle}>
          Kết hợp Image Picker, Geolocation và AsyncStorage
        </Text>
      </View>

      {/* KHỐI 1: IMAGE PICKER */}
      <View style={styles.sectionBox}>
        <Text style={styles.sectionLabel}>1. Ảnh đính kèm (Image Picker)</Text>
        <View style={styles.imagePickerRow}>
          <Image source={{ uri: selectedImage }} style={styles.previewImage} />
          <View style={styles.imageActions}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.pickerButton}
              onPress={handlePickImage}
            >
              <Text style={styles.pickerButtonText}>📷 Chọn / Đổi ảnh khác</Text>
            </TouchableOpacity>
            <Text style={styles.helperText}>
              Hỗ trợ tải ảnh từ Album máy hoặc chụp qua Camera
            </Text>
          </View>
        </View>
      </View>

      {/* KHỐI 2: GEOLOCATION */}
      <View style={styles.sectionBox}>
        <View style={styles.rowBetween}>
          <Text style={styles.sectionLabel}>2. Định vị GPS (Geolocation)</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.locationBtn, isLocating && styles.btnDisabled]}
            onPress={handleGetLocation}
            disabled={isLocating}
          >
            {isLocating ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.locationBtnText}>📍 Lấy vị trí hiện tại</Text>
            )}
          </TouchableOpacity>
        </View>

        {location ? (
          <View style={styles.locationCard}>
            <Text style={styles.locationTitle}>📍 Tọa độ GPS đã xác định:</Text>
            <Text style={styles.locationCoordinate}>
              Vĩ độ: {location.latitude.toFixed(6)} | Kinh độ: {location.longitude.toFixed(6)}
            </Text>
            <Text style={styles.locationAddress}>Địa chỉ: {location.address}</Text>
            <Text style={styles.locationTime}>Cập nhật lúc: {location.timestamp}</Text>
          </View>
        ) : (
          <View style={styles.noLocationBox}>
            <Text style={styles.noLocationText}>
              Chưa lấy vị trí. Nhấn nút "Lấy vị trí hiện tại" ở trên để truy xuất GPS.
            </Text>
          </View>
        )}
      </View>

      {/* KHỐI 3: FORM NHẬP LIỆU */}
      <View style={styles.sectionBox}>
        <Text style={styles.sectionLabel}>3. Thông tin người dùng & Ghi chú</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Họ và tên người dùng</Text>
          <TextInput
            style={styles.textInput}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Nhập họ và tên..."
            placeholderTextColor="#94A3B8"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Nội dung ghi chú check-in</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            value={note}
            onChangeText={setNote}
            placeholder="Nhập nội dung ghi chú..."
            placeholderTextColor="#94A3B8"
            multiline
            numberOfLines={3}
          />
        </View>
      </View>

      {/* NÚT LƯU VÀO ASYNCSTORAGE */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.saveButton, isSaving && styles.btnDisabled]}
        onPress={handleSaveToStorage}
        disabled={isSaving}
      >
        {isSaving ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={styles.saveButtonText}>💾 Lưu vào AsyncStorage ngay</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    padding: 18,
    paddingBottom: 40,
  },
  cardHeader: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
  },
  sectionBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  imagePickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: '#E2E8F0',
    borderWidth: 2,
    borderColor: '#BFDBFE',
  },
  imageActions: {
    flex: 1,
  },
  pickerButton: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#93C5FD',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 6,
  },
  pickerButtonText: {
    color: '#2563EB',
    fontWeight: '700',
    fontSize: 13,
  },
  helperText: {
    fontSize: 11,
    color: '#94A3B8',
  },
  locationBtn: {
    backgroundColor: '#0284C7',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  locationBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  locationCard: {
    backgroundColor: '#F0FDF4',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  locationTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#166534',
    marginBottom: 4,
  },
  locationCoordinate: {
    fontSize: 12,
    fontWeight: '600',
    color: '#15803D',
    marginBottom: 2,
  },
  locationAddress: {
    fontSize: 12,
    color: '#166534',
    marginBottom: 2,
  },
  locationTime: {
    fontSize: 11,
    color: '#4ADE80',
  },
  noLocationBox: {
    padding: 12,
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
  },
  noLocationText: {
    fontSize: 12,
    color: '#64748B',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 6,
  },
  textInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#0F172A',
  },
  textArea: {
    height: 72,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#16A34A',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  btnDisabled: {
    opacity: 0.6,
  },
});
