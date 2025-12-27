// ============================================
// STAR-THEMED PORTFOLIO - INTERACTIVE FEATURES
// ============================================

// ============================================
// ANIMATED STARRY BACKGROUND
// ============================================
function createStarryBackground() {
  const canvas = document.getElementById('starry-background');
  const ctx = canvas.getContext('2d');

  // Set canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Star class
  class Star {
    constructor() {
      this.reset();
      this.y = Math.random() * canvas.height;
      this.opacity = Math.random();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = 0;
      this.size = Math.random() * 2;
      this.speed = Math.random() * 0.5 + 0.1;
      this.opacity = Math.random();
      this.twinkleSpeed = Math.random() * 0.02 + 0.01;
    }

    update() {
      // Twinkling effect
      this.opacity += this.twinkleSpeed;
      if (this.opacity > 1 || this.opacity < 0) {
        this.twinkleSpeed *= -1;
      }
    }

    draw() {
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();

      // Add glow effect for larger stars
      if (this.size > 1.5) {
        ctx.fillStyle = `rgba(251, 191, 36, ${this.opacity * 0.3})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // Shooting star class
  class ShootingStar {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height / 2;
      this.length = Math.random() * 80 + 40;
      this.speed = Math.random() * 10 + 10;
      this.opacity = 1;
      this.angle = Math.PI / 4; // 45 degrees
    }

    update() {
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;
      this.opacity -= 0.02;

      if (this.opacity <= 0 || this.x > canvas.width || this.y > canvas.height) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(
        this.x - Math.cos(this.angle) * this.length,
        this.y - Math.sin(this.angle) * this.length
      );
      ctx.stroke();

      // Add gradient tail
      const gradient = ctx.createLinearGradient(
        this.x, this.y,
        this.x - Math.cos(this.angle) * this.length,
        this.y - Math.sin(this.angle) * this.length
      );
      gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
      gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
      ctx.strokeStyle = gradient;
      ctx.stroke();
      ctx.restore();
    }
  }

  // Create stars
  const stars = [];
  const starCount = 200;
  for (let i = 0; i < starCount; i++) {
    stars.push(new Star());
  }

  // Create shooting stars
  const shootingStars = [];
  const shootingStarCount = 3;
  for (let i = 0; i < shootingStarCount; i++) {
    shootingStars.push(new ShootingStar());
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw stars
    stars.forEach(star => {
      star.update();
      star.draw();
    });

    // Update and draw shooting stars (less frequently)
    if (Math.random() < 0.01) {
      shootingStars.forEach(star => {
        star.update();
        star.draw();
      });
    }

    requestAnimationFrame(animate);
  }

  animate();
}



// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe all sections with fade-in class
  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ============================================
// PARALLAX EFFECT
// ============================================
function initParallax() {
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.glass-section');

        parallaxElements.forEach((el, index) => {
          const speed = (index + 1) * 0.05;
          el.style.transform = `translateY(${scrolled * speed}px)`;
        });

        ticking = false;
      });

      ticking = true;
    }
  });
}

// ============================================
// INITIALIZE ON DOM LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize starry background
  createStarryBackground();



  // Initialize scroll animations
  initScrollAnimations();

  // Initialize smooth scroll
  initSmoothScroll();

  // Optional: Initialize parallax (can be disabled if too much)
  // initParallax();

  console.log('🌟 Star-themed portfolio loaded successfully!');
});

// ============================================
// EASTER EGG: KONAMI CODE
// ============================================
(function () {
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        activateEasterEgg();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  function activateEasterEgg() {
    // Add extra shooting stars
    alert('🌟 Secret unlocked! Extra shooting stars activated! 🌟');
    document.body.style.animation = 'rainbow 2s infinite';
  }
})();
