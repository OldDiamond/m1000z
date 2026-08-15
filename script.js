const header = document.getElementById('siteHeader');
const progress = document.getElementById('pageProgress');
const menuButton = document.getElementById('menuButton');
const mobileMenu = document.getElementById('mobileMenu');

function updateScrollUI() {
  const y = window.scrollY;

  header.classList.toggle('scrolled', y > 24);

  const max =
    document.documentElement.scrollHeight -
    window.innerHeight;

  const pct =
    max > 0
      ? Math.min(100, (y / max) * 100)
      : 0;

  progress.style.width = `${pct}%`;
}

window.addEventListener(
  'scroll',
  updateScrollUI,
  { passive: true }
);

window.addEventListener(
  'resize',
  updateScrollUI
);

updateScrollUI();


/* =========================================
   SCROLL REVEAL
========================================= */

const revealObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add('visible');

          revealObserver.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -35px 0px'
    }
  );


document
  .querySelectorAll('.reveal')
  .forEach((el, i) => {

    el.style.transitionDelay =
      `${Math.min((i % 5) * 45, 180)}ms`;

    revealObserver.observe(el);

  });


/* =========================================
   MOBILE MENU
========================================= */

function setMenu(open) {

  mobileMenu.classList.toggle(
    'open',
    open
  );

  menuButton.classList.toggle(
    'open',
    open
  );

  menuButton.setAttribute(
    'aria-expanded',
    String(open)
  );

  document.body.style.overflow =
    open ? 'hidden' : '';

}


menuButton.addEventListener(
  'click',
  () =>
    setMenu(
      !mobileMenu.classList.contains('open')
    )
);


mobileMenu
  .querySelectorAll('a')
  .forEach((link) => {

    link.addEventListener(
      'click',
      () => setMenu(false)
    );

  });


window.addEventListener(
  'resize',
  () => {

    if (window.innerWidth > 980) {
      setMenu(false);
    }

  }
);


/* =========================================
   DESKTOP PROJECT TILT
========================================= */

const canTilt =
  window.matchMedia(
    '(hover:hover) and (pointer:fine)'
  ).matches &&
  !window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;


if (canTilt) {

  document
    .querySelectorAll('[data-tilt]')
    .forEach((card) => {

      card.addEventListener(
        'mousemove',
        (event) => {

          const rect =
            card.getBoundingClientRect();

          const x =
            (
              event.clientX -
              rect.left
            ) /
            rect.width -
            0.5;

          const y =
            (
              event.clientY -
              rect.top
            ) /
            rect.height -
            0.5;


          card.style.transform =
            `
            perspective(1500px)
            rotateX(${y * -1.4}deg)
            rotateY(${x * 1.4}deg)
            `;

        }
      );


      card.addEventListener(
        'mouseleave',
        () => {

          card.style.transform = '';

        }
      );

    });

}
