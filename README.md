# Samuele Casabianca — Portfolio

Sito portfolio di [Samuele Casabianca](https://samuelecasabianca.com), fotografo,
videomaker e regista con sede a Milano.

Sito statico multi-pagina in **HTML, CSS e JavaScript vanilla**: nessun framework,
nessuna dipendenza, nessun build step. Si apre in locale con un qualsiasi server
statico:

```bash
python3 -m http.server 8000   # poi http://localhost:8000
```

## Struttura

```
index.html          landing con pannelli verticali + splash screen
chi-sono.html       bio
lavoro.html         hub: Foto / Streaming / Video
├── foto.html       Celebrazioni / Eventi / Programmi TV / Sport
├── streaming.html  griglia + streaming-watch.html
└── video.html      Eventi / Matrimoni / Sport
    └── video-eventi.html, video-matrimoni.html, video-sport.html
                    gallerie → video-watch.html

css/style.css       tutto lo stile, variabili di tema in :root
js/panels.js        pannelli verticali: crossfade in hover, transizioni tra pagine
js/splash.js        splash della home, con volo FLIP del logo verso la nav
js/main.js          menu mobile, lightbox, form contatti, helper video
js/video-data.js    dataset dei contenuti video
assets/             foto ottimizzate per il web, miniature, logo, favicon
```

## Contenuti pesanti

Gli originali a piena risoluzione (`immagini/`) e i file video non stanno nel
repository (vedi `.gitignore`). La pagina `video-watch.html` legge
i file `.mp4` da `assets/video/`, che esistono solo in locale: **online la
riproduzione non funziona** finché i video non vengono caricati altrove e i
percorsi `src` in `js/video-data.js` non vengono aggiornati.

## Documentazione di lavoro

`PROGRESS.md` contiene il log completo del progetto: decisioni prese, convenzioni,
bugfix, placeholder ancora da sostituire e prossimi passi.

## Deploy

Hosting statico su Vercel, dominio `samuelecasabianca.com`.
