const menuBtn = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

function closeMenu(){
  navLinks?.classList.remove("open");
  menuBtn?.setAttribute("aria-expanded", "false");
}

function toggleMenu(){
  const isOpen = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
}

if(menuBtn && navLinks){
  menuBtn.addEventListener("click", toggleMenu);
  navLinks.addEventListener("click", (e) => {
    if(e.target.tagName === "A") closeMenu();
  });
  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape") closeMenu();
  });
  document.addEventListener("click", (e) => {
    const inside = navLinks.contains(e.target) || menuBtn.contains(e.target);
    if(!inside) closeMenu();
  });
}
