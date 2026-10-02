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
    <a class="menu-sub menu-sub2" href="video-eventi.html">Eventi</a>
    <a class="menu-sub menu-sub2" href="video-matrimoni.html">Matrimoni</a>
    <a class="menu-sub menu-sub2" href="video-sport.html">Sport</a>
    <a href="contattami.html">Contattami</a>
  `;
  document.body.appendChild(menu);

  function toggle(open) {
    const isOpen = open !== undefined ? open : !menu.classList.contains('is-open');
    menu.classList.toggle('is-open', isOpen);
    burger.classList.toggle('is-open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    burger.setAttribute('aria-label', isOpen ? 'Chiudi il menu' : 'Apri il menu');
    // Porta la nav (e quindi la X) sopra l'overlay, vedi CSS
    document.body.classList.toggle('menu-open', isOpen);
  }

  burger.addEventListener('click', () => toggle());
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggle(false);
  });
}

/* ---------- Breadcrumb che si adatta alla larghezza ----------
   Su telefono il percorso completo non sta nella nav (es. "Lavoro / Foto /
   Celebrazioni / Matrimoni" in ~200px). Se non sta, i livelli più esterni
   vengono raccolti in "…" partendo da sinistra, solo quanti ne servono. Il
   livello genitore si raccoglie solo se così il nome della pagina corrente
   entra intero (su un titolo lungo di video-watch.html non basterebbe: lì
   il genitore resta e il titolo si accorcia con i puntini, vedi CSS). "…" è
   un link al livello raccolto più vicino, così si può sempre risalire.
   Quando il percorso sta, non cambia nulla. Il percorso completo è nel menu. */
function initBreadcrumb() {
  const bc = document.querySelector('.breadcrumb');
  if (!bc) return;
  const current = bc.querySelector('[aria-current]');
  // Ogni livello superiore è un link seguito dal suo separatore
  const steps = Array.from(bc.querySelectorAll(':scope > a'))
    .map((link) => [link, link.nextElementSibling]);
  if (!current || steps.length < 2) return; // nessun livello da raccogliere

  const more = document.createElement('a');
  more.className = 'breadcrumb-more';
  more.textContent = '…';
  const moreSep = document.createElement('span');
  moreSep.className = 'sep';
  moreSep.textContent = '/';
  bc.prepend(more, moreSep);

  const overflows = () =>
    bc.scrollWidth > bc.clientWidth || current.scrollWidth > current.clientWidth;

  function collapse(count) {
    steps.forEach((step, i) => step.forEach((el) => { el.hidden = i < count; }));
    more.hidden = moreSep.hidden = count === 0;
    if (count > 0) {
      const nearest = steps[count - 1][0];
      more.href = nearest.getAttribute('href');
      more.setAttribute('aria-label', `Torna a ${nearest.textContent.trim()}`);
    }
  }

  function fit() {
    let count = 0;
    collapse(0);
    while (count < steps.length - 1 && overflows()) collapse(++count);
    // Ultima risorsa: via anche il genitore, ma solo se la pagina corrente
    // entra intera; altrimenti meglio tenere il link per tornare su
    if (overflows()) {
      collapse(steps.length);
      if (overflows()) collapse(count);
    }
  }

  fit();
  // Le misure dipendono dai font (Google Fonts arrivano dopo) e dalla finestra
  if (document.fonts) document.fonts.ready.then(fit);
  let frame = 0;
  window.addEventListener('resize', () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(fit);
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
   Helper condivisi da streaming.html, dalle gallerie video (video-eventi,
   video-matrimoni, video-sport) e dalle pagine `-watch.html`, che leggono
   STREAM_DATA / VIDEO_DATA (js/video-data.js).
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
  // `is-vertical` dà al riquadro la proporzione 9:16 (anche al segnaposto),
  // da cui nasce il mosaico irregolare delle griglie
  const vertical = v.verticale ? ' is-vertical' : '';
  if (!v.poster) return `<div class="${baseClass}${vertical}">Video...</div>`;
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

/* Galleria video di una categoria (video-eventi.html, video-matrimoni.html,
   video-sport.html): i riquadri sono generati da VIDEO_DATA filtrato per il
   `data-video-categoria` del contenitore, quindi un video aggiunto al dataset
   compare da solo. Stessa masonry delle gallerie fotografiche; la forma di
   ogni riquadro viene dal campo `verticale` (9:16 o 16:9, come il poster), da
   cui nasce l'impaginazione irregolare. Gli elementi sono link a
   video-watch.html, non `.masonry-item`: il lightbox non li intercetta.
   Solo miniature con `loading="lazy"`: aprendo la galleria non si scarica
   nessun video. */
function initVideoGallery() {
  const gallery = document.querySelector('[data-video-categoria]');
  if (!gallery || typeof VIDEO_DATA === 'undefined') return;

  const categoria = gallery.dataset.videoCategoria;
  const videos = VIDEO_DATA.filter((v) => v.categoria === categoria);

  // Con un solo video (oggi Matrimoni) una colonna su quattro lascerebbe la
  // pagina vuota a destra: il riquadro si allarga, con un tetto (vedi CSS)
  gallery.classList.toggle('is-single', videos.length <= 1);

  if (videos.length === 0) {
    gallery.innerHTML = '<p class="video-gallery-empty">Video in arrivo.</p>';
    return;
  }

  gallery.innerHTML = videos.map((v) => {
    const vertical = v.verticale ? ' is-vertical' : '';
    const thumb = v.poster
      ? `<img src="${escapeHtml(v.poster)}" alt="${escapeHtml(v.titolo)}" loading="lazy">`
      : `<span class="ph">${escapeHtml(v.titolo)}</span>`;
    return `
      <a class="video-tile${vertical}" href="video-watch.html?v=${v.id}&amp;cat=${encodeURIComponent(v.categoria)}">
        ${thumb}
        <span class="video-tile-play" aria-hidden="true"></span>
        <span class="video-tile-duration">${escapeHtml(v.durata)}</span>
      </a>`;
  }).join('');
}

/* ---------- Avvio ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initBreadcrumb();
  initLightbox();
  initContactForm();
  initVideoGallery();
});
