// SCROLL REVEAL

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target
                        .classList
                        .add("visible");

                    revealObserver
                        .unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


// MOBILE MENU

const menuButton =
    document.getElementById("menuButton");


const mobileNav =
    document.getElementById("mobileNav");


menuButton.addEventListener(
    "click",

    () => {

        mobileNav
            .classList
            .toggle("open");

    }
);


document
    .querySelectorAll(".mobile-nav a")
    .forEach((link) => {

        link.addEventListener(
            "click",

            () => {

                mobileNav
                    .classList
                    .remove("open");

            }

        );

    });
