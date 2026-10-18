document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section[id]');

    navToggle?.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !expanded);
        navList.classList.toggle('open');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 100) {
            header.style.background = 'rgba(10, 22, 40, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
        } else {
            header.style.background = 'rgba(10, 22, 40, 0.95)';
            header.style.boxShadow = 'none';
        }
        lastScroll = currentScroll;
    }, { passive: true });

    const observerOptions = { rootMargin: '-20% 0px -60% 0px', threshold: 0 };
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    const animatedElements = document.querySelectorAll('.historia-card, .concierto-card, .actualidad-card, .uniformidad-content > *, .acompanamiento-col, .repertorio-text, .contacto-info, .contacto-cta');
    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                animateObserver.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -50px 0px' });

    animatedElements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
        animateObserver.observe(el);
    });

    const heroEscudo = document.querySelector('.hero-escudo-img');
    if (heroEscudo) {
        heroEscudo.addEventListener('mouseenter', () => {
            heroEscudo.style.animationPlayState = 'paused';
        });
        heroEscudo.addEventListener('mouseleave', () => {
            heroEscudo.style.animationPlayState = 'running';
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('[data-year]');
    yearElements.forEach(el => el.textContent = currentYear);
});