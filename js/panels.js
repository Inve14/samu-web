/* ==========================================================================
   panels.js — componente riutilizzabile "pannelli verticali"
   Uso: in ogni pagina che contiene un <div class="panels"> con dentro
   elementi <a class="panel"> chiamare initVerticalPanels().

   Cosa fa per ogni pannello:
   1. Genera una serie di slide di sfondo (4-5 placeholder, oppure foto reali
      se il pannello ha l'attributo data-images="url1,url2,..."). Da fermo si
      vede una singola slide statica (nessuna transizione). Durante l'hover
      (o il focus da tastiera) le slide si alternano con una dissolvenza
      incrociata (crossfade via CSS `transition: opacity` sulla classe
      `.is-active`, cambiata a intervalli regolari da un `setInterval` creato
      su mouseenter/focus e distrutto su mouseleave/blur) — niente CSS
      `:hover`/`:focus-visible` diretto sull'animazione, per evitare che resti
      "accesa" per stati di focus/hover non più validi (es. un pannello che
      resta focused dopo un click, o lo stato ereditato da bfcache). Appena il
      cursore esce il crossfade si ferma sulla slide corrente (nessun ritorno
      forzato alla prima). I pannelli con classe `panel--static` (es.
      Contattami) non hanno questo effetto: restano su un singolo placeholder
      statico anche in hover.
   2. Transizione di USCITA: al click il pannello si espande fino a coprire
      lo schermo, poi avviene la navigazione reale.
   3. Transizione di INGRESSO: al caricamento i pannelli si "aprono" con uno
      split animato (orizzontale su desktop, verticale su mobile).
   L'effetto hover-expand è gestito interamente dal CSS (flex-grow).
   Con prefers-reduced-motion: reduce il crossfade non parte nemmeno in hover
   e le transizioni 2 e 3 sono disattivate.
   Stili delle transizioni: css/style.css, sezione "Transizioni pannelli".
   ========================================================================== */

/**
 * Inizializza tutti i componenti .panels presenti nella pagina.
 * @param {Object} [options]
 * @param {number} [options.slideCount=5]         - numero di slide placeholder per pannello
 * @param {number} [options.crossfadeInterval=1.8] - intervallo (s) tra un cambio slide e il successivo durante l'hover
 */
function initVerticalPanels(options = {}) {
  const slideCount = options.slideCount || 5;
  const crossfadeInterval = options.crossfadeInterval || 1.8;

  const container = document.querySelector('.panels');
  if (!container) return;
  const panels = Array.from(container.querySelectorAll('.panel'));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Un pannello -> l'id del suo setInterval di crossfade attivo, solo mentre
  // in hover/focus. Serve per poterli spegnere tutti in un colpo solo dal
  // listener pageshow (bfcache), vedi sotto.
  const activeCrossfades = new Map();

  /* ---------- Slide di sfondo per ogni pannello ---------- */
  panels.forEach((panel) => {
    // Contenitore delle slide, inserito prima del titolo
    const slidesWrap = document.createElement('div');
    slidesWrap.className = 'panel-slides';
    slidesWrap.setAttribute('aria-hidden', 'true');
    panel.prepend(slidesWrap);

    // Pannelli statici (es. Contattami): un solo placeholder, nessun crossfade.
    const isStatic = panel.classList.contains('panel--static');

    // TODO: sostituire con foto reali — quando arriveranno le immagini,
    // aggiungere al pannello l'attributo data-images="percorso1.jpg,percorso2.jpg,..."
    // e le slide useranno le foto al posto dei placeholder.
    const images = (panel.dataset.images || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const total = isStatic ? 1 : (images.length > 0 ? images.length : slideCount);
    if (total === 0) return;

    const slides = [];
    for (let i = 0; i < total; i++) {
      const slide = document.createElement('div');
      slide.className = 'panel-slide';

      if (images.length > 0) {
        // Foto reale come background (cover, centrata)
        slide.style.backgroundImage = `url("${images[i]}")`;
      } else {
        // Placeholder: tonalità di grigio leggermente diverse
        slide.classList.add('ph');
        slide.style.background = `hsl(240 5% ${9 + i * 4}%)`;
        slide.textContent = `Foto ${i + 1}`;
      }

      slidesWrap.appendChild(slide);
      slides.push(slide);
    }

    // Prima slide subito visibile e ferma
    slides[0].classList.add('is-active');

    // Avvio/arresto del crossfade: esclusivamente mouseenter/mouseleave
    // (+ focus/blur per l'accessibilità da tastiera), mai CSS :hover/:focus-visible
    // diretto sull'animazione — così lo stato è sempre quello reale del
    // cursore/focus corrente, niente ereditato da bfcache o da un click
    // precedente che ha lasciato il pannello "focused".
    if (!isStatic && !reduceMotion && slides.length > 1) {
      let current = 0;

      const start = () => {
        if (activeCrossfades.has(panel)) return; // già in corso
        const id = setInterval(() => {
          slides[current].classList.remove('is-active');
          current = (current + 1) % slides.length;
          slides[current].classList.add('is-active');
        }, crossfadeInterval * 1000);
        activeCrossfades.set(panel, id);
      };

      const stop = () => {
        const id = activeCrossfades.get(panel);
        if (id === undefined) return;
        clearInterval(id);
        activeCrossfades.delete(panel);
        // Si ferma sulla slide corrente: nessun ritorno forzato alla prima.
      };

      panel.addEventListener('mouseenter', start);
      panel.addEventListener('mouseleave', stop);
      panel.addEventListener('focus', start);
      panel.addEventListener('blur', stop);
    }
  });

  /* ---------- Transizioni di pagina (ingresso + uscita) ---------- */
  if (reduceMotion || panels.length === 0) return;

  const playEntry = setupPanelsEntry(container, panels);
  const resetExit = setupPanelsExit(container, panels);

  // Tornando indietro col browser la pagina può arrivare dalla back/forward
  // cache ancora nello stato "in uscita": lo ripuliamo e rigiochiamo lo split.
  // Il reset di `resetExit()` è essenziale — senza, il flag `leaving` interno
  // a setupPanelsExit resterebbe bloccato a `true` per sempre (la closure
  // sopravvive intatta nella bfcache) e nessun pannello risponderebbe più ai
  // click finché non si ricarica manualmente la pagina.
  window.addEventListener('pageshow', (event) => {
    if (!event.persisted) return;
    document.body.classList.remove('is-leaving');
    container.classList.remove('panels--leaving');
    document.querySelectorAll('.panel-expander, .panels-cover').forEach((el) => el.remove());
    // Se un crossfade era attivo (mouse/focus sopra un pannello quando si è
    // navigato via), il suo setInterval resta agganciato in memoria dalla
    // bfcache esattamente com'era — senza un nuovo mouseleave/blur nessuno lo
    // spegnerebbe mai, e continuerebbe a cambiare slide anche senza hover.
    activeCrossfades.forEach((id) => clearInterval(id));
    activeCrossfades.clear();
    resetExit();
    playEntry();
  });
}

/* ==========================================================================
   Transizione di INGRESSO: i pannelli partono "chiusi" (scale 0) dietro una
   cover a schermo pieno, poi si aprono in sequenza con un leggero stagger.
   La cover usa il colore dell'ultimo pannello cliccato (salvato in
   sessionStorage dalla pagina di partenza) così le due metà dell'animazione
   sembrano un unico movimento continuo.
   Ritorna la funzione play() per poterla rigiocare (back/forward cache).
   ========================================================================== */
function setupPanelsEntry(container, panels) {
  const STAGGER_MS = 70;  // ritardo tra un pannello e il successivo
  const OPEN_MS = 500;    // durata apertura singolo pannello (= transition CSS)
  const totalMs = 60 + panels.length * STAGGER_MS + OPEN_MS;

  function play() {
    container.classList.add('panels--entering');
    panels.forEach((p) => p.classList.add('panel--closed'));
    container.getBoundingClientRect(); // reflow: stato chiuso applicato subito
    panels.forEach((p, i) => {
      setTimeout(() => p.classList.remove('panel--closed'), 60 + i * STAGGER_MS);
    });
    setTimeout(() => container.classList.remove('panels--entering'), totalMs);
  }

  // Stato iniziale chiuso fin dal primo paint (questo script gira in fondo
  // al body, prima del primo render)
  container.classList.add('panels--entering');
  panels.forEach((p) => p.classList.add('panel--closed'));

  const splash = document.querySelector('.splash');
  const storedBg = sessionStorage.getItem('sc-panel-bg');
  sessionStorage.removeItem('sc-panel-bg');

  // Cover dietro ai pannelli (inserita PRIMA del container così i pannelli
  // le si dipingono sopra). Non serve se c'è lo splash: copre già lui.
  let cover = null;
  if (!splash) {
    cover = document.createElement('div');
    cover.className = 'panels-cover';
    if (storedBg) cover.style.background = storedBg;
    document.body.insertBefore(cover, container);
  }

  function firstPlay() {
    play();
    if (cover) {
      setTimeout(() => {
        cover.style.opacity = '0';
        setTimeout(() => cover.remove(), 400);
      }, totalMs);
    }
  }

  if (splash) {
    // Sulla home lo split parte nel momento in cui lo splash inizia il
    // fade-out (evento emesso da js/splash.js), con fallback di sicurezza
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      firstPlay();
    };
    document.addEventListener('sc:splash-hiding', start, { once: true });
    setTimeout(start, 6000);
  } else {
    firstPlay();
  }

  return play;
}

/* ==========================================================================
   Transizione di USCITA: al click viene creato un clone visivo del pannello
   (.panel-expander, position: fixed sul rettangolo attuale) che si espande
   a tutto schermo con transizione CSS mentre il resto sfuma; a espansione
   finita avviene la navigazione vera. Il colore dello sfondo viene salvato
   in sessionStorage per la cover d'ingresso della pagina di destinazione.
   ========================================================================== */
function setupPanelsExit(container, panels) {
  const EXPAND_MS = 600; // margine sopra la transition CSS (0.55s)
  let leaving = false;

  // Se la pagina viene ripristinata dalla bfcache (freeze/resume: il JS non
  // riparte da zero, questa closure resta viva com'era al momento del
  // freeze), il flag va resettato esplicitamente — altrimenti resta
  // bloccato a `true` per sempre e nessun click funziona più finché non si
  // ricarica manualmente la pagina. Vedi il listener `pageshow` più sotto.
  function reset() {
    leaving = false;
  }

  panels.forEach((panel) => {
    panel.addEventListener('click', (event) => {
      // Click con modificatori (nuova scheda ecc.): comportamento nativo
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
        return;
      }
      const href = panel.getAttribute('href');
      if (!href) return;

      event.preventDefault();
      if (leaving) return;
      leaving = true;

      // Clone visivo: stesso sfondo della slide attiva + stesso titolo
      const expander = document.createElement('div');
      expander.className = 'panel-expander';

      // Slide attualmente visibile come istantanea per il clone visivo
      const activeSlide = panel.querySelector('.panel-slides .panel-slide.is-active');
      if (activeSlide) {
        expander.style.background = activeSlide.style.background;
        expander.style.backgroundImage = activeSlide.style.backgroundImage;
      }

      const title = panel.querySelector('.panel-title');
      if (title) {
        const clonedTitle = document.createElement('span');
        clonedTitle.className = 'panel-title';
        clonedTitle.textContent = title.textContent;
        expander.appendChild(clonedTitle);
      }

      const rect = panel.getBoundingClientRect();
      expander.style.top = rect.top + 'px';
      expander.style.left = rect.left + 'px';
      expander.style.width = rect.width + 'px';
      expander.style.height = rect.height + 'px';
      document.body.appendChild(expander);

      // Colore per la cover d'ingresso della pagina di destinazione
      if (activeSlide) {
        const bg = getComputedStyle(activeSlide).backgroundColor;
        if (bg && bg !== 'rgba(0, 0, 0, 0)') {
          sessionStorage.setItem('sc-panel-bg', bg);
        }
      }

      // Il resto della pagina sfuma mentre il clone si espande
      document.body.classList.add('is-leaving');
      container.classList.add('panels--leaving');

      expander.getBoundingClientRect(); // reflow: posizione iniziale applicata
      expander.classList.add('is-full');

      setTimeout(() => {
        window.location.href = href;
      }, EXPAND_MS);
    });
  });

  return reset;
}
