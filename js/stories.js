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
   Riquadro sempre verticale (9:16) su ogni dispositivo: i video verticali lo
   riempiono, quelli orizzontali stanno interi e centrati con le fasce sopra e
   sotto (mai tagliati). Solo sugli orizzontali compare un pulsante per lo
   schermo intero, scelto dall'utente: API Fullscreen standard sul <video>
   (requestFullscreen, o webkitRequestFullscreen su Safari desktop meno
   recente), con fallback a webkitEnterFullscreen() — il player nativo di
   Safari iOS, dove requestFullscreen su un elemento non esiste. Mentre si è a
   schermo intero zone di tocco e frecce non reagiscono (i comandi sono quelli
   nativi del player) e la storia non passa alla successiva: uscendo si
   riprende dallo stesso punto.
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
  let stage, video, bars, titleEl, closeBtn, fullscreenBtn;
  let current = 0;
  let fullscreen = false; // true mentre il video è a schermo intero
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
        <button type="button" class="story-fullscreen" aria-label="Guarda a schermo intero" hidden>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
            <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>
          </svg>
        </button>
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
    fullscreenBtn = viewer.querySelector('.story-fullscreen');

    // Zone di tocco inattive a schermo intero (i comandi sono quelli nativi)
    viewer.querySelector('.story-tap--prev').addEventListener('click', () => { if (!fullscreen) prev(); });
    viewer.querySelector('.story-tap--next').addEventListener('click', () => { if (!fullscreen) next(); });
    closeBtn.addEventListener('click', close);
    fullscreenBtn.addEventListener('click', enterFullscreen);

    video.addEventListener('ended', () => {
      setBar(current, 1);
      // A schermo intero non si passa alla storia successiva: uscendo
      // l'utente ritrova quella che stava guardando
      if (!reduceMotion && !fullscreen) next();
    });

    // Uscita dallo schermo intero: API standard (anche con prefisso webkit)
    // e player nativo di iOS hanno eventi diversi
    document.addEventListener('fullscreenchange', onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', onFullscreenChange);
    video.addEventListener('webkitbeginfullscreen', () => setFullscreen(true));
    video.addEventListener('webkitendfullscreen', () => setFullscreen(false));

    // Focus intrappolato nel visore: Tab gira solo fra i suoi pulsanti
    viewer.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const focusables = Array.from(viewer.querySelectorAll('button:not([hidden])'));
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

  /* ---------- Schermo intero (solo video orizzontali) ---------- */
  function enterFullscreen() {
    if (video.requestFullscreen) {
      video.requestFullscreen().catch(() => {});
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.webkitEnterFullscreen) {
      // Safari iOS: apre il player nativo (gli eventi webkitbegin/endfullscreen
      // aggiornano lo stato)
      video.webkitEnterFullscreen();
    }
  }

  function exitFullscreen() {
    const el = document.fullscreenElement || document.webkitFullscreenElement;
    if (el) {
      (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    } else if (video.webkitDisplayingFullscreen && video.webkitExitFullscreen) {
      video.webkitExitFullscreen();
    }
  }

  function onFullscreenChange() {
    const el = document.fullscreenElement || document.webkitFullscreenElement;
    setFullscreen(el === video);
  }

  function setFullscreen(on) {
    if (on === fullscreen) return;
    fullscreen = on;
    // Comandi nativi (play/pausa, timeline) solo a schermo intero
    video.controls = on;
    if (!on) {
      // Si riprende dal punto in cui si era; se il video è finito mentre era
      // a schermo intero resta sulla stessa storia, ferma alla fine
      if (!video.ended) video.play().catch(() => {});
      fullscreenBtn.focus();
    }
  }

  function supportsFullscreen() {
    return !!(video.requestFullscreen || video.webkitRequestFullscreen || video.webkitEnterFullscreen);
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
    fullscreenBtn.hidden = !!v.verticale || !supportsFullscreen();
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
    if (fullscreen) {
      exitFullscreen();
      setFullscreen(false);
    }
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
    // A schermo intero ESC e frecce sono del player (ESC esce dallo schermo
    // intero, non chiude le storie)
    if (!isOpen() || fullscreen) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') next();
    else if (e.key === 'ArrowLeft') prev();
  });

  // Ritorno con back/forward cache: il visore non deve restare aperto
  window.addEventListener('pagehide', close);
}

document.addEventListener('DOMContentLoaded', initStories);
