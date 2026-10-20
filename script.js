document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    const nav = document.querySelector('.nav');

    // Menú móvil
    navToggle?.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !expanded);
        navList.classList.toggle('open');
        nav?.classList.toggle('open');
    });

    // Cerrar menú al clickar enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('open');
            nav?.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Header scroll effect
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

    // Marcar enlace activo según página actual
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Animaciones al aparecer
    const animatedElements = document.querySelectorAll(
        '.historia-card, .concierto-card, .actualidad-card, .uniformidad-content > *, ' +
        '.acompanamiento-col, .repertorio-text, .contacto-info, .contacto-cta, ' +
        '.card, .marcha-card, .estreno-card, .marcha-item, .historial-list li, ' +
        '.gallery-item, .contacto-item, .red-social, .formulario, .cta-content'
    );

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
        el.style.transition = `opacity 0.6s ease ${i * 0.08}s, transform 0.6s ease ${i * 0.08}s`;
        animateObserver.observe(el);
    });

    // Hero escudo hover pause
    const heroEscudo = document.querySelector('.hero-escudo-img');
    if (heroEscudo) {
        heroEscudo.addEventListener('mouseenter', () => {
            heroEscudo.style.animationPlayState = 'paused';
        });
        heroEscudo.addEventListener('mouseleave', () => {
            heroEscudo.style.animationPlayState = 'running';
        });
    }

    // Smooth scroll para anclas internas
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

    // Cerrar menú al clickar fuera
    document.addEventListener('click', (e) => {
        if (navList.classList.contains('open') && 
            !nav.contains(e.target) && 
            !navToggle.contains(e.target)) {
            navList.classList.remove('open');
            nav?.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
});