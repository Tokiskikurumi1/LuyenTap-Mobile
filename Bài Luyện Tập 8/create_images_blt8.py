import os
import sys
from PIL import Image, ImageDraw, ImageFont

# Đảm bảo in tiếng Việt không bị lỗi charmap trên console Windows
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "Ảnh")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Lựa chọn font hỗ trợ trên Windows
def get_font(size, is_bold=False):
    font_candidates = [
        "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arial.ttf",
        "C:/Windows/Fonts/consola.ttf",
    ]
    if is_bold:
        font_candidates = [
            "C:/Windows/Fonts/segouib.ttf",
            "C:/Windows/Fonts/arialbd.ttf",
            "C:/Windows/Fonts/consolab.ttf",
        ] + font_candidates
    for p in font_candidates:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                continue
    return ImageFont.load_default()

title_font = get_font(20, is_bold=True)
header_font = get_font(16, is_bold=True)
body_font = get_font(13)
bold_font = get_font(13, is_bold=True)
small_font = get_font(11)
small_bold = get_font(11, is_bold=True)
price_font = get_font(15, is_bold=True)
large_price = get_font(22, is_bold=True)

# ==============================================================================
# 1. ẢNH 1: MÀN HÌNH DANH SÁCH 10 SẢN PHẨM (anh_list.png)
# ==============================================================================
def create_list_image():
    w, h = 540, 920
    img = Image.new("RGB", (w, h), color=(15, 23, 42)) # Slate 900
    d = ImageDraw.Draw(img)

    # Status Bar
    d.rectangle([(0, 0), (w, 30)], fill=(15, 23, 42))
    d.text((20, 8), "9:41", font=small_bold, fill=(255, 255, 255))
    d.text((w - 75, 8), "5G  100%", font=small_bold, fill=(255, 255, 255))

    # App Header
    d.rectangle([(0, 30), (w, 105)], fill=(15, 23, 42), outline=(30, 41, 59), width=1)
    d.rounded_rectangle([(20, 38), (140, 58)], radius=10, fill=(12, 74, 110))
    d.text((28, 41), "BAI LUYEN TAP 8", font=small_bold, fill=(56, 189, 248))
    d.text((20, 64), "Product List (10 San pham)", font=title_font, fill=(255, 255, 255))
    d.text((20, 88), "FlatList & Dieu huong truyen Props sang Detail", font=small_font, fill=(148, 163, 184))

    # Tab Bar
    d.rectangle([(0, 106), (w, 150)], fill=(15, 23, 42), outline=(30, 41, 59), width=1)
    d.rounded_rectangle([(16, 112), (w//2 - 6, 144)], radius=8, fill=(2, 132, 199))
    d.text((45, 122), "[*] Bai TB: FlatList (10 SP)", font=small_bold, fill=(255, 255, 255))

    d.rounded_rectangle([(w//2 + 6, 112), (w - 16, 144)], radius=8, fill=(30, 41, 59))
    d.text((w//2 + 25, 122), "Bai De: 3 The ProductCard", font=small_font, fill=(148, 163, 184))

    # Search Bar
    y_search = 160
    d.rounded_rectangle([(16, y_search), (w - 16, y_search + 40)], radius=10, fill=(30, 41, 59), outline=(51, 65, 85), width=1)
    d.text((30, y_search + 11), "TIM KIEM: Nhap ten san pham...", font=small_font, fill=(148, 163, 184))

    # Categories filter tags
    y_cat = 210
    cats = [("All", True), ("Smartphone", False), ("Laptop", False), ("Am thanh", False), ("Tablet", False)]
    cur_x = 16
    for c_name, is_act in cats:
        cat_w = len(c_name) * 9 + 20
        bg_col = (2, 132, 199) if is_act else (30, 41, 59)
        txt_col = (255, 255, 255) if is_act else (148, 163, 184)
        d.rounded_rectangle([(cur_x, y_cat), (cur_x + cat_w, y_cat + 28)], radius=14, fill=bg_col, outline=(51, 65, 85), width=1)
        d.text((cur_x + 10, y_cat + 6), c_name, font=small_font, fill=txt_col)
        cur_x += cat_w + 8

    # List Meta row
    y_meta = 248
    d.text((18, y_meta), "Hien thi 10/10 san pham (Dung FlatList toi uu)", font=small_bold, fill=(56, 189, 248))
    d.text((w - 190, y_meta), "Cham the de xem Detail ->", font=small_font, fill=(100, 116, 139))

    # 10 Mock Products items in FlatList
    products_display = [
        ("1", "iPhone 15 Pro Max 256GB", "29.990.000 d", "Smartphone", "Ban chay", "4.9", True),
        ("2", "Samsung Galaxy S24 Ultra 5G", "27.490.000 d", "Smartphone", "AI Phone", "4.8", False),
        ("3", "MacBook Pro 14 inch M3 Pro", "45.990.000 d", "Laptop", "Chuyen nghiep", "5.0", False),
        ("4", "Sony WH-1000XM5 Wireless", "7.690.000 d", "Am thanh", "Chong on", "4.8", False),
        ("5", "iPad Air M2 11 inch Wi-Fi 128GB", "16.290.000 d", "Tablet", "Moi ra mat", "4.7", False),
        ("6", "Apple Watch Series 9 GPS 45mm", "9.490.000 d", "Smartwatch", "Suc khoe", "4.9", False),
        ("7", "Loa Marshall Stanmore III", "8.990.000 d", "Am thanh", "Vintage", "4.6", False),
    ]

    cur_y = 270
    for p_id, p_name, p_price, p_cat, p_tag, p_rate, is_selected in products_display:
        border_col = (56, 189, 248) if is_selected else (51, 65, 85)
        d.rounded_rectangle([(16, cur_y), (w - 16, cur_y + 80)], radius=12, fill=(30, 41, 59), outline=border_col, width=2 if is_selected else 1)

        # Index Circle
        d.rounded_rectangle([(26, cur_y + 16), (72, cur_y + 64)], radius=10, fill=(15, 23, 42), outline=(56, 189, 248), width=1)
        d.text((40, cur_y + 30), f"#{p_id}", font=bold_font, fill=(56, 189, 248))

        # Details
        d.text((84, cur_y + 12), p_cat.upper(), font=small_bold, fill=(148, 163, 184))
        d.rounded_rectangle([(160, cur_y + 10), (230, cur_y + 26)], radius=4, fill=(12, 74, 110))
        d.text((166, cur_y + 12), p_tag, font=small_font, fill=(56, 189, 248))

        d.text((84, cur_y + 30), p_name, font=bold_font, fill=(255, 255, 255))
        d.text((84, cur_y + 54), p_price, font=price_font, fill=(74, 222, 128))
        d.text((280, cur_y + 56), f"★ {p_rate}", font=small_bold, fill=(251, 191, 36))

        # Click arrow
        d.text((w - 38, cur_y + 26), ">", font=header_font, fill=(56, 189, 248) if is_selected else (100, 116, 139))

        if is_selected:
            # Highlight badge indicating click action
            d.rounded_rectangle([(w - 150, cur_y + 52), (w - 45, cur_y + 72)], radius=6, fill=(2, 132, 199))
            d.text((w - 142, cur_y + 55), "DANG CHON ->", font=small_bold, fill=(255, 255, 255))

        cur_y += 88

    # Save
    out_path = os.path.join(OUTPUT_DIR, "anh_list.png")
    img.save(out_path)
    print(f"[OK] Saved {out_path}")

# ==============================================================================
# 2. ẢNH 2: MÀN HÌNH CHI TIẾT SẢN PHẨM (anh_detail.png)
# ==============================================================================
def create_detail_image():
    w, h = 540, 920
    img = Image.new("RGB", (w, h), color=(15, 23, 42)) # Slate 900
    d = ImageDraw.Draw(img)

    # Status Bar
    d.rectangle([(0, 0), (w, 30)], fill=(15, 23, 42))
    d.text((20, 8), "9:41", font=small_bold, fill=(255, 255, 255))
    d.text((w - 75, 8), "5G  100%", font=small_bold, fill=(255, 255, 255))

    # App Header with Back button
    d.rectangle([(0, 30), (w, 105)], fill=(15, 23, 42), outline=(30, 41, 59), width=1)
    d.rounded_rectangle([(16, 38), (145, 62)], radius=8, fill=(30, 41, 59), outline=(51, 65, 85))
    d.text((24, 43), "<- Quay lai danh sach", font=small_bold, fill=(56, 189, 248))
    d.text((16, 70), "Chi tiet san pham", font=title_font, fill=(255, 255, 255))
    d.text((195, 75), "ID: #1 - iPhone 15 Pro Max", font=small_font, fill=(148, 163, 184))

    # PROPS RECEIVED HIGHLIGHT BANNER
    y_banner = 118
    d.rounded_rectangle([(16, y_banner), (w - 16, y_banner + 92)], radius=12, fill=(12, 74, 110), outline=(2, 132, 199), width=2)
    d.text((28, y_banner + 10), "[!] PROPS / PARAMS TRUYEN TU MAN HINH LIST:", font=small_bold, fill=(56, 189, 248))
    d.text((28, y_banner + 32), "- id: #1", font=bold_font, fill=(255, 255, 255))
    d.text((28, y_banner + 50), "- name: iPhone 15 Pro Max 256GB", font=bold_font, fill=(255, 255, 255))
    d.text((28, y_banner + 68), "- price: 29.990.000 d (So nguyen/chuoi)", font=bold_font, fill=(74, 222, 128))

    # Detail Main Card
    y_card = 222
    d.rounded_rectangle([(16, y_card), (w - 16, h - 85)], radius=16, fill=(30, 41, 59), outline=(51, 65, 85), width=1)

    # Badges
    d.rounded_rectangle([(30, y_card + 18), (125, y_card + 40)], radius=6, fill=(15, 23, 42), outline=(51, 65, 85))
    d.text((40, y_card + 23), "SMARTPHONE", font=small_bold, fill=(148, 163, 184))

    d.rounded_rectangle([(135, y_card + 18), (210, y_card + 40)], radius=6, fill=(12, 74, 110))
    d.text((145, y_card + 23), "BAN CHAY", font=small_bold, fill=(56, 189, 248))

    d.text((w - 55, y_card + 20), "[Heart]", font=small_bold, fill=(244, 63, 94))

    # Title
    d.text((30, y_card + 50), "iPhone 15 Pro Max 256GB Titan", font=title_font, fill=(255, 255, 255))

    # Rating & Stock
    d.text((30, y_card + 85), "★ 4.9 (1.250 danh gia)", font=small_bold, fill=(251, 191, 36))
    d.rounded_rectangle([(w - 145, y_card + 82), (w - 32, y_card + 102)], radius=6, fill=(6, 78, 59))
    d.text((w - 135, y_card + 86), "Con hang: 35 may", font=small_bold, fill=(74, 222, 128))

    # Price Box
    y_pbox = y_card + 115
    d.rounded_rectangle([(30, y_pbox), (w - 30, y_pbox + 68)], radius=10, fill=(15, 23, 42), outline=(51, 65, 85))
    d.text((44, y_pbox + 10), "GIA BAN NIEM YET (NHAN TU PROPS)", font=small_bold, fill=(148, 163, 184))
    d.text((44, y_pbox + 30), "29.990.000 d", font=large_price, fill=(74, 222, 128))

    # Quantity selector
    y_qty = y_pbox + 80
    d.rounded_rectangle([(30, y_qty), (w - 30, y_qty + 46)], radius=8, fill=(15, 23, 42))
    d.text((44, y_qty + 14), "So luong dat mua:", font=bold_font, fill=(255, 255, 255))
    d.rounded_rectangle([(w - 140, y_qty + 8), (w - 110, y_qty + 38)], radius=4, fill=(51, 65, 85))
    d.text((w - 128, y_qty + 12), "-", font=header_font, fill=(255, 255, 255))
    d.text((w - 95, y_qty + 14), "1", font=bold_font, fill=(255, 255, 255))
    d.rounded_rectangle([(w - 75, y_qty + 8), (w - 45, y_qty + 38)], radius=4, fill=(51, 65, 85))
    d.text((w - 63, y_qty + 12), "+", font=header_font, fill=(255, 255, 255))

    # Description Section
    y_desc = y_qty + 60
    d.text((30, y_desc), "MO TA SAN PHAM", font=small_bold, fill=(56, 189, 248))
    desc_lines = [
        "Thiet ke khung Titan ben nhe chuan hang khong vu tru.",
        "Chip A17 Pro dinh cao mang lai hieu nang do hoa an tuong.",
        "Cum 3 camera sau 48MP zoom quang 5x chuyen nghiep.",
        "Pin dung luong lon, cong sac USB-C toc do cao."
    ]
    cur_dy = y_desc + 22
    for line in desc_lines:
        d.text((30, cur_dy), line, font=small_font, fill=(203, 213, 225))
        cur_dy += 18

    # Specs Section
    y_specs = cur_dy + 12
    d.text((30, y_specs), "THONG SO KY THUAT", font=small_bold, fill=(56, 189, 248))
    specs = [
        ("Man hinh", "6.7 inch Super Retina XDR OLED 120Hz"),
        ("Vi xu ly (CPU)", "Apple A17 Pro (3nm sieu manh)"),
        ("Bo nho RAM", "8 GB"),
        ("Pin & Sac", "4.422 mAh, Sac nhanh 20W"),
    ]
    cur_sy = y_specs + 22
    for s_key, s_val in specs:
        d.text((30, cur_sy), f"{s_key}:", font=small_bold, fill=(148, 163, 184))
        d.text((150, cur_sy), s_val, font=small_font, fill=(255, 255, 255))
        d.line([(30, cur_sy + 18), (w - 30, cur_sy + 18)], fill=(51, 65, 85), width=1)
        cur_sy += 24

    # Bottom Actions Bar
    d.rectangle([(0, h - 75), (w, h)], fill=(15, 23, 42), outline=(30, 41, 59), width=1)
    # Cart Button
    d.rounded_rectangle([(20, h - 62), (w//2 - 8, h - 18)], radius=10, fill=(51, 65, 85))
    d.text((55, h - 46), "Them vao gio", font=bold_font, fill=(255, 255, 255))
    # Buy Button
    d.rounded_rectangle([(w//2 + 8, h - 62), (w - 20, h - 18)], radius=10, fill=(2, 132, 199))
    d.text((w//2 + 55, h - 46), "⚡ MUA NGAY", font=bold_font, fill=(255, 255, 255))

    # Save
    out_path = os.path.join(OUTPUT_DIR, "anh_detail.png")
    img.save(out_path)
    print(f"[OK] Saved {out_path}")

# ==============================================================================
# 3. ẢNH 3: BÀI TẬP MỨC DỄ (anh_product_card_de.png)
# ==============================================================================
def create_easy_image():
    w, h = 540, 860
    img = Image.new("RGB", (w, h), color=(15, 23, 42)) # Slate 900
    d = ImageDraw.Draw(img)

    # Status Bar
    d.rectangle([(0, 0), (w, 30)], fill=(15, 23, 42))
    d.text((20, 8), "9:41", font=small_bold, fill=(255, 255, 255))
    d.text((w - 75, 8), "5G  100%", font=small_bold, fill=(255, 255, 255))

    # App Header
    d.rectangle([(0, 30), (w, 105)], fill=(15, 23, 42), outline=(30, 41, 59), width=1)
    d.rounded_rectangle([(20, 38), (140, 58)], radius=10, fill=(12, 74, 110))
    d.text((28, 41), "BAI LUYEN TAP 8", font=small_bold, fill=(56, 189, 248))
    d.text((20, 64), "Bai tap Muc de: ProductCard", font=title_font, fill=(255, 255, 255))
    d.text((20, 88), "Truyen Props (name, price) va Tai su dung Component", font=small_font, fill=(148, 163, 184))

    # Tab Bar
    d.rectangle([(0, 106), (w, 150)], fill=(15, 23, 42), outline=(30, 41, 59), width=1)
    d.rounded_rectangle([(16, 112), (w//2 - 6, 144)], radius=8, fill=(30, 41, 59))
    d.text((45, 122), "Bai TB: FlatList (10 SP)", font=small_font, fill=(148, 163, 184))

    d.rounded_rectangle([(w//2 + 6, 112), (w - 16, 144)], radius=8, fill=(2, 132, 199))
    d.text((w//2 + 25, 122), "[*] Bai De: 3 The ProductCard", font=small_bold, fill=(255, 255, 255))

    # Intro Section
    y_intro = 160
    d.text((18, y_intro), "BAI TAP MUC DE: TAI SU DUNG 3 LAN VOI 3 BO DU LIEU", font=small_bold, fill=(56, 189, 248))
    d.text((18, y_intro + 20), "Component ProductCard nhan props 'name' va 'price' tu cha:", font=small_font, fill=(148, 163, 184))

    # 3 Product Cards
    cards_data = [
        ("1. San pham thu nhat:", "AM THANH", "BAN CHAY", "Tai nghe Bluetooth Sony WH-1000XM5", "7.690.000 d"),
        ("2. San pham thu hai:", "SMARTPHONE", "FLAGSHIP", "Dien thoai iPhone 15 Pro Max 256GB Titan", "29.990.000 d"),
        ("3. San pham thu ba:", "PHU KIEN", "CUSTOM KEY", "Ban phim co khong day Keychron Q1 Pro", "4.290.000 d"),
    ]

    cur_cy = y_intro + 48
    for label, cat, tag, name, price in cards_data:
        d.text((20, cur_cy), label, font=small_bold, fill=(100, 116, 139))
        cur_cy += 18

        # Card container
        d.rounded_rectangle([(16, cur_cy), (w - 16, cur_cy + 104)], radius=12, fill=(30, 41, 59), outline=(51, 65, 85), width=1)

        # Header of Card
        d.text((30, cur_cy + 12), cat, font=small_bold, fill=(56, 189, 248))
        d.rounded_rectangle([(w - 110, cur_cy + 10), (w - 30, cur_cy + 26)], radius=4, fill=(12, 74, 110))
        d.text((w - 102, cur_cy + 12), tag, font=small_bold, fill=(56, 189, 248))

        # Product Name
        d.text((30, cur_cy + 34), name, font=bold_font, fill=(255, 255, 255))

        # Divider
        d.line([(30, cur_cy + 64), (w - 30, cur_cy + 64)], fill=(51, 65, 85), width=1)

        # Price row
        d.text((30, cur_cy + 76), "Gia niem yet:", font=small_font, fill=(148, 163, 184))
        d.text((w - 145, cur_cy + 74), price, font=price_font, fill=(74, 222, 128))

        cur_cy += 122

    # Explanation card
    y_exp = cur_cy + 10
    d.rounded_rectangle([(16, y_exp), (w - 16, y_exp + 130)], radius=12, fill=(30, 41, 59), outline=(56, 189, 248), width=1)
    d.text((28, y_exp + 12), "[!] GIAI THICH CO CHE PROPS & TINH TAI SU DUNG:", font=small_bold, fill=(56, 189, 248))
    
    exp1 = "1. Cach truyen Props: Cha truyen qua JSX: <ProductCard name='...' price={...} />."
    exp2 = "   Con nhan tham so props = { name, price } va hien thi ra View/Text."
    exp3 = "2. Vi sao tai su dung duoc: ProductCard dong vai tro la khuon mau giao dien"
    exp4 = "   (Pure Component), khong luu tru cung du lieu. Nhan bao nhieu bo du lieu"
    exp5 = "   khac nhau deu hien thi nhat quan ma khong can lap lai code style."

    for idx, line in enumerate([exp1, exp2, exp3, exp4, exp5]):
        d.text((28, y_exp + 34 + idx * 18), line, font=small_font, fill=(203, 213, 225))

    # Save
    out_path = os.path.join(OUTPUT_DIR, "anh_product_card_de.png")
    img.save(out_path)
    print(f"[OK] Saved {out_path}")

if __name__ == "__main__":
    create_list_image()
    create_detail_image()
    create_easy_image()
    print("All 3 images created successfully!")
