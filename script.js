// script.js

// Wait for document to load
document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS animation with mobile optimization
    AOS.init({
        duration: 800, // Reduced duration for faster animations
        once: true,
        easing: 'ease-in-out',
        disable: window.innerWidth < 768 ? 'mobile' : false // Disable AOS on mobile (<768px) for performance
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

    // Simulate progress loading with faster interval for mobile
    const simulateProgress = setInterval(() => {
        progressValue += window.innerWidth < 576 ? 2 : 1; // Faster progress on mobile
        if (progressValue >= 75) {
            clearInterval(simulateProgress);
        }
        progressBar.style.width = `${progressValue}%`;
        updateLoaderText(progressValue);
    }, window.innerWidth < 576 ? 30 : 50); // Faster interval on mobile

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
            clearInterval(simulateProgress); // Ensure interval is cleared
            setTimeout(() => {
                loader.classList.add('fade-out');
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 800);
            }, 300); // Reduced delay for faster loading on mobile
        }
    };

    // Attach load listeners to images and scripts
    document.querySelectorAll('img, script, link').forEach(resource => {
        if (resource.complete || resource.readyState === 'complete') {
            trackResourceLoad();
        } else {
            resource.addEventListener('load', trackResourceLoad);
            resource.addEventListener('error', trackResourceLoad); // Handle errors
        }
    });

    // Fallback for slow networks or no resources
    window.addEventListener('load', function () {
        progressValue = 100;
        progressBar.style.width = '100%';
        updateLoaderText(progressValue);
        clearInterval(simulateProgress);
        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 800);
        }, 300); // Reduced delay for mobile
    });

    // Initialize Typed.js with mobile-optimized settings
    const typed = new Typed('#typed-text', {
        strings: ['Software Engineer', 'Web Developer', 'Mobile App Developer', 'UI/UX Designer'],
        typeSpeed: window.innerWidth < 576 ? 60 : 80, // Slower typing on mobile
        backSpeed: window.innerWidth < 576 ? 30 : 40,
        backDelay: 1500,
        loop: true,
        cursorChar: window.innerWidth < 576 ? '|' : '_', // Thicker cursor on mobile
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Back to top button with mobile-adjusted threshold
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function () {
        const scrollThreshold = window.innerWidth < 768 ? 150 : 300; // Lower threshold on mobile
        if (window.scrollY > scrollThreshold) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });

    backToTopButton.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Smooth scrolling for navigation links with mobile-adjusted offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const offset = window.innerWidth < 768 ? 20 : 70; // Smaller offset on mobile
                const targetPosition = targetElement.offsetTop - navbarHeight - offset;

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

    // Active navigation based on scroll position with mobile adjustments
    function highlightNavigation() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const offset = window.innerWidth < 768 ? 50 : 100; // Smaller offset for mobile

        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - offset;
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

    // Form submission handling with mobile-friendly alert
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Clear form inputs
            const formControls = contactForm.querySelectorAll('.form-control');
            formControls.forEach(control => {
                control.value = '';
            });

            // Create and show alert
            const alertDiv = document.createElement('div');
            alertDiv.className = 'alert alert-success mt-3';
            alertDiv.style.fontSize = window.innerWidth < 576 ? '0.9rem' : '1rem'; // Smaller font on mobile
            alertDiv.style.padding = window.innerWidth < 576 ? '10px' : '15px';
            alertDiv.textContent = 'Your message has been sent successfully!';
            contactForm.appendChild(alertDiv);

            // Remove alert after 3 seconds
            setTimeout(() => {
                alertDiv.remove();
            }, 3000);
        });
    }

    // Animate skill bars when they come into view with mobile adjustments
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress-bar');
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const bar = entry.target;
                        const width = bar.getAttribute('style').split(':')[1];

                        bar.style.width = '0';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 100);

                        observer.unobserve(bar);
                    }
                });
            },
            { threshold: window.innerWidth < 768 ? 0.1 : 0.2 } // Lower threshold for mobile
        );

        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }

    animateSkillBars();

    // Optimize for touch events on mobile
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        // Add touch feedback for interactive elements
        document.querySelectorAll('.btn, .nav-link, .back-to-top').forEach(element => {
            element.addEventListener('touchstart', function () {
                this.classList.add('touch-active');
            });
            element.addEventListener('touchend', function () {
                this.classList.remove('touch-active');
            });
        });
    }

    // Navbar panel backdrop handling
    const navbarBackdrop = document.querySelector('.navbar-backdrop');
    if (navbarBackdrop) {
        navbarBackdrop.addEventListener('click', function () {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                document.querySelector('.navbar-toggler').click();
            }
        });
    }

    // Ensure navbar toggler updates backdrop visibility
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function () {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarBackdrop.style.opacity = '1';
                navbarBackdrop.style.visibility = 'visible';
            } else {
                navbarBackdrop.style.opacity = '0';
                navbarBackdrop.style.visibility = 'hidden';
            }
        });
    }
});