window.onload = function () {
  let ageOverlay = document.querySelector(".age-overlay");
  let ageModal = document.querySelector(".age-modal");
  let ageBtnYes = document.querySelector(".age-btn-yes");
  let ageBtnNo = document.querySelector(".age-btn-no");
  const showAgeModal = function () {
    ageOverlay.style.display = "flex";
  };
  const hideAgeModal = function () {
    ageOverlay.style.display = "none";
  };
  const confirmAge = function () {
    sessionStorage.setItem("ageConfirmed", true);
    hideAgeModal();
  };
  const denyAge = function () {
    window.location.href = "https://www.google.com/?hl=ru";
  };
  setTimeout(showAgeModal, 500);
  ageBtnYes.addEventListener("click", confirmAge);
  ageBtnNo.addEventListener("click", denyAge);

  if (sessionStorage.getItem("ageConfirmed") === "true") {
    hideAgeModal();
  }
};

const slides = document.querySelectorAll(".slide");
let current = 0;

function changeSlide() {
  slides[current].classList.remove("active");
  current = (current + 1) % slides.length;
  slides[current].classList.add("active");
}

setInterval(changeSlide, 5000);

let hasScrolled = false;
const row = document.getElementById("target-row");

const markScrolled = () => {
  hasScrolled = true;
  window.removeEventListener("scroll", markScrolled);
};
window.addEventListener("scroll", markScrolled, { passive: true });

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && hasScrolled) {
        row.classList.add("in-view");
        io.unobserve(row);
      }
    });
  },
  {
    threshold: 0.2,
    root: null,
    rootMargin: "0px 0px -10% 0px",
  }
);

io.observe(row);

function openModal(id) {
  document.getElementById("modal-" + id).style.display = "flex";
}

function closeModal(id) {
  document.getElementById("modal-" + id).style.display = "none";
}

window.onclick = function (event) {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
};

const hoverArea = document.getElementById("hover-area");
const skills = hoverArea.querySelectorAll(".skill");
let animated = false;

function animateBars() {
  if (animated) return;
  animated = true;

  skills.forEach((skill, i) => {
    const target = Number(skill.dataset.percent) || 0;
    const fill = skill.querySelector(".bar-fill");
    const txt = skill.querySelector(".percent");

    setTimeout(() => {
      requestAnimationFrame(() => {
        fill.style.opacity = "1";
        void fill.offsetWidth;
        fill.style.width = target + "%";
      });

      const duration = 1800;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const val = Math.round(target * p);
        txt.textContent = val + "%";
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }, i * 250);
  });
}

hoverArea.addEventListener("mouseenter", animateBars);
