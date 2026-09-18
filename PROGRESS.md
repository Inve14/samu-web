# PROGRESS.md — Portfolio Samuele Casabianca

Log di lavoro del progetto. Da aggiornare ad ogni step significativo, così
qualsiasi sessione futura (anche senza contesto) può riprendere da qui.

## Come avviare il progetto in locale

Nessun build step, nessuna dipendenza (eccetto Google Fonts caricati via CDN):

- **Opzione 1**: aprire direttamente `index.html` nel browser (doppio click).
- **Opzione 2** (consigliata): live server, es. `python3 -m http.server 8000`
  dalla root del progetto e aprire `http://localhost:8000`, oppure l'estensione
  Live Server di VS Code.

## Stato attuale

- [x] Struttura file e cartelle (`css/`, `js/`, `assets/`)
- [x] CSS base con variabili di tema in `:root` (`css/style.css`)
- [x] Componente riutilizzabile "pannelli verticali" (`js/panels.js` → `initVerticalPanels()`)
- [x] Crossfade solo-hover tra le slide dei pannelli (sostituisce il precedente
  scorrimento a filmstrip)
- [x] `index.html` — landing con 3 pannelli + hero con nome
- [x] Sitemap ristrutturata: `lavoro.html` ora è un hub (Foto / Streaming / Video),
  `foto.html` contiene le 4 categorie fotografiche (vedi albero sotto)
- [x] Pagine di navigazione a pannelli: `foto.html` (4), `celebrazioni.html` (2), `eventi.html` (3)
- [x] **Sport semplificata a galleria diretta** (come Programmi TV): niente più
  sotto-categorie Rugby/Calcio/Pallavolo — vedi "Sport: da pannelli a galleria diretta"
- [x] Componente galleria masonry + hover zoom + lightbox (`js/main.js`)
- [x] 9 pagine galleria (foglie): 5 con foto reali, 4 ancora con placeholder (foto mancanti)
- [x] `chi-sono.html` — bio con ritratto reale
- [x] `contattami.html` — form mailto + contatti
- [x] Responsive: pannelli impilati su mobile, menu hamburger overlay
- [x] Splash screen di benvenuto sulla home (3 s, monogramma centrato, fade-out)
- [x] Transizione animata tra pagine a pannelli (espansione in uscita + split in ingresso)
- [x] Sezioni Streaming e Video in stile piattaforma (griglia + filtri + pagina di riproduzione)
- [x] Foto reali inserite per Foto/Celebrazioni/Eventi Aziendali/Programmi TV/Sport Rugby,
  logo reale in nav/splash/footer, ritratto reale in `chi-sono.html` (vedi sezione
  "Immagini reali inserite" più sotto)
- [x] 3 bugfix: dimensioni logo, click pannello bloccato dopo bfcache/back,
  filmstrip che partiva senza hover (vedi sezione "Bugfix" più sotto)
- [x] Logo ingrandito (nav/footer/splash, +~35%) e scorrimento a filmstrip
  sostituito da un crossfade solo-hover (vedi "Decisioni prese")
- [x] Logo ulteriormente ingrandito (nav/footer 46px) e prima versione
  dell'animazione "volo" FLIP dal logo dello splash a quello della nav;
  corretto anche il ritaglio del ritratto "Chi Sono" tagliato in testa
  durante l'hover (vedi "Bugfix")
- [x] Splash ridisegnato: riquadro smussato con logo, "ritaglio luminoso" del
  contorno (due punti che tracciano il perimetro) all'apertura, poi volo FLIP
  (via `transform`) verso il logo della nav — vedi "Decisioni prese", voce
  **Logo reale**
- [ ] Foto reali per Eventi → Brand/Gala e Sport → Calcio/Pallavolo (nessun file
  disponibile in `immagini/` per queste 4 categorie — placeholder in attesa)
- [x] **Video reali collegati** (22 file da `immagini/PORTFOLIO/VIDEO/`): griglia,
  filtri, pagine di riproduzione con `<video controls>` reale e miniature
  estratte dal video — vedi "Video reali inseriti" più sotto
- [ ] Contenuti reali di Streaming (struttura pronta, ma
  `immagini/PORTFOLIO/STREAMING/` è ancora **vuota**: nessun file arrivato)
- [ ] Contatti reali (email, Instagram, LinkedIn — ora segnaposto)
- [ ] Deploy/hosting (fuori scope per questa fase)

## Sitemap

```
lavoro.html                     → 3 pannelli: Foto | Streaming | Video
├── foto.html                   → 4 pannelli: Celebrazioni | Eventi | Programmi TV | Sport
│   ├── celebrazioni.html       → 2 pannelli: Feste Private | Matrimoni
│   │   ├── celebrazioni-feste-private.html   → galleria
│   │   └── celebrazioni-matrimoni.html       → galleria
│   ├── eventi.html             → 3 pannelli: Aziendali | Brand | Gala
│   │   ├── eventi-aziendali.html             → galleria
│   │   ├── eventi-brand.html                 → galleria
│   │   └── eventi-gala.html                  → galleria
│   ├── programmi-tv.html       → galleria diretta
│   └── sport.html              → galleria diretta (come programmi-tv.html)
├── streaming.html               → griglia stile YouTube/Twitch (in costruzione lato contenuti)
│   └── streaming-watch.html     → pagina di riproduzione (?v=ID)
└── video.html                   → griglia stile YouTube con filtri categoria
    └── video-watch.html         → pagina di riproduzione (?v=ID&cat=CATEGORIA)
```

Ogni breadcrumb interno riflette questo albero (es. "Lavoro / Foto / Sport / Rugby").
`index.html` e `chi-sono.html` continuano a puntare a `lavoro.html` (invariato come
punto d'ingresso del "Mio Lavoro").

## Struttura del progetto

| File | Descrizione |
|---|---|
| `index.html` | Landing: hero col nome + 3 pannelli (Chi Sono / Il Mio Lavoro / Contattami) — foto reali su Chi Sono e Il Mio Lavoro, Contattami statico |
| `chi-sono.html` | Pagina statica bio: ritratto reale (`assets/foto/chi-sono/profilo.jpg`) a sinistra, testo a destra |
| `lavoro.html` | Hub, 3 pannelli: Foto (foto reali) / Streaming (placeholder) / Video (placeholder) |
| `foto.html` | 4 pannelli, tutti con foto reali: Programmi TV / Celebrazioni / Eventi / Sport |
| `celebrazioni.html` | 2 pannelli con foto reali: Matrimoni / Feste Private |
| `eventi.html` | 3 pannelli: Aziendali (foto reali) / Brand (placeholder, nessuna foto disponibile) / Gala (placeholder, nessuna foto disponibile) |
| `sport.html` | Galleria diretta — 54 foto reali (ex Rugby/Calcio/Pallavolo unite) |
| `programmi-tv.html` | Galleria — 17 foto reali |
| `celebrazioni-matrimoni.html` | Galleria — 47 foto reali |
| `celebrazioni-feste-private.html` | Galleria — 28 foto reali |
| `eventi-aziendali.html` | Galleria — 50 foto reali |
| `eventi-brand.html` | Galleria (11 placeholder — nessuna foto disponibile) |
| `eventi-gala.html` | Galleria (13 placeholder — nessuna foto disponibile) |
| `streaming.html` | Griglia stile YouTube/Twitch, 10 card placeholder (dati da `js/video-data.js`) |
| `streaming-watch.html` | Pagina di riproduzione streaming (player placeholder + correlati), legge `?v=ID` |
| `video.html` | Griglia stile YouTube con filtri Tutti/Eventi/Matrimoni/Sport, **22 card reali** (6 eventi, 1 matrimoni, 15 sport) |
| `video-watch.html` | Pagina di riproduzione video: **`<video controls>` reale** + correlati, legge `?v=ID&cat=CATEGORIA` |
| `contattami.html` | Form contatti (mailto:) + email/Instagram/LinkedIn |
| `css/style.css` | Tutto lo stile; variabili tema in `:root` in cima al file |
| `js/panels.js` | `initVerticalPanels()`: crossfade slide solo-hover, transizioni animate tra pagine a pannelli |
| `js/main.js` | Menu hamburger overlay, lightbox galleria, form mailto (auto-init su DOMContentLoaded) + helper condivisi delle sezioni video (`escapeHtml`, `videoThumbHtml`, `videoPlayerHtml`) |
| `js/splash.js` | Splash screen di benvenuto (incluso solo in `index.html`); anima il logo dallo splash alla nav (FLIP) all'uscita |
| `js/video-data.js` | Dataset condiviso da `streaming.html`/`streaming-watch.html`/`video.html`/`video-watch.html`: `VIDEO_DATA` con i 22 video reali, `STREAM_DATA` ancora placeholder |
| `assets/logo-sc.png` | Logo reale (ritagliato/ricolorato da `immagini/`), usato in nav/splash/footer |
| `assets/foto/` | Foto reali ottimizzate per il web (ridimensionate/compresse dagli originali in `immagini/`), organizzate per categoria — vedi "Immagini reali inserite" |
| `assets/video/` | Video reali (`eventi/`, `matrimoni/`, `sport/`) + `poster/` con le miniature — vedi "Video reali inseriti" |
| `immagini/` | Cartella sorgente con gli originali a piena risoluzione ricevuti da Samuele (non referenziata direttamente dal sito, vedi sotto) |

## Immagini reali inserite

Le foto e il logo definitivi sono arrivati nella cartella `immagini/PORTFOLIO/`
(originali a piena risoluzione, alcuni oltre 20 MB). Struttura trovata:

```
immagini/PORTFOLIO/
├── FOTO/
│   ├── CELEBRAZIONI/FESTE/          (28 foto)
│   ├── CELEBRAZIONI/MATRIMONIO/     (47 foto)
│   ├── EVENTI/AZIENDALI/            (50 foto)
│   ├── PROGRAMMI TV/HOT ONES/       (17 foto)
│   └── SPORT/RUGBY/                 (54 foto)
├── SC + LOGO/                       (logo ufficiale + foto profilo/ritratti)
├── STREAMING/ e VIDEO/              (non toccate in questo passaggio, vedi sotto)
```

**Ambiguità segnalata (non risolta a caso)**: mancano del tutto le cartelle per
**Eventi → Brand**, **Eventi → Gala**, **Sport → Calcio**, **Sport → Pallavolo**.
Queste 4 categorie non hanno nessuna foto disponibile in `immagini/`: sono state
lasciate con i placeholder generati via JS/CSS esistenti (pannelli e gallerie),
segnalate nel codice con un commento `<!-- Nessuna foto disponibile in immagini/
per questa categoria (vedi PROGRESS.md): resta con placeholder -->` sopra i
pannelli corrispondenti in `eventi.html` e `sport.html`. *(Aggiornamento: i
pannelli di `sport.html` non esistono più, Sport è ora una galleria diretta —
vedi "Sport: da pannelli a galleria diretta".)* Di conseguenza, sulle
pagine `foto.html` (pannello "Eventi") e (pannello "Sport") le anteprime mostrano
solo le foto di Aziendali/Rugby, non un mix con Brand/Gala/Calcio/Pallavolo:
scelta di buon senso in attesa che arrivino le foto mancanti.

**Bug di rendering scoperto e corretto**: gli originali in `immagini/` sono
foto macchina fotografica a piena risoluzione (3000–5000 px, diversi MB
ciascuna). Usate direttamente come `<img>` dentro la galleria masonry
(`columns: 3`), Chrome le renderizza corrotte (strisce verticali "sbavate")
anche se il file scaricato è corretto (`img.complete`/`naturalWidth` a posto,
e l'immagine si apre perfettamente se visitata da sola) — un bug di
rasterizzazione del layout multi-colonna con immagini molto grandi. Verificato
riducendo una foto di prova a 1200 px: nello stesso layout masonry si vede
perfettamente. **Come `background-image` nei pannelli (filmstrip) lo stesso
bug non si presenta**, ma restava comunque il problema pratico di servire
file da svariati MB l'uno.

**Soluzione**: pipeline di ottimizzazione con Pillow (script usati, non salvati
nel repo — da rigenerare quando arrivano nuove foto, vedi comando sotto) che
per ogni foto usata dal sito:
1. applica la rotazione EXIF (`ImageOps.exif_transpose`) e la "cuoce" nei pixel;
2. ridimensiona al massimo a 1800 px sul lato lungo (`Image.thumbnail`, filtro
   Lanczos);
3. ricomprime in JPEG qualità 82;
4. rinomina ripulendo il nome file da spazi/caratteri speciali (niente più
   `%20` nei percorsi).

Risultato salvato in `assets/foto/<categoria>/<file>.jpg` (~57 MB totali contro
1,7 GB + 80 MB degli originali). **Tutte le pagine del sito (pannelli e
gallerie) referenziano solo `assets/foto/...`, mai `immagini/...` direttamente**
— `immagini/` resta la cartella sorgente/originali, non è collegata dal sito.
Mappatura cartella sorgente → cartella ottimizzata:

| Sorgente (`immagini/PORTFOLIO/FOTO/...`) | Ottimizzata (`assets/foto/...`) |
|---|---|
| `CELEBRAZIONI/FESTE/` | `celebrazioni-feste/` |
| `CELEBRAZIONI/MATRIMONIO/` | `celebrazioni-matrimonio/` |
| `EVENTI/AZIENDALI/` | `eventi-aziendali/` |
| `PROGRAMMI TV/HOT ONES/` | `programmi-tv/` |
| `SPORT/RUGBY/` | `sport-rugby/` |
| `SC + LOGO/` (4 foto scelte per Chi Sono) | `chi-sono/` (`profilo.jpg`, `verona-1/2/3.jpg`) |

**Se arrivano nuove foto**: rifare lo stesso procedimento (exif-transpose +
thumbnail 1800px + JPEG q82 + nome ripulito) prima di metterle in `assets/foto/`
e referenziarle da lì — **non collegare mai gli originali di `immagini/`
direttamente in un `<img>` o in `data-images`**, per via del bug di rendering
sopra e per non appesantire il sito.

**Dove sono state usate le foto**:
- **Pannelli** (`data-images="assets/foto/.../file.jpg,..."`, 4–5 foto ciascuno):
  `index.html` (Chi Sono, Il Mio Lavoro), `lavoro.html` (Foto), `foto.html`
  (Programmi TV, Celebrazioni, Eventi, Sport), `celebrazioni.html` (Matrimoni,
  Feste Private), `eventi.html` (Aziendali), `sport.html` (Rugby — pannello poi
  rimosso, vedi "Sport: da pannelli a galleria diretta"). Le immagini
  scelte per ogni pannello sono un sottoinsieme rappresentativo della cartella
  corrispondente (non serve usarle tutte in un pannello, che mostra comunque
  solo un loop di poche foto).
- **Gallerie** (tutte le foto della cartella, nell'ordine alfabetico del
  filesystem): `programmi-tv.html`, `celebrazioni-matrimoni.html`,
  `celebrazioni-feste-private.html`, `eventi-aziendali.html`,
  `sport-rugby.html` (poi confluita in `sport.html`).
- **Ritratto**: `chi-sono.html` usa `assets/foto/chi-sono/profilo.jpg` (da
  `SC + LOGO/FOTO PROFILO.jpg`).
- **Logo**: vedi la voce dedicata in "Decisioni prese" più sotto.

**Streaming e Video non toccati**: come richiesto, `streaming.html`,
`video.html`, `streaming-watch.html`, `video-watch.html` e `js/video-data.js`
restano con i placeholder attuali — non ci sono ancora contenuti video reali,
solo le cartelle `immagini/PORTFOLIO/STREAMING/` e `VIDEO/` che contengono
altro materiale non pertinente a questo passaggio (foto, non i video stessi).

## Passaggio "nuovo materiale da Samuele" (foto aggiuntive + primi video reali)

Consegna successiva di materiale in `immagini/`, da smistare tra file già usati
e file nuovi.

### Foto nuove: nessuna

Verificato prima di toccare qualsiasi cosa, per non creare doppioni:

- le 5 cartelle sorgente in `immagini/PORTFOLIO/FOTO/` contengono **196 foto**
  (28 feste + 47 matrimonio + 50 aziendali + 17 programmi TV + 54 rugby), esattamente
  le stesse già ottimizzate in `assets/foto/` nel passaggio precedente — il
  confronto è stato fatto nome per nome applicando la regola di pulizia dei nomi
  (spazi → `-`), non solo sul conteggio;
- `assets/foto/` contiene 200 file (196 + 4 ritratti di `SC + LOGO/`) e **tutti e
  200 risultano referenziati** da un `<img>` o da un `data-images`; nessun file
  orfano, nessun riferimento rotto.

**Conclusione: in questa consegna non è arrivata nessuna foto nuova.** Gallerie e
`data-images` dei pannelli fotografici sono quindi rimasti invariati — non c'era
niente da integrare. Le 4 categorie ancora senza foto (Eventi → Brand/Gala,
Sport → Calcio/Pallavolo) restano con i placeholder, come già segnalato sopra.

### Video reali: 22 file inseriti

Prima consegna di video veri. La categoria di ogni video viene dalla sottocartella
di `immagini/PORTFOLIO/VIDEO/` in cui si trovava (`EVENTI ` — sì, con uno spazio
finale nel nome cartella —, `MATRIMONI`, `SPORT`), come indicato: nessuna
deduzione dai nomi dei singoli file.

| # | Titolo | Categoria | Durata | File sorgente |
|---|---|---|---|---|
| 1 | Miu Miu — 7 giugno 2024 | eventi | 0:47 | `EVENTI /MIU MIU 07-06-2024.mp4` |
| 2 | Video Evento 1 | eventi | 0:36 | `EVENTI /VIDEO 1.mp4` |
| 3 | Video Evento 2 | eventi | 0:35 | `EVENTI /VIDEO 2.mp4` |
| 4 | Video Emozionale | eventi | 1:42 | `EVENTI /video emozionale.mp4` |
| 5 | Festa 50 Anni Miar | eventi | 2:04 | `EVENTI /VIDEO FESTA 50 ANNI MIAR.mp4` |
| 6 | Videoriassunto Evento IKEA — 28 aprile 2026 | eventi | 1:26 | `EVENTI /VIDEORIASSUNTO Evento Ikea 28_4_2026_...mp4` |
| 7 | Matrimonio Claudia & Ivan — 14 settembre 2024 | matrimoni | 4:58 | `MATRIMONI/MATRIMONIO CLAUDIA e IVAN_14-09-2024.mp4` |
| 8 | AU – Alghero | sport | 1:39 | `SPORT/AU-ALGHERO_3.mp4` |
| 9 | AU – CUS — 30 marzo | sport | 1:38 | `SPORT/AU-CUS 30 MARZO.mp4` |
| 10 | AU – Lecco | sport | 1:45 | `SPORT/AU-LECCO_1.mp4` |
| 11 | AU – Parma — 2 febbraio 2025 | sport | 1:30 | `SPORT/AU-PARMA 02-02-2025.mp4` |
| 12 | AU – Piacenza — 13 ottobre 2024 | sport | 1:31 | `SPORT/AU-PIACENZA_13-10-2024.mp4` |
| 13 | AU – Settimo Torinese | sport | 1:30 | `SPORT/AU-SETTIMO TORINESE.mp4` |
| 14 | CUS vs AU — 8 dicembre 2024 | sport | 1:31 | `SPORT/CUS VS AU 08-12-2024.mp4` |
| 15–21 | Day 1 … Day 7 | sport | 0:45–1:31 | `SPORT/DAY 1.mp4` … `DAY 7.mp4` |
| 22 | Derby AU – CUS | sport | 0:59 | `SPORT/VIDEO DERBY AU-CUS 3.mp4` |

**Dove sono finiti**: tutti e 22 in **`video.html`** (griglia con filtri) e nelle
rispettive **`video-watch.html?v=ID&cat=CATEGORIA`**. Nessun video è stato messo
in Streaming.

**Pannello `lavoro.html` → Video**: aveva `data-images` vuoto perché non c'erano
contenuti; ora usa 5 fotogrammi di copertina reali, uno per categoria
(matrimonio, video emozionale, rugby Piacenza, Miu Miu, Day 1). Il pannello
Streaming resta senza immagini, con la nota "Contenuti in arrivo".

### Miniature dei video: primo fotogramma estratto davvero

`ffmpeg` non è installato su questa macchina, quindi l'estrazione è stata fatta
con gli strumenti nativi di macOS — **niente placeholder visivi, ogni card ha una
miniatura reale**:

1. `qlmanage -t -s 1280 -o <out> assets/video/*/*.mp4` → QuickLook genera un PNG
   con un fotogramma rappresentativo del video (per questi file, l'inizio della
   clip);
2. Pillow: `exif_transpose` → `thumbnail((1280, 1280), LANCZOS)` → JPEG qualità
   82, cioè la **stessa pipeline già usata per le foto**, per coerenza di peso e
   resa;
3. risultato in `assets/video/poster/<slug>.jpg` — 22 file, 58–200 KB l'uno,
   ~2,6 MB in totale.

Le durate in `VIDEO_DATA` non sono stimate: sono lette dall'atomo `mvhd` dei file
MP4 (parser di una ventina di righe, nessuna dipendenza). Inizialmente erano state
prese con `mdls`, ma Spotlight non aveva ancora indicizzato i file appena copiati e
restituiva `(null)` su alcuni — il parser diretto è deterministico.

### File video: dove stanno e quanto pesano

I 22 MP4 sono in `assets/video/<categoria>/<nome-ripulito>.mp4` (nomi minuscoli,
senza spazi né `%20` nei percorsi), coerentemente con la regola "il sito
referenzia solo `assets/`, mai `immagini/`".

Sono ~2,2 GB in totale e **non sono stati transcodificati** (senza `ffmpeg` non è
possibile): sono copie byte-identiche degli originali. Per non occupare 2,2 GB in
più su disco sono stati copiati con `cp -c`, cioè **clone APFS copy-on-write**:
file veri e indipendenti per qualsiasi web server, ma che condividono i blocchi
con gli originali finché nessuno dei due viene modificato (lo spazio libero del
disco non è cambiato dopo la copia). I permessi sono stati portati a 644 perché
gli originali erano `-r--------`.

> **Da fare quando ci sarà `ffmpeg`**: ricomprimere questi file per il web
> (es. H.264 720p/1080p CRF 23 + `-movflags +faststart`), che li porterebbe da
> decine di MB a pochi MB l'uno. Finché non succede, il sito è leggero da
> sfogliare (vedi sotto) ma il singolo video resta pesante da riprodurre.

### Come la pagina resta leggera nonostante i file pesanti

- **Griglia** (`video.html`): nessun tag `<video>`, solo `<img>` delle miniature
  con `loading="lazy"`. Verificato in Chrome: aprendo la pagina vengono scaricati
  **0 byte di MP4**, solo i poster.
- **Pagina di riproduzione**: un solo `<video controls preload="metadata"
  playsinline>` (niente `autoplay`), quindi parte solo l'intestazione del file e
  il resto si scarica al play. I correlati nella colonna a destra sono link con
  miniatura, non player.

### Scelte di implementazione

- Il commento `TODO: sostituire con player video reale` è stato rimosso da
  `video-watch.html`. In `streaming-watch.html` il player è ora generato dalla
  stessa funzione, che ricade sul segnaposto finché la voce non ha un `src`.
- I template ripetuti nelle 4 pagine sono stati sostituiti da 3 helper condivisi
  in `js/main.js` (già incluso ovunque): `escapeHtml`, `videoThumbHtml`,
  `videoPlayerHtml`. `escapeHtml` serve davvero: "Matrimonio Claudia **&** Ivan"
  dentro un `alt=""` rompeva il markup.
- I **video verticali** (9:16: tutti gli sport e Miu Miu) sono marcati con
  `verticale: true` nel dataset. In griglia restano interi dentro la card 16:9
  (`object-fit: contain` su fondo nero) invece di essere ritagliati fino a
  mostrare solo una striscia centrale; nel player il riquadro passa a 9:16
  centrato, con tetto in `vh` per non superare l'altezza della finestra.

### Streaming: ancora fermo, e perché

`immagini/PORTFOLIO/STREAMING/` **è vuota**: non è arrivato nessun file di
streaming. `streaming.html` e `streaming-watch.html` restano quindi con le 10 card
placeholder. Sono però già collegate agli stessi helper: quando arriveranno i
file basterà aggiungere `src` e `poster` alle voci di `STREAM_DATA` in
`js/video-data.js` e il player reale comparirà da solo, senza toccare HTML o CSS.

### Ambiguità segnalate (non indovinate)

Le **categorie** non sono ambigue: vengono dalle cartelle. I dubbi riguardano i
titoli e i contenuti, e vanno confermati con Samuele:

1. **`VIDEO 1.mp4` / `VIDEO 2.mp4`** — nomi senza nessuna informazione. Titolati
   "Video Evento 1" e "Video Evento 2" solo per non lasciarli anonimi; servono i
   titoli veri.
2. **`DAY 1.mp4` … `DAY 7.mp4`** — sono 7 giornate della stessa cosa (dalle
   miniature sembra un camp/raduno di rugby), ma non si sa di quale evento.
   Titolati "Day 1"…"Day 7": andrebbero prefissati col nome del camp.
3. **`AU`** — ricorre in quasi tutti gli sport (`AU-ALGHERO`, `CUS VS AU`, …) ed
   è quasi certamente la sigla di una squadra, lasciata così com'è invece di
   espanderla a caso. Anche `CUS` è lasciato tale.
4. **Suffissi `_3`, `_1`, ` 3`** (`AU-ALGHERO_3`, `AU-LECCO_1`,
   `VIDEO DERBY AU-CUS 3`) — sembrano numeri di versione/montaggio, non parte del
   titolo: rimossi. Se invece indicano "partita 3", vanno rimessi.
5. **`VIDEO FESTA 50 ANNI MIAR`** — sta in `VIDEO/EVENTI/`, quindi è categorizzato
   come **Eventi**, ma una festa di compleanno starebbe bene anche in
   Celebrazioni. Rispettata la cartella. ("MIAR" lasciato com'è: non è chiaro se
   sia un nome proprio o un'azienda.)
6. **`VIDEORIASSUNTO Evento Ikea 28_4_2026`** — dal nome file ho tenuto solo
   "Videoriassunto Evento IKEA — 28 aprile 2026", scartando la coda
   `_Versione musica Royalti Free`, che descrive il montaggio e non l'evento. Se
   invece serve distinguere più versioni dello stesso video, va rimessa.
7. **Descrizioni** — nessuna informazione reale disponibile, quindi sono testi
   generici per categoria ("Video di evento realizzato da Samuele Casabianca.").
   Da sostituire con descrizioni vere.

### Verifiche fatte in browser (Chrome, `python3 -m http.server`)

- `video.html`: 22 card, tutte con miniatura reale, **0 immagini rotte**.
- Filtri: Tutti 22 · Eventi 6 · Matrimoni 1 · Sport 15, e ogni filtro mostra solo
  la propria categoria.
- Click su una card → pagina giusta: card "Video Evento 2" → `?v=3&cat=eventi`,
  titolo, file (`video-evento-2.mp4`) e poster corrispondenti.
- Riproduzione reale: su "Matrimonio Claudia & Ivan" `play()` avanza
  (`currentTime` 1,45 s, `readyState` 4) e `duration` = 298 s = 4:58, cioè
  esattamente la durata nel dataset.
- Video verticale ("Day 4"): player 9:16 centrato, correlati della stessa
  categoria.
- Nessun errore in console; **316 riferimenti ad asset** (HTML + `data-images` +
  dataset) controllati uno per uno, **nessuno rotto**.
- Nessuna regressione sulle foto: pannelli di `foto.html` e `lavoro.html` intatti,
  galleria delle foto sportive (allora `sport-rugby.html`, oggi `sport.html`)
  con le sue 54 foto e lightbox ancora funzionante.
- `streaming.html`: 10 card, tutte ancora placeholder, nessun tag `<video>`.

> **Nota sul server di sviluppo**: `python3 -m http.server` non supporta le
> richieste `Range`, quindi restituisce il file intero a ogni richiesta e lo
> spostamento sulla timeline dei video può risultare lento o non funzionare. Non
> è un problema del sito: qualsiasi hosting reale (o `npx serve`) supporta i
> Range. Da tenere presente se si testa in locale.

## Sport: da pannelli a galleria diretta

Semplificazione della sezione Foto: **Sport ora si comporta esattamente come
Programmi TV** — dal menu Foto si clicca "Sport" e si apre subito la galleria,
senza il passaggio intermedio a pannelli.

### Prima / dopo

```
PRIMA                                      DOPO
foto.html                                  foto.html
└── sport.html      → 3 pannelli           └── sport.html   → galleria diretta
    ├── sport-rugby.html      → galleria       (54 foto)
    ├── sport-calcio.html     → galleria
    └── sport-pallavolo.html  → galleria
```

### Cosa è stato fatto

- **`sport.html` riscritta**: da pagina a pannelli a galleria masonry, sulla
  falsariga di `programmi-tv.html` (stessa struttura `.masonry` / `.masonry-item`,
  hover scale, `loading="lazy"`, lightbox via `js/main.js`). Non include più
  `js/panels.js` né la chiamata a `initVerticalPanels()`.
- **Breadcrumb**: da "Lavoro / Foto / Sport / Rugby" a **"Lavoro / Foto / Sport"**,
  con `Sport` come `aria-current="page"` — identico allo schema di Programmi TV.
  La nav passa a `site-nav--solid` come tutte le pagine galleria (la vecchia
  `sport.html` a pannelli usava la nav trasparente).
- **Pagine eliminate**: `sport-rugby.html`, `sport-calcio.html`,
  `sport-pallavolo.html`.
- **Link**: nessuna modifica necessaria. Il pannello "Sport" di `foto.html` e la
  voce "Sport" del menu hamburger (generato in `js/main.js`) puntavano già a
  `sport.html`: è cambiata la natura della pagina, non il suo indirizzo. Anche
  `js/panels.js` non ha richiesto interventi, perché legge l'`href` dal DOM e non
  ha nessuna lista di pagine cablata.
- **Cartella asset invariata**: le foto restano in `assets/foto/sport-rugby/`. È
  solo il nome della cartella sorgente, non è esposto all'utente, e rinominarla
  avrebbe richiesto di toccare anche i `data-images` di `foto.html` senza alcun
  vantaggio.

### Le foto unite sono 54, non 78

"Unire tutte le foto delle tre gallerie" in pratica significa unire **solo quelle
di Rugby**, perché erano le uniche reali:

| Galleria di partenza | Contenuto reale |
|---|---|
| `sport-rugby.html` | **54 foto vere** → tutte confluite in `sport.html`, nello stesso ordine |
| `sport-calcio.html` | 0 foto — solo 14 riquadri placeholder |
| `sport-pallavolo.html` | 0 foto — solo 10 riquadri placeholder |

I 24 placeholder di calcio e pallavolo **non sono stati riportati** nella nuova
galleria: erano segnaposto vuoti generati via CSS, e trascinarli dentro una
galleria di foto reali avrebbe prodotto 24 rettangoli grigi in mezzo alle
fotografie. Quando arriveranno foto di calcio o pallavolo basterà aggiungerle
alla masonry di `sport.html`, senza ricreare nessuna sotto-pagina.

Di conseguenza l'`alt` delle immagini è passato da "Rugby — foto N" a
"Sport — foto N", e il sottotitolo della pagina è stato generalizzato
("Lo sport dal bordo campo: la fisicità del gioco, l'attesa e l'istante
decisivo.") invece di restare sul lessico rugbistico di prima
("dal fango della mischia alla meta"), dato che la pagina ora copre lo sport in
generale.

### Verifiche fatte in browser

- Da `foto.html`, click sul pannello "Sport" → si apre direttamente
  `sport.html` con la galleria; **nessun passaggio intermedio a pannelli**
  (`document.querySelectorAll('.panel').length === 0`).
- Breadcrumb letto dalla pagina: `Lavoro / Foto / Sport`.
- 54 foto caricate, **0 immagini rotte**, 0 placeholder residui, lightbox che si
  apre al click.
- Le tre vecchie pagine rispondono **404**; crawl di tutti i link interni del sito
  (128 link, inclusi quelli iniettati da `js/main.js` nel menu hamburger):
  **nessun link rotto**.
- Nessun errore in console.
- Categorie non toccate, verificate intatte: `celebrazioni.html` (2 pannelli →
  Matrimoni/Feste Private), `eventi.html` (3 pannelli → Aziendali/Brand/Gala),
  `programmi-tv.html` invariata. Streaming e Video non toccati.

## Bugfix

Tre problemi emersi testando il sito dopo l'inserimento delle foto reali,
corretti in questa sessione (verificati uno per uno in browser prima di
passare al successivo).

**1. Logo troppo grande/fuori scala in alcuni punti**
- *Causa*: `.logo-sc img`/`.splash-logo img` avevano solo `height` + `width:
  auto` — corretto in condizioni normali, ma senza un limite esplicito
  indipendente (`max-width`/`max-height`), qualunque regola che in futuro
  tocchi `height` (o un mismatch di cache tra HTML e CSS durante lo sviluppo)
  fa tornare l'immagine alla sua dimensione intrinseca (429×418 px), enorme
  rispetto allo spazio della nav (64px) — da cui l'effetto "sovrapposto ai
  pannelli sottostanti" nell'angolo in alto a sinistra.
- *Soluzione*: aggiunto `max-width`/`max-height` espliciti + `object-fit:
  contain` sia su `.logo-sc img` (nav e footer: 28px, `max-width: 40px`) sia
  su `.splash-logo img` (splash: `clamp(4rem,12vw,6rem)`, `max-width: 60vw`)
  — ora la dimensione è vincolata "in doppio" (dimensione dichiarata +
  tetto massimo) e non può mai crescere oltre lo spazio del vecchio
  monogramma testuale che sostituisce. Verificato che non ci fosse markup
  testuale "S C" residuo insieme al tag `<img>` in nessuna pagina (nessuno
  trovato — il markup era già pulito).

**2. Click su un pannello richiedeva refresh dopo un back/bfcache**
- *Causa*: `setupPanelsExit()` in `js/panels.js` usa un flag di chiusura
  `leaving` per evitare doppie navigazioni durante l'animazione di uscita,
  impostato a `true` al click ma **mai resettato**. Quando si torna a una
  pagina con il tasto "indietro" del browser e la pagina viene ripristinata
  dalla **bfcache** (back/forward cache: il motore congela l'intera pagina,
  JS incluso, invece di ricaricarla da zero), quella closure resta viva
  esattamente com'era al momento del freeze — se `leaving` era `true` quando
  si è navigato via, resta `true` per sempre, e ogni click successivo su
  qualunque pannello viene silenziosamente ignorato (`if (leaving) return;`)
  finché non si ricarica manualmente la pagina.
- *Soluzione*: `setupPanelsExit()` ora ritorna una funzione `reset()` che
  rimette `leaving = false`; `initVerticalPanels()` la richiama dentro il
  listener `pageshow` già esistente, insieme al resto della pulizia (già
  presente) dello stato "in uscita". Verificato **con un vero ripristino
  bfcache** (non la semplice navigazione "indietro" del browser, che in
  alcuni contesti automatizzati ricarica la pagina da zero invece di
  restituire l'istanza congelata): pagina A → click su un pannello → pagina
  B → `history.back()` → istanza JS di A confermata come la stessa
  (`pageshow` con `persisted: true`) → click su un pannello diverso →
  naviga correttamente, senza refresh.

**3. Le immagini dei pannelli scorrevano anche senza hover**
- *Causa*: lo scorrimento del filmstrip era legato a `.panel:hover
  .panel-filmstrip, .panel:focus-visible .panel-filmstrip` in CSS. Il
  problema non era un `setInterval` residuo (verificato: non ce n'era
  nessuno, l'unico meccanismo era già il CSS `:hover`/`:focus-visible`), ma
  proprio `:focus-visible`: cliccare un pannello (un `<a>`) spesso lo lascia
  focused anche dopo `preventDefault()` sul click (il focus avviene nella
  fase di "activation" del browser, prima che il gestore del click possa
  intervenire), quindi il filmstrip continuava a scorrere per il pannello
  appena cliccato anche senza hover — ed essendo lo stato del DOM ripristinato
  intatto dalla bfcache, uno stato "focused"/"in scorrimento" ereditato da
  prima poteva restare visibile anche tornando indietro col browser.
- *Soluzione*: il trigger non è più CSS `:hover`/`:focus-visible` ma una
  classe `.is-scrolling` sul filmstrip, aggiunta/rimossa esclusivamente da
  `panels.js` in risposta a `mouseenter`/`mouseleave` (+ `focus`/`blur` per
  l'accessibilità da tastiera, così non si perde la possibilità di attivarlo
  via Tab) — mai da un pseudo-classe CSS che può restare "vera" più a lungo
  del previsto. In più, il listener `pageshow` (bfcache) ora rimuove
  esplicitamente `.is-scrolling` da qualunque filmstrip, così anche un
  hover/focus "congelato" al momento del freeze non sopravvive al ripristino.
  Verificato: 0 filmstrip con `.is-scrolling` a riposo, esattamente 1 (quello
  hover-ato) durante l'hover, torna a 0 non appena il cursore esce.

**4. Ritratto "Chi Sono" tagliato in testa durante l'hover**
- *Causa*: `.panel-slide` usa `background-size: cover; background-position:
  center;` per adattare le foto al pannello. Le foto di `assets/foto/chi-sono/`
  sono ritratti verticali (persona intera), mentre il pannello in hover-expand
  diventa molto più largo che alto — con la posizione centrata, il ritaglio
  "cover" restava centrato sul busto/braccia incrociate e tagliava via la
  testa.
- *Soluzione*: aggiunta una regola più specifica `.panel[href="chi-sono.html"]
  .panel-slide { background-position: center top; }` che ancora l'inquadratura
  in alto (dove si trova il viso) invece che al centro verticale della foto,
  sacrificando la parte inferiore (gambe) invece della testa. Verificato su
  tutte e 4 le foto del pannello Chi Sono (`profilo.jpg` + `verona-1/2/3.jpg`):
  viso sempre visibile durante l'hover.

## Decisioni prese

- **Font (Google Fonts)**: `Anton` per i titoli strutturali (display, condensed
  bold), `Caveat` per lo script "Samuele" / titolo bio, `Archivo` per il testo
  corrente. Cambiabili dalle variabili `--font-display`, `--font-script`,
  `--font-body` in `:root`.
- **Colori**: tema scuro. Variabili principali: `--color-bg` (#0e0e10),
  `--color-placeholder` (#232328), `--color-accent` (#c9a26b, oro caldo per
  hover/dettagli). Tutte in `:root` in `css/style.css`.
- **Logo reale** (`assets/logo-sc.png`, sostituisce il monogramma testuale "S C"
  in nav/splash/footer): il file originale (`immagini/PORTFOLIO/SC + LOGO/LOGO
  SC UFFICIALE.png`, 2084×2084) è quasi tutto trasparenza attorno al marchio
  vero e proprio, e il marchio è disegnato in nero pieno (`rgb(0,0,0)`) — su
  sfondo scuro sarebbe stato pressoché invisibile. Il file in `assets/` è stato
  ritagliato al bounding box del contenuto (con margine, via
  `Image.getbbox()`) e ricolorato: solo i pixel neri sono stati sostituiti col
  colore testo del sito (`#f2f2f0`), lasciando invariata la "c" grigia
  (`rgb(96,96,96)`, già leggibile su sfondo scuro, nella stessa famiglia di
  `--color-text-muted`). La cornice ad angoli aperti che prima disegnavamo via
  `::before`/`::after` su `.logo-sc` è già disegnata dentro il file, quindi
  quelle regole CSS sono state rimosse; `.logo-sc img` (nav/footer) è
  dimensionata via `height: 46px; width: auto;` **più** `max-width: 64px` /
  `max-height: 46px` + `object-fit: contain` come tetto esplicito di
  sicurezza (vedi bug #1 in "Bugfix": senza un limite indipendente da
  `height`, l'immagine poteva tornare alla sua dimensione intrinseca
  429×418px ed essere renderizzata enorme). Hover: solo un lieve
  `opacity: 0.8` (il colore non può più cambiare in hover come faceva il
  testo).
  - **Presentazione nello splash — riquadro + ritaglio luminoso + volo FLIP**
    (solo `index.html`, markup in `index.html`, logica in `js/splash.js`,
    stili in `css/style.css` sezione `/* === Splash screen === */`):
    sostituisce la precedente versione (logo "nudo" ingrandito con semplice
    fade) con una sequenza in tre tempi. Il logo vive dentro `.splash-stage`
    (168px di lato, 128px sotto i 768px — dimensione **fissa in px**, non
    fluida con `clamp()`/`vw`, perché i keyframe dei due punti di luce sotto
    sono in percentuale relativa a questo box e un ridimensionamento fluido
    a metà animazione li disallineerebbe dal riquadro), un quadrato
    `.splash-frame` con angoli smussati (`--splash-frame-radius: 18px`),
    sfondo `--color-surface` (leggermente più chiaro del `--color-bg` dello
    splash, altrimenti un quadrato nero su sfondo nero non si vedrebbe) e
    bordo/ombra sottili.
    1. **Ritaglio luminoso** (~1.2s, solo CSS, nessun JS): il riquadro parte
       mascherato da un `clip-path: inset(0 0 100% 0 round …)` (non un
       semplice `opacity: 0` — deve sembrare buio da cui il logo emerge) e
       si rivela dall'alto verso il basso (`@keyframes splash-frame-reveal`,
       l'inset dal basso passa da 100% a 0%) mentre due `.splash-dot` (piccoli
       cerchi con `box-shadow` diffuso, quindi "luminosi") percorrono il
       perimetro del riquadro partendo insieme dal centro del lato superiore
       e muovendosi in direzioni opposte (`@keyframes splash-dot-cw` /
       `splash-dot-ccw`, coordinate `left`/`top` in **percentuale** — così
       restano corrette a qualunque dimensione del box, incluso dopo un
       resize), fino a incontrarsi al centro del lato inferiore (dove
       svaniscono, `opacity` a 0 nell'ultimo tratto del keyframe). Il
       riquadro e i punti condividono la stessa durata/easing per restare
       percepiti come sincronizzati, anche se la geometria del "sipario"
       (una fascia orizzontale che cresce dall'alto) è un'approssimazione
       pulita del percorso reale dei due punti lungo un perimetro rettangolare
       (angoli smussati inclusi), non un `clip-path` poligonale che ne segue
       il tracciato esatto — scelta deliberata per restare implementabile con
       poche regole CSS mantenendo il risultato visivo voluto.
    2. **Pausa**: il riquadro resta fermo e visibile per il resto di
       `DURATION_MS` (3s totali fra ritaglio e pausa).
    3. **Volo verso la nav** (tecnica FLIP, in `js/splash.js`): allo scadere
       di `DURATION_MS`, si misurano con `getBoundingClientRect()` — calcolato
       **al momento dell'animazione, non in anticipo** — sia il logo dentro
       lo splash sia quello reale nella nav (già nel DOM, solo coperto dallo
       splash); si clona l'`<img>` dello splash in un elemento
       `position: fixed` (classe `.logo-fly`, z-index sopra lo splash),
       dimensionato con `width`/`height` fissi pari al rettangolo di partenza
       e `transform-origin: top left`; si nasconde l'originale
       (`visibility: hidden`, niente doppia immagine) e si aggiunge al
       riquadro la classe `.splash-frame.is-dismissing` (sfondo/bordo/ombra
       verso `transparent`, cornice che sparisce mentre il logo vola). Al
       frame successivo il `transform` del clone passa da
       `translate(fromRect.left, fromRect.top)` a
       `translate(toRect.left, toRect.top) scale(toRect.width/fromRect.width,
       toRect.height/fromRect.height)` — **mai** animando `top`/`left`/
       `width`/`height` direttamente (restano fissi, solo il `transform`
       cambia, per stare sul compositor) — con `transition: transform 0.8s
       cubic-bezier(0.65,0,0.35,1)`. Il clone viene rimosso a transizione
       conclusa, mentre l'intero overlay sfuma in parallelo (`.is-hidden`,
       comportamento preesistente): alla fine resta solo il logo nudo della
       nav, senza cornice residua.
    Con `prefers-reduced-motion: reduce`: il riquadro appare già completo
    (`.splash-frame { animation: none; clip-path: none; }` nella media query
    dedicata) e i due punti restano nascosti del tutto (`display: none`,
    non semplicemente "veloci"); in JS il volo non parte affatto
    (`flyLogoToNav()` non viene chiamata), quindi lo splash si limita al
    fade-out esistente. Tutte le costanti di durata (`DURATION_MS`,
    `FADE_MS`, `FLY_MS` in `js/splash.js`) devono restare allineate alle
    rispettive `transition`/`animation` CSS.
- **Componente pannelli verticali**: markup minimo in HTML
  (`<a class="panel" data-title>` dentro `.panels`), le slide di sfondo sono
  **generate da JS** (`initVerticalPanels()` in `js/panels.js`) per non
  duplicare markup. Hover-expand via CSS (`flex-grow: 1.6` con transizione).
  - **Crossfade solo in hover** (sostituisce il precedente scorrimento a
    filmstrip): `panels.js` genera una `.panel-slides` con dentro N
    `.panel-slide` sovrapposte (`position: absolute; inset: 0`, non più una
    riga flex — niente più sequenza duplicata, non serve per un crossfade).
    Da fermo si vede solo la prima slide (classe `.is-active`, `opacity: 1`),
    nessuna transizione. Il cambio slide parte/si ferma esclusivamente in
    risposta a `mouseenter`/`mouseleave` (+ `focus`/`blur` per
    l'accessibilità da tastiera) gestiti in JS — **non** CSS `:hover`/
    `:focus-visible` diretto sull'animazione (vedi bug #3 in "Bugfix": quei
    pseudo-stati possono restare "veri" più a lungo del previsto, es. un
    pannello che resta focused dopo un click, o lo stato ereditato dalla
    bfcache). Su mouseenter/focus parte un `setInterval` (`crossfadeInterval`,
    default 1.8s) che ogni tick toglie `.is-active` dalla slide corrente e la
    aggiunge alla successiva; il crossfade vero e proprio è CSS
    (`.panel-slide { transition: opacity 0.7s ease-in-out; }`). Su
    mouseleave/blur l'interval viene distrutto (`clearInterval` +
    rimosso da una `Map` pannello→id) e la dissolvenza si ferma **sulla slide
    corrente**, senza tornare alla prima. Con `prefers-reduced-motion: reduce`
    `panels.js` non aggiunge nemmeno i listener mouseenter/mouseleave/focus/blur
    (nessun interval può partire). Il listener `pageshow` (bfcache) svuota la
    `Map` chiamando `clearInterval` su ogni id rimasto: se il crossfade era
    attivo quando si è navigato via, l'interval resterebbe agganciato in
    memoria dalla bfcache e continuerebbe a cambiare slide anche senza hover.
  - **Pannello "Contattami" escluso** (`index.html`): ha la classe
    `panel--static` in più oltre a `.panel`. `panels.js` lo riconosce
    (`panel.classList.contains('panel--static')`) e gli genera un solo
    placeholder statico (una sola `.panel-slide`), e **non aggiunge nemmeno i
    listener** mouseenter/mouseleave/focus/blur per quel pannello — quindi
    nessun crossfade può mai partire, in nessuna circostanza. Mantiene solo
    l'hover-expand (flex-grow) comune a tutti i pannelli.
  - **Per usare foto reali nei pannelli**: aggiungere al pannello
    `data-images="assets/foto/categoria/a.jpg,assets/foto/categoria/b.jpg"` —
    il JS le usa come background al posto dei placeholder. Nessun'altra
    modifica necessaria. Già fatto per la maggior parte dei pannelli, vedi
    "Immagini reali inserite" per l'elenco completo e per la pipeline di
    ottimizzazione da seguire con le foto nuove.
- **Galleria**: masonry con CSS `columns` (niente JS per il layout). Le
  proporzioni dei placeholder variano tramite classi `ph--tall`, `ph--wide`,
  `ph--square`, `ph--panorama` per simulare il ritmo masonry.
- **Lightbox**: markup iniettato da `js/main.js`; prev/next, ESC, frecce
  tastiera, click sullo sfondo per chiudere. Se un `.masonry-item` contiene un
  `<img>`, il lightbox mostra l'immagine (supporta `data-full` per la versione
  ad alta risoluzione); altrimenti replica il placeholder.
- **Menu mobile**: overlay a schermo intero iniettato da `js/main.js` (per non
  duplicare il markup in 16 pagine), aperto dall'hamburger presente in ogni nav.
- **Breadcrumb**: nella nav fissa di ogni pagina interna, con link ai livelli
  superiori (es. "Lavoro / Eventi / Aziendali").
- **Pagine galleria generate da template**: le 9 pagine foglia condividono la
  stessa struttura (cambiano titolo, breadcrumb, descrizione e numero di
  placeholder). Se serve modificarle tutte, conviene farlo con un
  trova-e-sostituisci coerente o rigenerarle.
- **Splash screen (solo home)**: all'apertura di `index.html` compare per 3 s
  (totali fra ritaglio luminoso e pausa) un overlay a schermo pieno
  (`.splash`, markup direttamente in `index.html`) col riquadro/logo descritto
  nella voce **Logo reale** più sopra (ritaglio luminoso → pausa → volo FLIP
  verso la nav). La logica è in `js/splash.js` (incluso solo in `index.html`):
  blocca lo scroll di html/body, allo scadere di `DURATION_MS` avvia il volo
  FLIP e aggiunge `.is-hidden` (fade-out CSS 0.7 s su opacity) e a transizione
  finita rimuove l'overlay dal DOM e sblocca lo scroll (con fallback a
  timeout se `transitionend` non scatta). Gli stili sono in `css/style.css`,
  sezione `/* === Splash screen === */`. Si ripete a ogni caricamento della
  home (scelta voluta, nessun sessionStorage). Durata/fade/volo regolabili
  con le costanti `DURATION_MS`, `FADE_MS` e `FLY_MS` in `js/splash.js` (devono
  corrispondere alle rispettive `transition`/`animation` CSS).
- **Transizione tra pagine a pannelli**: gestita da `initVerticalPanels()` in
  `js/panels.js`, quindi attiva automaticamente su tutte le pagine a pannelli
  (index, lavoro, celebrazioni, eventi, sport). Stili nella sezione
  `/* === Transizioni pannelli === */` di `css/style.css`. Due metà:
  - **Uscita**: al click su un pannello il JS fa `preventDefault()`, crea un
    clone visivo (`.panel-expander`, `position: fixed` sul rettangolo del
    pannello, stesso sfondo della slide attiva e stesso titolo) che si espande
    a tutto schermo con transizione CSS (~0.55 s, cubic-bezier 0.65,0,0.35,1)
    mentre il resto sfuma (classe `is-leaving` sul body); a fine espansione
    naviga davvero (`window.location.href`). Il colore di sfondo del pannello
    viene salvato in `sessionStorage` (chiave `sc-panel-bg`).
  - **Ingresso**: a ogni caricamento di una pagina a pannelli, i pannelli
    partono chiusi (`.panel--closed`, `transform: scaleX(0)`; `scaleY` su
    mobile dove sono impilati) dietro una cover a schermo pieno
    (`.panels-cover`) che usa il colore salvato in `sessionStorage` (o il
    colore di sfondo standard), poi si aprono in sequenza con stagger di 70 ms
    (~0.5 s a pannello). Sulla home lo split parte in sincrono col fade-out
    dello splash (evento `sc:splash-hiding` emesso da `js/splash.js`).
  - Cmd/Ctrl-click e click col tasto centrale mantengono il comportamento
    nativo (nuova scheda); il ritorno con back/forward cache viene ripulito e
    rigioca lo split (`pageshow` con `persisted`). Con
    `prefers-reduced-motion: reduce` entrambe le metà sono disattivate e la
    navigazione è immediata. Le pagine galleria (foglie) non hanno animazione
    d'ingresso: ricevono la normale navigazione dopo l'espansione del pannello
    genitore.
- **Sezioni Streaming e Video** (`streaming.html`, `video.html` +
  `streaming-watch.html`, `video-watch.html`): non usano il componente
  pannelli, ma una griglia in stile piattaforma video (`.video-grid` /
  `.video-card`, card 16:9 con titolo/canale/durata placeholder sotto).
  - **Dataset condiviso**: `js/video-data.js` espone due array globali,
    `STREAM_DATA` e `VIDEO_DATA` (oggetti `{ id, titolo, categoria, canale,
    durata, descrizione }`, `categoria` solo sui video). Le quattro pagine lo
    includono e leggono solo da lì — **quando arriveranno i contenuti reali,
    basta sostituire questi due array** (e collegare l'url/embed del player al
    posto del placeholder), nessun'altra modifica a HTML necessaria.
  - **Griglie** (`streaming.html`/`video.html`): la griglia viene generata da
    uno script inline che mappa il dataset in card `<a class="video-card"
    href="…-watch.html?v=ID(&cat=CATEGORIA)">`. In `video.html` le card hanno
    anche `data-categoria`.
  - **Filtro categoria** (solo `video.html`): chip `.chip` (Tutti / Eventi /
    Matrimoni / Sport); al click aggiunge `.is-filtered-out` (`opacity: 0;
    pointer-events: none`) alle card non corrispondenti — filtro client-side,
    nessuna ricarica pagina, nessun layout reflow oltre alla dissolvenza.
  - **Pagine di riproduzione** (`streaming-watch.html`/`video-watch.html`):
    layout a due colonne `.watch-layout` (player + info a sinistra, correlati
    `.watch-related-list` a destra; a una colonna sotto i 900px). Leggono
    `v` (e `cat`) dalla query string con `URLSearchParams`, cercano il record
    corrispondente nel dataset e popolano titolo/meta/descrizione/breadcrumb
    via JS; i correlati sono le altre voci del dataset (in `video-watch.html`
    prima quelle della stessa categoria, poi le altre), max 8. Il player
    (`.watch-player`) è un placeholder cliccabile senza azione reale, marcato
    con `<!-- TODO: sostituire con player video reale -->`.
  - Il pannello "Streaming" su `lavoro.html` porta un badge
    `.panel-note` ("Contenuti in arrivo"): la pagina è già funzionante, manca
    solo il contenuto video reale.
- **Classi CSS principali**: `.panels`/`.panel`/`.panel-title`/`.panel-slides`/
  `.panel-slide`, `.masonry`/`.masonry-item`, `.video-grid`/`.video-card`,
  `.watch-layout`, `.chip`, `.ph` (placeholder foto generico), `.site-nav`,
  `.lightbox`, `.mobile-menu`, `.btn`.

## Placeholder ancora da sostituire

**Foto mancanti** (nessun file disponibile in `immagini/`, vedi "Immagini reali
inserite" — quando arriveranno, seguire la stessa pipeline di ottimizzazione
descritta lì prima di collegarle):
- Pannello "Brand" e "Gala" su `eventi.html` (e relativa anteprima su `foto.html`)
- Foto di calcio e pallavolo: non esistono più pannelli/gallerie dedicati (Sport
  è una galleria unica), quindi quando arriveranno andranno semplicemente
  aggiunte alla masonry di `sport.html`
- `eventi-brand.html` — galleria, 11 placeholder
- `eventi-gala.html` — galleria, 13 placeholder

**Streaming e Video** (sostituire i due array in `js/video-data.js`, e il
player placeholder `.watch-player` nelle pagine di riproduzione con un embed
reale — non toccati in questo passaggio):
- `STREAM_DATA` — 10 voci placeholder per `streaming.html`/`streaming-watch.html`
- `VIDEO_DATA` — 12 voci placeholder (4 Eventi, 4 Matrimoni, 4 Sport) per
  `video.html`/`video-watch.html`
- Pannello "Streaming" e "Video" su `lavoro.html` (badge "Contenuti in arrivo"
  sul primo)

**Altri**:
- `contattami.html` — email reale (anche in `js/main.js`, funzione
  `initContactForm`, indirizzo del `mailto:`), Instagram e LinkedIn reali
  (ora `href="#"`)

## Prossimi passi

1. Ricevere le foto mancanti (Brand, Gala, Calcio, Pallavolo) e inserirle con la
   stessa pipeline usata per le altre categorie (vedi "Immagini reali inserite").
2. Ricevere i contenuti di Streaming e Video e sostituire `js/video-data.js` +
   collegare un player reale nelle pagine `*-watch.html`.
3. Inserire email/social reali di Samuele.
4. Rifiniture su testi bio e descrizioni categorie (ora testi provvisori).
5. Eventuale favicon e immagine Open Graph per la condivisione.
6. Deploy (hosting statico: GitHub Pages, Netlify, ecc.) — fuori scope attuale.
