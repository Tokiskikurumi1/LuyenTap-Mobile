import os
from PIL import Image, ImageDraw, ImageFont

OUTPUT_DIR = r"c:\Users\VTS\OneDrive\Desktop\BT_Mobile\Bài Luyện Tập 6\Ảnh"
os.makedirs(OUTPUT_DIR, exist_ok=True)
font_path = "C:/Windows/Fonts/consola.ttf"

title_font = ImageFont.truetype(font_path, 20)
header_font = ImageFont.truetype(font_path, 16)
body_font = ImageFont.truetype(font_path, 14)
small_font = ImageFont.truetype(font_path, 12)

# ==============================================================================
# 1. ẢNH BÀI 1: GREETING (demo_bai1_greeting.png)
# ==============================================================================
w1, h1 = 600, 380
img1 = Image.new("RGB", (w1, h1), color=(15, 23, 42)) # Slate 900
d1 = ImageDraw.Draw(img1)

d1.rectangle([(0, 0), (w1, 55)], fill=(30, 41, 59))
d1.text((25, 18), "BAI TAP 1: COMPONENT GREETING (PROPS)", font=header_font, fill=(56, 189, 248))

names = ["Nguyen Van An", "Tran Thi Mai", "Le Hoang Long"]
y = 80
for name in names:
    d1.rounded_rectangle([(40, y), (w1 - 40, y + 65)], radius=10, fill=(30, 41, 59), outline=(56, 189, 248), width=1)
    # Accent left border
    d1.rounded_rectangle([(40, y), (46, y + 65)], radius=3, fill=(56, 189, 248))
    d1.text((65, y + 22), f">> Xin chao, {name}!", font=body_font, fill=(241, 245, 249))
    y += 85

d1.text((45, 340), "Prop `name` duoc truyen tu component cha xuong component con.", font=small_font, fill=(148, 163, 184))
img1.save(os.path.join(OUTPUT_DIR, "demo_bai1_greeting.png"), "PNG")

# ==============================================================================
# 2. ẢNH BÀI 2: STUDENTINFO (demo_bai2_student_info.png)
# ==============================================================================
w2, h2 = 650, 490
img2 = Image.new("RGB", (w2, h2), color=(15, 23, 42))
d2 = ImageDraw.Draw(img2)

d2.rectangle([(0, 0), (w2, 55)], fill=(30, 41, 59))
d2.text((25, 18), "BAI TAP 2: TAI SU DUNG COMPONENT STUDENTINFO", font=header_font, fill=(56, 189, 248))

students = [
    ("Nguyen Van An", "KTPM-K17A", "Ky thuat phan mem (React Native)"),
    ("Tran Thi Mai", "CNTT-K16B", "He thong thong tin quan ly"),
    ("Le Hoang Long", "KHMT-K18C", "Tri tue nhan tao (AI & Data)"),
]

y = 80
for name, cls, major in students:
    d2.rounded_rectangle([(35, y), (w2 - 35, y + 105)], radius=12, fill=(30, 41, 59), outline=(71, 85, 105), width=1)
    d2.text((55, y + 16), f"[SV] {name}", font=header_font, fill=(255, 255, 255))
    d2.text((w2 - 160, y + 16), f"Lop: {cls}", font=body_font, fill=(56, 189, 248))
    d2.line([(55, y + 48), (w2 - 55, y + 48)], fill=(51, 65, 85), width=1)
    d2.text((55, y + 62), f"Nganh hoc: {major}", font=body_font, fill=(203, 213, 225))
    y += 125

d2.text((35, 455), "Tai su dung 1 component StudentInfo render danh sach nhieu sinh vien.", font=small_font, fill=(148, 163, 184))
img2.save(os.path.join(OUTPUT_DIR, "demo_bai2_student_info.png"), "PNG")

# ==============================================================================
# 3. ẢNH BÀI 3: COUNTERHOOK (demo_bai3_counter.png)
# ==============================================================================
w3, h3 = 600, 460
img3 = Image.new("RGB", (w3, h3), color=(15, 23, 42))
d3 = ImageDraw.Draw(img3)

d3.rectangle([(0, 0), (w3, 55)], fill=(30, 41, 59))
d3.text((25, 18), "BAI TAP 3: BO DEM TUONG TAC VOI USESTATE", font=header_font, fill=(56, 189, 248))

card_x1, card_y1, card_x2, card_y2 = 60, 80, w3 - 60, 410
d3.rounded_rectangle([(card_x1, card_y1), (card_x2, card_y2)], radius=16, fill=(30, 41, 59), outline=(56, 189, 248), width=2)

d3.text((card_x1 + 105, card_y1 + 25), "BO DEM SO LAN BAM", font=header_font, fill=(148, 163, 184))

# Circle display with number 5
cx, cy, r = w3 // 2, card_y1 + 130, 50
d3.ellipse([(cx - r, cy - r), (cx + r, cy + r)], fill=(15, 23, 42), outline=(56, 189, 248), width=3)
count_f = ImageFont.truetype(font_path, 40)
d3.text((cx - 15, cy - 30), "5", font=count_f, fill=(56, 189, 248))
d3.text((cx - 28, cy + 18), "lan bam", font=small_font, fill=(148, 163, 184))

# Button Row
btn_w, btn_h = 160, 45
bx1, by1 = cx - btn_w - 10, card_y1 + 215
d3.rounded_rectangle([(bx1, by1), (bx1 + btn_w, by1 + btn_h)], radius=10, fill=(2, 132, 199))
d3.text((bx1 + 30, by1 + 13), "[+] Tang (+1)", font=body_font, fill=(255, 255, 255))

bx2 = cx + 10
d3.rounded_rectangle([(bx2, by1), (bx2 + 120, by1 + btn_h)], radius=10, fill=(51, 65, 85))
d3.text((bx2 + 25, by1 + 13), "Dat lai", font=body_font, fill=(226, 232, 240))

d3.text((card_x1 + 30, card_y1 + 280), "Khi bam [+] Tang: setCount(count + 1) duoc kich hoat.\nComponent tu dong re-render va cap nhat so 5 len man hinh.", font=small_font, fill=(250, 204, 21))
img3.save(os.path.join(OUTPUT_DIR, "demo_bai3_counter.png"), "PNG")

# ==============================================================================
# 4. ẢNH TỔNG HỢP: MOCKUP SMARTPHONE APP (demo_tong_hop.png)
# ==============================================================================
w4, h4 = 520, 920
img4 = Image.new("RGB", (w4, h4), color=(15, 23, 42))
d4 = ImageDraw.Draw(img4)

# Phone frame
px1, py1, px2, py2 = 35, 25, w4 - 35, h4 - 25
d4.rounded_rectangle([(px1, py1), (px2, py2)], radius=36, fill=(2, 6, 23), outline=(71, 85, 105), width=4)

# Notch
d4.rounded_rectangle([(px1 + 140, py1 + 12), (px2 - 140, py1 + 35)], radius=10, fill=(0, 0, 0))

# Status bar
d4.text((px1 + 35, py1 + 16), "9:41", font=small_font, fill=(255, 255, 255))
d4.text((px2 - 80, py1 + 16), "5G [|||]", font=small_font, fill=(255, 255, 255))

# Header inside app
d4.text((px1 + 25, py1 + 60), "BAI LUYEN TAP 6", font=header_font, fill=(56, 189, 248))
d4.text((px1 + 25, py1 + 85), "Components, Props & State", font=body_font, fill=(255, 255, 255))

# Section 1: Greeting
d4.text((px1 + 25, py1 + 125), "> Bai 1: Greeting Component", font=small_font, fill=(148, 163, 184))
d4.rounded_rectangle([(px1 + 25, py1 + 145), (px2 - 25, py1 + 185)], radius=8, fill=(30, 41, 59), outline=(56, 189, 248), width=1)
d4.text((px1 + 40, py1 + 158), "Xin chao, Nguyen Van An!", font=small_font, fill=(255, 255, 255))

d4.rounded_rectangle([(px1 + 25, py1 + 195), (px2 - 25, py1 + 235)], radius=8, fill=(30, 41, 59), outline=(56, 189, 248), width=1)
d4.text((px1 + 40, py1 + 208), "Xin chao, Tran Thi Mai!", font=small_font, fill=(255, 255, 255))

# Section 2: StudentInfo
d4.text((px1 + 25, py1 + 260), "> Bai 2: StudentInfo Component", font=small_font, fill=(148, 163, 184))
d4.rounded_rectangle([(px1 + 25, py1 + 280), (px2 - 25, py1 + 355)], radius=10, fill=(30, 41, 59), outline=(51, 65, 85))
d4.text((px1 + 40, py1 + 295), "[SV] Nguyen Van An - Lop: KTPM-K17A", font=small_font, fill=(255, 255, 255))
d4.text((px1 + 40, py1 + 325), "Nganh: Ky thuat phan mem (React Native)", font=small_font, fill=(148, 163, 184))

d4.rounded_rectangle([(px1 + 25, py1 + 365), (px2 - 25, py1 + 440)], radius=10, fill=(30, 41, 59), outline=(51, 65, 85))
d4.text((px1 + 40, py1 + 380), "[SV] Tran Thi Mai - Lop: CNTT-K16B", font=small_font, fill=(255, 255, 255))
d4.text((px1 + 40, py1 + 410), "Nganh: He thong thong tin quan ly", font=small_font, fill=(148, 163, 184))

# Section 3: CounterHook
d4.text((px1 + 25, py1 + 460), "> Bai 3: CounterHook (useState)", font=small_font, fill=(148, 163, 184))
d4.rounded_rectangle([(px1 + 25, py1 + 480), (px2 - 25, py1 + 650)], radius=14, fill=(30, 41, 59), outline=(56, 189, 248), width=2)
d4.text((px1 + 105, py1 + 500), "So lan bam: 3 lan", font=header_font, fill=(250, 204, 21))

d4.rounded_rectangle([(px1 + 65, py1 + 540), (px2 - 65, py1 + 585)], radius=10, fill=(2, 132, 199))
d4.text((px1 + 130, py1 + 555), "[+] TANG SO LAN (+1)", font=body_font, fill=(255, 255, 255))

d4.text((px1 + 45, py1 + 605), "Giao dien tu dong render lai khi count thay doi", font=small_font, fill=(148, 163, 184))

# Bottom bar
d4.rounded_rectangle([(px1 + 130, py2 - 18), (px2 - 130, py2 - 12)], radius=3, fill=(203, 213, 225))
img4.save(os.path.join(OUTPUT_DIR, "demo_tong_hop.png"), "PNG")

print("Generated all 4 mockup images for BLT 6.")
