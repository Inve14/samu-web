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
lavoro.html         4 pannelli: Programmi TV / Celebrazioni / Eventi / Sport
├── programmi-tv.html              galleria + storie
├── celebrazioni.html              2 pannelli: Feste Private / Matrimoni
│   ├── celebrazioni-feste-private.html   galleria + storie
│   └── celebrazioni-matrimoni.html       galleria + storie
├── eventi.html                    galleria + storie
└── sport.html                     galleria + storie
contattami.html     form mailto + contatti

css/style.css       tutto lo stile, variabili di tema in :root
js/panels.js        pannelli verticali: crossfade in hover, transizioni tra pagine
js/splash.js        splash della home, con volo FLIP del logo verso la nav
js/main.js          menu mobile, lightbox, form contatti
js/stories.js       storie video in stile Instagram sopra le gallerie
js/video-data.js    dataset dei video (letto da stories.js)
assets/             foto ottimizzate per il web, miniature, logo
```

## Contenuti pesanti

Gli originali a piena risoluzione (`immagini/`) e i file video non stanno nel
repository (vedi `.gitignore`). Le storie leggono i file `.mp4` da
`assets/video/`, che esistono solo in locale: **online le storie non funzionano**
finché i video non vengono caricati su un hosting che serva file MP4 diretti e
i percorsi `src` in `js/video-data.js` non vengono aggiornati.

## Documentazione di lavoro

`PROGRESS.md` contiene il log completo del progetto: decisioni prese, convenzioni,
bugfix, placeholder ancora da sostituire e prossimi passi.

## Deploy

Hosting statico su Vercel, dominio `samuelecasabianca.com`.
