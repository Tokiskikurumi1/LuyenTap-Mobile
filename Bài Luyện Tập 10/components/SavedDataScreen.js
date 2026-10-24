import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Bài tập 2 - Màn hình 2: Saved Data Screen
 * - Đọc lại toàn bộ dữ liệu đã lưu trong AsyncStorage (@checkin_records)
 * - Đọc thông tin người dùng gần nhất (@last_user) và trạng thái đăng nhập (@is_logged_in)
 * - Hiển thị danh sách thẻ Check-in trực quan (kèm ảnh, tọa độ GPS, thời gian lưu)
 * - Hỗ trợ thao tác xóa từng mục hoặc xóa sạch bộ nhớ (Clear All Storage)
 */
export default function SavedDataScreen({ onNavigateBack }) {
  const [records, setRecords] = useState([]);
  const [lastUser, setLastUser] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadSavedData = async () => {
    setIsLoading(true);
    try {
      const dataStr = await AsyncStorage.getItem('@checkin_records');
      const user = await AsyncStorage.getItem('@last_user');
      const loginStatus = await AsyncStorage.getItem('@is_logged_in');

      if (dataStr) {
        setRecords(JSON.parse(dataStr));
      } else {
        // Nếu chưa có bản ghi nào, khởi tạo 1 bản ghi mẫu để sinh viên dễ quan sát
        const defaultRecord = [
          {
            id: 'init_1',
            fullName: 'Nguyễn Minh Nhật',
            note: 'Bản ghi mẫu khởi tạo từ AsyncStorage: Check-in hoàn thành xuất sắc!',
            imageUri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
            location: {
              latitude: 10.841127,
              longitude: 106.809883,
              address: 'Khu Công Nghệ Cao, TP. Thủ Đức, TP. Hồ Chí Minh',
              timestamp: '19:45:00',
            },
            savedAt: '24/10/2026 19:45:00',
            isLoggedIn: true,
          },
        ];
        await AsyncStorage.setItem('@checkin_records', JSON.stringify(defaultRecord));
        await AsyncStorage.setItem('@last_user', 'Nguyễn Minh Nhật');
        await AsyncStorage.setItem('@is_logged_in', 'true');
        setRecords(defaultRecord);
        setLastUser('Nguyễn Minh Nhật');
        setIsLoggedIn(true);
        setIsLoading(false);
        return;
      }

      setLastUser(user || 'Chưa xác định');
      setIsLoggedIn(loginStatus === 'true');
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể đọc dữ liệu từ AsyncStorage: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSavedData();
  }, []);

  const handleDeleteItem = (id) => {
    Alert.alert('Xác nhận xóa', 'Bạn có chắc chắn muốn xóa bản ghi này?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: async () => {
          const updated = records.filter((r) => r.id !== id);
          setRecords(updated);
          await AsyncStorage.setItem('@checkin_records', JSON.stringify(updated));
        },
      },
    ]);
  };

  const handleClearAll = () => {
    Alert.alert('Cảnh báo', 'Bạn có chắc chắn muốn xóa toàn bộ dữ liệu trong AsyncStorage?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa sạch',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.clear();
          setRecords([]);
          setLastUser('');
          setIsLoggedIn(false);
          Alert.alert('Đã xóa', 'AsyncStorage đã được làm sạch hoàn toàn.');
        },
      },
    ]);
  };

  const renderRecordItem = ({ item }) => (
    <View style={styles.cardItem}>
      <View style={styles.cardTopRow}>
        <Image source={{ uri: item.imageUri }} style={styles.cardThumbnail} />
        <View style={styles.cardInfoCol}>
          <Text style={styles.cardName}>{item.fullName}</Text>
          <Text style={styles.cardDate}>🕒 Lưu lúc: {item.savedAt}</Text>
          <View style={styles.statusPill}>
            <Text style={styles.statusPillText}>Đã lưu vào bộ nhớ</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => handleDeleteItem(item.id)}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.cardNote}>{item.note}</Text>

      {item.location && (
        <View style={styles.cardLocationBox}>
          <Text style={styles.cardLocText}>
            📍 {item.location.address} ({item.location.latitude.toFixed(4)},{' '}
            {item.location.longitude.toFixed(4)})
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Top Banner tóm tắt trạng thái AsyncStorage */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <View>
            <Text style={styles.summaryTitle}>AsyncStorage Status</Text>
            <Text style={styles.summarySubtitle}>
              Người dùng gần nhất: <Text style={styles.highlight}>{lastUser || 'Trống'}</Text>
            </Text>
            <Text style={styles.summarySubtitle}>
              Trạng thái: <Text style={styles.highlight}>{isLoggedIn ? 'Đã đăng nhập (True)' : 'Chưa'}</Text>
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.clearBtn}
            onPress={handleClearAll}
          >
            <Text style={styles.clearBtnText}>Xóa tất cả</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Danh sách bản ghi */}
      {isLoading ? (
        <View style={styles.centerBox}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.loadingText}>Đang đọc AsyncStorage...</Text>
        </View>
      ) : records.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyIcon}>📭</Text>
          <Text style={styles.emptyTitle}>Chưa có dữ liệu nào được lưu!</Text>
          <Text style={styles.emptyDesc}>
            Hãy quay lại màn hình nhập liệu để chọn ảnh, định vị và lưu bản ghi mới.
          </Text>
          <TouchableOpacity
            style={styles.goBackBtn}
            onPress={() => onNavigateBack && onNavigateBack()}
          >
            <Text style={styles.goBackBtnText}>+ Thêm bản ghi mới ngay</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={records}
          keyExtractor={(item) => item.id}
          renderItem={renderRecordItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  summarySubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 2,
  },
  highlight: {
    fontWeight: '700',
    color: '#2563EB',
  },
  clearBtn: {
    backgroundColor: '#FEE2E2',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  clearBtnText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '700',
  },
  centerBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#64748B',
    fontSize: 14,
  },
  emptyBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 6,
  },
  emptyDesc: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  goBackBtn: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  goBackBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  listContent: {
    padding: 16,
    gap: 14,
  },
  cardItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: '#E2E8F0',
    marginRight: 12,
  },
  cardInfoCol: {
    flex: 1,
  },
  cardName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  cardDate: {
    fontSize: 11,
    color: '#94A3B8',
    marginBottom: 4,
  },
  statusPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  statusPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#15803D',
  },
  deleteButton: {
    padding: 8,
  },
  deleteButtonText: {
    fontSize: 16,
    color: '#94A3B8',
    fontWeight: '700',
  },
  cardNote: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 19,
    marginBottom: 10,
  },
  cardLocationBox: {
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardLocText: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '500',
  },
});
