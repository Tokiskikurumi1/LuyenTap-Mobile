# BÀI LUYỆN TẬP 10: PHẦN A - CÂU HỎI ÔN TẬP LÝ THUYẾT

---

## CÂU HỎI 1: KHÁI NIỆM API, REST API VÀ VÍ DỤ TÌNH HUỐNG TRONG REACT NATIVE CẦN GỌI API

### 1. Khái niệm API trong lập trình ứng dụng di động
- **API (Application Programming Interface - Giao diện lập trình ứng dụng):** Là một tập hợp các quy tắc, giao thức và công cụ định nghĩa cách thức mà các phần mềm hoặc các thành phần hệ thống khác nhau có thể giao tiếp, trao đổi dữ liệu với nhau.
- **Trong lập trình ứng dụng di động:** Thiết bị di động (smartphone/tablet) thường bị giới hạn về tài nguyên phần cứng, dung lượng lưu trữ và tính bảo mật. Do đó, hầu hết cơ sở dữ liệu và nghiệp vụ phức tạp (thanh toán, xử lý ảnh AI, thuật toán gợi ý) được đặt tại máy chủ (Backend Server). API đóng vai trò là "cầu nối" trung gian, cho phép ứng dụng di động (Client) gửi yêu cầu (Request) và nhận phản hồi dữ liệu (Response) từ Backend một cách an toàn và chuẩn hóa.

---

### 2. REST API là gì?
- **REST (Representational State Transfer):** Là một kiểu kiến trúc thiết kế phần mềm mạng dựa trên các chuẩn giao thức web mở (chủ yếu là HTTP/HTTPS).
- **RESTful API:** Là hệ thống API tuân theo các nguyên tắc ràng buộc của kiến trúc REST:
  1. **Stateless (Phi trạng thái):** Mỗi request từ client gửi lên máy chủ phải chứa đầy đủ mọi thông tin cần thiết để máy chủ hiểu và xử lý. Máy chủ không lưu trữ ngữ cảnh phiên làm việc của client giữa các request.
  2. **Client-Server Architecture:** Tách biệt hoàn toàn giữa giao diện người dùng (React Native) và tầng lưu trữ dữ liệu (Node.js, Java Spring, Python Django, Go,...).
  3. **Định danh tài nguyên bằng URI (Uniform Resource Identifier):** Mọi thực thể dữ liệu (Users, Posts, Products) đều được xem là tài nguyên và định danh bằng một đường dẫn duy nhất, ví dụ: `https://api.example.com/api/v1/posts`.
  4. **Sử dụng các phương thức chuẩn của HTTP:** `GET` (Đọc/Lấy dữ liệu), `POST` (Tạo mới), `PUT`/`PATCH` (Cập nhật), `DELETE` (Xóa).
  5. **Định dạng dữ liệu trao đổi:** Chủ yếu sử dụng **JSON (JavaScript Object Notation)** vì tính nhẹ, cấu trúc rõ ràng và được JavaScript/React Native hỗ trợ phân tích cú pháp (parse) tự nhiên rất nhanh.

---

### 3. Ví dụ tình huống thực tế trong React Native cần gọi API để lấy dữ liệu từ máy chủ
- **Tình huống:** Màn hình bảng tin mạng xã hội hoặc trang chủ ứng dụng tin tức (News Feed / Blog App).
  - Khi người dùng mở ứng dụng hoặc thực hiện thao tác vuốt xuống để làm mới (Pull-to-refresh), ứng dụng React Native cần lấy 20 bài viết mới nhất.
  - Mã nguồn React Native sử dụng hàm `fetch()` hoặc thư viện `axios` để gửi HTTP GET Request:
    ```javascript
    fetch('https://jsonplaceholder.typicode.com/posts?_page=1&_limit=20')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => setError('Không thể tải bài viết'));
    ```
  - Máy chủ xử lý truy vấn cơ sở dữ liệu và trả về mảng đối tượng JSON chứa danh sách bài viết (`id`, `title`, `body`, `author`).
  - React Native nhận dữ liệu và gán vào State để hiển thị danh sách lên màn hình thông qua component `FlatList`.

---

## CÂU HỎI 2: PHÂN BIỆT PHƯƠNG THỨC GET VÀ POST KHI LÀM VIỆC VỚI API. KHI NÀO NÊN DÙNG GET, KHI NÀO NÊN DÙNG POST?

### 1. Bảng so sánh chi tiết phương thức GET và POST

| Tiêu chí | Phương thức GET | Phương thức POST |
| :--- | :--- | :--- |
| **Mục đích chính** | **Truy xuất / Lấy dữ liệu** từ máy chủ về thiết bị. | **Gửi / Ghi dữ liệu mới** lên máy chủ để xử lý hoặc lưu trữ. |
| **Vị trí truyền dữ liệu** | Đính kèm trực tiếp trên URL dưới dạng Query Parameters (`?key=value&page=1`). | Đóng gói an toàn bên trong phần thân yêu cầu (**Request Body**). |
| **Tính an toàn & Riêng tư** | **Thấp hơn**: Dữ liệu hiển thị rõ trên thanh địa chỉ, lịch sử duyệt web và log của server. | **Cao hơn**: Dữ liệu được giấu trong body, không lộ trên URL, mã hóa qua HTTPS. |
| **Giới hạn kích thước** | Bị giới hạn độ dài URL (thường từ 2048 đến 8192 ký tự tùy trình duyệt/server). | Không bị giới hạn độ dài URL; có thể gửi file lớn, ảnh, video, dữ liệu nhị phân. |
| **Tính Idempotent (Bất biến kết quả)** | **Có (Idempotent)**: Gọi lặp lại nhiều lần với cùng tham số sẽ luôn cho cùng một kết quả mà không làm thay đổi trạng thái server. | **Không (Non-idempotent)**: Mỗi lần gọi POST có thể tạo thêm một bản ghi mới trong cơ sở dữ liệu. |
| **Khả năng Cache (Lưu đệm)** | Có thể được lưu cache tự động bởi trình duyệt, CDN hoặc HTTP client. | Mặc định không được lưu cache. |

---

### 2. Khi nào nên sử dụng GET trong ứng dụng di động?
- Sử dụng khi thao tác chỉ nhằm mục đích **đọc hoặc tìm kiếm thông tin** mà không làm thay đổi, thêm mới hay xóa dữ liệu trên hệ thống máy chủ:
  1. Lấy danh sách sản phẩm, tin tức, thông báo (`GET /api/v1/articles`).
  2. Lấy thông tin chi tiết của một đối tượng theo ID (`GET /api/v1/users/123`).
  3. Tìm kiếm, lọc và phân trang dữ liệu (`GET /api/v1/products?search=macbook&page=2&sort=asc`).

---

### 3. Khi nào nên sử dụng POST trong ứng dụng di động?
- Sử dụng khi cần **tạo mới tài nguyên, gửi dữ liệu nhạy cảm hoặc tải lên tập tin có dung lượng lớn**:
  1. **Đăng nhập / Đăng ký tài khoản:** Tuyệt đối không dùng GET vì sẽ làm lộ mật khẩu trên URL log server. Phải dùng `POST /api/v1/auth/login` với body `{ email, password }`.
  2. **Tạo đơn hàng, thanh toán:** Gửi thông tin giỏ hàng và thẻ tín dụng (`POST /api/v1/orders`).
  3. **Tải lên tập tin đa phương tiện:** Tải ảnh avatar, video hoặc tài liệu (`POST /api/v1/upload` dùng `FormData` đa phần).
  4. **Thực hiện các tác vụ tính toán phức tạp:** Khi các tham số lọc quá dài và phức tạp vượt quá giới hạn ký tự của URL.

---

## CÂU HỎI 3: VAI TRÒ CỦA GEOLOCATION TRONG ỨNG DỤNG DI ĐỘNG VÀ CÁC VẤN ĐỀ QUYỀN TRUY CẬP, QUYỀN RIÊNG TƯ

### 1. Vai trò của Geolocation trong ứng dụng di động
- **Geolocation (Định vị địa lý):** Là tính năng cho phép ứng dụng di động xác định tọa độ địa lý thực tế của thiết bị (bao gồm Vĩ độ - `Latitude`, Kinh độ - `Longitude`, Độ cao - `Altitude`, Tốc độ di chuyển - `Speed`) thông qua sự kết hợp của GPS phần cứng, mạng di động (Cell Towers) và sóng Wi-Fi.
- **Ứng dụng tiêu biểu trong thực tế:**
  - **Gọi xe & Giao đồ ăn (Ride-hailing & Food Delivery):** Grab, Gojek, ShopeeFood tự động định vị vị trí đón khách hoặc giao món ăn.
  - **Bản đồ & Điều hướng giao thông (Maps & Navigation):** Google Maps, Apple Maps hướng dẫn chỉ đường theo thời gian thực.
  - **Điểm danh & Chấm công (Geofencing):** Ứng dụng doanh nghiệp kiểm tra nhân viên có mặt đúng trong bán kính công ty.
  - **Thương mại điện tử & Dịch vụ địa phương:** Hiển thị danh sách cửa hàng, chi nhánh ngân hàng hoặc cây ATM gần vị trí người dùng nhất.

---

### 2. Các vấn đề cần xử lý khi lấy vị trí người dùng (Quyền truy cập & Quyền riêng tư)

#### A. Xử lý quyền truy cập hệ thống (Permissions Handling)
- **Khai báo quyền trong file cấu hình gốc:**
  - **Android (`AndroidManifest.xml`):** Cần khai báo quyền vị trí xấp xỉ `ACCESS_COARSE_LOCATION` (dùng Wi-Fi/Cellular) hoặc quyền chính xác cao `ACCESS_FINE_LOCATION` (dùng GPS). Nếu cần lấy vị trí ngầm khi app đóng, phải khai báo thêm `ACCESS_BACKGROUND_LOCATION`.
  - **iOS (`Info.plist`):** Bắt buộc phải có các khóa mô tả rõ mục đích sử dụng vị trí (nếu không có app sẽ bị từ chối duyệt App Store ngay lập tức):
    - `NSLocationWhenInUseUsageDescription`: Lý do cần lấy vị trí khi mở app.
    - `NSLocationAlwaysAndWhenInUseUsageDescription`: Lý do cần theo dõi vị trí nền.
- **Yêu cầu cấp quyền động tại thời điểm chạy (Runtime Permission Request):**
  - Không được gọi hàm lấy tọa độ ngay khi người dùng chưa đồng ý cấp quyền. Phải kiểm tra trạng thái (`PermissionsAndroid.request()` trên Android hoặc thư viện `react-native-permissions`).
  - Xử lý các tình huống: Người dùng cho phép, người dùng từ chối 1 lần ("Ask every time"), hoặc từ chối vĩnh viễn ("Never ask again" -> hướng dẫn người dùng mở cài đặt thiết bị).

#### B. Đảm bảo quyền riêng tư và minh bạch thông tin (Privacy & Transparency)
- **Nguyên tắc "Just-in-Time" & Giải thích rõ ràng:** Ứng dụng chỉ xin quyền vị trí tại đúng thời điểm người dùng kích hoạt tính năng cần đến nó (ví dụ: bấm vào nút "Tìm quán gần tôi"), kèm thông báo nêu rõ vị trí được dùng làm gì.
- **Tuân thủ quy định bảo vệ dữ liệu (GDPR, Apple Privacy Manifest, Google Play Policy):**
  - Không thu thập dữ liệu vị trí khi không cần thiết.
  - Không truyền tọa độ của người dùng lên server một cách không mã hóa.
  - Không chia sẻ dữ liệu vị trí người dùng cho bên thứ ba vì mục đích quảng cáo mà không có sự đồng thuận rõ ràng.
- **Tối ưu hóa tiêu hao pin (Battery Drain):** Chế độ GPS chính xác cao (`enableHighAccuracy: true`) tiêu tốn rất nhiều pin và làm nóng máy. Ứng dụng cần thiết lập `timeout` hợp lý, hủy lắng nghe định vị (`clearWatch`) ngay khi component bị unmount.

---

## CÂU HỎI 4: VAI TRÒ CỦA IMAGE PICKER TRONG REACT NATIVE VÀ SO SÁNH CHỨC NĂNG CHỌN ẢNH TỪ THƯ VIỆN VÀ CHỤP ẢNH BẰNG CAMERA

### 1. Vai trò của Image Picker trong React Native
- **Image Picker** là module/thư viện chuyên dụng (phổ biến nhất là `react-native-image-picker`) cung cấp giao diện chuẩn để ứng dụng React Native tương tác với hệ thống tập tin media và phần cứng quang học của thiết bị di động.
- **Vai trò chính:**
  - Cho phép người dùng tải lên ảnh đại diện (Avatar), ảnh bìa cá nhân.
  - Tải ảnh đính kèm bài viết, bình luận, chat hỗ trợ khách hàng.
  - Chụp ảnh giấy tờ tùy thân (CCCD, Bằng lái xe) phục vụ xác thực danh tính điện tử (eKYC).
  - Tự động hỗ trợ tiền xử lý ảnh: Cắt ảnh (Crop), nén giảm kích thước (maxWidth, maxHeight, quality), và chuyển đổi định dạng URI hoặc Base64.

---

### 2. Bảng so sánh chi tiết: Chọn ảnh từ thư viện vs Chụp ảnh bằng camera

| Tiêu chí so sánh | Chọn ảnh từ thư viện (Gallery / Photo Library) | Chụp ảnh bằng camera (Camera Capture) |
| :--- | :--- | :--- |
| **Phương thức gọi hàm** | `launchImageLibrary(options, callback)` | `launchCamera(options, callback)` |
| **Phần cứng tương tác** | Bộ nhớ lưu trữ tập tin của máy (Internal/External Storage, Photos). | Ống kính quang học, cảm biến Camera vật lý và đèn Flash. |
| **Quyền hệ thống yêu cầu** | - Android: `READ_MEDIA_IMAGES` (Android 13+) hoặc `READ_EXTERNAL_STORAGE`.<br>- iOS: `NSPhotoLibraryUsageDescription`. | - Android: `android.permission.CAMERA` + `WRITE_EXTERNAL_STORAGE`.<br>- iOS: `NSCameraUsageDescription`. |
| **Tính thời điểm của ảnh** | Dữ liệu hình ảnh **đã có sẵn từ trước** trong album máy; có thể tải về từ internet hoặc chụp từ lâu. | Hình ảnh **được ghi lại theo thời gian thực ngay lúc đó**. |
| **Khả năng xác thực & Chống gian lận** | Dễ bị giả mạo hoặc chỉnh sửa bằng phần mềm đồ họa trước khi tải lên. | Độ tin cậy cao, đảm bảo người dùng đang thao tác trực tiếp tại hiện trường. |
| **Trường hợp áp dụng lý tưởng** | - Cập nhật ảnh avatar nghệ thuật.<br>- Đăng album ảnh du lịch, sản phẩm bán hàng có sẵn. | - Xác thực khuôn mặt chấm công, eKYC ngân hàng.<br>- Quét mã QR, chụp hóa đơn thực tế, chụp ảnh hiện trường bảo hiểm. |

---

## CÂU HỎI 5: VAI TRÒ CỦA ASYNCSTORAGE TRONG LƯU TRỮ CỤC BỘ, CÁC THAO TÁC CƠ BẢN VÀ VÍ DỤ THỰC TẾ

### 1. Vai trò của AsyncStorage trong lưu trữ dữ liệu cục bộ
- **AsyncStorage** là hệ thống lưu trữ dữ liệu cục bộ dạng **Key-Value (Khóa - Giá trị)**, bất đồng bộ (Asynchronous) và tồn tại vĩnh viễn (Persistent) trên thiết bị di động của người dùng (tương tự như `localStorage` trên trình duyệt web).
- **Đặc điểm cốt lõi:**
  - **Lưu trữ dữ liệu dạng chuỗi (String only):** Mọi kiểu dữ liệu phức tạp (Object, Array, Boolean, Number) bắt buộc phải được tuần tự hóa thành chuỗi qua `JSON.stringify()` trước khi lưu, và dùng `JSON.parse()` khi đọc ra.
  - **Bất đồng bộ:** Mọi phương thức của AsyncStorage đều trả về một `Promise`, không làm khóa (block) luồng giao diện người dùng (UI Thread) khi đọc/ghi file.
  - **Tồn tại qua các phiên làm việc:** Dữ liệu vẫn được giữ nguyên ngay cả khi người dùng tắt hẳn ứng dụng (Kill app) hoặc khởi động lại điện thoại.

---

### 2. Các thao tác cơ bản với AsyncStorage (`@react-native-async-storage/async-storage`)

```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. Lưu dữ liệu (Set Item)
const saveData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error('Lỗi khi lưu dữ liệu:', error);
  }
};

// 2. Đọc dữ liệu (Get Item)
const loadData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Lỗi khi đọc dữ liệu:', error);
  }
};

// 3. Xóa một mục cụ thể (Remove Item)
const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Lỗi khi xóa dữ liệu:', error);
  }
};

// 4. Xóa sạch toàn bộ dữ liệu (Clear Storage)
const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Lỗi khi xóa sạch storage:', error);
  }
};
```

---

### 3. Ví dụ dữ liệu thực tế có thể lưu bằng AsyncStorage
1. **Trạng thái xác thực & Token đăng nhập:**
   - Khóa: `'user_token'` -> Giá trị: chuỗi JWT `'eyJhbGciOiJIUzI1Ni...'`.
   - Khóa: `'is_logged_in'` -> Giá trị: `'true'`. Khi người dùng mở lại app, ứng dụng kiểm tra khóa này để tự động đưa vào màn hình Home mà không cần đăng nhập lại.
2. **Cài đặt cá nhân hóa của người dùng (User Preferences):**
   - Khóa: `'app_theme'` -> Giá trị: `'dark'` hoặc `'light'`.
   - Khóa: `'language'` -> Giá trị: `'vi'` hoặc `'en'`.
3. **Bộ nhớ đệm thông tin người dùng (Cached User Profile):**
   - Khóa: `'user_profile'` -> Lưu đối tượng `{ id: 1, name: "Nguyễn Minh Nhật", email: "nhat@example.com" }`. Giúp hiển thị thông tin ngay tức thì khi chưa kịp có mạng gọi API.
4. **Lịch sử tìm kiếm gần đây (Recent Search History):**
   - Khóa: `'search_history'` -> Mảng `["React Native", "Flexbox layout", "AsyncStorage"]`.
5. **Ghi chú cá nhân offline & Cờ hướng dẫn ban đầu (Onboarding Flag):**
   - Khóa: `'has_seen_onboarding'` -> Giá trị: `'true'` để tránh hiển thị lại slide giới thiệu ở các lần mở app tiếp theo.
