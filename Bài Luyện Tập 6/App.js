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
import Greeting from './components/Greeting';
import StudentInfo from './components/StudentInfo';
import CounterHook from './components/CounterHook';

/**
 * ỨNG DỤNG CHÍNH - BÀI LUYỆN TẬP 6
 * Tích hợp toàn diện 3 bài tập:
 * - Bài 1: Sử dụng Greeting component với Props
 * - Bài 2: Tái sử dụng StudentInfo component hiển thị danh sách sinh viên
 * - Bài 3: Quản lý trạng thái và Re-render với CounterHook component
 */
const App = () => {
  // Danh sách sinh viên mẫu cho Bài tập 2
  const studentsList = [
    {
      id: '1',
      fullName: 'Nguyễn Văn An',
      className: 'KTPM-K17A',
      major: 'Kỹ thuật phần mềm (Mobile React Native)',
    },
    {
      id: '2',
      fullName: 'Trần Thị Mai',
      className: 'CNTT-K16B',
      major: 'Hệ thống thông tin quản lý',
    },
    {
      id: '3',
      fullName: 'Lê Hoàng Long',
      className: 'KHMT-K18C',
      major: 'Trí tuệ nhân tạo (AI & Data Science)',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header ứng dụng */}
        <View style={styles.header}>
          <Text style={styles.headerBadge}>BÀI LUYỆN TẬP 6</Text>
          <Text style={styles.headerTitle}>React Native Components & State</Text>
          <Text style={styles.headerDesc}>
            Làm quen với Props, Component tái sử dụng và Hook useState
          </Text>
        </View>

        {/* ============================================================= */}
        {/* PHẦN 1: BÀI TẬP 1 - GREETING COMPONENT                        */}
        {/* ============================================================= */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📌 Bài 1: Greeting Component (Props)</Text>
          <Text style={styles.sectionSubtitle}>
            Tái sử dụng component Greeting truyền các tên khác nhau qua props:
          </Text>
          <Greeting name="Nguyễn Văn An" />
          <Greeting name="Trần Thị Mai" />
          <Greeting name="Lê Hoàng Long" />
        </View>

        {/* ============================================================= */}
        {/* PHẦN 2: BÀI TẬP 2 - STUDENTINFO COMPONENT                    */}
        {/* ============================================================= */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📌 Bài 2: Danh sách Sinh viên (StudentInfo)</Text>
          <Text style={styles.sectionSubtitle}>
            Tổ chức giao diện thành các phần nhỏ và truyền dữ liệu qua props:
          </Text>
          {studentsList.map(student => (
            <StudentInfo
              key={student.id}
              fullName={student.fullName}
              className={student.className}
              major={student.major}
            />
          ))}
        </View>

        {/* ============================================================= */}
        {/* PHẦN 3: BÀI TẬP 3 - COUNTERHOOK COMPONENT                    */}
        {/* ============================================================= */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📌 Bài 3: Bộ đếm tương tác (useState Hook)</Text>
          <Text style={styles.sectionSubtitle}>
            Minh chứng mối quan hệ giữa State, Hàm cập nhật và Quá trình Re-render:
          </Text>
          <CounterHook />
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
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
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
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#f8fafc',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 10,
  },
});

export default App;
