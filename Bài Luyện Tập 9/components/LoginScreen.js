import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

/**
 * Bài tập 1: Màn hình Login đơn giản trong React Native
 * Đầy đủ:
 * - Tiêu đề ứng dụng
 * - 2 ô nhập thông tin (Email & Mật khẩu)
 * - Nút Đăng nhập
 * - Dòng chữ "Forgot password"
 * Toàn bộ style chính được viết bằng StyleSheet.create()
 * Sử dụng đầy đủ các thuộc tính: backgroundColor, fontSize, fontWeight,
 * padding, margin, borderWidth, borderRadius, justifyContent, alignItems.
 */
export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ Email và Mật khẩu!');
      return;
    }
    Alert.alert('Thành công', `Chào mừng ${email} đăng nhập hệ thống!`);
  };

  const handleForgotPassword = () => {
    Alert.alert('Quên mật khẩu', 'Hệ thống đã gửi liên kết đặt lại mật khẩu về email của bạn.');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardContainer}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* Vùng Header & Tiêu đề */}
          <View style={styles.headerContainer}>
            <View style={styles.logoBadge}>
              <Text style={styles.logoBadgeText}>RN</Text>
            </View>
            <Text style={styles.title}>EduPortal Login</Text>
            <Text style={styles.subtitle}>Đăng nhập để tiếp tục học tập và làm việc</Text>
          </View>

          {/* Form nhập liệu */}
          <View style={styles.formCard}>
            {/* Ô nhập Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Địa chỉ Email</Text>
              <TextInput
                style={styles.input}
                placeholder="vidu@fpt.edu.vn"
                placeholderTextColor="#94A3B8"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Ô nhập Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Mật khẩu</Text>
              <TextInput
                style={styles.input}
                placeholder="Nhập tối thiểu 6 ký tự"
                placeholderTextColor="#94A3B8"
                secureTextEntry
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
              />
            </View>

            {/* Dòng chữ Forgot password */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleForgotPassword}
              style={styles.forgotPasswordWrapper}
            >
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>

            {/* Nút Đăng nhập */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.loginButton}
              onPress={handleLogin}
            >
              <Text style={styles.loginButtonText}>Đăng nhập ngay</Text>
            </TouchableOpacity>
          </View>

          {/* Chân trang */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerNote}>© 2026 Mobile Development Lab 9</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: '#F1F5F9', // backgroundColor
  },
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9', // backgroundColor
    justifyContent: 'center',    // justifyContent
    alignItems: 'center',        // alignItems
    paddingHorizontal: 24,       // padding
    paddingVertical: 32,         // padding
  },
  headerContainer: {
    alignItems: 'center',        // alignItems
    marginBottom: 28,            // margin
  },
  logoBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,            // borderRadius
    backgroundColor: '#2563EB',  // backgroundColor
    justifyContent: 'center',    // justifyContent
    alignItems: 'center',        // alignItems
    marginBottom: 16,            // margin
    borderWidth: 3,              // borderWidth
    borderColor: '#BFDBFE',      // borderWidth & borderColor
  },
  logoBadgeText: {
    color: '#FFFFFF',
    fontSize: 24,                // fontSize
    fontWeight: '800',           // fontWeight
  },
  title: {
    fontSize: 26,                // fontSize
    fontWeight: '800',           // fontWeight
    color: '#0F172A',
    marginBottom: 8,             // margin
  },
  subtitle: {
    fontSize: 14,                // fontSize
    fontWeight: '500',           // fontWeight
    color: '#64748B',
    textAlign: 'center',
  },
  formCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#FFFFFF',  // backgroundColor
    borderRadius: 20,            // borderRadius
    padding: 24,                 // padding
    borderWidth: 1,              // borderWidth
    borderColor: '#E2E8F0',
    // Shadow cho iOS và elevation cho Android
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  inputGroup: {
    marginBottom: 18,            // margin
  },
  inputLabel: {
    fontSize: 14,                // fontSize
    fontWeight: '600',           // fontWeight
    color: '#334155',
    marginBottom: 8,             // margin
  },
  input: {
    backgroundColor: '#F8FAFC',  // backgroundColor
    borderWidth: 1.5,            // borderWidth
    borderColor: '#CBD5E1',
    borderRadius: 12,            // borderRadius
    paddingHorizontal: 16,       // padding
    paddingVertical: 13,         // padding
    fontSize: 15,                // fontSize
    fontWeight: '500',           // fontWeight
    color: '#0F172A',
  },
  forgotPasswordWrapper: {
    alignItems: 'flex-end',      // alignItems
    marginBottom: 22,            // margin
  },
  forgotPasswordText: {
    fontSize: 14,                // fontSize
    fontWeight: '600',           // fontWeight
    color: '#2563EB',
  },
  loginButton: {
    backgroundColor: '#2563EB',  // backgroundColor
    borderRadius: 12,            // borderRadius
    paddingVertical: 15,         // padding
    alignItems: 'center',        // alignItems
    justifyContent: 'center',    // justifyContent
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,                // fontSize
    fontWeight: '700',           // fontWeight
    letterSpacing: 0.3,
  },
  footerContainer: {
    marginTop: 24,               // margin
    alignItems: 'center',        // alignItems
  },
  footerNote: {
    fontSize: 12,                // fontSize
    fontWeight: '500',           // fontWeight
    color: '#94A3B8',
  },
});
