/* =========================================================
   Mercyline Moriasi — Portfolio
   ========================================================= */

/* ---------------------------------------------------------
   1) GALLERY DATA — edit this list to add / remove designs.
   Images live flat inside: images/ (matches your current folder)

   NOTE: two design concepts from the original plan have no
   matching file yet — an ice-cream flavour promo and a burger
   sale/price promo. They're left out for now rather than
   pointing at a broken image. Add files for them later and
   drop a new entry into this array using the same pattern.
--------------------------------------------------------- */
const GALLERY = [
  { src: "images/shoes.png",                    alt: "Social media promotional graphic for a sneaker retail brand",      title: "New-arrivals promo",          sub: "Sneaker retail brand",     tag: "Retail" },
  { src: "images/sneakers-mockup.png",          alt: "Sneaker product mockup presentation for a retail brand",           title: "Product mockup presentation", sub: "Sneaker retail brand",     tag: "Retail" },
  { src: "images/sneakers.png",                 alt: "Seasonal sneaker drop promotional graphic design",                 title: "Seasonal sneaker drop",       sub: "Sneaker retail brand",     tag: "Retail" },
  { src: "images/perfume.png",                  alt: "Luxury perfume launch social media graphic design",                title: "Fragrance launch graphic",    sub: "Beauty & fragrance brand", tag: "Beauty" },
  { src: "images/moriacy-car-dealership.png",   alt: "Car dealership showroom promotional graphic design",               title: "Showroom announcement",       sub: "Auto dealership",          tag: "Automotive" },
  { src: "images/spicy-shawarma.png",           alt: "Shawarma restaurant menu highlight promotional graphic",           title: "Menu highlight design",       sub: "Fast-food restaurant",     tag: "Food & Drink" },
  { src: "images/shawarma-mockup.png",          alt: "Shawarma promotional flyer mockup presented to client",            title: "Client-ready mockup",         sub: "Fast-food restaurant",     tag: "Food & Drink" },
  { src: "images/plainum-kitchen.jpg",          alt: "Catering and kitchen service promotional graphic design",          title: "Service promo graphic",       sub: "Plainum Kitchen catering", tag: "Catering" },
  { src: "images/special-valentine-sale.png",   alt: "Valentine's Day sportswear sale promotional graphic design",       title: "Valentine's sale graphic",    sub: "Sportswear shop",          tag: "Retail" },
  { src: "images/club-flyer.png",               alt: "Nightclub event promotional flyer design",                        title: "Club night flyer",            sub: "Nightlife venue",          tag: "Events" },
  { src: "images/laundry-flyer.png",            alt: "Laundry and dry-cleaning service promotional flyer design",        title: "Laundry service flyer",       sub: "Laundry & dry-cleaning",   tag: "Services" },
  { src: "images/real-estate-flyer.jpg",        alt: "Real estate property listing flyer design",                        title: "Property listing flyer",      sub: "Real estate sale",         tag: "Real Estate" },
  { src: "images/qwetu-home-flyer.png",         alt: "Student housing property promotional flyer design",                title: "Student housing flyer",       sub: "Qwetu Home",               tag: "Real Estate" },
  { src: "images/spain.png",                    alt: "Travel agency holiday package promotional graphic design",         title: "Holiday package promo",       sub: "Travel agency",            tag: "Travel" }
];

/* Autoplay speed in milliseconds (set to 0 to turn autoplay off) */
const AUTOPLAY_MS = 5500;

/* Email before/after screenshots (case study 1) */
const EMAIL_IMAGES = {
  before: "images/before-email-clean-up (1).PNG",
  after:  "images/after-email-clean-up (2).PNG"
};

/* ---------------------------------------------------------
   2) FOOTER YEAR
--------------------------------------------------------- */
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------------------------------------------------------
   3) MOBILE NAV
--------------------------------------------------------- */
const menuBtn  = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});
navLinks.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  })
);

/* ---------------------------------------------------------
   4) REVEAL ON SCROLL
--------------------------------------------------------- */
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add("in"));
}

/* ---------------------------------------------------------
   5) EMAIL BEFORE / AFTER TOGGLE
--------------------------------------------------------- */
const emailShot  = document.getElementById("emailShot");
const toggleBtns = document.querySelectorAll(".toggle-btn");

toggleBtns.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const state = btn.dataset.state;
    emailShot.src = EMAIL_IMAGES[state];
    toggleBtns.forEach(b => b.classList.toggle("active", b === btn));
  });
});

/* ---------------------------------------------------------
   6) CASE STUDY TABS — one project visible at a time.
--------------------------------------------------------- */
const caseTabs   = document.querySelectorAll(".case-tab");
const casePanels = document.querySelectorAll(".case-panel");

caseTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.case;
    caseTabs.forEach(t => {
      const active = t === tab;
      t.classList.toggle("active", active);
      t.setAttribute("aria-selected", String(active));
    });
    casePanels.forEach(p => p.classList.toggle("active", p.dataset.case === target));

    // This tab has now been opened — stop its border glow for good.
    tab.classList.remove("unread");
  });
});

/* ---------------------------------------------------------
   7) GALLERY CAROUSEL
--------------------------------------------------------- */
const track    = document.getElementById("carouselTrack");
const thumbRow = document.getElementById("thumbRow");
const frame    = document.getElementById("carouselFrame");
const prevBtn  = document.querySelector(".carousel-nav.prev");
const nextBtn  = document.querySelector(".carousel-nav.next");

let idx = 0;
let autoplayTimer = null;
let galleryVisible = false;

/* Build slides + thumbnails from the GALLERY array */
GALLERY.forEach((item, i) => {
  const slide = document.createElement("div");
  slide.className = "slide";
  slide.innerHTML = `
    <div class="slide-bg" style="background-image:url('${item.src}')" aria-hidden="true"></div>
    <div class="slide-media">
      <img src="${item.src}" alt="${item.alt}" loading="${i === 0 ? "eager" : "lazy"}">
    </div>
    <div class="slide-caption">
      <div><h4>${item.title}</h4><p>${item.sub}</p></div>
      <span class="slide-tag">${item.tag}</span>
    </div>`;
  track.appendChild(slide);

  const thumb = document.createElement("button");
  thumb.type = "button";
  thumb.className = "thumb" + (i === 0 ? " active" : "");
  thumb.setAttribute("aria-label", `Show design ${i + 1}: ${item.title}`);
  thumb.innerHTML = `<img src="${item.src}" alt="">`;
  thumb.addEventListener("click", () => goTo(i));
  thumbRow.appendChild(thumb);
});

const thumbs = Array.from(thumbRow.children);

function render() {
  track.style.transform = `translateX(-${idx * 100}%)`;
  thumbs.forEach((t, i) => t.classList.toggle("active", i === idx));

  /* Move only the thumbnail strip sideways. Never scroll the page. */
  const active = thumbs[idx];
  if (active) {
    const left = active.offsetLeft - (thumbRow.clientWidth - active.offsetWidth) / 2;
    thumbRow.scrollTo({ left, behavior: "smooth" });
  }
}

function goTo(i) {
  idx = (i + GALLERY.length) % GALLERY.length;
  render();
  startAutoplay();
}

function startAutoplay() {
  clearInterval(autoplayTimer);
  if (!AUTOPLAY_MS || !galleryVisible) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  autoplayTimer = setInterval(() => goTo(idx + 1), AUTOPLAY_MS);
}
function stopAutoplay() { clearInterval(autoplayTimer); }

prevBtn.addEventListener("click", () => goTo(idx - 1));
nextBtn.addEventListener("click", () => goTo(idx + 1));

frame.addEventListener("mouseenter", stopAutoplay);
frame.addEventListener("mouseleave", startAutoplay);

/* Autoplay only while the gallery is actually on screen */
if ("IntersectionObserver" in window) {
  new IntersectionObserver(entries => {
    galleryVisible = entries[0].isIntersecting;
    galleryVisible ? startAutoplay() : stopAutoplay();
  }, { threshold: 0.4 }).observe(document.getElementById("gallery"));
}

/* Keyboard arrows (only while the gallery is on screen) */
document.addEventListener("keydown", e => {
  if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
  const r = document.getElementById("gallery").getBoundingClientRect();
  if (r.top < window.innerHeight && r.bottom > 0) {
    goTo(idx + (e.key === "ArrowRight" ? 1 : -1));
  }
});

/* Touch swipe */
let touchStartX = null;
frame.addEventListener("touchstart", e => { touchStartX = e.touches[0].clientX; }, { passive: true });
frame.addEventListener("touchend", e => {
  if (touchStartX === null) return;
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 40) goTo(idx + (dx < 0 ? 1 : -1));
  touchStartX = null;
});

render();

/* ---------------------------------------------------------
   8) NAV HEIGHT TRACKING
   Sections used to be forced into exactly one screen height, which
   needed a bigger fitting system to avoid clipping or squeezed content.
   That's gone now — the page just flows and scrolls normally, like a
   standard website. The one thing still worth measuring is the nav
   bar's real height, since the hero's top padding and the smooth-scroll
   offset (scroll-padding-top, in the CSS) both line up against it.
--------------------------------------------------------- */
function setNavHeightVar() {
  const nav = document.querySelector(".site-nav");
  if (nav) document.documentElement.style.setProperty("--nav-h", nav.offsetHeight + "px");
}

window.addEventListener("load", setNavHeightVar);
window.addEventListener("resize", setNavHeightVar);
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(setNavHeightVar);
}
setNavHeightVar();

/* ---------------------------------------------------------
   9) CONTACT FORM -> opens the visitor's email app
--------------------------------------------------------- */
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const name  = document.getElementById("cf-name").value.trim();
  const email = document.getElementById("cf-email").value.trim();
  const msg   = document.getElementById("cf-msg").value.trim();

  const subject = encodeURIComponent(`New project inquiry from ${name}`);
  const body    = encodeURIComponent(`${msg}\n\n— ${name} (${email})`);
  window.location.href = `mailto:mercymoriasi14@gmail.com?subject=${subject}&body=${body}`;
});