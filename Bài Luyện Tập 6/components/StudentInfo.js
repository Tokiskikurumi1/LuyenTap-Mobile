import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * BÀI TẬP 2: COMPONENT STUDENTINFO
 * Nhận các props: `fullName`, `className`, `major` từ component cha
 * và hiển thị thẻ thông tin sinh viên dạng Card
 */
const StudentInfo = ({ fullName, className, major }) => {
  return (
    <View style={styles.studentCard}>
      <View style={styles.headerRow}>
        <Text style={styles.avatarIcon}>🎓</Text>
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>{fullName}</Text>
          <Text style={styles.badgeText}>Lớp: {className}</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.infoRow}>
        <Text style={styles.label}>Ngành học:</Text>
        <Text style={styles.value}>{major}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  studentCard: {
    backgroundColor: '#1e293b',
    borderRadius: 14,
    padding: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  nameContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  badgeText: {
    fontSize: 13,
    color: '#38bdf8',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#334155',
    marginVertical: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#94a3b8',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: '#f8fafc',
  },
});

export default StudentInfo;
