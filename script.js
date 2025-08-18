// Background images cycle
const images = [
  "M6iNoAmBk2StPzvnDHyJS9.png",
  "RpHoz5ABQqAZ8mYEEa5pCo.png",
  "6b888481-ccc1-4125-97cd-bbcdf1f5523d.png"
];
let currentIndex = 0;
const hero = document.getElementById("hero");

function changeBackground() {
  hero.style.backgroundImage = `url(${images[currentIndex]})`;
  currentIndex = (currentIndex + 1) % images.length;
}
changeBackground();
setInterval(changeBackground, 5000);

// Typing effect for roles
const roles = ["QA Engineer", "Bug Hunter", "Tester"];
let roleIndex = 0;
let charIndex = 0;
const roleEl = document.getElementById("role");

function typeRole() {
  if (charIndex < roles[roleIndex].length) {
    roleEl.textContent += roles[roleIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeRole, 120);
  } else {
    setTimeout(() => {
      roleEl.textContent = "";
      charIndex = 0;
      roleIndex = (roleIndex + 1) % roles.length;
      typeRole();
    }, 1500);
  }
}
typeRole();

// Fade-in sections on scroll
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => observer.observe(section));
