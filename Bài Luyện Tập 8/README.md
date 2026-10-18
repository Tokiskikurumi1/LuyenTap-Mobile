# BÀI LUYỆN TẬP 8: PROPS, TÁI SỬ DỤNG COMPONENT, FLATLIST VÀ ĐIỀU HƯỚNG TRUYỀN DỮ LIỆU

Thư mục này chứa đầy đủ tài liệu lý thuyết, mã nguồn các component thực hành, mock data 10 sản phẩm, danh sách `FlatList`, màn hình `Detail` và **3 ảnh nộp minh chứng (ảnh danh sách, ảnh chi tiết, ảnh bài tập dễ)** theo đúng yêu cầu đề bài.

---

## 📁 Cấu trúc thư mục

```text
Bài Luyện Tập 8/
├── 📁 components/
│   ├── ProductCard.js           # Bài mức dễ: Component hiển thị thẻ sản phẩm (props: name, price)
│   ├── ProductItem.js           # Component đại diện cho 1 phần tử trong FlatList
│   ├── ProductListScreen.js     # Màn hình danh sách 10 sản phẩm dùng FlatList, tìm kiếm, lọc tag
│   ├── ProductDetailScreen.js   # Màn hình chi tiết nhận props/params (id, name, price, ...)
│   ├── Header.js                # Component thanh tiêu đề dùng chung, hỗ trợ nút Back
│   └── CustomButton.js          # Component nút bấm tùy biến đa dạng biến thể màu
├── 📁 data/
│   └── mockProducts.js          # Dữ liệu mẫu 10 sản phẩm công nghệ chi tiết
├── 📁 Ảnh/
│   ├── anh_list.png             # 📸 Ảnh nộp 1: Màn hình danh sách 10 sản phẩm dùng FlatList
│   ├── anh_detail.png           # 📸 Ảnh nộp 2: Màn hình chi tiết sản phẩm nhận props id, name, price
│   └── anh_product_card_de.png  # 📸 Ảnh minh chứng: Bài tập mức dễ hiển thị 3 thẻ ProductCard
├── 📄 App.js                    # Ứng dụng chính tích hợp chuyển đổi giữa Bài Dễ và Bài Trung Bình
├── 📄 package.json              # File cấu hình dự án
├── 📄 create_images_blt8.py     # Kịch bản Python tự động tạo 3 ảnh minh chứng pixel-perfect
├── 📄 Ly_Thuyet.md              # Lời giải chi tiết 5 câu hỏi lý thuyết chuyên sâu (Phần A)
├── 📄 Thuc_Hanh.md              # Báo cáo thực hành chi tiết mã nguồn, giải thích và đính kèm ảnh (Phần B)
└── 📄 README.md                 # Tóm tắt và mục lục tra cứu nhanh
```

---

## 📌 Tóm tắt nội dung chính

### Phần A: Câu hỏi ôn tập lý thuyết ([Ly_Thuyet.md](./Ly_Thuyet.md))
1. **Câu 1:** So sánh **Default Export** và **Named Export**; Phân tích vì sao file chứa 1 component chính nên dùng Default Export và ví dụ minh họa thực tế.
2. **Câu 2:** Khái niệm **Props** và luồng dữ liệu một chiều (Unidirectional Data Flow); Đặc điểm **Read-Only** (bất biến) và các lỗi nghiêm trọng xảy ra nếu component con cố tình thay đổi trực tiếp props.
3. **Câu 3:** Vai trò của việc tách component nhỏ (`Header`, `Button`, `InputField`, `Card`) đối với **Tái sử dụng (DRY)**, **Bảo trì (SRP)**, và **Mở rộng (Atomic Design)**.
4. **Câu 4:** Mối liên hệ tam giác giữa **Props - State - Hooks** trong form nhập liệu; Phân định rõ ràng trường nào quản lý bằng State, trường nào truyền qua Props trong form đăng ký tài khoản.
5. **Câu 5:** Khái niệm **Controlled Component** với `TextInput`; Tầm quan trọng của việc kiểm tra rỗng, kiểm tra format email `@`, và kiểm tra độ dài tối thiểu của mật khẩu.

---

### Phần B: Bài tập luyện tập thực hành ([Thuc_Hanh.md](./Thuc_Hanh.md))
1. **Bài tập 1 (Mức dễ):** 
   - Component [ProductCard.js](./components/ProductCard.js) nhận props `name` và `price`.
   - Import vào màn hình chính và tái sử dụng ít nhất 3 lần với 3 bộ dữ liệu độc lập.
   - Có đoạn văn giải thích rõ luồng truyền props một chiều và nguyên nhân component tái sử dụng được nhiều lần.
   - 📸 **[Ảnh 3: anh_product_card_de.png](./Ảnh/anh_product_card_de.png)**.
2. **Bài tập 2 (Mức trung bình):**
   - Mock Data 10 sản phẩm công nghệ tại [mockProducts.js](./data/mockProducts.js).
   - Màn hình [ProductListScreen.js](./components/ProductListScreen.js) dùng `FlatList` mượt mà, hỗ trợ tìm kiếm và lọc danh mục.
   - Chạm vào bất kỳ sản phẩm nào → chuyển sang màn hình [ProductDetailScreen.js](./components/ProductDetailScreen.js) truyền đầy đủ props/params (`id`, `name`, `price`,...).
   - 📸 **[Ảnh 1: anh_list.png](./Ảnh/anh_list.png)**: Giao diện danh sách FlatList 10 sản phẩm.
   - 📸 **[Ảnh 2: anh_detail.png](./Ảnh/anh_detail.png)**: Giao diện chi tiết sản phẩm và banner xác nhận props nhận được.

---

## 🚀 Hướng dẫn chạy thử dự án

```bash
# 1. Di chuyển vào thư mục Bài Luyện Tập 8
cd "Bài Luyện Tập 8"

# 2. Chạy ứng dụng với React Native
npx react-native start
```
