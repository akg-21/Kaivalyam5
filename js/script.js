/*=========================================
  Dynamic Theme - Kaivalyam
  Main JavaScript
=========================================*/

document.addEventListener("DOMContentLoaded", function () {
  "use strict";
  emailjs.init("6LsM-tKXyyihTTf_m");

  document
    .getElementById("contact-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      const combinedMessage =
        `Email: ${email}\n` +
        `Phone: ${phone || "N/A"}\n` +
        `Subject: ${subject}\n\n` +
        `Message:\n${message}`;

      const templateParams = {
        from_name: name,
        message: combinedMessage,
        reply_to: email, // important for reply-to functionality
      };
      emailjs
        .sendForm("service_5c1zg3o", "template_t10lcil", templateParams)
        .then(
          function (response) {
            alert("Message sent successfully!");
          },
          function (error) {
            alert("Failed to send message. Try again!");
            console.log(error);
          }
        );
    });
  // Initialize all components and features
  // initCustomCursor();
  initScrollReveal();
  initParticles();
  initNavigation();
  initThemeToggle();
  initHeroWordAnimation();
  initScrollIndicator();
  initRippleEffect();
  initTabsSystem();
  initAccordion();
  initCounters();
  initTestimonialSlider();
  init3DCardEffect();
  initFormSubmission();
  initAlertSystem();
  initContactAnimation();
  initServicesInteraction();
  initMasonryLayout();
  initLightbox();
  initSmoothScroll();

  /**
   * Custom cursor implementation
   */
  function initCustomCursor() {
    // Check if we're on a touch device (we don't want custom cursor on mobile)
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const cursorDot = document.createElement("div");
    const cursorOutline = document.createElement("div");
    cursorDot.className = "cursor-dot";
    cursorOutline.className = "cursor-outline";
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);

    // Add active class to body to show our custom cursor
    document.body.classList.add("cursor-active");

    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;
    let outlineX = 0;
    let outlineY = 0;

    // Update cursor position with easing
    function updateCursor() {
      // Calc new position with easing
      dotX += (cursorX - dotX) * 0.2;
      dotY += (cursorY - dotY) * 0.2;
      outlineX += (cursorX - outlineX) * 0.1;
      outlineY += (cursorY - outlineY) * 0.1;

      // Apply position
      cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
      cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;

      // Continue animation loop
      requestAnimationFrame(updateCursor);
    }

    // Start the animation loop
    updateCursor();

    // Update cursor coordinates on mouse move
    document.addEventListener("mousemove", (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
    });

    // Add hover effect for clickable elements
    const clickables = document.querySelectorAll(
      'a, button, [role="button"], input[type="submit"], .card, .nav-link, .social-link'
    );
    clickables.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        document.body.classList.add("cursor-hover");
      });
      el.addEventListener("mouseleave", () => {
        document.body.classList.remove("cursor-hover");
      });
    });

    // Hide cursor when it leaves the window
    document.addEventListener("mouseout", (e) => {
      if (e.relatedTarget === null) {
        document.body.classList.add("cursor-hidden");
      }
    });

    document.addEventListener("mouseover", () => {
      document.body.classList.remove("cursor-hidden");
    });

    // Add "click" animation
    document.addEventListener("mousedown", () => {
      cursorDot.style.transform = "translate(-50%, -50%) scale(0.75)";
      cursorOutline.style.transform = "translate(-50%, -50%) scale(0.75)";
    });

    document.addEventListener("mouseup", () => {
      cursorDot.style.transform = "translate(-50%, -50%) scale(1)";
      cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";
    });
  }

  /**
   * Scroll Reveal Animation
   */
  function initScrollReveal() {
    const revealElements = document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate"
    );

    function checkReveal() {
      const windowHeight = window.innerHeight;

      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150; // Offset when element becomes visible

        if (elementTop < windowHeight - elementVisible) {
          element.classList.add("active");
        } else {
          element.classList.remove("active");
        }
      });
    }

    // Initial check
    checkReveal();

    // Check on scroll
    window.addEventListener("scroll", checkReveal);
  }

  /**
   * Floating particles animation
   */
  function initParticles() {
    const containers = document.querySelectorAll(".particles-container");

    if (containers.length === 0) return;

    containers.forEach((container) => {
      // Number of particles based on container size
      const containerWidth = container.offsetWidth;
      const numParticles = Math.min(Math.floor(containerWidth / 30), 30);

      for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";

        // Random size
        const size = Math.random() * 15 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;

        // Random animation duration
        const duration = Math.random() * 20 + 10;
        particle.style.animationDuration = `${duration}s`;

        // Random opacity
        const opacity = Math.random() * 0.3 + 0.1;
        particle.style.opacity = opacity;

        // Random delay
        const delay = Math.random() * 10;
        particle.style.animationDelay = `${delay}s`;

        container.appendChild(particle);
      }
    });
  }

  /**
   * Navigation functionality
   */
  function initNavigation() {
    const header = document.querySelector(".main-header");
    const navToggle = document.querySelector(".nav-toggle");
    const body = document.body;

    if (!header) return;

    // Toggle mobile menu
    if (navToggle) {
      navToggle.addEventListener("click", function () {
        body.classList.toggle("menu-open");
      });
    }

    // Set delay on mobile menu items
    const mobileNavItems = document.querySelectorAll(".mobile-nav-item");
    mobileNavItems.forEach((item, index) => {
      item.style.setProperty("--item-index", index);
    });

    // Add scrolled class to header when scrolling down
    let lastScrollTop = 0;

    function handleScroll() {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      // Add scrolled class when scrolled
      if (scrollTop > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }

      // Hide header when scrolling down, show when scrolling up
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.classList.add("hidden");
      } else {
        header.classList.remove("hidden");
      }

      lastScrollTop = scrollTop;
    }

    window.addEventListener("scroll", handleScroll);

    // Close mobile menu when clicking a link
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", function () {
        body.classList.remove("menu-open");
      });
    });
  }

  /**
   * Theme toggling functionality
   */
  function initThemeToggle() {
    const themeToggles = document.querySelectorAll(".theme-toggle");
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const storedTheme = localStorage.getItem("theme");

    // On page load, check for stored theme or system preference
    if (storedTheme === "dark" || (!storedTheme && prefersDarkScheme.matches)) {
      document.documentElement.classList.add("dark");
      updateThemeIcons(true);
    } else {
      document.documentElement.classList.remove("dark");
      updateThemeIcons(false);
    }

    // Function to update icons for all theme toggles
    function updateThemeIcons(isDark) {
      themeToggles.forEach((toggle) => {
        toggle.innerHTML = isDark
          ? '<i class="fas fa-sun"></i>'
          : '<i class="fas fa-moon"></i>';
      });
    }

    // Add click handler to all theme toggles
    themeToggles.forEach((toggle) => {
      toggle.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark");

        const isDark = document.documentElement.classList.contains("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        updateThemeIcons(isDark);
      });
    });
  }

  /**
   * Interactive word animation for hero title
   */
  function initHeroWordAnimation() {
    const heroTitles = document.querySelectorAll(".hero-title .animate-words");

    if (heroTitles.length === 0) return;

    heroTitles.forEach((titleEl) => {
      const words = titleEl.getAttribute("data-words").split(",");
      let currentIndex = 0;
      const initialWord = titleEl.textContent.trim();

      // If no initial word exists in the element, use the first word from data-words
      if (!initialWord && words.length > 0) {
        titleEl.textContent = words[0];
      }

      // Start the animation
      setInterval(() => {
        // Calculate next index
        currentIndex = (currentIndex + 1) % words.length;

        // Animate out current word
        titleEl.classList.add("word-out");

        setTimeout(() => {
          // Change the word
          titleEl.textContent = words[currentIndex];

          // Animate in new word
          titleEl.classList.remove("word-out");
          titleEl.classList.add("word-in");

          setTimeout(() => {
            titleEl.classList.remove("word-in");
          }, 500);
        }, 500);
      }, 3000);
    });
  }

  /**
   * Scroll indicator functionality
   */
  function initScrollIndicator() {
    const scrollIndicator = document.querySelector(".scroll-indicator");

    if (!scrollIndicator) return;

    scrollIndicator.addEventListener("click", () => {
      const heroSection = document.querySelector(".hero-section");
      const nextSection = heroSection.nextElementSibling;

      if (nextSection) {
        nextSection.scrollIntoView({
          behavior: "smooth",
        });
      }
    });

    // Hide scroll indicator when scrolled past hero
    window.addEventListener("scroll", () => {
      const heroSection = document.querySelector(".hero-section");

      if (!heroSection) return;

      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      const scrollPosition = window.scrollY + window.innerHeight;

      if (scrollPosition > heroBottom) {
        scrollIndicator.style.opacity = "0";
      } else {
        scrollIndicator.style.opacity = "1";
      }
    });
  }

  /**
   * Button ripple effect
   */
  function initRippleEffect() {
    const rippleButtons = document.querySelectorAll(".ripple");

    rippleButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement("span");
        ripple.className = "ripple-effect";
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        this.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  }

  /**
   * Tabs system
   */
  function initTabsSystem() {
    const tabsSystems = document.querySelectorAll(".tabs");

    if (tabsSystems.length === 0) return;

    tabsSystems.forEach((tabsSystem) => {
      const tabItems = tabsSystem.querySelectorAll(".tab-item");
      const tabContents = tabsSystem.querySelectorAll(".tab-content");

      tabItems.forEach((tab, index) => {
        tab.addEventListener("click", () => {
          // Remove active class from all tabs and contents
          tabItems.forEach((item) => item.classList.remove("active"));
          tabContents.forEach((content) => content.classList.remove("active"));

          // Add active class to current tab and content
          tab.classList.add("active");
          tabContents[index].classList.add("active");
        });
      });

      // Activate first tab by default
      if (tabItems.length > 0 && !tabItems[0].classList.contains("active")) {
        tabItems[0].click();
      }
    });
  }

  /**
   * Accordion functionality
   */
  function initAccordion() {
    const accordions = document.querySelectorAll(".accordion");

    if (accordions.length === 0) return;

    accordions.forEach((accordion) => {
      const accordionItems = accordion.querySelectorAll(".accordion-item");

      accordionItems.forEach((item) => {
        const header = item.querySelector(".accordion-header");

        header.addEventListener("click", () => {
          // Check if this item is already active
          const isActive = item.classList.contains("active");

          // Close all items
          accordionItems.forEach((otherItem) => {
            otherItem.classList.remove("active");
          });

          // If this item wasn't active, activate it
          if (!isActive) {
            item.classList.add("active");
          }
        });
      });
    });
  }

  /**
   * Number counter animation
   */
  function initCounters() {
    const counters = document.querySelectorAll(".counter-number");

    if (counters.length === 0) return;

    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target"), 10);
      const duration = parseInt(
        counter.getAttribute("data-duration") || "2000",
        10
      );
      const increment = target / (duration / 16); // 60fps

      let current = 0;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const updateCounter = () => {
                if (current < target) {
                  current += increment;
                  counter.textContent = Math.floor(current);
                  requestAnimationFrame(updateCounter);
                } else {
                  counter.textContent = target;
                }
              };

              updateCounter();
              observer.unobserve(counter);
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(counter);
    });
  }

  /**
   * Testimonial slider
   */
  function initTestimonialSlider() {
    const sliders = document.querySelectorAll(".testimonial-slider");

    if (sliders.length === 0) return;

    sliders.forEach((slider) => {
      const track = slider.querySelector(".testimonials-track");
      const items = slider.querySelectorAll(".testimonial-item");
      const controls = slider.parentElement.querySelectorAll(
        ".testimonial-control"
      );
      const indicators = slider.parentElement.querySelectorAll(
        ".testimonial-indicator"
      );

      if (items.length <= 1) return;

      let currentIndex = 0;

      // Function to go to a specific slide
      function goToSlide(index) {
        if (index < 0) {
          index = items.length - 1;
        } else if (index >= items.length) {
          index = 0;
        }

        currentIndex = index;
        const translateValue = -currentIndex * 100;
        track.style.transform = `translateX(${translateValue}%)`;

        // Update indicators
        indicators.forEach((indicator, i) => {
          indicator.classList.toggle("active", i === currentIndex);
        });
      }

      // Event listeners for controls
      if (controls.length >= 2) {
        controls[0].addEventListener("click", () =>
          goToSlide(currentIndex - 1)
        );
        controls[1].addEventListener("click", () =>
          goToSlide(currentIndex + 1)
        );
      }

      // Event listeners for indicators
      indicators.forEach((indicator, i) => {
        indicator.addEventListener("click", () => goToSlide(i));
      });

      // Initialize the first slide
      goToSlide(0);

      // Auto-advance slides every 5 seconds
      let autoplayTimer;

      function startAutoplay() {
        autoplayTimer = setInterval(() => {
          goToSlide(currentIndex + 1);
        }, 5000);
      }

      function stopAutoplay() {
        clearInterval(autoplayTimer);
      }

      // Start autoplay
      startAutoplay();

      // Pause autoplay on hover
      slider.addEventListener("mouseenter", stopAutoplay);
      slider.addEventListener("mouseleave", startAutoplay);

      // Swipe functionality for touch devices
      let startX, moveX;
      let isDragging = false;

      slider.addEventListener(
        "touchstart",
        (e) => {
          startX = e.touches[0].clientX;
          isDragging = true;
          stopAutoplay();
        },
        { passive: true }
      );

      slider.addEventListener(
        "touchmove",
        (e) => {
          if (!isDragging) return;
          moveX = e.touches[0].clientX;
          const diffX = moveX - startX;
          const translateValue =
            -currentIndex * 100 + (diffX / slider.offsetWidth) * 100;

          // Limit the drag to one slide in each direction
          if (
            translateValue > -currentIndex * 100 + 100 ||
            translateValue < -currentIndex * 100 - 100
          ) {
            return;
          }

          track.style.transform = `translateX(${translateValue}%)`;
        },
        { passive: true }
      );

      slider.addEventListener(
        "touchend",
        (e) => {
          if (!isDragging) return;
          isDragging = false;

          const diffX = moveX - startX;

          if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
              goToSlide(currentIndex - 1);
            } else {
              goToSlide(currentIndex + 1);
            }
          } else {
            goToSlide(currentIndex);
          }

          startAutoplay();
        },
        { passive: true }
      );
    });
  }

  /**
   * 3D card effect
   */
  function init3DCardEffect() {
    const cards = document.querySelectorAll(".card-3d");

    if (cards.length === 0) return;

    cards.forEach((card) => {
      const cardContent = card.querySelector(".card-3d-content");

      // Variables for tracking mouse position
      let mouseX, mouseY, centerX, centerY;

      // Get card dimensions and center point
      function updateCardDimensions() {
        const rect = card.getBoundingClientRect();
        centerX = rect.left + rect.width / 2;
        centerY = rect.top + rect.height / 2;
      }

      // Initial dimensions
      updateCardDimensions();

      // Update dimensions on window resize
      window.addEventListener("resize", updateCardDimensions);

      // Calculate rotation based on mouse position
      function calcRotation(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Recalculate card center if needed (e.g. after scrolling)
        updateCardDimensions();

        // Calculate rotation values
        const rotateY = (mouseX - centerX) / 10;
        const rotateX = (centerY - mouseY) / 10;

        // Apply rotation
        cardContent.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(30px)`;
      }

      // Reset rotation
      function resetRotation() {
        cardContent.style.transform = "";
      }

      // Add event listeners
      card.addEventListener("mousemove", calcRotation);
      card.addEventListener("mouseleave", resetRotation);

      // Remove listener when element is removed from DOM
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.removedNodes) {
            mutation.removedNodes.forEach((node) => {
              if (node === card) {
                card.removeEventListener("mousemove", calcRotation);
                card.removeEventListener("mouseleave", resetRotation);
                window.removeEventListener("resize", updateCardDimensions);
                observer.disconnect();
              }
            });
          }
        });
      });

      observer.observe(document.body, { childList: true, subtree: true });
    });
  }

  /**
   * Form submission
   */
  function initFormSubmission() {
    const forms = document.querySelectorAll("form");

    forms.forEach((form) => {
      form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get form ID or name
        const formId = form.id || form.getAttribute("name") || "form";

        // Simple validation
        const requiredFields = form.querySelectorAll("[required]");
        let isValid = true;

        requiredFields.forEach((field) => {
          if (!field.value.trim()) {
            isValid = false;
            field.classList.add("error");
          } else {
            field.classList.remove("error");
          }
        });

        if (!isValid) {
          showAlert(
            "Missing Information",
            "Please fill in all required fields.",
            "error"
          );
          return;
        }

        // Form-specific handling
        if (formId === "contact-form") {
          showAlert(
            "Message Sent",
            "Thank you for your message. We will get back to you soon!",
            "success"
          );
          form.reset();
        } else if (formId === "newsletter-form") {
          showAlert(
            "Subscribed",
            "Thank you for subscribing to our newsletter!",
            "success"
          );
          form.reset();
        } else {
          showAlert(
            "Form Submitted",
            "Thank you for your submission!",
            "success"
          );
          form.reset();
        }
      });
    });
  }

  /**
   * Alert system
   */
  function initAlertSystem() {
    // The container will be created when needed
    window.showAlert = function (title, message, type = "info") {
      // Create alert container if it doesn't exist
      let alertContainer = document.querySelector(".alert-container");

      if (!alertContainer) {
        alertContainer = document.createElement("div");
        alertContainer.className = "alert-container";
        document.body.appendChild(alertContainer);
      }

      // Create alert element
      const alert = document.createElement("div");
      alert.className = `alert alert-${type}`;
      alert.innerHTML = `
        <div class="alert-icon">
          <i class="fas ${getIconForAlertType(type)}"></i>
        </div>
        <div class="alert-title">${title}</div>
        <div class="alert-message">${message}</div>
        <button class="alert-close">
          <i class="fas fa-times"></i>
        </button>
        <div class="alert-progress"></div>
      `;

      // Add alert to container
      alertContainer.appendChild(alert);

      // Add active class after small delay
      setTimeout(() => {
        alert.classList.add("active");
      }, 10);

      // Add close functionality
      const closeBtn = alert.querySelector(".alert-close");
      closeBtn.addEventListener("click", () => {
        closeAlert(alert);
      });

      // Auto close after 5 seconds
      setTimeout(() => {
        closeAlert(alert);
      }, 5000);
    };

    function closeAlert(alert) {
      alert.classList.remove("active");

      // Remove from DOM after transition
      setTimeout(() => {
        if (alert.parentNode) {
          alert.parentNode.removeChild(alert);
        }
      }, 300);
    }

    function getIconForAlertType(type) {
      switch (type) {
        case "success":
          return "fa-check-circle";
        case "error":
          return "fa-exclamation-circle";
        case "warning":
          return "fa-exclamation-triangle";
        case "info":
        default:
          return "fa-info-circle";
      }
    }
  }

  /**
   * Contact section animation
   */
  function initContactAnimation() {
    const contactItems = document.querySelectorAll(".contact-item");

    if (contactItems.length === 0) return;

    contactItems.forEach((item, index) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(20px)";
      item.style.transition = `opacity 0.6s ease, transform 0.6s ease`;
      item.style.transitionDelay = `${index * 0.1}s`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const item = entry.target;
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.2 }
    );

    contactItems.forEach((item) => observer.observe(item));
  }

  /**
   * Services/Programs section interaction
   */
  function initServicesInteraction() {
    const serviceCards = document.querySelectorAll(".card");

    if (serviceCards.length === 0) return;

    serviceCards.forEach((card) => {
      // Add mousemove tracking for subtle image parallax
      const image = card.querySelector(".card-image img");

      if (image) {
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const cardCenterX = rect.left + rect.width / 2;
          const cardCenterY = rect.top + rect.height / 2;

          const mouseX = e.clientX - cardCenterX;
          const mouseY = e.clientY - cardCenterY;

          // Convert to percentage of card size
          const moveX = (mouseX / rect.width) * 10; // Max 10px movement
          const moveY = (mouseY / rect.height) * 10;

          image.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
        });

        card.addEventListener("mouseleave", () => {
          image.style.transform = "";
        });
      }
    });
  }

  /**
   * Masonry layout for cards grid
   */
  function initMasonryLayout() {
    const grids = document.querySelectorAll(".masonry-grid");

    if (grids.length === 0) return;

    // Simple masonry implementation
    function updateMasonryLayout(grid) {
      const items = grid.children;
      const columns = parseInt(
        getComputedStyle(grid).getPropertyValue("--columns") || "3",
        10
      );
      const gap = parseInt(
        getComputedStyle(grid).getPropertyValue("--gap") || "20",
        10
      );

      // Reset grid styles
      grid.style.position = "relative";
      grid.style.height = "auto";

      // Reset item styles
      for (let i = 0; i < items.length; i++) {
        items[i].style.position = "";
        items[i].style.top = "";
        items[i].style.left = "";
      }

      // Responsive columns adjustment
      let actualColumns = columns;
      const gridWidth = grid.offsetWidth;

      if (gridWidth < 768) {
        actualColumns = 1;
      } else if (gridWidth < 992) {
        actualColumns = Math.min(2, columns);
      }

      if (actualColumns <= 1) {
        // For single column, just stack normally
        return;
      }

      // Calculate column width
      const columnWidth =
        (gridWidth - gap * (actualColumns - 1)) / actualColumns;

      // Array to track column heights
      const columnHeights = Array(actualColumns).fill(0);

      // Position each item
      for (let i = 0; i < items.length; i++) {
        const item = items[i];

        // Find the shortest column
        let shortestColumn = 0;
        for (let j = 0; j < actualColumns; j++) {
          if (columnHeights[j] < columnHeights[shortestColumn]) {
            shortestColumn = j;
          }
        }

        // Position the item
        item.style.position = "absolute";
        item.style.width = `${columnWidth}px`;
        item.style.top = `${columnHeights[shortestColumn]}px`;
        item.style.left = `${shortestColumn * (columnWidth + gap)}px`;

        // Update column height
        columnHeights[shortestColumn] += item.offsetHeight + gap;
      }

      // Set the grid height to the height of the tallest column
      grid.style.height = `${Math.max(...columnHeights) - gap}px`;
    }

    // Initialize and update on resize
    grids.forEach((grid) => updateMasonryLayout(grid));

    window.addEventListener("resize", () => {
      grids.forEach((grid) => updateMasonryLayout(grid));
    });

    // Update after images are loaded
    window.addEventListener("load", () => {
      grids.forEach((grid) => updateMasonryLayout(grid));
    });
  }

  /**
   * Lightbox for gallery images
   */
  function initLightbox() {
    const lightboxableImages = document.querySelectorAll(".lightbox-image");

    if (lightboxableImages.length === 0) return;

    // Create lightbox elements
    const lightbox = document.createElement("div");
    lightbox.className = "modal-overlay lightbox";

    const lightboxContent = document.createElement("div");
    lightboxContent.className = "lightbox-content";

    const lightboxImage = document.createElement("img");
    lightboxImage.className = "lightbox-img";

    const lightboxClose = document.createElement("button");
    lightboxClose.className = "lightbox-close";
    lightboxClose.innerHTML = '<i class="fas fa-times"></i>';

    const lightboxNext = document.createElement("button");
    lightboxNext.className = "lightbox-next";
    lightboxNext.innerHTML = '<i class="fas fa-chevron-right"></i>';

    const lightboxPrev = document.createElement("button");
    lightboxPrev.className = "lightbox-prev";
    lightboxPrev.innerHTML = '<i class="fas fa-chevron-left"></i>';

    // Append elements
    lightboxContent.appendChild(lightboxImage);
    lightboxContent.appendChild(lightboxClose);
    lightboxContent.appendChild(lightboxNext);
    lightboxContent.appendChild(lightboxPrev);
    lightbox.appendChild(lightboxContent);
    document.body.appendChild(lightbox);

    // Current image index
    let currentIndex = 0;

    // Open lightbox
    function openLightbox(index) {
      currentIndex = index;
      const src = lightboxableImages[currentIndex].getAttribute("src");
      lightboxImage.setAttribute("src", src);
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    // Close lightbox
    function closeLightbox() {
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
    }

    // Navigate to next/prev image
    function navToImage(direction) {
      currentIndex += direction;

      // Loop around if at the end
      if (currentIndex < 0) {
        currentIndex = lightboxableImages.length - 1;
      } else if (currentIndex >= lightboxableImages.length) {
        currentIndex = 0;
      }

      const src = lightboxableImages[currentIndex].getAttribute("src");

      // Add transition effect
      lightboxImage.style.opacity = "0";

      setTimeout(() => {
        lightboxImage.setAttribute("src", src);
        lightboxImage.style.opacity = "1";
      }, 300);
    }

    // Add event listeners
    lightboxableImages.forEach((img, index) => {
      img.addEventListener("click", () => openLightbox(index));
    });

    lightboxClose.addEventListener("click", closeLightbox);
    lightboxNext.addEventListener("click", () => navToImage(1));
    lightboxPrev.addEventListener("click", () => navToImage(-1));

    // Close on background click
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("active")) return;

      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        navToImage(1);
      } else if (e.key === "ArrowLeft") {
        navToImage(-1);
      }
    });
  }

  /**
   * Smooth scroll for anchor links
   */
  function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll(
      'a[href^="#"]:not([href="#"])'
    );

    anchorLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        const targetId = link.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          // Calculate header height for offset
          const headerHeight =
            document.querySelector(".main-header")?.offsetHeight || 0;
          const targetPosition =
            targetElement.getBoundingClientRect().top +
            window.pageYOffset -
            headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });

          // Update URL without scrolling
          history.pushState(null, "", targetId);
        }
      });
    });
  }
});
