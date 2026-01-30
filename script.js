// Mobile Menü (Hamburger)
const menuBtn = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

function closeMenu() {
  navLinks?.classList.remove("open");
  menuBtn?.setAttribute("aria-expanded", "false");
}

function toggleMenu() {
  const isOpen = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
}

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", toggleMenu);

  // Wenn man einen Link klickt -> Menü zu
  navLinks.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "A") closeMenu();
  });

  // ESC schließt
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Klick außerhalb schließt (mobile)
  document.addEventListener("click", (e) => {
    const clickedInside =
      navLinks.contains(e.target) || menuBtn.contains(e.target);
    if (!clickedInside) closeMenu();
  });
}

// Optional: Active Link Highlight (nur auf index.html mit Sections)
const sectionIds = ["home", "about", "services", "contact"];
const linkMap = new Map();

sectionIds.forEach((id) => {
  const link = document.querySelector(`a[href="#${id}"]`);
  if (link) linkMap.set(id, link);
});

function setActive(id) {
  linkMap.forEach((link) => link.classList.remove("active"));
  const activeLink = linkMap.get(id);
  if (activeLink) activeLink.classList.add("active");
}

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setActive(visible.target.id);
  },
  { root: null, threshold: [0.25, 0.5, 0.75] }
);

sectionIds.forEach((id) => {
  const el = document.getElementById(id);
  if (el) observer.observe(el);
});
