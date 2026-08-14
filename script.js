/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal-scroll");


const revealObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }

    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================================
   HERO ART PARALLAX
========================================================= */

const heroArt =
    document.getElementById("heroArt");


if (heroArt) {

    heroArt.addEventListener(
        "mousemove",

        (event) => {

            const rect =
                heroArt.getBoundingClientRect();


            const x =
                event.clientX - rect.left;


            const y =
                event.clientY - rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateY =
                ((x - centerX) / centerX) * 3;


            const rotateX =
                ((centerY - y) / centerY) * 3;


            heroArt.style.transform =

                `
                perspective(1200px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                `;

        }
    );


    heroArt.addEventListener(
        "mouseleave",

        () => {

            heroArt.style.transform =

                `
                perspective(1200px)
                rotateX(0deg)
                rotateY(0deg)
                `;

        }
    );

}


/* =========================================================
   MOBILE MENU
========================================================= */

const mobileMenu =
    document.getElementById("mobileMenu");


const mobileNavigation =
    document.getElementById("mobileNavigation");


if (mobileMenu && mobileNavigation) {

    mobileMenu.addEventListener(
        "click",

        () => {

            const open =
                mobileNavigation.classList.toggle("open");


            mobileMenu.classList.toggle("active");


            mobileMenu.setAttribute(
                "aria-expanded",
                String(open)
            );

        }
    );


    document
        .querySelectorAll(".mobile-navigation a")
        .forEach((link) => {

            link.addEventListener(
                "click",

                () => {

                    mobileNavigation
                        .classList
                        .remove("open");


                    mobileMenu
                        .classList
                        .remove("active");


                    mobileMenu.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });

}


/* =========================================================
   HEADER EFFECT
========================================================= */

const header =
    document.querySelector(".header");


function updateHeader() {

    if (window.scrollY > 30) {

        header.style.boxShadow =
            "0 12px 35px rgba(0,0,0,0.045)";

    }

    else {

        header.style.boxShadow =
            "none";

    }

}


window.addEventListener(
    "scroll",
    updateHeader,
    {
        passive: true
    }
);


updateHeader();


/* =========================================================
   EXPERTISE STAGGER
========================================================= */

const expertiseItems =
    document.querySelectorAll(".expertise-item");


expertiseItems.forEach(
    (item, index) => {

        item.style.transitionDelay =
            `${index * 55}ms`;

    }
);
