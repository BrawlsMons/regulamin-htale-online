/**
 * HTALE.ONLINE — Oficjalny Skrypt Wiki
 * Obsługa wyszukiwarki, filtrów, animacji, cząsteczek Canvas i audio SFX
 */

// ============================================================
// 1. DŹWIĘKI SYSTEMOWE (WEB AUDIO API SYNTHESIZER)
// ============================================================
class SoundEffects {
  constructor() {
    this.enabled = true;
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
  }

  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(850, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playSuccess() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
    osc.frequency.setValueAtTime(783.99, now + 0.16); // G5

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.28);
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }
}

const sfx = new SoundEffects();

// ============================================================
// 2. TŁO CZĄSTECZEK (CANVAS PARTICLES)
// ============================================================
function initParticles() {
  const canvas = document.getElementById('canvas-particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.floor((width * height) / 18000);
  const particles = [];

  const colors = [
    'rgba(245, 158, 11, ', // Złoty
    'rgba(56, 189, 248, ',  // Błękitny
    'rgba(192, 132, 252, ', // Fioletowy
    'rgba(239, 68, 68, '    // Rubinowy
  ];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.6 + 0.2,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.5 - 0.2,
      pulse: Math.random() * 0.02
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let p of particles) {
      p.x += p.speedX;
      p.y += p.speedY;
      p.alpha += p.pulse;

      if (p.alpha > 0.8 || p.alpha < 0.2) {
        p.pulse = -p.pulse;
      }

      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.shadowBlur = 8;
      ctx.shadowColor = p.color + '0.5)';
      ctx.fill();
    }

    requestAnimationFrame(render);
  }

  render();
}

// ============================================================
// 3. POWIADOMIENIA TOAST & KOPIOWANIE DO SCHOWKA
// ============================================================
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  sfx.playSuccess();

  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

function copyToClipboard(text, customMessage) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(customMessage || `Skopiowano: ${text}`);
  }).catch(() => {
    // Fallback dla starszych przeglądarek
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast(customMessage || `Skopiowano: ${text}`);
  });
}

// ============================================================
// 4. WYSZUKIWARKA NA ŻYWO (INSTANT SEARCH)
// ============================================================
function initSearch() {
  const searchInput = document.getElementById('global-search');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const searchableCards = document.querySelectorAll('[data-searchable]');

    searchableCards.forEach((card) => {
      const searchTarget = card.getAttribute('data-searchable').toLowerCase();
      const textContent = card.textContent.toLowerCase();

      if (!query || searchTarget.includes(query) || textContent.includes(query)) {
        card.style.display = '';
        card.style.animation = 'fadeSlideUp 0.3s ease forwards';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

// ============================================================
// 5. FILTROWANIE PRZEDMIOTÓW (ITEM CATEGORIES)
// ============================================================
function initItemFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const itemCards = document.querySelectorAll('.item-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      sfx.playClick();
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      itemCards.forEach((card) => {
        const itemCat = card.getAttribute('data-item-category');
        if (category === 'all' || itemCat === category) {
          card.style.display = '';
          card.style.animation = 'fadeSlideUp 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ============================================================
// 6. FILTROWANIE ROZDZIAŁÓW KODEKSU (LAW CHAPTER FILTERS)
// ============================================================
function initLawFilters() {
  const lawFilterBtns = document.querySelectorAll('.law-filter-btn');
  const lawChapters = document.querySelectorAll('.law-chapter-block');

  if (!lawFilterBtns.length) return;

  lawFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      sfx.playClick();
      lawFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const chapter = btn.getAttribute('data-law-chapter');

      lawChapters.forEach((block) => {
        const blockChapter = block.getAttribute('data-chapter-id');
        if (chapter === 'all' || blockChapter === chapter) {
          block.style.display = '';
          block.style.animation = 'fadeSlideUp 0.35s ease forwards';
        } else {
          block.style.display = 'none';
        }
      });
    });
  });
}

// ============================================================
// 7. KALKULATOR POZIOMU MIASTA (TOWN LEVEL CALCULATOR)
// ============================================================
function initTownCalculator() {
  const residentsInput = document.getElementById('calc-residents');
  if (!residentsInput) return;

  const resultTitle = document.getElementById('calc-title');
  const resultMayor = document.getElementById('calc-mayor');
  const resultBlocks = document.getElementById('calc-blocks');
  const resultOutposts = document.getElementById('calc-outposts');

  const levels = [
    { min: 12, title: 'Metropolia', mayor: 'Książę', blocks: 384, outposts: 6 },
    { min: 8,  title: 'Wielkie Miasto', mayor: 'Hrabia', blocks: 256, outposts: 5 },
    { min: 6,  title: 'Miasto', mayor: 'Baron', blocks: 192, outposts: 4 },
    { min: 4,  title: 'Miasteczko', mayor: 'Burmistrz', blocks: 128, outposts: 3 },
    { min: 2,  title: 'Wioska', mayor: 'Wójt', blocks: 64, outposts: 2 },
    { min: 1,  title: 'Osada', mayor: 'Sołtys', blocks: 32, outposts: 1 },
    { min: 0,  title: 'Ruiny', mayor: 'Duch', blocks: 1, outposts: 0 }
  ];

  function calculate() {
    const val = parseInt(residentsInput.value) || 0;
    const current = levels.find((lvl) => val >= lvl.min) || levels[levels.length - 1];

    if (resultTitle) resultTitle.textContent = current.title;
    if (resultMayor) resultMayor.textContent = current.mayor;
    if (resultBlocks) resultBlocks.textContent = `${current.blocks} działek (${current.blocks * 256} bloków)`;
    if (resultOutposts) resultOutposts.textContent = `${current.outposts} posterunków`;
  }

  residentsInput.addEventListener('input', calculate);
  calculate();
}

// ============================================================
// 7. OBSŁUGA BOCZNEGO MENU (SCROLLSPY & MOBILE)
// ============================================================
function initScrollSpy() {
  const sections = document.querySelectorAll('.wiki-section');
  const sidebarItems = document.querySelectorAll('.sidebar-item');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    sidebarItems.forEach((item) => {
      item.classList.remove('active');
      const link = item.querySelector('a');
      if (link && link.getAttribute('href') === `#${currentId}`) {
        item.classList.add('active');
      }
    });
  });
}

// ============================================================
// INICJALIZACJA PO ZAŁADOWANIU DOM
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initSearch();
  initItemFilters();
  initLawFilters();
  initTownCalculator();
  initScrollSpy();

  // Kopiowanie IP serwera
  const copyIpBtn = document.getElementById('btn-copy-ip');
  if (copyIpBtn) {
    copyIpBtn.addEventListener('click', () => {
      copyToClipboard('play.htale.online', 'Skopiowano adres IP serwera: play.htale.online');
    });
  }

  // Przełącznik dźwięków
  const soundBtn = document.getElementById('btn-toggle-sound');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      const active = sfx.toggle();
      soundBtn.style.color = active ? 'var(--accent-gold)' : 'var(--text-dark)';
      showToast(active ? 'Dźwięki interfejsu włączone' : 'Dźwięki interfejsu wyłączone');
    });
  }

  // Kliknięcie w przyciski kopiowania komend
  document.querySelectorAll('.btn-copy-cmd').forEach((btn) => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (cmd) {
        copyToClipboard(cmd, `Skopiowano komendę: ${cmd}`);
      }
    });
  });

  // Mobilne menu
  const hamburgerBtn = document.getElementById('btn-hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', () => {
      sfx.playClick();
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.left = '0';
      navLinks.style.width = '100%';
      navLinks.style.background = 'rgba(10, 12, 16, 0.95)';
      navLinks.style.padding = '1.5rem';
      navLinks.style.borderBottom = '1px solid var(--border-glass)';
    });
  }
});
