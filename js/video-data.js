/* ==========================================================================
   video-data.js — dataset condiviso dalle pagine Streaming e Video
   (streaming.html, streaming-watch.html, video.html, video-watch.html).

   Le pagine leggono solo questi due array: per aggiungere o togliere un
   contenuto non serve nessun'altra modifica a HTML o JS.

   Campi di ogni voce:
     id           numero univoco (dentro il proprio array), usato in ?v=ID
     titolo       titolo leggibile mostrato nella griglia e nel player
     categoria    solo VIDEO_DATA: 'eventi' | 'matrimoni' | 'sport'
                  (deve combaciare con i data-filter dei chip in video.html)
     canale       etichetta mostrata nei meta
     durata       'M:SS', letta dall'atomo mvhd del file MP4
     verticale    true se il file è girato in verticale (9:16): il player e la
                  miniatura si adattano invece di deformare l'immagine
     src          percorso del file video reale; se manca, la pagina mostra il
                  placeholder al posto del player
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
