import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import CustomButton from './CustomButton';

/**
 * COMPONENT PRODUCTDETAILSCREEN (BÀI TẬP MỨC TRUNG BÌNH - PHẦN 2)
 * 
 * Màn hình chi tiết sản phẩm nhận props / params từ component cha (App hoặc Navigation):
 * - id: Mã định danh sản phẩm
 * - name: Tên sản phẩm
 * - price: Đơn giá
 * - formattedPrice, category, rating, reviews, stock, description, specs (tùy chọn mở rộng)
 * - onBack: Callback quay về danh sách FlatList
 */
const ProductDetailScreen = ({ product, onBack }) => {
  // Trích xuất các props quan trọng nhất theo đúng yêu cầu đề bài
  const {
    id,
    name,
    price,
    formattedPrice = `${price} ₫`,
    category = 'Thiết bị công nghệ',
    rating = 5.0,
    reviews = 100,
    stock = 10,
    tag = 'Chính hãng',
    description = 'Sản phẩm chính hãng với bảo hành 12 tháng trên toàn quốc.',
    specs = {},
  } = product || {};

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    Alert.alert(
      'Thêm vào giỏ thành công! 🎉',
      `Đã thêm ${quantity} sản phẩm "${name}" vào giỏ hàng.\nTổng tiền: ${(
        price * quantity
      ).toLocaleString('vi-VN')} ₫`,
      [{ text: 'Đồng ý' }]
    );
  };

  const handleBuyNow = () => {
    Alert.alert(
      'Xác nhận đặt hàng 🚀',
      `Sản phẩm: ${name}\nMã SP: #${id}\nĐơn giá: ${formattedPrice}\nSố lượng: ${quantity}`,
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Tiến hành thanh toán', onPress: () => {} },
      ]
    );
  };

  return (
    <View style={styles.screenContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Nút quay lại danh sách */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <Text style={styles.backArrow}>←</Text>
          <Text style={styles.backText}>Quay lại danh sách sản phẩm</Text>
        </TouchableOpacity>

        {/* Banner Props nhận được từ màn hình trước */}
        <View style={styles.propsBanner}>
          <Text style={styles.propsBannerTitle}>
            📥 PROPS / PARAMS NHẬN ĐƯỢC TỪ COMPONENT CHA:
          </Text>
          <View style={styles.propsRow}>
            <Text style={styles.propKey}>• ID sản phẩm:</Text>
            <Text style={styles.propVal}>#{id}</Text>
          </View>
          <View style={styles.propsRow}>
            <Text style={styles.propKey}>• Tên sản phẩm (name):</Text>
            <Text style={styles.propVal}>{name}</Text>
          </View>
          <View style={styles.propsRow}>
            <Text style={styles.propKey}>• Giá tiền (price):</Text>
            <Text style={styles.propValHighlight}>
              {typeof price === 'number' ? `${price.toLocaleString('vi-VN')} ₫` : price}
            </Text>
          </View>
        </View>

        {/* Khung thông tin chính của sản phẩm */}
        <View style={styles.card}>
          <View style={styles.badgeRow}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{category}</Text>
            </View>
            <View style={styles.tagBadge}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
            <TouchableOpacity
              style={styles.favoriteBtn}
              onPress={() => setIsFavorite(!isFavorite)}
            >
              <Text style={[styles.favoriteHeart, isFavorite && styles.heartActive]}>
                {isFavorite ? '❤️' : '🤍'}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.productTitle}>{name}</Text>

          {/* Đánh giá & Tồn kho */}
          <View style={styles.metaRow}>
            <View style={styles.ratingBox}>
              <Text style={styles.starText}>★</Text>
              <Text style={styles.ratingNumber}>{rating}</Text>
              <Text style={styles.reviewsCount}>({reviews} đánh giá)</Text>
            </View>
            <View style={styles.stockBox}>
              <Text style={styles.stockText}>Còn lại: {stock} máy</Text>
            </View>
          </View>

          {/* Giá tiền */}
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>GIÁ BÁN NIÊM YẾT</Text>
            <Text style={styles.priceValue}>{formattedPrice}</Text>
          </View>

          {/* Bộ chọn số lượng */}
          <View style={styles.quantitySection}>
            <Text style={styles.quantityLabel}>Số lượng đặt mua:</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={styles.quantityBtn}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Text style={styles.quantityBtnText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityValue}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityBtn}
                onPress={() => setQuantity(Math.min(stock, quantity + 1))}
              >
                <Text style={styles.quantityBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Mô tả sản phẩm */}
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>MÔ TẢ SẢN PHẨM</Text>
            <Text style={styles.descriptionText}>{description}</Text>
          </View>

          {/* Thông số kỹ thuật (nếu có) */}
          {specs && Object.keys(specs).length > 0 ? (
            <View style={styles.sectionBlock}>
              <Text style={styles.sectionTitle}>THÔNG SỐ KỸ THUẬT</Text>
              {Object.entries(specs).map(([key, val], idx) => (
                <View key={idx} style={styles.specRow}>
                  <Text style={styles.specKey}>{key.toUpperCase()}:</Text>
                  <Text style={styles.specVal}>{val}</Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>
      </ScrollView>

      {/* Thanh nút bấm thao tác ở chân màn hình */}
      <View style={styles.footerBar}>
        <CustomButton
          title="Thêm vào giỏ"
          variant="secondary"
          style={styles.cartButton}
          onPress={handleAddToCart}
        />
        <CustomButton
          title="⚡ Mua ngay"
          variant="primary"
          style={styles.buyButton}
          onPress={handleBuyNow}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 90,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    alignSelf: 'flex-start',
    backgroundColor: '#1e293b',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  backArrow: {
    color: '#38bdf8',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 6,
  },
  backText: {
    color: '#38bdf8',
    fontSize: 13,
    fontWeight: '700',
  },
  propsBanner: {
    backgroundColor: 'rgba(2, 132, 199, 0.12)',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#0284c7',
    marginBottom: 16,
  },
  propsBannerTitle: {
    color: '#38bdf8',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  propsRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  propKey: {
    color: '#94a3b8',
    fontSize: 13,
    width: 140,
  },
  propVal: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  propValHighlight: {
    color: '#4ade80',
    fontSize: 14,
    fontWeight: '800',
    flex: 1,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#334155',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryBadge: {
    backgroundColor: '#0f172a',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#334155',
    marginRight: 8,
  },
  categoryText: {
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  tagBadge: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagText: {
    color: '#38bdf8',
    fontSize: 11,
    fontWeight: '700',
  },
  favoriteBtn: {
    marginLeft: 'auto',
    padding: 4,
  },
  favoriteHeart: {
    fontSize: 18,
  },
  heartActive: {
    transform: [{ scale: 1.1 }],
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    lineHeight: 26,
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starText: {
    color: '#fbbf24',
    fontSize: 14,
    marginRight: 4,
  },
  ratingNumber: {
    color: '#fbbf24',
    fontWeight: 'bold',
    fontSize: 13,
    marginRight: 4,
  },
  reviewsCount: {
    color: '#64748b',
    fontSize: 12,
  },
  stockBox: {
    backgroundColor: 'rgba(74, 222, 128, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  stockText: {
    color: '#4ade80',
    fontSize: 11,
    fontWeight: '700',
  },
  priceContainer: {
    backgroundColor: '#0f172a',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  priceLabel: {
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 4,
  },
  priceValue: {
    color: '#4ade80',
    fontSize: 24,
    fontWeight: '900',
  },
  quantitySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
    backgroundColor: '#0f172a',
    padding: 12,
    borderRadius: 10,
  },
  quantityLabel: {
    color: '#f8fafc',
    fontSize: 14,
    fontWeight: '600',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityBtn: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityBtnText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityValue: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
    marginHorizontal: 14,
  },
  sectionBlock: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#38bdf8',
    letterSpacing: 1,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 13,
    color: '#cbd5e1',
    lineHeight: 20,
  },
  specRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  specKey: {
    color: '#94a3b8',
    fontSize: 12,
    width: 100,
    fontWeight: '600',
  },
  specVal: {
    color: '#ffffff',
    fontSize: 12,
    flex: 1,
  },
  footerBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0f172a',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#1e293b',
  },
  cartButton: {
    flex: 1,
    marginRight: 8,
  },
  buyButton: {
    flex: 1,
    marginLeft: 8,
  },
});

export default ProductDetailScreen;
