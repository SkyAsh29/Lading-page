// ============================================
// 1. Isi tahun di footer otomatis
// ============================================
document.getElementById("year").textContent = new Date().getFullYear();

// ============================================
// 2. Form booking -> kirim lewat WhatsApp
// GANTI nomor di bawah ke nomor kamu (format 62812..., tanpa + dan tanpa 0 di depan)
// ============================================
const WA_NUMBER = "6281234567890";

const form = document.getElementById("booking-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = form.elements["name"].value.trim();
  const date = form.elements["date"].value;
  const message = form.elements["message"].value.trim();

  let text = "Hi, I'm " + name + ".";
  if (date) text += " I'd like to book a session on " + date + ".";
  if (message) text += " " + message;

  const url = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text);
  window.open(url, "_blank");
});

// ============================================
// 3. Tombol Gallery -> tampilkan galeri lalu geser ke sana
// ============================================
const galleryBtn = document.getElementById("gallery-btn");
const gallerySection = document.getElementById("gallery");

galleryBtn.addEventListener("click", function (event) {
  event.preventDefault();
  gallerySection.hidden = false;
  gallerySection.scrollIntoView({ behavior: "smooth" });
});

// ============================================
// 4. Sembunyikan foto yang filenya belum diupload
// (jadi gak muncul ikon gambar rusak)
// ============================================
document.querySelectorAll(".gallery-grid img").forEach(function (img) {
  img.addEventListener("error", function () {
    img.style.display = "none";
  });
  if (img.complete && img.naturalWidth === 0 && img.getAttribute("loading") !== "lazy") {
    img.style.display = "none";
  }
});
