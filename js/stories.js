/* ==========================================================================
   stories.js — storie video in stile Instagram sopra le gallerie.
   Incluso solo nelle pagine galleria, dopo js/video-data.js.

   Markup richiesto nella pagina:
     <section class="stories" data-categoria="sport" aria-label="..."></section>
   La fila viene riempita con una pallina per ogni voce di VIDEO_DATA con la
   stessa `categoria`; se non ce n'è nessuna mostra un segnaposto "Video in
   arrivo", così l'impaginazione resta identica in tutte le pagine foglia.

   Visore (creato una sola volta, al primo click — prima non esiste nessun
   <video>, quindi aprendo la pagina non si scarica nessun file video):
   - un'unica <video preload="metadata" playsinline> a cui si cambia `src`:
     viene caricato solo il video della storia aperta;
   - una barretta di avanzamento per video, quella in corso si riempie;
   - click/tap sulla metà destra dello schermo = successivo, sinistra =
     precedente (sul primo ricomincia da capo, come Instagram);
   - a fine video parte il successivo, dopo l'ultimo si chiude;
   - X in alto a destra o ESC chiudono, frecce destra/sinistra navigano;
   - mentre è aperto lo scroll è bloccato e il resto della pagina è `inert`
     (nessun click o focus arriva alla galleria, quindi il lightbox non può
     aprirsi sotto una storia).
   Con prefers-reduced-motion: reduce il video aperto parte comunque (è
   un'azione esplicita dell'utente) ma a fine video non si passa da soli al
   successivo: si naviga solo a mano.
   ========================================================================== */

function initStories() {
  const row = document.querySelector('.stories');
  if (!row || typeof VIDEO_DATA === 'undefined') return;

  const categoria = row.dataset.categoria;
  const videos = VIDEO_DATA.filter((v) => v.categoria === categoria && v.src);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Fila di palline ---------- */
  if (videos.length === 0) {
    const ph = document.createElement('div');
    ph.className = 'story story--placeholder';
    ph.innerHTML = `
      <span class="story-ring"><span class="story-thumb">&#9654;</span></span>
      <span class="story-title">Video in arrivo</span>`;
    row.appendChild(ph);
    return;
  }

  videos.forEach((v, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'story';
    btn.setAttribute('aria-label', `Guarda il video: ${v.titolo}`);

    const ring = document.createElement('span');
    ring.className = 'story-ring';
    const img = document.createElement('img');
    img.className = 'story-thumb';
    img.src = v.poster;
    img.alt = '';
    img.loading = 'lazy';
    ring.appendChild(img);

    const title = document.createElement('span');
    title.className = 'story-title';
    title.textContent = v.titolo;

    btn.append(ring, title);
    btn.addEventListener('click', () => open(i, btn));
    row.appendChild(btn);
  });

  /* ---------- Visore (creato al primo uso) ---------- */
  let viewer = null;
  let stage, video, bars, titleEl, closeBtn;
  let current = 0;
  let opener = null;
  let rafId = null;
  let inertEls = [];

  function buildViewer() {
    viewer = document.createElement('div');
    viewer.className = 'story-viewer';
    viewer.setAttribute('role', 'dialog');
    viewer.setAttribute('aria-modal', 'true');
    viewer.setAttribute('aria-label', 'Storie video');
    viewer.innerHTML = `
      <div class="story-stage">
        <video class="story-video" preload="metadata" playsinline></video>
        <div class="story-top">
          <div class="story-bars">${videos.map(() => '<span class="story-bar"><span class="story-bar-fill"></span></span>').join('')}</div>
          <p class="story-caption"></p>
        </div>
      </div>
      <button type="button" class="story-tap story-tap--prev" aria-label="Video precedente"></button>
      <button type="button" class="story-tap story-tap--next" aria-label="Video successivo"></button>
      <button type="button" class="story-close" aria-label="Chiudi le storie">&times;</button>
    `;
    document.body.appendChild(viewer);

    stage = viewer.querySelector('.story-stage');
    video = viewer.querySelector('.story-video');
    bars = Array.from(viewer.querySelectorAll('.story-bar-fill'));
    titleEl = viewer.querySelector('.story-caption');
    closeBtn = viewer.querySelector('.story-close');

    viewer.querySelector('.story-tap--prev').addEventListener('click', prev);
    viewer.querySelector('.story-tap--next').addEventListener('click', next);
    closeBtn.addEventListener('click', close);

    video.addEventListener('ended', () => {
      setBar(current, 1);
      if (!reduceMotion) next();
    });

    // Focus intrappolato nel visore: Tab gira solo fra i suoi pulsanti
    viewer.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const focusables = Array.from(viewer.querySelectorAll('button'));
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  function isOpen() {
    return viewer !== null && viewer.classList.contains('is-open');
  }

  function setBar(i, ratio) {
    bars[i].style.transform = `scaleX(${ratio})`;
  }

  // Barretta della storia in corso: aggiornata a ogni frame (timeupdate
  // scatta solo 4 volte al secondo e il riempimento andrebbe a scatti)
  function tick() {
    if (video.duration > 0) setBar(current, video.currentTime / video.duration);
    rafId = requestAnimationFrame(tick);
  }

  function show(i) {
    current = i;
    const v = videos[i];
    bars.forEach((_, j) => setBar(j, j < i ? 1 : 0));
    titleEl.textContent = v.titolo;
    stage.classList.toggle('is-vertical', !!v.verticale);
    video.poster = v.poster || '';
    video.src = v.src;
    // Apertura = gesto dell'utente, quindi l'audio è consentito; se il
    // browser rifiuta comunque, riproviamo senza audio invece di restare fermi.
    // (AbortError = play interrotto da un cambio di storia: non è un rifiuto.)
    video.play().catch((err) => {
      if (err.name !== 'NotAllowedError') return;
      video.muted = true;
      video.play().catch(() => {});
    });
  }

  function open(i, btn) {
    if (!viewer) buildViewer();
    opener = btn;

    // Resto della pagina inerte: niente click né focus sulla galleria
    inertEls = Array.from(document.body.children).filter((el) => el !== viewer && !el.inert);
    inertEls.forEach((el) => { el.inert = true; });
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    viewer.classList.add('is-open');
    show(i);
    closeBtn.focus();
    if (rafId === null) rafId = requestAnimationFrame(tick);
  }

  function close() {
    if (!isOpen()) return;
    viewer.classList.remove('is-open');
    cancelAnimationFrame(rafId);
    rafId = null;
    // Ferma e interrompe il download del file in corso
    video.pause();
    video.removeAttribute('src');
    video.load();
    video.muted = false;

    inertEls.forEach((el) => { el.inert = false; });
    inertEls = [];
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    if (opener) opener.focus();
  }

  function next() {
    if (current < videos.length - 1) show(current + 1);
    else close();
  }

  function prev() {
    if (current > 0) {
      show(current - 1);
    } else {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  }

  document.addEventListener('keydown', (e) => {
    if (!isOpen()) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') next();
    else if (e.key === 'ArrowLeft') prev();
  });

  // Ritorno con back/forward cache: il visore non deve restare aperto
  window.addEventListener('pagehide', close);
}

document.addEventListener('DOMContentLoaded', initStories);
