// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(event) {
      if (this.getAttribute("href") !== "#") {
        event.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  });
  
  // Search form handling
  const searchForm = document.querySelector('.search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const searchTerm = this.querySelector('input').value;
      console.log('Búsqueda:', searchTerm);
      // Aquí iría la lógica de búsqueda real
    });
  }
  
  // Cart functionality
  const cartBadge = document.querySelector('.cart-badge');
  let cartCount = 0;
  
  function addToCart() {
    cartCount++;
    cartBadge.textContent = cartCount;
    cartBadge.style.display = 'inline';
    cartBadge.classList.add("updated");
    setTimeout(() => cartBadge.classList.remove("updated"), 500);
  }
  
  // Form validation
  document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    if (form) {
      // Prevent duplicate validation setup (original code had duplicate event listeners)
      form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          event.preventDefault();
          
          // Create success message
          const successAlert = document.createElement('div');
          successAlert.className = 'alert alert-success mt-3 alert-dismissible fade show';
          successAlert.innerHTML = `
            <strong>¡Gracias por contactarnos!</strong> Nos pondremos en contacto contigo pronto.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          `;
          
          form.insertAdjacentElement('afterend', successAlert);
          form.reset();
          form.classList.add('form-submitted');
  
          setTimeout(() => {
            successAlert.remove();
          }, 5000);
        }
        
        form.classList.add('was-validated');
      });
  
      // Real-time validation for better UX
      form.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('input', function() {
          if (this.value.trim()) {
            if (this.name === 'email') {
              this.classList.toggle('is-valid', isValidEmail(this.value));
              this.classList.toggle('is-invalid', !isValidEmail(this.value));
            } else if (this.name === 'phone') {
              this.classList.toggle('is-valid', isValidPhone(this.value));
              this.classList.toggle('is-invalid', !isValidPhone(this.value));
            } else {
              this.classList.add('is-valid');
              this.classList.remove('is-invalid');
            }
          } else {
            this.classList.remove('is-valid');
            this.classList.toggle('is-invalid', this.hasAttribute('required'));
          }
        });
      });
    }
  });
  
  // Email validation helper
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  // Phone validation helper
  function isValidPhone(phone) {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone);
  }