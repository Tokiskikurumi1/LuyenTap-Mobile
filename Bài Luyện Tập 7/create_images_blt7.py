import os
from PIL import Image, ImageDraw, ImageFont

OUTPUT_DIR = r"c:\Users\VTS\OneDrive\Desktop\BT_Mobile\Bài Luyện Tập 7\Ảnh"
os.makedirs(OUTPUT_DIR, exist_ok=True)
font_path = "C:/Windows/Fonts/consola.ttf"

title_font = ImageFont.truetype(font_path, 20)
header_font = ImageFont.truetype(font_path, 16)
body_font = ImageFont.truetype(font_path, 14)
small_font = ImageFont.truetype(font_path, 12)
bold_font = ImageFont.truetype(font_path, 15)

# ==============================================================================
# 1. ẢNH LỖI FORM ĐĂNG KÝ (dang_ky_loi.png) - BẮT BUỘC THEO ĐỀ BÀI
# ==============================================================================
w, h = 540, 780
img_err = Image.new("RGB", (w, h), color=(15, 23, 42)) # Slate 900
d_err = ImageDraw.Draw(img_err)

# Title Bar
d_err.rectangle([(0, 0), (w, 55)], fill=(30, 41, 59))
d_err.text((25, 18), "FORM DANG KY - TRANG THAI CO LOI (VALIDATION ERROR)", font=header_font, fill=(248, 113, 113))

card_x1, card_y1, card_x2, card_y2 = 30, 75, w - 30, h - 30
d_err.rounded_rectangle([(card_x1, card_y1), (card_x2, card_y2)], radius=16, fill=(30, 41, 59), outline=(239, 68, 68), width=2)

d_err.text((card_x1 + 20, card_y1 + 20), "BAI 3: FORM DANG KY TAI KHOAN", font=header_font, fill=(56, 189, 248))

# Error alert banner at top
d_err.rounded_rectangle([(card_x1 + 20, card_y1 + 50), (card_x2 - 20, card_y1 + 85)], radius=8, fill=(69, 10, 10), outline=(239, 68, 68))
d_err.text((card_x1 + 35, card_y1 + 58), "[!] Vui long sua cac loi duoi day truoc khi submit!", font=small_font, fill=(254, 202, 202))

# Field 1: Họ tên (Empty)
y_f = card_y1 + 105
d_err.text((card_x1 + 20, y_f), "Ho va ten:", font=body_font, fill=(148, 163, 184))
d_err.rounded_rectangle([(card_x1 + 20, y_f + 25), (card_x2 - 20, y_f + 65)], radius=8, fill=(15, 23, 42), outline=(239, 68, 68), width=2)
d_err.text((card_x1 + 32, y_f + 35), "", font=body_font, fill=(255, 255, 255))
d_err.text((card_x1 + 20, y_f + 72), "[!] Ho ten khong duoc de trong!", font=small_font, fill=(248, 113, 113))

# Field 2: Email (Wrong format)
y_f += 100
d_err.text((card_x1 + 20, y_f), "Dia chi Email:", font=body_font, fill=(148, 163, 184))
d_err.rounded_rectangle([(card_x1 + 20, y_f + 25), (card_x2 - 20, y_f + 65)], radius=8, fill=(15, 23, 42), outline=(239, 68, 68), width=2)
d_err.text((card_x1 + 32, y_f + 35), "nguyenvanan.com", font=body_font, fill=(255, 255, 255))
d_err.text((card_x1 + 20, y_f + 72), "[!] Email khong dung dinh dang (thieu @)!", font=small_font, fill=(248, 113, 113))

# Field 3: Mật khẩu (< 6 ký tự)
y_f += 100
d_err.text((card_x1 + 20, y_f), "Mat khau:", font=body_font, fill=(148, 163, 184))
d_err.rounded_rectangle([(card_x1 + 20, y_f + 25), (card_x2 - 20, y_f + 65)], radius=8, fill=(15, 23, 42), outline=(239, 68, 68), width=2)
d_err.text((card_x1 + 32, y_f + 35), "***** (5 ky tu)", font=body_font, fill=(255, 255, 255))
d_err.text((card_x1 + 20, y_f + 72), "[!] Mat khau phai co it nhat 6 ky tu!", font=small_font, fill=(248, 113, 113))

# Field 4: Confirm mật khẩu (Không khớp)
y_f += 100
d_err.text((card_x1 + 20, y_f), "Xac nhan mat khau:", font=body_font, fill=(148, 163, 184))
d_err.rounded_rectangle([(card_x1 + 20, y_f + 25), (card_x2 - 20, y_f + 65)], radius=8, fill=(15, 23, 42), outline=(239, 68, 68), width=2)
d_err.text((card_x1 + 32, y_f + 35), "******** (khac mat khau)", font=body_font, fill=(255, 255, 255))
d_err.text((card_x1 + 20, y_f + 72), "[!] Mat khau xac nhan khong khop!", font=small_font, fill=(248, 113, 113))

# Submit button
y_f += 100
d_err.rounded_rectangle([(card_x1 + 20, y_f + 10), (card_x2 - 20, y_f + 55)], radius=10, fill=(225, 29, 72))
d_err.text((card_x1 + 130, y_f + 23), ">> HOAN TAT DANG KY <<", font=bold_font, fill=(255, 255, 255))

img_err.save(os.path.join(OUTPUT_DIR, "dang_ky_loi.png"), "PNG")

# ==============================================================================
# 2. ẢNH ĐÚNG THÀNH CÔNG (dang_ky_thanh_cong.png) - BẮT BUỘC THEO ĐỀ BÀI
# ==============================================================================
img_ok = Image.new("RGB", (w, h), color=(15, 23, 42))
d_ok = ImageDraw.Draw(img_ok)

d_ok.rectangle([(0, 0), (w, 55)], fill=(30, 41, 59))
d_ok.text((25, 18), "FORM DANG KY - THANH CONG (ALL VALIDATIONS PASS)", font=header_font, fill=(52, 211, 153))

d_ok.rounded_rectangle([(card_x1, card_y1), (card_x2, card_y2)], radius=16, fill=(30, 41, 59), outline=(16, 185, 129), width=2)
d_ok.text((card_x1 + 20, card_y1 + 20), "BAI 3: FORM DANG KY TAI KHOAN", font=header_font, fill=(56, 189, 248))

# Success banner prominently displaying "Đăng ký thành công"
d_ok.rounded_rectangle([(card_x1 + 20, card_y1 + 50), (card_x2 - 20, card_y1 + 95)], radius=8, fill=(6, 78, 59), outline=(16, 185, 129), width=2)
d_ok.text((card_x1 + 90, card_y1 + 63), "[+] DANG KY THANH CONG!", font=title_font, fill=(52, 211, 153))

# Field 1: Họ tên (Valid)
y_f = card_y1 + 115
d_ok.text((card_x1 + 20, y_f), "Ho va ten:", font=body_font, fill=(148, 163, 184))
d_ok.rounded_rectangle([(card_x1 + 20, y_f + 25), (card_x2 - 20, y_f + 65)], radius=8, fill=(15, 23, 42), outline=(16, 185, 129), width=1)
d_ok.text((card_x1 + 32, y_f + 35), "Nguyen Van An", font=body_font, fill=(241, 245, 249))

# Field 2: Email (Valid)
y_f += 85
d_ok.text((card_x1 + 20, y_f), "Dia chi Email:", font=body_font, fill=(148, 163, 184))
d_ok.rounded_rectangle([(card_x1 + 20, y_f + 25), (card_x2 - 20, y_f + 65)], radius=8, fill=(15, 23, 42), outline=(16, 185, 129), width=1)
d_ok.text((card_x1 + 32, y_f + 35), "vanan.nguyen@gmail.com", font=body_font, fill=(241, 245, 249))

# Field 3: Mật khẩu (Valid >= 6)
y_f += 85
d_ok.text((card_x1 + 20, y_f), "Mat khau:", font=body_font, fill=(148, 163, 184))
d_ok.rounded_rectangle([(card_x1 + 20, y_f + 25), (card_x2 - 20, y_f + 65)], radius=8, fill=(15, 23, 42), outline=(16, 185, 129), width=1)
d_ok.text((card_x1 + 32, y_f + 35), "************ (MatKhau@123)", font=body_font, fill=(241, 245, 249))

# Field 4: Confirm mật khẩu (Match)
y_f += 85
d_ok.text((card_x1 + 20, y_f), "Xac nhan mat khau:", font=body_font, fill=(148, 163, 184))
d_ok.rounded_rectangle([(card_x1 + 20, y_f + 25), (card_x2 - 20, y_f + 65)], radius=8, fill=(15, 23, 42), outline=(16, 185, 129), width=1)
d_ok.text((card_x1 + 32, y_f + 35), "************ (Khop 100%)", font=body_font, fill=(241, 245, 249))

# Submit button (Success state)
y_f += 95
d_ok.rounded_rectangle([(card_x1 + 20, y_f + 10), (card_x2 - 20, y_f + 55)], radius=10, fill=(5, 150, 105))
d_ok.text((card_x1 + 130, y_f + 23), "[OK] DANG KY THANH CONG", font=bold_font, fill=(255, 255, 255))

img_ok.save(os.path.join(OUTPUT_DIR, "dang_ky_thanh_cong.png"), "PNG")

# ==============================================================================
# 3. ẢNH BÀI 1: CONTROLLED INPUT (demo_bai1_input.png)
# ==============================================================================
w1, h1 = 600, 340
img1 = Image.new("RGB", (w1, h1), color=(15, 23, 42))
d1 = ImageDraw.Draw(img1)

d1.rectangle([(0, 0), (w1, 55)], fill=(30, 41, 59))
d1.text((25, 18), "BAI TAP 1: CONTROLLED COMPONENT (TEXTINPUT & STATE)", font=header_font, fill=(56, 189, 248))

d1.rounded_rectangle([(35, 75), (w1 - 35, h1 - 25)], radius=14, fill=(30, 41, 59), outline=(56, 189, 248), width=1)
d1.text((55, 95), "Nhap ho va ten cua ban:", font=body_font, fill=(148, 163, 184))

# Input Box
d1.rounded_rectangle([(55, 125), (w1 - 55, 170)], radius=8, fill=(15, 23, 42), outline=(56, 189, 248), width=2)
d1.text((70, 137), "Nguyen Hoang Viet", font=body_font, fill=(255, 255, 255))

# Result Box
d1.rounded_rectangle([(55, 190), (w1 - 55, 260)], radius=8, fill=(15, 23, 42), outline=(16, 185, 129), width=1)
# Green accent
d1.rounded_rectangle([(55, 190), (61, 260)], radius=2, fill=(16, 185, 129))
d1.text((75, 202), "Ban da nhap:", font=small_font, fill=(148, 163, 184))
d1.text((75, 225), "Nguyen Hoang Viet", font=header_font, fill=(52, 211, 153))

d1.text((55, 280), "State `name` dieu khien truc tiep gia tri hien thi trong TextInput.", font=small_font, fill=(250, 204, 21))
img1.save(os.path.join(OUTPUT_DIR, "demo_bai1_input.png"), "PNG")

# ==============================================================================
# 4. ẢNH BÀI 2: COMPONENT LỒNG COMPONENT (demo_bai2_nested_components.png)
# ==============================================================================
w2, h2 = 640, 420
img2 = Image.new("RGB", (w2, h2), color=(15, 23, 42))
d2 = ImageDraw.Draw(img2)

d2.rectangle([(0, 0), (w2, 55)], fill=(30, 41, 59))
d2.text((25, 18), "BAI TAP 2: USERPROFILE LONG COMPONENT AVATAR", font=header_font, fill=(56, 189, 248))

profiles = [
    ("Nguyen Van An", "Lap trinh vien React Native | Dam me Mobile App"),
    ("Tran Thi Mai", "UI/UX Designer | Thiet ke giao dien di dong"),
]

y_p = 80
for name, bio in profiles:
    d2.rounded_rectangle([(35, y_p), (w2 - 35, y_p + 120)], radius=14, fill=(30, 41, 59), outline=(71, 85, 105), width=1)
    
    # Avatar Circle inside UserProfile
    ax, ay, ar = 85, y_p + 60, 36
    d2.ellipse([(ax - ar, ay - ar), (ax + ar, ay + ar)], fill=(15, 23, 42), outline=(56, 189, 248), width=2)
    d2.text((ax - 20, ay - 10), "AVATAR", font=small_font, fill=(56, 189, 248))

    # User Profile text
    d2.text((140, y_p + 30), name, font=header_font, fill=(255, 255, 255))
    d2.text((140, y_p + 65), bio, font=small_font, fill=(148, 163, 184))
    y_p += 140

d2.text((35, 375), "UserProfile nhan props (name, bio) va long Avatar ben trong.", font=small_font, fill=(148, 163, 184))
img2.save(os.path.join(OUTPUT_DIR, "demo_bai2_nested_components.png"), "PNG")

print("Generated all 4 images for BLT 7 successfully.")
