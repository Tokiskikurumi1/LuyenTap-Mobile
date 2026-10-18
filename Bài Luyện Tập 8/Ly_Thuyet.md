# BÀI LUYỆN TẬP 8 - PHẦN A: CÂU HỎI ÔN TẬP LÝ THUYẾT

---

## MỤC LỤC LÝ THUYẾT
1. [CÂU 1: So sánh Default Export và Named Export trong React Native](#câu-1-so-sánh-default-export-và-named-export-trong-react-native)
2. [CÂU 2: Khái niệm Props, Luồng dữ liệu một chiều và Đặc tính Read-Only](#câu-2-khái-niệm-props-luồng-dữ-liệu-một-chiều-và-đặc-tính-read-only)
3. [CÂU 3: Vai trò của việc tách Component nhỏ (Header, Button, InputField, Card)](#câu-3-vai-trò-của-việc-tách-component-nhỏ-header-button-inputfield-card)
4. [CÂU 4: Mối liên hệ giữa Props, State và Hooks trong Form nhập liệu](#câu-4-mối-liên-hệ-giữa-props-state-và-hooks-trong-form-nhập-liệu)
5. [CÂU 5: Controlled Component với TextInput và Cơ chế Form Validation](#câu-5-controlled-component-với-textinput-và-cơ-chế-form-validation)

---

## CÂU 1: SO SÁNH DEFAULT EXPORT VÀ NAMED EXPORT TRONG REACT NATIVE

> **Đề bài:**  
> Trình bày sự khác nhau giữa `default export` và `named export` trong React Native. Khi một file chỉ chứa một component chính thì nên sử dụng cách export nào? Hãy giải thích lý do và nêu ví dụ tình huống sử dụng phù hợp.

### 1. Phân biệt Default Export và Named Export

Trong hệ thống module JavaScript hiện đại (ES6 Modules) được sử dụng trong React Native, việc chia sẻ mã nguồn giữa các tệp tin được thực hiện thông qua hai cơ chế xuất dữ liệu: **Default Export** (xuất mặc định) và **Named Export** (xuất theo tên).

```
+--------------------------------------------------------------------------------------------------+
|                            SO SÁNH DEFAULT EXPORT VÀ NAMED EXPORT                                |
+--------------------------------------------------------------------------------------------------+
|  Tiêu chí              | Default Export (Xuất mặc định)      | Named Export (Xuất theo tên)      |
+------------------------+-------------------------------------+-----------------------------------+
| Số lượng trong 1 file  | Duy nhất 1 (One per module)         | Không giới hạn (Multiple per mod) |
| Cú pháp export         | export default ComponentName;       | export { ComponentName, Helper }; |
| Cú pháp import         | import ComponentName from './file'; | import { Name } from './file';    |
| Dấu ngoặc nhọn `{}`    | KHÔNG dùng dấu ngoặc nhọn           | BẮT BUỘC dùng dấu ngoặc nhọn      |
| Đổi tên khi import     | Tự do đặt tên tùy ý khi import      | Phải dùng từ khóa `as` để đổi tên |
| Tự động gợi ý (IDE)    | Hỗ trợ ở mức cơ bản                 | IDE gợi ý chính xác tuyệt đối     |
+--------------------------------------------------------------------------------------------------+
```

#### A. Default Export (Xuất mặc định)
- **Đặc điểm:** Mỗi file chỉ được phép có duy nhất **một** giá trị xuất mặc định (`export default`).
- **Cú pháp:**
  ```javascript
  // File: components/ProductCard.js
  const ProductCard = () => { /* ... */ };
  export default ProductCard;
  ```
- **Khi import:** Bên file sử dụng không cần đặt tên trong dấu ngoặc nhọn `{}` và có thể tùy ý gán bất kỳ tên gọi nào:
  ```javascript
  // File: App.js
  import ProductCard from './components/ProductCard';
  // Hoặc đổi tên tự do mà không gây lỗi cú pháp:
  import CustomCard from './components/ProductCard';
  ```

#### B. Named Export (Xuất theo tên)
- **Đặc điểm:** Một file có thể xuất **nhiều** biến, hàm, hằng số hoặc component khác nhau bằng cách gán tên cụ thể cho từng thành phần.
- **Cú pháp:**
  ```javascript
  // File: utils/formatters.js
  export const formatCurrency = (amount) => `${amount.toLocaleString('vi-VN')} ₫`;
  export const formatDate = (date) => { /* ... */ };
  export const TAX_RATE = 0.1;
  ```
- **Khi import:** Phải ghi chính xác tên đã export và bao bọc trong cặp ngoặc nhọn `{}`:
  ```javascript
  // File: App.js
  import { formatCurrency, TAX_RATE } from './utils/formatters';
  // Nếu muốn đổi tên thì bắt buộc phải dùng từ khóa 'as':
  import { formatCurrency as formatVND } from './utils/formatters';
  ```

---

### 2. Khi một file chỉ chứa một component chính thì nên sử dụng cách export nào?

**Khuyến nghị chuẩn mực:** Khi một file chỉ chứa một component chính duy nhất (ví dụ: màn hình `HomeScreen.js`, component `ProductCard.js`, `RegisterForm.js`), cách tiếp cận được cộng đồng React/React Native và tài liệu chính thức của Facebook khuyến nghị là **`Default Export`**.

#### Lý do:
1. **Tuân thủ nguyên lý Đơn trách nhiệm (Single Responsibility Principle - SRP):** Mỗi tệp tin đại diện cho một thực thể component độc lập. Xuất mặc định khẳng định rõ: *"Component này chính là đại diện cốt lõi của file này"*.
2. **Cú pháp import ngắn gọn, tường minh:** Người dùng không cần phải ghi nhớ hay gõ cặp ngoặc nhọn `{}`, giúp câu lệnh import sạch sẽ và trực quan (`import ProductCard from './ProductCard'`).
3. **Thuận tiện cho kỹ thuật Code Splitting & Dynamic Import:** Kỹ thuật tải lười (Lazy Loading) với `React.lazy()` yêu cầu component được nạp phải là `default export`:
   ```javascript
   const ProductDetail = React.lazy(() => import('./screens/ProductDetailScreen'));
   ```
4. **Quy ước đồng nhất của hệ sinh thái:** Hầu hết các thư viện UI phổ biến, Expo Router và React Navigation đều coi các file màn hình trong thư mục `screens/` hoặc `app/` là Default Export.

---

### 3. Ví dụ tình huống sử dụng phù hợp trong thực tế dự án

#### Tình huống 1: Sử dụng Default Export cho Component chính
```javascript
// File: components/ProductCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProductCard = ({ name, price }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.price}>{price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({ card: { padding: 16 } });

// File chỉ có 1 component chính -> Dùng Default Export
export default ProductCard;
```

#### Tình huống 2: Sử dụng Named Export cho thư viện tiện ích hoặc tập hợp Icons / Themes
```javascript
// File: constants/theme.js
// Xuất nhiều giá trị màu sắc, phông chữ, khoảng cách trong cùng 1 file
export const COLORS = {
  primary: '#0284c7',
  secondary: '#1e293b',
  success: '#4ade80',
  danger: '#ef4444',
  background: '#0f172a',
};

export const SPACING = {
  sm: 8,
  md: 16,
  lg: 24,
};

// Bên file sử dụng chỉ cần bóc tách đúng thành phần cần thiết:
// import { COLORS, SPACING } from './constants/theme';
```

---

## CÂU 2: KHÁI NIỆM PROPS, LUỒNG DỮ LIỆU MỘT CHIỀU VÀ ĐẶC TÍNH READ-ONLY

> **Đề bài:**  
> Giải thích khái niệm props trong React Native. Vì sao props được xem là cách truyền dữ liệu từ component cha xuống component con? Hãy phân tích đặc điểm “read-only” của props và cho biết điều gì có thể xảy ra nếu component con cố gắng thay đổi trực tiếp giá trị props nhận được.

### 1. Khái niệm Props trong React Native

- **Props (viết tắt của Properties):** Là cơ chế truyền dữ liệu và cấu hình từ một component cha xuống component con trong cây phân cấp giao diện của React.
- Về bản chất kỹ thuật, **props tương tự như các tham số (arguments)** truyền vào một hàm trong JavaScript:
  ```
  Component Cha  ---[ truyền props: name="iPhone", price=29990000 ]--->  Component Con (ProductCard)
  ```
- Props có thể chứa bất kỳ kiểu dữ liệu nào trong JavaScript: số (`Number`), chuỗi (`String`), boolean (`Boolean`), đối tượng (`Object`), mảng (`Array`), và đặc biệt là **hàm callback** (`Function` như `onPress`, `onChange`).

---

### 2. Vì sao Props được xem là luồng truyền dữ liệu từ cha xuống con (Unidirectional Data Flow)?

React và React Native xây dựng kiến trúc dựa trên nguyên lý **Luồng dữ liệu một chiều (Unidirectional Data Flow)**:

```
                  +--------------------------------+
                  |         COMPONENT CHA          |
                  |     (Nắm giữ Data / State)     |
                  +---------------+----------------+
                                  |
                                  | 1. Truyền dữ liệu qua thuộc tính JSX
                                  |    <ProductCard name={item.name} />
                                  v
                  +---------------+----------------+
                  |         COMPONENT CON          |
                  |      (Chỉ đọc và hiển thị)     |
                  +---------------+----------------+
                                  |
                                  | 2. Muốn thông báo thay đổi lên cha?
                                  |    Phải gọi Hàm Callback: onSelect(item)
                                  v
                  +--------------------------------+
                  |         COMPONENT CHA          |
                  |     (Cập nhật lại State cha)   |
                  +--------------------------------+
```

1. **Tính định hướng từ trên xuống (Top-Down):** Dữ liệu luôn bắt nguồn từ tầng cao hơn (nơi lưu trữ nguồn sự thật - Source of Truth) và chảy xuống các nhánh cây con bên dưới.
2. **Ngăn chặn tình trạng biến đổi trạng thái hỗn loạn:** Nếu component con có thể trực tiếp ghi đè dữ liệu của cha mà không thông qua cơ chế kiểm soát, ứng dụng sẽ rơi vào trạng thái "hiệu ứng cánh bướm": một lỗi nhỏ ở component lá có thể làm sai lệch dữ liệu của toàn bộ ứng dụng và cực kỳ khó truy vết bug.
3. **Minh bạch và dễ kiểm thử:** Khi giao diện gặp sự cố hiển thị sai dữ liệu, lập trình viên chỉ cần kiểm tra ngược lên component cha nơi dữ liệu được truyền xuống.

---

### 3. Phân tích đặc điểm “Read-Only” (Bất biến) của Props

Trong tài liệu chính thức của React, quy tắc bất biến số 1 được tuyên bố như sau:
> **"All React components must act like pure functions with respect to their props."**  
> *(Tất cả các React component phải hoạt động như những hàm thuần khiết đối với props của chúng).*

- **Tính chất thuần khiết (Pure Function):** Một hàm không bao giờ được phép thay đổi giá trị của các tham số truyền vào mà chỉ đọc chúng để trả về kết quả.
- **Tính bất biến (Immutability):** Đối tượng `props` nhận được trong component con bị đóng băng ngầm định. Component con chỉ có quyền **đọc (read)** giá trị để hiển thị ra JSX hoặc truyền tiếp xuống component cháu, tuyệt đối không có quyền ghi đè (mutate).

---

### 4. Điều gì sẽ xảy ra nếu component con cố tình thay đổi trực tiếp props?

Nếu một lập trình viên cố tình viết mã lệnh như:
```javascript
const ProductCard = (props) => {
  // LỖI NGUY HIỂM: Cố tình gán lại giá trị cho props
  props.price = 0; 
  // ...
};
```

Những hệ quả nghiêm trọng sau sẽ xảy ra:

1. **Gây lỗi Runtime Error (TypeError) trong Strict Mode:**
   - Trong môi trường phát triển (Development Mode) hoặc khi chạy JavaScript ở chế độ nghiêm ngặt (`use strict`), đối tượng `props` được bảo vệ bằng `Object.freeze()`. Việc cố tình sửa đổi thuộc tính sẽ ném ra lỗi:  
     `TypeError: Cannot assign to read only property 'price' of object '#<Object>'`.
2. **Không kích hoạt chu kỳ Re-render của React:**
   - React chỉ theo dõi sự thay đổi thông qua biến `State` (khi gọi `setState` hoặc `dispatch`). Nếu ta tự ý thay đổi giá trị thuộc tính bên trong đối tượng `props`, React Engine hoàn toàn không nhận biết được sự biến đổi này để vẽ lại màn hình. Giao diện người dùng sẽ bị đóng băng hoặc hiển thị dữ liệu mâu thuẫn (Stale UI).
3. **Phá vỡ tính toàn vẹn của Component cha và các Component anh em:**
   - Nếu prop truyền xuống là một Đối tượng (`Object`) hoặc Mảng (`Array`) tham chiếu, việc sửa đổi trực tiếp bên trong component con sẽ làm biến đổi luôn dữ liệu gốc ở component cha! Khi đó, tất cả các component con khác đang cùng nhận object đó sẽ bị ảnh hưởng ngoài ý muốn (Side Effects), gây ra những lỗi ngầm (Silent Bugs) cực kỳ khó phát hiện.

---

## CÂU 3: VAI TRÒ CỦA VIỆC TÁCH COMPONENT NHỎ (HEADER, BUTTON, INPUTFIELD, CARD)

> **Đề bài:**  
> Phân tích vai trò của việc tách component nhỏ trong quá trình xây dựng ứng dụng React Native. Theo em, việc tách các thành phần như Header, Button, InputField, Card thành các component riêng giúp ích như thế nào cho việc tái sử dụng, bảo trì và mở rộng ứng dụng?

### 1. Ý nghĩa kiến trúc của việc chia nhỏ Component (Component Modularization)

Xây dựng ứng dụng di động theo triết lý React là quá trình lắp ghép giao diện từ các "khối lego" độc lập. Thay vì viết một file màn hình dài hàng nghìn dòng code (God Component), việc chia tách thành các đơn vị chuyên biệt (`Header`, `CustomButton`, `InputField`, `ProductCard`) mang lại 4 trụ cột lợi ích kỹ thuật:

```
                           HỆ THỐNG GIAO DIỆN (UI ARCHITECTURE)
                                           |
                 +-------------------------+-------------------------+
                 |                                                   |
           [ TÁI SỬ DỤNG ]                                      [ DỄ BẢO TRÌ ]
       - Viết 1 lần, dùng mọi nơi                           - Định vị lỗi tức thì
       - Đảm bảo DRY & nhất quán UI                         - Codebase gọn gàng, cách ly
                 |                                                   |
                 +-------------------------+-------------------------+
                                           |
                 +-------------------------+-------------------------+
                 |                                                   |
           [ DỄ MỞ RỘNG ]                                    [ TỐI ƯU HIỆU NĂNG ]
       - Áp dụng Atomic Design                              - Kiểm soát Re-render độc lập
       - Dễ dàng đổi Theme & Scaling                        - Tận dụng tối đa React.memo
```

---

### 2. Phân tích chi tiết 3 khía cạnh: Tái sử dụng, Bảo trì và Mở rộng

#### A. Khía cạnh Tái sử dụng (Reusability & Triết lý DRY - Don't Repeat Yourself)
- **Tình huống thực tế:** Trong một ứng dụng mua sắm, nút bấm (`Button`) xuất hiện ở khắp nơi: nút "Đăng nhập", nút "Thêm vào giỏ", nút "Thanh toán", nút "Hủy đơn".
- **Lợi ích khi tách riêng:** 
  - Ta chỉ cần tạo một component `CustomButton.js` với đầy đủ định dạng (bo tròn, màu chủ đạo, hiệu ứng bóng mờ, kích thước chữ chuẩn).
  - Bất kỳ màn hình nào cần dùng nút chỉ việc import và truyền props:
    ```jsx
    <CustomButton title="Đăng nhập" variant="primary" onPress={handleLogin} />
    <CustomButton title="Hủy bỏ" variant="outline" onPress={handleCancel} />
    ```
  - **Tránh trùng lặp mã nguồn:** Không phải copy-paste lại hàng chục dòng CSS `StyleSheet` cho từng nút bấm, tiết kiệm 70% thời gian code giao diện.

#### B. Khía cạnh Dễ dàng Bảo trì (Maintainability & Nguyên lý Single Responsibility)
- **Độc lập và cách ly lỗi:** Mỗi component chỉ đảm nhận duy nhất một công việc. Component `InputField.js` chỉ chịu trách nhiệm quản lý hiển thị ô nhập và báo lỗi; `Header.js` chỉ quản lý thanh tiêu đề và nút quay lại.
- **Sửa đổi tập trung (Single Point of Truth):** Khi khách hàng hoặc đội ngũ Design yêu cầu thay đổi màu sắc chủ đạo của toàn bộ các nút bấm trong app hoặc đổi độ bo cong từ `borderRadius: 8` thành `borderRadius: 20`, lập trình viên **chỉ cần sửa đúng 1 tệp tin duy nhất** (`CustomButton.js`). Toàn bộ hàng trăm màn hình trong ứng dụng sẽ tự động cập nhật ngay lập tức mà không sợ bỏ sót.
- **Dễ dàng viết Unit Test:** Việc kiểm thử tự động (Testing với Jest / React Native Testing Library) trên các component nhỏ rất đơn giản vì chúng có đầu vào (props) và đầu ra (giao diện) hoàn toàn minh bạch.

#### C. Khía cạnh Mở rộng ứng dụng (Scalability & Tư duy Atomic Design)
- **Cơ sở cho Design System chuyên nghiệp:** Khi ứng dụng phát triển lên quy mô hàng chục lập trình viên, các component nhỏ được coi là các **Atoms (Nguyên tử)** hoặc **Molecules (Phân tử)** trong phương pháp thiết kế Atomic Design.
- **Phát triển song song (Parallel Development):** Một lập trình viên có thể tập trung phát triển bộ thư viện UI (`Header`, `InputField`, `Card`), trong khi lập trình viên khác ghép nối các component đó vào luồng nghiệp vụ API mà không gây xung đột mã nguồn (Merge Conflict).

---

## CÂU 4: MỐI LIÊN HỆ GIỮA PROPS, STATE VÀ HOOKS TRONG FORM NHẬP LIỆU

> **Đề bài:**  
> Trình bày mối liên hệ giữa props, state và hooks khi xây dựng một giao diện có nhập liệu. Trong trường hợp tạo form đăng ký gồm tên, email và mật khẩu, dữ liệu nào nên được quản lý bằng state, dữ liệu nào có thể truyền qua props, và vì sao?

### 1. Mối liên hệ tam giác giữa Props, State và Hooks

Trong kiến trúc React Functional Component hiện đại, ba khái niệm này phối hợp nhịp nhàng tạo thành vòng lặp vận hành cho form nhập liệu:

```
                      +---------------------------------------+
                      |                 HOOKS                 |
                      |  (Công cụ: useState, useEffect, ...)  |
                      +-------------------+-------------------+
                                          |
                Khởi tạo và cung cấp      |      Theo dõi và kích hoạt
                phương thức cập nhật      |      hiệu ứng phụ khi thay đổi
                                          v
                      +---------------------------------------+
                      |                 STATE                 |
                      |   (Nội tại: Lưu trữ chuỗi họ tên,     |
                      |    email, password, thông báo lỗi)    |
                      +-------------------+-------------------+
                                          |
                        Truyền giá trị    |      Nhận callback xử lý
                        và cấu hình xuống |      sự kiện từ con gửi lên
                                          v
                      +---------------------------------------+
                      |                 PROPS                 |
                      |   (Giao tiếp: Truyền placeholder,     |
                      |    label, keyboardType, onSubmit)     |
                      +---------------------------------------+
```

- **State (Dữ liệu nội bộ):** Là "trí nhớ sống" của chính màn hình Form. Nó chứa các dữ liệu có khả năng biến đổi theo thời gian và tương tác của người dùng. Mỗi khi State thay đổi thông qua hàm cập nhật, React sẽ re-render để hiển thị giá trị mới nhất.
- **Hooks (Công cụ kết nối):** Là các hàm đặc biệt bắt đầu bằng từ khóa `use` (tiêu biểu là `useState`) giúp Functional Component khai báo và quản lý các biến State cũng như vòng đời mà không cần dùng Class Component.
- **Props (Phương tiện truyền tải):** Đóng vai trò làm "cầu nối" truyền các tham số cấu hình tĩnh hoặc hàm xử lý từ component cha cấp cao xuống từng ô nhập liệu con (`InputField`).

---

### 2. Phân tích Form Đăng ký (Họ tên, Email, Mật khẩu): Dữ liệu nào dùng State, dữ liệu nào dùng Props?

#### A. Dữ liệu nên được quản lý bằng STATE:
1. **Giá trị văn bản nhập liệu người dùng đang gõ:**
   - `name` (Họ và tên): Chuỗi ký tự người dùng vừa nhập.
   - `email` (Địa chỉ email): Chuỗi email đang soạn thảo.
   - `password` (Mật khẩu): Chuỗi mật khẩu đang nhập.
2. **Đối tượng lưu trữ thông báo lỗi validation:**
   - `errors = { name: '', email: '', password: '' }`: Chứa câu cảnh báo đỏ hiển thị khi thông tin nhập không hợp lệ.
3. **Trạng thái giao diện tương tác:**
   - `isPasswordVisible` (Ẩn/hiện mật khẩu): Boolean `true`/`false` để bật tắt chế độ `secureTextEntry`.
   - `isSubmitting` (Đang gửi dữ liệu): Boolean để hiển thị vòng xoay loading (`ActivityIndicator`) và khóa nút bấm tránh người dùng ấn liên tiếp nhiều lần.

> **VÌ SAO PHẢI QUẢN LÝ BẰNG STATE?**  
> Bởi vì các dữ liệu này mang tính chất **động (dynamic)**, liên tục thay đổi sau từng phím gõ của người dùng. Chỉ có biến `State` của React mới có khả năng kích hoạt cơ chế vẽ lại giao diện (Re-render) để phản hồi tức thì các ký tự mới lên màn hình và cập nhật ngay trạng thái thông báo lỗi tương ứng.

---

#### B. Dữ liệu có thể truyền qua PROPS:
1. **Thuộc tính cấu hình giao diện ô nhập:**
   - `label`: Tiêu đề bên trên ô nhập ("Họ và tên", "Email", "Mật khẩu").
   - `placeholder`: Dòng chữ mờ gợi ý ("Nhập họ tên đầy đủ...", "example@gmail.com").
   - `keyboardType`: Loại bàn phím di động tối ưu (`'default'`, `'email-address'`).
   - `secureTextEntry`: Cờ xác định có ẩn ký tự thành dấu chấm tròn hay không.
2. **Hàm Callback xử lý sự kiện:**
   - `onSubmit`: Hàm do component cha truyền xuống để xử lý gửi API sau khi form đã vượt qua tất cả các bước validation.
   - `onNavigateToLogin`: Hàm chuyển hướng sang màn hình Đăng nhập nếu người dùng đã có tài khoản.
3. **Định dạng giao diện (Theme/Styles):**
   - Màu sắc chủ đạo, kích thước padding do component cha chỉ định để form đồng bộ với phong cách chung của ứng dụng.

> **VÌ SAO TRUYỀN QUA PROPS?**  
> Bởi vì các thông số này mang tính chất **cấu hình cố định (configuration)** hoặc logic điều phối ở tầng ứng dụng cao hơn. Bằng cách nhận các thông tin này qua props, component con `InputField` trở thành một component dùng chung đa năng: có thể dùng cho Form Đăng ký, Form Đăng nhập, Form Đổi mật khẩu mà không cần viết lại mã nguồn.

---

## CÂU 5: CONTROLLED COMPONENT VỚI TEXTINPUT VÀ CƠ CHẾ FORM VALIDATION

> **Đề bài:**  
> Giải thích khái niệm controlled component với TextInput trong React Native. Vì sao khi xây dựng form nhập liệu cần quản lý giá trị ô nhập bằng state và thực hiện validate như kiểm tra rỗng, email có ký tự “@”, mật khẩu có độ dài tối thiểu?

### 1. Khái niệm Controlled Component với TextInput

Trong React Native, **Controlled Component** là một component nhập liệu (điển hình là `<TextInput>`) mà giá trị văn bản hiển thị bên trong ô nhập **luôn luôn được ràng buộc và kiểm soát tuyệt đối bởi State của React**.

Nó vận hành dựa trên nguyên tắc **"Nguồn chân lý duy nhất" (Single Source of Truth)** thông qua sự kết hợp của hai thuộc tính:
1. `value={stateValue}`: Giá trị hiển thị trong ô nhập luôn luôn phản chiếu đúng nội dung của biến state.
2. `onChangeText={(text) => setStateValue(text)}`: Mỗi khi người dùng gõ hoặc xóa ký tự, sự kiện này lập tức kích hoạt và ghi đè giá trị mới vào state.

```
+-----------------------------------------------------------------------------------------+
|                  VÒNG LẶP KHÉP KÍN CỦA CONTROLLED COMPONENT                             |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|  [ Bàn phím người dùng gõ ] ---> onChangeText(text) ---> setState(text)                |
|                                                                |                        |
|                                                                v (Kích hoạt Re-render)  |
|  [ TextInput hiển thị ] <------- value={state} <---------------+                        |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

### 2. Vì sao cần quản lý giá trị ô nhập bằng State?

1. **Đồng bộ hóa dữ liệu thời gian thực (Real-time Synchronization):** Lập trình viên luôn nắm chắc chính xác 100% dữ liệu người dùng đang có trong form tại mọi thời điểm mà không cần phải truy vấn DOM hoặc trích xuất thuộc tính phức tạp như trong lập trình thuần.
2. **Khả năng tiền xử lý và định dạng dữ liệu (Input Masking):** Nhờ việc luồng dữ liệu chạy qua hàm State, ta có thể chủ động can thiệp vào chuỗi ký tự trước khi nó hiển thị lên màn hình. Ví dụ: tự động viết hoa toàn bộ mã giảm giá, lọc bỏ ký tự đặc biệt trong số điện thoại, format tiền tệ ngay khi đang gõ.
3. **Kiểm soát nút hành động (Submit Button):** Trạng thái nút bấm có thể tự động bật/tắt (`disabled`) căn cứ vào việc tất cả các trường trong State đã hợp lệ hay chưa.

---

### 3. Phân tích tầm quan trọng của các tiêu chuẩn Validation

Khi xây dựng form đăng ký, việc kiểm tra tính hợp lệ của dữ liệu trước khi gửi lên Server là bắt buộc vì các lý do an ninh, nghiệp vụ và trải nghiệm người dùng:

```
+-------------------------------------------------------------------------------------------------------+
|                                 BẢNG PHÂN TÍCH CÁC TIÊU CHÍ VALIDATION                                |
+-------------------------------------------------------------------------------------------------------+
| Tiêu chí Validate       | Cách thức kiểm tra kỹ thuật             | Ý nghĩa thực tiễn & Rủi ro nếu thiếu      |
+-------------------------+-----------------------------------------+-----------------------------------+
| 1. Kiểm tra rỗng        | value.trim() === ''                     | - Ngăn chặn người dùng ấn nhầm nút|
|    (Required check)     |                                         |   khi chưa điền thông tin.        |
|                         |                                         | - Tránh gửi dữ liệu rác lên DB.   |
|                         |                                         | - Ngăn ngừa lỗi sập server do     |
|                         |                                         |   thiếu trường bắt buộc (NullPointer)|
+-------------------------+-----------------------------------------+-----------------------------------+
| 2. Email có ký tự "@"   | email.includes('@') &&                  | - Đảm bảo địa chỉ liên lạc tồn tại|
|    và đúng định dạng    | /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)| - Tránh việc người dùng gõ nhầm số|
|                         |                                         |   điện thoại vào ô email.         |
|                         |                                         | - Đảm bảo gửi được email xác thực |
|                         |                                         |   kích hoạt hoặc khôi phục mã PIN.|
+-------------------------+-----------------------------------------+-----------------------------------+
| 3. Mật khẩu có độ dài   | password.length >= 6 (hoặc >= 8)        | - Bảo vệ tài khoản người dùng     |
|    tối thiểu            |                                         |   khỏi các cuộc tấn công dò mật   |
|                         |                                         |   khẩu tự động (Brute Force).     |
|                         |                                         | - Đáp ứng tiêu chuẩn an toàn bảo  |
|                         |                                         |   mật dữ liệu ứng dụng di động.   |
+-------------------------------------------------------------------------------------------------------+
```

#### Giá trị vượt trội đối với Trải nghiệm người dùng (UX):
- Khi kết hợp **Controlled Component** với **Validation Logic**, người dùng nhận được **phản hồi tức thì (Instant Feedback)**. Ngay khi người dùng rời khỏi ô nhập hoặc bấm "Đăng ký", viền của ô nhập chuyển sang màu đỏ rực rỡ và thông báo lỗi hiển thị rõ ràng ngay bên dưới giúp họ biết chính xác mình cần sửa ở đâu, mang lại trải nghiệm chuyên nghiệp và mượt mà.
