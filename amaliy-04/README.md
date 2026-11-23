# 4-amaliy ish — Semestr loyihasini JavaScript bilan jonlantirish

**Talaba:** Qo'ziboyev Suxrob Alisher o'g'li  
**Guruh:** 941-24  
**Loyiha mavzusi:** «Dasturlash Atamalari Lug'ati» (2-amaliy ish davomi)

## Qo'shilgan imkoniyatlar

- **A qism (Ma'lumotlar va statistika):** `js/data.js` faylida 12 ta dasturlash atamasi/o'quv moduli obyekti (`id`, `nomi`, `kategoriya`, `narx`, `mavjud`, `rasm`, `teglar`, `daraja`, `izoh`). Katalog sahifasida jami elementlar soni, o'rtacha narx va eng qimmat modul statistikasi avtomatik hisoblanadi.
- **B qism (DOM, qidiruv, filtr, saralash):** `katalog.html` dagi barcha kartalar `document.createElement` va `textContent` orqali yaratiladi (XSS himoyasi). Nom bo'yicha real vaqtda qidiruv (`input`), kategoriya filtri (`select`), narx va alifbo bo'yicha saralash birgalikda ishlaydi. Natija topilmasa «Hech narsa topilmadi» xabari chiqadi.
- **C qism (Interaktiv UI komponentlar):**
  - **Modal oyna:** «Batafsil» tugmasi bosilganda ochiladi; `×` tugmasi, fon ustiga bosish va `Escape` tugmasi bilan yopiladi.
  - **Event delegation:** Karta tugmalari uchun bitta tinglovchi `#katalog-konteyner` ga qo'yilgan (`e.target.closest()`).
  - **Forma tekshiruvi (`aloqa.html`):** `e.preventDefault()`, maydon ostida xato xabarlari (bo'sh maydon, email formati, `+998XXXXXXXXX` telefon shabloni, matn uzunligi) va muvaffaqiyatli yuborilganda formani tozalash.
  - **Qo'shimcha komponentlar:** Tungi rejim (`localStorage`), «Sevimlilar» tizimi va hisoblagichi (`localStorage`), mobil hamburger menyu.

## Ishlatilgan massiv metodlari

| Metod | Fayl | Funksiya va vazifasi |
| :--- | :--- | :--- |
| `map()` | `js/katalog.js` | `kategoriyaFiltriniToldir()` — kategoriyalar ro'yxatini ajratish; `katalogChiqar()` — har bir `teg` uchun `<span>` elementlarini yaratish |
| `filter()` | `js/katalog.js`, `js/ui.js` | `katalogniYangila()` — qidiruv, kategoriya va sevimlilar bo'yicha birgalikda filtrlash; `sevimliniAlmashtir()` — sevimlilardan o'chirish |
| `reduce()` | `js/katalog.js` | `statistikaChiqar()` — jami narxlar yig'indisini (o'rtacha narx uchun) va eng yuqori narxni hisoblash |
| `sort()` | `js/katalog.js` | `katalogniYangila()` — `[...natija]` nusxasini narx o'sishi/kamayishi va alifbo tartibida saralash |
| `find()` | `js/katalog.js`, `js/ui.js` | `statistikaChiqar()` — eng qimmat modulni topish; `modalOch()` — `id` bo'yicha tanlangan modul ma'lumotlarini olish |

## Ishga tushirish

`index.html` yoki `katalog.html` faylini brauzerda oching (konsolda F12 → Console xatosiz ishlaydi).
