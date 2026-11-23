// js/ui.js — Interaktiv UI komponentlar: Modal, Event delegation, Forma tekshiruvi,
// Tungi rejim (localStorage), Sevimlilar hisoblagichi (localStorage) va Mobil menyu.

const SEVIMLILAR_KALITI = "sevimli_atamalar";
const MAVZU_KALITI = "loyiha_mavzu";

// --- 1. SEVIMLILAR (localStorage bilan ishlash) ---
function sevimlilarniOl() {
  try {
    const saqlangan = localStorage.getItem(SEVIMLILAR_KALITI);
    return saqlangan ? JSON.parse(saqlangan) : [];
  } catch (xato) {
    return [];
  }
}

function sevimlilarniSaqla(royxat) {
  try {
    localStorage.setItem(SEVIMLILAR_KALITI, JSON.stringify(royxat));
  } catch (xato) {
    // localStorage bloklangan holatda xato chiqarmaslik
  }
}

function sevimliHisoblagichniYangila() {
  const hisoblagich = document.getElementById("sevimli-soni");
  if (hisoblagich) {
    hisoblagich.textContent = sevimlilarniOl().length;
  }
}

function sevimliniAlmashtir(id) {
  let sevimlilar = sevimlilarniOl();
  if (sevimlilar.includes(id)) {
    sevimlilar = sevimlilar.filter((itemId) => itemId !== id);
  } else {
    sevimlilar.push(id);
  }
  sevimlilarniSaqla(sevimlilar);
  sevimliHisoblagichniYangila();
  if (typeof katalogniYangila === "function") {
    katalogniYangila();
  }
}

// --- 2. TUNGI REJIM (Dark Mode + localStorage) ---
function tungiRejimniBoshla() {
  const tugma = document.getElementById("mavzu-tugma");
  let saqlanganMavzu = "yorug";
  try {
    saqlanganMavzu = localStorage.getItem(MAVZU_KALITI) || "yorug";
  } catch (xato) {
    saqlanganMavzu = "yorug";
  }

  if (saqlanganMavzu === "tungi") {
    document.body.classList.add("tungi-rejim");
    if (tugma) tugma.textContent = "☀ Yorug' rejim";
  }

  if (tugma) {
    tugma.addEventListener("click", () => {
      const tungiYoqildi = document.body.classList.toggle("tungi-rejim");
      tugma.textContent = tungiYoqildi ? "☀ Yorug' rejim" : "☾ Tungi rejim";
      try {
        localStorage.setItem(MAVZU_KALITI, tungiYoqildi ? "tungi" : "yorug");
      } catch (xato) {
        // Xatoni e'tiborsiz qoldirish
      }
    });
  }
}

// --- 3. MOBIL MENYU (Hamburger tugma) ---
function mobilMenyuniBoshla() {
  const hamburger = document.getElementById("mobil-menyu-tugma");
  const menyuRoyxati = document.getElementById("nav-royxat");

  if (!hamburger || !menyuRoyxati) {
    return;
  }

  hamburger.addEventListener("click", () => {
    const ochildi = menyuRoyxati.classList.toggle("ochiq");
    hamburger.setAttribute("aria-expanded", String(ochildi));
    hamburger.textContent = ochildi ? "✕" : "☰";
  });
}

// --- 4. MODAL OYNA VA EVENT DELEGATION ---
function modalniBoshla() {
  const konteyner = document.getElementById("katalog-konteyner");
  const modal = document.getElementById("batafsil-modal");
  const yopishTugma = document.getElementById("modal-yopish");

  if (!konteyner || !modal) {
    return;
  }

  const modalRasm = document.getElementById("modal-rasm");
  const modalSarlavha = document.getElementById("modal-sarlavha");
  const modalKategoriya = document.getElementById("modal-kategoriya");
  const modalNarx = document.getElementById("modal-narx");
  const modalHolat = document.getElementById("modal-holat");
  const modalIzoh = document.getElementById("modal-izoh");
  const modalTeglar = document.getElementById("modal-teglar");

  function modalOch(modulId) {
    if (typeof atamalarKatalogi === "undefined") return;
    // find() — tanlangan elementni id bo'yicha topish
    const modul = atamalarKatalogi.find((el) => el.id === modulId);
    if (!modul) return;

    modalRasm.src = modul.rasm;
    modalRasm.alt = modul.nomi + " rasmi";
    modalSarlavha.textContent = modul.nomi;
    modalKategoriya.textContent =
      (kategoriyaNomlari[modul.kategoriya] || modul.kategoriya) + " · " + modul.daraja;
    modalNarx.textContent = narxFormatla(modul.narx);
    modalHolat.textContent = modul.mavjud ? "Holati: Hozir mavjud" : "Holati: Tez kunda ochiladi";
    modalIzoh.textContent = modul.izoh;

    modalTeglar.replaceChildren();
    modul.teglar.forEach((teg) => {
      const span = document.createElement("span");
      span.className = "teg-badge";
      span.textContent = "#" + teg;
      modalTeglar.append(span);
    });

    modal.classList.add("ochiq");
    modal.setAttribute("aria-hidden", "false");
  }

  function modalYop() {
    modal.classList.remove("ochiq");
    modal.setAttribute("aria-hidden", "true");
  }

  // C2. Event delegation — tinglovchi har bir kartaga emas, bitta ota konteynerga qo'yiladi
  konteyner.addEventListener("click", (e) => {
    const batafsilBtn = e.target.closest(".batafsil-tugma");
    if (batafsilBtn) {
      const id = Number(batafsilBtn.dataset.id);
      modalOch(id);
      return;
    }

    const sevimliBtn = e.target.closest(".sevimli-tugma");
    if (sevimliBtn) {
      const id = Number(sevimliBtn.dataset.id);
      sevimliniAlmashtir(id);
    }
  });

  // Modalni yopish: × tugmasi, fon ustiga bosish va Escape tugmasi
  if (yopishTugma) {
    yopishTugma.addEventListener("click", modalYop);
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modalYop();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("ochiq")) {
      modalYop();
    }
  });
}

// --- 5. FORMA TEKSHIRUVI (aloqa.html) ---
function formaTekshiruviniBoshla() {
  const forma = document.getElementById("ariza-forma");
  if (!forma) {
    return;
  }

  const ismInput = document.getElementById("ism");
  const pochtaInput = document.getElementById("pochta");
  const telefonInput = document.getElementById("telefon");
  const bosqichInput = document.getElementById("bosqich");
  const sanaInput = document.getElementById("sana");
  const xabarInput = document.getElementById("xabar");
  const rozilikInput = document.getElementById("rozilik");
  const muvaffaqiyatQuti = document.getElementById("forma-muvaffaqiyat");

  function xatoKorsat(maydonId, matn) {
    const xatoEl = document.getElementById("xato-" + maydonId);
    const inputEl = document.getElementById(maydonId);
    if (xatoEl) {
      xatoEl.textContent = matn;
    }
    if (inputEl) {
      if (matn) {
        inputEl.classList.add("xato-maydon");
      } else {
        inputEl.classList.remove("xato-maydon");
      }
    }
  }

  function barchaXatolarniTozala() {
    ["ism", "pochta", "telefon", "bosqich", "sana", "xabar", "rozilik"].forEach((id) => {
      xatoKorsat(id, "");
    });
  }

  // Foydalanuvchi yozayotganda xato matnini olib tashlash
  forma.addEventListener("input", (e) => {
    if (e.target && e.target.id) {
      xatoKorsat(e.target.id, "");
    }
    if (muvaffaqiyatQuti) {
      muvaffaqiyatQuti.textContent = "";
      muvaffaqiyatQuti.classList.remove("korinadi");
    }
  });

  forma.addEventListener("submit", (e) => {
    e.preventDefault();
    barchaXatolarniTozala();

    let hammasiTogri = true;
    const emailAndoza = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefonAndoza = /^\+998[0-9]{9}$/;

    // 1. Ism tekshiruvi
    const ism = ismInput.value.trim();
    if (ism === "") {
      xatoKorsat("ism", "Ism-sharif maydoni bo'sh bo'lmasligi kerak.");
      hammasiTogri = false;
    } else if (ism.length < 3) {
      xatoKorsat("ism", "Ism-sharif kamida 3 ta belgidan iborat bo'lsin.");
      hammasiTogri = false;
    }

    // 2. Email tekshiruvi
    const pochta = pochtaInput.value.trim();
    if (pochta === "") {
      xatoKorsat("pochta", "Elektron pochta manzilini kiriting.");
      hammasiTogri = false;
    } else if (!emailAndoza.test(pochta)) {
      xatoKorsat("pochta", "Email formati noto'g'ri (masalan: talaba@urdu.uz).");
      hammasiTogri = false;
    }

    // 3. Telefon tekshiruvi (+998XXXXXXXXX)
    const telefon = telefonInput.value.trim();
    if (telefon === "") {
      xatoKorsat("telefon", "Telefon raqamini kiriting.");
      hammasiTogri = false;
    } else if (!telefonAndoza.test(telefon)) {
      xatoKorsat("telefon", "Telefon formati +998XXXXXXXXX ko'rinishida bo'lishi shart.");
      hammasiTogri = false;
    }

    // 4. Bosqich tekshiruvi
    const bosqich = Number(bosqichInput.value);
    if (!bosqichInput.value || bosqich < 1 || bosqich > 4) {
      xatoKorsat("bosqich", "Bosqich 1 dan 4 gacha bo'lgan son bo'lishi kerak.");
      hammasiTogri = false;
    }

    // 5. Sana tekshiruvi
    if (!sanaInput.value) {
      xatoKorsat("sana", "Mashg'ulotlarni boshlash sanasini tanlang.");
      hammasiTogri = false;
    }

    // 6. Xabar uzunligi tekshiruvi
    const xabar = xabarInput.value.trim();
    if (xabar === "") {
      xatoKorsat("xabar", "Atama izohi yoki savolingizni yozing.");
      hammasiTogri = false;
    } else if (xabar.length < 10) {
      xatoKorsat("xabar", "Matn kamida 10 ta belgidan iborat bo'lishi kerak (hozir: " + xabar.length + ").");
      hammasiTogri = false;
    }

    // 7. Rozilik tekshiruvi
    if (!rozilikInput.checked) {
      xatoKorsat("rozilik", "Davom etish uchun qoidalarga rozilik belgisini qo'ying.");
      hammasiTogri = false;
    }

    if (hammasiTogri) {
      if (muvaffaqiyatQuti) {
        muvaffaqiyatQuti.textContent =
          "Rahmat, " + ism + "! Arizangiz muvaffaqiyatli qabul qilindi.";
        muvaffaqiyatQuti.classList.add("korinadi");
      }
      forma.reset();
    }
  });
}

// Barcha UI komponentlarni ishga tushirish
document.addEventListener("DOMContentLoaded", () => {
  tungiRejimniBoshla();
  mobilMenyuniBoshla();
  sevimliHisoblagichniYangila();
  modalniBoshla();
  formaTekshiruviniBoshla();
});
