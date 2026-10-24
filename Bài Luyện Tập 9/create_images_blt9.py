import os
import sys
from PIL import Image, ImageDraw, ImageFont

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(BASE_DIR, "Ảnh")
os.makedirs(OUTPUT_DIR, exist_ok=True)

def get_font(size, is_bold=False):
    candidates = ["C:/Windows/Fonts/segouib.ttf" if is_bold else "C:/Windows/Fonts/segoeui.ttf", "C:/Windows/Fonts/arialbd.ttf" if is_bold else "C:/Windows/Fonts/arial.ttf"]
    for p in candidates:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                continue
    return ImageFont.load_default()

title_font = get_font(22, is_bold=True)
header_font = get_font(18, is_bold=True)
card_title = get_font(16, is_bold=True)
body_font = get_font(13)
bold_font = get_font(13, is_bold=True)
small_font = get_font(11)
small_bold = get_font(11, is_bold=True)
avatar_font = get_font(28, is_bold=True)

def draw_vector_icon(d, icon_name, cx, cy, color):
    # cx, cy là tâm của icon
    if icon_name == "user":
        # Đầu tròn + Thân cong
        d.ellipse([(cx - 6, cy - 10), (cx + 6, cy + 2)], fill=color)
        d.chord([(cx - 10, cy + 3), (cx + 10, cy + 18)], start=180, end=0, fill=color)
    elif icon_name == "lock":
        # Cùm khóa + Thân khóa
        d.rounded_rectangle([(cx - 7, cy - 1), (cx + 7, cy + 10)], radius=3, fill=color)
        d.arc([(cx - 5, cy - 9), (cx + 5, cy + 2)], start=180, end=0, fill=color, width=2)
        d.ellipse([(cx - 1.5, cy + 2), (cx + 1.5, cy + 5)], fill=(255, 255, 255))
    elif icon_name == "key":
        # Đầu chìa tròn + thân chìa có răng
        d.ellipse([(cx - 9, cy - 9), (cx - 1, cy - 1)], outline=color, width=2)
        d.line([(cx - 3, cy - 3), (cx + 9, cy + 9)], fill=color, width=2)
        d.line([(cx + 4, cy + 4), (cx + 7, cy + 1)], fill=color, width=2)
        d.line([(cx + 7, cy + 7), (cx + 10, cy + 4)], fill=color, width=2)
    elif icon_name == "bell":
        # Chuông
        d.chord([(cx - 8, cy - 6), (cx + 8, cy + 8)], start=180, end=0, fill=color)
        d.rectangle([(cx - 9, cy + 5), (cx + 9, cy + 7)], fill=color)
        d.ellipse([(cx - 2.5, cy + 7), (cx + 2.5, cy + 10)], fill=color)
    elif icon_name == "moon":
        # Trăng khuyết
        d.ellipse([(cx - 7, cy - 8), (cx + 7, cy + 8)], fill=color)
        d.ellipse([(cx - 4, cy - 11), (cx + 10, cy + 6)], fill=(241, 245, 249))
    elif icon_name == "logout":
        # Cửa và mũi tên thoát ra ngoài
        d.rectangle([(cx - 8, cy - 8), (cx + 1, cy + 8)], outline=color, width=2)
        d.line([(cx - 3, cy), (cx + 8, cy)], fill=color, width=2)
        d.polygon([(cx + 5, cy - 4), (cx + 9, cy), (cx + 5, cy + 4)], fill=color)
    elif icon_name == "link":
        # Mắt xích
        d.arc([(cx - 7, cy - 4), (cx + 1, cy + 4)], start=90, end=270, fill=color, width=2)
        d.arc([(cx - 1, cy - 4), (cx + 7, cy + 4)], start=270, end=90, fill=color, width=2)
        d.line([(cx - 3, cy), (cx + 3, cy)], fill=color, width=2)

# ==============================================================================
# 1. ẢNH BÀI 1: MÀN HÌNH LOGIN ĐƠN GIẢN (anh_login_de.png)
# ==============================================================================
def create_login_image():
    w, h = 480, 850
    img = Image.new("RGB", (w, h), color=(241, 245, 249))
    d = ImageDraw.Draw(img)

    # Status Bar
    d.rectangle([(0, 0), (w, 32)], fill=(241, 245, 249))
    d.text((20, 8), "9:41", font=small_bold, fill=(15, 23, 42))
    d.text((w - 75, 8), "5G  100%", font=small_bold, fill=(15, 23, 42))

    # Top Switcher Bar
    d.rectangle([(0, 32), (w, 80)], fill=(255, 255, 255), outline=(226, 232, 240), width=1)
    d.rounded_rectangle([(16, 38), (w - 16, 74)], radius=10, fill=(241, 245, 249))
    d.rounded_rectangle([(20, 42), (w // 2 - 4, 70)], radius=8, fill=(255, 255, 255))
    d.text((36, 48), "Bai 1: Man Login (De)", font=small_bold, fill=(37, 99, 235))
    d.text((w // 2 + 18, 48), "Bai 2: Profile & Settings", font=small_font, fill=(100, 116, 139))

    # Header & Logo
    center_x = w // 2
    logo_y = 120
    d.ellipse([(center_x - 36, logo_y), (center_x + 36, logo_y + 72)], fill=(37, 99, 235), outline=(191, 219, 254), width=4)
    d.text((center_x - 18, logo_y + 18), "RN", font=title_font, fill=(255, 255, 255))

    d.text((center_x - 90, logo_y + 86), "EduPortal Login", font=title_font, fill=(15, 23, 42))
    d.text((center_x - 130, logo_y + 118), "Dang nhap de tiep tuc hoc tap va lam viec", font=small_font, fill=(100, 116, 139))

    # Form Card
    card_x1, card_y1 = 28, logo_y + 150
    card_x2, card_y2 = w - 28, card_y1 + 380
    d.rounded_rectangle([(card_x1, card_y1), (card_x2, card_y2)], radius=20, fill=(255, 255, 255), outline=(226, 232, 240), width=1)

    # Input 1: Email
    inp1_y = card_y1 + 24
    d.text((card_x1 + 20, inp1_y), "Dia chi Email", font=bold_font, fill=(51, 65, 85))
    d.rounded_rectangle([(card_x1 + 20, inp1_y + 24), (card_x2 - 20, inp1_y + 72)], radius=12, fill=(248, 250, 252), outline=(203, 213, 225), width=1)
    d.text((card_x1 + 36, inp1_y + 39), "student@fpt.edu.vn", font=body_font, fill=(15, 23, 42))

    # Input 2: Password
    inp2_y = inp1_y + 90
    d.text((card_x1 + 20, inp2_y), "Mat khau", font=bold_font, fill=(51, 65, 85))
    d.rounded_rectangle([(card_x1 + 20, inp2_y + 24), (card_x2 - 20, inp2_y + 72)], radius=12, fill=(248, 250, 252), outline=(203, 213, 225), width=1)
    d.text((card_x1 + 36, inp2_y + 39), "••••••••••••", font=body_font, fill=(15, 23, 42))

    # Forgot password text
    d.text((card_x2 - 145, inp2_y + 86), "Forgot password?", font=bold_font, fill=(37, 99, 235))

    # Login Button
    btn_y = inp2_y + 125
    d.rounded_rectangle([(card_x1 + 20, btn_y), (card_x2 - 20, btn_y + 50)], radius=12, fill=(37, 99, 235))
    d.text((center_x - 55, btn_y + 14), "Dang nhap ngay", font=header_font, fill=(255, 255, 255))

    # Info banner
    banner_y = card_y2 + 20
    d.rounded_rectangle([(card_x1, banner_y), (card_x2, banner_y + 55)], radius=12, fill=(238, 242, 255), outline=(199, 210, 254), width=1)
    d.text((card_x1 + 14, banner_y + 10), "StyleSheet properties included:", font=small_bold, fill=(67, 56, 202))
    d.text((card_x1 + 14, banner_y + 28), "backgroundColor, padding, margin, borderWidth, borderRadius, flex...", font=small_font, fill=(79, 70, 229))

    # Footer
    d.text((center_x - 90, h - 35), "(c) 2026 Mobile Development Lab 9", font=small_font, fill=(148, 163, 184))

    out_path = os.path.join(OUTPUT_DIR, "anh_login_de.png")
    img.save(out_path, "PNG")
    print(f"[OK] Da tao: {out_path}")

# ==============================================================================
# 2. ẢNH BÀI 2 (MÀN HÌNH NHỎ / PHONE): anh_profile_settings_small.png
# ==============================================================================
def create_profile_small_image():
    w, h = 480, 960
    img = Image.new("RGB", (w, h), color=(248, 250, 252))
    d = ImageDraw.Draw(img)

    # Status Bar
    d.rectangle([(0, 0), (w, 32)], fill=(255, 255, 255))
    d.text((20, 8), "9:41", font=small_bold, fill=(15, 23, 42))
    d.text((w - 75, 8), "5G  100%", font=small_bold, fill=(15, 23, 42))

    # Top Tab Bar
    d.rectangle([(0, 32), (w, 80)], fill=(255, 255, 255), outline=(226, 232, 240), width=1)
    d.rounded_rectangle([(16, 38), (w - 16, 74)], radius=10, fill=(241, 245, 249))
    d.text((36, 48), "Bai 1: Man Login (De)", font=small_font, fill=(100, 116, 139))
    d.rounded_rectangle([(w // 2, 42), (w - 20, 70)], radius=8, fill=(255, 255, 255))
    d.text((w // 2 + 10, 48), "Bai 2: Profile & Settings", font=small_bold, fill=(37, 99, 235))

    # Profile Card
    p_x1, p_y1 = 16, 96
    p_x2, p_y2 = w - 16, 385
    d.rounded_rectangle([(p_x1, p_y1), (p_x2, p_y2)], radius=24, fill=(255, 255, 255), outline=(226, 232, 240), width=1)

    cx = w // 2
    av_y = p_y1 + 18
    d.ellipse([(cx - 40, av_y), (cx + 40, av_y + 80)], fill=(37, 99, 235), outline=(239, 246, 255), width=4)
    d.text((cx - 22, av_y + 22), "MN", font=avatar_font, fill=(255, 255, 255))
    d.ellipse([(cx + 20, av_y + 58), (cx + 36, av_y + 74)], fill=(16, 185, 129), outline=(255, 255, 255), width=2)

    d.text((cx - 75, av_y + 90), "Nguyen Minh Nhat", font=card_title, fill=(15, 23, 42))
    d.text((cx - 85, av_y + 114), "Mobile Software Engineer", font=small_bold, fill=(37, 99, 235))
    d.text((cx - 165, av_y + 134), "Dam me kien tao ung dung di dong React Native & Flexbox", font=small_font, fill=(100, 116, 139))

    # Stats Row
    st_y1 = av_y + 160
    d.rounded_rectangle([(p_x1 + 16, st_y1), (p_x2 - 16, st_y1 + 52)], radius=14, fill=(248, 250, 252))
    col1 = p_x1 + 60
    d.text((col1 - 10, st_y1 + 8), "128", font=bold_font, fill=(15, 23, 42))
    d.text((col1 - 16, st_y1 + 28), "Bai viet", font=small_font, fill=(148, 163, 184))

    col2 = cx
    d.text((col2 - 12, st_y1 + 8), "3.4K", font=bold_font, fill=(15, 23, 42))
    d.text((col2 - 24, st_y1 + 28), "Followers", font=small_font, fill=(148, 163, 184))

    col3 = p_x2 - 60
    d.text((col3 - 10, st_y1 + 8), "489", font=bold_font, fill=(15, 23, 42))
    d.text((col3 - 32, st_y1 + 28), "Dang theo doi", font=small_font, fill=(148, 163, 184))

    # Action buttons
    act_y = st_y1 + 64
    d.rounded_rectangle([(p_x1 + 16, act_y), (p_x2 - 64, act_y + 42)], radius=12, fill=(37, 99, 235))
    d.text((cx - 65, act_y + 12), "Chinh sua ho so", font=bold_font, fill=(255, 255, 255))
    d.rounded_rectangle([(p_x2 - 54, act_y), (p_x2 - 16, act_y + 42)], radius=12, fill=(241, 245, 249))
    draw_vector_icon(d, "link", p_x2 - 35, act_y + 21, (71, 85, 105))

    # Settings Section 1
    s_y = p_y2 + 16
    d.text((p_x1 + 4, s_y), "TAI KHOAN & BAO MAT", font=small_bold, fill=(71, 85, 105))

    card_s1_y = s_y + 20
    d.rounded_rectangle([(p_x1, card_s1_y), (p_x2, card_s1_y + 160)], radius=18, fill=(255, 255, 255), outline=(226, 232, 240), width=1)

    items1 = [
        ("user", "Thong tin ca nhan", "Cap nhat ho ten, avatar, bio", ">", (37, 99, 235)),
        ("lock", "Doi mat khau", "Bao mat mat khau 2 lop 2FA", ">", (16, 185, 129)),
        ("key", "Sinh trac hoc (FaceID)", "Van tay / Nhan dien khuon mat", "ON", (245, 158, 11)),
    ]
    cur_y = card_s1_y + 6
    for idx, (icon_type, title, desc, right, icon_col) in enumerate(items1):
        # Icon tròn
        d.rounded_rectangle([(p_x1 + 12, cur_y + 6), (p_x1 + 46, cur_y + 40)], radius=10, fill=(241, 245, 249))
        draw_vector_icon(d, icon_type, p_x1 + 29, cur_y + 23, icon_col)
        # Text
        d.text((p_x1 + 56, cur_y + 6), title, font=bold_font, fill=(30, 41, 59))
        d.text((p_x1 + 56, cur_y + 26), desc, font=small_font, fill=(148, 163, 184))
        # Right action
        if right == "ON":
            d.rounded_rectangle([(p_x2 - 52, cur_y + 12), (p_x2 - 14, cur_y + 32)], radius=10, fill=(147, 197, 253))
            d.ellipse([(p_x2 - 32, cur_y + 13), (p_x2 - 16, cur_y + 31)], fill=(37, 99, 235))
        else:
            d.text((p_x2 - 24, cur_y + 12), ">", font=bold_font, fill=(148, 163, 184))
        if idx < 2:
            d.line([(p_x1 + 56, cur_y + 48), (p_x2 - 12, cur_y + 48)], fill=(241, 245, 249), width=1)
        cur_y += 50

    # Section 2: Tùy chọn ứng dụng
    s2_y = card_s1_y + 175
    d.text((p_x1 + 4, s2_y), "TUY CHON UNG DUNG & HE THONG", font=small_bold, fill=(71, 85, 105))
    card_s2_y = s2_y + 20
    d.rounded_rectangle([(p_x1, card_s2_y), (p_x2, card_s2_y + 160)], radius=18, fill=(255, 255, 255), outline=(226, 232, 240), width=1)

    items2 = [
        ("bell", "Thong bao day", "Nhan thong bao bai hoc moi", "ON", (14, 165, 233)),
        ("moon", "Che do toi (Dark Mode)", "Tu dong theo he thong", "OFF", (99, 102, 241)),
        ("logout", "Dang xuat tai khoan", "Thoat phien dang nhap hien tai", ">", (220, 38, 38)),
    ]
    cur_y = card_s2_y + 6
    for idx, (icon_type, title, desc, right, icon_col) in enumerate(items2):
        is_logout = (idx == 2)
        d.rounded_rectangle([(p_x1 + 12, cur_y + 6), (p_x1 + 46, cur_y + 40)], radius=10, fill=(254, 226, 226) if is_logout else (241, 245, 249))
        draw_vector_icon(d, icon_type, p_x1 + 29, cur_y + 23, icon_col)
        d.text((p_x1 + 56, cur_y + 6), title, font=bold_font, fill=(220, 38, 38) if is_logout else (30, 41, 59))
        d.text((p_x1 + 56, cur_y + 26), desc, font=small_font, fill=(148, 163, 184))
        if right == "ON":
            d.rounded_rectangle([(p_x2 - 52, cur_y + 12), (p_x2 - 14, cur_y + 32)], radius=10, fill=(147, 197, 253))
            d.ellipse([(p_x2 - 32, cur_y + 13), (p_x2 - 16, cur_y + 31)], fill=(37, 99, 235))
        elif right == "OFF":
            d.rounded_rectangle([(p_x2 - 52, cur_y + 12), (p_x2 - 14, cur_y + 32)], radius=10, fill=(203, 213, 225))
            d.ellipse([(p_x2 - 50, cur_y + 13), (p_x2 - 34, cur_y + 31)], fill=(248, 250, 252))
        else:
            d.text((p_x2 - 24, cur_y + 12), ">", font=bold_font, fill=(220, 38, 38) if is_logout else (148, 163, 184))
        if idx < 2:
            d.line([(p_x1 + 56, cur_y + 48), (p_x2 - 12, cur_y + 48)], fill=(241, 245, 249), width=1)
        cur_y += 50

    # Badge Responsive Indicator
    badge_y = h - 45
    d.rounded_rectangle([(p_x1, badge_y), (p_x2, badge_y + 32)], radius=8, fill=(241, 245, 249))
    d.text((p_x1 + 20, badge_y + 8), "[*] Phone Viewport (w < 700px) - Flexbox Column Stack", font=small_bold, fill=(71, 85, 105))

    out_path = os.path.join(OUTPUT_DIR, "anh_profile_settings_small.png")
    img.save(out_path, "PNG")
    print(f"[OK] Da tao: {out_path}")

# ==============================================================================
# 3. ẢNH BÀI 2 (MÀN HÌNH LỚN / TABLET): anh_profile_settings_large.png
# ==============================================================================
def create_profile_large_image():
    w, h = 960, 680
    img = Image.new("RGB", (w, h), color=(248, 250, 252))
    d = ImageDraw.Draw(img)

    # Status Bar
    d.rectangle([(0, 0), (w, 32)], fill=(255, 255, 255))
    d.text((24, 8), "9:41 AM  -  Tablet / Large Emulator (iPad / Foldable)", font=small_bold, fill=(15, 23, 42))
    d.text((w - 95, 8), "Wi-Fi  100%", font=small_bold, fill=(15, 23, 42))

    # Top Switcher Bar
    d.rectangle([(0, 32), (w, 82)], fill=(255, 255, 255), outline=(226, 232, 240), width=1)
    d.rounded_rectangle([(24, 38), (w - 24, 76)], radius=10, fill=(241, 245, 249))
    d.text((50, 49), "Bai 1: Man Login (De)", font=small_font, fill=(100, 116, 139))
    d.rounded_rectangle([(w // 2, 42), (w - 30, 72)], radius=8, fill=(255, 255, 255))
    d.text((w // 2 + 30, 49), "Bai 2: Profile & Settings (Active Tablet Layout)", font=small_bold, fill=(37, 99, 235))

    # Responsive layout: 2 CỘT NẰM NGANG
    p_x1, p_y1 = 24, 102
    p_x2, p_y2 = 364, 610
    d.rounded_rectangle([(p_x1, p_y1), (p_x2, p_y2)], radius=24, fill=(255, 255, 255), outline=(226, 232, 240), width=1)

    # Avatar cột trái
    cx_p = (p_x1 + p_x2) // 2
    av_y = p_y1 + 30
    d.ellipse([(cx_p - 45, av_y), (cx_p + 45, av_y + 90)], fill=(37, 99, 235), outline=(239, 246, 255), width=5)
    d.text((cx_p - 24, av_y + 26), "MN", font=avatar_font, fill=(255, 255, 255))
    d.ellipse([(cx_p + 22, av_y + 64), (cx_p + 40, av_y + 82)], fill=(16, 185, 129), outline=(255, 255, 255), width=3)

    d.text((cx_p - 82, av_y + 105), "Nguyen Minh Nhat", font=card_title, fill=(15, 23, 42))
    d.text((cx_p - 90, av_y + 130), "Mobile Software Engineer", font=small_bold, fill=(37, 99, 235))
    d.text((cx_p - 140, av_y + 155), "Kien tao ung dung da man hinh bang Flexbox", font=small_font, fill=(100, 116, 139))
    d.text((cx_p - 110, av_y + 172), "React Native Mobile Engineering", font=small_font, fill=(100, 116, 139))

    # Stats Row
    st_y1 = av_y + 205
    d.rounded_rectangle([(p_x1 + 16, st_y1), (p_x2 - 16, st_y1 + 60)], radius=14, fill=(248, 250, 252))
    col1 = p_x1 + 55
    d.text((col1 - 10, st_y1 + 10), "128", font=bold_font, fill=(15, 23, 42))
    d.text((col1 - 16, st_y1 + 32), "Bai viet", font=small_font, fill=(148, 163, 184))

    col2 = cx_p
    d.text((col2 - 12, st_y1 + 10), "3.4K", font=bold_font, fill=(15, 23, 42))
    d.text((col2 - 24, st_y1 + 32), "Followers", font=small_font, fill=(148, 163, 184))

    col3 = p_x2 - 55
    d.text((col3 - 10, st_y1 + 10), "489", font=bold_font, fill=(15, 23, 42))
    d.text((col3 - 32, st_y1 + 32), "Following", font=small_font, fill=(148, 163, 184))

    # Buttons
    act_y = st_y1 + 75
    d.rounded_rectangle([(p_x1 + 16, act_y), (p_x2 - 64, act_y + 44)], radius=12, fill=(37, 99, 235))
    d.text((cx_p - 60, act_y + 13), "Chinh sua ho so", font=bold_font, fill=(255, 255, 255))
    d.rounded_rectangle([(p_x2 - 54, act_y), (p_x2 - 16, act_y + 44)], radius=12, fill=(241, 245, 249))
    draw_vector_icon(d, "link", p_x2 - 35, act_y + 22, (71, 85, 105))

    # CỘT PHẢI: Settings Sections
    s_x1 = 388
    s_x2 = w - 24

    # Group 1
    d.text((s_x1 + 4, p_y1), "TAI KHOAN & BAO MAT (ACCOUNT & SECURITY)", font=small_bold, fill=(71, 85, 105))
    c1_y = p_y1 + 22
    d.rounded_rectangle([(s_x1, c1_y), (s_x2, c1_y + 185)], radius=20, fill=(255, 255, 255), outline=(226, 232, 240), width=1)

    items_large_1 = [
        ("user", "Thong tin ca nhan", "Cap nhat ho ten, anh dai dien, so dien thoai lien he", ">", (37, 99, 235)),
        ("lock", "Doi mat khau dang nhap", "Cai dat ma PIN va bao mat 2FA qua ung dung Authenticator", ">", (16, 185, 129)),
        ("key", "Xac thuc sinh trac hoc", "Dang nhap nhanh bang Van tay hoac FaceID tren thiet bi", "ON", (245, 158, 11)),
    ]
    cur_y = c1_y + 8
    for idx, (icon_type, title, desc, right, icon_col) in enumerate(items_large_1):
        d.rounded_rectangle([(s_x1 + 16, cur_y + 6), (s_x1 + 54, cur_y + 44)], radius=12, fill=(241, 245, 249))
        draw_vector_icon(d, icon_type, s_x1 + 35, cur_y + 25, icon_col)
        d.text((s_x1 + 68, cur_y + 8), title, font=bold_font, fill=(30, 41, 59))
        d.text((s_x1 + 68, cur_y + 28), desc, font=small_font, fill=(148, 163, 184))
        if right == "ON":
            d.rounded_rectangle([(s_x2 - 62, cur_y + 14), (s_x2 - 18, cur_y + 36)], radius=11, fill=(147, 197, 253))
            d.ellipse([(s_x2 - 38, cur_y + 15), (s_x2 - 20, cur_y + 35)], fill=(37, 99, 235))
        else:
            d.text((s_x2 - 30, cur_y + 16), ">", font=bold_font, fill=(148, 163, 184))
        if idx < 2:
            d.line([(s_x1 + 68, cur_y + 54), (s_x2 - 16, cur_y + 54)], fill=(241, 245, 249), width=1)
        cur_y += 58

    # Group 2
    g2_y = c1_y + 205
    d.text((s_x1 + 4, g2_y), "CAI DAT HE THONG & UNG DUNG (SYSTEM PREFERENCES)", font=small_bold, fill=(71, 85, 105))
    c2_y = g2_y + 22
    d.rounded_rectangle([(s_x1, c2_y), (s_x2, c2_y + 185)], radius=20, fill=(255, 255, 255), outline=(226, 232, 240), width=1)

    items_large_2 = [
        ("bell", "Thong bao day", "Nhan tin nhan thong bao bai hoc moi va tin tuc hoc tap", "ON", (14, 165, 233)),
        ("moon", "Che do toi (Dark Mode)", "Giao dien nen toi tiet kiem pin AMOLED va chong moi mat", "OFF", (99, 102, 241)),
        ("logout", "Dang xuat tai khoan", "Ket thuc phien lam viec va xoa token dang nhap an toan", ">", (220, 38, 38)),
    ]
    cur_y = c2_y + 8
    for idx, (icon_type, title, desc, right, icon_col) in enumerate(items_large_2):
        is_logout = (idx == 2)
        d.rounded_rectangle([(s_x1 + 16, cur_y + 6), (s_x1 + 54, cur_y + 44)], radius=12, fill=(254, 226, 226) if is_logout else (241, 245, 249))
        draw_vector_icon(d, icon_type, s_x1 + 35, cur_y + 25, icon_col)
        d.text((s_x1 + 68, cur_y + 8), title, font=bold_font, fill=(220, 38, 38) if is_logout else (30, 41, 59))
        d.text((s_x1 + 68, cur_y + 28), desc, font=small_font, fill=(148, 163, 184))
        if right == "ON":
            d.rounded_rectangle([(s_x2 - 62, cur_y + 14), (s_x2 - 18, cur_y + 36)], radius=11, fill=(147, 197, 253))
            d.ellipse([(s_x2 - 38, cur_y + 15), (s_x2 - 20, cur_y + 35)], fill=(37, 99, 235))
        elif right == "OFF":
            d.rounded_rectangle([(s_x2 - 62, cur_y + 14), (s_x2 - 18, cur_y + 36)], radius=11, fill=(203, 213, 225))
            d.ellipse([(s_x2 - 60, cur_y + 15), (s_x2 - 42, cur_y + 35)], fill=(248, 250, 252))
        else:
            d.text((s_x2 - 30, cur_y + 16), ">", font=bold_font, fill=(220, 38, 38) if is_logout else (148, 163, 184))
        if idx < 2:
            d.line([(s_x1 + 68, cur_y + 54), (s_x2 - 16, cur_y + 54)], fill=(241, 245, 249), width=1)
        cur_y += 58

    # Bottom responsive indicator bar
    b_bar_y = h - 42
    d.rounded_rectangle([(24, b_bar_y), (w - 24, b_bar_y + 30)], radius=8, fill=(238, 242, 255), outline=(199, 210, 254), width=1)
    d.text((36, b_bar_y + 8), "[*] Tablet / Landscape Viewport (w >= 700px) - Flexbox Row Multi-Column Responsive Layout (flex: 1 & gap: 24)", font=small_bold, fill=(67, 56, 202))

    out_path = os.path.join(OUTPUT_DIR, "anh_profile_settings_large.png")
    img.save(out_path, "PNG")
    print(f"[OK] Da tao: {out_path}")

if __name__ == "__main__":
    create_login_image()
    create_profile_small_image()
    create_profile_large_image()
    print("Tao anh pixel-perfect hoan tat!")
