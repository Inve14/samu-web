/* ==========================================================================
   video-data.js — dataset dei video, letto da js/stories.js per la fila di
   storie in cima alle pagine galleria (sport.html, eventi.html,
   celebrazioni-matrimoni.html; programmi-tv.html e
   celebrazioni-feste-private.html mostrano il segnaposto "in arrivo" finché
   non c'è nessun video della loro categoria).

   Per aggiungere o togliere un video basta modificare questo array: la
   pagina mostra le voci con `categoria` uguale al suo `data-categoria`.

   Campi di ogni voce:
     id           numero univoco
     titolo       titolo leggibile (sotto la pallina e nel visore)
     categoria    'eventi' | 'matrimoni' | 'sport' — combacia con il
                  data-categoria della fila .stories della pagina
     canale       etichetta, oggi non mostrata
     durata       'M:SS', letta dall'atomo mvhd del file MP4
     verticale    true se il file è girato in verticale (9:16): nel visore
                  riempie lo schermo come una storia vera; gli orizzontali
                  restano interi e centrati
     src          percorso del file video. NB: i file .mp4 sono esclusi dal
                  repository (.gitignore) ed esistono solo in locale: online
                  le storie non funzionano finché non vengono caricati altrove
     poster       fotogramma di copertina (miniatura circolare della pallina)
     descrizione  testo descrittivo, oggi non mostrato

   La sezione Streaming (e il suo array STREAM_DATA) è stata eliminata: quei
   contenuti non arriveranno. Vedi PROGRESS.md.
   ========================================================================== */

/* Video reali, da `immagini/PORTFOLIO/VIDEO/<CATEGORIA>/` (vedi PROGRESS.md):
   la categoria di ogni video viene dalla sottocartella in cui si trovava. */
const VIDEO_DATA = [
  { id: 1, titolo: 'Miu Miu — 7 giugno 2024', categoria: 'eventi', canale: 'Samuele Casabianca', durata: '0:47', verticale: true, src: 'assets/video/eventi/miu-miu-07-06-2024.mp4', poster: 'assets/video/poster/miu-miu-07-06-2024.jpg', descrizione: 'Video di evento realizzato da Samuele Casabianca.' },
  { id: 2, titolo: 'Video Evento 1', categoria: 'eventi', canale: 'Samuele Casabianca', durata: '0:36', verticale: false, src: 'assets/video/eventi/video-evento-1.mp4', poster: 'assets/video/poster/video-evento-1.jpg', descrizione: 'Video di evento realizzato da Samuele Casabianca.' },
  { id: 3, titolo: 'Video Evento 2', categoria: 'eventi', canale: 'Samuele Casabianca', durata: '0:35', verticale: false, src: 'assets/video/eventi/video-evento-2.mp4', poster: 'assets/video/poster/video-evento-2.jpg', descrizione: 'Video di evento realizzato da Samuele Casabianca.' },
  { id: 4, titolo: 'Video Emozionale', categoria: 'eventi', canale: 'Samuele Casabianca', durata: '1:42', verticale: false, src: 'assets/video/eventi/video-emozionale.mp4', poster: 'assets/video/poster/video-emozionale.jpg', descrizione: 'Video di evento realizzato da Samuele Casabianca.' },
  { id: 5, titolo: 'Festa 50 Anni Miar', categoria: 'eventi', canale: 'Samuele Casabianca', durata: '2:04', verticale: false, src: 'assets/video/eventi/festa-50-anni-miar.mp4', poster: 'assets/video/poster/festa-50-anni-miar.jpg', descrizione: 'Video di evento realizzato da Samuele Casabianca.' },
  { id: 6, titolo: 'Videoriassunto Evento IKEA — 28 aprile 2026', categoria: 'eventi', canale: 'Samuele Casabianca', durata: '1:26', verticale: false, src: 'assets/video/eventi/videoriassunto-ikea-28-04-2026.mp4', poster: 'assets/video/poster/videoriassunto-ikea-28-04-2026.jpg', descrizione: 'Video di evento realizzato da Samuele Casabianca.' },
  { id: 7, titolo: 'Matrimonio Claudia & Ivan — 14 settembre 2024', categoria: 'matrimoni', canale: 'Samuele Casabianca', durata: '4:58', verticale: false, src: 'assets/video/matrimoni/matrimonio-claudia-ivan-14-09-2024.mp4', poster: 'assets/video/poster/matrimonio-claudia-ivan-14-09-2024.jpg', descrizione: 'Video di matrimonio realizzato da Samuele Casabianca.' },
  { id: 8, titolo: 'AU – Alghero', categoria: 'sport', canale: 'Samuele Casabianca', durata: '1:39', verticale: true, src: 'assets/video/sport/au-alghero.mp4', poster: 'assets/video/poster/au-alghero.jpg', descrizione: 'Video sportivo realizzato da Samuele Casabianca.' },
  { id: 9, titolo: 'AU – CUS — 30 marzo', categoria: 'sport', canale: 'Samuele Casabianca', durata: '1:38', verticale: true, src: 'assets/video/sport/au-cus-30-marzo.mp4', poster: 'assets/video/poster/au-cus-30-marzo.jpg', descrizione: 'Video sportivo realizzato da Samuele Casabianca.' },
  { id: 10, titolo: 'AU – Lecco', categoria: 'sport', canale: 'Samuele Casabianca', durata: '1:45', verticale: true, src: 'assets/video/sport/au-lecco.mp4', poster: 'assets/video/poster/au-lecco.jpg', descrizione: 'Video sportivo realizzato da Samuele Casabianca.' },
  { id: 11, titolo: 'AU – Parma — 2 febbraio 2025', categoria: 'sport', canale: 'Samuele Casabianca', durata: '1:30', verticale: true, src: 'assets/video/sport/au-parma-02-02-2025.mp4', poster: 'assets/video/poster/au-parma-02-02-2025.jpg', descrizione: 'Video sportivo realizzato da Samuele Casabianca.' },
  { id: 12, titolo: 'AU – Piacenza — 13 ottobre 2024', categoria: 'sport', canale: 'Samuele Casabianca', durata: '1:31', verticale: true, src: 'assets/video/sport/au-piacenza-13-10-2024.mp4', poster: 'assets/video/poster/au-piacenza-13-10-2024.jpg', descrizione: 'Video sportivo realizzato da Samuele Casabianca.' },
  { id: 13, titolo: 'AU – Settimo Torinese', categoria: 'sport', canale: 'Samuele Casabianca', durata: '1:30', verticale: true, src: 'assets/video/sport/au-settimo-torinese.mp4', poster: 'assets/video/poster/au-settimo-torinese.jpg', descrizione: 'Video sportivo realizzato da Samuele Casabianca.' },
  { id: 14, titolo: 'CUS vs AU — 8 dicembre 2024', categoria: 'sport', canale: 'Samuele Casabianca', durata: '1:31', verticale: true, src: 'assets/video/sport/cus-vs-au-08-12-2024.mp4', poster: 'assets/video/poster/cus-vs-au-08-12-2024.jpg', descrizione: 'Video sportivo realizzato da Samuele Casabianca.' },
  { id: 15, titolo: 'Day 1', categoria: 'sport', canale: 'Samuele Casabianca', durata: '1:31', verticale: true, src: 'assets/video/sport/day-1.mp4', poster: 'assets/video/poster/day-1.jpg', descrizione: 'Video sportivo realizzato da Samuele Casabianca.' },
  { id: 16, titolo: 'Day 2', categoria: 'sport', canale: 'Samuele Casabianca', durata: '1:28', verticale: true, src: 'assets/video/sport/day-2.mp4', poster: 'assets/video/poster/day-2.jpg', descrizione: 'Video sportivo realizzato da Samuele Casabianca.' },
  { id: 17, titolo: 'Day 3', categoria: 'sport', canale: 'Samuele Casabianca', durata: '1:31', verticale: true, src: 'assets/video/sport/day-3.mp4', poster: 'assets/video/poster/day-3.jpg', descrizione: 'Video sportivo realizzato da Samuele Casabianca.' },
  { id: 18, titolo: 'Day 4', categoria: 'sport', canale: 'Samuele Casabianca', durata: '0:45', verticale: true, src: 'assets/video/sport/day-4.mp4', poster: 'assets/video/poster/day-4.jpg', descrizione: 'Video sportivo realizzato da Samuele Casabianca.' },
  { id: 19, titolo: 'Day 5', categoria: 'sport', canale: 'Samuele Casabianca', durata: '1:08', verticale: true, src: 'assets/video/sport/day-5.mp4', poster: 'assets/video/poster/day-5.jpg', descrizione: 'Video sportivo realizzato da Samuele Casabianca.' },
  { id: 20, titolo: 'Day 6', categoria: 'sport', canale: 'Samuele Casabianca', durata: '0:56', verticale: true, src: 'assets/video/sport/day-6.mp4', poster: 'assets/video/poster/day-6.jpg', descrizione: 'Video sportivo realizzato da Samuele Casabianca.' },
  { id: 21, titolo: 'Day 7', categoria: 'sport', canale: 'Samuele Casabianca', durata: '1:30', verticale: true, src: 'assets/video/sport/day-7.mp4', poster: 'assets/video/poster/day-7.jpg', descrizione: 'Video sportivo realizzato da Samuele Casabianca.' },
  { id: 22, titolo: 'Derby AU – CUS', categoria: 'sport', canale: 'Samuele Casabianca', durata: '0:59', verticale: true, src: 'assets/video/sport/derby-au-cus.mp4', poster: 'assets/video/poster/derby-au-cus.jpg', descrizione: 'Video sportivo realizzato da Samuele Casabianca.' },
];
