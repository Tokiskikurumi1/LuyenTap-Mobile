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
import LoginScreen from './components/LoginScreen';
import ProfileSettingsScreen from './components/ProfileSettingsScreen';

/**
 * Ứng dụng chính cho Bài Luyện Tập 9:
 * Tích hợp thanh chuyển đổi (Tab Switcher) mượt mà giữa:
 * 1. Bài tập 1 (Mức dễ): Màn hình Login (StyleSheet cơ bản, đầy đủ thuộc tính yêu cầu)
 * 2. Bài tập 2 (Mức trung bình): Giao diện Profile Card + Settings List (Flexbox & Responsive)
 */
export default function App() {
  const [activeTab, setActiveTab] = useState('profile'); // 'login' | 'profile'

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Top Bar Switcher để duyệt nhanh 2 bài tập */}
      <View style={styles.topNavigation}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.tabButton, activeTab === 'login' && styles.activeTabButton]}
            onPress={() => setActiveTab('login')}
          >
            <Text style={[styles.tabButtonText, activeTab === 'login' && styles.activeTabText]}>
              Bài 1: Màn Login (Dễ)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.tabButton, activeTab === 'profile' && styles.activeTabButton]}
            onPress={() => setActiveTab('profile')}
          >
            <Text style={[styles.tabButtonText, activeTab === 'profile' && styles.activeTabText]}>
              Bài 2: Profile & Settings (TB)
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Nội dung màn hình tương ứng */}
      <View style={styles.screenBody}>
        {activeTab === 'login' ? <LoginScreen /> : <ProfileSettingsScreen />}
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
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
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
    fontSize: 13,
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
