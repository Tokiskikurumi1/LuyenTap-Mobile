import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

// Import các components từ thư mục components
import ProductCard from './components/ProductCard';
import ProductListScreen from './components/ProductListScreen';
import ProductDetailScreen from './components/ProductDetailScreen';
import Header from './components/Header';

/**
 * ỨNG DỤNG CHÍNH - BÀI LUYỆN TẬP 8
 * 
 * Tích hợp toàn diện cả hai phần bài tập thực hành:
 * 1. BÀI TẬP MỨC DỄ:
 *    - Sử dụng component ProductCard riêng biệt.
 *    - Render ít nhất 3 lần với 3 bộ dữ liệu khác nhau thông qua Props (name, price).
 *    - Phân tích luồng dữ liệu 1 chiều và tính tái sử dụng.
 * 
 * 2. BÀI TẬP MỨC TRUNG BÌNH:
 *    - Hiển thị danh sách 10 sản phẩm mock data bằng FlatList tối ưu hóa hiệu năng.
 *    - Khi bấm 1 sản phẩm → Điều hướng sang màn hình Detail và truyền props/params (id, name, price,...).
 *    - Có nút quay lại danh sách mượt mà.
 */
const App = () => {
  // Tab hiện tại: 'EASY' (Bài dễ) hoặc 'MEDIUM' (Bài trung bình)
  const [activeTab, setActiveTab] = useState('MEDIUM');

  // Quản lý sản phẩm đang được chọn xem chi tiết (Màn hình Detail)
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Dữ liệu cho bài tập mức dễ (3 bộ dữ liệu khác nhau)
  const easyProducts = [
    {
      id: 'P1',
      name: 'Tai nghe Bluetooth Sony WH-1000XM5 Chống Ồn',
      price: 7690000,
      category: 'Âm thanh',
      tag: 'Bán chạy nhất',
    },
    {
      id: 'P2',
      name: 'Điện thoại thông minh iPhone 15 Pro Max 256GB Titan Tự Nhiên',
      price: 29990000,
      category: 'Smartphone',
      tag: 'Flagship Apple',
    },
    {
      id: 'P3',
      name: 'Bàn phím cơ không dây Keychron Q1 Pro Full Nhôm CNC',
      price: 4290000,
      category: 'Phụ kiện máy tính',
      tag: 'Custom Keyboard',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

      {/* Header chính của ứng dụng */}
      <Header
        title={
          selectedProduct
            ? 'Chi tiết sản phẩm'
            : activeTab === 'EASY'
            ? 'Bài tập Mức dễ (ProductCard)'
            : 'Product List (10 Sản phẩm)'
        }
        subtitle={
          selectedProduct
            ? `ID: #${selectedProduct.id} • ${selectedProduct.name}`
            : activeTab === 'EASY'
            ? 'Tái sử dụng Component & Truyền Props'
            : 'FlatList & Điều hướng truyền Props'
        }
        showBack={selectedProduct !== null}
        onBack={() => setSelectedProduct(null)}
      />

      {/* Thanh điều hướng chuyển đổi bài tập (Ẩn khi đang xem chi tiết) */}
      {!selectedProduct && (
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'MEDIUM' && styles.tabButtonActive]}
            onPress={() => setActiveTab('MEDIUM')}
          >
            <Text
              style={[styles.tabText, activeTab === 'MEDIUM' && styles.tabTextActive]}
            >
              ⭐ Bài TB: FlatList (10 SP)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'EASY' && styles.tabButtonActive]}
            onPress={() => setActiveTab('EASY')}
          >
            <Text
              style={[styles.tabText, activeTab === 'EASY' && styles.tabTextActive]}
            >
              🟢 Bài Dễ: 3 Thẻ ProductCard
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Nội dung ứng dụng theo trạng thái */}
      {selectedProduct ? (
        // MÀN HÌNH CHI TIẾT SẢN PHẨM (DETAIL SCREEN)
        <ProductDetailScreen
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
        />
      ) : activeTab === 'MEDIUM' ? (
        // MÀN HÌNH DANH SÁCH 10 SẢN PHẨM DÙNG FLATLIST (LIST SCREEN)
        <ProductListScreen
          onSelectProduct={(product) => setSelectedProduct(product)}
        />
      ) : (
        // GIAO DIỆN BÀI TẬP MỨC DỄ (3 THẺ PRODUCTCARD)
        <ScrollView
          contentContainerStyle={styles.easyScrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionBadge}>BÀI TẬP MỨC DỄ</Text>
            <Text style={styles.sectionTitle}>
              Tái sử dụng Component & Truyền Props (name, price)
            </Text>
            <Text style={styles.sectionDesc}>
              Dưới đây là component <Text style={styles.highlight}>ProductCard</Text> được
              sử dụng 3 lần với 3 bộ dữ liệu độc lập do Component cha (App) truyền
              xuống:
            </Text>
          </View>

          {/* Lần sử dụng 1 */}
          <View style={styles.usageWrapper}>
            <Text style={styles.usageLabel}>1. Sản phẩm thứ nhất:</Text>
            <ProductCard
              name={easyProducts[0].name}
              price={easyProducts[0].price}
              category={easyProducts[0].category}
              tag={easyProducts[0].tag}
            />
          </View>

          {/* Lần sử dụng 2 */}
          <View style={styles.usageWrapper}>
            <Text style={styles.usageLabel}>2. Sản phẩm thứ hai:</Text>
            <ProductCard
              name={easyProducts[1].name}
              price={easyProducts[1].price}
              category={easyProducts[1].category}
              tag={easyProducts[1].tag}
            />
          </View>

          {/* Lần sử dụng 3 */}
          <View style={styles.usageWrapper}>
            <Text style={styles.usageLabel}>3. Sản phẩm thứ ba:</Text>
            <ProductCard
              name={easyProducts[2].name}
              price={easyProducts[2].price}
              category={easyProducts[2].category}
              tag={easyProducts[2].tag}
            />
          </View>

          {/* Khối giải thích cơ chế */}
          <View style={styles.explanationCard}>
            <Text style={styles.explanationTitle}>
              💡 GIẢI THÍCH CƠ CHẾ PROPS & TÁI SỬ DỤNG:
            </Text>
            <Text style={styles.explanationBody}>
              1. <Text style={styles.bold}>Cách truyền Props:</Text> Component cha (App)
              truyền giá trị <Text style={styles.codeText}>name</Text> và{' '}
              <Text style={styles.codeText}>price</Text> thông qua các thuộc tính JSX giống
              như HTML attributes. Component con nhận props dưới dạng một đối tượng tham số
              đầu vào và trích xuất hiển thị ra giao diện.
            </Text>
            <Text style={[styles.explanationBody, { marginTop: 8 }]}>
              2. <Text style={styles.bold}>Vì sao tái sử dụng được nhiều lần:</Text>{' '}
              <Text style={styles.codeText}>ProductCard</Text> hoạt động như một "khuôn mẫu"
              (Pure Component). Nó không lưu trữ cứng bất kỳ dữ liệu nào bên trong, mà chỉ
              định nghĩa cấu trúc giao diện và cách tạo kiểu (StyleSheet). Do đó, ta có thể
              sử dụng thẻ này vô số lần với bất kỳ dữ liệu sản phẩm nào mà không cần viết lại
              code định dạng.
            </Text>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#0f172a',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#1e293b',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#334155',
  },
  tabButtonActive: {
    backgroundColor: '#0284c7',
    borderColor: '#38bdf8',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94a3b8',
  },
  tabTextActive: {
    color: '#ffffff',
  },
  easyScrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionBadge: {
    fontSize: 11,
    fontWeight: '800',
    color: '#38bdf8',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 6,
  },
  sectionDesc: {
    fontSize: 13,
    color: '#94a3b8',
    lineHeight: 19,
  },
  highlight: {
    color: '#38bdf8',
    fontWeight: '700',
  },
  usageWrapper: {
    marginBottom: 8,
  },
  usageLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748b',
    marginBottom: 4,
    marginLeft: 4,
  },
  explanationCard: {
    backgroundColor: '#1e293b',
    borderRadius: 14,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#38bdf8',
  },
  explanationTitle: {
    color: '#38bdf8',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  explanationBody: {
    color: '#cbd5e1',
    fontSize: 12.5,
    lineHeight: 19,
  },
  bold: {
    fontWeight: 'bold',
    color: '#f8fafc',
  },
  codeText: {
    color: '#f43f5e',
    fontWeight: '700',
    fontFamily: 'monospace',
  },
});

export default App;
