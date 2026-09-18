/* ==========================================================================
   main.js — utility condivise: menu mobile, lightbox galleria, form contatti
   Si auto-inizializza in base a ciò che trova nel DOM, quindi basta
   includerlo in fondo a ogni pagina.
   ========================================================================== */

/* ---------- Menu overlay (hamburger) ----------
   Il markup del menu è iniettato via JS per non duplicarlo in ogni pagina. */
function initMobileMenu() {
  const burger = document.querySelector('.nav-burger');
  if (!burger) return;

  const menu = document.createElement('nav');
  menu.className = 'mobile-menu';
  menu.setAttribute('aria-label', 'Menu principale');
  menu.innerHTML = `
    <a href="index.html">Home</a>
    <a href="chi-sono.html">Chi Sono</a>
    <a href="lavoro.html">Il Mio Lavoro</a>
    <a class="menu-sub" href="foto.html">Foto</a>
    <a class="menu-sub menu-sub2" href="programmi-tv.html">Programmi TV</a>
    <a class="menu-sub menu-sub2" href="celebrazioni.html">Celebrazioni</a>
    <a class="menu-sub menu-sub2" href="eventi.html">Eventi</a>
    <a class="menu-sub menu-sub2" href="sport.html">Sport</a>
    <a class="menu-sub" href="streaming.html">Streaming</a>
    <a class="menu-sub" href="video.html">Video</a>
    <a href="contattami.html">Contattami</a>
  `;
  document.body.appendChild(menu);

  function toggle(open) {
    const isOpen = open !== undefined ? open : !menu.classList.contains('is-open');
    menu.classList.toggle('is-open', isOpen);
    burger.classList.toggle('is-open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
  }

  burger.addEventListener('click', () => toggle());
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggle(false);
  });
}

/* ---------- Lightbox galleria ----------
   Cerca .masonry-item nella pagina; al click apre un lightbox con
   navigazione prev/next, chiusura con ESC o click sullo sfondo. */
function initLightbox() {
  const items = Array.from(document.querySelectorAll('.masonry-item'));
  if (items.length === 0) return;

  // Markup del lightbox iniettato una sola volta
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.innerHTML = `
    <button class="lightbox-close" aria-label="Chiudi">&times;</button>
    <button class="lightbox-prev" aria-label="Foto precedente">&#8249;</button>
    <div class="lightbox-content"></div>
    <button class="lightbox-next" aria-label="Foto successiva">&#8250;</button>
    <div class="lightbox-caption"></div>
  `;
  document.body.appendChild(lb);

  const content = lb.querySelector('.lightbox-content');
  const caption = lb.querySelector('.lightbox-caption');
  let currentIndex = 0;

  function render(index) {
    currentIndex = (index + items.length) % items.length;
    const item = items[currentIndex];
    const img = item.querySelector('img');

    content.innerHTML = '';
    if (img) {
      // Foto reale: la mostriamo a piena dimensione nel lightbox
      const full = document.createElement('img');
      full.src = img.dataset.full || img.src;
      full.alt = img.alt || '';
      full.style.maxWidth = '100%';
      full.style.maxHeight = '100%';
      full.style.objectFit = 'contain';
      content.appendChild(full);
    } else {
      // TODO: sostituire con foto reale — per ora replichiamo il placeholder
      const ph = document.createElement('div');
      ph.className = 'ph';
      ph.textContent = item.querySelector('.ph')?.textContent || 'Foto...';
      content.appendChild(ph);
    }
    caption.textContent = `${currentIndex + 1} / ${items.length}`;
  }

  function open(index) {
    render(index);
    lb.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  items.forEach((item, i) => {
    item.addEventListener('click', () => open(i));
  });

  lb.querySelector('.lightbox-close').addEventListener('click', close);
  lb.querySelector('.lightbox-prev').addEventListener('click', () => render(currentIndex - 1));
  lb.querySelector('.lightbox-next').addEventListener('click', () => render(currentIndex + 1));

  // Click sullo sfondo (fuori dal contenuto) chiude
  lb.addEventListener('click', (e) => {
    if (e.target === lb) close();
  });

  // Tastiera: ESC chiude, frecce navigano
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') render(currentIndex - 1);
    if (e.key === 'ArrowRight') render(currentIndex + 1);
  });
}

/* ---------- Form contatti ----------
   Nessun backend: compone un mailto: con i dati inseriti. */
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = form.querySelector('#nome').value.trim();
    const email = form.querySelector('#email').value.trim();
    const messaggio = form.querySelector('#messaggio').value.trim();

    const subject = encodeURIComponent(`Richiesta dal sito — ${nome}`);
    const body = encodeURIComponent(
      `Nome: ${nome}\nEmail: ${email}\n\n${messaggio}`
    );

    // TODO: sostituire con l'email reale di Samuele
    window.location.href = `mailto:info@samuelecasabianca.it?subject=${subject}&body=${body}`;
  });
}

/* ---------- Sezioni Streaming e Video ----------
   Helper condivisi da streaming.html, video.html e dalle rispettive pagine
   `-watch.html`, che leggono STREAM_DATA / VIDEO_DATA (js/video-data.js).
   Ogni voce senza `src`/`poster` ricade sul segnaposto, così le pagine
   funzionano sia con i contenuti reali sia in attesa che arrivino. */

/* Testo proveniente dal dataset inserito dentro un template HTML: va
   neutralizzato, altrimenti titoli con & o virgolette rompono il markup. */
function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[ch]));
}

/* Miniatura di una card: fotogramma reale se disponibile, altrimenti il
   riquadro tratteggiato di prima. `loading="lazy"` come nelle gallerie. */
function videoThumbHtml(v, baseClass = 'video-thumb') {
  if (!v.poster) return `<div class="${baseClass}">Video...</div>`;
  const vertical = v.verticale ? ' is-vertical' : '';
  return `
    <div class="${baseClass} ${baseClass}--real${vertical}">
      <img src="${escapeHtml(v.poster)}" alt="${escapeHtml(v.titolo)}" loading="lazy">
    </div>`;
}

/* Player della pagina di riproduzione. Niente autoplay e `preload="metadata"`:
   i file sono da decine di MB, così la pagina scarica solo l'intestazione e
   il resto parte al play dell'utente. */
function videoPlayerHtml(v) {
  if (!v.src) {
    return `
      <div class="watch-player">
        <span class="watch-player-icon">&#9654;</span>
        <span class="watch-player-label">Video placeholder</span>
      </div>`;
  }
  const vertical = v.verticale ? ' is-vertical' : '';
  const poster = v.poster ? ` poster="${escapeHtml(v.poster)}"` : '';
  return `
    <div class="watch-player watch-player--real${vertical}">
      <video controls preload="metadata"${poster} playsinline>
        <source src="${escapeHtml(v.src)}" type="video/mp4">
        Il tuo browser non supporta il tag video.
        <a href="${escapeHtml(v.src)}">Scarica il video</a>.
      </video>
    </div>`;
}

/* ---------- Avvio ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initLightbox();
  initContactForm();
});
