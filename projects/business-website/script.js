const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const contactForm = document.querySelector("#contactForm");
const formMessage = document.querySelector("#formMessage");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formMessage.textContent = "Mesazhi u dergua me sukses.";
    contactForm.reset();
  });
}
