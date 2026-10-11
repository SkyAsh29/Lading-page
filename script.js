// ============================================
// 1. Isi tahun di footer otomatis
// ============================================
document.getElementById("year").textContent = new Date().getFullYear();

// ============================================
// 2. Form booking -> kirim lewat WhatsApp
// Ganti nomor di bawah (format internasional, tanpa + dan spasi)
// Contoh Indonesia: 62812xxxxxxx (bukan 0812...)
// ============================================
const WA_NUMBER = "6281234567890";

const form = document.getElementById("booking-form");

form.addEventListener("submit", function (event) {
  // Cegah halaman reload bawaan form
  event.preventDefault();

  // Ambil isi form
  const name = form.elements["name"].value.trim();
  const date = form.elements["date"].value;
  const message = form.elements["message"].value.trim();

  // Susun pesan
  let text = "Hi, I'm " + name + ".";
  if (date) text += " I'd like to visit on " + date + ".";
  if (message) text += " " + message;

  // Buka WhatsApp dengan pesan yang sudah terisi
  const url = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text);
  window.open(url, "_blank");
});

const track = document.getElementById("gallery-track");
const dotsBox = document.getElementById("gallery-dots");

track.querySelectorAll("img").forEach(function (_, i) {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.setAttribute("aria-label", "Photo " + (i + 1));
  dot.addEventListener("click", function () {
    track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" });
  });
  dotsBox.appendChild(dot);
});

function updateDots() {
  const index = Math.round(track.scrollLeft / track.clientWidth);
  dotsBox.querySelectorAll("button").forEach(function (b, k) {
    b.classList.toggle("active", k === index);
  });
}
track.addEventListener("scroll", updateDots);
updateDots();
