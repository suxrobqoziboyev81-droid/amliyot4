// js/katalog.js — Katalog kartalarini DOM orqali yaratish, statistika, qidiruv, filtr va saralash

// Narxni "350 000 so'm" ko'rinishida formatlash yordamchi funksiyasi
function narxFormatla(summa) {
  return Math.round(summa).toLocaleString("uz-UZ").replace(/,/g, " ") + " so'm";
}

// A4. Statistika blokini reduce va find metodlari bilan hisoblash
function statistikaChiqar(royxat) {
  const jamiEl = document.getElementById("stat-jami");
  const ortachaEl = document.getElementById("stat-ortacha");
  const engQimmatEl = document.getElementById("stat-qimmat");

  if (!jamiEl || !ortachaEl || !engQimmatEl || royxat.length === 0) {
    return;
  }

  // reduce() — umumiy narxlar yig'indisini hisoblash
  const jamiNarx = royxat.reduce((yigindi, modul) => yigindi + modul.narx, 0);
  const ortachaNarx = jamiNarx / royxat.length;

  // reduce() — eng yuqori narxni topish
  const maksimalNarx = royxat.reduce(
    (engKatta, modul) => (modul.narx > engKatta ? modul.narx : engKatta),
    royxat[0].narx
  );

  // find() — eng qimmat element obyektini topish
  const engQimmatModul = royxat.find((modul) => modul.narx === maksimalNarx);

  jamiEl.textContent = royxat.length + " ta modul";
  ortachaEl.textContent = narxFormatla(ortachaNarx);
  engQimmatEl.textContent = engQimmatModul
    ? engQimmatModul.nomi + " (" + narxFormatla(engQimmatModul.narx) + ")"
    : "—";
}

// map() — kategoriyalar ro'yxatini massivdan ajratib select ga to'ldirish
function kategoriyaFiltriniToldir(royxat) {
  const kategoriyaSelect = document.getElementById("kategoriya-filtr");
  if (!kategoriyaSelect) {
    return;
  }

  // map() orqali barcha kategoriyalarni olamiz va takrorsiz ro'yxat tuzamiz
  const barchaKategoriyalar = royxat.map((modul) => modul.kategoriya);
  const noyobKategoriyalar = barchaKategoriyalar.filter(
    (kat, indeks) => barchaKategoriyalar.indexOf(kat) === indeks
  );

  noyobKategoriyalar.forEach((kat) => {
    const option = document.createElement("option");
    option.value = kat;
    option.textContent = kategoriyaNomlari[kat] || kat;
    kategoriyaSelect.append(option);
  });
}

// B1 & B6. Kartalarni createElement va textContent orqali yaratish (innerHTML ishlatilmaydi)
function katalogChiqar(royxat) {
  const konteyner = document.getElementById("katalog-konteyner");
  const natijaSoni = document.getElementById("natija-soni");
  if (!konteyner) {
    return;
  }

  // Konteynerni xavfsiz tozalash
  konteyner.replaceChildren();

  if (natijaSoni) {
    natijaSoni.textContent = "Ko'rsatilmoqda: " + royxat.length + " ta element";
  }

  // B5. Natija bo'lmasa xabar chiqarish
  if (royxat.length === 0) {
    const boshXabar = document.createElement("p");
    boshXabar.className = "bosh-natija";
    boshXabar.textContent = "Hech narsa topilmadi";
    konteyner.append(boshXabar);
    return;
  }

  const sevimlilar = typeof sevimlilarniOl === "function" ? sevimlilarniOl() : [];

  royxat.forEach((modul) => {
    const karta = document.createElement("article");
    karta.className = "karta katalog-karta";
    karta.dataset.id = modul.id;

    // Holat belgisi (position: absolute)
    const belgi = document.createElement("span");
    belgi.className = modul.mavjud ? "karta-belgi yashil" : "karta-belgi";
    belgi.textContent = modul.mavjud ? "Mavjud" : "Tez kunda";

    // Rasm
    const rasm = document.createElement("img");
    rasm.className = "karta-rasm";
    rasm.src = modul.rasm;
    rasm.alt = modul.nomi + " sxemasi";
    rasm.loading = "lazy";

    // Kategoriya va daraja
    const meta = document.createElement("p");
    meta.className = "karta-meta";
    meta.textContent = (kategoriyaNomlari[modul.kategoriya] || modul.kategoriya) + " · " + modul.daraja;

    // Sarlavha
    const sarlavha = document.createElement("h3");
    sarlavha.textContent = modul.nomi;

    // Qisqa tavsif
    const tavsif = document.createElement("p");
    tavsif.className = "karta-tavsif";
    tavsif.textContent = modul.izoh;

    // Teglar ro'yxati (map() bilan DOM elementlar yaratish)
    const teglarQuti = document.createElement("div");
    teglarQuti.className = "teglar-quti";
    const tegElementlari = modul.teglar.map((teg) => {
      const span = document.createElement("span");
      span.className = "teg-badge";
      span.textContent = "#" + teg;
      return span;
    });
    teglarQuti.append(...tegElementlari);

    // Narx
    const narx = document.createElement("p");
    narx.className = "karta-narx";
    narx.textContent = narxFormatla(modul.narx);

    // Tugmalar qatori (Event delegation uchun data-id ishlatiladi)
    const tugmalar = document.createElement("div");
    tugmalar.className = "karta-tugmalar";

    const batafsilBtn = document.createElement("button");
    batafsilBtn.type = "button";
    batafsilBtn.className = "tugma-asosiy batafsil-tugma";
    batafsilBtn.dataset.id = modul.id;
    batafsilBtn.textContent = "Batafsil";

    const sevimliBtn = document.createElement("button");
    sevimliBtn.type = "button";
    const sevimlimi = sevimlilar.includes(modul.id);
    sevimliBtn.className = sevimlimi ? "tugma-sevimli faol sevimli-tugma" : "tugma-sevimli sevimli-tugma";
    sevimliBtn.dataset.id = modul.id;
    sevimliBtn.textContent = sevimlimi ? "★ Sevimlida" : "☆ Sevimli";

    tugmalar.append(batafsilBtn, sevimliBtn);
    karta.append(belgi, rasm, meta, sarlavha, tavsif, teglarQuti, narx, tugmalar);
    konteyner.append(karta);
  });
}

// B2, B3, B4, B5. Qidiruv, kategoriya filtri va saralashni birgalikda ishlatish
function katalogniYangila() {
  const qidiruvInput = document.getElementById("qidiruv-input");
  const kategoriyaSelect = document.getElementById("kategoriya-filtr");
  const saralashSelect = document.getElementById("saralash-tanlov");
  const faqatSevimliCheckbox = document.getElementById("faqat-sevimli");

  const qidiruvMatni = qidiruvInput ? qidiruvInput.value.trim().toLowerCase() : "";
  const tanlanganKategoriya = kategoriyaSelect ? kategoriyaSelect.value : "barchasi";
  const saralashUsuli = saralashSelect ? saralashSelect.value : "standart";
  const faqatSevimli = faqatSevimliCheckbox ? faqatSevimliCheckbox.checked : false;
  const sevimlilar = typeof sevimlilarniOl === "function" ? sevimlilarniOl() : [];

  // filter() — qidiruv, kategoriya va sevimlilar shartlarini birgalikda qo'llash
  let natija = atamalarKatalogi.filter((modul) => {
    const nomMos = modul.nomi.toLowerCase().includes(qidiruvMatni);
    const katMos = tanlanganKategoriya === "barchasi" || modul.kategoriya === tanlanganKategoriya;
    const sevimliMos = !faqatSevimli || sevimlilar.includes(modul.id);
    return nomMos && katMos && sevimliMos;
  });

  // sort() — asl massivni o'zgartirmaslik uchun nusxa ([...natija]) ustida saralash
  natija = [...natija];
  if (saralashUsuli === "narx-osish") {
    natija.sort((a, b) => a.narx - b.narx);
  } else if (saralashUsuli === "narx-kamayish") {
    natija.sort((a, b) => b.narx - a.narx);
  } else if (saralashUsuli === "nom-alifbo") {
    natija.sort((a, b) => a.nomi.localeCompare(b.nomi, "uz"));
  }

  katalogChiqar(natija);
}

// Katalog sahifasini ishga tushirish
document.addEventListener("DOMContentLoaded", () => {
  if (typeof atamalarKatalogi === "undefined") {
    return;
  }

  const katalogKonteyner = document.getElementById("katalog-konteyner");
  if (!katalogKonteyner) {
    return;
  }

  statistikaChiqar(atamalarKatalogi);
  kategoriyaFiltriniToldir(atamalarKatalogi);
  katalogniYangila();

  const qidiruvInput = document.getElementById("qidiruv-input");
  const kategoriyaSelect = document.getElementById("kategoriya-filtr");
  const saralashSelect = document.getElementById("saralash-tanlov");
  const faqatSevimliCheckbox = document.getElementById("faqat-sevimli");
  const tozalashBtn = document.getElementById("filtr-tozalash");

  if (qidiruvInput) {
    qidiruvInput.addEventListener("input", katalogniYangila);
  }
  if (kategoriyaSelect) {
    kategoriyaSelect.addEventListener("change", katalogniYangila);
  }
  if (saralashSelect) {
    saralashSelect.addEventListener("change", katalogniYangila);
  }
  if (faqatSevimliCheckbox) {
    faqatSevimliCheckbox.addEventListener("change", katalogniYangila);
  }
  if (tozalashBtn) {
    tozalashBtn.addEventListener("click", () => {
      if (qidiruvInput) qidiruvInput.value = "";
      if (kategoriyaSelect) kategoriyaSelect.value = "barchasi";
      if (saralashSelect) saralashSelect.value = "standart";
      if (faqatSevimliCheckbox) faqatSevimliCheckbox.checked = false;
      katalogniYangila();
    });
  }
});
