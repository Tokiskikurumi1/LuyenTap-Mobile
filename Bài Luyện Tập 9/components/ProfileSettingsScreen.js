import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  useWindowDimensions,
} from 'react-native';

/**
 * Bài tập 2 - Mức trung bình:
 * Giao diện Profile Card + Settings List hoàn chỉnh:
 * - Dùng StyleSheet.create() chuẩn mực, không lạm dụng inline style
 * - Layout Flexbox chuẩn (flexDirection, justifyContent, alignItems, flexWrap, flex)
 * - Responsive: Tự động điều chỉnh layout trên màn hình nhỏ (Phone) và màn hình lớn (Tablet / Landscape)
 *   thông qua Hook useWindowDimensions()
 */

const SETTINGS_SECTIONS = [
  {
    title: 'Tài khoản & Bảo mật',
    items: [
      { id: '1', icon: '👤', title: 'Thông tin cá nhân', desc: 'Cập nhật họ tên, avatar và tiểu sử', type: 'link' },
      { id: '2', icon: '🔒', title: 'Đổi mật khẩu', desc: 'Bảo mật mật khẩu 2 lớp (2FA)', type: 'link' },
      { id: '3', icon: '🔑', title: 'Xác thực sinh trắc học', desc: 'Vân tay / FaceID', type: 'switch', key: 'biometrics' },
    ],
  },
  {
    title: 'Tùy chọn ứng dụng',
    items: [
      { id: '4', icon: '🔔', title: 'Thông báo đẩy', desc: 'Nhận thông báo bài học mới', type: 'switch', key: 'notifications' },
      { id: '5', icon: '🌙', title: 'Chế độ tối (Dark Mode)', desc: 'Tự động theo hệ thống', type: 'switch', key: 'darkMode' },
      { id: '6', icon: '🌐', title: 'Ngôn ngữ hiển thị', desc: 'Tiếng Việt (Mặc định)', type: 'link' },
      { id: '7', icon: '💾', title: 'Quản lý bộ nhớ đệm', desc: 'Đã dùng 128 MB cache', type: 'link' },
    ],
  },
  {
    title: 'Hỗ trợ & Thông tin',
    items: [
      { id: '8', icon: '💬', title: 'Trung tâm trợ giúp', desc: 'Câu hỏi thường gặp và hotline', type: 'link' },
      { id: '9', icon: '📜', title: 'Điều khoản & Chính sách', desc: 'Chính sách bảo mật dữ liệu', type: 'link' },
      { id: '10', icon: '🚪', title: 'Đăng xuất tài khoản', desc: 'Thoát phiên đăng nhập hiện tại', type: 'logout' },
    ],
  },
];

export default function ProfileSettingsScreen() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 700; // Breakpoint responsive cho màn hình lớn / tablet

  const [toggles, setToggles] = useState({
    biometrics: true,
    notifications: true,
    darkMode: false,
  });

  const handleToggle = (key) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleItemPress = (item) => {
    if (item.type === 'logout') {
      Alert.alert('Đăng xuất', 'Bạn có chắc chắn muốn đăng xuất?', [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Đăng xuất', style: 'destructive', onPress: () => Alert.alert('Đã đăng xuất') },
      ]);
      return;
    }
    Alert.alert(item.title, `Bạn vừa chọn: ${item.desc}`);
  };

  return (
    <ScrollView
      style={styles.screenContainer}
      contentContainerStyle={[
        styles.scrollContent,
        isTablet ? styles.scrollContentTablet : styles.scrollContentPhone,
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Container chính: 1 cột trên màn nhỏ, 2 cột Flexbox trên màn lớn */}
      <View style={[styles.mainLayout, isTablet && styles.mainLayoutTablet]}>
        
        {/* KHỐI 1: PROFILE CARD */}
        <View style={[styles.profileCardContainer, isTablet && styles.profileCardTablet]}>
          <View style={styles.profileCard}>
            {/* Ảnh đại diện & Huy hiệu online */}
            <View style={styles.avatarWrapper}>
              <View style={styles.avatarBox}>
                <Text style={styles.avatarText}>MN</Text>
              </View>
              <View style={styles.onlineStatusBadge} />
            </View>

            {/* Thông tin tên & chức danh */}
            <Text style={styles.userName}>Nguyễn Minh Nhật</Text>
            <Text style={styles.userRole}>Mobile Software Engineer</Text>
            <Text style={styles.userBio}>
              Đam mê kiến tạo ứng dụng di động hiệu năng cao với React Native & Clean Architecture.
            </Text>

            {/* Thống kê dạng hàng ngang (Flexbox Row + Space Evenly) */}
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>128</Text>
                <Text style={styles.statLabel}>Bài viết</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>3.4K</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>489</Text>
                <Text style={styles.statLabel}>Đang theo dõi</Text>
              </View>
            </View>

            {/* Nút hành động trên Profile */}
            <View style={styles.profileActionsRow}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.editProfileBtn}
                onPress={() => Alert.alert('Chỉnh sửa', 'Mở form chỉnh sửa hồ sơ')}
              >
                <Text style={styles.editProfileBtnText}>Chỉnh sửa hồ sơ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.shareProfileBtn}
                onPress={() => Alert.alert('Chia sẻ', 'Sao chép link hồ sơ')}
              >
                <Text style={styles.shareProfileBtnText}>🔗</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* KHỐI 2: SETTINGS LIST */}
        <View style={[styles.settingsContainer, isTablet && styles.settingsContainerTablet]}>
          {SETTINGS_SECTIONS.map((section, sIndex) => (
            <View key={sIndex} style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <View style={styles.sectionItemList}>
                {section.items.map((item, iIndex) => {
                  const isLast = iIndex === section.items.length - 1;
                  return (
                    <TouchableOpacity
                      key={item.id}
                      activeOpacity={item.type === 'switch' ? 1 : 0.7}
                      style={[styles.settingItem, !isLast && styles.settingItemBorder]}
                      onPress={() => item.type !== 'switch' && handleItemPress(item)}
                    >
                      {/* Cột trái: Icon tròn */}
                      <View style={[styles.iconCircle, item.type === 'logout' && styles.iconCircleLogout]}>
                        <Text style={styles.iconText}>{item.icon}</Text>
                      </View>

                      {/* Cột giữa: Tiêu đề và miêu tả */}
                      <View style={styles.itemTextContainer}>
                        <Text style={[styles.itemTitle, item.type === 'logout' && styles.itemTitleLogout]}>
                          {item.title}
                        </Text>
                        <Text style={styles.itemDesc}>{item.desc}</Text>
                      </View>

                      {/* Cột phải: Switch hoặc Mũi tên > */}
                      {item.type === 'switch' ? (
                        <Switch
                          value={toggles[item.key]}
                          onValueChange={() => handleToggle(item.key)}
                          trackColor={{ false: '#CBD5E1', true: '#93C5FD' }}
                          thumbColor={toggles[item.key] ? '#2563EB' : '#F8FAFC'}
                        />
                      ) : (
                        <Text style={[styles.chevronArrow, item.type === 'logout' && styles.chevronArrowLogout]}>
                          ›
                        </Text>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingVertical: 20,
  },
  scrollContentPhone: {
    paddingHorizontal: 16,
  },
  scrollContentTablet: {
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  mainLayout: {
    flexDirection: 'column',
    width: '100%',
  },
  mainLayoutTablet: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    maxWidth: 1040,
    gap: 24,
  },

  /* Profile Card Styles */
  profileCardContainer: {
    width: '100%',
    marginBottom: 20,
  },
  profileCardTablet: {
    width: 360,
    marginBottom: 0,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 3,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarBox: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#EFF6FF',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
  },
  onlineStatusBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#10B981',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563EB',
    marginBottom: 10,
  },
  userBio: {
    fontSize: 13,
    fontWeight: '400',
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingVertical: 14,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#94A3B8',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E2E8F0',
  },
  profileActionsRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  editProfileBtn: {
    flex: 1,
    backgroundColor: '#2563EB',
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editProfileBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  shareProfileBtn: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareProfileBtnText: {
    fontSize: 18,
  },

  /* Settings List Styles */
  settingsContainer: {
    width: '100%',
  },
  settingsContainerTablet: {
    flex: 1,
  },
  sectionCard: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  sectionItemList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  iconCircleLogout: {
    backgroundColor: '#FEE2E2',
  },
  iconText: {
    fontSize: 20,
  },
  itemTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 2,
  },
  itemTitleLogout: {
    color: '#DC2626',
  },
  itemDesc: {
    fontSize: 12,
    fontWeight: '400',
    color: '#94A3B8',
  },
  chevronArrow: {
    fontSize: 20,
    fontWeight: '600',
    color: '#94A3B8',
    marginLeft: 8,
  },
  chevronArrowLogout: {
    color: '#DC2626',
  },
});
