// Elite Professional JavaScript - Senior Engineer's Implementation

// Performance Monitoring
const perfMonitor = {
  start: performance.now(),
  log: (label) => {
    const time = (performance.now() - perfMonitor.start).toFixed(2);
    console.log(`✓ ${label}: ${time}ms`);
  },
};

// Theme Management with Smooth Transitionss
class ThemeManager {
  constructor() {
    this.html = document.documentElement;
    this.toggle = document.getElementById("themeToggle");
    this.currentTheme = localStorage.getItem("theme") || "light";
    this.init();
  }

  init() {
    this.html.setAttribute("data-theme", this.currentTheme);
    this.toggle?.addEventListener("click", () => this.switch());
    perfMonitor.log("Theme initialized");
  }

  switch() {
    const newTheme = this.currentTheme === "light" ? "dark" : "light";
    this.html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    this.currentTheme = newTheme;

    // Haptic feedback (if supported)
    if ("vibrate" in navigator) {
      navigator.vibrate(10);
    }
  }
}

// Mobile Menu with Smooth Animations
class MobileMenu {
  constructor() {
    this.toggle = document.getElementById("mobileMenuToggle");
    this.menu = document.getElementById("navMenu");
    this.links = document.querySelectorAll(".nav-link");
    this.isOpen = false;
    this.init();
  }

  init() {
    this.toggle?.addEventListener("click", () => this.toggleMenu());

    this.links.forEach((link) => {
      link.addEventListener("click", () => this.close());
    });

    // Close on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.close();
      }
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (
        this.isOpen &&
        !this.menu.contains(e.target) &&
        !this.toggle.contains(e.target)
      ) {
        this.close();
      }
    });

    perfMonitor.log("Mobile menu initialized");
  }

  toggleMenu() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.menu.classList.add("active");
    document.body.style.overflow = "hidden";
    this.isOpen = true;

    // Animate toggle button
    this.animateToggle(true);
  }

  close() {
    this.menu.classList.remove("active");
    document.body.style.overflow = "";
    this.isOpen = false;

    // Animate toggle button
    this.animateToggle(false);
  }

  animateToggle(isOpen) {
    const spans = this.toggle?.querySelectorAll("span");
    if (!spans) return;

    if (isOpen) {
      spans[0].style.transform = "rotate(45deg) translateY(8px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translateY(-8px)";
    } else {
      spans[0].style.transform = "";
      spans[1].style.opacity = "";
      spans[2].style.transform = "";
    }
  }
}

// Enhanced Smooth Scroll with Offset
class SmoothScroller {
  constructor() {
    this.links = document.querySelectorAll('a[href^="#"]');
    this.navbar = document.getElementById("navbar");
    this.init();
  }

  init() {
    this.links.forEach((anchor) => {
      anchor.addEventListener("click", (e) => this.handleClick(e));
    });
    perfMonitor.log("Smooth scroll initialized");
  }

  handleClick(e) {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    const target = document.querySelector(href);

    if (target) {
      const navHeight = this.navbar?.offsetHeight || 72;
      const targetPosition = target.offsetTop - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // Update URL without scrolling
      history.pushState(null, "", href);
    }
  }
}

// Hero Banner Parallax Effect
class ParallaxEffect {
  constructor() {
    this.heroBanner = document.querySelector(".hero-banner");
    this.init();
  }

  init() {
    if (!this.heroBanner) return;

    window.addEventListener("scroll", () => this.handleScroll(), {
      passive: true,
    });
    perfMonitor.log("Parallax effect initialized");
  }

  handleScroll() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.3;
    this.heroBanner.style.transform = `translateY(${rate}px) scale(1.1)`;
  }
}

// Navbar Scroll Effects - Professional Polish
class NavbarController {
  constructor() {
    this.navbar = document.getElementById("navbar");
    this.lastScroll = 0;
    this.threshold = 50;
    this.init();
  }

  init() {
    window.addEventListener("scroll", () => this.handleScroll(), {
      passive: true,
    });
    perfMonitor.log("Navbar controller initialized");
  }

  handleScroll() {
    const currentScroll = window.pageYOffset;

    // Add/remove scrolled class
    if (currentScroll > this.threshold) {
      this.navbar?.classList.add("scrolled");
    } else {
      this.navbar?.classList.remove("scrolled");
    }

    this.lastScroll = currentScroll;
  }
}

// Intersection Observer for Fade-in Animations
class AnimationController {
  constructor() {
    this.elements = document.querySelectorAll(
      "section, .stat-card, .service-card, .value-card, .why-card, .mv-card, .about-image-wrapper",
    );
    this.init();
  }

  init() {
    const options = {
      root: null,
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    }, options);

    this.elements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition =
        "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
      observer.observe(el);
    });

    perfMonitor.log("Animation controller initialized");
  }
}

// Performance: Lazy Load Images (if any are added later)
class LazyLoader {
  constructor() {
    this.images = document.querySelectorAll("img[data-src]");
    this.init();
  }

  init() {
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
            observer.unobserve(img);
          }
        });
      });

      this.images.forEach((img) => observer.observe(img));
      perfMonitor.log("Lazy loader initialized");
    }
  }
}

// Form Validation (if contact form is added)
class FormValidator {
  constructor(formId) {
    this.form = document.getElementById(formId);
    if (this.form) this.init();
  }

  init() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
    perfMonitor.log("Form validator initialized");
  }

  handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);

    // Basic validation
    if (this.validate(data)) {
      console.log("Form submitted:", data);
      this.showSuccess();
    } else {
      this.showError();
    }
  }

  validate(data) {
    // Add validation logic
    return Object.values(data).every((val) => val.trim() !== "");
  }

  showSuccess() {
    console.log("✓ Form submitted successfully");
  }

  showError() {
    console.log("✗ Form validation failed");
  }
}

// Analytics Helper (Google Analytics, Plausible, etc.)
class Analytics {
  constructor() {
    this.init();
  }

  init() {
    // Track page view
    this.trackPageView();

    // Track CTA clicks
    document.querySelectorAll(".btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const label = e.target.textContent.trim();
        this.trackEvent("CTA Click", label);
      });
    });

    perfMonitor.log("Analytics initialized");
  }

  trackPageView() {
    // Implement your analytics platform
    console.log("📊 Page view tracked");
  }

  trackEvent(action, label) {
    // Implement your analytics platform
    console.log(`📊 Event tracked: ${action} - ${label}`);
  }
}

// Performance Observer (Web Vitals)
class PerformanceMonitor {
  constructor() {
    this.init();
  }

  init() {
    if ("PerformanceObserver" in window) {
      try {
        // Largest Contentful Paint
        const lcp = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log("🎨 LCP:", lastEntry.renderTime || lastEntry.loadTime);
        });
        lcp.observe({ entryTypes: ["largest-contentful-paint"] });

        // First Input Delay
        const fid = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            console.log("⚡ FID:", entry.processingStart - entry.startTime);
          });
        });
        fid.observe({ entryTypes: ["first-input"] });

        perfMonitor.log("Performance monitor initialized");
      } catch (e) {
        console.warn("Performance monitoring not supported");
      }
    }
  }
}

// Initialize All Systems
document.addEventListener("DOMContentLoaded", () => {
  // Core functionality
  new ThemeManager();
  new MobileMenu();
  new SmoothScroller();
  new ParallaxEffect();
  new NavbarController();
  new AnimationController();
  new LazyLoader();
  new Analytics();
  new PerformanceMonitor();

  // Log completion
  perfMonitor.log("All systems operational");
  console.log(
    "%c✨ Chechi Limited",
    "font-size: 24px; font-weight: bold; color: #10b981;",
  );
  console.log(
    "%cEnterprise technology for Africa's sustainable future",
    "font-size: 14px; color: #64748b;",
  );
});

// Service Worker Registration (for PWA capabilities)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Uncomment when service worker is ready
    // navigator.serviceWorker.register('/sw.js')
    //   .then(reg => console.log('✓ Service Worker registered'))
    //   .catch(err => console.log('✗ Service Worker registration failed'));
  });
}

// Export for testing (if needed)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    ThemeManager,
    MobileMenu,
    SmoothScroller,
    NavbarController,
  };
}
