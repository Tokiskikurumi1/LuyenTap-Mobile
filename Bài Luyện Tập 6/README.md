# BÀI LUYỆN TẬP 6: COMPONENTS, PROPS VÀ STATE TRONG REACT NATIVE

Thư mục này chứa đầy đủ tài liệu lý thuyết, mã nguồn các component thực hành, mockup giao diện trực quan và hướng dẫn tích hợp cho **Bài Luyện Tập 6**.

---

## 📁 Cấu trúc thư mục

```text
Bài Luyện Tập 6/
├── 📁 components/
│   ├── Greeting.js              # Bài 1: Functional Component nhận prop name
│   ├── StudentInfo.js           # Bài 2: Component thẻ sinh viên nhận props fullName, className, major
│   └── CounterHook.js           # Bài 3: Component bộ đếm sử dụng Hook useState
├── 📁 Ảnh/
│   ├── demo_bai1_greeting.png   # Mockup Bài 1 (Greeting)
│   ├── demo_bai2_student_info.png # Mockup Bài 2 (StudentInfo)
│   ├── demo_bai3_counter.png    # Mockup Bài 3 (CounterHook)
│   └── demo_tong_hop.png        # Mockup toàn bộ ứng dụng trên màn hình Smartphone
├── 📄 App.js                    # Ứng dụng chính tích hợp cả 3 bài tập
├── 📄 package.json              # File cấu hình dự án
├── 📄 Ly_Thuyet.md              # Lời giải chi tiết 5 câu hỏi lý thuyết (Phần A)
├── 📄 Thuc_Hanh.md              # Mã nguồn, giải thích cơ chế Props/State và hình ảnh minh họa (Phần B)
└── 📄 README.md                 # Tóm tắt và mục lục tra cứu nhanh
```

---

## 📌 Tóm tắt nội dung chính

### Phần A: Câu hỏi ôn tập lý thuyết ([Ly_Thuyet.md](./Ly_Thuyet.md))
1. **Câu 1:** Khái niệm Component trong React Native; Vì sao được xem là các "khối xây dựng" (Building Blocks) cơ bản của giao diện mobile (nguyên lý Composition, cấu trúc cây phân cấp Component Tree).
2. **Câu 2:** Ba đặc điểm cốt lõi của Component: **Tính độc lập** (Independence), **Tính tái sử dụng** (Reusability), và **Tính đóng gói** (Encapsulation); Lợi ích đối với việc bảo trì mã nguồn và làm việc nhóm.
3. **Câu 3:** So sánh toàn diện giữa **Functional Component** (kết hợp Hooks) và **Class Component**; Vì sao Functional Component trở thành chuẩn mực hiện đại (loại bỏ từ khóa `this`, ngắn gọn, tận dụng sức mạnh Hooks).
4. **Câu 4:** Vai trò của Hook `useState`; Phân tích sâu vì sao **bắt buộc phải dùng State thay vì biến thông thường** (`let count = 0`) để kích hoạt chu trình Re-render cập nhật giao diện.
5. **Câu 5:** Chức năng của Hook `useEffect` (xử lý Side Effects); Các tình huống thực tế thường gặp: *gọi API khi Mount, ghi nhận analytics khi State đổi, thiết lập Timer/Sensor kèm hàm Cleanup*.

### Phần B: Bài tập luyện tập thực hành ([Thuc_Hanh.md](./Thuc_Hanh.md))
1. **Bài tập 1 (Mức dễ):** Xây dựng component [Greeting.js](./components/Greeting.js) nhận prop `name` và sử dụng nhiều lần trong [App.js](./App.js) với các tên khác nhau.
2. **Bài tập 2 (Mức dễ - trung bình):** Xây dựng component [StudentInfo.js](./components/StudentInfo.js) hiển thị thông tin sinh viên dạng Card và tái sử dụng để hiển thị danh sách sinh viên qua `map()`.
3. **Bài tập 3 (Mức trung bình):** Xây dựng component [CounterHook.js](./components/CounterHook.js) sử dụng Hook `useState` với nút "Tăng" và bộ đếm số lần tương tác, minh chứng quá trình Re-render tự động.
4. **Tích hợp toàn diện:** File [App.js](./App.js) kết hợp hài hòa cả 3 bài tập trên một giao diện Mobile tối ưu chuẩn UI/UX.
