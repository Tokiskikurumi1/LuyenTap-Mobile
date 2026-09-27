import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Import component con Avatar để lồng vào trong UserProfile
import Avatar from './Avatar';

/**
 * BÀI TẬP 2: COMPONENT USERPROFILE (LỒNG COMPONENT)
 * Nhận props: `name`, `bio`, `profileImage`
 * Lồng component <Avatar /> vào bên trong để hiển thị ảnh đại diện
 */
const UserProfile = ({ name, bio, profileImage }) => {
  return (
    <View style={styles.profileCard}>
      {/* Lồng component con Avatar */}
      <Avatar uri={profileImage} size={60} />

      {/* Thông tin văn bản của người dùng */}
      <View style={styles.infoContainer}>
        <Text style={styles.userName}>{name}</Text>
        <Text style={styles.userBio}>{bio}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#334155',
    elevation: 3,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  userBio: {
    fontSize: 13,
    color: '#94a3b8',
    lineHeight: 18,
  },
});

export default UserProfile;
