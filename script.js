// Wait for document to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation
    AOS.init({
        duration: 1000,
        once: true,
        easing: 'ease-in-out'
    });

    // Enhanced loader functionality with rocket animation
    const loader = document.querySelector('.loader');
    const progressBar = document.querySelector('.loader-progress-bar');
    const loaderText = document.querySelector('.loader-text');
    let progressValue = 0;
    let resources = 0;
    let loadedResources = 0;
    
    // Count the number of resources to load
    resources = document.images.length + document.querySelectorAll('script').length + document.querySelectorAll('link').length;
    
    // Update loader text based on progress
    function updateLoaderText(progress) {
        if (progress < 30) {
            loaderText.textContent = "Preparing for takeoff...";
        } else if (progress < 60) {
            loaderText.textContent = "Ignition sequence started...";
        } else if (progress < 90) {
            loaderText.textContent = "Launching into orbit...";
        } else {
            loaderText.textContent = "Ready to explore!";
        }
    }
    
    // Simulate progress loading
    const simulateProgress = setInterval(() => {
        progressValue += 1;
        if (progressValue >= 75) {
            clearInterval(simulateProgress);
        }
        progressBar.style.width = `${progressValue}%`;
        updateLoaderText(progressValue);
    }, 50);
    
    // Track actual resource loading
    const trackResourceLoad = () => {
        loadedResources++;
        let actualProgress = Math.min(Math.round((loadedResources / resources) * 100), 100);
        if (actualProgress > progressValue) {
            progressValue = actualProgress;
            progressBar.style.width = `${progressValue}%`;
            updateLoaderText(progressValue);
        }
        
        if (progressValue >= 100) {
            setTimeout(() => {
                loader.classList.add('fade-out');
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 800);
            }, 500);
        }
    };
    
    // Listen for window load event
    window.addEventListener('load', function() {
        progressValue = 100;
        progressBar.style.width = '100%';
        updateLoaderText(progressValue);
        
        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 800);
        }, 500);
    });
    
    // Initialize Typed.js
    const typed = new Typed('#typed-text', {
        strings: ['Software Engineer', 'Web Developer', 'Mobile App Developer', 'UI/UX Designer'],
        typeSpeed: 80,
        backSpeed: 40,
        backDelay: 1500,
        loop: true
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });

    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    document.querySelector('.navbar-toggler').click();
                }
            }
        });
    });

    // Active navigation based on scroll position
    function highlightNavigation() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        let currentSection = '';
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            const formControls = contactForm.querySelectorAll('.form-control');
            formControls.forEach(control => {
                control.value = '';
            });
            
            // Create and show alert
            const alertDiv = document.createElement('div');
            alertDiv.className = 'alert alert-success mt-3';
            alertDiv.textContent = 'Your message has been sent successfully!';
            contactForm.appendChild(alertDiv);
            
            // Remove alert after 3 seconds
            setTimeout(() => {
                alertDiv.remove();
            }, 3000);
        });
    }

    // Animate skill bars when they come into view
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress-bar');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.getAttribute('style').split(':')[1];
                    
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                    
                    // Unobserve after animation
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.2 });
        
        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }
    
    animateSkillBars();
});