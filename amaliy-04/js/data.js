// js/data.js — Dasturlash atamalari va o'quv modullari katalogi (12 ta obyekt)
// Har bir obyektda: id, nomi, kategoriya, narx (so'm), mavjud (boolean),
// rasm manzili, teglar (massiv), daraja va batafsil izoh mavjud.

const atamalarKatalogi = [
  {
    id: 1,
    nomi: "HTML5 Semantik Tuzilma",
    kategoriya: "frontend",
    narx: 220000,
    mavjud: true,
    rasm: "rasmlar/veb-arxitektura.png",
    teglar: ["html5", "semantika", "boshlangich"],
    daraja: "Boshlang'ich",
    izoh: "Veb-sahifani header, nav, main, section, article, aside va footer teglari yordamida to'g'ri tuzish hamda SEO va qulaylik qoidalari."
  },
  {
    id: 2,
    nomi: "CSS3 Blok Modeli va Flexbox",
    kategoriya: "frontend",
    narx: 280000,
    mavjud: true,
    rasm: "rasmlar/veb-arxitektura.png",
    teglar: ["css3", "flexbox", "maket"],
    daraja: "Boshlang'ich",
    izoh: "Content, padding, border, margin qatlamlari, box-sizing: border-box, pozitsiyalash (sticky, fixed, absolute) va moslashuvchan Flexbox maketlari."
  },
  {
    id: 3,
    nomi: "JavaScript DOM va Hodisalar",
    kategoriya: "frontend",
    narx: 360000,
    mavjud: true,
    rasm: "rasmlar/js-dom.png",
    teglar: ["javascript", "dom", "events", "yangi"],
    daraja: "O'rta",
    izoh: "document.createElement, textContent orqali XSS himoyasi, addEventListener, event delegation (closest) va interaktiv UI komponentlar yaratish."
  },
  {
    id: 4,
    nomi: "Massiv Metodlari (map, filter, reduce)",
    kategoriya: "frontend",
    narx: 310000,
    mavjud: true,
    rasm: "rasmlar/js-dom.png",
    teglar: ["javascript", "massiv", "es6"],
    daraja: "O'rta",
    izoh: "JavaScript'da ma'lumotlar to'plamini o'zgartirish (map), saralash (sort), qidirish (find), filtrlash (filter) va umumlashtirish (reduce) usullari."
  },
  {
    id: 5,
    nomi: "Algoritm va Blok-sxemalar",
    kategoriya: "algoritm",
    narx: 190000,
    mavjud: true,
    rasm: "rasmlar/algoritm-sxemasi.png",
    teglar: ["algoritm", "mantiq", "asosiy"],
    daraja: "Boshlang'ich",
    izoh: "Muammoni aniq qadamlarga ajratish, kirish ma'lumotlarini qayta ishlash va samarali natija olish bo'yicha asosiy algoritmik fikrlash moduli."
  },
  {
    id: 6,
    nomi: "Ma'lumotlar Tuzilmasi va Massivlar",
    kategoriya: "algoritm",
    narx: 340000,
    mavjud: true,
    rasm: "rasmlar/algoritm-sxemasi.png",
    teglar: ["array", "stack", "queue"],
    daraja: "O'rta",
    izoh: "Massiv, stek, navbat, bog'langan ro'yxat va xesh-jadvallarning xotirada joylashishi hamda vaqt murakkabligi (Big O) tahlili."
  },
  {
    id: 7,
    nomi: "Rekursiya va Dinamik Dasturlash",
    kategoriya: "algoritm",
    narx: 420000,
    mavjud: false,
    rasm: "rasmlar/algoritm-sxemasi.png",
    teglar: ["rekursiya", "dp", "murakkab"],
    daraja: "Yuqori",
    izoh: "Funksiyaning o'zini o'zi chaqirish mexanizmi, tayanch holat (base case) va murakkab masalalarni kichik bo'laklarga ajratib yechish."
  },
  {
    id: 8,
    nomi: "Python va Django Freymvorki",
    kategoriya: "backend",
    narx: 520000,
    mavjud: true,
    rasm: "rasmlar/veb-arxitektura.png",
    teglar: ["python", "django", "backend", "yangi"],
    daraja: "O'rta",
    izoh: "Django MVT arxitekturasi, modellar (ORM), marshrutlash (URLs), shablonlar va xavfsiz veb-ilovalar ishlab chiqish qo'llanmasi."
  },
  {
    id: 9,
    nomi: "Java Core va OOP Tamoyillari",
    kategoriya: "backend",
    narx: 550000,
    mavjud: true,
    rasm: "rasmlar/veb-arxitektura.png",
    teglar: ["java", "oop", "spring"],
    daraja: "Yuqori",
    izoh: "Sinflar, obyektlar, inkapsulyatsiya, merosxo'rlik, polimorfizm va abstraksiya tamoyillarining Java tilidagi amaliy qo'llanilishi."
  },
  {
    id: 10,
    nomi: "REST API va HTTP Protokoli",
    kategoriya: "backend",
    narx: 390000,
    mavjud: true,
    rasm: "rasmlar/veb-arxitektura.png",
    teglar: ["http", "api", "json"],
    daraja: "O'rta",
    izoh: "GET, POST, PUT, DELETE so'rovlari, status kodlar (200, 404, 500), JSON formati va mijoz-server o'rtasida ma'lumot almashish standartlari."
  },
  {
    id: 11,
    nomi: "PostgreSQL va SQL So'rovlar",
    kategoriya: "baza",
    narx: 410000,
    mavjud: true,
    rasm: "rasmlar/baza-sxemasi.png",
    teglar: ["sql", "postgresql", "jadvallar"],
    daraja: "O'rta",
    izoh: "Relyatsion ma'lumotlar bazasini loyihalash, birlamchi va tashqi kalitlar, SELECT, JOIN, GROUP BY va indekslash texnikalari."
  },
  {
    id: 12,
    nomi: "localStorage va Brauzer Xotirasi",
    kategoriya: "baza",
    narx: 180000,
    mavjud: false,
    rasm: "rasmlar/baza-sxemasi.png",
    teglar: ["localstorage", "json", "frontend"],
    daraja: "Boshlang'ich",
    izoh: "Foydalanuvchi sozlamalari (tungi rejim, sevimlilar ro'yxati)ni brauzer xotirasida JSON.stringify va JSON.parse orqali saqlash."
  }
];

// Kategoriya nomlarini chiroyli o'zbekcha ko'rinishda chiqarish uchun lug'at
const kategoriyaNomlari = {
  frontend: "Frontend",
  backend: "Backend",
  algoritm: "Algoritmlar",
  baza: "Ma'lumotlar bazasi"
};
