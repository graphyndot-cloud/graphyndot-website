// ============================================
// loadData.js - Version CORRIGÉE (Robuste)
// ============================================

// ----- DONNÉES INTÉGRÉES (FALLBACK) -----
const fallbackData = {
    team: [
        { prenom: "Yv", nom: "Laroch", role: "Creative Director / Founder", photo: "images/team/yv-laroch.jpg" },
        { prenom: "Mihamintsoa", nom: "Miha", role: "Executive Producer / Head of Production", photo: "images/team/miha.jpg" },
        { prenom: "Andoni", nom: "", role: "Art Director / Visual Production Lead", photo: "images/team/andoni.jpg" },
        { prenom: "Sarah", nom: "", role: "Narrative & Script Lead", photo: "images/team/sarah.jpg" },
        { prenom: "Andry", nom: "Ramaniraka", role: "Video Production & Postproduction Lead", photo: "images/team/andry.jpg" },
        { prenom: "Safidy", nom: "", role: "3D & Technical Art Lead", photo: "images/team/safidy.jpg" },
        { prenom: "Vonjy", nom: "", role: "Multimedia Artist", photo: "images/team/vonjy.jpg" },
        { prenom: "Liantsoa", nom: "Lia", role: "Graphic Designer / Visual Communication Artist", photo: "images/team/lia.jpg" },
        { prenom: "Nasandratra", nom: "Nasa", role: "Graphic & Postproduction Artist", photo: "images/team/nasa.jpg" },
        { prenom: "Kezia", nom: "", role: "Production Management / Financial & Creative Support", photo: "images/team/kezia.jpg" }
    ],
    services: [
        { nom: "CGI", icon: "fa-cubes", description: "Images de synthèse et rendu 3D photoréaliste." },
        { nom: "VFX", icon: "fa-film", description: "Effets visuels, compositing et intégration." },
        { nom: "2D Animation", icon: "fa-pen-fancy", description: "Animation traditionnelle et vectorielle." },
        { nom: "3D Animation", icon: "fa-cube", description: "Animation 3D, rigging et character design." },
        { nom: "Motion Design", icon: "fa-bolt", description: "Motion graphics, typographie animée." },
        { nom: "Graphic Design", icon: "fa-palette", description: "Design graphique, affiches, identités visuelles." },
        { nom: "Branding", icon: "fa-tag", description: "Stratégie de marque et identité corporate." },
        { nom: "Visual Communication", icon: "fa-eye", description: "Infographies et communication visuelle." },
        { nom: "Video Editing", icon: "fa-video", description: "Montage vidéo et post-production." },
        { nom: "Film Production", icon: "fa-clapperboard", description: "Production audiovisuelle et réalisation." },
        { nom: "Story Development", icon: "fa-book-open", description: "Développement de scénarios et storytelling." },
        { nom: "Training", icon: "fa-graduation-cap", description: "Formation aux métiers de l'image et du 3D." },
        { nom: "Consulting", icon: "fa-handshake", description: "Conseil en production créative et stratégie visuelle." }
    ],
    portfolio: [
        { titre: "Projet FITO", categorie: "VFX", description: "Court-métrage d'animation mêlant effets visuels et narration immersive.", logiciels: ["Blender", "After Effects", "DaVinci Resolve"], image: "images/portfolio/fito.jpg", credits: "Réalisation : Yv Laroch" },
        { titre: "Ville Future", categorie: "CGI", description: "Architecture futuriste modélisée et rendue sous Blender.", logiciels: ["Blender", "Photoshop"], image: "images/portfolio/ville-future.jpg", credits: "Modélisation : Safidy" },
        { titre: "Identité GraphyNdot", categorie: "Graphic Design", description: "Création de l'identité visuelle complète du studio.", logiciels: ["Figma", "Illustrator"], image: "images/portfolio/branding.jpg", credits: "Design : Liantsoa" },
        { titre: "Animation Explosive", categorie: "Motion Design", description: "Animation de particules et effets dynamiques.", logiciels: ["After Effects", "Blender"], image: "images/portfolio/motion.jpg", credits: "Animation : Vonjy" },
        { titre: "Forêt Magique", categorie: "3D Animation", description: "Environnement forestier fantastique en 3D.", logiciels: ["Blender", "Substance Painter"], image: "images/portfolio/foret.jpg", credits: "Environnement : Safidy" },
        { titre: "Documentaire Océan", categorie: "Video Editing", description: "Montage et étalonnage pour un documentaire naturaliste.", logiciels: ["DaVinci Resolve"], image: "images/portfolio/ocean.jpg", credits: "Montage : Andry Ramaniraka" }
    ],
    projects: {
        featured: {
            titre: "FITO",
            type: "Court-métrage d'animation",
            statut: "En production",
            description: "FITO est un projet d'animation qui explore les thèmes de l'identité et de la résilience à travers un univers visuel unique.",
            image: "images/projets/fito-banner.jpg",
            equipe: ["Yv Laroch", "Sarah", "Safidy"]
        },
        upcoming: [
            { titre: "Projet X", type: "Série animée", description: "Une série courte explorant des mondes parallèles." },
            { titre: "Madagascar 2099", type: "CGI / Concept Art", description: "Réinterprétation futuriste de paysages malgaches." },
            { titre: "Le Rêveur", type: "Court-métrage", description: "Histoire poétique sur le pouvoir de l'imagination." }
        ]
    }
};

// ----- FONCTION POUR CHARGER LES DONNÉES (avec fallback) -----
async function loadData(collection) {
    try {
        const response = await fetch(`_data/${collection}.json`);
        if (response.ok) {
            const data = await response.json();
            console.log(`✅ Données ${collection} chargées depuis le CMS`);
            return data;
        }
    } catch (error) {
        console.log(`ℹ️ Pas de données CMS pour ${collection}, utilisation du fallback`);
    }
    return fallbackData[collection] || [];
}

// ----- FONCTIONS D'AFFICHAGE -----
async function loadTeamPreview() {
    const container = document.getElementById('teamPreview');
    if (!container) return;
    const members = await loadData('team');
    container.innerHTML = members.slice(0, 4).map(m => `
        <div class="team-card">
            <img src="${m.photo || 'images/team/default.jpg'}" alt="${m.prenom} ${m.nom}" />
            <h4>${m.prenom} ${m.nom}</h4>
            <p class="role">${m.role}</p>
        </div>
    `).join('');
}

async function loadFullTeam() {
    const container = document.getElementById('fullTeamGrid');
    if (!container) {
        console.warn('fullTeamGrid non trouvé sur cette page');
        return;
    }
    const members = await loadData('team');
    container.innerHTML = members.map(m => `
        <div class="team-card">
            <img src="${m.photo || 'images/team/default.jpg'}" alt="${m.prenom} ${m.nom}" />
            <h4>${m.prenom} ${m.nom}</h4>
            <p class="role">${m.role}</p>
        </div>
    `).join('');
    console.log(`✅ Équipe affichée (${members.length} membres)`);
}

async function loadServicesPreview() {
    const container = document.getElementById('serviceGrid');
    if (!container) return;
    const services = await loadData('services');
    container.innerHTML = services.slice(0, 6).map(s => `
        <div class="service-card">
            <i class="fas ${s.icon}" style="font-size:2.5rem; color:var(--accent-blue); margin-bottom:1rem;"></i>
            <h4>${s.nom}</h4>
            <p style="color:var(--text-secondary); font-size:0.9rem;">${s.description}</p>
        </div>
    `).join('');
}

async function loadFullServices() {
    const container = document.getElementById('fullServicesGrid');
    if (!container) {
        console.warn('fullServicesGrid non trouvé sur cette page');
        return;
    }
    const services = await loadData('services');
    container.innerHTML = services.map(s => `
        <div class="service-card">
            <i class="fas ${s.icon}" style="font-size:2.5rem; color:var(--accent-blue); margin-bottom:1rem;"></i>
            <h4>${s.nom}</h4>
            <p style="color:var(--text-secondary); font-size:0.95rem;">${s.description}</p>
        </div>
    `).join('');
    console.log(`✅ Services affichés (${services.length} services)`);
}

async function loadPortfolio() {
    const container = document.getElementById('portfolioGrid');
    if (!container) {
        console.warn('portfolioGrid non trouvé sur cette page');
        return;
    }
    const items = await loadData('portfolio');
    container.innerHTML = items.map(item => `
        <div class="portfolio-item" data-category="${item.categorie}">
            <img src="${item.image || 'images/placeholder.jpg'}" alt="${item.titre}" />
            <div style="padding:1.5rem;">
                <span style="color:var(--accent-blue); font-size:0.8rem; text-transform:uppercase;">${item.categorie}</span>
                <h4 style="margin:0.5rem 0;">${item.titre}</h4>
                <p style="color:var(--text-secondary); font-size:0.9rem;">${item.description}</p>
                <p style="color:var(--text-muted); font-size:0.8rem; margin-top:0.5rem;"><strong>Logiciels :</strong> ${item.logiciels.join(', ')}</p>
                <p style="color:var(--text-muted); font-size:0.8rem;">${item.credits}</p>
            </div>
        </div>
    `).join('');
    console.log(`✅ Portfolio affiché (${items.length} projets)`);
}

async function loadProjects() {
    const featuredContainer = document.getElementById('featuredProject');
    const upcomingContainer = document.getElementById('upcomingProjects');

    if (!featuredContainer && !upcomingContainer) {
        console.warn('Conteneurs projects non trouvés sur cette page');
        return;
    }

    const data = await loadData('projects');
    const featured = data.featured || fallbackData.projects.featured;
    const upcoming = data.upcoming || fallbackData.projects.upcoming;

    if (featuredContainer) {
        featuredContainer.innerHTML = `
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:2rem; align-items:center;">
                <div>
                    <span style="color:var(--accent-blue); text-transform:uppercase; font-weight:600;">${featured.type}</span>
                    <h2 style="font-size:2.5rem; color:#fff;">${featured.titre}</h2>
                    <p style="color:var(--text-secondary);">${featured.description}</p>
                    <p style="margin-top:1rem;"><strong>Équipe :</strong> ${featured.equipe.join(', ')}</p>
                    <span style="display:inline-block; background:var(--accent-purple); color:#fff; padding:0.2rem 1rem; border-radius:20px; font-size:0.8rem; margin-top:0.5rem;">${featured.statut}</span>
                </div>
                <div><img src="${featured.image || 'images/placeholder.jpg'}" alt="${featured.titre}" style="width:100%; border-radius:12px;" /></div>
            </div>
        `;
        console.log('✅ Projet vedette affiché');
    }

    if (upcomingContainer) {
        upcomingContainer.innerHTML = upcoming.map(p => `
            <div style="background:var(--bg-card); border:1px solid var(--border-color); border-radius:12px; padding:1.5rem;">
                <h4 style="color:#fff;">${p.titre}</h4>
                <span style="color:var(--accent-blue); font-size:0.8rem;">${p.type}</span>
                <p style="color:var(--text-secondary); font-size:0.9rem; margin-top:0.5rem;">${p.description}</p>
            </div>
        `).join('');
        console.log('✅ Projets à venir affichés');
    }
}

// ----- FILTRAGE PORTFOLIO -----
function setupPortfolioFilters() {
    const btns = document.querySelectorAll('.filter-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            document.querySelectorAll('.portfolio-item').forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// ============================================
// INITIALISATION ROBUSTE (basée sur les ID)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 loadData.js initialisé');

    // Détection automatique basée sur les conteneurs présents
    if (document.getElementById('teamPreview')) loadTeamPreview();
    if (document.getElementById('fullTeamGrid')) loadFullTeam();
    if (document.getElementById('serviceGrid')) loadServicesPreview();
    if (document.getElementById('fullServicesGrid')) loadFullServices();
    if (document.getElementById('portfolioGrid')) {
        loadPortfolio();
        setupPortfolioFilters();
    }
    if (document.getElementById('featuredProject') || document.getElementById('upcomingProjects')) {
        loadProjects();
    }

    console.log('✅ loadData.js terminé');
});
