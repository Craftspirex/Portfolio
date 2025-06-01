// Initialize AOS
AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true,
  mirror: false,
});

// Scroll Progress Bar
const scrollProgress = document.querySelector(".scroll-progress-bar");
window.addEventListener("scroll", () => {
  const windowHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (window.scrollY / windowHeight) * 100;
  scrollProgress.style.width = `${scrolled}%`;
});

// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const themeIcon = themeToggle.querySelector("i");

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  body.classList.add(savedTheme);
  updateThemeIcon(savedTheme === "dark-mode");
}

themeToggle.addEventListener("click", () => {
  const isDark = body.classList.toggle("dark-mode");
  localStorage.setItem("theme", isDark ? "dark-mode" : "light-mode");
  updateThemeIcon(isDark);
});

function updateThemeIcon(isDark) {
  themeIcon.className = isDark ? "fas fa-sun" : "fas fa-moon";
}

// Mobile Menu Toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  navToggle.classList.toggle("active");
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove("active");
    navToggle.classList.remove("active");
  }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu after clicking a link
      navLinks.classList.remove("active");
      navToggle.classList.remove("active");
    }
  });
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById("scrollTop");
let lastScrollTop = 0;

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Show/hide scroll to top button
  if (scrollTop > 300) {
    scrollTopBtn.style.display = "flex";
    setTimeout(() => {
      scrollTopBtn.classList.add("visible");
    }, 100);
  } else {
    scrollTopBtn.classList.remove("visible");
    setTimeout(() => {
      scrollTopBtn.style.display = "none";
    }, 300);
  }

  // Hide/show navbar on scroll
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    document.querySelector(".navbar").classList.add("hide");
  } else {
    document.querySelector(".navbar").classList.remove("hide");
  }

  lastScrollTop = scrollTop;
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-link");

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id");
      navItems.forEach((item) => {
        item.classList.remove("active");
        if (item.getAttribute("href") === `#${id}`) {
          item.classList.add("active");
        }
      });
    }
  });
}, observerOptions);

sections.forEach((section) => observer.observe(section));

// Form Validation
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Basic validation
  if (name === "") {
    showError("name", "Please enter your name");
    return;
  }

  if (email === "") {
    showError("email", "Please enter your email");
    return;
  }

  if (!isValidEmail(email)) {
    showError("email", "Please enter a valid email address");
    return;
  }

  if (message === "") {
    showError("message", "Please enter your message");
    return;
  }

  // If validation passes, you can submit the form
  // For now, we'll just show a success message
  showSuccess("Thank you for your message! I will get back to you soon.");
  contactForm.reset();
});

function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorDiv =
    field.parentElement.querySelector(".error-message") ||
    document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = message;

  if (!field.parentElement.querySelector(".error-message")) {
    field.parentElement.appendChild(errorDiv);
  }

  field.classList.add("error");
  field.focus();
}

function showSuccess(message) {
  const successDiv = document.createElement("div");
  successDiv.className = "success-message";
  successDiv.textContent = message;

  contactForm.insertBefore(successDiv, contactForm.firstChild);

  setTimeout(() => {
    successDiv.remove();
  }, 5000);
}

// Email validation helper function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Animate skill bars on scroll
const skillBars = document.querySelectorAll(".progress");

const animateSkillBars = () => {
  skillBars.forEach((bar) => {
    const barTop = bar.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (barTop < windowHeight - 100) {
      const progress = bar.parentElement.getAttribute("data-progress");
      bar.style.width = `${progress}%`;
    }
  });
};

// Initial check for skill bars
animateSkillBars();

// Animate skill bars on scroll
window.addEventListener("scroll", animateSkillBars);

// Add animation to project cards
const projectCards = document.querySelectorAll(".project-card");

const animateProjectCards = () => {
  projectCards.forEach((card) => {
    const cardTop = card.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (cardTop < windowHeight - 100) {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }
  });
};

// Set initial state for project cards
projectCards.forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
});

// Initial check for project cards
animateProjectCards();

// Animate project cards on scroll
window.addEventListener("scroll", animateProjectCards);
