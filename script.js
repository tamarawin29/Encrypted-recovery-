document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const navMenu = document.querySelector("nav ul")

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      mobileMenuBtn.classList.toggle("active")
    })
  }

  // Sticky Header
  const header = document.querySelector("header")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.style.background = "rgba(6, 16, 24, 0.95)"
      header.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)"
    } else {
      header.style.background = "rgba(6, 16, 24, 0.9)"
      header.style.boxShadow = "none"
    }
  })

  // Testimonial Slider
  const testimonialTrack = document.querySelector(".testimonial-track")
  const testimonials = document.querySelectorAll(".testimonial")
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")
  const dotsContainer = document.querySelector(".slider-dots")

  if (testimonialTrack && testimonials.length > 0) {
    let currentIndex = 0
    let slideWidth = testimonials[0].offsetWidth
    let slidesToShow = 1

    // Responsive slidesToShow
    function updateSlidesToShow() {
      if (window.innerWidth >= 1024) {
        slidesToShow = 3
      } else if (window.innerWidth >= 768) {
        slidesToShow = 2
      } else {
        slidesToShow = 1
      }
      updateSlider()
    }

    // Create dots
    function createDots() {
      dotsContainer.innerHTML = ""
      const totalDots = Math.ceil(testimonials.length / slidesToShow)

      for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement("div")
        dot.classList.add("dot")
        if (i === 0) dot.classList.add("active")
        dot.addEventListener("click", () => {
          goToSlide(i)
        })
        dotsContainer.appendChild(dot)
      }
    }

    // Update slider position
    function updateSlider() {
      slideWidth = testimonials[0].offsetWidth
      testimonialTrack.style.transform = `translateX(-${currentIndex * slideWidth * slidesToShow}px)`

      // Update dots
      const dots = document.querySelectorAll(".dot")
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === Math.floor(currentIndex / slidesToShow))
      })
    }

    // Go to specific slide
    function goToSlide(index) {
      currentIndex = index
      updateSlider()
    }

    // Next slide
    function nextSlide() {
      if (currentIndex < Math.ceil(testimonials.length / slidesToShow) - 1) {
        currentIndex++
      } else {
        currentIndex = 0
      }
      updateSlider()
    }

    // Previous slide
    function prevSlide() {
      if (currentIndex > 0) {
        currentIndex--
      } else {
        currentIndex = Math.ceil(testimonials.length / slidesToShow) - 1
      }
      updateSlider()
    }

    // Event listeners
    if (nextBtn) nextBtn.addEventListener("click", nextSlide)
    if (prevBtn) prevBtn.addEventListener("click", prevSlide)

    // Auto slide
    let slideInterval = setInterval(nextSlide, 5000)

    // Pause on hover
    testimonialTrack.addEventListener("mouseenter", () => {
      clearInterval(slideInterval)
    })

    testimonialTrack.addEventListener("mouseleave", () => {
      slideInterval = setInterval(nextSlide, 5000)
    })

    // Initialize
    window.addEventListener("resize", () => {
      updateSlidesToShow()
      createDots()
    })

    updateSlidesToShow()
    createDots()
  }

  // Animated Counter
  const statNumbers = document.querySelectorAll(".stat-number")

  function animateCounter(el) {
    const target = Number.parseInt(el.getAttribute("data-count"))
    const duration = 2000 // 2 seconds
    const step = target / (duration / 16) // 60fps
    let current = 0

    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        clearInterval(timer)
        el.textContent = target
      } else {
        el.textContent = Math.floor(current)
      }
    }, 16)
  }

  // Intersection Observer for counter animation
  const observerOptions = {
    threshold: 0.5,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target)
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  statNumbers.forEach((number) => {
    observer.observe(number)
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        // Close mobile menu if open
        if (navMenu.classList.contains("active")) {
          navMenu.classList.remove("active")
          mobileMenuBtn.classList.remove("active")
        }

        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })

  // Form submission
  const recoveryForm = document.getElementById("recovery-form")
  if (recoveryForm) {
    recoveryForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Simulate form submission
      const submitButton = this.querySelector(".submit-button")
      submitButton.textContent = "Submitting..."
      submitButton.disabled = true

      // Simulate API call
      setTimeout(() => {
        alert("Thank you for your submission! Our recovery specialists will contact you shortly.")
        this.reset()
        submitButton.textContent = "Submit Recovery Request"
        submitButton.disabled = false
      }, 1500)
    })
  }

  // Floating CTA button animation
  const floatingBtn = document.querySelector(".floating-button")
  if (floatingBtn) {
    setInterval(() => {
      floatingBtn.classList.add("pulse")
      setTimeout(() => {
        floatingBtn.classList.remove("pulse")
      }, 1000)
    }, 3000)

    floatingBtn.addEventListener("click", () => {
      document.querySelector("#contact").scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    })
  }

  // Add active class to nav links based on scroll position
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll("nav ul li a")

  function highlightNavLink() {
    const scrollPosition = window.scrollY + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active")
          }
        })
      }
    })
  }

  window.addEventListener("scroll", highlightNavLink)

  // Initial call to set active link
  highlightNavLink()
})
