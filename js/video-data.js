/* ==========================================================================
   video-data.js — dataset condiviso dalle pagine Streaming e Video
   (streaming.html, streaming-watch.html, le gallerie video-eventi.html,
   video-matrimoni.html, video-sport.html e video-watch.html).

   Le pagine leggono solo questi array: per aggiungere o togliere un
   contenuto non serve nessun'altra modifica a HTML o JS (un video nuovo
   compare da solo nella galleria della sua categoria).

   Campi di ogni voce:
     id           numero univoco (dentro il proprio array), usato in ?v=ID
     titolo       titolo leggibile mostrato nella griglia e nel player
     categoria    solo VIDEO_DATA: 'eventi' | 'matrimoni' | 'sport'
                  (deve essere una chiave di VIDEO_CATEGORIE, in fondo al file)
     canale       etichetta mostrata nei meta
     durata       'M:SS', letta dall'atomo mvhd del file MP4
     verticale    true se il file è girato in verticale (9:16): il player e la
                  miniatura si adattano invece di deformare l'immagine
     youtube      id del video su YouTube: il player usa l'embed. OGGI TUTTE LE
                  VOCI USANO QUESTO CAMPO, quindi la sezione video funziona
                  per intero anche sul sito pubblicato
     durata       'M:SS'. Facoltativo: YouTube non espone la durata degli
                  Short, e dove manca il riquadro semplicemente non la mostra
     src          percorso di un file video locale, alternativa a `youtube`.
                  Nessuna voce lo usa più, ma il player lo supporta ancora; se
                  mancano sia `youtube` sia `src` si vede il placeholder
     poster       fotogramma di copertina; se manca, si vede il placeholder
     descrizione  testo sotto al player

   STREAM_DATA è ancora un placeholder: la cartella sorgente
   `immagini/PORTFOLIO/STREAMING/` è vuota, non è arrivato nessun file di
   streaming. Le voci qui sotto non hanno `src` né `poster`, quindi
   streaming.html e streaming-watch.html continuano a mostrare i segnaposto.
   Quando arriveranno i file, basterà aggiungere `src` e `poster` a ogni voce
   (stessa forma di VIDEO_DATA) perché il player reale compaia da solo.
   ========================================================================== */

const STREAM_DATA = [
  { id: 1, titolo: 'Streaming placeholder 1', canale: 'Samuele Casabianca', durata: '1:12:40', descrizione: 'Descrizione placeholder dello streaming. Contenuto reale in arrivo.' },
  { id: 2, titolo: 'Streaming placeholder 2', canale: 'Samuele Casabianca', durata: '0:48:15', descrizione: 'Descrizione placeholder dello streaming. Contenuto reale in arrivo.' },
  { id: 3, titolo: 'Streaming placeholder 3', canale: 'Samuele Casabianca', durata: '2:03:22', descrizione: 'Descrizione placeholder dello streaming. Contenuto reale in arrivo.' },
  { id: 4, titolo: 'Streaming placeholder 4', canale: 'Samuele Casabianca', durata: '0:35:50', descrizione: 'Descrizione placeholder dello streaming. Contenuto reale in arrivo.' },
  { id: 5, titolo: 'Streaming placeholder 5', canale: 'Samuele Casabianca', durata: '1:29:05', descrizione: 'Descrizione placeholder dello streaming. Contenuto reale in arrivo.' },
  { id: 6, titolo: 'Streaming placeholder 6', canale: 'Samuele Casabianca', durata: '0:52:18', descrizione: 'Descrizione placeholder dello streaming. Contenuto reale in arrivo.' },
  { id: 7, titolo: 'Streaming placeholder 7', canale: 'Samuele Casabianca', durata: '1:41:37', descrizione: 'Descrizione placeholder dello streaming. Contenuto reale in arrivo.' },
  { id: 8, titolo: 'Streaming placeholder 8', canale: 'Samuele Casabianca', durata: '0:59:12', descrizione: 'Descrizione placeholder dello streaming. Contenuto reale in arrivo.' },
  { id: 9, titolo: 'Streaming placeholder 9', canale: 'Samuele Casabianca', durata: '1:17:44', descrizione: 'Descrizione placeholder dello streaming. Contenuto reale in arrivo.' },
  { id: 10, titolo: 'Streaming placeholder 10', canale: 'Samuele Casabianca', durata: '0:41:29', descrizione: 'Descrizione placeholder dello streaming. Contenuto reale in arrivo.' },
];

/* Video reali, da `immagini/PORTFOLIO/VIDEO/<CATEGORIA>/` (vedi PROGRESS.md):
   la categoria di ogni video viene dalla sottocartella in cui si trovava. */
const VIDEO_DATA = [
  // ---- Eventi ----
  { id: 1, titolo: 'Festa 50 Anni Miar', categoria: 'eventi', canale: 'Samuele Casabianca', durata: '2:04', verticale: false, youtube: '--_EgvYigjA', poster: 'assets/video/poster/festa-50-anni-miar.jpg', descrizione: 'Video di evento realizzato da Samuele Casabianca.' },
  { id: 2, titolo: 'Video Emozionale — Miar', categoria: 'eventi', canale: 'Samuele Casabianca', durata: '1:42', verticale: false, youtube: 'gMEN3C5hZ-M', poster: 'assets/video/poster/video-emozionale.jpg', descrizione: 'Video di evento realizzato da Samuele Casabianca.' },
  { id: 3, titolo: 'Samec Cremona', categoria: 'eventi', canale: 'Samuele Casabianca', verticale: false, youtube: 'K96zFyIWVV8', poster: 'https://i.ytimg.com/vi/K96zFyIWVV8/hqdefault.jpg', descrizione: 'Video di evento realizzato da Samuele Casabianca.' },
  { id: 4, titolo: 'Samec x SRT Cuneo', categoria: 'eventi', canale: 'Samuele Casabianca', verticale: false, youtube: '4KUC6pT8ID0', poster: 'https://i.ytimg.com/vi/4KUC6pT8ID0/hqdefault.jpg', descrizione: 'Video di evento realizzato da Samuele Casabianca.' },
  { id: 5, titolo: 'Mura Festival — Lidia Cao', categoria: 'eventi', canale: 'Samuele Casabianca', verticale: true, youtube: 'PhGkrl7YK8E', poster: 'https://i.ytimg.com/vi/PhGkrl7YK8E/hqdefault.jpg', descrizione: 'Video di evento realizzato da Samuele Casabianca.' },

  // ---- Matrimoni ----
  { id: 6, titolo: 'Matrimonio Claudia & Ivan — 14 settembre 2024', categoria: 'matrimoni', canale: 'Samuele Casabianca', durata: '4:58', verticale: false, youtube: 'EWtwaJ0knOQ', poster: 'assets/video/poster/matrimonio-claudia-ivan-14-09-2024.jpg', descrizione: 'Video di matrimonio realizzato da Samuele Casabianca.' },

  // ---- Sport (tutti Short verticali) ----
  { id: 7, titolo: 'AU – Piacenza — 13 ottobre 2024', categoria: 'sport', canale: 'Samuele Casabianca', durata: '1:31', verticale: true, youtube: '-2qaXyOJheM', poster: 'assets/video/poster/au-piacenza-13-10-2024.jpg', descrizione: 'Video sportivo realizzato da Samuele Casabianca.' },
  { id: 8, titolo: 'AU – CUS — 30 marzo', categoria: 'sport', canale: 'Samuele Casabianca', durata: '1:38', verticale: true, youtube: 'j4ac9Vh25Q0', poster: 'assets/video/poster/au-cus-30-marzo.jpg', descrizione: 'Video sportivo realizzato da Samuele Casabianca.' },
  { id: 9, titolo: 'AU – Lecco', categoria: 'sport', canale: 'Samuele Casabianca', durata: '1:45', verticale: true, youtube: 'mAFzy_zPfL8', poster: 'assets/video/poster/au-lecco.jpg', descrizione: 'Video sportivo realizzato da Samuele Casabianca.' },
  { id: 10, titolo: 'CUS – AU — 8 dicembre 2024', categoria: 'sport', canale: 'Samuele Casabianca', durata: '1:31', verticale: true, youtube: 'BF8hiFUey-Y', poster: 'assets/video/poster/cus-vs-au-08-12-2024.jpg', descrizione: 'Video sportivo realizzato da Samuele Casabianca.' },
  { id: 11, titolo: 'AU – Settimo Torinese', categoria: 'sport', canale: 'Samuele Casabianca', durata: '1:30', verticale: true, youtube: '19W51NMPBBY', poster: 'assets/video/poster/au-settimo-torinese.jpg', descrizione: 'Video sportivo realizzato da Samuele Casabianca.' },
  { id: 12, titolo: 'Education and Sport 2026 — Day 1', categoria: 'sport', canale: 'Samuele Casabianca', durata: '1:31', verticale: true, youtube: 'NkFm30vPViY', poster: 'assets/video/poster/day-1.jpg', descrizione: 'Video sportivo realizzato da Samuele Casabianca.' },
  { id: 13, titolo: 'Education and Sport 2026 — Day 2', categoria: 'sport', canale: 'Samuele Casabianca', durata: '1:28', verticale: true, youtube: 'NTZT6TC8wmw', poster: 'assets/video/poster/day-2.jpg', descrizione: 'Video sportivo realizzato da Samuele Casabianca.' },
];

/* Categorie di VIDEO_DATA: nome mostrato e pagina galleria della categoria
   (usati dal breadcrumb di video-watch.html). Una categoria nuova richiede
   la sua voce qui, una pagina galleria con data-video-categoria uguale alla
   chiave e un pannello in video.html. */
const VIDEO_CATEGORIE = {
  eventi: { nome: 'Eventi', pagina: 'video-eventi.html' },
  matrimoni: { nome: 'Matrimoni', pagina: 'video-matrimoni.html' },
  sport: { nome: 'Sport', pagina: 'video-sport.html' },
};
