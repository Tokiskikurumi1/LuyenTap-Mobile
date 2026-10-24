import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';

/**
 * Bài tập 1 - Mức độ dễ:
 * Xây dựng màn hình gọi API public JSONPlaceholder (/posts)
 * - Lấy danh sách bài viết
 * - Hiển thị bằng FlatList (Tiêu đề + Nội dung tóm tắt)
 * - Xử lý trạng thái đang tải (Loading), lỗi gọi API (Error), và nút Thử lại (Retry)
 * - Hỗ trợ kéo xuống để làm mới (Pull-to-refresh)
 */
export default function PostListScreen() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchPosts = async (isPullRefresh = false) => {
    if (isPullRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setErrorMessage(null);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=15');
      if (!response.ok) {
        throw new Error(`Máy chủ phản hồi mã lỗi: ${response.status}`);
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      setErrorMessage(error.message || 'Không thể kết nối đến máy chủ JSONPlaceholder');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Giao diện khi đang tải dữ liệu lần đầu
  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Đang gọi API tải danh sách bài viết...</Text>
      </View>
    );
  }

  // Giao diện khi xảy ra lỗi gọi API
  if (errorMessage && posts.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <View style={styles.errorIconCircle}>
          <Text style={styles.errorIconText}>⚠️</Text>
        </View>
        <Text style={styles.errorTitle}>Lỗi kết nối API!</Text>
        <Text style={styles.errorDesc}>{errorMessage}</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.retryButton}
          onPress={() => fetchPosts()}
        >
          <Text style={styles.retryButtonText}>Thử lại ngay</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderPostItem = ({ item }) => (
    <View style={styles.postCard}>
      <View style={styles.badgeRow}>
        <View style={styles.idBadge}>
          <Text style={styles.idBadgeText}>POST #{item.id}</Text>
        </View>
        <Text style={styles.authorTag}>User #{item.userId}</Text>
      </View>
      <Text style={styles.postTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.postBody} numberOfLines={3}>
        {item.body}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header thống kê */}
      <View style={styles.headerBar}>
        <View>
          <Text style={styles.headerTitle}>JSONPlaceholder Posts</Text>
          <Text style={styles.headerSubtitle}>Public REST API Fetch Demo</Text>
        </View>
        <View style={styles.countBadge}>
          <Text style={styles.countBadgeText}>{posts.length} bài viết</Text>
        </View>
      </View>

      {/* Danh sách FlatList */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPostItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => fetchPosts(true)}
            colors={['#2563EB']}
            tintColor="#2563EB"
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#F8FAFC',
  },
  loadingText: {
    marginTop: 14,
    fontSize: 15,
    fontWeight: '500',
    color: '#64748B',
  },
  errorIconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  errorIconText: {
    fontSize: 32,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#DC2626',
    marginBottom: 6,
  },
  errorDesc: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  countBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  countBadgeText: {
    color: '#2563EB',
    fontSize: 12,
    fontWeight: '700',
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  idBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  idBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
  authorTag: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    lineHeight: 22,
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  postBody: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 19,
  },
});
