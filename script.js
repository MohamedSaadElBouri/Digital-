document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const mobileMenu = document.querySelector(".mobile-menu")

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      mobileMenu.style.display = mobileMenu.style.display === "block" ? "none" : "block"

      // Toggle icon
      const icon = this.querySelector("i")
      if (icon.classList.contains("fa-bars")) {
        icon.classList.remove("fa-bars")
        icon.classList.add("fa-times")
      } else {
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
      }
    })
  }

  // Header scroll effect
  const header = document.querySelector(".header")

  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    })
  }

  // Animate elements on scroll
  const animateElements = document.querySelectorAll(".animate-on-scroll")

  function checkIfInView() {
    animateElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const elementVisible = 150

      if (elementTop < window.innerHeight - elementVisible) {
        // Add delay if specified
        const delay = element.getAttribute("data-delay")

        if (delay) {
          setTimeout(() => {
            element.classList.add("visible")
          }, Number.parseInt(delay))
        } else {
          element.classList.add("visible")
        }
      }
    })
  }

  // Run on load
  checkIfInView()

  // Run on scroll
  window.addEventListener("scroll", checkIfInView)

  // Counter animation for statistics
  const statNumbers = document.querySelectorAll(".stat-number")

  function animateCounter(element) {
    const target = Number.parseInt(element.getAttribute("data-count"))
    const duration = 2000 // 2 seconds
    const step = target / (duration / 16) // 60fps
    let current = 0

    const timer = setInterval(() => {
      current += step

      if (current >= target) {
        element.textContent = target
        clearInterval(timer)
      } else {
        element.textContent = Math.floor(current)
      }
    }, 16)
  }

  // Intersection Observer for counter animation
  if (statNumbers.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )

    statNumbers.forEach((stat) => {
      observer.observe(stat)
    })
  }

  // FAQ accordion
  const faqItems = document.querySelectorAll(".faq-item")

  if (faqItems.length > 0) {
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question")

      question.addEventListener("click", () => {
        // Toggle active class
        item.classList.toggle("active")

        // Change icon
        const icon = question.querySelector(".faq-toggle i")

        if (icon) {
          if (item.classList.contains("active")) {
            icon.classList.remove("fa-plus")
            icon.classList.add("fa-minus")
          } else {
            icon.classList.remove("fa-minus")
            icon.classList.add("fa-plus")
          }
        }
      })
    })
  }

  // Form validation and submission
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Simple validation
      let isValid = true
      const requiredFields = contactForm.querySelectorAll("[required]")

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false
          field.classList.add("error")
        } else {
          field.classList.remove("error")
        }
      })

      if (isValid) {
        // Simulate form submission
        const submitBtn = contactForm.querySelector(".submit-btn")
        const originalText = submitBtn.innerHTML

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...'
        submitBtn.disabled = true

        // Simulate API call
        setTimeout(() => {
          // Show success message
          const formContainer = contactForm.closest(".contact-form-container")
          const successMessage = document.createElement("div")
          successMessage.className = "form-success-message"
          successMessage.innerHTML = `
                        <div class="success-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <h3>Message envoyé avec succès!</h3>
                        <p>Merci de nous avoir contactés. Notre équipe vous répondra dans les plus brefs délais.</p>
                        <button class="btn btn-outline" id="resetForm">Envoyer un autre message</button>
                    `

          // Hide form and show success message
          contactForm.style.display = "none"
          formContainer.appendChild(successMessage)

          // Reset form button
          const resetBtn = document.getElementById("resetForm")
          if (resetBtn) {
            resetBtn.addEventListener("click", () => {
              contactForm.reset()
              contactForm.style.display = "grid"
              successMessage.remove()
              submitBtn.innerHTML = originalText
              submitBtn.disabled = false
            })
          }
        }, 2000)
      }
    })
  }

  // Language toggle
  const langToggle = document.querySelector(".language-toggle")

  if (langToggle) {
    langToggle.addEventListener("click", function (e) {
      e.preventDefault()

      const currentLang = this.querySelector("span").textContent
      const newLang = currentLang === "FR" ? "EN" : "FR"

      this.querySelector("span").textContent = newLang

      // Here you would typically redirect to the translated version of the page
      // or trigger a language change event
      console.log(`Language changed to ${newLang}`)
    })
  }

  // Ajouter ce code après le bloc "Language toggle" existant
  // Language dropdown
  const langDropdown = document.querySelector(".language-dropdown")

  if (langToggle && langDropdown) {
    langToggle.addEventListener("click", (e) => {
      e.stopPropagation()
      langDropdown.classList.toggle("show")
    })

    // Close dropdown when clicking elsewhere
    document.addEventListener("click", () => {
      if (langDropdown.classList.contains("show")) {
        langDropdown.classList.remove("show")
      }
    })

    // Prevent dropdown from closing when clicking inside it
    langDropdown.addEventListener("click", (e) => {
      e.stopPropagation()
    })

    // Handle language selection
    const langOptions = langDropdown.querySelectorAll("a")
    langOptions.forEach((option) => {
      option.addEventListener("click", function (e) {
        e.preventDefault()

        // Update active class
        langOptions.forEach((opt) => opt.classList.remove("active"))
        this.classList.add("active")

        // Update displayed language
        const newLang = this.textContent.trim() === "Français" ? "FR" : "EN"
        langToggle.querySelector("span").textContent = newLang

        // Close dropdown
        langDropdown.classList.remove("show")

        console.log(`Language changed to ${this.textContent.trim()}`)
      })
    })
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href")

      if (targetId !== "#") {
        e.preventDefault()

        const targetElement = document.querySelector(targetId)

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: "smooth",
          })

          // Close mobile menu if open
          if (mobileMenu && mobileMenu.style.display === "block") {
            mobileMenu.style.display = "none"

            if (menuToggle) {
              const icon = menuToggle.querySelector("i")
              if (icon) {
                icon.classList.remove("fa-times")
                icon.classList.add("fa-bars")
              }
            }
          }
        }
      }
    })
  })

  // Image hover effects
  const cardImages = document.querySelectorAll(".card-image-container")

  cardImages.forEach((container) => {
    container.addEventListener("mouseenter", function () {
      const overlay = this.querySelector(".card-overlay")
      if (overlay) {
        overlay.style.opacity = "1"
        overlay.style.transform = "translateY(0)"
      }
    })

    container.addEventListener("mouseleave", function () {
      const overlay = this.querySelector(".card-overlay")
      if (overlay) {
        overlay.style.opacity = "0"
        overlay.style.transform = "translateY(20px)"
      }
    })
  })

  // Newsletter form
  const newsletterForm = document.querySelector(".newsletter-form")

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const emailInput = this.querySelector('input[type="email"]')
      const submitBtn = this.querySelector("button")

      if (emailInput && emailInput.value.trim()) {
        // Simulate submission
        const originalText = submitBtn.textContent
        submitBtn.textContent = "Envoi..."
        submitBtn.disabled = true

        setTimeout(() => {
          // Show success message
          emailInput.value = ""
          submitBtn.textContent = "Inscrit !"

          // Reset after a delay
          setTimeout(() => {
            submitBtn.textContent = originalText
            submitBtn.disabled = false
          }, 2000)
        }, 1500)
      }
    })
  }

  // Initialize circular progress charts
  function initCircularCharts() {
    const charts = document.querySelectorAll(".circular-chart")

    if (charts.length > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const path = entry.target.querySelector(".circle")
              if (path) {
                const dashArray = path.getAttribute("stroke-dasharray")
                // Reset the animation by removing and re-adding the dasharray
                path.setAttribute("stroke-dasharray", "0, 100")
                setTimeout(() => {
                  path.setAttribute("stroke-dasharray", dashArray)
                }, 50)
              }
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.5 },
      )

      charts.forEach((chart) => {
        observer.observe(chart)
      })
    }
  }

  // Handle smooth transitions between pages
  function handlePageTransitions() {
    document.addEventListener("DOMContentLoaded", () => {
      document.body.classList.add("page-transition-in")
    })

    document.querySelectorAll("a").forEach((link) => {
      // Only add transition for internal links
      if (link.href.includes(window.location.origin) && !link.getAttribute("target")) {
        link.addEventListener("click", function (e) {
          const href = this.getAttribute("href")

          // Skip for # links
          if (href.startsWith("#")) return

          e.preventDefault()
          document.body.classList.add("page-transition-out")

          setTimeout(() => {
            window.location.href = href
          }, 300)
        })
      }
    })
  }

  // Initialize interactive features for environment page
  function initEnvironmentFeatures() {
    const envImages = document.querySelectorAll(".env-image")

    envImages.forEach((image) => {
      image.addEventListener("mouseenter", function () {
        const overlay = this.querySelector(".env-image-overlay")
        if (overlay) {
          overlay.style.opacity = "1"
        }
      })

      image.addEventListener("mouseleave", function () {
        const overlay = this.querySelector(".env-image-overlay")
        if (overlay) {
          overlay.style.opacity = "0.7"
        }
      })
    })
  }

  // Run initializations
  document.addEventListener("DOMContentLoaded", () => {
    initCircularCharts()
    handlePageTransitions()
    initEnvironmentFeatures()
  })
})
