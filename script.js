/* =========================================================
   CUSTOM DARK CURSOR
========================================================= */

const cursorRing =
    document.querySelector(".cursor-ring");

const cursorDot =
    document.querySelector(".cursor-dot");


let mouseX = 0;
let mouseY = 0;

let ringX = 0;
let ringY = 0;



/* Follow mouse */

document.addEventListener(
    "mousemove",

    (event) => {

        mouseX =
            event.clientX;

        mouseY =
            event.clientY;


        cursorDot.style.left =
            `${mouseX}px`;

        cursorDot.style.top =
            `${mouseY}px`;

    }
);



/* Smooth ring */

function animateCursor() {

    ringX +=
        (mouseX - ringX) * 0.17;

    ringY +=
        (mouseY - ringY) * 0.17;


    cursorRing.style.left =
        `${ringX}px`;

    cursorRing.style.top =
        `${ringY}px`;


    requestAnimationFrame(
        animateCursor
    );

}


animateCursor();



/* =========================================================
   CURSOR HOVER SIZE
========================================================= */

document
    .querySelectorAll(
        ".interactive"
    )
    .forEach(
        (element) => {

            element.addEventListener(
                "mouseenter",

                () => {

                    cursorRing
                        .classList
                        .add(
                            "cursor-hover"
                        );

                }
            );


            element.addEventListener(
                "mouseleave",

                () => {

                    cursorRing
                        .classList
                        .remove(
                            "cursor-hover"
                        );

                }
            );

        }
    );



/* =========================================================
   AUTOMATIC WHITE CURSOR ON DARK SECTIONS
========================================================= */

document.addEventListener(
    "mousemove",

    (event) => {

        const target =
            document.elementFromPoint(
                event.clientX,
                event.clientY
            );


        if (!target) {

            return;

        }


        const darkZone =
            target.closest(
                ".dark-cursor-zone"
            );


        if (darkZone) {

            cursorRing
                .classList
                .add(
                    "cursor-light"
                );


            cursorDot
                .classList
                .add(
                    "cursor-light"
                );

        }

        else {

            cursorRing
                .classList
                .remove(
                    "cursor-light"
                );


            cursorDot
                .classList
                .remove(
                    "cursor-light"
                );

        }

    }
);



/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal-scroll"
    );


const revealObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add(
                                "visible"
                            );


                        revealObserver
                            .unobserve(
                                entry.target
                            );

                    }

                }
            );

        },

        {

            threshold: 0.12,

            rootMargin:
                "0px 0px -40px 0px"

        }

    );


revealElements.forEach(
    (element) => {

        revealObserver.observe(
            element
        );

    }
);



/* =========================================================
   HERO ART PARALLAX
========================================================= */

const heroArt =
    document.getElementById(
        "heroArt"
    );


if (heroArt) {

    heroArt.addEventListener(
        "mousemove",

        (event) => {

            const rect =
                heroArt
                    .getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateY =
                (
                    (x - centerX)
                    /
                    centerX
                )
                * 4;


            const rotateX =
                (
                    (centerY - y)
                    /
                    centerY
                )
                * 4;


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
    document.getElementById(
        "mobileMenu"
    );


const mobileNavigation =
    document.getElementById(
        "mobileNavigation"
    );


if (
    mobileMenu &&
    mobileNavigation
) {

    mobileMenu.addEventListener(
        "click",

        () => {

            const isOpen =
                mobileNavigation
                    .classList
                    .toggle(
                        "open"
                    );


            mobileMenu
                .classList
                .toggle(
                    "active"
                );


            mobileMenu
                .setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

        }
    );



    document
        .querySelectorAll(
            ".mobile-navigation a"
        )
        .forEach(
            (link) => {

                link.addEventListener(
                    "click",

                    () => {

                        mobileNavigation
                            .classList
                            .remove(
                                "open"
                            );


                        mobileMenu
                            .classList
                            .remove(
                                "active"
                            );


                        mobileMenu
                            .setAttribute(
                                "aria-expanded",
                                "false"
                            );

                    }
                );

            }
        );

}



/* =========================================================
   HEADER SHADOW ON SCROLL
========================================================= */

const header =
    document.querySelector(
        ".header"
    );


function updateHeader() {

    if (
        window.scrollY > 30
    ) {

        header.style.boxShadow =

            `
            0 12px 35px
            rgba(0, 0, 0, 0.045)
            `;

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
   SMOOTH STAGGERED EXPERTISE REVEAL
========================================================= */

const expertiseItems =
    document.querySelectorAll(
        ".expertise-item"
    );


expertiseItems.forEach(
    (item, index) => {

        item.style.transitionDelay =
            `${index * 60}ms`;

    }
);



/* =========================================================
   CERTIFICATION MOUSE TILT
========================================================= */

const certCard =
    document.querySelector(
        ".cert-card"
    );


if (certCard) {

    certCard.addEventListener(
        "mousemove",

        (event) => {

            const rect =
                certCard
                    .getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateX =
                (
                    (centerY - y)
                    /
                    centerY
                )
                * 2;


            const rotateY =
                (
                    (x - centerX)
                    /
                    centerX
                )
                * 2;


            certCard.style.transform =

                `
                perspective(900px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-7px)
                `;

        }
    );


    certCard.addEventListener(
        "mouseleave",

        () => {

            certCard.style.transform =
                "";

        }
    );

}
