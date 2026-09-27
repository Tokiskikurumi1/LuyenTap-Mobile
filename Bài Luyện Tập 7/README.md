# BÀI LUYỆN TẬP 7: VÒNG ĐỜI COMPONENT, LỒNG COMPONENT VÀ FORM VALIDATION

Thư mục này chứa đầy đủ tài liệu lý thuyết, mã nguồn các component thực hành, form đăng ký validation và **2 ảnh nộp minh chứng (ảnh lỗi và ảnh đúng)** theo đúng yêu cầu đề bài.

---

## 📁 Cấu trúc thư mục

```text
Bài Luyện Tập 7/
├── 📁 components/
│   ├── NameInputControlled.js   # Bài 1: Controlled Component nhập họ tên với TextInput & State
│   ├── Avatar.js                # Bài 2: Component hiển thị ảnh bo tròn
│   ├── UserProfile.js           # Bài 2: Component lồng Avatar và hiển thị thông tin
│   └── RegisterForm.js          # Bài 3: Form Đăng ký có đầy đủ Validation
├── 📁 Ảnh/
│   ├── dang_ky_loi.png          # 🔴 Ảnh nộp 1: Trạng thái Form Đăng ký báo lỗi (Validation Error)
│   ├── dang_ky_thanh_cong.png   # 🟢 Ảnh nộp 2: Trạng thái Form Đăng ký thành công (Validation Pass)
│   ├── demo_bai1_input.png      # Ảnh minh họa Bài 1
│   └── demo_bai2_nested_components.png # Ảnh minh họa Bài 2
├── 📄 App.js                    # Ứng dụng chính tích hợp cả 3 bài tập
├── 📄 package.json              # File cấu hình dự án
├── 📄 Ly_Thuyet.md              # Lời giải chi tiết 5 câu hỏi lý thuyết (Phần A)
├── 📄 Thuc_Hanh.md              # Mã nguồn, giải thích cơ chế và đính kèm 2 ảnh nộp (Phần B)
└── 📄 README.md                 # Tóm tắt và mục lục tra cứu nhanh
```

---

## 📌 Tóm tắt nội dung chính

### Phần A: Câu hỏi ôn tập lý thuyết ([Ly_Thuyet.md](./Ly_Thuyet.md))
1. **Câu 1:** Ba giai đoạn vòng đời của Component: **Mounting**, **Updating**, **Unmounting**; Vai trò của `render()`, `componentDidMount()`, `componentDidUpdate()`, `componentWillUnmount()` trong Class Component.
2. **Câu 2:** Cách sử dụng `useEffect` trong Functional Component để thay thế vòng đời truyền thống (chạy 1 lần với `[]`, chạy khi state/prop đổi với `[dep]`, dọn dẹp với `return () => {}`).
3. **Câu 3:** Khái niệm **Controlled Component**; Vì sao State của React là "nguồn chân lý duy nhất" kiểm soát giá trị của `TextInput` thông qua `value` và `onChangeText`.
4. **Câu 4:** Bốn lợi ích lớn của Controlled Component: đồng bộ dữ liệu tức thì, dễ tiền xử lý dữ liệu nhập (masking), kiểm tra validation thời gian thực, và điều khiển giao diện động theo State.
5. **Câu 5:** Khái niệm **Component lồng Component** (Nested Components); Vì sao tách nhỏ thành `Avatar`, `UserProfile` giúp mã nguồn dễ bảo trì, đạt chuẩn DRY và dễ mở rộng.

### Phần B: Bài tập luyện tập thực hành ([Thuc_Hanh.md](./Thuc_Hanh.md))
1. **Bài tập 1 (Mức dễ):** Component [NameInputControlled.js](./components/NameInputControlled.js) nhập họ tên và hiển thị lại nội dung "Bạn đã nhập: ...".
2. **Bài tập 2 (Mức trung bình):** Component lồng Component [UserProfile.js](./components/UserProfile.js) lồng [Avatar.js](./components/Avatar.js) truyền dữ liệu qua Props.
3. **Bài tập 3 (Form Đăng ký):** Component [RegisterForm.js](./components/RegisterForm.js) gồm Họ tên, Email, Mật khẩu, Confirm mật khẩu với đầy đủ 4 tiêu chí validation.
   - **🔴 [Ảnh 1: dang_ky_loi.png](./Ảnh/dang_ky_loi.png)**: Minh chứng khi form submit có lỗi.
   - **🟢 [Ảnh 2: dang_ky_thanh_cong.png](./Ảnh/dang_ky_thanh_cong.png)**: Minh chứng khi form điền hợp lệ hiển thị dòng chữ *"Đăng ký thành công"*.
