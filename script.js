/* =========================================================
   HEADER + SCROLL PROGRESS
========================================================= */

const header = document.getElementById("siteHeader");
const progress = document.getElementById("pageProgress");

function updateScrollUI() {
  const scrollY = window.scrollY;
  const maxScroll =
    document.documentElement.scrollHeight -
    window.innerHeight;

  header.classList.toggle(
    "scrolled",
    scrollY > 25
  );

  const value =
    maxScroll > 0
      ? (scrollY / maxScroll) * 100
      : 0;

  progress.style.width =
    `${Math.min(value, 100)}%`;
}

window.addEventListener(
  "scroll",
  updateScrollUI,
  { passive: true }
);

window.addEventListener(
  "resize",
  updateScrollUI
);

updateScrollUI();


/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton =
  document.getElementById("menuButton");

const mobileMenu =
  document.getElementById("mobileMenu");

function setMenu(open) {
  mobileMenu.classList.toggle(
    "open",
    open
  );

  menuButton.classList.toggle(
    "open",
    open
  );

  menuButton.setAttribute(
    "aria-expanded",
    String(open)
  );

  document.body.style.overflow =
    open ? "hidden" : "";
}

menuButton.addEventListener(
  "click",
  () => {
    setMenu(
      !mobileMenu.classList.contains("open")
    );
  }
);

mobileMenu
  .querySelectorAll("a")
  .forEach((link) => {
    link.addEventListener(
      "click",
      () => setMenu(false)
    );
  });

window.addEventListener(
  "resize",
  () => {
    if (window.innerWidth > 1050) {
      setMenu(false);
    }
  }
);


/* =========================================================
   SCROLL REVEALS
========================================================= */

const revealElements =
  document.querySelectorAll(".reveal");

const revealObserver =
  new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "visible"
          );

          revealObserver.unobserve(
            entry.target
          );
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

revealElements.forEach(
  (element) => {
    revealObserver.observe(element);
  }
);


/* =========================================================
   PARTICLE BACKGROUND
   Canvas-based interactive particle field.
========================================================= */

const canvas =
  document.getElementById("particleCanvas");

const ctx =
  canvas.getContext("2d");

const reducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

const finePointer =
  window.matchMedia(
    "(hover:hover) and (pointer:fine)"
  ).matches;

let width = 0;
let height = 0;
let dpr = 1;

let particles = [];

const pointer = {
  x: -9999,
  y: -9999,
  active: false
};


function resizeCanvas() {
  const rect =
    canvas.parentElement
      .getBoundingClientRect();

  width = rect.width;
  height = rect.height;

  dpr =
    Math.min(
      window.devicePixelRatio || 1,
      2
    );

  canvas.width =
    Math.round(width * dpr);

  canvas.height =
    Math.round(height * dpr);

  canvas.style.width =
    `${width}px`;

  canvas.style.height =
    `${height}px`;

  ctx.setTransform(
    dpr,
    0,
    0,
    dpr,
    0,
    0
  );

  buildParticles();
}


function buildParticles() {

  const isMobile =
    width < 700;

  const count =
    isMobile
      ? 70
      : Math.min(
          190,
          Math.floor(
            (width * height) /
            7000
          )
        );

  particles =
    Array.from(
      { length: count },
      () => ({
        x:
          Math.random() * width,

        y:
          Math.random() * height,

        baseX:
          Math.random() * width,

        baseY:
          Math.random() * height,

        vx:
          (Math.random() - .5) * .08,

        vy:
          (Math.random() - .5) * .08,

        r:
          Math.random() * 1.25 + .25,

        alpha:
          Math.random() * .5 + .08,

        warm:
          Math.random() > .82
      })
    );
}


function drawParticles() {

  ctx.clearRect(
    0,
    0,
    width,
    height
  );

  particles.forEach(
    (particle) => {

      if (
        finePointer &&
        pointer.active
      ) {

        const dx =
          particle.x - pointer.x;

        const dy =
          particle.y - pointer.y;

        const dist =
          Math.sqrt(
            dx * dx + dy * dy
          );

        const radius = 130;

        if (
          dist < radius &&
          dist > 0
        ) {

          const force =
            (radius - dist) /
            radius;

          particle.x +=
            (dx / dist) *
            force *
            2.6;

          particle.y +=
            (dy / dist) *
            force *
            2.6;
        }
      }

      particle.x +=
        particle.vx;

      particle.y +=
        particle.vy;


      if (
        particle.x < 0 ||
        particle.x > width
      ) {
        particle.vx *= -1;
      }


      if (
        particle.y < 0 ||
        particle.y > height
      ) {
        particle.vy *= -1;
      }


      ctx.beginPath();

      ctx.arc(
        particle.x,
        particle.y,
        particle.r,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        particle.warm
          ? `rgba(255,104,61,${particle.alpha})`
          : `rgba(255,244,224,${particle.alpha})`;

      ctx.fill();
    }
  );

  if (!reducedMotion) {
    requestAnimationFrame(
      drawParticles
    );
  }
}


resizeCanvas();
drawParticles();

window.addEventListener(
  "resize",
  resizeCanvas
);

if (finePointer) {

  canvas.parentElement
    .addEventListener(
      "mousemove",
      (event) => {
        const rect =
          canvas.parentElement
            .getBoundingClientRect();

        pointer.x =
          event.clientX -
          rect.left;

        pointer.y =
          event.clientY -
          rect.top;

        pointer.active = true;
      }
    );

  canvas.parentElement
    .addEventListener(
      "mouseleave",
      () => {
        pointer.active = false;
      }
    );

}


/* =========================================================
   HERO ORANGE GLOW PARALLAX
========================================================= */

const hero =
  document.getElementById("home");

const heroGlow =
  document.getElementById("heroGlow");

if (
  finePointer &&
  !reducedMotion
) {

  hero.addEventListener(
    "mousemove",
    (event) => {

      const rect =
        hero.getBoundingClientRect();

      const x =
        (
          event.clientX -
          rect.left
        ) /
        rect.width -
        .5;

      const y =
        (
          event.clientY -
          rect.top
        ) /
        rect.height -
        .5;

      heroGlow.style.transform =
        `translate(
          ${x * 45}px,
          ${y * 35}px
        )`;
    }
  );

}


/* =========================================================
   DESKTOP PROJECT TILT
========================================================= */

if (
  finePointer &&
  !reducedMotion
) {

  document
    .querySelectorAll("[data-tilt]")
    .forEach((card) => {

      card.addEventListener(
        "mousemove",
        (event) => {

          const rect =
            card.getBoundingClientRect();

          const x =
            (
              event.clientX -
              rect.left
            ) /
            rect.width -
            .5;

          const y =
            (
              event.clientY -
              rect.top
            ) /
            rect.height -
            .5;

          card.style.transform =
            `
            perspective(1800px)
            rotateX(${y * -1.3}deg)
            rotateY(${x * 1.3}deg)
            `;
        }
      );

      card.addEventListener(
        "mouseleave",
        () => {
          card.style.transform = "";
        }
      );

    });

}
