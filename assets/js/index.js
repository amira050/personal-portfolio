/////////////////// responsive navbar ///////////////////////
const header = document.getElementById("header");
const navLinks = document.querySelector(".nav-links");
const navAnchor = document.querySelectorAll("nav a");
const menuBtn = document.createElement("button");
menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
menuBtn.className = "lg:hidden text-slate-900 dark:text-white text-2xl";
document.querySelector("#header .container").appendChild(menuBtn);

menuBtn.addEventListener("click", function () {
  navLinks.classList.toggle("active");
});

navAnchor.forEach(function (e) {
  e.addEventListener("click", function () {
    navLinks.classList.remove("active");
  });
});

//////////////////// active links ////////////////////////
const sections = document.querySelectorAll("section");
function activeScroll() {
  sections.forEach((section) => {
    const top = window.scrollY;
    const offset = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");
    const currentLink = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (top >= offset && top < offset + height) {
      navAnchor.forEach((link) => link.classList.remove("active"));
      currentLink.classList.add("active");
    }
  });
}

/////////////////// Dark and Light theme //////////////
const body = document.documentElement; // select html tag
const themeToggle = document.getElementById("theme-toggle-button");
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
} else {
  body.classList.remove("dark");
}
themeToggle.addEventListener("click", function () {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

/////////////////// scroll to top ///////////////////////
const scrollToTop = document.getElementById("scroll-to-top");
window.addEventListener("scroll", function () {
  // active scrolle calling
  activeScroll();

  if (window.scrollY > 300) {
    scrollToTop.classList.remove("opacity-0");
    scrollToTop.classList.add("opacity-100");
  } else {
    scrollToTop.classList.remove("opacity-100");
    scrollToTop.classList.add("opacity-0");
  }
});
scrollToTop.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/////////////////// setting sidebar //////////////
const settingBtn = document.getElementById("settings-toggle");
const settingSide = document.getElementById("settings-sidebar");
const closeBtn = document.getElementById("close-settings");

settingBtn.addEventListener("click", function () {
  settingSide.classList.toggle("translate-x-full");
});
closeBtn.addEventListener("click", function () {
  settingSide.classList.add("translate-x-full");
});

//////////////// portfolio tabs //////////////////
const portfolioFilter = document.querySelectorAll(".portfolio-filter");
const portfolioItem = document.querySelectorAll(".portfolio-item");
portfolioFilter.forEach(function (button) {
  button.addEventListener("click", function () {
    portfolioFilter.forEach((btn) => {
      btn.classList.remove(
        "active",
        "bg-gradient-to-r",
        "from-primary",
        "to-secondary",
        "text-white",
        "hover:shadow-lg",
        "hover:shadow-primary/50"
      );
      btn.classList.add(
        "bg-white",
        "dark:bg-slate-800",
        "text-slate-600",
        "dark:text-slate-300",
        "hover:bg-slate-100",
        "dark:hover:bg-slate-700",
        "border",
        "border-slate-300",
        "dark:border-slate-700"
      );
    });
    button.classList.remove(
      "bg-white",
      "dark:bg-slate-800",
      "text-slate-600",
      "dark:text-slate-300",
      "hover:bg-slate-100",
      "dark:hover:bg-slate-700",
      "border",
      "border-slate-300",
      "dark:border-slate-700"
    );
    button.classList.add(
      "active",
      "bg-gradient-to-r",
      "from-primary",
      "to-secondary",
      "text-white",
      "hover:shadow-lg",
      "hover:shadow-primary/50"
    );
    const filter = button.getAttribute("data-filter");
    portfolioItem.forEach(function (item) {
      const category = item.getAttribute("data-category");
      if (filter === "all" || filter === category) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });
  });
});

///////////// color change /////////////////
const colors = [
  {
    name: "Purple",
    primary: "#6366f1",
    secondary: "#8b5cf6",
    accent: "#a855f7",
  },
  {
    name: "Pink",
    primary: "#ec4899",
    secondary: "#f97316",
    accent: "#fb923c",
  },
  {
    name: "Green",
    primary: "#10b981",
    secondary: "#059669",
    accent: "#34d399",
  },
  {
    name: "Blue",
    primary: "#3b82f6",
    secondary: "#06b6d4",
    accent: "#22d3ee",
  },
  {
    name: "Red",
    primary: "#ef4444",
    secondary: "#f43f5e",
    accent: "#fb7185",
  },
  {
    name: "Amber",
    primary: "#f59e0b",
    secondary: "#ea580c",
    accent: "#fbbf24",
  },
];

const themeColorsGrid = document.getElementById("theme-colors-grid");
const savedTheme = JSON.parse(localStorage.getItem("selectedTheme"));
if (savedTheme) {
  body.style.setProperty("--primary", savedTheme.primary);
  body.style.setProperty("--secondary", savedTheme.secondary);
  body.style.setProperty("--accent", savedTheme.accent);
}
colors.forEach(function (colorItem) {
  const btn = document.createElement("button");

  btn.className =
    "w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 border-slate-200 dark:border-slate-700 hover:border-primary shadow-sm ring-2 ring-primary ring-offset-2 ring-offset-white dark:ring-offset-slate-900";

  btn.style.background = `linear-gradient(135deg, ${colorItem.primary} , ${colorItem.secondary} )`;
  btn.addEventListener("click", function () {
    body.style.setProperty("--primary", colorItem.primary);
    body.style.setProperty("--secondary", colorItem.secondary);
    body.style.setProperty("--accent", colorItem.accent);
    console.log("done");
    localStorage.setItem("selectedTheme", JSON.stringify(colorItem));
  });
  themeColorsGrid.appendChild(btn);
});

///////////////// change font //////////////

const fontBtn = document.querySelectorAll("button[data-font]");
const savedFont = localStorage.getItem("selectedFont");

if (savedFont) {
  document.body.style.fontFamily = savedFont;
  fontBtn.forEach(function (e) {
    if (e.getAttribute("data-font") === savedFont) {
      e.classList.add(
        "active",
        "bg-slate-50",
        "dark:bg-slate-800",
        "border-primary"
      );
      e.classList.remove("border-slate-200", "dark:border-slate-700");
    }
  });
}

fontBtn.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const selectFont = btn.getAttribute("data-font");

    localStorage.setItem("selectedFont", selectFont);

    document.body.style.fontFamily = selectFont;
    fontBtn.forEach(function (e) {
      e.classList.remove(
        "active",
        "bg-slate-50",
        "dark:bg-slate-800",
        "border-primary"
      );
      e.classList.add("border-slate-200", "dark:border-slate-700");
    });
    btn.classList.add(
      "active",
      "bg-slate-50",
      "dark:bg-slate-800",
      "border-primary"
    );
    btn.classList.remove("border-slate-200", "dark:border-slate-700");
  });
});

////////// default font and color///////
const resetSettingsBtn = document.getElementById("reset-settings");

function defaultTheme() {
  body.style.fontFamily = "'Tajawal', sans-serif";
  body.style.setProperty("--primary", colors[0].primary);
  body.style.setProperty("--secondary", colors[0].secondary);
  body.style.setProperty("--accent", colors[0].accent);
  localStorage.removeItem("selectedTheme");
  localStorage.removeItem("selectedFont");
}
defaultTheme();
resetSettingsBtn.addEventListener("click", defaultTheme);

//////////////// carousel /////////////////
const testimonialsCarousel = document.getElementById("testimonials-carousel");
const nextBtn = document.getElementById("next-testimonial");
const prevBtn = document.getElementById("prev-testimonial");
const carouselIndicator = document.querySelectorAll(".carousel-indicator");
let currentIndex = 0;

nextBtn.addEventListener("click", () => {
  carouselStep(1);
});
prevBtn.addEventListener("click", () => {
  carouselStep(-1);
});

function carouselStep(step) {
  currentIndex += step;

  if (currentIndex < 0) currentIndex = 3;
  else if (currentIndex > 3) currentIndex = 0;

  testimonialsCarousel.style.transform =
    `translateX(${(100 / 3) * currentIndex}%)`;

  carouselIndicator.forEach(function(indicator) {
    indicator.classList.remove("active", "scale-125", "bg-accent");
    indicator.classList.add("bg-slate-400", "dark:bg-slate-600");
  });

  carouselIndicator[currentIndex].classList.add(
    "active",
    "scale-125",
    "bg-accent"
  );
  carouselIndicator[currentIndex].classList.remove(
    "bg-slate-400",
    "dark:bg-slate-600"
  );
}