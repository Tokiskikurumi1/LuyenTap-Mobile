import React from 'react';
import { StyleSheet, Image, View } from 'react-native';

/**
 * BÀI TẬP 2: COMPONENT AVATAR
 * Nhận prop `uri` (đường dẫn ảnh) và `size` (kích thước tùy chọn)
 * Đóng gói việc hiển thị ảnh bo tròn và viền sang trọng
 */
const Avatar = ({ uri, size = 64 }) => {
  return (
    <View style={[styles.avatarContainer, { width: size + 6, height: size + 6, borderRadius: (size + 6) / 2 }]}>
      <Image
        source={{ uri }}
        style={[styles.avatarImage, { width: size, height: size, borderRadius: size / 2 }]}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    borderWidth: 2,
    borderColor: '#38bdf8', // Viền xanh ngọc
  },
  avatarImage: {
    backgroundColor: '#334155',
  },
});

export default Avatar;
