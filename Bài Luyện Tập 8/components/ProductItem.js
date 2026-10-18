import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

/**
 * COMPONENT PRODUCTITEM
 * Đại diện cho 1 phần tử render bên trong FlatList.
 * Nhận props:
 * - item: Đối tượng sản phẩm chứa { id, name, price, formattedPrice, category, rating, reviews, stock, tag, image, description }
 * - onPress: Callback kích hoạt khi bấm vào item để chuyển sang màn hình Detail
 */
const ProductItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={() => onPress(item)}
    >
      {/* Cột trái: Huy hiệu số thứ tự / Icon */}
      <View style={styles.indexBox}>
        <Text style={styles.indexText}>#{item.id}</Text>
      </View>

      {/* Cột giữa: Thông tin sản phẩm */}
      <View style={styles.infoBox}>
        <View style={styles.metaRow}>
          <Text style={styles.categoryText}>{item.category}</Text>
          {item.tag ? (
            <View style={styles.tagWrapper}>
              <Text style={styles.tagText}>{item.tag}</Text>
            </View>
          ) : null}
        </View>

        <Text style={styles.nameText} numberOfLines={2}>
          {item.name}
        </Text>

        <View style={styles.bottomRow}>
          <Text style={styles.priceText}>{item.formattedPrice || `${item.price} ₫`}</Text>
          <View style={styles.ratingBox}>
            <Text style={styles.starIcon}>★</Text>
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
      </View>

      {/* Cột phải: Mũi tên điều hướng sang Detail */}
      <View style={styles.arrowBox}>
        <Text style={styles.arrowText}>›</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  indexBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#38bdf8',
    marginRight: 12,
  },
  indexText: {
    color: '#38bdf8',
    fontWeight: '800',
    fontSize: 14,
  },
  infoBox: {
    flex: 1,
    justifyContent: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  categoryText: {
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  tagWrapper: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
    marginLeft: 8,
  },
  tagText: {
    color: '#38bdf8',
    fontSize: 10,
    fontWeight: '700',
  },
  nameText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 8,
  },
  priceText: {
    color: '#4ade80',
    fontSize: 14,
    fontWeight: '800',
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(251, 191, 36, 0.12)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  starIcon: {
    color: '#fbbf24',
    fontSize: 11,
    marginRight: 3,
  },
  ratingText: {
    color: '#fbbf24',
    fontSize: 11,
    fontWeight: '700',
  },
  arrowBox: {
    paddingLeft: 6,
  },
  arrowText: {
    fontSize: 24,
    color: '#64748b',
    fontWeight: '300',
  },
});

export default ProductItem;
