# BÀI LUYỆN TẬP 6 - PHẦN A: CÂU HỎI ÔN TẬP LÝ THUYẾT

---

## CÂU HỎI 1
> **Đề bài:**  
> Hãy trình bày khái niệm component trong React Native. Theo anh/chị, vì sao có thể xem component là các "khối xây dựng" cơ bản để tạo nên giao diện người dùng của một ứng dụng mobile?

### 1. Khái niệm Component trong React Native
- **Định nghĩa:** Trong React Native, **Component** là một đơn vị mã nguồn độc lập, tự quản lý và có khả năng tái sử dụng, đại diện cho một phần cụ thể của giao diện người dùng (UI) và hành vi tương tác liên quan.
- **Bản chất kỹ thuật:** Một component thực chất là một hàm JavaScript (hoặc lớp) nhận đầu vào là các thuộc tính (**Props**) và trả về cấu trúc phân cấp các phần tử hiển thị được viết bằng cú pháp **JSX** (như `<View>`, `<Text>`, `<Image>`, `<TouchableOpacity>`).
- **Phân loại:**
  - **Core Components:** Các thành phần có sẵn do React Native cung cấp (`View`, `Text`, `Image`, `ScrollView`, `FlatList`,...).
  - **Custom Components:** Các thành phần do lập trình viên tự định nghĩa bằng cách kết hợp các Core Components lại với nhau (ví dụ: `HeaderBar`, `ProductCard`, `LoginForm`).

---

### 2. Vì sao xem Component là các "khối xây dựng" (Building Blocks) của ứng dụng mobile?

Quan niệm coi Component là các "khối xây dựng" (tương tự như các khối đồ chơi xếp hình LEGO) xuất phát từ các lý do kiến trúc sau:

```
+-------------------------------------------------------------------------+
|                         ỨNG DỤNG MOBILE HOÀN CHỈNH                      |
|                                                                         |
|  [                     HeaderBar Component                   ]          |
|                                                                         |
|  [ BannerSlider Component                                    ]          |
|                                                                         |
|  [ ProductList Component                                     ]          |
|      +-- [ ProductCard Component #1 (Áo thun) ]                         |
|      +-- [ ProductCard Component #2 (Quần jean) ]                       |
|      +-- [ ProductCard Component #3 (Giày sneaker) ]                     |
|                                                                         |
|  [                     BottomTabBar Component                ]          |
+-------------------------------------------------------------------------+
```

1. **Nguyên lý phân rã và lắp ráp (Compositional Architecture):**
   - Một màn hình điện thoại phức tạp không bao giờ được viết dưới dạng một tệp mã nguồn khổng lồ hàng nghìn dòng. Thay vào đó, giao diện được phân rã thành các khối nhỏ độc lập: một nút bấm (`CustomButton`), một ô nhập liệu (`InputField`), một thanh điều hướng (`HeaderBar`). Sau đó, lập trình viên "lắp ráp" các khối nhỏ này lại để tạo nên màn hình hoàn chỉnh.
2. **Cấu trúc dạng cây phân cấp (Component Tree):**
   - Toàn bộ ứng dụng React Native là một cây phân cấp các component, bắt đầu từ gốc là `App` component, phân nhánh thành các màn hình con, và tận cùng là các thẻ hiển thị cơ bản. Cấu trúc này giúp luồng dữ liệu (Data Flow) di chuyển rõ ràng từ trên xuống dưới.
3. **Dễ kiểm soát độ phức tạp:**
   - Mỗi "khối xây dựng" chỉ tập trung giải quyết một nhiệm vụ duy nhất (Single Responsibility Principle). Khi cần chỉnh sửa giao diện của nút bấm, lập trình viên chỉ cần can thiệp vào đúng component nút bấm mà không làm ảnh hưởng hay xáo trộn toàn bộ bố cục của ứng dụng.

---

## CÂU HỎI 2
> **Đề bài:**  
> Hãy phân tích các đặc điểm chính của component như tính độc lập, tính tái sử dụng và tính đóng gói. Trong quá trình phát triển một ứng dụng React Native, các đặc điểm này giúp ích như thế nào cho việc quản lý và bảo trì mã nguồn?

### 1. Phân tích ba đặc điểm cốt lõi của Component

| Đặc điểm cốt lõi | Nội dung phân tích chuyên sâu |
| :--- | :--- |
| **1. Tính độc lập (Independence)** | - Mỗi component vận hành như một thực thể tự chủ. Nó sở hữu vòng đời riêng, logic xử lý riêng và không phụ thuộc trực tiếp vào trạng thái nội bộ của các component khác bên ngoài.<br>- Một component có thể bị xóa bỏ, thay thế hoặc di chuyển sang màn hình khác mà không làm hỏng ứng dụng. |
| **2. Tính tái sử dụng (Reusability)** | - Một component chỉ cần được viết mã một lần duy nhất nhưng có thể được triệu gọi và sử dụng ở vô số vị trí khác nhau trong toàn bộ dự án với các dữ liệu đầu vào (Props) khác nhau.<br>- Ví dụ: Component `ProductCard` được viết một lần nhưng được dùng lại ở Trang chủ, Trang danh mục, Trang yêu thích và Trang tìm kiếm. |
| **3. Tính đóng gói (Encapsulation)** | - Component che giấu toàn bộ cấu trúc mã JSX bên trong, các biến logic nội bộ (`state`), và bộ định kiểu (`StyleSheet.create`) của riêng nó.<br>- Thế giới bên ngoài chỉ tương tác với component thông qua giao diện công khai là **Props** và các sự kiện callback (như `onPress`). Style của component này không bao giờ bị "văng" sang làm hỏng style của component khác. |

---

### 2. Lợi ích đối với việc quản lý và bảo trì mã nguồn trong React Native

1. **Triệt tiêu mã nguồn trùng lặp (Nguyên lý DRY - Don't Repeat Yourself):**
   - Nếu không có tính tái sử dụng, để tạo 10 nút bấm giống nhau, lập trình viên phải copy-paste 10 đoạn mã JSX và style. Khi khách hàng yêu cầu đổi màu nút từ Xanh sang Đỏ, người lập trình phải sửa ở 10 nơi khác nhau (dễ bỏ sót). Với Component, chỉ cần sửa 1 dòng duy nhất trong file `Button.js`.
2. **Dễ dàng phân chia công việc trong đội ngũ (Team Collaboration):**
   - Nhiều lập trình viên có thể làm việc song song trên cùng một dự án mà không bị xung đột mã nguồn (Git Conflict): Lập trình viên A phụ trách viết `HeaderBar.js`, lập trình viên B làm `ProductCard.js`, lập trình viên C làm `Footer.js`.
3. **Kiểm thử và gỡ lỗi (Debugging & Testing) cục bộ nhanh chóng:**
   - Khi xảy ra lỗi hiển thị (ví dụ: định dạng giá tiền sai), lập trình viên khoanh vùng ngay lập tức lỗi nằm bên trong component hiển thị giá mà không cần phải lội qua hàng nghìn dòng mã của toàn bộ màn hình.
4. **Tái cấu trúc mã nguồn (Refactoring) an toàn:**
   - Tính đóng gói đảm bảo việc thay đổi logic nội bộ của một component con sẽ không gây ra lỗi dây chuyền (Side-effects) ngoài ý muốn lên các màn hình cha.

---

## CÂU HỎI 3
> **Đề bài:**  
> Hãy so sánh Functional Component và Class Component trong React Native. Theo anh/chị, vì sao hiện nay Functional Component thường được ưu tiên sử dụng hơn khi kết hợp với Hooks?

### 1. Bảng so sánh giữa Functional Component và Class Component

| Tiêu chí | Functional Component (Kết hợp Hooks) | Class Component (Truyền thống) |
| :--- | :--- | :--- |
| **Cú pháp định nghĩa** | Là một hàm JavaScript thuần túy:<br>`const MyComp = (props) => { ... }` | Là một lớp kế thừa từ `React.Component`: `class MyComp extends React.Component` |
| **Quản lý State** | Sử dụng Hook `useState` trực quan, linh hoạt, chia nhỏ state dễ dàng. | Sử dụng đối tượng `this.state = {}` và cập nhật thông qua `this.setState()`. |
| **Quản lý vòng đời (Lifecycle)** | Sử dụng Hook `useEffect` để gộp chung việc lắng nghe Mount, Update và Unmount. | Sử dụng các hàm vòng đời phức tạp: `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`. |
| **Từ khóa `this`** | **Hoàn toàn KHÔNG dùng `this`**, loại bỏ triệt để lỗi mất ngữ cảnh. | Bắt buộc phải dùng `this.props`, `this.state` và phải `bind(this)` cho các hàm sự kiện. |
| **Độ dài và độ phức tạp mã nguồn** | Ngắn gọn, súc tích hơn khoảng **30% - 50%**, dễ đọc và bảo trì. | Dài dòng, nhiều mã khuôn mẫu (boilerplate code), cấu trúc cồng kềnh. |
| **Tái sử dụng logic nghiệp vụ** | Cực kỳ mạnh mẽ thông qua việc tự viết **Custom Hooks**. | Khó khăn, phải dùng mô hình phức tạp như Higher-Order Components (HOC) hoặc Render Props. |

---

### 2. Vì sao hiện nay Functional Component là tiêu chuẩn thống trị tuyệt đối?

1. **Loại bỏ hoàn toàn "Cơn ác mộng" từ khóa `this`:**
   - Trong Class Component, lập trình viên thường xuyên gặp lỗi `TypeError: Cannot read property 'setState' of undefined` do quên không `bind(this)` trong hàm xử lý sự kiện. Functional Component chạy theo cơ chế Closures tự nhiên của JavaScript, giúp mã nguồn luôn ổn định và dễ hiểu.
2. **Sức mạnh đột phá của React Hooks (từ phiên bản React 16.8):**
   - Trước đây, người ta dùng Class chỉ vì Functional Component không thể lưu trữ State và không có hàm vòng đời. Với sự ra đời của **React Hooks** (`useState`, `useEffect`, `useCallback`, `useMemo`), Functional Component có thể làm được mọi thứ Class làm được, thậm chí làm tốt hơn và thanh thoát hơn rất nhiều.
3. **Gộp và tách logic nghiệp vụ theo tính năng thay vì theo vòng đời:**
   - Trong Class Component, một tác vụ gọi API phải bị xé vụn ra: khởi tạo trong `componentDidMount`, dọn dẹp timer trong `componentWillUnmount`.
   - Trong Functional Component, toàn bộ logic của một tính năng được gom gọn gàng trong **duy nhất một hàm `useEffect`**.
4. **Tối ưu hóa hiệu năng và dung lượng bundle:**
   - Functional Component chỉ là hàm thông thường nên công cụ đóng gói mã nguồn (Minifier/Metro Bundler) có thể nén mã tốt hơn, loại bỏ mã thừa (*Tree-shaking*) dễ dàng hơn so với các lớp Class phức tạp.

---

## CÂU HỎI 4
> **Đề bài:**  
> Hãy giải thích vai trò của `useState` trong Functional Component. Khi xây dựng một giao diện có dữ liệu thay đổi theo thao tác của người dùng, vì sao cần sử dụng state thay vì chỉ dùng biến thông thường?

### 1. Vai trò của `useState` trong Functional Component
- **Bản chất:** `useState` là một Hook cơ bản của React cho phép Functional Component khai báo và lưu trữ trạng thái dữ liệu nội tại của chính nó.
- **Cú pháp:**
  ```javascript
  const [stateValue, setStateFunction] = useState(initialValue);
  ```
  - `stateValue`: Biến đại diện cho giá trị trạng thái hiện tại.
  - `setStateFunction`: Hàm chuyên trách dùng để cập nhật giá trị mới cho state.
  - `initialValue`: Giá trị khởi tạo ban đầu khi component được render lần đầu.
- **Vai trò:** Giúp component "ghi nhớ" được các dữ liệu có tính chất biến đổi theo thời gian (ví dụ: nội dung người dùng gõ vào ô tìm kiếm, trạng thái bật/tắt của switch, số lượng hàng trong giỏ, danh sách bài viết tải về từ server).

---

### 2. Vì sao BẮT BUỘC phải dùng State thay vì biến thông thường (`let count = 0`)?

Đây là câu hỏi cốt lõi về cơ chế hoạt động của React. Nếu chỉ dùng biến thông thường, giao diện sẽ **hoàn toàn bất động** vì hai nguyên nhân chí mạng sau:

```
+-----------------------------------------------------------------------------+
|               SO SÁNH: BIẾN THÔNG THƯỜNG VS REACT STATE                     |
+-----------------------------------------------------------------------------+
| THAO TÁC CỦA USER | DÙNG BIẾN THƯỜNG (let count = 0) | DÙNG STATE (useState)|
+-------------------+----------------------------------+----------------------+
| 1. Bấm nút Tăng   | count = count + 1                | setCount(count + 1)  |
| 2. Giá trị biến   | Có tăng lên trong bộ nhớ RAM     | Có tăng lên          |
| 3. Giao diện UI   | ❌ ĐỨNG YÊN (Không Re-render)    | ✅ TỰ ĐỘNG VẼ LẠI    |
| 4. Lưu trữ dữ liệu| ❌ BỊ RESET về 0 khi có re-render| ✅ ĐƯỢC BẢO TOÀN     |
+-----------------------------------------------------------------------------+
```

1. **Biến thông thường thay đổi KHÔNG kích hoạt quá trình vẽ lại giao diện (Re-render):**
   - Khi người dùng bấm nút và ta thực hiện `count = count + 1`, giá trị biến `count` thực tế có tăng trong bộ nhớ RAM của máy tính. Tuy nhiên, React Native hoàn toàn **không nhận biết được** sự thay đổi này. Do đó, hệ thống không kích hoạt chu trình render lại, và con số hiển thị trên màn hình điện thoại vẫn mãi mãi đứng yên ở con số cũ.
   - Ngược lại, khi gọi `setCount(newValue)`, React nhận được tín hiệu thông báo: *"Dữ liệu đã thay đổi!"*. React sẽ tự động lên lịch chạy lại hàm Component, tính toán Virtual DOM mới và yêu cầu Native Thread cập nhật lại pixel hiển thị trên màn hình ngay lập tức.
2. **Biến thông thường bị "xóa sạch" (Reset) sau mỗi lần render:**
   - Mỗi lần component re-render, bản chất là toàn bộ hàm component được gọi thực thi lại từ đầu từ dòng 1 đến dòng cuối. Một biến khai báo thông thường `let count = 0;` sẽ bị khởi tạo lại về `0`, làm mất toàn bộ giá trị đã tích lũy trước đó.
   - `useState` sử dụng cơ chế nội bộ của React (gắn liền với cấu trúc dữ liệu Fiber) để lưu trữ giá trị state bên ngoài phạm vi của hàm. Nhờ đó, dù component có bị chạy lại hàng trăm lần, giá trị state vẫn được bảo toàn nguyên vẹn.

---

## CÂU HỎI 5
> **Đề bài:**  
> Hãy trình bày chức năng của `useEffect` trong React Native. Nêu một số tình huống thực tế có thể sử dụng `useEffect`, chẳng hạn như ghi log sau khi render, gọi API hoặc xử lý tác vụ phụ trong component.

### 1. Chức năng của `useEffect` trong React Native
- **Khái niệm:** `useEffect` là Hook dùng để thực thi các **tác vụ phụ (Side Effects)** bên trong Functional Component.
- **Tác vụ phụ (Side Effect) là gì?**  
  Trong triết lý của React, một hàm component phải là "hàm thuần khiết" (Pure Function) – tức là chỉ nhận Props/State và trả về JSX hiển thị. Mọi hành động làm thay đổi thế giới bên ngoài hoặc không liên quan trực tiếp đến việc tính toán JSX đều được coi là tác vụ phụ, bao gồm: gọi mạng (API), truy cập bộ nhớ máy, hẹn giờ (Timer), đăng ký lắng nghe sự kiện thiết bị.
- **Cú pháp chuẩn:**
  ```javascript
  useEffect(() => {
    // 1. Mã thực thi tác vụ phụ (Side Effect logic)

    return () => {
      // 2. Hàm dọn dẹp (Cleanup function) khi component bị hủy (Unmount)
    };
  }, [dependencies]); // Mảng phụ thuộc kiểm soát thời điểm chạy
  ```

---

### 2. Các tình huống thực tế thường gặp khi sử dụng `useEffect`

#### a. Gọi API lấy dữ liệu từ máy chủ khi màn hình vừa mở (Fetch Data on Mount)
- **Tình huống:** Khi người dùng vừa mở màn hình danh sách sản phẩm, ứng dụng cần gọi API lên Server để tải dữ liệu về.
- **Cách áp dụng:** Truyền mảng phụ thuộc rỗng `[]` để `useEffect` chỉ chạy **duy nhất một lần** sau lần render đầu tiên:
```jsx
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await fetch('https://api.example.com/products');
      const data = await response.json();
      setProducts(data); // Lưu vào state để cập nhật giao diện
    } catch (error) {
      console.error("Lỗi tải sản phẩm:", error);
    }
  };

  fetchProducts();
}, []); // [] đảm bảo chỉ chạy 1 lần khi màn hình xuất hiện
```

#### b. Ghi nhận nhật ký phân tích hoặc theo dõi hành vi (Analytics & Logging)
- **Tình huống:** Gửi log báo cáo hành vi người dùng lên hệ thống phân tích (Google Firebase Analytics) mỗi khi người dùng thay đổi bộ lọc tìm kiếm:
```jsx
useEffect(() => {
  console.log(`[ANALYTICS] Người dùng đã đổi từ khóa tìm kiếm thành: ${searchTerm}`);
  // Gửi sự kiện tracking lên Firebase
}, [searchTerm]); // Chạy lại mỗi khi giá trị searchTerm thay đổi
```

#### c. Thiết lập bộ đếm thời gian hoặc lắng nghe cảm biến thiết bị kèm hàm dọn dẹp (Cleanup Function)
- **Tình huống:** Làm tính năng đếm ngược đồng hồ (Countdown Timer) hoặc lắng nghe sự kiện xoay màn hình/bàn phím xuất hiện. Bắt buộc phải có **hàm Cleanup** để dọn dẹp bộ nhớ khi người dùng thoát màn hình, tránh lỗi rò rỉ bộ nhớ (*Memory Leak*):
```jsx
useEffect(() => {
  // Bật bộ đếm mỗi giây tăng 1 đơn vị
  const timerId = setInterval(() => {
    setSeconds(prev => prev + 1);
  }, 1000);

  // Hàm dọn dẹp (Cleanup): Tự động kích hoạt khi người dùng rời khỏi màn hình này
  return () => {
    clearInterval(timerId); // Hủy bộ đếm hẹn giờ để tránh tốn pin và rò rỉ RAM
  };
}, []);
```

---
*Tài liệu ôn tập Bài Luyện Tập 6 - Lập trình Di động Đa nền tảng với React Native.*
