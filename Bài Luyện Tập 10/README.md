# BÀI LUYỆN TẬP 10: REST API, IMAGE PICKER, GEOLOCATION VÀ ASYNCSTORAGE TRONG REACT NATIVE

Thư mục này chứa đầy đủ tài liệu lý thuyết chuyên sâu, mã nguồn thực hành hoàn thiện và bộ 3 ảnh minh chứng nộp bài theo đúng yêu cầu đề bài.

---

## 📁 Cấu trúc thư mục

```text
Bài Luyện Tập 10/
├── 📁 components/
│   ├── PostListScreen.js            # Bài 1 (Dễ): Màn hình gọi REST API (JSONPlaceholder) + FlatList
│   ├── CheckinInputScreen.js        # Bài 2 (TB): Chọn ảnh (Image Picker) + Lấy vị trí GPS + Lưu AsyncStorage
│   └── SavedDataScreen.js           # Bài 2 (TB): Màn hình "Saved data" đọc lại dữ liệu từ AsyncStorage
├── 📁 Ảnh/
│   ├── anh_api_posts.png            # 📸 Ảnh nộp Bài 1: Màn hình danh sách bài viết từ JSONPlaceholder
│   ├── anh_mini_app_input.png       # 📸 Ảnh nộp Bài 2: Thao tác chọn ảnh + định vị GPS + form lưu
│   └── anh_saved_data.png           # 📸 Ảnh nộp Bài 2: Màn hình Saved Data đọc dữ liệu từ AsyncStorage
├── 📄 App.js                        # Ứng dụng chính tích hợp thanh Tab Switcher chuyển đổi 3 màn hình
├── 📄 package.json                  # Cấu hình dự án (React Native & @react-native-async-storage/async-storage)
├── 📄 create_images_blt10.py        # Kịch bản Python tự động tạo ảnh minh chứng pixel-perfect
├── 📄 Ly_Thuyet.md                  # Lời giải chi tiết 5 câu hỏi lý thuyết chuyên sâu (Phần A)
├── 📄 Thuc_Hanh.md                  # Báo cáo thực hành chi tiết, phân tích mã nguồn và đính kèm ảnh (Phần B)
└── 📄 README.md                     # Hướng dẫn tổng quan & tra cứu nhanh
```

---

## 📌 Tóm tắt nội dung chính

### Phần A: Câu hỏi ôn tập lý thuyết ([Ly_Thuyet.md](./Ly_Thuyet.md))
1. **Câu 1:** Khái niệm API và REST API trong lập trình di động; Phân tích kiến trúc Stateless, HTTP Methods, JSON Format và tình huống gọi API lấy bài viết trong React Native.
2. **Câu 2:** So sánh chi tiết phương thức **GET vs POST** (Mục đích, vị trí truyền tham số, kích thước, tính an toàn, Idempotency và Caching); Thời điểm nên dùng GET và POST.
3. **Câu 3:** Vai trò của **Geolocation** (gọi xe, bản đồ, chấm công); Các vấn đề xin quyền hệ thống (`AndroidManifest.xml`, `Info.plist`, runtime permission) và bảo vệ quyền riêng tư người dùng.
4. **Câu 4:** Vai trò của **Image Picker**; Phân biệt giữa chức năng chọn ảnh từ thư viện (`launchImageLibrary`) và chụp ảnh bằng camera (`launchCamera`).
5. **Câu 5:** Vai trò của **AsyncStorage** trong lưu trữ dữ liệu cục bộ Persistent; Các hàm cơ bản (`setItem`, `getItem`, `removeItem`, `clear`) và các ví dụ thực tế (Token, User Preferences, History).

---

### Phần B: Bài tập luyện tập thực hành ([Thuc_Hanh.md](./Thuc_Hanh.md))
1. **Bài tập 1 (Mức độ dễ):**
   - Màn hình [PostListScreen.js](./components/PostListScreen.js) gọi REST API `https://jsonplaceholder.typicode.com/posts?_limit=15`.
   - Hiển thị danh sách bằng `FlatList` với tiêu đề (`title`) và tóm tắt (`body`).
   - Xử lý đủ 3 trạng thái: Đang tải (`ActivityIndicator`), Báo lỗi kết nối (`Retry button`), và Kéo xuống làm mới (`RefreshControl`).
   - 📸 **[Ảnh nộp: anh_api_posts.png](./Ảnh/anh_api_posts.png)**.
2. **Bài tập 2 (Mức độ trung bình):**
   - Mini App hoàn chỉnh gồm 2 màn hình:
     - [CheckinInputScreen.js](./components/CheckinInputScreen.js): Chọn ảnh avatar qua **Image Picker**, lấy tọa độ GPS chính xác qua **Geolocation**, nhập form và bấm lưu vào **AsyncStorage**.
     - [SavedDataScreen.js](./components/SavedDataScreen.js): Đọc lại dữ liệu từ AsyncStorage (`@checkin_records`, `@last_user`, `@is_logged_in`), hiển thị thẻ check-in và hỗ trợ xóa bản ghi.
   - 📸 **[Ảnh nộp chọn ảnh & GPS: anh_mini_app_input.png](./Ảnh/anh_mini_app_input.png)**.
   - 📸 **[Ảnh nộp đọc Saved Data: anh_saved_data.png](./Ảnh/anh_saved_data.png)**.

---

## 🚀 Hướng dẫn chạy thử dự án

```bash
# 1. Di chuyển vào thư mục Bài Luyện Tập 10
cd "C:\ReactNative\LuyenTap_Moblie\BT_Mobile\Bài Luyện Tập 10"

# 2. Cài đặt thư viện phụ thuộc (nếu cần)
npm install

# 3. Khởi động Metro Bundler
npx react-native start

# 4. Chạy trên Android / iOS
npx react-native run-android
# hoặc
npx react-native run-ios
```
