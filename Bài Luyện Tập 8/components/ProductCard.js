import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * COMPONENT PRODUCTCARD (BÀI TẬP MỨC DỄ)
 * 
 * Component hiển thị thông tin sản phẩm theo bố cục dạng thẻ (Card) đơn giản.
 * Nhận 2 props bắt buộc:
 * - name: Tên sản phẩm (String)
 * - price: Giá sản phẩm (Number hoặc String)
 * Ngoài ra có thể nhận thêm props tùy chọn như category, tag để giao diện đẹp hơn.
 */
const ProductCard = ({ name, price, category = 'Sản phẩm nổi bật', tag }) => {
  // Định dạng hiển thị tiền tệ nếu price là số
  const displayPrice =
    typeof price === 'number'
      ? `${price.toLocaleString('vi-VN')} ₫`
      : price;

  return (
    <View style={styles.cardContainer}>
      {/* Khung đầu thẻ với tag hoặc danh mục */}
      <View style={styles.cardHeader}>
        <Text style={styles.categoryBadge}>{category.toUpperCase()}</Text>
        {tag ? (
          <View style={styles.tagBadge}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ) : null}
      </View>

      {/* Tên sản phẩm nhận từ Props 'name' */}
      <Text style={styles.productName} numberOfLines={2}>
        {name}
      </Text>

      {/* Đường kẻ ngang nhẹ phân cách */}
      <View style={styles.divider} />

      {/* Giá sản phẩm nhận từ Props 'price' */}
      <View style={styles.cardFooter}>
        <Text style={styles.priceLabel}>Giá niêm yết:</Text>
        <Text style={styles.productPrice}>{displayPrice}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#1e293b', // Slate 800
    borderRadius: 14,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#334155', // Slate 700
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    fontSize: 11,
    fontWeight: '700',
    color: '#38bdf8', // Sky 400
    letterSpacing: 0.8,
  },
  tagBadge: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#38bdf8',
  },
  productName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#f8fafc', // Slate 50
    lineHeight: 22,
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#334155',
    marginVertical: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 13,
    color: '#94a3b8', // Slate 400
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#4ade80', // Emerald 400
  },
});

// Default Export: Chuẩn khuyến nghị cho file chỉ chứa một component chính
export default ProductCard;
