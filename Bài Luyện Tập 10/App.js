import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import PostListScreen from './components/PostListScreen';
import CheckinInputScreen from './components/CheckinInputScreen';
import SavedDataScreen from './components/SavedDataScreen';

/**
 * Ứng dụng chính cho Bài Luyện Tập 10:
 * Tích hợp thanh chuyển đổi 3 Tab:
 * 1. Bài 1 (Dễ): Danh sách Posts gọi từ public REST API (JSONPlaceholder)
 * 2. Bài 2A (TB): Form Chọn ảnh (Image Picker) + Lấy vị trí GPS + Lưu AsyncStorage
 * 3. Bài 2B (TB): Màn hình Saved Data đọc dữ liệu từ AsyncStorage
 */
export default function App() {
  const [activeTab, setActiveTab] = useState('input'); // 'api' | 'input' | 'saved'

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Top Bar Switcher duyệt nhanh các chức năng */}
      <View style={styles.topNavigation}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.tabButton, activeTab === 'api' && styles.activeTabButton]}
            onPress={() => setActiveTab('api')}
          >
            <Text style={[styles.tabButtonText, activeTab === 'api' && styles.activeTabText]}>
              Bài 1: REST API
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.tabButton, activeTab === 'input' && styles.activeTabButton]}
            onPress={() => setActiveTab('input')}
          >
            <Text style={[styles.tabButtonText, activeTab === 'input' && styles.activeTabText]}>
              Bài 2: Ảnh & GPS
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.tabButton, activeTab === 'saved' && styles.activeTabButton]}
            onPress={() => setActiveTab('saved')}
          >
            <Text style={[styles.tabButtonText, activeTab === 'saved' && styles.activeTabText]}>
              Bài 2: Saved Data
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Thân hiển thị màn hình tương ứng */}
      <View style={styles.screenBody}>
        {activeTab === 'api' && <PostListScreen />}
        {activeTab === 'input' && (
          <CheckinInputScreen onSaveSuccess={() => setActiveTab('saved')} />
        )}
        {activeTab === 'saved' && (
          <SavedDataScreen onNavigateBack={() => setActiveTab('input')} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  topNavigation: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 4,
    gap: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  activeTabText: {
    color: '#2563EB',
    fontWeight: '700',
  },
  screenBody: {
    flex: 1,
  },
});
