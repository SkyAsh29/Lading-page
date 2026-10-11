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

// ============================================
// 5. Lightbox: klik foto -> tampil besar
// Tutup: tombol X, klik area gelap, atau tombol Esc
// Pindah foto: tombol panah, geser kiri-kanan, atau tombol keyboard
// ============================================
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lb-img");
const photos = Array.from(document.querySelectorAll(".gallery-grid img"));
let current = 0;

function visiblePhotos() {
  return photos.filter(function (p) { return p.style.display !== "none"; });
}

function showPhoto(index) {
  const list = visiblePhotos();
  if (list.length === 0) return;
  current = (index + list.length) % list.length;
  lbImg.src = list[current].src;
  lbImg.alt = list[current].alt;
}

function openLightbox(img) {
  showPhoto(visiblePhotos().indexOf(img));
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  document.getElementById("lb-close").focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  lbImg.removeAttribute("src");
  document.body.style.overflow = "";
}

photos.forEach(function (img) {
  img.addEventListener("click", function () { openLightbox(img); });
});

document.getElementById("lb-close").addEventListener("click", closeLightbox);
document.getElementById("lb-prev").addEventListener("click", function () { showPhoto(current - 1); });
document.getElementById("lb-next").addEventListener("click", function () { showPhoto(current + 1); });

// Klik area gelap (di luar foto dan tombol) untuk menutup
lightbox.addEventListener("click", function (event) {
  if (event.target === lightbox) closeLightbox();
});

// Keyboard (untuk PC)
document.addEventListener("keydown", function (event) {
  if (lightbox.hidden) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") showPhoto(current - 1);
  if (event.key === "ArrowRight") showPhoto(current + 1);
});

// Geser kiri-kanan (untuk HP)
let touchStartX = 0;
lightbox.addEventListener("touchstart", function (event) {
  touchStartX = event.changedTouches[0].clientX;
}, { passive: true });
lightbox.addEventListener("touchend", function (event) {
  const dx = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) showPhoto(dx < 0 ? current + 1 : current - 1);
}, { passive: true });
