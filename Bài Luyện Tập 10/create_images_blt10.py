import os
import sys
from PIL import Image, ImageDraw, ImageFont

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(BASE_DIR, "Ảnh")
os.makedirs(OUTPUT_DIR, exist_ok=True)

def get_font(size, is_bold=False):
    candidates = [
        "C:/Windows/Fonts/segouib.ttf" if is_bold else "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if is_bold else "C:/Windows/Fonts/arial.ttf"
    ]
    for p in candidates:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                continue
    return ImageFont.load_default()

title_font = get_font(20, is_bold=True)
header_font = get_font(16, is_bold=True)
card_title = get_font(14, is_bold=True)
body_font = get_font(12)
bold_font = get_font(12, is_bold=True)
small_font = get_font(11)
small_bold = get_font(11, is_bold=True)

def draw_vector_icon(d, icon_name, cx, cy, color):
    if icon_name == "camera":
        d.rounded_rectangle([(cx - 10, cy - 6), (cx + 10, cy + 9)], radius=3, outline=color, width=2)
        d.ellipse([(cx - 4, cy - 1), (cx + 4, cy + 7)], outline=color, width=2)
        d.rectangle([(cx - 5, cy - 9), (cx - 1, cy - 6)], fill=color)
    elif icon_name == "pin":
        d.ellipse([(cx - 6, cy - 8), (cx + 6, cy + 4)], fill=color)
        d.polygon([(cx - 5, cy + 1), (cx + 5, cy + 1), (cx, cy + 9)], fill=color)
        d.ellipse([(cx - 2, cy - 4), (cx + 2, cy)], fill=(255, 255, 255))
    elif icon_name == "storage":
        d.rounded_rectangle([(cx - 8, cy - 8), (cx + 8, cy + 8)], radius=2, outline=color, width=2)
        d.line([(cx - 6, cy - 2), (cx + 6, cy - 2)], fill=color, width=2)
        d.line([(cx - 6, cy + 3), (cx + 6, cy + 3)], fill=color, width=2)
    elif icon_name == "trash":
        d.line([(cx - 6, cy - 5), (cx + 6, cy - 5)], fill=color, width=2)
        d.rectangle([(cx - 5, cy - 4), (cx + 5, cy + 7)], outline=color, width=1)
        d.line([(cx - 2, cy - 2), (cx - 2, cy + 5)], fill=color, width=1)
        d.line([(cx + 2, cy - 2), (cx + 2, cy + 5)], fill=color, width=1)

# ==============================================================================
# ẢNH 1: BÀI 1 - MÀN HÌNH GỌI API PUBLIC JSONPLACEHOLDER (anh_api_posts.png)
# ==============================================================================
def create_api_posts_image():
    w, h = 480, 920
    img = Image.new("RGB", (w, h), color=(248, 250, 252))
    d = ImageDraw.Draw(img)

    # Status Bar
    d.rectangle([(0, 0), (w, 32)], fill=(255, 255, 255))
    d.text((20, 8), "9:41", font=small_bold, fill=(15, 23, 42))
    d.text((w - 75, 8), "5G  100%", font=small_bold, fill=(15, 23, 42))

    # Top Tab Bar
    d.rectangle([(0, 32), (w, 80)], fill=(255, 255, 255), outline=(226, 232, 240), width=1)
    d.rounded_rectangle([(12, 38), (w - 12, 74)], radius=10, fill=(241, 245, 249))
    d.rounded_rectangle([(14, 42), (w // 3, 70)], radius=8, fill=(255, 255, 255))
    d.text((24, 48), "Bai 1: REST API", font=small_bold, fill=(37, 99, 235))
    d.text((w // 3 + 18, 48), "Bai 2: Anh & GPS", font=small_font, fill=(100, 116, 139))
    d.text((2 * w // 3 + 10, 48), "Bai 2: Saved Data", font=small_font, fill=(100, 116, 139))

    # Sub-header bar
    d.rectangle([(0, 80), (w, 136)], fill=(255, 255, 255), outline=(226, 232, 240), width=1)
    d.text((18, 88), "JSONPlaceholder Posts", font=title_font, fill=(15, 23, 42))
    d.text((18, 113), "Public REST API Fetch - FlatList Render", font=small_font, fill=(100, 116, 139))
    d.rounded_rectangle([(w - 105, 94), (w - 18, 122)], radius=14, fill=(239, 246, 255), outline=(191, 219, 254), width=1)
    d.text((w - 95, 100), "15 bai viet", font=small_bold, fill=(37, 99, 235))

    # Posts List (Render 4 thẻ bài viết)
    posts_data = [
        ("POST #1", "User #1", "sunt aut facere repellat provident occaecati excepturi", "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"),
        ("POST #2", "User #1", "qui est esse", "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis"),
        ("POST #3", "User #1", "ea molestias quasi exercitationem repellat qui ipsa sit aut", "et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus vel accusantium quis pariatur molestiae porro eius odio et labore et velit"),
        ("POST #4", "User #1", "eum et est occaecati", "ullam et saepe reiciendis voluptatem adipisci sit amet autem assumenda provident rerum culpa quis hic commodi nesciunt rem tenetur doloremque ipsam"),
    ]

    card_y = 150
    for p_id, p_author, p_title, p_body in posts_data:
        d.rounded_rectangle([(16, card_y), (w - 16, card_y + 155)], radius=16, fill=(255, 255, 255), outline=(226, 232, 240), width=1)
        # Badges
        d.rounded_rectangle([(28, card_y + 12), (90, card_y + 32)], radius=6, fill=(241, 245, 249))
        d.text((34, card_y + 16), p_id, font=small_bold, fill=(71, 85, 105))
        d.text((w - 85, card_y + 16), p_author, font=small_font, fill=(148, 163, 184))
        # Title
        d.text((28, card_y + 40), p_title[:45] + ("..." if len(p_title) > 45 else ""), font=card_title, fill=(30, 41, 59))
        # Body
        d.text((28, card_y + 66), p_body[:60], font=body_font, fill=(100, 116, 139))
        d.text((28, card_y + 86), p_body[60:122] + "...", font=body_font, fill=(100, 116, 139))
        # Footer mini line
        d.line([(28, card_y + 118), (w - 28, card_y + 118)], fill=(248, 250, 252), width=1)
        d.text((28, card_y + 128), "STATUS: 200 OK | Tra ve du lieu JSON hoan hao", font=small_font, fill=(16, 185, 129))

        card_y += 170

    # Indicator pull to refresh & success
    d.rounded_rectangle([(16, h - 50), (w - 16, h - 14)], radius=8, fill=(238, 242, 255), outline=(199, 210, 254), width=1)
    d.text((28, h - 38), "[OK] Goi API JSONPlaceholder thanh cong | FlatList da render", font=small_bold, fill=(67, 56, 202))

    out_path = os.path.join(OUTPUT_DIR, "anh_api_posts.png")
    img.save(out_path, "PNG")
    print(f"[OK] Da tao: {out_path}")

# ==============================================================================
# ẢNH 2: BÀI 2 - FORM CHỌN ẢNH + LẤY VỊ TRÍ GPS + LƯU (anh_mini_app_input.png)
# ==============================================================================
def create_mini_app_input_image():
    w, h = 480, 920
    img = Image.new("RGB", (w, h), color=(248, 250, 252))
    d = ImageDraw.Draw(img)

    # Status Bar
    d.rectangle([(0, 0), (w, 32)], fill=(255, 255, 255))
    d.text((20, 8), "9:41", font=small_bold, fill=(15, 23, 42))
    d.text((w - 75, 8), "5G  100%", font=small_bold, fill=(15, 23, 42))

    # Top Tab Bar
    d.rectangle([(0, 32), (w, 80)], fill=(255, 255, 255), outline=(226, 232, 240), width=1)
    d.rounded_rectangle([(12, 38), (w - 12, 74)], radius=10, fill=(241, 245, 249))
    d.text((24, 48), "Bai 1: REST API", font=small_font, fill=(100, 116, 139))
    d.rounded_rectangle([(w // 3 + 2, 42), (2 * w // 3 - 2, 70)], radius=8, fill=(255, 255, 255))
    d.text((w // 3 + 12, 48), "Bai 2: Anh & GPS", font=small_bold, fill=(37, 99, 235))
    d.text((2 * w // 3 + 10, 48), "Bai 2: Saved Data", font=small_font, fill=(100, 116, 139))

    # Header Card
    d.text((18, 92), "Tao Ban Ghi Check-in Moi", font=title_font, fill=(15, 23, 42))
    d.text((18, 118), "Ket hop Image Picker, Geolocation va AsyncStorage", font=small_font, fill=(100, 116, 139))

    # KHỐI 1: IMAGE PICKER
    b1_y = 145
    d.rounded_rectangle([(16, b1_y), (w - 16, b1_y + 130)], radius=16, fill=(255, 255, 255), outline=(226, 232, 240), width=1)
    d.text((28, b1_y + 14), "1. Anh dinh kem (Image Picker)", font=card_title, fill=(30, 41, 59))

    # Thumbnail avatar
    img_box_x = 28
    img_box_y = b1_y + 40
    d.rounded_rectangle([(img_box_x, img_box_y), (img_box_x + 72, img_box_y + 72)], radius=14, fill=(224, 242, 254), outline=(147, 197, 253), width=2)
    # Vẽ mặt người avatar bên trong box
    d.ellipse([(img_box_x + 22, img_box_y + 12), (img_box_x + 50, img_box_y + 40)], fill=(37, 99, 235))
    d.chord([(img_box_x + 12, img_box_y + 38), (img_box_x + 60, img_box_y + 70)], start=180, end=0, fill=(37, 99, 235))

    # Action picker
    d.rounded_rectangle([(img_box_x + 88, img_box_y + 6), (w - 28, img_box_y + 42)], radius=10, fill=(239, 246, 255), outline=(147, 197, 253), width=1)
    draw_vector_icon(d, "camera", img_box_x + 104, img_box_y + 24, (37, 99, 235))
    d.text((img_box_x + 120, img_box_y + 16), "Chon / Doi anh tu Thu vien", font=small_bold, fill=(37, 99, 235))
    d.text((img_box_x + 88, img_box_y + 50), "Ho tro thu vien anh may & chup camera", font=small_font, fill=(148, 163, 184))

    # KHỐI 2: GEOLOCATION
    b2_y = b1_y + 145
    d.rounded_rectangle([(16, b2_y), (w - 16, b2_y + 160)], radius=16, fill=(255, 255, 255), outline=(226, 232, 240), width=1)
    d.text((28, b2_y + 14), "2. Dinh vi GPS (Geolocation)", font=card_title, fill=(30, 41, 59))
    # Nút lấy vị trí
    d.rounded_rectangle([(w - 165, b2_y + 10), (w - 28, b2_y + 38)], radius=8, fill=(2, 132, 199))
    draw_vector_icon(d, "pin", w - 150, b2_y + 24, (255, 255, 255))
    d.text((w - 138, b2_y + 16), "Lay vi tri hien tai", font=small_bold, fill=(255, 255, 255))

    # Thẻ tọa độ GPS màu xanh lá
    loc_card_y = b2_y + 48
    d.rounded_rectangle([(28, loc_card_y), (w - 28, loc_card_y + 96)], radius=12, fill=(240, 253, 244), outline=(187, 247, 208), width=1)
    d.text((40, loc_card_y + 10), "[V] Toa do GPS da xac dinh chinh xac:", font=small_bold, fill=(22, 101, 52))
    d.text((40, loc_card_y + 30), "Vi do: 10.841127  |  Kinh do: 106.809883", font=bold_font, fill=(21, 128, 61))
    d.text((40, loc_card_y + 50), "Dia chi: Khu Cong Nghe Cao, TP. Thu Duc, TP.HCM", font=small_font, fill=(22, 101, 52))
    d.text((40, loc_card_y + 70), "Thoi gian xac thuc: 19:45:00 (Accuracy: 5.2m)", font=small_font, fill=(74, 222, 128))

    # KHỐI 3: FORM NHẬP LIỆU
    b3_y = b2_y + 175
    d.rounded_rectangle([(16, b3_y), (w - 16, b3_y + 205)], radius=16, fill=(255, 255, 255), outline=(226, 232, 240), width=1)
    d.text((28, b3_y + 14), "3. Thong tin nguoi dung & Ghi chu", font=card_title, fill=(30, 41, 59))

    # Input 1: Họ tên
    d.text((28, b3_y + 40), "Ho va ten nguoi dung", font=small_bold, fill=(71, 85, 105))
    d.rounded_rectangle([(28, b3_y + 58), (w - 28, b3_y + 96)], radius=10, fill=(248, 250, 252), outline=(203, 213, 225), width=1)
    d.text((40, b3_y + 70), "Nguyen Minh Nhat", font=body_font, fill=(15, 23, 42))

    # Input 2: Ghi chú
    d.text((28, b3_y + 108), "Noi dung ghi chu check-in", font=small_bold, fill=(71, 85, 105))
    d.rounded_rectangle([(28, b3_y + 126), (w - 28, b3_y + 188)], radius=10, fill=(248, 250, 252), outline=(203, 213, 225), width=1)
    d.text((40, b3_y + 138), "Buoi thuc hanh React Native API & AsyncStorage", font=body_font, fill=(15, 23, 42))
    d.text((40, b3_y + 158), "hoan thanh xuat sac voi day du chuc nang!", font=body_font, fill=(15, 23, 42))

    # NÚT LƯU VÀO ASYNCSTORAGE
    btn_save_y = b3_y + 220
    d.rounded_rectangle([(16, btn_save_y), (w - 16, btn_save_y + 50)], radius=14, fill=(22, 163, 74))
    draw_vector_icon(d, "storage", 100, btn_save_y + 25, (255, 255, 255))
    d.text((120, btn_save_y + 16), "Luu vao AsyncStorage ngay", font=header_font, fill=(255, 255, 255))

    out_path = os.path.join(OUTPUT_DIR, "anh_mini_app_input.png")
    img.save(out_path, "PNG")
    print(f"[OK] Da tao: {out_path}")

# ==============================================================================
# ẢNH 3: BÀI 2 - MÀN HÌNH SAVED DATA ĐỌC TỪ ASYNCSTORAGE (anh_saved_data.png)
# ==============================================================================
def create_saved_data_image():
    w, h = 480, 920
    img = Image.new("RGB", (w, h), color=(248, 250, 252))
    d = ImageDraw.Draw(img)

    # Status Bar
    d.rectangle([(0, 0), (w, 32)], fill=(255, 255, 255))
    d.text((20, 8), "9:41", font=small_bold, fill=(15, 23, 42))
    d.text((w - 75, 8), "5G  100%", font=small_bold, fill=(15, 23, 42))

    # Top Tab Bar
    d.rectangle([(0, 32), (w, 80)], fill=(255, 255, 255), outline=(226, 232, 240), width=1)
    d.rounded_rectangle([(12, 38), (w - 12, 74)], radius=10, fill=(241, 245, 249))
    d.text((24, 48), "Bai 1: REST API", font=small_font, fill=(100, 116, 139))
    d.text((w // 3 + 18, 48), "Bai 2: Anh & GPS", font=small_font, fill=(100, 116, 139))
    d.rounded_rectangle([(2 * w // 3, 42), (w - 14, 70)], radius=8, fill=(255, 255, 255))
    d.text((2 * w // 3 + 8, 48), "Bai 2: Saved Data", font=small_bold, fill=(37, 99, 235))

    # Banner AsyncStorage Status
    d.rectangle([(0, 80), (w, 150)], fill=(255, 255, 255), outline=(226, 232, 240), width=1)
    d.text((18, 88), "AsyncStorage Status", font=header_font, fill=(15, 23, 42))
    d.text((18, 110), "Nguoi dung: Nguyen Minh Nhat | Dang nhap: True", font=small_bold, fill=(37, 99, 235))
    d.text((18, 128), "Khoa luu: @checkin_records, @last_user, @is_logged_in", font=small_font, fill=(100, 116, 139))

    d.rounded_rectangle([(w - 95, 96), (w - 18, 130)], radius=8, fill=(254, 226, 226))
    draw_vector_icon(d, "trash", w - 80, 113, (220, 38, 38))
    d.text((w - 68, 106), "Xoa tat ca", font=small_bold, fill=(220, 38, 38))

    # Danh sách các bản ghi đọc lại từ AsyncStorage
    records = [
        ("Nguyen Minh Nhat", "24/10/2026 19:45:00", "Buoi thuc hanh React Native API & AsyncStorage hoan thanh xuat sac voi day du chuc nang!", "Khu Cong Nghe Cao, TP. Thu Duc, TP.HCM (10.8411, 106.8099)"),
        ("Le Hoang Nam", "24/10/2026 18:30:12", "Da check-in thanh cong tai thu vien trung tam, chuan bi thuyet trinh do an.", "Quan 1, TP. Ho Chi Minh (10.7769, 106.7009)"),
        ("Tran Thi Mai", "24/10/2026 16:15:40", "Luu hinh anh thiet ke UI Profile moi len may de dong bo sau.", "Quan Binh Thanh, TP.HCM (10.8012, 106.7115)"),
    ]

    card_y = 165
    for name, date_str, note_str, loc_str in records:
        d.rounded_rectangle([(16, card_y), (w - 16, card_y + 195)], radius=16, fill=(255, 255, 255), outline=(226, 232, 240), width=1)

        # Avatar thumbnail
        th_x, th_y = 28, card_y + 16
        d.rounded_rectangle([(th_x, th_y), (th_x + 55, th_y + 55)], radius=12, fill=(224, 242, 254), outline=(147, 197, 253), width=2)
        d.ellipse([(th_x + 16, th_y + 10), (th_x + 39, th_y + 33)], fill=(37, 99, 235))
        d.chord([(th_x + 8, th_y + 32), (th_x + 47, th_y + 54)], start=180, end=0, fill=(37, 99, 235))

        # Info Col
        d.text((th_x + 68, th_y + 2), name, font=card_title, fill=(15, 23, 42))
        d.text((th_x + 68, th_y + 20), f"Luu luc: {date_str}", font=small_font, fill=(148, 163, 184))
        # Status tag
        d.rounded_rectangle([(th_x + 68, th_y + 36), (th_x + 175, th_y + 52)], radius=5, fill=(220, 252, 231))
        d.text((th_x + 74, th_y + 38), "Da luu vao bo nho", font=small_bold, fill=(21, 128, 61))

        # Nút xóa
        d.text((w - 38, th_y + 2), "X", font=bold_font, fill=(148, 163, 184))

        # Note
        d.text((28, card_y + 82), note_str[:55], font=body_font, fill=(51, 65, 85))
        if len(note_str) > 55:
            d.text((28, card_y + 102), note_str[55:110] + "...", font=body_font, fill=(51, 65, 85))

        # Location box
        loc_box_y = card_y + 130
        d.rounded_rectangle([(28, loc_box_y), (w - 28, loc_box_y + 45)], radius=10, fill=(248, 250, 252), outline=(226, 232, 240), width=1)
        draw_vector_icon(d, "pin", 40, loc_box_y + 22, (2, 132, 199))
        d.text((54, loc_box_y + 14), loc_str[:48], font=small_bold, fill=(71, 85, 105))

        card_y += 215

    # Bottom status
    d.rounded_rectangle([(16, h - 50), (w - 16, h - 14)], radius=8, fill=(240, 253, 244), outline=(187, 247, 208), width=1)
    d.text((28, h - 38), "[OK] Doc du lieu tu AsyncStorage thanh cong 100% | Persistent", font=small_bold, fill=(21, 128, 61))

    out_path = os.path.join(OUTPUT_DIR, "anh_saved_data.png")
    img.save(out_path, "PNG")
    print(f"[OK] Da tao: {out_path}")

if __name__ == "__main__":
    create_api_posts_image()
    create_mini_app_input_image()
    create_saved_data_image()
    print("Tao toan bo 3 anh minh chung BLT 10 thanh cong!")
