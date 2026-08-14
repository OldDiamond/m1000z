const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
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
        rootMargin: "0px 0px -35px 0px"
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});


const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.toggle("open");

        menuToggle.classList.toggle("active", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}
