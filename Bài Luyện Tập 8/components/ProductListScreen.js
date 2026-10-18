import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import ProductItem from './ProductItem';
import { mockProducts } from '../data/mockProducts';

/**
 * COMPONENT PRODUCTLISTSCREEN (BÀI TẬP MỨC TRUNG BÌNH - PHẦN 1)
 * 
 * Quản lý và hiển thị danh sách 10 sản phẩm bằng FlatList.
 * Tối ưu hóa hiệu năng render danh sách dài nhờ cơ chế ảo hóa (virtualization).
 * 
 * Props nhận vào:
 * - onSelectProduct: Hàm callback chuyển màn hình sang Detail và truyền dữ liệu sản phẩm.
 */
const ProductListScreen = ({ onSelectProduct }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Danh sách các danh mục để lọc nhanh
  const categories = ['All', 'Smartphone', 'Laptop', 'Âm thanh', 'Tablet', 'Phụ kiện'];

  // Lọc sản phẩm theo ô tìm kiếm và danh mục được chọn
  const filteredProducts = mockProducts.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Render từng item trong danh sách
  const renderItem = ({ item }) => (
    <ProductItem item={item} onPress={onSelectProduct} />
  );

  return (
    <View style={styles.container}>
      {/* Thanh tìm kiếm sản phẩm */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm sản phẩm (10 sản phẩm)..."
          placeholderTextColor="#64748b"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery !== '' ? (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Text style={styles.clearBtn}>✕</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Bộ lọc danh mục nhanh */}
      <View style={styles.categoriesWrapper}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(cat) => cat}
          renderItem={({ item: cat }) => {
            const isActive = selectedCategory === cat;
            return (
              <TouchableOpacity
                style={[styles.catBadge, isActive && styles.catBadgeActive]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text
                  style={[styles.catText, isActive && styles.catTextActive]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Thông tin số lượng sản phẩm */}
      <View style={styles.listHeaderRow}>
        <Text style={styles.listCountText}>
          Hiển thị {filteredProducts.length}/{mockProducts.length} sản phẩm
        </Text>
        <Text style={styles.hintText}>Chạm vào thẻ để xem chi tiết →</Text>
      </View>

      {/* Danh sách chính sử dụng FlatList */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📦</Text>
            <Text style={styles.emptyTitle}>Không tìm thấy sản phẩm!</Text>
            <Text style={styles.emptySub}>
              Vui lòng thử tìm với từ khóa hoặc danh mục khác.
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    marginTop: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 14,
  },
  clearBtn: {
    color: '#94a3b8',
    fontSize: 16,
    paddingHorizontal: 4,
  },
  categoriesWrapper: {
    marginBottom: 10,
  },
  categoriesList: {
    paddingVertical: 4,
  },
  catBadge: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  catBadgeActive: {
    backgroundColor: '#0284c7',
    borderColor: '#38bdf8',
  },
  catText: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '600',
  },
  catTextActive: {
    color: '#ffffff',
    fontWeight: '700',
  },
  listHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 2,
  },
  listCountText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#38bdf8',
  },
  hintText: {
    fontSize: 11,
    color: '#64748b',
    fontStyle: 'italic',
  },
  flatListContent: {
    paddingBottom: 24,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 10,
  },
  emptyTitle: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptySub: {
    color: '#64748b',
    fontSize: 13,
    marginTop: 4,
  },
});

export default ProductListScreen;
