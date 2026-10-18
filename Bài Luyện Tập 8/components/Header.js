import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

/**
 * COMPONENT HEADER
 * Component Header tùy biến, có thể hiển thị nút quay lại (Back) và phụ đề.
 */
const Header = ({
  title,
  subtitle,
  badge = 'BÀI LUYỆN TẬP 8',
  showBack = false,
  onBack,
}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.topRow}>
        {showBack && onBack ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
            activeOpacity={0.7}
          >
            <Text style={styles.backIcon}>←</Text>
            <Text style={styles.backText}>Quay lại</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.badgeWrapper}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
      </View>

      <Text style={styles.titleText}>{title}</Text>
      {subtitle ? <Text style={styles.subtitleText}>{subtitle}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
    backgroundColor: '#0f172a',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  badgeWrapper: {
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 16,
  },
  badgeText: {
    color: '#38bdf8',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#1e293b',
  },
  backIcon: {
    fontSize: 16,
    color: '#38bdf8',
    marginRight: 6,
    fontWeight: 'bold',
  },
  backText: {
    fontSize: 13,
    color: '#38bdf8',
    fontWeight: '600',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 0.3,
  },
  subtitleText: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 4,
  },
});

export default Header;
