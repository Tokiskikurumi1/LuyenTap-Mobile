import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

/**
 * BÀI TẬP 3: FORM ĐĂNG KÝ (VALIDATION TOÀN DIỆN)
 * Các trường: Họ tên, Email, Mật khẩu, Confirm mật khẩu
 * Tiêu chí validate:
 * 1. Không để rỗng
 * 2. Email đúng định dạng regex
 * 3. Mật khẩu >= 6 ký tự
 * 4. Mật khẩu xác nhận phải khớp
 * Khi submit hợp lệ: Hiển thị dòng chữ "Đăng ký thành công" (Text)
 */
const RegisterForm = () => {
  // 1. Quản lý giá trị nhập liệu bằng State (Controlled Component)
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 2. State quản lý thông báo lỗi cho từng trường
  const [errors, setErrors] = useState({});

  // 3. State thông báo trạng thái đăng ký thành công
  const [isSuccess, setIsSuccess] = useState(false);

  // Hàm kiểm tra định dạng email bằng Regular Expression
  const validateEmailFormat = (emailStr) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailStr);
  };

  // Hàm xử lý khi người dùng nhấn nút Submit "Đăng ký"
  const handleSubmit = () => {
    const newErrors = {};

    // 1. Kiểm tra Họ tên
    if (!fullName.trim()) {
      newErrors.fullName = 'Họ tên không được để trống!';
    }

    // 2. Kiểm tra Email
    if (!email.trim()) {
      newErrors.email = 'Email không được để trống!';
    } else if (!validateEmailFormat(email)) {
      newErrors.email = 'Email không đúng định dạng (vd: user@gmail.com)!';
    }

    // 3. Kiểm tra Mật khẩu
    if (!password) {
      newErrors.password = 'Mật khẩu không được để trống!';
    } else if (password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự!';
    }

    // 4. Kiểm tra Xác nhận mật khẩu
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu!';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp!';
    }

    // Cập nhật State lỗi
    setErrors(newErrors);

    // Nếu không có bất kỳ lỗi nào -> Đăng ký thành công
    if (Object.keys(newErrors).length === 0) {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
  };

  return (
    <View style={styles.formCard}>
      <Text style={styles.formTitle}>BÀI 3: FORM ĐĂNG KÝ TÀI KHOẢN</Text>

      {/* Thông báo thành công nếu validate đạt chuẩn */}
      {isSuccess && (
        <View style={styles.successBanner}>
          <Text style={styles.successText}>🎉 Đăng ký thành công!</Text>
        </View>
      )}

      {/* 1. Trường Họ và tên */}
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Họ và tên:</Text>
        <TextInput
          style={[styles.input, errors.fullName && styles.inputError]}
          placeholder="Nhập họ và tên..."
          placeholderTextColor="#64748b"
          value={fullName}
          onChangeText={(text) => {
            setFullName(text);
            if (errors.fullName) setErrors(prev => ({ ...prev, fullName: '' }));
          }}
        />
        {errors.fullName ? <Text style={styles.errorText}>⚠️ {errors.fullName}</Text> : null}
      </View>

      {/* 2. Trường Email */}
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Địa chỉ Email:</Text>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="name@example.com"
          placeholderTextColor="#64748b"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
          }}
        />
        {errors.email ? <Text style={styles.errorText}>⚠️ {errors.email}</Text> : null}
      </View>

      {/* 3. Trường Mật khẩu */}
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Mật khẩu:</Text>
        <TextInput
          style={[styles.input, errors.password && styles.inputError]}
          placeholder="Tối thiểu 6 ký tự..."
          placeholderTextColor="#64748b"
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
          }}
        />
        {errors.password ? <Text style={styles.errorText}>⚠️ {errors.password}</Text> : null}
      </View>

      {/* 4. Trường Xác nhận mật khẩu */}
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Xác nhận mật khẩu:</Text>
        <TextInput
          style={[styles.input, errors.confirmPassword && styles.inputError]}
          placeholder="Nhập lại mật khẩu vừa đặt..."
          placeholderTextColor="#64748b"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: '' }));
          }}
        />
        {errors.confirmPassword ? <Text style={styles.errorText}>⚠️ {errors.confirmPassword}</Text> : null}
      </View>

      {/* Nút bấm Submit */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        activeOpacity={0.8}
      >
        <Text style={styles.submitButtonText}>🚀 Hoàn tất Đăng Ký</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#38bdf8',
    elevation: 4,
  },
  formTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#38bdf8',
    letterSpacing: 1,
    marginBottom: 16,
  },
  successBanner: {
    backgroundColor: '#064e3b',
    borderWidth: 1,
    borderColor: '#10b981',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  successText: {
    color: '#34d399',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fieldGroup: {
    marginBottom: 14,
  },
  fieldLabel: {
    fontSize: 13,
    color: '#94a3b8',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 15,
    color: '#ffffff',
  },
  inputError: {
    borderColor: '#ef4444', // Viền đỏ khi có lỗi
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
  },
  errorText: {
    color: '#f87171',
    fontSize: 12,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: '#0284c7',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterForm;
