/* =====================================================================
   MALUMOTLAR.JS  —  saytdagi BARCHA ma'lumotlar shu faylda.

   Qanday o'zgartiriladi:
   - Faqat qo'shtirnoq ("...") ichidagi yozuvlarni va raqamlarni o'zgartiring.
   - Qo'shtirnoqni ("), vergulni (,), qavslarni [ ] { } o'chirmang.
   - Yangi qator qo'shish uchun: bironta qatorni nusxalab, ostiga qo'ying
     va ichini o'zgartiring. Qatorni o'chirish uchun butun qatorni o'chiring.
   - O'zgartirgach faylni saqlang (Ctrl+S) va brauzerda Ctrl+Shift+R bosing.

   Bo'limlar:  1) MAKTAB   2) DIREKTOR VA O'RINBOSARLAR   3) O'QITUVCHILAR
               4) DARS JADVALI   5) KUTUBXONA (har sinfdagi fanlar)
   ===================================================================== */


/* ==================== 1) MAKTAB ==================== */
const S={
  name:"Mirzo Ulug'bek tumani 241-sonli umumta'lim maktabi",   // pastdagi copyright va brauzer sarlavhasi
  short1:"Mirzo Ulug'bek tumani",  short2:"241-sonli maktab",   // tepadagi (header) 2 qatorli nom
  title1:"Mirzo Ulug'bek tumani",  title2:"241-sonli umumta'lim maktabi",  // bosh sahifadagi katta sarlavha
  quote:["Bugun berilgan ta'lim —","ertangi buyuk kelajak poydevori."],   // sarlavha ostidagi gap (2 qator)
  map:"41.327328218379066, 69.34487096700093",   // maktab koordinatasi (Google Maps'da maktabni toping, o'ng tugma, birinchi raqamlarni nusxalang)
  fb:"https://facebook.com/",  tg:"https://t.me/",  ig:"https://instagram.com/"   // ijtimoiy tarmoq havolalari
};

// "Maktab haqida" sahifasidagi asosiy matn
const HAQIDA="   ";

// "Umumiy ma'lumot" qutisi: ["nomi", "qiymati"]
const MALUMOT=[
  ["Manzil",         "Toshkent sh., Salom ko'chasi, 1-A uy"],
  ["Sinf xonalari",  "41 ta"],
  ["Ochilgan yil",   "1974"],
  ["O'quvchilar soni",    "1315 dan ortiq"],
  ["Ta'lim tillari",    "o'zbek tili va rus tili"],
  ["Ta'lim bosqichi",    "Umumiy o'rta ta'lim"],
];

// "Maktabdagi joylar" (har biri alohida qatorda)
const JOYLAR=[
  { nom:"Yopiq sport zal", sarlavha:"Maktab yopiq sport zali", rasm1:"img/joylar/yopiq-sport-zal-1.jpg", rasm2:"img/joylar/yopiq-sport-zal-2.jpg" },
  { nom:"Stadion",         sarlavha:"Maktab stadioni",         rasm1:"img/joylar/stadion-1.jpg",         rasm2:"img/joylar/stadion-2.jpg" },
  { nom:"Oshxona",         sarlavha:"Maktab oshxonasi",        rasm1:"img/joylar/oshxona-1.jpg",         rasm2:"img/joylar/oshxona-2.jpg" },
  { nom:"Kompyuter xonasi",   sarlavha:"Maktab kompyuter xonasi",  rasm1:"img/joylar/kompyuter-1.jpg",   rasm2:"img/joylar/kompyuter-2.jpg" },
  { nom:"Kutubxona",       sarlavha:"Maktab kutubxonasi",      rasm1:"img/joylar/kutubxona-1.jpg",       rasm2:"img/joylar/kutubxona-2.jpg" },
  { nom:"Tibbiyot xonasi",    sarlavha:"Maktab tibbiyot xonasi",            rasm1:"img/joylar/tibbiyot-1.jpg",     rasm2:"img/joylar/tibbiyot-2.jpg" },
  { nom:"Maktab hovlisi",  sarlavha:"Maktab hovlisi",          rasm1:"img/joylar/maktab-hovlisi-1.jpg",  rasm2:"img/joylar/maktab-hovlisi-2.jpg" },
  { nom:"Faollar zali",  sarlavha:"Maktab faollar zali",          rasm1:"img/joylar/faollar-1.jpg",  rasm2:"img/joylar/faollar-2.jpg" },
];

// "Imkoniyatlar" (har biri alohida qatorda)
const IMKONIYATLAR=[
  "Har bir xona elektron doska bilan ta'minlangan",
  "Har bir xonada kuzatuv kameralari bor",
  "Kompyuter xonasi zamonaviy kompyuterlar bilan jihozlangan",
  "Maktab yo'l harakati qoidalari va labaratoriya johozlari bilan taminlangan",
  
];


/* ============ 2) DIREKTOR VA O'RINBOSARLAR ============
   rasm — rasm fayli yo'li. Rasmni public/img papkasiga qo'ying. */
const DIREKTOR={
  ism:"Direktor Ism Familiya",  yosh:52,  direktor:"2015-yildan beri",
  qabulKunlari:"Dushanba–Juma",  qabulVaqti:"14:00–17:00",
  rasm:"img/direktor.jpg"
};

const ORINBOSARLAR=[
  { ism:"1-o'rinbosar Ism Familiya",  vazifa:"O'quv ishlari bo'yicha",           malumot:"Oliy",  yosh:45,  staj:"8 yil",  rasm:"img/orinbosar1.jpg" },
  { ism:"2-o'rinbosar Ism Familiya",  vazifa:"Ma'naviy-ma'rifiy ishlar bo'yicha", malumot:"Oliy",  yosh:41,  staj:"5 yil",  rasm:"img/orinbosar2.jpg" },
   { ism:"3-o'rinbosar Ism Familiya",  vazifa:"O'quv ishlari bo'yicha",           malumot:"Oliy",  yosh:45,  staj:"8 yil",  rasm:"img/orinbosar3.jpg" },
  { ism:"4-o'rinbosar Ism Familiya",  vazifa:"Ma'naviy-ma'rifiy ishlar bo'yicha", malumot:"Oliy",  yosh:41,  staj:"5 yil",  rasm:"img/orinbosar4.jpg" },
];


/* ================= 3) O'QITUVCHILAR =================
   Har bir qator = bitta o'qituvchi. "Jami o'qituvchilar" soni qatorlar soniga qarab
   o'zi hisoblanadi. Yangi o'qituvchi qo'shish uchun bitta qatorni nusxalab ostiga qo'ying.
   ism — ism-familya | fan — o'qitadigan fani | yosh — raqam | malumot — ma'lumoti
   staj — ish staji | rasm — o'qituvchi rasmi (har biriga alohida fayl nomi yozing) */
const OQITUVCHILAR=[
  { ism:"1-o'qituvchi Ism Familiya",  fan:"Matematika",         yosh:35,  malumot:"Oliy",  staj:"11 yil",  rasm:"img/oqituvchi1.jpg" },
  { ism:"2-o'qituvchi Ism Familiya",  fan:"Ona tili",           yosh:42,  malumot:"Oliy",  staj:"18 yil",  rasm:"img/oqituvchi2.jpg" },
  { ism:"3-o'qituvchi Ism Familiya",  fan:"Adabiyot",           yosh:49,  malumot:"Oliy",  staj:"25 yil",  rasm:"img/oqituvchi3.jpg" },
  { ism:"4-o'qituvchi Ism Familiya",  fan:"Ingliz tili",        yosh:31,  malumot:"Oliy",  staj:"7 yil",  rasm:"img/oqituvchi4.jpg" },
  { ism:"5-o'qituvchi Ism Familiya",  fan:"Rus tili",           yosh:38,  malumot:"Oliy",  staj:"14 yil",  rasm:"img/oqituvchi5.jpg" },
  { ism:"6-o'qituvchi Ism Familiya",  fan:"Fizika",             yosh:45,  malumot:"Oliy",  staj:"21 yil",  rasm:"img/oqituvchi6.jpg" },
  { ism:"7-o'qituvchi Ism Familiya",  fan:"Kimyo",              yosh:52,  malumot:"Oliy",  staj:"28 yil",  rasm:"img/oqituvchi7.jpg" },
  { ism:"8-o'qituvchi Ism Familiya",  fan:"Biologiya",          yosh:34,  malumot:"Oliy",  staj:"10 yil",  rasm:"img/oqituvchi8.jpg" },
  { ism:"9-o'qituvchi Ism Familiya",  fan:"Geografiya",         yosh:41,  malumot:"Oliy",  staj:"17 yil",  rasm:"img/oqituvchi9.jpg" },
  { ism:"10-o'qituvchi Ism Familiya", fan:"O'zbekiston tarixi", yosh:48,  malumot:"Oliy",  staj:"24 yil",  rasm:"img/oqituvchi10.jpg" },
  { ism:"11-o'qituvchi Ism Familiya", fan:"Jahon tarixi",       yosh:30,  malumot:"Oliy",  staj:"6 yil",  rasm:"img/oqituvchi11.jpg" },
  { ism:"12-o'qituvchi Ism Familiya", fan:"Informatika",        yosh:37,  malumot:"Oliy",  staj:"13 yil",  rasm:"img/oqituvchi12.jpg" },
  { ism:"13-o'qituvchi Ism Familiya", fan:"Jismoniy tarbiya",   yosh:44,  malumot:"Oliy",  staj:"20 yil",  rasm:"img/oqituvchi13.jpg" },
  { ism:"14-o'qituvchi Ism Familiya", fan:"Tasviriy san'at",    yosh:51,  malumot:"Oliy",  staj:"27 yil",  rasm:"img/oqituvchi14.jpg" },
  { ism:"15-o'qituvchi Ism Familiya", fan:"Texnologiya",        yosh:33,  malumot:"Oliy",  staj:"9 yil",  rasm:"img/oqituvchi15.jpg" },
  { ism:"16-o'qituvchi Ism Familiya", fan:"Algebra",            yosh:40,  malumot:"Oliy",  staj:"16 yil",  rasm:"img/oqituvchi16.jpg" },
  { ism:"17-o'qituvchi Ism Familiya", fan:"Geometriya",         yosh:47,  malumot:"Oliy",  staj:"23 yil",  rasm:"img/oqituvchi17.jpg" },
  { ism:"18-o'qituvchi Ism Familiya", fan:"Huquq",              yosh:29,  malumot:"Oliy",  staj:"5 yil",  rasm:"img/oqituvchi18.jpg" },
  { ism:"19-o'qituvchi Ism Familiya", fan:"Astronomiya",        yosh:36,  malumot:"Oliy",  staj:"12 yil",  rasm:"img/oqituvchi19.jpg" },
  { ism:"20-o'qituvchi Ism Familiya", fan:"Iqtisodiyot",        yosh:43,  malumot:"Oliy",  staj:"19 yil",  rasm:"img/oqituvchi20.jpg" },
  { ism:"21-o'qituvchi Ism Familiya", fan:"Musiqa madaniyati",  yosh:50,  malumot:"Oliy",  staj:"26 yil",  rasm:"img/oqituvchi21.jpg" },
  { ism:"22-o'qituvchi Ism Familiya", fan:"Chizmachilik",       yosh:32,  malumot:"Oliy",  staj:"8 yil",  rasm:"img/oqituvchi22.jpg" },
  { ism:"23-o'qituvchi Ism Familiya", fan:"Tarbiya",            yosh:39,  malumot:"Oliy",  staj:"15 yil",  rasm:"img/oqituvchi23.jpg" },
  { ism:"24-o'qituvchi Ism Familiya", fan:"Matematika",         yosh:46,  malumot:"Oliy",  staj:"22 yil",  rasm:"img/oqituvchi24.jpg" },
  { ism:"25-o'qituvchi Ism Familiya", fan:"Ona tili",           yosh:28,  malumot:"Oliy",  staj:"4 yil",  rasm:"img/oqituvchi25.jpg" },
  { ism:"26-o'qituvchi Ism Familiya", fan:"Ona tili",           yosh:28,  malumot:"Oliy",  staj:"4 yil",  rasm:"img/oqituvchi26.jpg" },
];


/* ================= 4) DARS JADVALI =================
   ZANGLAR — dars vaqtlari. 1-dars 1-vaqtdan, 2-dars 2-vaqtdan ... olinadi.
   Faqat bir marta yoziladi, hamma sinfga qo'llanadi. */
const ZANGLAR=["08:00–08:45","08:50–09:35","09:40–10:25","10:30–11:15","11:25–12:55","13:05–13:50"];

/* Har bir sinf alohida blok. Har bir kun alohida qatorda.
   Dars = ["Fan nomi","Xona"]  (tartib bilan: birinchisi 1-dars, ikkinchisi 2-dars ...)
   Dars qo'shish: qatorga yana bitta ["Fan","Xona"], yozing.  O'chirish: uni o'chiring.
   Bu kunda dars bo'lmasa:  Shanba: [],
   Bitta dars vaqti boshqacha bo'lsa 3-qiymat yozing:  ["Matematika","101","08:00–08:45"]
   DIQQAT: quyidagi jadvallar NAMUNA. Har sinf uchun haqiqiy jadvalni o'zingiz yozasiz. */
const JADVAL={
  "5-A":{
    Dushanba:  [ ["Ona tili","101"], ["Adabiyot","101"], ["Matematika","101"], ["Ingliz tili","101"], ["Rus tili","101"], ["O'zbekiston tarixi","101"] ],
    Seshanba:  [ ["Jahon tarixi","101"], ["Tabiatshunoslik","101"], ["Informatika","Kompyuter xona"], ["Tasviriy san'at","101"], ["Musiqa madaniyati","101"], ["Texnologiya","101"] ],
    Chorshanba:[ ["Jismoniy tarbiya","Sport zal"], ["Geografiya","101"], ["Ona tili","101"], ["Adabiyot","101"], ["Matematika","101"], ["Ingliz tili","101"] ],
    Payshanba: [ ["Rus tili","101"], ["O'zbekiston tarixi","101"], ["Jahon tarixi","101"], ["Tabiatshunoslik","101"], ["Informatika","Kompyuter xona"], ["Tasviriy san'at","101"] ],
    Juma:      [ ["Musiqa madaniyati","101"], ["Texnologiya","101"], ["Jismoniy tarbiya","Sport zal"], ["Geografiya","101"], ["Ona tili","101"], ["Adabiyot","101"] ],
    Shanba:    [ ["Matematika","101"], ["Ingliz tili","101"], ["Rus tili","101"], ["O'zbekiston tarixi","101"] ],
  },
  "5-V":{
    Dushanba:  [ ["Matematika","102"], ["Ingliz tili","102"], ["Rus tili","102"], ["O'zbekiston tarixi","102"], ["Jahon tarixi","102"], ["Tabiatshunoslik","102"] ],
    Seshanba:  [ ["Informatika","Kompyuter xona"], ["Tasviriy san'at","102"], ["Musiqa madaniyati","102"], ["Texnologiya","102"], ["Jismoniy tarbiya","Sport zal"], ["Geografiya","102"] ],
    Chorshanba:[ ["Ona tili","102"], ["Adabiyot","102"], ["Matematika","102"], ["Ingliz tili","102"], ["Rus tili","102"], ["O'zbekiston tarixi","102"] ],
    Payshanba: [ ["Jahon tarixi","102"], ["Tabiatshunoslik","102"], ["Informatika","Kompyuter xona"], ["Tasviriy san'at","102"], ["Musiqa madaniyati","102"], ["Texnologiya","102"] ],
    Juma:      [ ["Jismoniy tarbiya","Sport zal"], ["Geografiya","102"], ["Ona tili","102"], ["Adabiyot","102"], ["Matematika","102"], ["Ingliz tili","102"] ],
    Shanba:    [ ["Rus tili","102"], ["O'zbekiston tarixi","102"], ["Jahon tarixi","102"], ["Tabiatshunoslik","102"] ],
  },
  "5-B":{
    Dushanba:  [ ["Rus tili","103"], ["O'zbekiston tarixi","103"], ["Jahon tarixi","103"], ["Tabiatshunoslik","103"], ["Informatika","Kompyuter xona"], ["Tasviriy san'at","103"] ],
    Seshanba:  [ ["Musiqa madaniyati","103"], ["Texnologiya","103"], ["Jismoniy tarbiya","Sport zal"], ["Geografiya","103"], ["Ona tili","103"], ["Adabiyot","103"] ],
    Chorshanba:[ ["Matematika","103"], ["Ingliz tili","103"], ["Rus tili","103"], ["O'zbekiston tarixi","103"], ["Jahon tarixi","103"], ["Tabiatshunoslik","103"] ],
    Payshanba: [ ["Informatika","Kompyuter xona"], ["Tasviriy san'at","103"], ["Musiqa madaniyati","103"], ["Texnologiya","103"], ["Jismoniy tarbiya","Sport zal"], ["Geografiya","103"] ],
    Juma:      [ ["Ona tili","103"], ["Adabiyot","103"], ["Matematika","103"], ["Ingliz tili","103"], ["Rus tili","103"], ["O'zbekiston tarixi","103"] ],
    Shanba:    [ ["Jahon tarixi","103"], ["Tabiatshunoslik","103"], ["Informatika","Kompyuter xona"], ["Tasviriy san'at","103"] ],
  },
  "5-D":{
    Dushanba:  [ ["Jahon tarixi","104"], ["Tabiatshunoslik","104"], ["Informatika","Kompyuter xona"], ["Tasviriy san'at","104"], ["Musiqa madaniyati","104"], ["Texnologiya","104"] ],
    Seshanba:  [ ["Jismoniy tarbiya","Sport zal"], ["Geografiya","104"], ["Ona tili","104"], ["Adabiyot","104"], ["Matematika","104"], ["Ingliz tili","104"] ],
    Chorshanba:[ ["Rus tili","104"], ["O'zbekiston tarixi","104"], ["Jahon tarixi","104"], ["Tabiatshunoslik","104"], ["Informatika","Kompyuter xona"], ["Tasviriy san'at","104"] ],
    Payshanba: [ ["Musiqa madaniyati","104"], ["Texnologiya","104"], ["Jismoniy tarbiya","Sport zal"], ["Geografiya","104"], ["Ona tili","104"], ["Adabiyot","104"] ],
    Juma:      [ ["Matematika","104"], ["Ingliz tili","104"], ["Rus tili","104"], ["O'zbekiston tarixi","104"], ["Jahon tarixi","104"], ["Tabiatshunoslik","104"] ],
    Shanba:    [ ["Informatika","Kompyuter xona"], ["Tasviriy san'at","104"], ["Musiqa madaniyati","104"], ["Texnologiya","104"] ],
  },
  "6-A":{
    Dushanba:  [ ["Ona tili","201"], ["Adabiyot","201"], ["Matematika","201"], ["Ingliz tili","201"], ["Rus tili","201"], ["O'zbekiston tarixi","201"] ],
    Seshanba:  [ ["Jahon tarixi","201"], ["Geografiya","201"], ["Biologiya","201"], ["Informatika","Kompyuter xona"], ["Tasviriy san'at","201"], ["Musiqa madaniyati","201"] ],
    Chorshanba:[ ["Texnologiya","201"], ["Jismoniy tarbiya","Sport zal"], ["Ona tili","201"], ["Adabiyot","201"], ["Matematika","201"], ["Ingliz tili","201"] ],
    Payshanba: [ ["Rus tili","201"], ["O'zbekiston tarixi","201"], ["Jahon tarixi","201"], ["Geografiya","201"], ["Biologiya","201"], ["Informatika","Kompyuter xona"] ],
    Juma:      [ ["Tasviriy san'at","201"], ["Musiqa madaniyati","201"], ["Texnologiya","201"], ["Jismoniy tarbiya","Sport zal"], ["Ona tili","201"], ["Adabiyot","201"] ],
    Shanba:    [ ["Matematika","201"], ["Ingliz tili","201"], ["Rus tili","201"], ["O'zbekiston tarixi","201"] ],
  },
  "6-V":{
    Dushanba:  [ ["Matematika","202"], ["Ingliz tili","202"], ["Rus tili","202"], ["O'zbekiston tarixi","202"], ["Jahon tarixi","202"], ["Geografiya","202"] ],
    Seshanba:  [ ["Biologiya","202"], ["Informatika","Kompyuter xona"], ["Tasviriy san'at","202"], ["Musiqa madaniyati","202"], ["Texnologiya","202"], ["Jismoniy tarbiya","Sport zal"] ],
    Chorshanba:[ ["Ona tili","202"], ["Adabiyot","202"], ["Matematika","202"], ["Ingliz tili","202"], ["Rus tili","202"], ["O'zbekiston tarixi","202"] ],
    Payshanba: [ ["Jahon tarixi","202"], ["Geografiya","202"], ["Biologiya","202"], ["Informatika","Kompyuter xona"], ["Tasviriy san'at","202"], ["Musiqa madaniyati","202"] ],
    Juma:      [ ["Texnologiya","202"], ["Jismoniy tarbiya","Sport zal"], ["Ona tili","202"], ["Adabiyot","202"], ["Matematika","202"], ["Ingliz tili","202"] ],
    Shanba:    [ ["Rus tili","202"], ["O'zbekiston tarixi","202"], ["Jahon tarixi","202"], ["Geografiya","202"] ],
  },
  "6-B":{
    Dushanba:  [ ["Rus tili","203"], ["O'zbekiston tarixi","203"], ["Jahon tarixi","203"], ["Geografiya","203"], ["Biologiya","203"], ["Informatika","Kompyuter xona"] ],
    Seshanba:  [ ["Tasviriy san'at","203"], ["Musiqa madaniyati","203"], ["Texnologiya","203"], ["Jismoniy tarbiya","Sport zal"], ["Ona tili","203"], ["Adabiyot","203"] ],
    Chorshanba:[ ["Matematika","203"], ["Ingliz tili","203"], ["Rus tili","203"], ["O'zbekiston tarixi","203"], ["Jahon tarixi","203"], ["Geografiya","203"] ],
    Payshanba: [ ["Biologiya","203"], ["Informatika","Kompyuter xona"], ["Tasviriy san'at","203"], ["Musiqa madaniyati","203"], ["Texnologiya","203"], ["Jismoniy tarbiya","Sport zal"] ],
    Juma:      [ ["Ona tili","203"], ["Adabiyot","203"], ["Matematika","203"], ["Ingliz tili","203"], ["Rus tili","203"], ["O'zbekiston tarixi","203"] ],
    Shanba:    [ ["Jahon tarixi","203"], ["Geografiya","203"], ["Biologiya","203"], ["Informatika","Kompyuter xona"] ],
  },
  "6-D":{
    Dushanba:  [ ["Jahon tarixi","204"], ["Geografiya","204"], ["Biologiya","204"], ["Informatika","Kompyuter xona"], ["Tasviriy san'at","204"], ["Musiqa madaniyati","204"] ],
    Seshanba:  [ ["Texnologiya","204"], ["Jismoniy tarbiya","Sport zal"], ["Ona tili","204"], ["Adabiyot","204"], ["Matematika","204"], ["Ingliz tili","204"] ],
    Chorshanba:[ ["Rus tili","204"], ["O'zbekiston tarixi","204"], ["Jahon tarixi","204"], ["Geografiya","204"], ["Biologiya","204"], ["Informatika","Kompyuter xona"] ],
    Payshanba: [ ["Tasviriy san'at","204"], ["Musiqa madaniyati","204"], ["Texnologiya","204"], ["Jismoniy tarbiya","Sport zal"], ["Ona tili","204"], ["Adabiyot","204"] ],
    Juma:      [ ["Matematika","204"], ["Ingliz tili","204"], ["Rus tili","204"], ["O'zbekiston tarixi","204"], ["Jahon tarixi","204"], ["Geografiya","204"] ],
    Shanba:    [ ["Biologiya","204"], ["Informatika","Kompyuter xona"], ["Tasviriy san'at","204"], ["Musiqa madaniyati","204"] ],
  },
  "7-A":{
    Dushanba:  [ ["Ona tili","301"], ["Adabiyot","301"], ["Algebra","301"], ["Geometriya","301"], ["Ingliz tili","301"], ["Rus tili","301"] ],
    Seshanba:  [ ["O'zbekiston tarixi","301"], ["Jahon tarixi","301"], ["Geografiya","301"], ["Biologiya","301"], ["Fizika","301"], ["Informatika","Kompyuter xona"] ],
    Chorshanba:[ ["Tasviriy san'at","301"], ["Texnologiya","301"], ["Jismoniy tarbiya","Sport zal"], ["Ona tili","301"], ["Adabiyot","301"], ["Algebra","301"] ],
    Payshanba: [ ["Geometriya","301"], ["Ingliz tili","301"], ["Rus tili","301"], ["O'zbekiston tarixi","301"], ["Jahon tarixi","301"], ["Geografiya","301"] ],
    Juma:      [ ["Biologiya","301"], ["Fizika","301"], ["Informatika","Kompyuter xona"], ["Tasviriy san'at","301"], ["Texnologiya","301"], ["Jismoniy tarbiya","Sport zal"] ],
    Shanba:    [ ["Ona tili","301"], ["Adabiyot","301"], ["Algebra","301"], ["Geometriya","301"] ],
  },
  "7-V":{
    Dushanba:  [ ["Algebra","302"], ["Geometriya","302"], ["Ingliz tili","302"], ["Rus tili","302"], ["O'zbekiston tarixi","302"], ["Jahon tarixi","302"] ],
    Seshanba:  [ ["Geografiya","302"], ["Biologiya","302"], ["Fizika","302"], ["Informatika","Kompyuter xona"], ["Tasviriy san'at","302"], ["Texnologiya","302"] ],
    Chorshanba:[ ["Jismoniy tarbiya","Sport zal"], ["Ona tili","302"], ["Adabiyot","302"], ["Algebra","302"], ["Geometriya","302"], ["Ingliz tili","302"] ],
    Payshanba: [ ["Rus tili","302"], ["O'zbekiston tarixi","302"], ["Jahon tarixi","302"], ["Geografiya","302"], ["Biologiya","302"], ["Fizika","302"] ],
    Juma:      [ ["Informatika","Kompyuter xona"], ["Tasviriy san'at","302"], ["Texnologiya","302"], ["Jismoniy tarbiya","Sport zal"], ["Ona tili","302"], ["Adabiyot","302"] ],
    Shanba:    [ ["Algebra","302"], ["Geometriya","302"], ["Ingliz tili","302"], ["Rus tili","302"] ],
  },
  "7-B":{
    Dushanba:  [ ["Ingliz tili","303"], ["Rus tili","303"], ["O'zbekiston tarixi","303"], ["Jahon tarixi","303"], ["Geografiya","303"], ["Biologiya","303"] ],
    Seshanba:  [ ["Fizika","303"], ["Informatika","Kompyuter xona"], ["Tasviriy san'at","303"], ["Texnologiya","303"], ["Jismoniy tarbiya","Sport zal"], ["Ona tili","303"] ],
    Chorshanba:[ ["Adabiyot","303"], ["Algebra","303"], ["Geometriya","303"], ["Ingliz tili","303"], ["Rus tili","303"], ["O'zbekiston tarixi","303"] ],
    Payshanba: [ ["Jahon tarixi","303"], ["Geografiya","303"], ["Biologiya","303"], ["Fizika","303"], ["Informatika","Kompyuter xona"], ["Tasviriy san'at","303"] ],
    Juma:      [ ["Texnologiya","303"], ["Jismoniy tarbiya","Sport zal"], ["Ona tili","303"], ["Adabiyot","303"], ["Algebra","303"], ["Geometriya","303"] ],
    Shanba:    [ ["Ingliz tili","303"], ["Rus tili","303"], ["O'zbekiston tarixi","303"], ["Jahon tarixi","303"] ],
  },
  "7-D":{
    Dushanba:  [ ["O'zbekiston tarixi","304"], ["Jahon tarixi","304"], ["Geografiya","304"], ["Biologiya","304"], ["Fizika","304"], ["Informatika","Kompyuter xona"] ],
    Seshanba:  [ ["Tasviriy san'at","304"], ["Texnologiya","304"], ["Jismoniy tarbiya","Sport zal"], ["Ona tili","304"], ["Adabiyot","304"], ["Algebra","304"] ],
    Chorshanba:[ ["Geometriya","304"], ["Ingliz tili","304"], ["Rus tili","304"], ["O'zbekiston tarixi","304"], ["Jahon tarixi","304"], ["Geografiya","304"] ],
    Payshanba: [ ["Biologiya","304"], ["Fizika","304"], ["Informatika","Kompyuter xona"], ["Tasviriy san'at","304"], ["Texnologiya","304"], ["Jismoniy tarbiya","Sport zal"] ],
    Juma:      [ ["Ona tili","304"], ["Adabiyot","304"], ["Algebra","304"], ["Geometriya","304"], ["Ingliz tili","304"], ["Rus tili","304"] ],
    Shanba:    [ ["O'zbekiston tarixi","304"], ["Jahon tarixi","304"], ["Geografiya","304"], ["Biologiya","304"] ],
  },
  "8-A":{
    Dushanba:  [ ["Ona tili","401"], ["Adabiyot","401"], ["Algebra","401"], ["Geometriya","401"], ["Ingliz tili","401"], ["Rus tili","401"] ],
    Seshanba:  [ ["O'zbekiston tarixi","401"], ["Jahon tarixi","401"], ["Geografiya","401"], ["Biologiya","401"], ["Fizika","401"], ["Kimyo","401"] ],
    Chorshanba:[ ["Informatika","Kompyuter xona"], ["Tasviriy san'at","401"], ["Texnologiya","401"], ["Jismoniy tarbiya","Sport zal"], ["Ona tili","401"], ["Adabiyot","401"] ],
    Payshanba: [ ["Algebra","401"], ["Geometriya","401"], ["Ingliz tili","401"], ["Rus tili","401"], ["O'zbekiston tarixi","401"], ["Jahon tarixi","401"] ],
    Juma:      [ ["Geografiya","401"], ["Biologiya","401"], ["Fizika","401"], ["Kimyo","401"], ["Informatika","Kompyuter xona"], ["Tasviriy san'at","401"] ],
    Shanba:    [ ["Texnologiya","401"], ["Jismoniy tarbiya","Sport zal"], ["Ona tili","401"], ["Adabiyot","401"] ],
  },
  "8-V":{
    Dushanba:  [ ["Algebra","402"], ["Geometriya","402"], ["Ingliz tili","402"], ["Rus tili","402"], ["O'zbekiston tarixi","402"], ["Jahon tarixi","402"] ],
    Seshanba:  [ ["Geografiya","402"], ["Biologiya","402"], ["Fizika","402"], ["Kimyo","402"], ["Informatika","Kompyuter xona"], ["Tasviriy san'at","402"] ],
    Chorshanba:[ ["Texnologiya","402"], ["Jismoniy tarbiya","Sport zal"], ["Ona tili","402"], ["Adabiyot","402"], ["Algebra","402"], ["Geometriya","402"] ],
    Payshanba: [ ["Ingliz tili","402"], ["Rus tili","402"], ["O'zbekiston tarixi","402"], ["Jahon tarixi","402"], ["Geografiya","402"], ["Biologiya","402"] ],
    Juma:      [ ["Fizika","402"], ["Kimyo","402"], ["Informatika","Kompyuter xona"], ["Tasviriy san'at","402"], ["Texnologiya","402"], ["Jismoniy tarbiya","Sport zal"] ],
    Shanba:    [ ["Ona tili","402"], ["Adabiyot","402"], ["Algebra","402"], ["Geometriya","402"] ],
  },
  "8-J":{
    Dushanba:  [ ["Ingliz tili","403"], ["Rus tili","403"], ["O'zbekiston tarixi","403"], ["Jahon tarixi","403"], ["Geografiya","403"], ["Biologiya","403"] ],
    Seshanba:  [ ["Fizika","403"], ["Kimyo","403"], ["Informatika","Kompyuter xona"], ["Tasviriy san'at","403"], ["Texnologiya","403"], ["Jismoniy tarbiya","Sport zal"] ],
    Chorshanba:[ ["Ona tili","403"], ["Adabiyot","403"], ["Algebra","403"], ["Geometriya","403"], ["Ingliz tili","403"], ["Rus tili","403"] ],
    Payshanba: [ ["O'zbekiston tarixi","403"], ["Jahon tarixi","403"], ["Geografiya","403"], ["Biologiya","403"], ["Fizika","403"], ["Kimyo","403"] ],
    Juma:      [ ["Informatika","Kompyuter xona"], ["Tasviriy san'at","403"], ["Texnologiya","403"], ["Jismoniy tarbiya","Sport zal"], ["Ona tili","403"], ["Adabiyot","403"] ],
    Shanba:    [ ["Algebra","403"], ["Geometriya","403"], ["Ingliz tili","403"], ["Rus tili","403"] ],
  },
  "8-G":{
    Dushanba:  [ ["O'zbekiston tarixi","404"], ["Jahon tarixi","404"], ["Geografiya","404"], ["Biologiya","404"], ["Fizika","404"], ["Kimyo","404"] ],
    Seshanba:  [ ["Informatika","Kompyuter xona"], ["Tasviriy san'at","404"], ["Texnologiya","404"], ["Jismoniy tarbiya","Sport zal"], ["Ona tili","404"], ["Adabiyot","404"] ],
    Chorshanba:[ ["Algebra","404"], ["Geometriya","404"], ["Ingliz tili","404"], ["Rus tili","404"], ["O'zbekiston tarixi","404"], ["Jahon tarixi","404"] ],
    Payshanba: [ ["Geografiya","404"], ["Biologiya","404"], ["Fizika","404"], ["Kimyo","404"], ["Informatika","Kompyuter xona"], ["Tasviriy san'at","404"] ],
    Juma:      [ ["Texnologiya","404"], ["Jismoniy tarbiya","Sport zal"], ["Ona tili","404"], ["Adabiyot","404"], ["Algebra","404"], ["Geometriya","404"] ],
    Shanba:    [ ["Ingliz tili","404"], ["Rus tili","404"], ["O'zbekiston tarixi","404"], ["Jahon tarixi","404"] ],
  },
  "9-A":{
    Dushanba:  [ ["Ona tili","501"], ["Adabiyot","501"], ["Algebra","501"], ["Geometriya","501"], ["Ingliz tili","501"], ["Rus tili","501"] ],
    Seshanba:  [ ["O'zbekiston tarixi","501"], ["Jahon tarixi","501"], ["Geografiya","501"], ["Biologiya","501"], ["Fizika","501"], ["Kimyo","501"] ],
    Chorshanba:[ ["Informatika","Kompyuter xona"], ["Chizmachilik","501"], ["Huquq","501"], ["Jismoniy tarbiya","Sport zal"], ["Ona tili","501"], ["Adabiyot","501"] ],
    Payshanba: [ ["Algebra","501"], ["Geometriya","501"], ["Ingliz tili","501"], ["Rus tili","501"], ["O'zbekiston tarixi","501"], ["Jahon tarixi","501"] ],
    Juma:      [ ["Geografiya","501"], ["Biologiya","501"], ["Fizika","501"], ["Kimyo","501"], ["Informatika","Kompyuter xona"], ["Chizmachilik","501"] ],
    Shanba:    [ ["Huquq","501"], ["Jismoniy tarbiya","Sport zal"], ["Ona tili","501"], ["Adabiyot","501"] ],
  },
  "9-V":{
    Dushanba:  [ ["Algebra","502"], ["Geometriya","502"], ["Ingliz tili","502"], ["Rus tili","502"], ["O'zbekiston tarixi","502"], ["Jahon tarixi","502"] ],
    Seshanba:  [ ["Geografiya","502"], ["Biologiya","502"], ["Fizika","502"], ["Kimyo","502"], ["Informatika","Kompyuter xona"], ["Chizmachilik","502"] ],
    Chorshanba:[ ["Huquq","502"], ["Jismoniy tarbiya","Sport zal"], ["Ona tili","502"], ["Adabiyot","502"], ["Algebra","502"], ["Geometriya","502"] ],
    Payshanba: [ ["Ingliz tili","502"], ["Rus tili","502"], ["O'zbekiston tarixi","502"], ["Jahon tarixi","502"], ["Geografiya","502"], ["Biologiya","502"] ],
    Juma:      [ ["Fizika","502"], ["Kimyo","502"], ["Informatika","Kompyuter xona"], ["Chizmachilik","502"], ["Huquq","502"], ["Jismoniy tarbiya","Sport zal"] ],
    Shanba:    [ ["Ona tili","502"], ["Adabiyot","502"], ["Algebra","502"], ["Geometriya","502"] ],
  },
  "9-B":{
    Dushanba:  [ ["Ingliz tili","503"], ["Rus tili","503"], ["O'zbekiston tarixi","503"], ["Jahon tarixi","503"], ["Geografiya","503"], ["Biologiya","503"] ],
    Seshanba:  [ ["Fizika","503"], ["Kimyo","503"], ["Informatika","Kompyuter xona"], ["Chizmachilik","503"], ["Huquq","503"], ["Jismoniy tarbiya","Sport zal"] ],
    Chorshanba:[ ["Ona tili","503"], ["Adabiyot","503"], ["Algebra","503"], ["Geometriya","503"], ["Ingliz tili","503"], ["Rus tili","503"] ],
    Payshanba: [ ["O'zbekiston tarixi","503"], ["Jahon tarixi","503"], ["Geografiya","503"], ["Biologiya","503"], ["Fizika","503"], ["Kimyo","503"] ],
    Juma:      [ ["Informatika","Kompyuter xona"], ["Chizmachilik","503"], ["Huquq","503"], ["Jismoniy tarbiya","Sport zal"], ["Ona tili","503"], ["Adabiyot","503"] ],
    Shanba:    [ ["Algebra","503"], ["Geometriya","503"], ["Ingliz tili","503"], ["Rus tili","503"] ],
  },
  "9-D":{
    Dushanba:  [ ["O'zbekiston tarixi","504"], ["Jahon tarixi","504"], ["Geografiya","504"], ["Biologiya","504"], ["Fizika","504"], ["Kimyo","504"] ],
    Seshanba:  [ ["Informatika","Kompyuter xona"], ["Chizmachilik","504"], ["Huquq","504"], ["Jismoniy tarbiya","Sport zal"], ["Ona tili","504"], ["Adabiyot","504"] ],
    Chorshanba:[ ["Algebra","504"], ["Geometriya","504"], ["Ingliz tili","504"], ["Rus tili","504"], ["O'zbekiston tarixi","504"], ["Jahon tarixi","504"] ],
    Payshanba: [ ["Geografiya","504"], ["Biologiya","504"], ["Fizika","504"], ["Kimyo","504"], ["Informatika","Kompyuter xona"], ["Chizmachilik","504"] ],
    Juma:      [ ["Huquq","504"], ["Jismoniy tarbiya","Sport zal"], ["Ona tili","504"], ["Adabiyot","504"], ["Algebra","504"], ["Geometriya","504"] ],
    Shanba:    [ ["Ingliz tili","504"], ["Rus tili","504"], ["O'zbekiston tarixi","504"], ["Jahon tarixi","504"] ],
  },
  "10-A":{
    Dushanba:  [ ["Ona tili","601"], ["Adabiyot","601"], ["Algebra","601"], ["Geometriya","601"], ["Ingliz tili","601"], ["Rus tili","601"] ],
    Seshanba:  [ ["O'zbekiston tarixi","601"], ["Jahon tarixi","601"], ["Geografiya","601"], ["Biologiya","601"], ["Fizika","601"], ["Kimyo","601"] ],
    Chorshanba:[ ["Informatika","Kompyuter xona"], ["Astronomiya","601"], ["Huquq","601"], ["Iqtisodiyot","601"], ["Jismoniy tarbiya","Sport zal"], ["Ona tili","601"] ],
    Payshanba: [ ["Adabiyot","601"], ["Algebra","601"], ["Geometriya","601"], ["Ingliz tili","601"], ["Rus tili","601"], ["O'zbekiston tarixi","601"] ],
    Juma:      [ ["Jahon tarixi","601"], ["Geografiya","601"], ["Biologiya","601"], ["Fizika","601"], ["Kimyo","601"], ["Informatika","Kompyuter xona"] ],
    Shanba:    [ ["Astronomiya","601"], ["Huquq","601"], ["Iqtisodiyot","601"], ["Jismoniy tarbiya","Sport zal"] ],
  },
  "10-V":{
    Dushanba:  [ ["Algebra","602"], ["Geometriya","602"], ["Ingliz tili","602"], ["Rus tili","602"], ["O'zbekiston tarixi","602"], ["Jahon tarixi","602"] ],
    Seshanba:  [ ["Geografiya","602"], ["Biologiya","602"], ["Fizika","602"], ["Kimyo","602"], ["Informatika","Kompyuter xona"], ["Astronomiya","602"] ],
    Chorshanba:[ ["Huquq","602"], ["Iqtisodiyot","602"], ["Jismoniy tarbiya","Sport zal"], ["Ona tili","602"], ["Adabiyot","602"], ["Algebra","602"] ],
    Payshanba: [ ["Geometriya","602"], ["Ingliz tili","602"], ["Rus tili","602"], ["O'zbekiston tarixi","602"], ["Jahon tarixi","602"], ["Geografiya","602"] ],
    Juma:      [ ["Biologiya","602"], ["Fizika","602"], ["Kimyo","602"], ["Informatika","Kompyuter xona"], ["Astronomiya","602"], ["Huquq","602"] ],
    Shanba:    [ ["Iqtisodiyot","602"], ["Jismoniy tarbiya","Sport zal"], ["Ona tili","602"], ["Adabiyot","602"] ],
  },
  "10-B":{
    Dushanba:  [ ["Ingliz tili","603"], ["Rus tili","603"], ["O'zbekiston tarixi","603"], ["Jahon tarixi","603"], ["Geografiya","603"], ["Biologiya","603"] ],
    Seshanba:  [ ["Fizika","603"], ["Kimyo","603"], ["Informatika","Kompyuter xona"], ["Astronomiya","603"], ["Huquq","603"], ["Iqtisodiyot","603"] ],
    Chorshanba:[ ["Jismoniy tarbiya","Sport zal"], ["Ona tili","603"], ["Adabiyot","603"], ["Algebra","603"], ["Geometriya","603"], ["Ingliz tili","603"] ],
    Payshanba: [ ["Rus tili","603"], ["O'zbekiston tarixi","603"], ["Jahon tarixi","603"], ["Geografiya","603"], ["Biologiya","603"], ["Fizika","603"] ],
    Juma:      [ ["Kimyo","603"], ["Informatika","Kompyuter xona"], ["Astronomiya","603"], ["Huquq","603"], ["Iqtisodiyot","603"], ["Jismoniy tarbiya","Sport zal"] ],
    Shanba:    [ ["Ona tili","603"], ["Adabiyot","603"], ["Algebra","603"], ["Geometriya","603"] ],
  },
  "10-D":{
    Dushanba:  [ ["O'zbekiston tarixi","604"], ["Jahon tarixi","604"], ["Geografiya","604"], ["Biologiya","604"], ["Fizika","604"], ["Kimyo","604"] ],
    Seshanba:  [ ["Informatika","Kompyuter xona"], ["Astronomiya","604"], ["Huquq","604"], ["Iqtisodiyot","604"], ["Jismoniy tarbiya","Sport zal"], ["Ona tili","604"] ],
    Chorshanba:[ ["Adabiyot","604"], ["Algebra","604"], ["Geometriya","604"], ["Ingliz tili","604"], ["Rus tili","604"], ["O'zbekiston tarixi","604"] ],
    Payshanba: [ ["Jahon tarixi","604"], ["Geografiya","604"], ["Biologiya","604"], ["Fizika","604"], ["Kimyo","604"], ["Informatika","Kompyuter xona"] ],
    Juma:      [ ["Astronomiya","604"], ["Huquq","604"], ["Iqtisodiyot","604"], ["Jismoniy tarbiya","Sport zal"], ["Ona tili","604"], ["Adabiyot","604"] ],
    Shanba:    [ ["Algebra","604"], ["Geometriya","604"], ["Ingliz tili","604"], ["Rus tili","604"] ],
  },
  "11-A":{
    Dushanba:  [ ["Ona tili","701"], ["Adabiyot","701"], ["Algebra","701"], ["Geometriya","701"], ["Ingliz tili","701"], ["Rus tili","701"] ],
    Seshanba:  [ ["O'zbekiston tarixi","701"], ["Jahon tarixi","701"], ["Geografiya","701"], ["Biologiya","701"], ["Fizika","701"], ["Kimyo","701"] ],
    Chorshanba:[ ["Informatika","Kompyuter xona"], ["Astronomiya","701"], ["Huquq","701"], ["Iqtisodiyot","701"], ["Jismoniy tarbiya","Sport zal"], ["Ona tili","701"] ],
    Payshanba: [ ["Adabiyot","701"], ["Algebra","701"], ["Geometriya","701"], ["Ingliz tili","701"], ["Rus tili","701"], ["O'zbekiston tarixi","701"] ],
    Juma:      [ ["Jahon tarixi","701"], ["Geografiya","701"], ["Biologiya","701"], ["Fizika","701"], ["Kimyo","701"], ["Informatika","Kompyuter xona"] ],
    Shanba:    [ ["Astronomiya","701"], ["Huquq","701"], ["Iqtisodiyot","701"], ["Jismoniy tarbiya","Sport zal"] ],
  },
  "11-V":{
    Dushanba:  [ ["Algebra","702"], ["Geometriya","702"], ["Ingliz tili","702"], ["Rus tili","702"], ["O'zbekiston tarixi","702"], ["Jahon tarixi","702"] ],
    Seshanba:  [ ["Geografiya","702"], ["Biologiya","702"], ["Fizika","702"], ["Kimyo","702"], ["Informatika","Kompyuter xona"], ["Astronomiya","702"] ],
    Chorshanba:[ ["Huquq","702"], ["Iqtisodiyot","702"], ["Jismoniy tarbiya","Sport zal"], ["Ona tili","702"], ["Adabiyot","702"], ["Algebra","702"] ],
    Payshanba: [ ["Geometriya","702"], ["Ingliz tili","702"], ["Rus tili","702"], ["O'zbekiston tarixi","702"], ["Jahon tarixi","702"], ["Geografiya","702"] ],
    Juma:      [ ["Biologiya","702"], ["Fizika","702"], ["Kimyo","702"], ["Informatika","Kompyuter xona"], ["Astronomiya","702"], ["Huquq","702"] ],
    Shanba:    [ ["Iqtisodiyot","702"], ["Jismoniy tarbiya","Sport zal"], ["Ona tili","702"], ["Adabiyot","702"] ],
  },
  "11-B":{
    Dushanba:  [ ["Ingliz tili","703"], ["Rus tili","703"], ["O'zbekiston tarixi","703"], ["Jahon tarixi","703"], ["Geografiya","703"], ["Biologiya","703"] ],
    Seshanba:  [ ["Fizika","703"], ["Kimyo","703"], ["Informatika","Kompyuter xona"], ["Astronomiya","703"], ["Huquq","703"], ["Iqtisodiyot","703"] ],
    Chorshanba:[ ["Jismoniy tarbiya","Sport zal"], ["Ona tili","703"], ["Adabiyot","703"], ["Algebra","703"], ["Geometriya","703"], ["Ingliz tili","703"] ],
    Payshanba: [ ["Rus tili","703"], ["O'zbekiston tarixi","703"], ["Jahon tarixi","703"], ["Geografiya","703"], ["Biologiya","703"], ["Fizika","703"] ],
    Juma:      [ ["Kimyo","703"], ["Informatika","Kompyuter xona"], ["Astronomiya","703"], ["Huquq","703"], ["Iqtisodiyot","703"], ["Jismoniy tarbiya","Sport zal"] ],
    Shanba:    [ ["Ona tili","703"], ["Adabiyot","703"], ["Algebra","703"], ["Geometriya","703"] ],
  },
  "11-D":{
    Dushanba:  [ ["O'zbekiston tarixi","704"], ["Jahon tarixi","704"], ["Geografiya","704"], ["Biologiya","704"], ["Fizika","704"], ["Kimyo","704"] ],
    Seshanba:  [ ["Informatika","Kompyuter xona"], ["Astronomiya","704"], ["Huquq","704"], ["Iqtisodiyot","704"], ["Jismoniy tarbiya","Sport zal"], ["Ona tili","704"] ],
    Chorshanba:[ ["Adabiyot","704"], ["Algebra","704"], ["Geometriya","704"], ["Ingliz tili","704"], ["Rus tili","704"], ["O'zbekiston tarixi","704"] ],
    Payshanba: [ ["Jahon tarixi","704"], ["Geografiya","704"], ["Biologiya","704"], ["Fizika","704"], ["Kimyo","704"], ["Informatika","Kompyuter xona"] ],
    Juma:      [ ["Astronomiya","704"], ["Huquq","704"], ["Iqtisodiyot","704"], ["Jismoniy tarbiya","Sport zal"], ["Ona tili","704"], ["Adabiyot","704"] ],
    Shanba:    [ ["Algebra","704"], ["Geometriya","704"], ["Ingliz tili","704"], ["Rus tili","704"] ],
  },
};


/* ================= 5) KUTUBXONA =================
   Har bir sinf uchun O'zbek tili va Rus tili fanlari ro'yxati. Har qator = bitta fan:
       ["kitob-kodi",  "Ekranda ko'rinadigan nomi"],
   - Ikkinchi qiymat (nomi)ni xohlaganingizcha o'zgartiring.
   - Birinchi qiymat (kitob-kodi) — texnik kod. Faqat kichik lotin harflar, raqam va
     chiziqcha (-) bo'lsin. Fanga PDF yuklagandan keyin kodni O'ZGARTIRMANG,
     aks holda yuklangan PDF topilmay qoladi.
   - Yangi fan qo'shish: qatorni nusxalab, KODINI yangi (shu ro'yxatda takrorlanmaydigan)
     qiling va nomini yozing. Fanni olib tashlash: qatorni o'chiring.
   - Har bir fan ichida o'zining "PDF kitob yuklash" tugmasi bor. */
const KITOBLAR={
  5: {
    uz: [
      ["ona-tili",            "Ona tili"],
      ["adabiyot",            "Adabiyot"],
      ["matematika",          "Matematika"],
      ["ingliz-tili",         "Ingliz tili"],
      ["rus-tili",            "Rus tili"],
      ["tarixdan-hikoyalar",  "Tarixdan hikoyalar"],
      ["tabiiy-fanlar",       "Tabiiy fanlar"],
      ["informatika",         "Informatika"],
      ["tasviriy-sanat",      "Tasviriy san'at"],
      ["musiqa",              "Musiqa madaniyati"],
      ["texnologiya",         "Texnologiya"],
      ["jismoniy-tarbiya",    "Jismoniy tarbiya"],
      ["tarbiya",             "Tarbiya"],
    ],
    ru: [
      ["ona-tili",            "Русский язык"],
      ["adabiyot",            "Литература"],
      ["matematika",          "Математика"],
      ["ingliz-tili",         "Английский язык"],
      ["ozbek-tili",            "Узбекский язык"],
      ["tarixdan-hikoyalar",  "Рассказы по истории"],
      ["tabiiy-fanlar",       "Естествознание"],
      ["informatika",         "Информатика"],
      ["tasviriy-sanat",      "Изобразительное искусство"],
      ["musiqa",              "Музыкальная культура"],
      ["texnologiya",         "Технология"],
      ["jismoniy-tarbiya",    "Физическая культура"],
      ["tarbiya",             "Воспитание"],
    ],
  },
  6: {
    uz: [
      ["ona-tili",            "Ona tili"],
      ["adabiyot",            "Adabiyot"],
      ["matematika",          "Matematika"],
      ["ingliz-tili",         "Ingliz tili"],
      ["rus-tili",            "Rus tili"],
      ["qadimgi-dunyo-tarixi", "Qadimgi dunyo tarixi"],
      ["tabiiy-fanlar",       "Tabiiy fanlar"],
      ["informatika",         "Informatika"],
      ["tasviriy-sanat",      "Tasviriy san'at"],
      ["musiqa",              "Musiqa madaniyati"],
      ["texnologiya",         "Texnologiya"],
      ["jismoniy-tarbiya",    "Jismoniy tarbiya"],
      ["tarbiya",             "Tarbiya"],
    ],
    ru: [
      ["ona-tili",            "Русский язык"],
      ["adabiyot",            "Литература"],
      ["matematika",          "Математика"],
      ["ingliz-tili",         "Английский язык"],
      ["ozbek-tili",            "Узбекский язык"],
      ["qadimgi-dunyo-tarixi",   "История древнего мира"],
      ["tabiiy-fanlar",       "Естествознание"],
      ["informatika",         "Информатика"],
      ["tasviriy-sanat",      "Изобразительное искусство"],
      ["musiqa",              "Музыкальная культура"],
      ["texnologiya",         "Технология"],
      ["jismoniy-tarbiya",    "Физическая культура"],
      ["tarbiya",             "Воспитание"],
    ],
  },
  7: {
    uz: [
      ["ona-tili",            "Ona tili"],
      ["adabiyot",            "Adabiyot"],
      ["matematika",           "Matematika"],
      ["ingliz-tili",         "Ingliz tili"],
      ["rus-tili",            "Rus tili"],
      ["ozbekiston-tarixi",   "O'zbekiston tarixi"],
      ["jahon-tarixi",        "Jahon tarixi"],
      ["geografiya",          "Geografiya"],
      ["biologiya",           "Biologiya"],
      ["fizika",              "Fizika"],
      ["informatika",         "Informatika"],
      ["tasviriy-sanat",      "Tasviriy san'at"],
      ["texnologiya",         "Texnologiya"],
      ["jismoniy-tarbiya",    "Jismoniy tarbiya"],
      ["tarbiya",             "Tarbiya"],
      ["kimyo",               "Kimyo"],
      ["musiqa",              "Musiqa"],
    ],
    ru: [
      ["ona-tili",            "Русский язык"],
      ["adabiyot",            "Литература"],
      ["matematika",           "Математика"],
      ["kimyo",               "Химия"],
      ["ingliz-tili",         "Английский язык"],
      ["ozbek-tili",            "Узбекский язык"],
      ["ozbekiston-tarixi",   "История Узбекистана"],
      ["jahon-tarixi",        "Всемирная история"],
      ["geografiya",          "География"],
      ["biologiya",           "Биология"],
      ["fizika",              "Физика"],
      ["informatika",         "Информатика"],
      ["tasviriy-sanat",      "Изобразительное искусство"],
      ["texnologiya",         "Технология"],
      ["jismoniy-tarbiya",    "Физическая культура"],
      ["tarbiya",             "Воспитание"],
      ["musiqa",              "Музыкальная культура"],
    ],
  },
  8: {
    uz: [
      ["ona-tili",            "Ona tili"],
      ["adabiyot",            "Adabiyot"],
      ["algebra",             "Algebra"],
      ["geometriya",          "Geometriya"],
      ["ingliz-tili",         "Ingliz tili"],
      ["rus-tili",            "Rus tili"],
      ["ozbekiston-tarixi",   "O'zbekiston tarixi"],
      ["jahon-tarixi",        "Jahon tarixi"],
      ["geografiya",          "Geografiya"],
      ["biologiya",           "Biologiya"],
      ["fizika",              "Fizika"],
      ["kimyo",               "Kimyo"],
      ["informatika",         "Informatika"],
      ["chizmachilik",       "Chizmachilik"],
      ["texnologiya",         "Texnologiya"],
      ["jismoniy-tarbiya",    "Jismoniy tarbiya"],
      ["tarbiya",             "Tarbiya"],
      ["davlat va huquq asoslari",       "Davlat va huquq asoslari"],
      ["iqtisodiy bilim asoslari",       "Iqtisodiy bilim asoslari"],
    ],
    ru: [
      ["ona-tili",            "Русский язык"],
      ["adabiyot",            "Литература"],
      ["algebra",             "Алгебра"],
      ["geometriya",          "Геометрия"],
      ["ingliz-tili",         "Английский язык"],
      ["ozbek-tili",            "Узбекский язык"],
      ["ozbekiston-tarixi",   "История Узбекистана"],
      ["jahon-tarixi",        "Всемирная история"],
      ["geografiya",          "География"],
      ["biologiya",           "Биология"],
      ["fizika",              "Физика"],
      ["kimyo",               "Химия"],
      ["informatika",         "Информатика"],
      ["chizmachilik",      "Черчение"],
      ["texnologiya",         "Технология"],
      ["jismoniy-tarbiya",    "Физическая культура"],
      ["tarbiya",             "Воспитание"],
       ["davlat va huquq asoslari",      "Основы государства и права"],
      ["iqtisodiy bilim asoslari",       "Основы экономических знаний"],
    ],
  },
  9: {
    uz: [
      ["ona-tili",            "Ona tili"],
      ["adabiyot",            "Adabiyot"],
      ["algebra",             "Algebra"],
      ["geometriya",          "Geometriya"],
      ["ingliz-tili",         "Ingliz tili"],
      ["rus-tili",            "Rus tili"],
      ["ozbekiston-tarixi",   "O'zbekiston tarixi"],
      ["jahon-tarixi",        "Jahon tarixi"],
      ["geografiya",          "Geografiya"],
      ["biologiya",           "Biologiya"],
      ["fizika",              "Fizika"],
      ["kimyo",               "Kimyo"],
      ["informatika",         "Informatika"],
      ["chizmachilik",        "Chizmachilik"],
      ["huquq",               "Davlat va huquq asoslari"],
      ["jismoniy-tarbiya",    "Jismoniy tarbiya"],
      ["tarbiya",             "Tarbiya"],
      ["iqtisodiy bilim asoslari",       "Iqtisodiy bilim asoslari"],
      ["texnologiya",           "Texnologiya"],
    ],
    ru: [
      ["ona-tili",            "Русский язык"],
      ["adabiyot",            "Литература"],
      ["algebra",             "Алгебра"],
      ["geometriya",          "Геометрия"],
      ["ingliz-tili",         "Английский язык"],
      ["ozbek-tili",            "Узбекский язык"],
      ["ozbekiston-tarixi",   "История Узбекистана"],
      ["jahon-tarixi",        "Всемирная история"],
      ["geografiya",          "География"],
      ["biologiya",           "Биология"],
      ["fizika",              "Физика"],
      ["kimyo",               "Химия"],
      ["informatika",         "Информатика"],
      ["chizmachilik",        "Черчение"],
      ["huquq",               "Основы государства и права"],
      ["jismoniy-tarbiya",    "Физическая культура"],
      ["tarbiya",             "Воспитание"],
      ["iqtisodiy bilim asoslari",       "Основы экономических знаний"],
      ["texnologiya",           "Технология"],
    ],
  },
  10: {
    uz: [
      ["ona-tili",            "Ona tili"],
      ["adabiyot",            "Adabiyot"],
      ["algebra",             "Algebra"],
      ["geometriya",          "Geometriya"],
      ["ingliz-tili",         "Ingliz tili"],
      ["rus-tili",            "Rus tili"],
      ["ozbekiston-tarixi",   "O'zbekiston tarixi"],
      ["jahon-tarixi",        "Jahon tarixi"],
      ["geografiya",          "Geografiya"],
      ["biologiya",           "Biologiya"],
      ["fizika",              "Fizika"],
      ["kimyo",               "Kimyo"],
      ["informatika",         "Informatika"],
      ["huquq",               "Davlat va huquq asoslari"],
      ["jismoniy-tarbiya",    "Jismoniy tarbiya"],
      ["tarbiya",             "Tarbiya"],
      ["chqbt",              "CHQBT"],
    ],
    ru: [
      ["ona-tili",            "Русский язык"],
      ["adabiyot",            "Литература"],
      ["algebra",             "Алгебра"],
      ["geometriya",          "Геометрия"],
      ["ingliz-tili",         "Английский язык"],
      ["ozbek-tili",            "Узбекский язык"],
      ["ozbekiston-tarixi",   "История Узбекистана"],
      ["jahon-tarixi",        "Всемирная история"],
      ["geografiya",          "География"],
      ["biologiya",           "Биология"],
      ["fizika",              "Физика"],
      ["kimyo",               "Химия"],
      ["informatika",         "Информатика"],
      ["huquq",               "Основы государства и права"],
      ["jismoniy-tarbiya",    "Физическая культура"],
      ["tarbiya",             "Воспитание"],
      ["chqbt",             "Начальная допризывная подготовка"],
    ],
  },
  11: {
    uz: [
      ["ona-tili",            "Ona tili"],
      ["adabiyot",            "Adabiyot"],
      ["algebra",             "Algebra"],
      ["geometriya",          "Geometriya"],
      ["ingliz-tili",         "Ingliz tili"],
      ["rus-tili",            "Rus tili"],
      ["ozbekiston-tarixi",   "O'zbekiston tarixi"],
      ["jahon-tarixi",        "Jahon tarixi"],
      ["chqbt",              "CHQBT"],
      ["biologiya",           "Biologiya"],
      ["fizika",              "Fizika"],
      ["kimyo",               "Kimyo"],
      ["informatika",         "Informatika"],
      ["astronomiya",         "Astronomiya"],
      ["huquq",               "Davlat va huquq asoslari"],
      ["jismoniy-tarbiya",    "Jismoniy tarbiya"],
      ["tarbiya",             "Tarbiya"],
      ["tadbirkorlik asoslari",      "Tadbirkorlik asoslari"],
    ],
    ru: [
      ["ona-tili",            "Русский язык"],
      ["adabiyot",            "Литература"],
      ["algebra",             "Алгебра"],
      ["geometriya",          "Геометрия"],
      ["ingliz-tili",         "Английский язык"],
      ["ozbek-tili",            "Узбекский язык"],
      ["ozbekiston-tarixi",   "История Узбекистана"],
      ["jahon-tarixi",        "Всемирная история"],
      ["chqbt",             "Начальная допризывная подготовка"],
      ["biologiya",           "Биология"],
      ["fizika",              "Физика"],
      ["kimyo",               "Химия"],
      ["informatika",         "Информатика"],
      ["astronomiya",         "Астрономия"],
      ["huquq",               "Основы государства и права"],
      ["jismoniy-tarbiya",    "Физическая культура"],
      ["tarbiya",             "Воспитание"],
      ["tadbirkorlik asoslari",        "Основы предпринимательства"],
    ],
  },
};
