# Maktab sayti

Papka tarkibi:

- `server.js` — server (tashqi kutubxona kerak emas, faqat Node.js 18+)
- `public/` — sayt fayllari (`index.html`, `style.css`, `script.js`, `img/`)
- `data/` — xabarlar, rasmlar va PDF kitoblar shu yerda saqlanadi (server o'zi yaratadi)

## Kompyuterda ishga tushirish

1. https://nodejs.org dan Node.js (18 yoki yangiroq) o'rnating.
2. VS Code'da papkani oching, Terminal ochib yozing: `node server.js`
3. Brauzerda oching: http://localhost:3000

Muhim: saytni endi `index.html` ni ikki marta bosib emas, faqat shu server orqali oching.

## Parolni o'zgartirish

Standart parol `maktab`. Internetga chiqarishdan oldin albatta o'zgartiring:

- Windows (PowerShell): `$env:MAKTAB_PIN="yangi_parol"; node server.js`
- Mac/Linux: `MAKTAB_PIN=yangi_parol node server.js`

Parol faqat serverda tekshiriladi, sayt kodida yozilmagan.

## Ma'lumotlarni o'zgartirish

Barcha ma'lumot **`public/malumotlar.js`** faylida, har biri alohida qatorda:

1. Maktab nomi, shior, manzil, xarita, ijtimoiy tarmoq havolalari
2. Direktor va o'rinbosarlar
3. O'qituvchilar (har bir o'qituvchi bitta qator: ism, fan, yosh, ma'lumot, staj, rasm)
4. Dars jadvali (har bir sinf alohida blok, har bir kun alohida qator)
5. Kutubxona (har sinf uchun o'zbek va rus tilidagi fanlar, har fan bitta qator)

Faylning boshida o'zbekcha yo'riqnoma bor. O'zgartirgach saqlang va brauzerda `Ctrl + Shift + R` bosing.

## Rasmlar

- `public/img/maktab.jpg` — bosh sahifadagi maktab binosi rasmi. Qorong'u rejimda sayt uni o'zi xiraroq qiladi.
- `public/img/logo.png` — maktab logotipi. Qo'ymasangiz, standart kitob belgisi ko'rinadi.
- Direktor, o'rinbosar va o'qituvchi rasmlari: yo'li `malumotlar.js` dagi `rasm:` maydonida yoziladi.
- Ranglar: `public/style.css` boshida (`:root` yorug rejim, `[data-theme=dark]` qorong'u rejim).

## Doimiy bepul saqlash: Supabase

Bepul hostinglarda (masalan Render Free) server diski vaqtincha, qayta ishga tushganda xabarlar va PDF lar yo'qoladi. Buning oldini olish uchun kitoblar, rasmlar va xabarlar Supabase'da saqlanadi (karta kerak emas). Server `SUPABASE_URL` va `SUPABASE_KEY` berilganda o'zi Supabase'ga o'tadi. Berilmasa, kompyuterdagi `data` papkasidan foydalanadi.

1. https://supabase.com ga GitHub orqali kiring va **New project** yarating (Free reja). Loyiha tayyor bo'lguncha bir necha daqiqa kuting.
2. **Storage** bo'limida **New bucket** ni bosing: nomi `maktab`, **Public bucket** belgisini QO'YMANG. Yarating.
3. **Project Settings → API Keys** bo'limidan ikki narsani nusxalang:
   - Project URL (`https://xxxx.supabase.co`)
   - **Secret key** (`sb_secret_...` bilan boshlanadi). Bu yashirin kalit: uni sayt kodiga ham, GitHub'ga ham yozmang.
4. Render'da xizmatni oching, **Environment** bo'limiga ikkita o'zgaruvchi qo'shing:
   - `SUPABASE_URL` = Project URL
   - `SUPABASE_KEY` = Secret key
   (Bucket nomini `maktab` dan boshqacha qo'ysangiz, `SUPABASE_BUCKET` ni ham yozing.)
5. Saqlang, Render saytni qayta ishga tushiradi. Keyin `https://sizning-linkingiz.onrender.com/api/health` ni oching. `"ok":true` chiqsa, ulanish to'g'ri. Xato chiqsa, javobdagi yozuv sababini ko'rsatadi.

Bepul rejaning chegaralari (Supabase): 1 GB fayl hajmi, bitta fayl 50 MB gacha, oyiga 5 GB trafik. Bir hafta davomida hech qanday faollik bo'lmasa, loyiha pauza qilinadi, uni Supabase panelidan qayta yoqasiz.

## Internetga chiqarish (hamma kirishi uchun)

Server Node.js ishlaydigan hostingda turishi kerak (VPS, Railway, Render, Fly.io va hokazo).

1. **Doimiy disk shart.** Ba'zi bepul hostinglarda disk har qayta ishga tushganda tozalanadi, shunda kitoblar va xabarlar yo'qoladi. Hostingdagi doimiy diskni (Volume/Disk) ulang va `DATA_DIR` ni shu diskka ko'rsating.
2. Muhit o'zgaruvchilari:
   - `MAKTAB_PIN` — parol
   - `DATA_DIR` — doimiy disk yo'li (masalan `/data`)
   - `PORT` — odatda hosting o'zi beradi
   - `TRUST_PROXY=1` — agar sayt nginx/Caddy yoki hosting proksisi ortida bo'lsa
3. Ishga tushirish buyrug'i: `node server.js`
4. HTTPS ni hosting yoki proksi (Caddy, nginx) ta'minlaydi.
5. `data/` papkasidan vaqti-vaqti bilan nusxa oling, bu zaxira bo'ladi.

## Qanday ishlaydi

- Xabar, rasm yoki kitob joylash uchun parol kerak. Noto'g'ri parol 15 daqiqada 10 martadan oshsa, vaqtincha bloklanadi.
- Yangiliklardagi "Bekor qilish" tugmasini xabarni yozgan odamning o'zi (o'sha brauzerda) ko'radi, boshqalar o'chira olmaydi.
- PDF hajmi 150 MB gacha, rasm avtomatik kichraytiriladi.
