/* =====================================
   SCROLL REVEAL
===================================== */

const revealElements =
    document.querySelectorAll(".reveal-scroll");


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});



/* =====================================
   HERO ART PARALLAX
===================================== */

const heroArt =
    document.getElementById("heroArt");


if (heroArt) {

    heroArt.addEventListener(
        "mousemove",

        event => {

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
                ((x - centerX) / centerX) * 4;


            const rotateX =
                ((centerY - y) / centerY) * 4;


            heroArt.style.transform =
                `perspective(1200px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;

        }

    );


    heroArt.addEventListener(
        "mouseleave",

        () => {

            heroArt.style.transform =
                "perspective(1200px) rotateX(0deg) rotateY(0deg)";

        }

    );

}



/* =====================================
   MOBILE MENU
===================================== */

const mobileMenu =
    document.getElementById("mobileMenu");


const mobileNavigation =
    document.getElementById("mobileNavigation");


mobileMenu.addEventListener(
    "click",

    () => {

        mobileNavigation.classList.toggle("open");

    }

);


document
    .querySelectorAll(".mobile-navigation a")
    .forEach(link => {

        link.addEventListener(
            "click",

            () => {

                mobileNavigation.classList.remove("open");

            }

        );

    });



/* =====================================
   HEADER SHADOW ON SCROLL
===================================== */

const header =
    document.querySelector(".header");


window.addEventListener(
    "scroll",

    () => {

        if (window.scrollY > 30) {

            header.style.boxShadow =
                "0 10px 35px rgba(0,0,0,.035)";

        }

        else {

            header.style.boxShadow =
                "none";

        }

    }

);
