// Main JavaScript for Swastik Packers & Movers

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeFormValidation();
    initializeScrollEffects();
    initializeAnimations();
    initializeDateValidation();
});

// Navigation Functions
function initializeNavigation() {
    // Smooth scrolling for anchor links
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

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu close on link click
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', function() {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                bootstrap.Collapse.getInstance(navbarCollapse).hide();
            }
        });
    });
}

// Scroll to Quote Function
function scrollToQuote() {
    const quoteSection = document.getElementById('quote-section');
    if (quoteSection) {
        quoteSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Form Validation and Submission
function initializeFormValidation() {
    // Main quote form
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', handleQuoteFormSubmission);
        
        // Real-time validation
        const formFields = quoteForm.querySelectorAll('input, select');
        formFields.forEach(field => {
            field.addEventListener('blur', function() {
                validateField(this);
            });
            
            field.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    validateField(this);
                }
            });
        });
    }

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmission);
    }

    // Quick quote form
    const quickQuoteForm = document.getElementById('quickQuoteForm');
    if (quickQuoteForm) {
        quickQuoteForm.addEventListener('submit', handleQuickQuoteSubmission);
    }
}

// Field Validation Function
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Clear previous validation
    field.classList.remove('is-valid', 'is-invalid');
    const feedback = field.parentNode.querySelector('.invalid-feedback');
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required.';
    }

    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
    }

    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number.';
        }
    }

    // Date validation
    if (field.type === 'date' && value) {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            isValid = false;
            errorMessage = 'Moving date cannot be in the past.';
        }
    }

    // Name validation
    if (field.id.includes('Name') && value) {
        if (value.length < 2) {
            isValid = false;
            errorMessage = 'Name must be at least 2 characters long.';
        }
    }

    // Apply validation styling
    if (isValid) {
        field.classList.add('is-valid');
        if (feedback) feedback.textContent = '';
    } else {
        field.classList.add('is-invalid');
        if (feedback) feedback.textContent = errorMessage;
    }

    return isValid;
}

// Form Submission Handlers
async function handleQuoteFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('#submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.spinner-border');
    const messageDiv = document.getElementById('formMessage');

    // Validate all fields
    const formFields = form.querySelectorAll('input, select');
    let isFormValid = true;
    
    formFields.forEach(field => {
        if (!validateField(field)) {
            isFormValid = false;
        }
    });

    if (!isFormValid) {
        showMessage(messageDiv, 'Please fix the errors above before submitting.', 'danger');
        return;
    }

    // Show loading state
    submitBtn.disabled = true;
    btnText.textContent = 'Submitting...';
    spinner.classList.remove('d-none');
    messageDiv.classList.add('d-none');

    try {
        // Submit form data
        const formData = new FormData(form);
        formData.append('form_type', 'quote');
        
        const response = await fetch('php/process-quote.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            showMessage(messageDiv, result.message, 'success');
            form.reset();
            // Remove validation classes
            formFields.forEach(field => {
                field.classList.remove('is-valid', 'is-invalid');
            });
        } else {
            showMessage(messageDiv, result.message || 'An error occurred. Please try again.', 'danger');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        showMessage(messageDiv, 'An error occurred. Please try again later.', 'danger');
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        btnText.textContent = 'Get Free Quote';
        spinner.classList.add('d-none');
    }
}

async function handleContactFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('#contactSubmitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.spinner-border');
    const messageDiv = document.getElementById('contactFormMessage');

    // Show loading state
    submitBtn.disabled = true;
    btnText.textContent = 'Sending...';
    spinner.classList.remove('d-none');

    try {
        const formData = new FormData(form);
        formData.append('form_type', 'contact');
        
        const response = await fetch('php/process-quote.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            showMessage(messageDiv, result.message, 'success');
            form.reset();
        } else {
            showMessage(messageDiv, result.message || 'An error occurred. Please try again.', 'danger');
        }
    } catch (error) {
        console.error('Contact form submission error:', error);
        showMessage(messageDiv, 'An error occurred. Please try again later.', 'danger');
    } finally {
        submitBtn.disabled = false;
        btnText.textContent = 'Send Message';
        spinner.classList.add('d-none');
    }
}

async function handleQuickQuoteSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('#quickQuoteBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.spinner-border');
    const messageDiv = document.getElementById('quickQuoteMessage');

    // Show loading state
    submitBtn.disabled = true;
    btnText.textContent = 'Submitting...';
    spinner.classList.remove('d-none');

    try {
        const formData = new FormData(form);
        formData.append('form_type', 'quick_quote');
        
        const response = await fetch('php/process-quote.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            showMessage(messageDiv, result.message, 'success');
            form.reset();
        } else {
            showMessage(messageDiv, result.message || 'An error occurred. Please try again.', 'danger');
        }
    } catch (error) {
        console.error('Quick quote submission error:', error);
        showMessage(messageDiv, 'An error occurred. Please try again later.', 'danger');
    } finally {
        submitBtn.disabled = false;
        btnText.textContent = 'Get Quick Quote';
        spinner.classList.add('d-none');
    }
}

// Utility function to show messages
function showMessage(element, message, type) {
    element.className = `alert alert-${type}`;
    element.textContent = message;
    element.classList.remove('d-none');
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            element.classList.add('d-none');
        }, 5000);
    }
}

// Date Validation
function initializeDateValidation() {
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    
    dateInputs.forEach(input => {
        input.setAttribute('min', today);
    });
}

// Scroll Effects
function initializeScrollEffects() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .feature-card, .process-step');
    animateElements.forEach(el => observer.observe(el));
}

// Animations
function initializeAnimations() {
    // Add stagger effect to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add stagger effect to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Phone number formatting
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 10) {
        value = value.substring(0, 10);
        input.value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    }
}

// Add phone formatting to phone inputs
document.addEventListener('DOMContentLoaded', function() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    });
});

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Failed to load image:', this.src);
        });
    });
});

// Performance optimization - lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Global error handler
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    // You could send error reports to a logging service here
});

// Export functions for use in other scripts
window.SwastikPackers = {
    scrollToQuote,
    validateField,
    showMessage,
    formatPhoneNumber
};
