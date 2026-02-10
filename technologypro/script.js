// technologyPRO - Script optimisé et performant
// Minimaliste et ultra-rapide

class AssistancheTechpro {
    constructor() {
        this.currentPage = 1;
        this.totalPages = 3;
        this.init();
    }

    init() {
        console.log('🚀 Site chargé');
        this.setupAnimations();
        this.setupMobileMenu();
        this.setupScrollEffects();
        this.setupTestimonialsPagination();
        this.setupPanneForm(); // Ajout de la gestion du formulaire
        this.removeLoader();
    }

    // Navigation fluide
    setupNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (hamburger) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger?.classList.remove('active');
                navMenu?.classList.remove('active');

                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    // Scroll effects - Header shadow
    setupScrollEffects() {
        const header = document.querySelector('.header');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                header?.classList.add('scrolled');
            } else {
                header?.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // Event listeners généraux
    setupEventListeners() {
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            
            if (!hamburger?.contains(e.target) && !navMenu?.contains(e.target)) {
                hamburger?.classList.remove('active');
                navMenu?.classList.remove('active');
            }
        }, { passive: true });

        // Intersection Observer pour animations au scroll
        this.setupIntersectionObserver();
        this.setupDeclarationForm();
    }

    // Formulaire "Déclarer une panne" : validation légère et envoi via mailto
    setupDeclarationForm() {
        const form = document.getElementById('panne-form');
        const feedback = document.getElementById('panne-feedback');
        const clearBtn = document.getElementById('panne-clear');
        const openBtn = document.getElementById('open-panne');

        if (openBtn) {
            openBtn.addEventListener('click', (e) => {
                setTimeout(() => {
                    const target = document.getElementById('panne-nom');
                    target?.focus();
                }, 300);
            });
        }

        // pricing buttons that set assistance type
        document.querySelectorAll('[data-assistance]').forEach(btn => {
            btn.addEventListener('click', (ev) => {
                const type = btn.getAttribute('data-assistance');
                const radio = document.querySelector('input[name="assistance_type"][value="' + (type === 'ponctuelle' ? 'ponctuelle' : 'abonne') + '"]');
                radio?.checked = true;
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => document.getElementById('panne-nom')?.focus(), 600);
            });
        });

        if (!form) return;

        clearBtn?.addEventListener('click', () => {
            form.reset();
            feedback.textContent = '';
            feedback.className = 'form-feedback';
        });

        form.addEventListener('submit', (ev) => {
            ev.preventDefault();
            feedback.className = 'form-feedback';

            const nom = document.getElementById('panne-nom').value.trim();
            const email = document.getElementById('panne-email').value.trim();
            const phone = document.getElementById('panne-phone').value.trim();
            const device = document.getElementById('panne-device').value.trim();
            const os = document.getElementById('panne-os').value.trim();
            const desc = document.getElementById('panne-desc').value.trim();
            const when = document.getElementById('panne-when').value.trim();
            const assistance = form.querySelector('input[name="assistance_type"]:checked')?.value || 'abonne';

            if (!nom || !email || !phone || !device || !desc) {
                feedback.textContent = 'Veuillez remplir les champs obligatoires marqués *.';
                feedback.classList.add('error');
                return;
            }

            const to = 'hello.technology@outlook.fr';
            const subject = `Déclaration de panne — ${nom}`;
            const bodyLines = [];
            bodyLines.push(`Nom: ${nom}`);
            bodyLines.push(`Email: ${email}`);
            bodyLines.push(`Téléphone: ${phone}`);
            if (when) bodyLines.push(`Disponibilité: ${when}`);
            bodyLines.push(`Type d'appareil: ${device}`);
            if (os) bodyLines.push(`Système / OS: ${os}`);
            bodyLines.push(`Type d'assistance: ${assistance === 'ponctuelle' ? 'Assistance ponctuelle — 20€' : 'Abonné — inclus'}`);
            bodyLines.push('--- Description ---');
            bodyLines.push(desc);
            bodyLines.push('--- Fin ---');

            const body = encodeURIComponent(bodyLines.join('\n'));
            const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${body}`;

            window.location.href = mailto;

            feedback.textContent = 'Le formulaire a été préparé pour envoi dans votre client mail. Vérifiez et envoyez.';
            feedback.classList.add('success');
        });
    }

    // Animations au scroll - très performant
    setupIntersectionObserver() {
        if (!('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        document.querySelectorAll('.service-card, .advantage-item, .contact-form-container, .contact-info').forEach(el => {
            observer.observe(el);
        });
    }

    // Pagination des témoignages
    setupTestimonialsPagination() {
        const prevBtn = document.querySelector('.pagination-btn.prev');
        const nextBtn = document.querySelector('.pagination-btn.next');
        const dots = document.querySelectorAll('.pagination-dot');
        const pages = document.querySelectorAll('.testimonials-page');

        if (!prevBtn || !nextBtn || dots.length === 0 || pages.length === 0) return;

        // Fonction pour afficher une page
        const showPage = (pageNumber) => {
            if (pageNumber < 1 || pageNumber > this.totalPages) return;

            // Masquer toutes les pages
            pages.forEach(page => page.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            // Afficher la page sélectionnée (index = pageNumber - 1)
            const pageIndex = pageNumber - 1;
            if (pages[pageIndex]) {
                pages[pageIndex].classList.add('active');
            }
            if (dots[pageIndex]) {
                dots[pageIndex].classList.add('active');
            }

            // Mettre à jour les boutons
            prevBtn.disabled = pageNumber === 1;
            nextBtn.disabled = pageNumber === this.totalPages;

            // Mettre à jour la page courante
            this.currentPage = pageNumber;

            // Animation smooth scroll vers la section
            const testimonialsSection = document.querySelector('.testimonials');
            if (testimonialsSection) {
                testimonialsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        };

        // Écouteurs d'événements pour les boutons
        prevBtn.addEventListener('click', () => {
            showPage(this.currentPage - 1);
        });

        nextBtn.addEventListener('click', () => {
            showPage(this.currentPage + 1);
        });

        // Écouteurs d'événements pour les dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showPage(index + 1);
            });
        });

        // Navigation au clavier
        document.addEventListener('keydown', (e) => {
            const testimonialsSection = document.querySelector('.testimonials');
            const isInTestimonials = testimonialsSection?.contains(document.activeElement);
            
            if (isInTestimonials || e.target.closest('.testimonials')) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    showPage(this.currentPage - 1);
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    showPage(this.currentPage + 1);
                }
            }
        });

        // Touch/swipe support pour mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        const testimonialsContainer = document.querySelector('.testimonials-wrapper');
        
        testimonialsContainer?.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        testimonialsContainer?.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe gauche - page suivante
                    showPage(this.currentPage + 1);
                } else {
                    // Swipe droit - page précédente
                    showPage(this.currentPage - 1);
                }
            }
        }
    }

    // Gestion du formulaire de déclaration de panne
    setupPanneForm() {
        const form = document.getElementById('panne-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const feedback = form.querySelector('.form-feedback') || this.createFeedbackElement(form);
            
            // Désactiver le bouton et afficher le chargement
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            
            try {
                // Récupérer les données du formulaire
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                
                // Créer le contenu de l'email
                const emailContent = this.createEmailContent(data);
                
                // Créer le mailto avec les données
                const mailtoLink = this.createMailtoLink(data, emailContent);
                
                // Ouvrir le client email par défaut
                window.location.href = mailtoLink;
                
                // Afficher le message de succès
                feedback.className = 'form-feedback success';
                feedback.textContent = '✅ Votre déclaration a été préparée ! Veuillez envoyer l\'email qui s\'est ouvert.';
                
                // Réinitialiser le formulaire après un délai
                setTimeout(() => {
                    form.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Envoyer la déclaration';
                }, 2000);
                
            } catch (error) {
                console.error('Erreur lors de l\'envoi:', error);
                feedback.className = 'form-feedback error';
                feedback.textContent = '❌ Erreur lors de l\'envoi. Veuillez réessayer.';
                
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Envoyer la déclaration';
            }
        });
    }

    createEmailContent(data) {
        return `
DÉCLARATION DE PANNE
=====================================

INFORMATIONS CLIENT
------------------
Nom complet: ${data.nom}
Email: ${data.email}
Téléphone: ${data.telephone}
Adresse: ${data.adresse || 'Non spécifiée'}

DÉTAILS TECHNIQUES
-------------------
Type d'appareil: ${data.appareil}
Système d'exploitation: ${data.os || 'Non spécifié'}

DESCRIPTION DU PROBLÈME
-----------------------
${data.description}

TYPE D'ASSISTANCE
------------------
${data.assistance_type === 'abonne' ? 'Abonné (inclus dans l\'abonnement)' : 'Assistance ponctuelle - 20€ par intervention'}

PLAGE HORAIRE SOUHAITÉE
-------------------------
${data.plage_horaire || 'Non spécifiée'}

PIÈCES JOINTES
---------------
${data.fichier ? 'Des captures d\'écran ont été jointes' : 'Aucune pièce jointe'}

---
Envoyé le: ${new Date().toLocaleString('fr-FR')}
Support Informatique à Distance
        `.trim();
    }

    createMailtoLink(data, emailContent) {
        const email = 'latdieye0@gmail.com'; // Email de destination
        const subject = encodeURIComponent(`Déclaration de panne - ${data.nom} - ${data.appareil}`);
        const body = encodeURIComponent(emailContent);
        
        return `mailto:${email}?subject=${subject}&body=${body}`;
    }

    createFeedbackElement(form) {
        const feedback = document.createElement('div');
        feedback.className = 'form-feedback';
        form.appendChild(feedback);
        return feedback;
    }

    // Retire le loader
    removeLoader() {
        window.addEventListener('load', () => {
            const loader = document.querySelector('.page-loader');
            if (loader) {
                loader.style.opacity = '0';
                loader.style.pointerEvents = 'none';
                loader.style.transition = 'opacity 0.3s ease';
                setTimeout(() => loader.remove(), 300);
            }
        });
    }
}

// Initialisation au chargement du DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new AssistancheTechpro();
    });
} else {
    new AssistancheTechpro();
}
