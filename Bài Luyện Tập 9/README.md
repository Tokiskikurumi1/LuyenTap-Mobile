# BÀI LUYỆN TẬP 9: STYLESHEET, STYLING VÀ LAYOUT FLEXBOX TRONG REACT NATIVE

Thư mục này chứa đầy đủ tài liệu lý thuyết chuyên sâu, mã nguồn thực hành sạch đẹp và bộ 3 ảnh minh chứng (màn hình Login mức dễ, giao diện Profile & Settings trên màn hình nhỏ Phone và màn hình lớn Tablet) theo đúng yêu cầu đề bài.

---

## 📁 Cấu trúc thư mục

```text
Bài Luyện Tập 9/
├── 📁 components/
│   ├── LoginScreen.js               # Bài tập 1: Màn hình Login hoàn chỉnh (StyleSheet 9 thuộc tính cơ bản)
│   └── ProfileSettingsScreen.js     # Bài tập 2: Profile card + Settings list (Flexbox Responsive đa màn hình)
├── 📁 Ảnh/
│   ├── anh_login_de.png             # 📸 Ảnh nộp Bài 1: Màn hình Login chạy trên thiết bị / giả lập
│   ├── anh_profile_settings_small.png # 📸 Ảnh nộp Bài 2: UI Profile & Settings trên Màn hình nhỏ (Phone)
│   └── anh_profile_settings_large.png # 📸 Ảnh nộp Bài 2: UI Profile & Settings trên Màn hình lớn (Tablet)
├── 📄 App.js                        # Ứng dụng tích hợp thanh Tab Switcher chuyển đổi mượt mà giữa Bài 1 và Bài 2
├── 📄 package.json                  # Cấu hình dự án
├── 📄 create_images_blt9.py         # Kịch bản Python tự động tạo ảnh chụp màn hình minh chứng pixel-perfect
├── 📄 Ly_Thuyet.md                  # Lời giải chi tiết 5 câu hỏi lý thuyết chuyên sâu (Phần A)
├── 📄 Thuc_Hanh.md                  # Báo cáo thực hành chi tiết, phân tích code và đính kèm ảnh (Phần B)
└── 📄 README.md                     # Hướng dẫn tổng quan và tra cứu nhanh
```

---

## 📌 Tóm tắt nội dung

### Phần A: Câu hỏi ôn tập lý thuyết ([Ly_Thuyet.md](./Ly_Thuyet.md))
1. **Câu 1:** Vai trò của `StyleSheet` trong React Native; Phân tích cơ chế bộ nhớ, Garbage Collection, Native Bridge và lý do vì sao dự án thực tế luôn ưu tiên `StyleSheet.create()` thay vì inline style.
2. **Câu 2:** Cách sử dụng prop `style`; Quy tắc cascading "style đến sau ghi đè style đến trước" (Last-one-wins) khi truyền mảng style và cách lọc bỏ giá trị falsy để viết conditional styling.
3. **Câu 3:** Ý nghĩa của việc `export`/`import` StyleSheet; 4 trường hợp then chốt nên tách style thành file riêng (Design Tokens, Common Utilities, Màn hình phức tạp, Chia sẻ theo Feature Module).
4. **Câu 4:** Cách truyền style qua props cho component con; Phân tích tính linh hoạt khi tách biệt `style` (Box layout) và `textStyle` (Typography) cho component nút bấm tái sử dụng.
5. **Câu 5:** Phân tích thuật toán dàn trang Flexbox trong React Native; Chi tiết ý nghĩa các thuộc tính: `flexDirection`, `justifyContent`, `alignItems`, `flex`, và `flexWrap`.

---

### Phần B: Bài tập luyện tập thực hành ([Thuc_Hanh.md](./Thuc_Hanh.md))
1. **Bài tập 1 (Mức dễ):**
   - Thiết kế [LoginScreen.js](./components/LoginScreen.js) gồm tiêu đề, 2 ô nhập liệu (Email & Mật khẩu), nút đăng nhập và dòng chữ "Forgot password?".
   - Áp dụng đầy đủ 9 thuộc tính chuẩn: `backgroundColor`, `fontSize`, `fontWeight`, `padding`, `margin`, `borderWidth`, `borderRadius`, `justifyContent`, `alignItems`.
   - 📸 **[Ảnh: anh_login_de.png](./Ảnh/anh_login_de.png)**.
2. **Bài tập 2 (Mức trung bình):**
   - Thiết kế [ProfileSettingsScreen.js](./components/ProfileSettingsScreen.js) kết hợp khối "Profile card" và khối "Settings list" hiện đại.
   - Sử dụng Flexbox chuẩn chỉ (`flexDirection`, `justifyContent: 'space-evenly'`, `alignItems: 'center'`, `flex: 1`, `gap: 24`).
   - Tự động thích ứng đa màn hình (Responsive):
     - **Màn hình nhỏ (Phone, w < 700px):** Bố cục 1 cột xếp chồng dọc (`flexDirection: 'column'`).
     - **Màn hình lớn (Tablet / Landscape, w >= 700px):** Bố cục 2 cột song song (`flexDirection: 'row'`), Profile Card cố định bên trái, Settings List dãn rộng chiếm trọn bên phải.
   - 📸 **[Ảnh màn hình nhỏ: anh_profile_settings_small.png](./Ảnh/anh_profile_settings_small.png)**.
   - 📸 **[Ảnh màn hình lớn: anh_profile_settings_large.png](./Ảnh/anh_profile_settings_large.png)**.

---

## 🚀 Hướng dẫn chạy thử dự án

```bash
# 1. Cài đặt dependencies (nếu chưa có node_modules ở thư mục cha)
npm install

# 2. Khởi động Metro Bundler
npx react-native start

# 3. Chạy trên Android / iOS
npx react-native run-android
# hoặc
npx react-native run-ios
```
