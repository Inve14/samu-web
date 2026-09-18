/* ==========================================================================
   splash.js — schermata di benvenuto (solo index.html)

   Sequenza:
   1. Ritaglio luminoso: il riquadro (.splash-frame) parte mascherato da un
      clip-path chiuso (non semplice opacity: 0 — deve sembrare buio pieno da
      cui il logo emerge) e viene rivelato dall'alto verso il basso mentre due
      punti di luce (.splash-dot) ne percorrono il perimetro in direzioni
      opposte, partendo insieme dal centro del lato superiore e incontrandosi
      al centro di quello inferiore. Tutto gestito da CSS (@keyframes
      splash-frame-reveal, splash-dot-cw/ccw in css/style.css), niente JS.
   2. Pausa: il riquadro resta fermo e visibile per il resto di DURATION_MS.
   3. Volo verso la nav (tecnica FLIP): si clona il logo dello splash, lo si
      posiziona (fixed) esattamente sopra l'originale, poi lo si anima con
      transform: translate()+scale() fino a coincidere col logo reale della
      nav (già presente nel DOM, solo coperto dallo splash) — mai animando
      top/left/width/height direttamente, per restare sul compositor. In
      contemporanea il riquadro perde sfondo/bordo (classe is-dismissing) e
      l'intero overlay sfuma (.is-hidden, comportamento preesistente), così
      alla fine resta solo il logo nudo, coerente con quello della nav.

   Con prefers-reduced-motion: reduce, il ritaglio luminoso è disattivato via
   CSS (il riquadro appare già completo, i punti restano nascosti — vedi la
   media query dedicata in css/style.css) e qui il volo verso la nav non
   parte: lo splash si limita al fade-out esistente.
   ========================================================================== */

(function initSplash() {
  const splash = document.querySelector('.splash');
  if (!splash) return;

  const DURATION_MS = 3000; // permanenza complessiva dello splash (ritaglio + pausa)
  const FADE_MS = 700;      // deve corrispondere alla transition CSS di .splash
  const FLY_MS = 800;       // deve corrispondere alla transition CSS di .logo-fly

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Blocca lo scroll finché lo splash è visibile
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';

  function dismiss() {
    splash.remove();
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  // Clona il logo dello splash e lo anima (transform: translate + scale) fino
  // a coincidere col rettangolo del logo reale nella nav. Ritorna il clone
  // (da rimuovere a volo concluso) o null se manca uno dei due elementi.
  function flyLogoToNav() {
    const frame = splash.querySelector('.splash-frame');
    const splashLogoImg = splash.querySelector('.splash-frame-logo');
    const navLogoImg = document.querySelector('.site-nav .logo-sc img');
    if (!frame || !splashLogoImg || !navLogoImg) return null;

    const fromRect = splashLogoImg.getBoundingClientRect();
    const toRect = navLogoImg.getBoundingClientRect();

    const clone = splashLogoImg.cloneNode();
    clone.className = 'logo-fly';
    // Il clone nasce esattamente sul rettangolo di partenza: transform-origin
    // in alto a sinistra così translate+scale lo fa combaciare col
    // rettangolo di arrivo senza dover ricalcolare offset aggiuntivi.
    clone.style.width = fromRect.width + 'px';
    clone.style.height = fromRect.height + 'px';
    clone.style.transform = `translate(${fromRect.left}px, ${fromRect.top}px)`;
    document.body.appendChild(clone);

    // L'originale sparisce subito: da qui in poi si vede solo il clone "in volo"
    splashLogoImg.style.visibility = 'hidden';
    // Il riquadro perde sfondo/bordo in contemporanea al volo del logo, così
    // alla fine non resta nessuna cornice attorno al logo nudo nella nav.
    frame.classList.add('is-dismissing');

    const scaleX = toRect.width / fromRect.width;
    const scaleY = toRect.height / fromRect.height;

    // Reflow prima di cambiare il transform target, altrimenti la
    // transizione non parte (il browser applicherebbe subito lo stato finale)
    clone.getBoundingClientRect();
    requestAnimationFrame(() => {
      clone.style.transform =
        `translate(${toRect.left}px, ${toRect.top}px) scale(${scaleX}, ${scaleY})`;
    });

    return clone;
  }

  setTimeout(() => {
    const clone = reduceMotion ? null : flyLogoToNav();

    splash.classList.add('is-hidden');
    // Segnala l'inizio del fade-out: panels.js lo usa per far partire lo
    // split d'ingresso dei pannelli in sincrono con la scomparsa dello splash
    document.dispatchEvent(new CustomEvent('sc:splash-hiding'));
    // Rimozione a transizione finita, con fallback nel caso il
    // transitionend non scatti (es. prefers-reduced-motion)
    splash.addEventListener('transitionend', dismiss, { once: true });
    setTimeout(() => {
      if (document.body.contains(splash)) dismiss();
    }, FADE_MS + 300);

    if (clone) {
      setTimeout(() => clone.remove(), FLY_MS + 100);
    }
  }, DURATION_MS);
})();
