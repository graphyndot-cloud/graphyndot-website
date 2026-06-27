// ============================================
// INTERACTIONS GÉNÉRALES
// ============================================

// Menu hamburger mobile
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
    }

    // Fermer le menu au clic sur un lien (mobile)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
            }
        });
    });
});

// Animation au scroll (optionnel)
// Ici vous pouvez ajouter des effets d'apparition avec Intersection Observer