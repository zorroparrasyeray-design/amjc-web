document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    const nav = document.querySelector('.nav');

    const closeMenu = (returnFocus = false) => {
        if (!navToggle || !navList) return;
        navList.classList.remove('open');
        nav?.classList.remove('open');
        document.body.classList.remove('menu-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Abrir menú');
        if (returnFocus) navToggle.focus();
    };

    // Menú móvil
    navToggle?.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!expanded));
        navToggle.setAttribute('aria-label', expanded ? 'Abrir menú' : 'Cerrar menú');
        navList.classList.toggle('open', !expanded);
        nav?.classList.toggle('open', !expanded);
        document.body.classList.toggle('menu-open', !expanded);
        if (!expanded) {
            requestAnimationFrame(() => navList.querySelector('.nav-link')?.focus());
        }
    });

    // Cerrar menú al pulsar un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Cerrar menú con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navList?.classList.contains('open')) closeMenu(true);
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!navList?.classList.contains('open')) return;
        if (nav?.contains(e.target) || navToggle?.contains(e.target)) return;
        closeMenu();
    });

    // Cerrar el menú si la pantalla vuelve a escritorio
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    mobileQuery.addEventListener('change', (e) => {
        if (!e.matches) closeMenu();
    });

    // Header con sombra al hacer scroll
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                header.style.background = 'rgba(10, 22, 40, 0.98)';
                header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
            } else {
                header.style.background = 'rgba(10, 22, 40, 0.95)';
                header.style.boxShadow = 'none';
            }
        }, { passive: true });
    }

    // Marcar enlace activo según la página actual
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const isActive = href === currentPage;
        link.classList.toggle('active', isActive);
        if (isActive) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });

    // Animaciones al aparecer, respetando prefers-reduced-motion
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reduceMotion && 'IntersectionObserver' in window) {
        const animatedElements = document.querySelectorAll(
            '.timeline-item, .historia-card, .concierto-card, .actualidad-card, .uniformidad-content > *, ' +
            '.acompanamiento-col, .repertorio-text, .contacto-info, .contacto-cta, ' +
            '.card, .marcha-card, .estreno-card, .marcha-item, .historial-list li, ' +
            '.gallery-item, .historia-foto, .contacto-item, .red-social, .formulario, .agenda-calendar, .agenda-event, .cta-content'
        );

        const animateObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('visible');
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
    }

    // Agenda 2027: cuenta atrás y próximo acompañamiento
    const countdown = document.querySelector('[data-countdown]');
    if (countdown) {
        const target = new Date(`${countdown.dataset.countdown}T00:00:00+01:00`);
        const days = Math.ceil((target.getTime() - Date.now()) / 86400000);
        if (days > 1) {
            countdown.textContent = `Faltan ${days} días`;
        } else if (days === 1) {
            countdown.textContent = 'Falta 1 día';
        } else if (days === 0) {
            countdown.textContent = 'Hoy comienza';
        } else {
            countdown.textContent = 'Semana Santa 2027';
        }
    }

    const agendaEvents = [...document.querySelectorAll('.agenda-event[data-date]')];
    if (agendaEvents.length) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const nextEvent = agendaEvents.find((event) => {
            return new Date(`${event.dataset.date}T00:00:00+01:00`) >= today;
        });
        nextEvent?.classList.add('is-next');
    }

    // Scroll suave para anclas internas
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            window.scrollTo({ top: targetPosition, behavior: reduceMotion ? 'auto' : 'smooth' });
        });
    });

    // Vídeo de fondo de la sección CTA: cubre la sección y empieza silenciado
    const ctaSection = document.querySelector('.section-cta');
    const ctaVideoBg = ctaSection?.querySelector('.cta-video-bg');
    if (ctaSection && ctaVideoBg) {
        const iframe = ctaVideoBg.querySelector('iframe');
        const soundToggle = ctaSection.querySelector('.cta-video-sound');
        const soundLabel = soundToggle?.querySelector('.cta-video-sound-label');
        let player = null;
        let soundOn = false;

        const resizeCtaVideo = () => {
            if (!iframe) return;
            const width = ctaSection.clientWidth;
            const height = ctaSection.clientHeight;
            const videoWidth = Math.max(width, height * (16 / 9));
            const videoHeight = videoWidth / (16 / 9);
            iframe.style.width = `${videoWidth}px`;
            iframe.style.height = `${videoHeight}px`;
        };

        resizeCtaVideo();
        window.addEventListener('resize', resizeCtaVideo, { passive: true });
        window.addEventListener('load', resizeCtaVideo);
        if ('ResizeObserver' in window) {
            new ResizeObserver(resizeCtaVideo).observe(ctaSection);
        }

        const initCtaPlayer = () => {
            if (!iframe || !window.YT?.Player) return;

            player = new YT.Player(iframe, {
                events: {
                    onReady: (event) => {
                        event.target.mute();
                        if (reduceMotion) {
                            event.target.pauseVideo();
                        } else {
                            event.target.playVideo();
                        }
                        soundToggle?.removeAttribute('disabled');
                    }
                }
            });
        };

        if (window.YT?.Player) {
            initCtaPlayer();
        } else {
            window.onYouTubeIframeAPIReady = initCtaPlayer;
            const apiScript = document.createElement('script');
            apiScript.src = 'https://www.youtube.com/iframe_api';
            document.head.appendChild(apiScript);
        }

        soundToggle?.addEventListener('click', () => {
            if (!player) return;

            if (soundOn) {
                player.mute();
            } else {
                player.unMute();
                player.setVolume(100);
                player.playVideo();
            }

            soundOn = !soundOn;
            soundToggle.setAttribute('aria-pressed', String(soundOn));
            if (soundLabel) soundLabel.textContent = soundOn ? 'Silenciar' : 'Activar sonido';
        });
    }

    // Formulario de contacto: prepara el email con los datos introducidos
    const form = document.querySelector('.formulario');
    if (form) {
        form.addEventListener('submit', (event) => {
            const data = new FormData(form);
            const get = (key) => (data.get(key) || '').toString().trim();
            const tipoSelect = form.querySelector('#tipo');
            const tipo = tipoSelect?.selectedOptions[0]?.textContent.trim() || get('tipo');
            const subject = `Contacto web · ${tipo || 'Consulta'}`;
            const body = [
                `Nombre: ${get('nombre')}`,
                `Email: ${get('email')}`,
                `Teléfono: ${get('telefono') || 'No indicado'}`,
                `Tipo de consulta: ${tipo}`,
                '',
                'Mensaje:',
                get('mensaje')
            ].join('\n');

            event.preventDefault();
            window.location.href = `mailto:amusicaljesuscaido@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            const nota = form.querySelector('.form-nota');
            if (nota) {
                nota.textContent = 'Gracias. Se ha abierto tu cliente de correo con el mensaje preparado. Si no ocurre, escríbenos a amusicaljesuscaido@gmail.com.';
            }
        });
    }
});
