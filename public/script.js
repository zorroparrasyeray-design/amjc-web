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

    // Animaciones al aparecer desde los lados, respetando prefers-reduced-motion
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reduceMotion && 'IntersectionObserver' in window) {
        const revealTargets = [...document.querySelectorAll([
            '.section-header', '.page-hero .container > *',
            '.card', '.noticia-card', '.concierto-card', '.actualidad-card',
            '.timeline-item', '.historia-card', '.historia-foto',
            '.nombre-text', '.nombre-escudo',
            '.uniformidad-content > *', '.gallery-item',
            '.acompanamiento-col', '.historial-list li',
            '.repertorio-text', '.marcha-card', '.estreno-card', '.marcha-item',
            '.contacto-info', '.contacto-item', '.red-social', '.contacto-cta',
            '.proximos-eventos', '.proximo-card', '.agenda-calendar', '.agenda-event', '.cta-content'
        ].join(', '))];

        if (revealTargets.length) {
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                });
            }, { rootMargin: '0px 0px -60px 0px', threshold: 0.05 });

            const groupIndex = new WeakMap();
            revealTargets.forEach((el) => {
                const parent = el.parentElement;
                const index = groupIndex.get(parent) || 0;
                groupIndex.set(parent, index + 1);
                el.classList.add('reveal', index % 2 === 0 ? 'reveal-left' : 'reveal-right');
                if (index) el.style.setProperty('--reveal-delay', `${Math.min(index, 4) * 0.07}s`);
                revealObserver.observe(el);
            });
        }
    }

    // Agenda 2027: cuenta atrás hasta el Domingo de Ramos y próximo acompañamiento
    const countdown = document.querySelector('[data-countdown]');
    if (countdown) {
        const target = new Date(`${countdown.dataset.countdown}T00:00:00+01:00`);
        const days = Math.ceil((target.getTime() - Date.now()) / 86400000);
        if (days > 1) {
            countdown.textContent = `Domingo de Ramos · ${days} días`;
        } else if (days === 1) {
            countdown.textContent = 'Domingo de Ramos · 1 día';
        } else if (days === 0) {
            countdown.textContent = 'Hoy es Domingo de Ramos';
        } else {
            countdown.textContent = 'Domingo de Ramos 2027';
        }
    }

    // Cuenta atrás de la próxima actuación: la tarjeta se retira el día después
    document.querySelectorAll('[data-cuenta]').forEach((el) => {
        const objetivo = new Date(`${el.dataset.cuenta}T00:00:00+01:00`);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        const dias = Math.round((objetivo.getTime() - hoy.getTime()) / 86400000);
        if (dias > 1) {
            el.textContent = `Faltan ${dias} días`;
        } else if (dias === 1) {
            el.textContent = 'Falta 1 día';
        } else if (dias === 0) {
            el.textContent = 'Es hoy';
        }
        if (dias < 0) {
            el.closest('[data-evento]')?.remove();
        }
    });

    const agendaEvents = [...document.querySelectorAll('.agenda-event[data-date]')];
    if (agendaEvents.length) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const nextEvent = agendaEvents.find((event) => {
            return new Date(`${event.dataset.date}T00:00:00+01:00`) >= today;
        });
        nextEvent?.classList.add('is-next');
    }

    // Agenda: navegación por meses y selección cruzada entre calendario y actos
    const monthPanels = [...document.querySelectorAll('.agenda-month-panel')];
    const monthName = document.getElementById('cal-month-name');
    const monthPrev = document.getElementById('cal-prev');
    const monthNext = document.getElementById('cal-next');
    if (monthPanels.length && monthName && monthPrev && monthNext) {
        let monthIndex = 0;
        const showMonth = (index) => {
            monthIndex = Math.max(0, Math.min(index, monthPanels.length - 1));
            monthPanels.forEach((panel, i) => { panel.hidden = i !== monthIndex; });
            monthName.textContent = monthPanels[monthIndex].dataset.month;
            monthPrev.disabled = monthIndex === 0;
            monthNext.disabled = monthIndex === monthPanels.length - 1;
        };
        monthPrev.addEventListener('click', () => showMonth(monthIndex - 1));
        monthNext.addEventListener('click', () => showMonth(monthIndex + 1));
        showMonth(0);

        const eventDays = [...document.querySelectorAll('.calendar-day-btn[data-date]')];
        const isInView = (element) => {
            const rect = element.getBoundingClientRect();
            return rect.top >= 80 && rect.bottom <= window.innerHeight;
        };

        const selectDate = (date, origin) => {
            const dayButton = eventDays.find((button) => button.dataset.date === date);
            const card = agendaEvents.find((item) => item.dataset.date === date);
            if (!dayButton || !card) return;

            eventDays.forEach((button) => {
                const selected = button === dayButton;
                button.closest('.calendar-day').classList.toggle('is-selected', selected);
                button.setAttribute('aria-pressed', String(selected));
            });
            agendaEvents.forEach((item) => {
                const selected = item === card;
                item.classList.toggle('is-selected', selected);
                if (selected) {
                    item.setAttribute('aria-current', 'true');
                } else {
                    item.removeAttribute('aria-current');
                }
            });

            const panel = dayButton.closest('.agenda-month-panel');
            const panelIndex = monthPanels.indexOf(panel);
            if (panelIndex >= 0 && panelIndex !== monthIndex) showMonth(panelIndex);

            const target = origin === 'calendar' ? card : dayButton;
            if (!isInView(target)) {
                target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
            }

            const focusTarget = origin === 'calendar' ? card.querySelector('.agenda-date') : dayButton;
            focusTarget?.focus({ preventScroll: true });
        };

        eventDays.forEach((button) => {
            button.addEventListener('click', () => selectDate(button.dataset.date, 'calendar'));
        });

        agendaEvents.forEach((card) => {
            card.addEventListener('click', (event) => {
                if (event.target.closest('a')) return;
                selectDate(card.dataset.date, 'event');
            });
        });
    }

    // Portada: fondo de fotos con fundido
    const heroSlideNodes = [...document.querySelectorAll('.hero-slide')];
    if (heroSlideNodes.length > 1) {
        let heroSlides = [];
        let heroIndex = 0;
        let heroTimer = null;
        const showHeroSlide = (index) => {
            if (!heroSlides.length) return;
            heroSlides[heroIndex].classList.remove('is-active');
            heroIndex = index;
            heroSlides[heroIndex].classList.add('is-active');
        };
        const startHeroSlides = () => {
            if (heroTimer || reduceMotion || heroSlides.length < 2) return;
            heroTimer = window.setInterval(() => showHeroSlide((heroIndex + 1) % heroSlides.length), 7000);
        };
        const stopHeroSlides = () => {
            window.clearInterval(heroTimer);
            heroTimer = null;
        };
        // Comprueba cada foto y descarta las que falten, para no dejar huecos
        const checkHeroSlide = (slide) => new Promise((resolve) => {
            const src = slide.dataset.src;
            const cssUrl = (getComputedStyle(slide).backgroundImage.match(/url\(["']?(.*?)["']?\)/) || [])[1];
            const url = src || cssUrl;
            if (!url) { resolve(slide); return; }
            const probe = new Image();
            probe.onload = () => {
                slide.style.backgroundImage = `url("${url}")`;
                resolve(slide);
            };
            probe.onerror = () => {
                slide.remove();
                resolve(null);
            };
            probe.src = url;
        });
        const loadHeroSlides = () => {
            Promise.all(heroSlideNodes.map(checkHeroSlide)).then((result) => {
                heroSlides = result.filter(Boolean);
                if (heroSlides.length < 2) return;
                heroSlides.forEach((slide, i) => slide.classList.toggle('is-active', i === 0));
                heroIndex = 0;
                startHeroSlides();
            });
        };
        if (document.readyState === 'complete') loadHeroSlides();
        else window.addEventListener('load', loadHeroSlides, { once: true });
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) stopHeroSlides();
            else startHeroSlides();
        });
    }

    // Repertorio: buscador de marchas
    const repertorioBuscador = document.getElementById('repertorio-buscar');
    const repertorioLista = document.getElementById('repertorio-lista');
    if (repertorioBuscador && repertorioLista) {
        const repertorioItems = [...repertorioLista.querySelectorAll('.repertorio-item')];
        const repertorioContador = document.getElementById('repertorio-count');
        const repertorioVacio = document.getElementById('repertorio-empty');
        const normalizar = (texto) => texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
        const repertorioTotal = repertorioItems.length;

        repertorioItems.forEach((item) => { item.dataset.busqueda = normalizar(item.textContent); });

        const filtrarRepertorio = () => {
            const consulta = normalizar(repertorioBuscador.value.trim());
            let visibles = 0;
            repertorioItems.forEach((item) => {
                const coincide = !consulta || item.dataset.busqueda.includes(consulta);
                item.hidden = !coincide;
                if (coincide) visibles += 1;
            });
            if (repertorioContador) {
                repertorioContador.textContent = consulta
                    ? `${visibles} de ${repertorioTotal} marchas`
                    : `${repertorioTotal} marchas`;
            }
            if (repertorioVacio) repertorioVacio.hidden = visibles > 0;
        };

        repertorioBuscador.addEventListener('input', filtrarRepertorio);
        filtrarRepertorio();
    }

    // Estrenos: solo se muestran a partir de la fecha indicada en data-publicar
    const estrenosGrid = document.getElementById('estrenos-grid');
    if (estrenosGrid) {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        estrenosGrid.querySelectorAll('[data-publicar]').forEach((card) => {
            const fecha = new Date(`${card.dataset.publicar}T00:00:00`);
            if (Number.isNaN(fecha.getTime()) || fecha > hoy) card.remove();
        });
        if (!estrenosGrid.querySelector('.estreno-card')) {
            document.getElementById('nuevos-estrenos')?.remove();
        }
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

    // Mantener el ancla en su sitio cuando terminan de cargar las fuentes
    if (location.hash.length > 1) {
        let anchorId = location.hash.slice(1);
        try { anchorId = decodeURIComponent(anchorId); } catch { }
        const anchorTarget = document.getElementById(anchorId);
        if (anchorTarget && document.fonts?.ready) {
            document.fonts.ready.then(() => anchorTarget.scrollIntoView());
        }
    }

    // Consentimiento de cookies y carga diferida del vídeo de YouTube
    const COOKIE_CONSENT_KEY = 'amjc-cookie-consent';
    const getCookieConsent = () => {
        try {
            return localStorage.getItem(COOKIE_CONSENT_KEY);
        } catch {
            return null;
        }
    };
    const setCookieConsent = (value) => {
        try {
            localStorage.setItem(COOKIE_CONSENT_KEY, value);
        } catch {
            /* Si el navegador bloquea el almacenamiento, se volverá a preguntar. */
        }
    };

    const cookieBanner = document.createElement('div');
    cookieBanner.className = 'cookie-banner';
    cookieBanner.id = 'cookie-banner';
    cookieBanner.setAttribute('role', 'region');
    cookieBanner.setAttribute('aria-label', 'Aviso de cookies');
    cookieBanner.hidden = true;
    cookieBanner.innerHTML = `
        <div class="cookie-banner-inner">
            <div class="cookie-banner-text">
                <strong>Cookies y vídeo</strong>
                <p>Usamos almacenamiento local técnico necesario para recordar tu elección. Si aceptas, cargaremos el vídeo de YouTube de la portada, que puede instalar cookies de terceros. Puedes rechazarlo y seguir navegando. <a href="cookies.html">Más información sobre cookies</a>.</p>
            </div>
            <div class="cookie-banner-actions">
                <button type="button" class="btn btn-secondary" data-cookie-reject>Rechazar</button>
                <button type="button" class="btn btn-primary" data-cookie-accept>Aceptar</button>
            </div>
        </div>`;
    document.body.appendChild(cookieBanner);

    const showCookieBanner = () => {
        cookieBanner.hidden = false;
        document.body.classList.add('cookie-banner-open');
    };
    const hideCookieBanner = () => {
        cookieBanner.hidden = true;
        document.body.classList.remove('cookie-banner-open');
    };

    // Vídeo de fondo de la sección CTA: solo se carga con consentimiento
    const ctaSection = document.querySelector('.section-cta');
    const ctaVideoBg = ctaSection?.querySelector('.cta-video-bg');
    let ctaVideoLoaded = false;

    const loadCtaVideo = () => {
        if (!ctaSection || !ctaVideoBg || ctaVideoLoaded) return;
        const iframe = ctaVideoBg.querySelector('iframe');
        if (!iframe) return;
        ctaVideoLoaded = true;

        if (iframe.dataset.src) {
            iframe.src = iframe.dataset.src;
            iframe.removeAttribute('data-src');
        }

        const soundToggle = ctaSection.querySelector('.cta-video-sound');
        const soundLabel = soundToggle?.querySelector('.cta-video-sound-label');
        let player = null;
        let soundOn = false;

        const resizeCtaVideo = () => {
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
            if (!window.YT?.Player) return;

            player = new YT.Player(iframe, {
                events: {
                    onReady: (event) => {
                        event.target.mute();
                        if (reduceMotion) {
                            event.target.pauseVideo();
                        } else {
                            event.target.playVideo();
                        }
                        if (soundToggle) {
                            soundToggle.hidden = false;
                            soundToggle.removeAttribute('disabled');
                        }
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
    };

    const applyCookieConsent = (consent) => {
        if (consent === 'accepted') {
            hideCookieBanner();
            loadCtaVideo();
        } else if (consent === 'rejected') {
            hideCookieBanner();
        } else {
            showCookieBanner();
        }
    };

    cookieBanner.querySelector('[data-cookie-accept]')?.addEventListener('click', () => {
        setCookieConsent('accepted');
        applyCookieConsent('accepted');
    });
    cookieBanner.querySelector('[data-cookie-reject]')?.addEventListener('click', () => {
        setCookieConsent('rejected');
        applyCookieConsent('rejected');
    });

    applyCookieConsent(getCookieConsent());

    // Permite cambiar la elección desde la política de cookies
    document.querySelectorAll('[data-cookie-reset]').forEach((button) => {
        button.addEventListener('click', () => {
            try {
                localStorage.removeItem(COOKIE_CONSENT_KEY);
            } catch {
                /* Sin almacenamiento, se volverá a preguntar igualmente. */
            }
            window.location.reload();
        });
    });

    // Noticias desplegables: muestra el contenido completo sin salir de la página
    const noticiaToggles = document.querySelectorAll('.noticia-toggle');
    noticiaToggles.forEach((toggle) => {
        const panelId = toggle.getAttribute('aria-controls');
        const panel = panelId ? document.getElementById(panelId) : null;
        const label = toggle.querySelector('.noticia-toggle-text');
        if (!panel || !label) return;

        toggle.addEventListener('click', () => {
            const isOpen = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', String(!isOpen));
            panel.hidden = isOpen;
            label.textContent = isOpen ? 'Leer noticia completa' : 'Leer menos';
        });
    });

    // Formulario de contacto: abre el programa de correo con la solicitud ya redactada.
    // No se envía nada a servicios externos; el mensaje sale desde la cuenta del usuario.
    const form = document.querySelector('.formulario');
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            if (!form.reportValidity()) return;

            const valor = (id) => form.querySelector('#' + id)?.value.trim() || '';
            const tipo = form.querySelector('#tipo')?.selectedOptions[0]?.textContent.trim() || '';
            const cuerpo = [
                `Nombre: ${valor('nombre')}`,
                `Email: ${valor('email')}`,
                `Teléfono: ${valor('telefono') || 'No indicado'}`,
                `Tipo de consulta: ${tipo || 'No indicado'}`,
                '',
                valor('mensaje')
            ].join('\n');
            const asunto = `Contacto web · ${tipo || 'Consulta'}`;
            const destino = form.dataset.email || 'amusicaljesuscaido@gmail.com';
            const enlace = `mailto:${destino}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;

            window.location.href = enlace;

            const nota = form.querySelector('.form-nota');
            if (nota) {
                nota.textContent = 'Se ha abierto tu programa de correo con la solicitud redactada. Revisa el mensaje y pulsa Enviar.';
            }
        });
    }
});
