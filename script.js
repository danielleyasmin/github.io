/* ============================================================
   PORTFOLIO — script.js
   Funcionalidades:
   - Navbar scroll
   - Menu mobile
   - Filtro de projetos
   - Modal com embed de Power BI / Looker Studio
   - Scroll reveal
   ============================================================ */

/* ── NAVBAR SCROLL ─────────────────────────────────────────── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

/* ── MENU MOBILE ───────────────────────────────────────────── */
const navToggle  = document.getElementById('navToggle');
const navLinks   = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
});

// Fecha menu ao clicar em link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
  });
});

/* ── ACTIVE NAV LINK (highlight por seção visível) ─────────── */
const sections = document.querySelectorAll('section[id]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.querySelectorAll('a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

/* ── SCROLL REVEAL ─────────────────────────────────────────── */
// Adiciona classe .reveal automaticamente em elementos de seção
const revealTargets = [
  '.sobre-grid > *',
  '.skills-grid > *',
  '.project-card',
  '.contato-item',
  '.contato-text',
  '.section-title',
  '.section-label'
];

revealTargets.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('reveal');
    if (i === 1) el.classList.add('reveal-delay-1');
    if (i === 2) el.classList.add('reveal-delay-2');
    if (i === 3) el.classList.add('reveal-delay-3');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // animação só uma vez
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── FILTRO DE PROJETOS ─────────────────────────────────────── */
const filterBtns   = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Atualiza botão ativo
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach((card, i) => {
      const match = filter === 'all' || card.dataset.category === filter;

      if (match) {
        card.classList.remove('hidden');
        // Pequeno stagger na entrada
        card.style.transitionDelay = `${i * 0.05}s`;
      } else {
        card.classList.add('hidden');
        card.style.transitionDelay = '0s';
      }
    });
  });
});

/* ── MODAL — EMBED DE POWER BI / LOOKER STUDIO ─────────────── */
const modalOverlay = document.getElementById('modalOverlay');
const modalClose   = document.getElementById('modalClose');
const embedFrame   = document.getElementById('embedFrame');
const modalTitle   = document.getElementById('modalTitle');
const modalExternal = document.getElementById('modalExternal');

/**
 * Abre o modal com o embed do projeto clicado.
 * Chamada pelo onclick="openEmbed(this)" nos botões dos cards.
 */
function openEmbed(btn) {
  const card       = btn.closest('.project-card');
  const embedUrl   = card.dataset.embedUrl;
  const projectUrl = card.dataset.projectUrl;
  const title      = card.querySelector('h3')?.textContent || 'Dashboard';
  const hasEmbed   = card.dataset.embed === 'true';

  modalTitle.textContent = title;
  modalExternal.href = projectUrl || embedUrl || '#';

  if (hasEmbed && embedUrl && !embedUrl.includes('SEU_LINK')) {
    // Tem URL real configurada — carrega o iframe
    embedFrame.src = embedUrl;
    embedFrame.style.display = 'block';
    embedFrame.parentElement.style.display = 'block'; // mostra a área do embed
  } else {
    // URL placeholder — abre direto em nova aba
    embedFrame.src = '';
    embedFrame.parentElement.style.display = 'none'; // oculta área do embed
    window.open(projectUrl || '#', '_blank', 'noopener');
    return; // não abre modal se não há embed real
  }

  openModal();
}

function openModal() {
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
  // Limpa iframe após animação para parar carregamento
  setTimeout(() => {
    embedFrame.src = '';
  }, 350);
}

modalClose.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
    closeModal();
  }
});

/* ── SMOOTH SCROLL FALLBACK (Safari antigo) ─────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── DICA: Como adicionar um novo projeto ───────────────────
   1. Copie um bloco <article class="project-card"> do HTML
   2. Edite data-category: "powerbi" | "looker" | "python"
   3. Edite data-embed="true" (embed) ou "false" (botão externo)
   4. Cole sua URL em data-embed-url e data-project-url
   5. Edite o título, descrição e ferramentas no .card-body
   ──────────────────────────────────────────────────────── */
