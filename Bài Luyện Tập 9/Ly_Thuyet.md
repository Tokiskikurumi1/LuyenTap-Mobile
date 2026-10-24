# BÀI LUYỆN TẬP 9: PHẦN A - CÂU HỎI ÔN TẬP LÝ THUYẾT

---

## CÂU HỎI 1: VAI TRÒ CỦA STYLESHEET VÀ VÌ SAO NÊN ƯU TIÊN SỬ DỤNG `StyleSheet.create()` THAY VÌ INLINE STYLE?

### 1. Vai trò của `StyleSheet` trong React Native
Trong React Native, `StyleSheet` là một abstraction module cốt lõi được cung cấp trực tiếp bởi thư viện `react-native`, đóng vai trò tương tự như bộ tiền xử lý và tối ưu hóa CSS trong môi trường mobile app native:
- **Tập trung hóa định nghĩa giao diện (Centralized Styling):** Cho phép nhóm toàn bộ các thuộc tính styling (màu sắc, kích thước, flexbox, border, khoảng cách) vào một đối tượng có cấu trúc rõ ràng thay vì rải rác bên trong JSX.
- **Tách biệt mối bận tâm (Separation of Concerns):** Giúp tách biệt rõ ràng giữa logic hiển thị (JSX/UI components) và thẩm mỹ giao diện (style rules), giúp mã nguồn dễ đọc, dễ kiểm thử và bảo trì lâu dài.
- **Tối ưu hóa hiệu năng Native (Performance Optimization):** `StyleSheet.create()` xử lý các khai báo kiểu dáng, gán ID định danh duy nhất (Style ID) và chuyển dữ liệu sang Native Bridge một lần duy nhất, tránh việc gửi lại toàn bộ object JSON qua cầu nối JS-Native trong mỗi chu kỳ render.
- **Kiểm tra tính hợp lệ thuộc tính tĩnh (Validation & Type Checking):** `StyleSheet.create()` thực hiện kiểm tra thuộc tính style ngay tại thời điểm biên dịch/khởi tạo mã. Nếu lập trình viên gõ sai tên thuộc tính (ví dụ `font_size` thay vì `fontSize`) hoặc truyền sai kiểu dữ liệu, React Native sẽ báo lỗi đỏ trực tiếp (Redbox / Console warning) ngay lập tức thay vì âm thầm bỏ qua như inline style thông thường.

---

### 2. So sánh chuyên sâu: `StyleSheet.create()` vs Inline Style

| Tiêu chí | `StyleSheet.create()` | Inline Style (`style={{ ... }}`) |
| :--- | :--- | :--- |
| **Cơ chế cấp phát bộ nhớ** | Tạo đối tượng **1 lần duy nhất** khi file module được nạp vào bộ nhớ. | Tạo mới một **Object literal mới trong Heap memory** ở mỗi lần component render/re-render. |
| **Tác động đến Garbage Collector (GC)** | Ổn định, không sinh rác bộ nhớ thừa, tránh hiện tượng giật lag khung hình (FPS drops). | Ép Garbage Collector hoạt động liên tục để dọn dẹp các object style cũ bị hủy sau mỗi frame. |
| **Tối ưu hóa Native Bridge** | Gửi thuộc tính sang Native Bridge 1 lần duy nhất và gán ID số nguyên; các lần sau chỉ cần tham chiếu ID. | Phải serialize toàn bộ object style thành chuỗi JSON và gửi qua bridge liên tục ở mỗi render. |
| **Khả năng tái sử dụng (Reusability)** | Rất cao; 1 style class có thể áp dụng cho hàng trăm phần tử trong `FlatList` hoặc nhiều component. | Kém; phải copy-paste hoặc định nghĩa lặp lại ở từng thẻ JSX. |
| **Tính rõ ràng & Tổ chức mã (Clean Code)** | Tách biệt logic và giao diện; JSX ngắn gọn, mạch lạc, dễ hiểu luồng hiển thị. | Làm JSX phình to, lộn xộn, khó theo dõi cấu trúc cây component. |
| **Kiểm tra lỗi (Validation)** | Bắt lỗi chính tả thuộc tính và kiểu dữ liệu ngay từ đầu. | Dễ phát sinh bug ẩn, khó debug trên diện rộng. |

---

### 3. Vì sao trong các dự án thực tế luôn ưu tiên `StyleSheet.create()`?
1. **Tránh hiện tượng rò rỉ và áp lực bộ nhớ (Memory Pressure & FPS Stutter):** Trong các ứng dụng thực tế có các danh sách lớn (`FlatList`, `SectionList`) chứa hàng nghìn items hoặc có các animation chuyển động 60fps, việc dùng inline style sẽ tạo ra hàng chục nghìn đối tượng JS ngắn hạn. Điều này kích hoạt tiến trình Garbage Collection liên tục, gây tụt giảm khung hình nghiêm trọng (giật lag, khựng màn hình).
2. **Chuẩn hóa Design System và Token màu sắc:** Trong dự án lớn, `StyleSheet` cho phép liên kết dễ dàng với các file theme chung (`colors.js`, `typography.js`, `spacing.js`), tạo tính nhất quán cho toàn bộ ứng dụng và hỗ trợ Dark Mode một cách mượt mà.
3. **Quy tắc thực tế:** Chỉ nên dùng inline style khi giá trị phụ thuộc động vào biến số tính toán trực tiếp theo thời gian thực (ví dụ: giá trị nội suy của Animated `transform: [{ translateY: animValue }]`, hoặc màu sắc động lấy từ dữ liệu API mà không thể liệt kê trước).

```jsx
// ❌ KHÔNG NÊN: Inline style tạo mới object ở mỗi lần bấm nút / re-render
<TouchableOpacity style={{ backgroundColor: '#2563EB', padding: 16, borderRadius: 12 }}>
  <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Đăng nhập</Text>
</TouchableOpacity>

// ✅ NÊN DÙNG: StyleSheet.create tạo 1 lần, tối ưu bridge và bộ nhớ
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});
```

---

## CÂU HỎI 2: CÁCH SỬ DỤNG PROP `style` VÀ CƠ CHẾ GHI ĐÈ THUỘC TÍNH KHI TRUYỀN MẢNG STYLE

### 1. Cách sử dụng prop `style` trong React Native
Prop `style` là prop đặc biệt được tích hợp sẵn trên tất cả các core components cơ bản của React Native (như `<View>`, `<Text>`, `<Image>`, `<TextInput>`, `<ScrollView>`,...).
Prop `style` chấp nhận các dạng giá trị sau:
- **Một đối tượng StyleSheet:** `style={styles.container}`
- **Một object inline thuần túy:** `style={{ margin: 10 }}`
- **Một mảng các style (Style Array):** `style={[styles.baseText, styles.highlightText]}`
- **Biểu thức điều kiện (Conditional Styling):** `style={[styles.button, isActive && styles.buttonActive, isDisabled && styles.buttonDisabled]}`

---

### 2. Quy tắc ghi đè thuộc tính khi truyền mảng (Array of Styles)
Khi truyền một mảng `[style1, style2, style3, ...]` vào prop `style`:
1. **Cơ chế Object Assign / Cascading:** React Native duyệt mảng từ trái sang phải (thứ tự index tăng dần). 
2. **Quy tắc "Style đến sau ghi đè style đến trước" (Last-one-wins):** Nếu hai hoặc nhiều style trong mảng cùng định nghĩa một thuộc tính CSS (ví dụ cả `style1` và `style2` đều có `backgroundColor`), thì **thuộc tính của style nằm ở vị trí phía sau sẽ ghi đè hoàn toàn giá trị của style phía trước**.
3. **Các thuộc tính không trùng lặp sẽ được hợp nhất (Merge):** Nếu `style1` có `{ padding: 16, color: 'blue' }` và `style2` có `{ color: 'red', fontSize: 18 }`, kết quả cuối cùng sẽ là `{ padding: 16, color: 'red', fontSize: 18 }`.
4. **Bỏ qua các giá trị Falsy (`false`, `null`, `undefined`):** React Native tự động lọc bỏ các giá trị điều kiện không thỏa mãn mà không gây lỗi runtime. Điều này tạo điều kiện cực kỳ thuận lợi cho việc viết style theo điều kiện logic (conditional rendering).

### 3. Ví dụ minh họa thực tế
```jsx
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardSelected: {
    borderColor: '#2563EB', // Ghi đè borderColor của card
    backgroundColor: '#EFF6FF', // Ghi đè backgroundColor của card
  },
  cardDanger: {
    borderColor: '#DC2626', // Ghi đè borderColor nếu điều kiện này nằm sau
  },
});

// Trường hợp isSelected = true, isError = true:
// borderColor sẽ nhận giá trị cuối cùng là '#DC2626' (đỏ)
<View style={[styles.card, isSelected && styles.cardSelected, isError && styles.cardDanger]}>
  <Text>Thẻ thông tin</Text>
</View>
```

---

## CÂU HỎI 3: Ý NGHĨA VIỆC EXPORT/IMPORT STYLESHEET VÀ THỜI ĐIỂM NÊN TÁCH STYLE THÀNH FILE RIÊNG

### 1. Ý nghĩa của việc Export và Import `StyleSheet`
Trong kiến trúc phần mềm React Native chuyên nghiệp, khả năng `export` và `import` các đối tượng StyleSheet hoặc Style Tokens mang lại các giá trị cốt lõi:
- **Tái sử dụng giao diện trên toàn ứng dụng (Single Source of Truth):** Tránh việc định nghĩa lặp lại các bộ màu sắc, kích thước lề, bo góc hoặc kiểu font chữ ở hàng chục màn hình khác nhau. Khi cần thay đổi màu chủ đạo (Primary Color), lập trình viên chỉ cần sửa tại một file duy nhất.
- **Dễ dàng chuyển đổi Theme (Dark Mode / Light Mode / Custom Theming):** Bằng cách xuất các bảng màu động hoặc hook quản lý theme, toàn bộ style sheet dùng chung có thể thích ứng ngay khi người dùng đổi cài đặt hệ thống.
- **Tách biệt cấu trúc phân tầng (Clean Architecture):** Tách giao diện thành các tầng rõ ràng:
  - Tầng Nguyên tử / Token: `theme/colors.js`, `theme/typography.js`, `theme/spacing.js`.
  - Tầng Style dùng chung: `styles/commonStyles.js` (shadow, card container, row layout, center screen).
  - Tầng Màn hình / Component riêng: Styles cục bộ cho từng màn hình phức tạp.

---

### 2. Khi nào nên tách style ra thành file riêng?

Nên tách style ra thành file riêng trong 4 tình huống then chốt sau:
1. **Khi style đại diện cho các Design Tokens dùng chung:**
   - Các biến màu (`PRIMARY`, `SECONDARY`, `BACKGROUND`, `TEXT_MUTED`).
   - Các hằng số khoảng cách (`SPACING.xs`, `SPACING.sm`, `SPACING.md`, `SPACING.lg`).
   - Các kích thước chữ và font family tiêu chuẩn.
2. **Khi các khối giao diện có tính chất lặp lại cao (Common Utility Styles):**
   - Định nghĩa shadow đổ bóng chuẩn trên cả iOS và Android (`shadows.card`, `shadows.modal`).
   - Các layout cơ bản hay tái sử dụng: `centerContainer`, `rowBetween`, `fullScreenLoader`.
3. **Khi một màn hình (Screen) hoặc Component có độ phức tạp mã giao diện quá lớn:**
   - Nếu file component dài hơn 300–400 dòng và phần `StyleSheet.create()` chiếm hơn một nửa số dòng, việc tách thành `ScreenName.styles.js` đặt cùng thư mục sẽ giúp file `ScreenName.jsx` chỉ tập trung vào nghiệp vụ logic và cấu trúc JSX.
4. **Khi cần chia sẻ style giữa nhiều màn hình trong cùng một phân hệ (Feature Module):**
   - Ví dụ luồng Authentication (Login, Register, Forgot Password, OTP Verification) đều có chung background, ô nhập input, logo header và nút bấm chính. Việc gom vào `authStyles.js` giúp code đồng bộ 100%.

```jsx
// src/theme/commonStyles.js
import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  containerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  cardElevated: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 4, // Android
    shadowColor: '#000', // iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
});
```

---

## CÂU HỎI 4: TRUYỀN STYLE QUA PROPS VÀ TÍNH LINH HOẠT CỦA COMPONENT NÚT BẤM DÙNG CHUNG

### 1. Cách truyền style qua props cho component con
Component cha có thể truyền style vào component con như bất kỳ một JavaScript prop nào (thường đặt tên là `style`, `containerStyle`, `textStyle`, `iconStyle`):
Component con nhận các prop này và kết hợp chúng với style mặc định (default style) bên trong nó bằng cách sử dụng **mảng style** (array syntax):

```jsx
// Component con: CustomButton.js
const CustomButton = ({ title, onPress, style, textStyle, variant = 'primary' }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.baseButton,
        variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
        style, // Style từ cha truyền vào sẽ ghi đè nếu có thuộc tính trùng
      ]}
    >
      <Text style={[styles.baseText, variant === 'secondary' && styles.secondaryText, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
```

---

### 2. Vì sao việc cho phép truyền `style` và `textStyle` giúp component linh hoạt vượt trội?
1. **Tuân thủ nguyên tắc Open/Closed (Mở rộng nhưng không sửa đổi):**
   - Component con được đóng gói hoàn chỉnh với các thuộc tính mặc định chuẩn (chiều cao, bo góc, hiệu ứng bấm, font chữ dễ đọc).
   - Khi ở một màn hình cụ thể nào đó cần sửa lề (`marginTop: 24`), đổi màu nền theo bối cảnh (ví dụ nút Xóa màu đỏ), component cha chỉ cần truyền thêm prop `style={{ backgroundColor: '#EF4444' }}` mà **không cần phải sửa mã nguồn bên trong component con** hay tạo thêm component mới.
2. **Tách biệt rõ ràng giữa Box Styling (Vỏ ngoài) và Text Styling (Nội dung chữ):**
   - Trong React Native, thuộc tính màu chữ (`color`), kích thước chữ (`fontSize`) thuộc về thẻ `<Text>`, trong khi thuộc tính nền (`backgroundColor`), lề (`margin`), bo góc (`borderRadius`) thuộc về `<TouchableOpacity>` hoặc `<View>`.
   - Nếu chỉ truyền duy nhất 1 prop `style`, lập trình viên sẽ rất khó can thiệp vào định dạng chữ bên trong mà không phá vỡ layout của nút. Việc tách biệt `style` (cho khung vỏ) và `textStyle` (cho chữ) mang lại khả năng tùy biến 100%.
3. **Tương thích hoàn hảo với Flexbox Layout của màn hình cha:**
   - Component cha có thể truyền `style={{ flex: 1, marginRight: 8 }}` khi đặt hai nút bấm nằm cạnh nhau trong một hàng (`flexDirection: 'row'`), giúp component con thích ứng linh hoạt trong mọi cấu trúc layout.

---

## CÂU HỎI 5: PHÂN TÍCH VAI TRÒ CỦA FLEXBOX TRONG REACT NATIVE VÀ CÁC THUỘC TÍNH CỐT LÕI

### 1. Vai trò của Flexbox trong thiết kế giao diện React Native
Flexbox (Flexible Box Layout) là thuật toán dàn trang mặc định và duy nhất trong React Native để phân bố không gian và căn chỉnh các phần tử trên màn hình.
- **Đặc thù so với Web CSS:**
  - Trong React Native, thuộc tính `flexDirection` mặc định là `'column'` (chiều dọc), thay vì `'row'` (chiều ngang) như trên trình duyệt web, bởi vì màn hình điện thoại vốn dĩ phát triển theo trục dọc.
  - Tất cả các phần tử mặc định đều có `display: 'flex'`.
- **Tự động thích ứng đa màn hình (Responsive Design):** Flexbox giải quyết bài toán phân mảnh màn hình cực kỳ hiệu quả trên các thiết bị từ iPhone cỡ nhỏ (SE: 375px), điện thoại Android phổ thông (1080x2400) cho đến máy tính bảng iPad/Tablet cỡ lớn mà không cần phải hardcode cứng kích thước pixel.

---

### 2. Ý nghĩa chi tiết của các thuộc tính Flexbox quan trọng

#### A. `flexDirection`
- **Ý nghĩa:** Xác định hướng của **Trục chính (Main Axis)** mà các phần tử con sẽ sắp xếp theo.
- **Các giá trị:**
  - `'column'` *(Mặc định)*: Các phần tử con xếp chồng từ trên xuống dưới theo chiều dọc.
  - `'row'`: Các phần tử con xếp nối tiếp từ trái sang phải theo chiều ngang.
  - `'column-reverse'` / `'row-reverse'`: Tương tự nhưng đảo ngược thứ tự xếp.
- **Ứng dụng:** Dùng `'row'` khi làm thanh tiêu đề (Nút Back + Tiêu đề + Icon tìm kiếm), ô nhập liệu có icon đính kèm, hoặc thanh phân trang.

#### B. `justifyContent`
- **Ý nghĩa:** Căn chỉnh và phân phối khoảng cách giữa các phần tử con dọc theo **Trục chính (Main Axis)** do `flexDirection` xác định.
- **Các giá trị phổ biến:**
  - `'flex-start'` *(Mặc định)*: Dồn các phần tử về đầu trục chính.
  - `'center'`: Canh giữa các phần tử trên trục chính.
  - `'flex-end'`: Dồn các phần tử về cuối trục chính.
  - `'space-between'`: Khoảng cách đều nhau giữa các phần tử; phần tử đầu sát mép đầu, phần tử cuối sát mép cuối.
  - `'space-around'`: Khoảng cách đều nhau quanh mỗi phần tử.
  - `'space-evenly'`: Khoảng cách giữa hai phần tử bất kỳ và giữa phần tử với mép màn hình đều bằng nhau chằn chặn.
- **Ứng dụng:** Căn giữa màn hình đăng nhập (`justifyContent: 'center'`), làm thanh điều hướng với hai icon ở hai đầu (`justifyContent: 'space-between'`).

#### C. `alignItems`
- **Ý nghĩa:** Căn chỉnh các phần tử con dọc theo **Trục phụ (Cross Axis)** (vuông góc 90 độ với trục chính).
- **Các giá trị phổ biến:**
  - `'stretch'` *(Mặc định)*: Kéo dãn các phần tử con lấp đầy toàn bộ kích thước trục phụ (nếu con không cố định width/height).
  - `'center'`: Canh giữa các phần tử trên trục phụ.
  - `'flex-start'`: Căn sát lề bắt đầu của trục phụ.
  - `'flex-end'`: Căn sát lề kết thúc của trục phụ.
- **Ứng dụng:** Khi `flexDirection: 'column'`, trục phụ là chiều ngang. Muốn căn một nút bấm nằm chính giữa chiều ngang màn hình, đặt `alignItems: 'center'`.

#### D. `flex`
- **Ý nghĩa:** Xác định tỉ lệ co dãn của phần tử so với không gian còn trống của container cha.
- **Nguyên lý hoạt động:**
  - Nếu một thẻ có `flex: 1` và là thẻ con duy nhất, nó sẽ chiếm **100% diện tích còn lại** của thẻ cha.
  - Nếu có 2 thẻ con: Thẻ A có `flex: 1`, thẻ B có `flex: 2` (tổng = 3 phần) -> Thẻ A chiếm 1/3 và Thẻ B chiếm 2/3 diện tích trống.
  - `flex: 0` (hoặc không khai báo): Kích thước phụ thuộc vào `width`, `height` hoặc nội dung bên trong.
- **Ứng dụng:** Thẻ bọc ngoài cùng của màn hình luôn luôn để `flex: 1` để app phủ kín 100% chiều cao màn hình thiết bị.

#### E. `flexWrap`
- **Ý nghĩa:** Xác định hành vi của các phần tử con khi tổng kích thước của chúng vượt quá kích thước của thẻ cha trên trục chính.
- **Các giá trị:**
  - `'nowrap'` *(Mặc định)*: Ép tất cả phần tử nằm trên 1 hàng/cột duy nhất, dẫn đến bị tràn (overflow) hoặc co rúm lại.
  - `'wrap'`: Tự động ngắt dòng và đẩy các phần tử vượt giới hạn xuống hàng mới (hoặc sang cột mới).
- **Ứng dụng:** Cực kỳ quan trọng khi xây dựng danh sách các Hashtag, Tag lọc sản phẩm, danh mục sở thích, hoặc lưới ảnh Responsive (Grid Layout).
