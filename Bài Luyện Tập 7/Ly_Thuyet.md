# BÀI LUYỆN TẬP 7 - PHẦN A: CÂU HỎI ÔN TẬP LÝ THUYẾT

---

## CÂU 1
> **Đề bài:**  
> Em hãy trình bày các giai đoạn chính trong vòng đời hoạt động của một component React Native. Trong phần trả lời cần làm rõ ba giai đoạn: mounting, updating và unmounting; đồng thời nêu vai trò của `render()`, `componentDidMount()`, `componentDidUpdate()`, `componentWillUnmount()` đối với Class Component.

### 1. Ba giai đoạn chính trong vòng đời (Component Lifecycle)

Vòng đời của một component trong React Native là chuỗi các thời điểm từ khi component được sinh ra, đưa vào giao diện, thay đổi trạng thái và cuối cùng bị xóa bỏ khỏi bộ nhớ. Chu kỳ này gồm **3 giai đoạn chính**:

```
+-----------------------------------------------------------------------------+
|                      CHU KỲ VÒNG ĐỜI CỦA COMPONENT                          |
+-----------------------------------------------------------------------------+
|                                                                             |
|  [ GIAI ĐOẠN 1: MOUNTING ]      [ GIAI ĐOẠN 2: UPDATING ]      [ GIAI ĐOẠN 3: UNMOUNTING ]
|  (Khởi tạo & Hiển thị)          (Cập nhật dữ liệu)             (Tháo gỡ & Hủy)
|            |                                |                                |
|            v                                v                                v
|      constructor()                   New Props / setState             componentWillUnmount()
|            |                                |                                |
|            v                                v                                v
|         render()                        render()                      (Dọn dẹp bộ nhớ,
|            |                                |                          hủy timers, listeners)
|            v                                v                                |
|   componentDidMount()               componentDidUpdate()                     x (Bị hủy)
+-----------------------------------------------------------------------------+
```

1. **Giai đoạn 1: Mounting (Khởi tạo & Gắn kết):**
   - Là thời điểm component được tạo ra lần đầu và gắn vào cây phân cấp giao diện (Native Component Tree) để hiển thị lên màn hình thiết bị.
2. **Giai đoạn 2: Updating (Cập nhật giao diện):**
   - Diễn ra khi dữ liệu của component thay đổi (do component cha truyền `Props` mới hoặc chính component gọi cập nhật `State`). Component sẽ được vẽ lại (Re-render) để phản ánh dữ liệu mới.
3. **Giai đoạn 3: Unmounting (Tháo gỡ & Hủy bỏ):**
   - Là thời điểm component bị loại bỏ hoàn toàn khỏi cây giao diện và bộ nhớ (ví dụ: người dùng chuyển sang màn hình khác, đóng modal/popup hoặc ẩn component theo điều kiện).

---

### 2. Vai trò của các phương thức vòng đời trong Class Component

| Phương thức | Giai đoạn | Vai trò kỹ thuật cụ thể |
| :--- | :---: | :--- |
| **`render()`** | Mounting & Updating | **Bắt buộc phải có:** Hàm này đọc `this.props` và `this.state` để trả về cấu trúc JSX mô tả giao diện cần vẽ. Đây phải là một hàm thuần khiết (Pure function), tuyệt đối không được gọi `setState()` bên trong `render()` vì sẽ gây ra vòng lặp vô tận (Infinite loop). |
| **`componentDidMount()`** | Mounting | **Chạy đúng 1 lần duy nhất** ngay sau khi component được render lần đầu lên màn hình. Đây là vị trí lý tưởng nhất để: gọi API lấy dữ liệu từ server, đăng ký lắng nghe sự kiện (Event Listeners), khởi tạo bộ đếm thời gian (Timers), hoặc lấy tọa độ GPS. |
| **`componentDidUpdate(prevProps, prevState)`** | Updating | **Chạy ngay sau mỗi lần component re-render** do props hoặc state thay đổi. Nhận vào tham số là props và state cũ, cho phép lập trình viên so sánh dữ liệu (`if (this.props.id !== prevProps.id)`) để gọi lại API mới hoặc tự động cuộn danh sách xuống dưới cùng. |
| **`componentWillUnmount()`** | Unmounting | **Chạy ngay trước khi component bị tiêu hủy.** Đóng vai trò là "người dọn dẹp": bắt buộc phải hủy các bộ đếm (`clearInterval`, `clearTimeout`), hủy đăng ký sự kiện (`removeEventListener`, ngắt kết nối WebSocket/Firebase) nhằm **ngăn ngừa triệt để lỗi rò rỉ bộ nhớ (Memory Leak)** và sập ứng dụng. |

---

## CÂU 2
> **Đề bài:**  
> Em hãy giải thích cách sử dụng `useEffect` trong Functional Component để thay thế hoặc mô phỏng các hành vi tương ứng với vòng đời component. Hãy phân biệt trường hợp `useEffect` chạy một lần sau lần render đầu tiên, chạy lại khi state hoặc props thay đổi, và thực hiện cleanup khi component bị tháo gỡ.

### 1. `useEffect` thay thế toàn bộ vòng đời truyền thống như thế nào?
Trong Functional Component hiện đại, Hook **`useEffect`** gom toàn bộ chức năng của `componentDidMount`, `componentDidUpdate`, và `componentWillUnmount` vào **một API duy nhất, thanh thoát và trực quan**. Thời điểm thực thi của `useEffect` được điều khiển hoàn toàn thông qua **mảng phụ thuộc (Dependency Array)** truyền vào tham số thứ hai.

---

### 2. Phân biệt 3 trường hợp hoạt động cốt lõi của `useEffect`

```javascript
useEffect(() => {
  // Logic thực thi (Tương ứng componentDidMount / componentDidUpdate)

  return () => {
    // Logic dọn dẹp (Tương ứng componentWillUnmount)
  };
}, [dependencies]);
```

| Trường hợp | Cú pháp mảng phụ thuộc | Cơ chế hoạt động & Ứng dụng thực tế |
| :--- | :---: | :--- |
| **1. Chạy 1 lần duy nhất sau render đầu tiên** *(Mô phỏng `componentDidMount`)* | **`[]`**<br>(Mảng rỗng) | **Cách hoạt động:** Callback chỉ thực thi duy nhất một lần sau khi component xuất hiện lần đầu trên màn hình.<br>**Ứng dụng:** Gọi API tải danh sách sản phẩm ban đầu, đọc dữ liệu lưu trữ cục bộ (`AsyncStorage`), kiểm tra phiên đăng nhập người dùng.<br>```jsx\nuseEffect(() => {\n  fetchDataFromAPI();\n}, []);\n``` |
| **2. Chạy lại khi State hoặc Props thay đổi** *(Mô phỏng `componentDidUpdate`)* | **`[propA, stateB]`**<br>(Liệt kê biến theo dõi) | **Cách hoạt động:** Luôn chạy ở lần đầu, và **chạy lại mỗi khi có bất kỳ giá trị nào trong mảng `[propA, stateB]` thay đổi** giữa các lần render.<br>**Ứng dụng:** Tìm kiếm tự động khi từ khóa `searchTerm` thay đổi; Tự động validate form khi người dùng nhập dữ liệu.<br>```jsx\nuseEffect(() => {\n  searchProducts(searchTerm);\n}, [searchTerm]);\n``` |
| **3. Thực hiện Cleanup khi component bị tháo gỡ** *(Mô phỏng `componentWillUnmount`)* | **Trả về một hàm `return () => {}`** | **Cách hoạt động:** Hàm dọn dẹp (Cleanup function) được React tự động kích hoạt ngay trước khi component bị hủy bỏ khỏi màn hình (hoặc trước khi chạy effect mới ở lần re-render tiếp theo).<br>**Ứng dụng:** Hủy bỏ bộ đếm thời gian, tắt âm thanh đang phát, ngắt kết nối WebSocket.<br>```jsx\nuseEffect(() => {\n  const timer = setInterval(() => tick(), 1000);\n  return () => clearInterval(timer); // Dọn dẹp\n}, []);\n``` |

> **Lưu ý đặc biệt:** Nếu **không truyền mảng phụ thuộc** (`useEffect(() => {})`), effect sẽ chạy lại sau **mọi lần render**. Trường hợp này rất hiếm khi dùng vì dễ gây suy giảm hiệu năng ứng dụng.

---

## CÂU 3
> **Đề bài:**  
> Em hãy trình bày khái niệm Controlled Component trong React Native. Vì sao nói giá trị của input trong Controlled Component luôn được kiểm soát bởi state của React? Hãy liên hệ với ví dụ sử dụng `TextInput`, `value`, `onChangeText`, `useState` và hàm cập nhật state.

### 1. Khái niệm Controlled Component (Thành phần được kiểm soát)
- **Định nghĩa:** Trong React Native, **Controlled Component** là một component nhập liệu (phổ biến nhất là `<TextInput>`) mà giá trị văn bản hiển thị bên trong ô nhập **luôn luôn được ràng buộc và quản lý trực tiếp bởi State của React**.
- **Nguyên lý "Single Source of Truth" (Nguồn chân lý duy nhất):** Thay vì để cho hệ điều hành di động tự ý lưu giữ chuỗi ký tự mà người dùng vừa gõ vào ô nhập, React nắm giữ toàn quyền kiểm soát chuỗi ký tự này trong biến State. Ô nhập chỉ đơn thuần là một "tấm gương phản chiếu" giá trị của State lên màn hình.

---

### 2. Vì sao nói giá trị input luôn được kiểm soát bởi State?

Quá trình nhập liệu trong Controlled Component vận hành theo một **vòng lặp 2 chiều khép kín (Two-way Data Binding Flow)**:

```
[1. Người dùng gõ một ký tự vào bàn phím (ví dụ: chữ 'A')]
                         |
                         v
[2. Kích hoạt sự kiện onChangeText={(text) => setKeyword(text)}]
                         |
                         v
[3. Hàm setKeyword cập nhật State -> React lên lịch Re-render]
                         |
                         v
[4. TextInput nhận giá trị mới từ thuộc tính value={keyword}]
                         |
                         v
[5. Ký tự 'A' chính thức hiển thị lên ô nhập trên màn hình]
```

Nếu lập trình viên không gọi `setKeyword(text)` trong sự kiện `onChangeText`, hoặc cố tình gán `value="Cố định"`, thì dù người dùng có bấm bàn phím liên tục, nội dung trong ô nhập vẫn **hoàn toàn không đổi**. Điều này chứng minh ô input không tự quyết định giá trị của nó mà phải hoàn toàn phụ thuộc vào State của React.

---

### 3. Ví dụ minh họa thực tế bằng code:

```jsx
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const SearchBox = () => {
  // Khai báo state lưu trữ nội dung ô nhập
  const [keyword, setKeyword] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nhập từ khóa tìm kiếm..."
        value={keyword}                    // 1. Ràng buộc hiển thị từ State
        onChangeText={(text) => setKeyword(text)} // 2. Lắng nghe gõ phím & cập nhật State
      />
      <Text style={styles.resultText}>Từ khóa hiện tại: {keyword}</Text>
    </View>
  );
};
```

---

## CÂU 4
> **Đề bài:**  
> Em hãy phân tích lợi ích của Controlled Component trong việc xử lý dữ liệu nhập từ người dùng. Trong câu trả lời cần nêu được vì sao Controlled Component giúp đồng bộ dữ liệu, dễ kiểm tra dữ liệu nhập, dễ thực hiện validation và dễ cập nhật giao diện theo state.

### Bốn lợi ích chiến lược của Controlled Component

#### 1. Đồng bộ dữ liệu tức thì (Instant Data Synchronization):
- Dữ liệu người dùng gõ vào và biến State trong mã JavaScript luôn trùng khớp nhau 100% tại mọi phần nghìn giây.
- Khi người dùng bấm nút "Gửi", ứng dụng không cần phải dùng các câu lệnh truy vấn phần tử (như `ref.current.getText()` hay tìm ID) để "mò" xem người dùng đã gõ cái gì, mà chỉ việc lấy ngay giá trị đã có sẵn trong State để gửi lên máy chủ API.

#### 2. Dễ dàng kiểm tra và tiền xử lý dữ liệu nhập (Input Formatting & Masking):
- Vì mọi ký tự đều phải đi qua hàm cập nhật state trước khi hiển thị, lập trình viên có thể can thiệp, biến đổi hoặc ngăn chặn dữ liệu không hợp lệ ngay lập tức:
  - **Tự động viết hoa:** `onChangeText={(text) => setCode(text.toUpperCase())}`
  - **Chặn ký tự chữ khi nhập số điện thoại:** Lọc bỏ mọi ký tự không phải số trước khi lưu vào state.
  - **Định dạng tiền tệ tự động:** Tự động chèn dấu chấm phân cách hàng nghìn khi người dùng gõ số tiền.

#### 3. Dễ thực hiện Validation theo thời gian thực (Real-time Validation):
- Ứng dụng có thể kiểm tra lỗi ngay trong lúc người dùng đang gõ phím (In-line validation) thay vì đợi bấm nút nộp mới báo lỗi:
  - Kiểm tra email có chứa ký tự `@` và tên miền hợp lệ hay chưa.
  - Kiểm tra độ dài mật khẩu có đủ 6 ký tự hay không.
  - Khi phát hiện sai định dạng, State lỗi (`error`) lập tức được cập nhật, đổi màu viền ô nhập từ Xám sang Đỏ và hiển thị dòng cảnh báo bên dưới.

#### 4. Dễ dàng điều khiển và cập nhật giao diện theo State (UI Reactive State):
- Giao diện người dùng có thể phản hồi linh hoạt dựa trên dữ liệu nhập:
  - **Tự động kích hoạt/vô hiệu hóa nút bấm:** Nút "Đăng ký" có thể tự động mờ đi và bị vô hiệu hóa (`disabled={!isFormValid}`) nếu người dùng chưa điền đủ các trường bắt buộc.
  - **Thanh đo độ mạnh mật khẩu:** Hiển thị thanh màu Xanh/Vàng/Đỏ phản ánh độ mạnh của mật khẩu theo thời gian thực tương ứng với giá trị state của ô Password.

---

## CÂU 5
> **Đề bài:**  
> Em hãy giải thích khái niệm component lồng component trong React Native. Vì sao việc tách giao diện thành các component nhỏ như `Avatar`, `UserProfile` rồi lồng chúng lại với nhau giúp chương trình dễ quản lý, dễ tái sử dụng và dễ mở rộng hơn?

### 1. Khái niệm Component lồng Component (Nested Components / Component Composition)
- **Định nghĩa:** Là kỹ thuật kiến trúc trong đó một component lớn (Component cha) chứa đựng một hoặc nhiều component nhỏ hơn (Component con) bên trong cấu trúc JSX của nó.
- **Mô hình phân cấp:**
  ```text
  [HomeScreen (Cha)]
         |
         +---> [UserProfile (Con của HomeScreen, Cha của Avatar)]
                     |
                     +---> [Avatar (Con của UserProfile)]
                     +---> [Text: Tên người dùng]
                     +---> [Text: Tiểu sử / Bio]
  ```
- **Ví dụ:** Component `Avatar` chuyên trách vẽ ảnh bo tròn. Component `UserProfile` import `Avatar` vào để kết hợp với tên và tiểu sử. Màn hình `HomeScreen` lại import nhiều `UserProfile` để tạo thành danh sách người dùng.

---

### 2. Vì sao việc tách và lồng component giúp chương trình dễ quản lý, tái sử dụng và mở rộng?

1. **Dễ quản lý và tuân thủ nguyên lý Đơn trách nhiệm (Single Responsibility Principle):**
   - Thay vì nhồi nhét hàng trăm dòng mã định dạng hình ảnh, viền bo, xử lý ảnh lỗi, văn bản tên vào cùng một file, ta tách riêng `Avatar.js`.
   - File `Avatar.js` chỉ làm đúng 1 việc: hiển thị ảnh đại diện chuẩn kích thước.
   - File `UserProfile.js` chỉ làm đúng 1 việc: bố trí thông tin hồ sơ người dùng.
   - Khi có lỗi hiển thị ảnh, ta chỉ cần mở đúng file `Avatar.js` để sửa mà không sợ ảnh hưởng đến các phần khác.
2. **Khả năng tái sử dụng (Reusability) ở mức độ tối đa:**
   - Component `Avatar` sau khi viết xong có thể dùng ở khắp mọi nơi trong toàn bộ ứng dụng:
     - Dùng trong thẻ hồ sơ cá nhân (`UserProfile`).
     - Dùng góc trên thanh tiêu đề (`HeaderBar`).
     - Dùng trong từng dòng của danh sách bình luận (`CommentItem`).
     - Dùng trong danh sách bạn bè đang online (`FriendList`).
   - Ta chỉ cần truyền các props khác nhau (`imageUrl`, `size`) mà không cần viết lại mã style hay logic thẻ ảnh.
3. **Dễ dàng mở rộng và nâng cấp tính năng trong tương lai (Extensibility):**
   - Giả sử sau này ứng dụng cần bổ sung tính năng *"Chấm tròn màu xanh báo trạng thái Online"* cho ảnh đại diện.
   - Ta chỉ cần vào file `Avatar.js` thêm một thẻ `<View style={styles.onlineBadge} />`. **Ngay lập tức, tất cả các màn hình có sử dụng Avatar (từ UserProfile đến Comment) đều tự động có tính năng mới này** mà lập trình viên không phải đi sửa từng màn hình một.

---
*Tài liệu ôn tập Bài Luyện Tập 7 - Lập trình Di động Đa nền tảng với React Native.*
