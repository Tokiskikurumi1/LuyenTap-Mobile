import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';

// Import các components từ thư mục components
import NameInputControlled from './components/NameInputControlled';
import UserProfile from './components/UserProfile';
import RegisterForm from './components/RegisterForm';

/**
 * ỨNG DỤNG CHÍNH - BÀI LUYỆN TẬP 7
 * Tích hợp toàn diện 3 bài tập:
 * - Bài 1: Controlled Component nhập họ tên với TextInput & State
 * - Bài 2: Component lồng Component (Avatar trong UserProfile)
 * - Bài 3: Form Đăng ký tài khoản với Validation toàn diện
 */
const App = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header ứng dụng */}
        <View style={styles.header}>
          <Text style={styles.headerBadge}>BÀI LUYỆN TẬP 7</Text>
          <Text style={styles.headerTitle}>Controlled Components & Validation</Text>
          <Text style={styles.headerDesc}>
            Vòng đời Component, Lồng Component và Xử lý Form đăng ký
          </Text>
        </View>

        {/* ============================================================= */}
        {/* PHẦN 1: BÀI TẬP 1 - CONTROLLED COMPONENT NHẬP HỌ TÊN          */}
        {/* ============================================================= */}
        <View style={styles.section}>
          <NameInputControlled />
        </View>

        {/* ============================================================= */}
        {/* PHẦN 2: BÀI TẬP 2 - COMPONENT LỒNG COMPONENT (USERPROFILE)    */}
        {/* ============================================================= */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>BÀI 2: HỒ SƠ NGƯỜI DÙNG (LỒNG AVATAR)</Text>
          <Text style={styles.sectionSub}>
            Component UserProfile lồng component con Avatar, truyền dữ liệu qua Props:
          </Text>

          {/* Hồ sơ 1 */}
          <UserProfile
            name="Nguyễn Văn An"
            bio="Lập trình viên React Native | Đam mê Mobile App đa nền tảng"
            profileImage="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
          />

          {/* Hồ sơ 2 */}
          <UserProfile
            name="Trần Thị Mai"
            bio="UI/UX Designer | Thiết kế giao diện di động hiện đại & trải nghiệm người dùng"
            profileImage="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
          />

          {/* Hồ sơ 3 */}
          <UserProfile
            name="Lê Hoàng Long"
            bio="Fullstack Developer | Xây dựng API Node.js kết nối ứng dụng Mobile"
            profileImage="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150"
          />
        </View>

        {/* ============================================================= */}
        {/* PHẦN 3: BÀI TẬP 3 - FORM ĐĂNG KÝ VỚI VALIDATION               */}
        {/* ============================================================= */}
        <View style={styles.section}>
          <RegisterForm />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f172a', // Slate 900
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  headerBadge: {
    fontSize: 12,
    fontWeight: '800',
    color: '#38bdf8',
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 6,
  },
  headerDesc: {
    fontSize: 13,
    color: '#94a3b8',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#38bdf8',
    letterSpacing: 1,
    marginBottom: 4,
  },
  sectionSub: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 10,
  },
});

export default App;
