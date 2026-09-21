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
- [x] **Sitemap ristrutturata (seconda volta)**: `lavoro.html` mostra direttamente le
  4 categorie (Programmi TV / Celebrazioni / Eventi / Sport); `foto.html`,
  Streaming e Video eliminati — vedi "Ristrutturazione: via Foto, Streaming e
  Video; storie nelle gallerie" e l'albero sotto
- [x] Pagine di navigazione a pannelli: `index.html` (3), `lavoro.html` (4), `celebrazioni.html` (2)
- [x] **Storie video in stile Instagram** sopra la galleria di ogni pagina foglia
  (`js/stories.js`) — vedi "Componente storie"
- [x] **Eventi semplificata a galleria diretta** (come Sport e Programmi TV)
- [x] **Sport semplificata a galleria diretta** (come Programmi TV): niente più
  sotto-categorie Rugby/Calcio/Pallavolo — vedi "Sport: da pannelli a galleria diretta"
- [x] Componente galleria masonry + hover zoom + lightbox (`js/main.js`)
- [x] 5 pagine galleria, tutte con foto reali — nessun riquadro segnaposto residuo
  nel sito dopo l'unificazione di Sport ed Eventi
- [x] `chi-sono.html` — bio con ritratto reale
- [x] `contattami.html` — form mailto + contatti
- [x] Responsive: pannelli impilati su mobile, menu hamburger overlay
- [x] Splash screen di benvenuto sulla home (3 s, monogramma centrato, fade-out)
- [x] Transizione animata tra pagine a pannelli (espansione in uscita + split in ingresso)
- [x] ~~Sezioni Streaming e Video in stile piattaforma~~ — **eliminate**: i video ora
  vivono come storie dentro le categorie, Streaming non arriverà
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
- [x] **Pannelli non più a tutta altezza + riga social** sulle 4 pagine a pannelli
  (index, lavoro, foto, celebrazioni): pannelli con altezza fluida e margini
  laterali, icone Instagram/LinkedIn sotto — vedi "Pannelli ridimensionati e riga social"
- [x] **Link social reali** (Instagram `@ph.samuele`, LinkedIn), **pannelli come
  riquadri staccati ad angoli smussati** e **collage a scorrimento** sul pannello
  "Il Mio Lavoro" della home — vedi "Social reali, pannelli smussati, collage a
  scorrimento"
- [ ] Foto reali per Brand/Gala (Eventi) e Calcio/Pallavolo (Sport): nessun file
  disponibile in `immagini/`; quando arriveranno vanno aggiunte alle masonry di
  `eventi.html` e `sport.html`
- [x] **Video reali collegati** (22 file da `immagini/PORTFOLIO/VIDEO/`), con
  miniature estratte dal video — oggi mostrati come storie nelle gallerie
  (vedi "Componente storie")
- [x] **Chi Sono in home**: a riposo `verona-3.jpg` (Samuele dietro le telecamere),
  inquadratura impostata foto per foto — vedi "Chi Sono: foto iniziale e
  inquadratura per foto"
- [x] **Storie con riquadro sempre verticale** e pulsante schermo intero sui video
  orizzontali — vedi "Riquadro verticale e schermo intero"
- [x] **Contattami in home**: due immagini nuove (`assets/foto/contattami/`),
  armonizzate con filtri CSS — vedi "Immagini del pannello Contattami"
- [ ] **Video online**: i `.mp4` esistono solo in locale (esclusi dal repo), quindi
  **sul sito pubblicato le storie non funzionano** finché i video non vengono
  caricati su un hosting che serva file MP4 diretti — vedi "Deploy"
- [ ] Email reale (ora segnaposto). Instagram e LinkedIn sono già reali, sia in
  `contattami.html` sia nella riga `.social-links` delle pagine a pannelli
- [ ] Deploy/hosting (fuori scope per questa fase)

## Sitemap

```
index.html                          → 3 pannelli: Chi Sono | Il Mio Lavoro | Contattami
├── chi-sono.html                   → bio
├── lavoro.html                     → 4 pannelli: Programmi TV | Celebrazioni | Eventi | Sport
│   ├── programmi-tv.html           → storie (segnaposto "in arrivo") + galleria
│   ├── celebrazioni.html           → 2 pannelli: Feste Private | Matrimoni
│   │   ├── celebrazioni-feste-private.html   → storie (segnaposto) + galleria
│   │   └── celebrazioni-matrimoni.html       → storie (1 video) + galleria
│   ├── eventi.html                 → storie (6 video) + galleria
│   └── sport.html                  → storie (15 video) + galleria
└── contattami.html                 → form + contatti
```

Ogni breadcrumb interno riflette questo albero: "Lavoro / Sport",
"Lavoro / Celebrazioni / Matrimoni" (niente più livello "Foto"). Il menu hamburger
(generato da `js/main.js`) elenca Home, Chi Sono, Il Mio Lavoro con sotto le 4
categorie, Contattami.

## Struttura del progetto

| File | Descrizione |
|---|---|
| `index.html` | Landing: hero col nome + 3 pannelli (Chi Sono / Il Mio Lavoro / Contattami) — foto reali; crossfade su Chi Sono e Contattami, collage a scorrimento continuo (`panel--scroll`) su Il Mio Lavoro |
| `chi-sono.html` | Pagina statica bio: ritratto reale (`assets/foto/chi-sono/profilo.jpg`) a sinistra, testo a destra |
| `lavoro.html` | 4 pannelli con foto reali: Programmi TV / Celebrazioni / Eventi / Sport (prima stavano in `foto.html`, eliminata) |
| `celebrazioni.html` | 2 pannelli con foto reali: Matrimoni / Feste Private |
| `eventi.html` | Storie (6 video) + galleria diretta — 50 foto reali (ex Aziendali/Brand/Gala unite) |
| `sport.html` | Storie (15 video) + galleria diretta — 54 foto reali (ex Rugby/Calcio/Pallavolo unite) |
| `programmi-tv.html` | Storie (segnaposto "Video in arrivo") + galleria — 17 foto reali |
| `celebrazioni-matrimoni.html` | Storie (1 video) + galleria — 47 foto reali |
| `celebrazioni-feste-private.html` | Storie (segnaposto "Video in arrivo") + galleria — 28 foto reali |
| `contattami.html` | Form contatti (mailto:) + email/Instagram/LinkedIn |
| `css/style.css` | Tutto lo stile; variabili tema in `:root` in cima al file |
| `js/panels.js` | `initVerticalPanels()`: crossfade slide solo-hover, collage `panel--scroll`, inquadratura per foto in `data-images`, transizioni animate tra pagine a pannelli |
| `js/main.js` | Menu hamburger overlay, lightbox galleria, form mailto (auto-init su DOMContentLoaded) |
| `js/stories.js` | Storie video in stile Instagram (fila di palline + visore a schermo intero); incluso solo nelle 5 pagine galleria, dopo `js/video-data.js` |
| `js/splash.js` | Splash screen di benvenuto (incluso solo in `index.html`); anima il logo dallo splash alla nav (FLIP) all'uscita |
| `js/video-data.js` | `VIDEO_DATA` con i 22 video reali (categoria, titolo, `verticale`, `src`, `poster`), letto da `js/stories.js`. `STREAM_DATA` eliminato |
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
| `contact me/` (2 immagini, fuori da `FOTO/`) | `contattami/` — vedi "Immagini del pannello Contattami" |

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
  dentro un `alt=""` rompeva il markup. *(Poi rimossi tutti e tre con le pagine
  video: le storie non costruiscono markup da stringhe, vedi "Codice rimasto
  senza uso, rimosso".)*
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

## Eventi: da pannelli a galleria diretta

Stessa semplificazione già applicata a Sport: **Eventi ora si comporta come
Programmi TV e Sport** — dal menu Foto si clicca "Eventi" e si apre subito la
galleria, senza il passaggio intermedio a pannelli.

```
PRIMA                                      DOPO
foto.html                                  foto.html
└── eventi.html     → 3 pannelli           └── eventi.html  → galleria diretta
    ├── eventi-aziendali.html → galleria       (50 foto)
    ├── eventi-brand.html     → galleria
    └── eventi-gala.html      → galleria
```

### Cosa è stato fatto

- **`eventi.html` riscritta**: da pagina a pannelli a galleria masonry, con la
  stessa identica struttura di `sport.html` (verificata per confronto:
  `.masonry` / `.masonry-item`, `loading="lazy"`, lightbox via `js/main.js`,
  nav `site-nav--solid`, footer standard). Non include più `js/panels.js`.
- **Breadcrumb**: da "Lavoro / Foto / Eventi / Aziendali" a
  **"Lavoro / Foto / Eventi"**, con `Eventi` come `aria-current="page"`.
- **Pagine rimosse**: `eventi-aziendali.html`, `eventi-brand.html`,
  `eventi-gala.html`.
- **Link**: nessuna modifica necessaria. Il pannello "Eventi" di `foto.html` e la
  voce del menu hamburger puntavano già a `eventi.html`.
- **Cartella asset invariata**: le foto restano in `assets/foto/eventi-aziendali/`.

### Le foto unite sono 50, non 74

Come per Sport, unire le tre gallerie significa in pratica unire **solo quelle
Aziendali**, le uniche reali: `eventi-brand.html` aveva 11 placeholder e
`eventi-gala.html` 13, riquadri grigi generati via CSS che non sono stati
riportati nella nuova galleria. L'`alt` delle immagini è passato da "Evento
aziendale — foto N" a "Eventi — foto N" e il sottotitolo è stato generalizzato,
dato che la pagina ora copre gli eventi in generale.

Quando arriveranno foto di Brand o Gala basterà aggiungerle alla masonry di
`eventi.html`, senza ricreare nessuna sotto-pagina.

## Pannelli ridimensionati e riga social

Le pagine a pannelli (`index.html`, `lavoro.html`, `foto.html`,
`celebrazioni.html`) non occupano più esattamente l'altezza della finestra: i
pannelli restano grandi ma lasciano spazio sotto per una riga di icone social
sempre visibile senza scorrere.

### Cosa è cambiato

- **`.panels` (desktop)**: non più `height: 100vh/100dvh`. Ora
  `margin: var(--nav-height) var(--space-md) 0` (partono sotto la nav, margine
  laterale di 2rem allineato al padding della nav; *poi*: niente più raggio sul
  contenitore, i pannelli sono riquadri smussati separati, vedi sezione successiva)
  e
  `height: clamp(22rem, calc(100dvh - var(--nav-height) - var(--social-row-height)), 60rem)`
  (con fallback `vh` sulla riga prima). A 1440x900: 900 − 64 − 88 = **748px**
  di pannelli, pagina alta esattamente 900, nessuno scroll. Il minimo evita
  pannelli schiacciati su finestre molto basse (lì si scorre), il massimo li
  ferma sui monitor molto alti.
- **Nuova variabile** `--social-row-height: 5.5rem` in `:root`: altezza della
  riga social, usata sia dalla riga sia dal calcolo dell'altezza dei pannelli —
  se si cambia, restano allineati da soli.
- **Riga social** `<nav class="social-links" aria-label="Profili social">`
  subito dopo `</main>` nelle 4 pagine, con due `<a class="social-link">`
  (Instagram, LinkedIn): SVG inline 24px a contorno (`stroke="currentColor"`,
  `aria-hidden`), `aria-label` descrittivo, `target="_blank" rel="noopener"`.
  Colore `--color-text-muted`, hover/focus `--color-accent`. Nessuna risorsa
  esterna (il sito continua a caricare solo Google Fonts). *(Link reali inseriti
  nel passaggio successivo, vedi sotto.)*
- **Uscita**: `.is-leaving .social-links` sfuma insieme a pannelli e nome.
- **Mobile (≤768px)**: pannelli sempre impilati, margini laterali
  `var(--space-sm)`, `min-height` del contenitore = finestra − nav − riga social,
  e `.panel { flex: 1 0 auto }` (prima `flex: none`) con `flex-grow: 1` anche in
  hover (quindi nessun allargamento, come prima). Effetto: con pochi pannelli
  (Celebrazioni, 2) riempiono lo schermo e la riga social si vede senza
  scorrere, invece di lasciare il vuoto che lasciava il vecchio
  `min-height: 100dvh` con pannelli `flex: none`; con 3–4 pannelli la pagina
  scorre e la riga social arriva subito dopo l'ultimo.
- `js/panels.js` **non è stato toccato**.

### Punti delicati controllati

- **Cover d'ingresso** (`.panels-cover`): resta a schermo pieno di proposito.
  La pagina precedente finisce con il clone espanso a tutto schermo, quindi la
  cover deve coprire tutto (anche margini e riga social) per dare continuità.
  La riga social non è posizionata, quindi resta sotto la cover e compare
  quando la cover sfuma.
- **Uscita** (`.panel-expander`): `panels.js` legge il rettangolo con
  `getBoundingClientRect()`, quindi segue da solo il nuovo layout. Verificato:
  il clone parte esattamente dal pannello (es. `left 331, top 64`, cioè sotto
  la nav) e arriva a tutto schermo.
- **Nome in home** (`.hero-name`, `top: clamp(4.5rem, 12vh, 8rem)`): a 1440x900
  sta a y=108, cioè 44px dentro i pannelli (che partono a 64): sovrapposto ai
  pannelli come prima, nessun buco sopra, niente sotto la nav.
- **Viso Chi Sono** (`background-position: center top`): visibile sia a riposo
  sia col pannello allargato in hover, su più foto del crossfade. Su mobile il
  nome copre la parte alta del primo pannello come già prima (la tagline passa
  sui capelli), ma il viso resta scoperto — anzi un po' più in basso di prima,
  perché ora il pannello parte sotto la nav.
- **`prefers-reduced-motion`**: il layout non dipende dalle classi delle
  animazioni; simulato sostituendo `matchMedia` prima di `panels.js`: nessun
  `.panel--closed`, nessuna cover, stesse misure della versione animata.

### Verifiche fatte in browser (Chrome, `python3 -m http.server 8000`)

Il viewport reale della finestra Chrome era 1360x617 (limitato dallo schermo),
quindi le misure a 1440x900 e 375x800 sono state prese caricando le pagine in
un iframe di quelle dimensioni esatte sulla stessa origine.

- **1440x900, tutte e 4 le pagine**: `scrollWidth` 1440, `scrollHeight` 900
  (nessuno scroll), pannelli 32,64 → 1376x748, icone 24x24 a y=844–868.
- **375x800**: nessuno scroll orizzontale in nessuna pagina; riga social subito
  sotto l'ultimo pannello (index 912, lavoro 784, foto 1024, celebrazioni 712),
  nessuna sovrapposizione; Celebrazioni sta tutta in 800px.
- **Hover** (finestra reale): il pannello passa a `flex-grow: 1.6` (479px contro
  299) e il crossfade cambia slide.
- **Navigazione**: foto → celebrazioni e home → lavoro con clone che si espande
  dal rettangolo giusto e ingresso a pannelli chiusi → aperti; nessun
  `.panel--closed`/cover/expander residuo.
- **Console**: nessun errore sulle 4 pagine.
- Non verificato: un monitor fisico a 1440x900 (solo iframe), Safari/Firefox,
  dispositivi touch reali.

## Social reali, pannelli smussati, collage a scorrimento

Tre modifiche nello stesso passaggio.

### 1. Link social reali

- Instagram: `https://www.instagram.com/ph.samuele/?hl=it`
- LinkedIn: `https://www.linkedin.com/in/samuele-casabianca-0387b7237/`

Inseriti nella riga `.social-links` delle 4 pagine a pannelli (rimosso il TODO)
e in `contattami.html`, dove era anche sbagliato il testo del link Instagram:
mostrava `@samuelecasabianca`, un nome inventato, ora `@ph.samuele`. In
`contattami.html` resta un TODO solo per l'email, ancora segnaposto. Nel sito non
resta nessun `href="#"`.

### 2. Pannelli come riquadri staccati ad angoli smussati

- **Nuova variabile** `--radius-frame: 18px` in `:root`, condivisa: lo splash ora
  usa `--splash-frame-radius: var(--radius-frame)` (stesso valore di prima),
  così splash e pannelli non possono divergere.
- `.panel`: `border-radius: var(--radius-frame)` + `isolation: isolate` (su
  Safari, senza un nuovo contesto di impilamento, i figli animati via
  `transform` — il collage — possono uscire dagli angoli arrotondati).
  **Rimossi** il separatore `border-right` (e la regola `:last-child`) su desktop
  e `border-bottom` su mobile.
- `.panels`: `gap: var(--space-sm)` (16px) su desktop, `0.75rem` su mobile; tolti
  `border-radius`/`overflow: hidden` dal contenitore, ormai inutili. I margini
  verso i bordi della pagina restano quelli del passaggio precedente (2rem
  desktop, 1rem mobile, sotto la nav).
- `.panel-expander`: parte con `border-radius: var(--radius-frame)` e in
  `.is-full` va a `0`, con una transizione `border-radius` che ha la stessa
  durata e curva di top/left/width/height (0.55s). Nessuno stacco a inizio
  animazione: misurato 18px → ~12.6px a metà → 0px a schermo pieno.
- L'animazione di ingresso (scaleX/scaleY dei pannelli) non è stata toccata: gli
  angoli si deformano per il mezzo secondo dello split, non si nota.

### 3. Collage a scorrimento su "Il Mio Lavoro" (solo home)

- **Markup** (`index.html`): il pannello verso `lavoro.html` ha la classe
  `panel--scroll` e `data-images` con **12 foto**, 3 per categoria (celebrazioni
  — matrimonio/feste —, eventi, programmi TV, sport), ~3,2 MB in totale; 5 di
  queste erano già caricate dal crossfade precedente dello stesso pannello, quindi
  il peso nuovo per la home è circa 2 MB. L'ordine alterna le categorie e fa
  cadere le 3 foto verticali negli slot alti.
- **JS** (`js/panels.js`): nel ciclo che crea le slide, un pannello
  `panel--scroll` con foto chiama `buildMontage()` e salta tutto il resto (niente
  slide, niente `setInterval`, niente listener di hover/focus). Senza
  `data-images` ricade sul comportamento normale. Gli altri pannelli fanno il
  crossfade esattamente come prima (codice non toccato).
- **Struttura del collage**: `.panel-montage` (traccia) > **2 copie identiche**
  di `.panel-montage-group` > 2 `.panel-montage-col` > `.panel-montage-tile` (foto
  come `background-image`, cover, come le slide). Le foto si alternano fra le due
  colonne; le tessere seguono lo schema alta/bassa sfasato fra le colonne, così
  le due colonne hanno la stessa altezza (9 unità ciascuna) e il gruppo non ha
  buchi in fondo. Il gap è sotto ogni tessera (anche l'ultima), non fra i gruppi:
  i due gruppi hanno altezza identica.
- **Animazione** (CSS): `@keyframes panel-montage-scroll` da `translateY(-50%)` a
  `translateY(0)`, `50s linear infinite` — il contenuto scende; a fine ciclo la
  traccia mostra esattamente ciò che mostrava all'inizio, quindi il loop non ha
  stacchi. Solo `transform` (+ `will-change`), quindi resta sul compositor.
  L'unità di altezza è fissa (`--montage-unit: 9rem`): un gruppo è alto ~1332px,
  più di qualsiasi altezza del pannello (max 60rem), requisito perché la
  traccia copra sempre tutto il pannello. Velocità ~26px/s. Continua anche
  senza mouse; l'hover-expand (`flex-grow: 1.6`) resta come sugli altri pannelli.
- **Reduced motion**: `panels.js` aggiunge `.is-running` (la classe che attiva
  l'animazione) solo se l'utente non ha chiesto movimento ridotto, quindi il
  collage resta fermo. In più, nella media query `prefers-reduced-motion`,
  `.panel-montage.is-running { animation: none; }` come doppia sicurezza: la
  regola generale `animation-duration: 0.01ms !important` da sola non
  fermerebbe un'animazione `infinite`, la farebbe girare velocissima.
- **Uscita (punto critico)**: `setupPanelsExit()` copiava lo sfondo da
  `.panel-slide.is-active`, che un pannello a scorrimento non ha. Ora, se quella
  query dà `null` e il pannello è `panel--scroll`, usa
  `mostVisibleMontageTile(panel)`: la tessera con l'area visibile maggiore
  dentro il pannello nel momento del click (i rettangoli tengono conto del
  `transform` in corso). Il clone parte quindi da quella foto; il salvataggio del
  colore in `sessionStorage` segue la stessa logica di prima (una tessera con
  foto ha sfondo trasparente, quindi, come per le altre slide con foto, non si
  salva nulla e la cover usa il colore standard).

### Verifiche fatte in browser (Chrome, `python3 -m http.server 8000`)

Come nel passaggio precedente, la finestra reale era 1440x561 e le misure a
1440x900 e 375x800 sono state prese in un iframe di quelle dimensioni. Nota: il
browser teneva `panels.js` vecchio in cache, quindi JS/CSS sono stati ricaricati
forzando la cache prima dei test.

- **Home, 3 pannelli**: Chi Sono e Contattami con crossfade in hover (slide
  attiva cambiata, `flex-grow` 1.6); Il Mio Lavoro scorre **senza mouse sopra**
  (`transform` da −1190 a −1137px in 2 s). Loop: fotogramma a 49.999 s e a 0 s
  confrontati, **identici**. Gruppi alti uguali (1332/1332px), 24 tessere.
- **Click su "Il Mio Lavoro"**: clone con la foto `programmi-tv/_E7A6711.jpg`
  (la tessera più visibile), rettangolo di partenza uguale al pannello, raggio
  18px → 0, schermo pieno, arrivo su `lavoro.html`.
- **Altre uscite**: lavoro → foto, foto → celebrazioni, celebrazioni →
  celebrazioni-matrimoni: tutte partono dal rettangolo giusto con la foto della
  slide attiva, raggio 18 → 0.
- **1440x900**: tutte e 4 le pagine alte 900, `scrollWidth` 1440; pannelli a
  748px di altezza, 16px fra l'uno e l'altro, 32px dai bordi, raggio 18px, nessun
  `border-right`.
- **375x800**: nessuno scroll orizzontale; pannelli impilati con 12px fra l'uno e
  l'altro, riga social dopo l'ultimo; Celebrazioni sta in 800px; collage attivo
  anche su mobile e ritagliato dagli angoli smussati.
- **Reduced motion** (simulato sostituendo `matchMedia` prima di `panels.js`),
  1440x900 e 375x800: nessuna `.is-running`, 0 animazioni sul collage,
  `transform` fermo, layout invariato.
- **Social**: `href`, `target="_blank"` e `rel="noopener"` corretti nelle 4
  pagine e in `contattami.html`. Click reale sulle due icone: la pagina di
  partenza resta dov'è (quindi si apre una nuova scheda), ma le nuove schede si
  aprono fuori dal gruppo di schede controllato dallo strumento di test, quindi
  **l'URL effettivamente caricato su Instagram/LinkedIn non è stato letto**.
- **Console**: nessun errore su index, lavoro, foto, celebrazioni, contattami.
- Non verificato: Safari (il fix `isolation: isolate` è preventivo), Firefox,
  dispositivi touch reali, un monitor fisico 1440x900.

## Ristrutturazione: via Foto, Streaming e Video; storie nelle gallerie

Lavoro fatto sul branch locale `ristrutturazione-storie` (non su `main`, che
resta com'era; niente push). Commit:
`8234858` (lavoro dei passaggi precedenti: social, pannelli smussati, collage),
`1371934` (struttura), `3c4b639` (storie), `04d9cf0` (Chi Sono), `27d779c`
(documentazione), poi `bf3584a` (riquadro verticale + schermo intero delle storie,
immagini di Contattami) e il commit di documentazione che lo segue.

> Le sezioni storiche più sopra ("Video reali: 22 file inseriti", "Sport: da
> pannelli a galleria diretta", "Eventi: …", "Pannelli ridimensionati…")
> descrivono la struttura di allora e citano `foto.html`, `video.html` ecc.:
> restano come storico. Lo stato attuale è quello di "Sitemap" e di questa sezione.

### Prima / dopo

```
PRIMA                                        DOPO
index → lavoro (Foto | Streaming | Video)     index → lavoro (Programmi TV | Celebrazioni
        ├── foto (4 categorie)                                  | Eventi | Sport)
        │   └── gallerie                              └── gallerie con storie
        ├── streaming (+ streaming-watch)
        └── video (+ video-watch)
```

### Cosa è cambiato

- **`lavoro.html`** prende il posto di `foto.html`: stessi 4 pannelli e
  `data-images`, titolo "Il Mio Lavoro", breadcrumb "Lavoro".
- **Pagine eliminate**: `foto.html`, `streaming.html`, `streaming-watch.html`,
  `video.html`, `video-watch.html` (via `git rm`: restano nella storia git).
  Eliminato anche l'array `STREAM_DATA` di `js/video-data.js`.
- **Breadcrumb**: tolto il livello "Foto" da tutte le pagine
  (`Lavoro / Sport`, `Lavoro / Celebrazioni / Matrimoni`, …).
- **Menu hamburger** (`js/main.js`): tolte le voci Foto, Streaming e Video; le 4
  categorie sono risalite di un livello (`menu-sub` invece di `menu-sub2`, classe
  rimossa dal CSS).
- **Codice rimasto senza uso, rimosso**: tutta la sezione CSS "Sezioni Streaming e
  Video" (`.video-grid`, `.video-card`, `.video-thumb`, `.watch-*`, `.chip`,
  `.filter-chips`), `.panel-note` (serviva solo al pannello Streaming),
  `.menu-sub2`, e gli helper `escapeHtml`/`videoThumbHtml`/`videoPlayerHtml` di
  `js/main.js`.
  - **Perché anche `escapeHtml`** (decisione confermata con il committente):
    serviva perché le vecchie pagine video costruivano l'HTML concatenando
    stringhe, e un titolo come "Matrimonio Claudia & Ivan" dentro un `alt=""`
    rompeva il markup. `js/stories.js` non lo fa: crea gli elementi via DOM e
    scrive titoli ed `aria-label` con `textContent`/`setAttribute`, che non
    interpretano `&` e virgolette come markup. Il caso resta coperto senza la
    funzione (verificato: "Matrimonio Claudia & Ivan — 14 settembre 2024"
    compare intero sotto la pallina di `celebrazioni-matrimoni.html`). Se in
    futuro si costruirà markup da stringhe con dati del dataset, va reintrodotta.
- `README.md` e il commento in `.gitignore` aggiornati (non parlano più di
  YouTube/embed).
- **`js/panels.js` non ha richiesto modifiche per la ristrutturazione**:
  verificato che non contiene nessun nome di pagina (legge gli `href` dal DOM).
  È stato toccato solo per la foto di Chi Sono (vedi sotto).

### Componente storie (`js/stories.js`)

Sopra la masonry di ogni pagina foglia c'è una fila di palline in stile storie di
Instagram. La galleria sotto è invariata (masonry + lightbox).

- **Markup**: `<section class="stories" data-categoria="…">` fra il titolo della
  pagina e la masonry; `js/video-data.js` + `js/stories.js` inclusi solo nelle 5
  pagine galleria, prima di `js/main.js`. `data-categoria`: `sport` (15 video),
  `eventi` (6), `matrimoni` (1), `programmi-tv` e `feste-private` (0 →
  segnaposto "Video in arrivo" con anello tratteggiato, stesso ingombro; la fila
  è alta 128px in tutte le pagine).
- **Pallina**: miniatura circolare da `assets/video/poster/` (`loading="lazy"`),
  anello `--color-accent` con stacco del colore di fondo, titolo sotto (max 2
  righe, altezza fissa), fila scorrevole in orizzontale con scroll-snap. È un
  `<button>` con `aria-label` "Guarda il video: …".
- **Visore** (creato al primo click, `role="dialog"`): un'unica
  `<video preload="metadata" playsinline>` a cui si cambia `src` → si carica solo
  il video aperto. Barrette di avanzamento in alto (una per video; quella in
  corso aggiornata a ogni frame via `transform: scaleX`), titolo, X in alto a
  destra. Click/tap sulla metà destra dello schermo = successivo, sinistra =
  precedente (sul primo ricomincia da capo, come Instagram). A fine video parte il
  successivo; dopo l'ultimo si chiude. ESC chiude, frecce navigano, Tab resta
  dentro il visore. Alla chiusura il video viene fermato e il download
  interrotto (`removeAttribute('src')` + `load()`), il focus torna alla pallina.
- **Verticali / orizzontali**: vedi "Riquadro verticale e schermo intero" qui
  sotto (la prima versione dava agli orizzontali un palco a tutto schermo: è stata
  sostituita).
- **Nessun conflitto col lightbox**: con una storia aperta tutti gli altri figli
  di `<body>` sono `inert` e lo scroll è bloccato; il lightbox reagisce solo a
  click su `.masonry-item` e alla tastiera quando è aperto, quindi non può aprirsi
  sotto una storia.
- **Audio**: la storia parte al click (gesto dell'utente), quindi con l'audio. Se
  il browser rifiuta comunque (`NotAllowedError`), riparte senza audio.
- **Reduced motion**: il video aperto parte (è un'azione esplicita), ma a fine
  video non si passa da soli al successivo: si naviga solo a mano.

### Chi Sono: foto iniziale e inquadratura per foto

- `verona-3.jpg` (Samuele dietro le telecamere, luce rossa) è la prima voce di
  `data-images`, quindi la foto a riposo.
- Le 4 foto sono **1 verticale** (`profilo.jpg`, 1200x1800) e **3 orizzontali**
  (`verona-1/2/3.jpg`, 1800x1200, viso nel terzo sinistro). La vecchia regola
  unica `.panel[href="chi-sono.html"] .panel-slide { background-position: center
  top }` è stata **rimossa**: in un pannello stretto e verticale le orizzontali si
  ritagliano solo ai lati, quindi `center` mostrava i cavalletti.
- **Soluzione**: `data-images` accetta dopo ogni percorso la sua
  `background-position` (`"assets/foto/chi-sono/verona-3.jpg 25% center,…"`),
  applicata inline alla singola slide da `panels.js` e copiata anche nel clone
  dell'animazione di uscita. Valori: `verona-3` 25% center (viso centrato, sopra
  il titolo), `verona-1` 37% center e `verona-2` 30% center (il viso lì è
  all'altezza del titolo: viene tenuto alla sua sinistra, non sotto la scritta),
  `profilo` center 10% (ritratto verticale ancorato in alto: quando il pannello si
  allarga, o su mobile, il ritaglio toglie le gambe e non la testa). Il
  meccanismo è generico: vale per qualsiasi pannello.
- **Mobile**: il nome della home copriva la parte alta del primo pannello, cioè
  proprio il viso (con le orizzontali non c'è margine verticale per spostarlo).
  Sotto i 768px `.hero-name` è ora nel flusso della pagina, **sopra** i pannelli,
  invece che sovrapposto al pannello Chi Sono. Su desktop non cambia nulla (il
  nome sta sopra il pannello centrale).

### Verifiche fatte in browser (Chrome)

`python3 -m http.server 8000`, più — solo per i test di fine video — un piccolo
server di prova con supporto alle richieste Range (senza, il salto alla fine del
video viene ignorato). Misure a 1440x900 e 375x800 in iframe di quelle dimensioni
(la finestra reale era 1360x561).

- **Percorso completo con click veri**: home → Il Mio Lavoro → Programmi TV,
  Eventi, Sport, Celebrazioni → Matrimoni e Feste Private. Breadcrumb letti:
  "Lavoro", "Lavoro / Programmi TV", "Lavoro / Eventi", "Lavoro / Sport",
  "Lavoro / Celebrazioni", "Lavoro / Celebrazioni / Matrimoni",
  "Lavoro / Celebrazioni / Feste Private". Animazioni di uscita/ingresso intatte.
- **Chi Sono**: guardato con ciascuna delle 4 foto a pannello stretto e allargato
  (desktop) e a 375x800: viso sempre visibile. Il clone di uscita parte con
  `verona-3.jpg` e `25% center`.
- **sport.html**: 15 palline; apertura con click vero (video in riproduzione con
  audio, palco 9:16 a tutta altezza); metà destra → successivo, metà sinistra →
  precedente, frecce destra/sinistra; fine video → parte il successivo (Day 7 →
  Derby AU – CUS); fine dell'ultimo → chiusura, scroll e focus ripristinati; X ed
  ESC chiudono. Con una storia aperta un click dove sotto c'è una foto porta alla
  storia successiva, non apre il lightbox; a storie chiuse il lightbox funziona
  (1/54 → 2/54 con le frecce).
- **Orizzontale / verticale**: "Video Evento 1" (1920x1080) intero e centrato;
  Miu Miu (verticale) colonna 9:16. A 375x800 il verticale riempie lo schermo
  (375x800, `cover`), l'orizzontale resta intero al centro.
- **programmi-tv.html / celebrazioni-feste-private.html**: fila con il solo
  segnaposto, stessa altezza (128px) delle altre, nessun errore.
- **Nessun download di video aprendo una galleria**: 0 elementi `<video>` e 0
  richieste `.mp4` su tutte e 5 le pagine, a entrambe le dimensioni.
- **Reduced motion** (simulato sostituendo `matchMedia`): a fine video la storia
  resta ferma con la barretta piena; le frecce navigano. Controprova senza
  simulazione: avanza.
- **Link**: 217 riferimenti locali unici (tutte le pagine + menu generato)
  controllati via HTTP, nessuno rotto; le 5 pagine eliminate rispondono 404; nessun
  riferimento residuo nel codice.
- **Console**: nessun messaggio su tutte e 10 le pagine. **Scroll orizzontale**:
  nessuno, a 1440 e a 375.
- **Non verificato**: il test "reduced motion" a fine video è stato fatto con un
  evento `ended` simulato (la scheda risultava nascosta e Chrome rimandava il
  caricamento dei video; la stessa logica con un `ended` vero è verificata senza
  reduced motion); nessun test su Safari/Firefox o su telefono reale; le storie
  online (i video non sono pubblicati).

### Riquadro verticale e schermo intero

- **Il riquadro della storia è sempre verticale**, su telefono, tablet e
  desktop: alto quanto lo schermo, largo 9/16 (al massimo tutta la larghezza) →
  375x800 su un telefono (schermo pieno), 506x900 centrato a 1440x900.
- **Verticali** (`verticale: true`): il video riempie il riquadro (`cover`).
  **Orizzontali**: il video sta intero e centrato (`contain`) con le fasce scure
  sopra e sotto — mai tagliato per riempire.
- **Pulsante schermo intero** (`.story-fullscreen`, icona di espansione in basso
  a destra del riquadro), **solo sugli orizzontali** e solo se il browser offre
  almeno uno dei metodi sotto. `enterFullscreen()` prova, in ordine:
  `video.requestFullscreen()` (API standard), `video.webkitRequestFullscreen()`
  (Safari desktop meno recente), `video.webkitEnterFullscreen()` (Safari iOS, dove
  la Fullscreen API su un elemento qualsiasi non esiste: apre il player nativo).
  Lo stato è seguito sia con `fullscreenchange`/`webkitfullscreenchange` sia con
  gli eventi del player iOS `webkitbeginfullscreen`/`webkitendfullscreen`.
- **A schermo intero**: il `<video>` mostra i comandi nativi (`controls` acceso
  solo in quel momento); zone di tocco, frecce ed ESC delle storie non reagiscono
  (ESC è del browser ed esce dallo schermo intero, non chiude le storie); la fine
  del video non fa partire la storia successiva.
- **All'uscita**: comandi nativi spenti, riproduzione ripresa dal punto in cui si
  era (nessuno tocca `currentTime`), focus sul pulsante. Se il video è finito
  mentre era a schermo intero, si resta su quella storia, ferma alla fine: si
  prosegue con un tocco. Chiudendo le storie mentre si è a schermo intero, prima
  si esce dallo schermo intero.

### Immagini del pannello Contattami

Due immagini nuove arrivate in `immagini/PORTFOLIO/contact me/`, aggiunte al
pannello Contattami della home **accanto** alle tre foto già presenti (il
crossfade ora ne ha cinque, alternate: foto evento → reflex → mani → icone →
brindisi; a riposo resta la foto dell'evento).

| Sorgente | Ottimizzata | Dimensioni | Peso |
|---|---|---|---|
| `27ea25b6-e29c-4706-a847-8963692778ee.jpg` (render 3D di icone di contatto) | `assets/foto/contattami/27ea25b6-e29c-4706-a847-8963692778ee.jpg` | 1024x860 (già sotto i 1800px: non ingrandita) | 40 KB |
| `theregisti-HSXIp58yPyI-unsplash.jpg` (due reflex, 6000x4000, 5,5 MB) | `assets/foto/contattami/theregisti-HSXIp58yPyI-unsplash.jpg` | 1800x1200 | 189 KB |

- **Pipeline**: la stessa di tutte le altre foto (`ImageOps.exif_transpose` →
  `thumbnail` 1800px sul lato lungo, Lanczos → JPEG qualità 82 → nome ripulito da
  spazi e caratteri speciali). I due nomi non ne contenevano, quindi sono rimasti
  uguali (maiuscole comprese, come per le altre foto). Il sito referenzia solo
  `assets/`: nessuna pagina cita `immagini/` fuori dai commenti (verificato).
- **Nota sui toni reali**: solo il render di icone è chiaro (fondo grigio-azzurro
  chiarissimo, icone blu). La foto delle reflex è già scura, ma in luce al neon
  magenta/viola molto satura: fredda e fuori palette, non chiara.
- **Armonizzazione, solo CSS (i file non sono modificati)**, con regole
  `.panel-slide[data-src$="…"]` in `css/style.css`:
  - icone: `invert(1) sepia(0.2) saturate(1.3) brightness(0.9) contrast(1.2)`.
    L'inversione porta il fondo quasi al nero del sito e il blu delle icone al
    suo complementare, un crema/rame caldo vicino a `--color-accent`; seppia e
    contrasto lo scaldano e lo staccano dal fondo. Scelta fra diverse prove
    (seppia scura, oro scuro: davano un oliva spento);
  - reflex: `grayscale(1) sepia(0.8) brightness(1.35) contrast(1.1)` —
    monocromatica calda, niente magenta; schiarita perché sotto la velatura del
    pannello la foto, già scura, sparirebbe nel nero. Inquadratura `20% center`,
    sulla reflex di sinistra (obiettivo e logo), altrimenti il pannello stretto
    mostrerebbe lo spazio fra le due fotocamere.
  - Sopra resta la velatura scura comune a tutti i pannelli.
- **Supporto in `js/panels.js`**: ogni slide con foto riceve `data-src` (il
  percorso), a cui il CSS aggancia il filtro; il clone dell'animazione di uscita
  ora porta lo sfondo in un livello interno `.panel-expander-bg` che copia
  immagine, inquadratura e filtro della slide. Il filtro sul clone intero avrebbe
  alterato anche titolo e velatura.
- La foto delle reflex viene da Unsplash (licenza Unsplash: uso libero, anche
  commerciale, senza obbligo di attribuzione).

### Verifiche fatte in browser per questi due punti (Chrome)

- **Contattami**, guardato a 1440x900 e 375x800 accanto agli altri pannelli con
  ciascuna immagine nuova attiva: nessun rettangolo chiaro, toni scuri e caldi
  come Chi Sono e Il Mio Lavoro. Clone di uscita con le icone attive: filtro sul
  livello di sfondo, titolo bianco e velatura invariati.
- **Riquadro**: `sport.html` (verticale) 506x900 a 1440x900 e 375x800 a 375x800,
  `cover`, pulsante nascosto; `eventi.html` "Video Evento 1" (orizzontale,
  1920x1080) stesse dimensioni, `contain`, pulsante visibile. Guardato: il video
  orizzontale sta intero al centro con le fasce sopra e sotto.
- **Schermo intero**: click reale sul pulsante → il click arriva e il codice
  chiama `video.requestFullscreen()`, ma **Chrome ha rifiutato la richiesta
  ("not granted") perché la finestra di test risultava nascosta**
  (`visibilityState: hidden`, anche i video lì non partivano: si vedeva il
  poster). Il rifiuto è gestito e non produce errori. **Lo schermo intero vero,
  e il ritorno al punto giusto con un video che avanza davvero, non sono stati
  verificati**: va fatta una prova a mano (desktop e iPhone). Verificata invece
  la logica di stato, comune ai due percorsi, con gli eventi del player iOS
  simulati: a schermo intero comandi nativi attivi, tap destra/sinistra, frecce,
  ESC e fine video non cambiano storia né chiudono il visore; all'uscita comandi
  spenti, riproduzione ripresa, focus sul pulsante, tap di nuovo attivi.
- **Regressione storie** (`sport.html`): 15 palline, 0 `<video>` e 0 richieste
  `.mp4` all'apertura, apertura, tap e frecce, avanzamento a fine video, chiusura
  dopo l'ultimo, X, ESC, scroll bloccato/ripristinato, lightbox funzionante a
  storie chiuse.
- **Link**: 263 riferimenti locali unici (pagine, menu, 22 video e poster del
  dataset) controllati via HTTP, nessuno rotto. **Console**: nessun messaggio
  sulle 10 pagine.

## Deploy

Il sito è **online su https://samuelecasabianca.com**.

- **Repository**: `github.com/Inve14/samu-web`, branch `main`.
- **Hosting**: Vercel, progetto `samu-web`, collegato al repository — **ogni push
  su `main` ridistribuisce automaticamente**, non serve nessun comando.
- **Dominio**: registrato su Namecheap, DNS gestito da Namecheap BasicDNS con un
  record `A` su `@` e un `CNAME` su `www` che puntano a Vercel. Certificato
  HTTPS emesso da Vercel.
- **Cosa non sta nel repo** (vedi `.gitignore`): gli originali di `immagini/`,
  tutti i file `.mp4` e i PDF. **I video esistono solo in locale** in
  `assets/video/`: `js/video-data.js` punta a quei file, quindi **sul sito
  pubblicato le storie non funzionano** (le palline si vedono, perché i poster
  sono nel repo, ma il video non parte) finché i video non vengono caricati
  altrove e i `src` aggiornati.
- **Dove caricarli**: le storie usano un `<video>` HTML con barrette di
  avanzamento, passaggio automatico e salto fra video, quindi serve un hosting che
  serva **file MP4 diretti** con supporto alle richieste Range (es. Vercel Blob,
  Cloudflare R2, Bunny). Il vecchio piano "YouTube via embed" non è compatibile:
  richiederebbe di riscrivere `js/stories.js` sulle API di YouTube. Prima
  conviene ricomprimerli (vedi "Da fare quando ci sarà `ffmpeg`"): oggi vanno da
  ~45 a ~300 MB l'uno.

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
  *(Superato: la regola unica partiva dal presupposto che le 4 foto fossero tutte
  ritratti verticali, ma solo `profilo.jpg` lo è — le `verona-*` sono orizzontali.
  Ora ogni foto ha la propria inquadratura, vedi "Chi Sono: foto iniziale e
  inquadratura per foto".)*

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
  - **Meccanismo `panel--static`** (oggi non usato da nessun pannello):
    `panels.js` riconosce la classe `panel--static`
    (`panel.classList.contains('panel--static')`) e genera per quel pannello una
    sola `.panel-slide`, senza aggiungere i listener
    mouseenter/mouseleave/focus/blur — quindi nessun crossfade può partire, in
    nessuna circostanza; resta solo l'hover-expand comune a tutti i pannelli.
    Serviva per il pannello "Contattami" finché non aveva foto reali; ora che ne
    ha tre in crossfade la classe è stata rimossa, ma il meccanismo resta
    disponibile per qualsiasi pannello debba restare fermo.
  - **Meccanismo `panel--scroll`** (usato da "Il Mio Lavoro" in `index.html`):
    al posto delle slide `panels.js` costruisce un collage delle foto di
    `data-images` che scorre da solo (`buildMontage()`), senza crossfade e senza
    listener di hover. Dettagli in "Social reali, pannelli smussati, collage a
    scorrimento".
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
  superiori (es. "Lavoro / Celebrazioni / Matrimoni"; vedi "Sitemap").
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
  (index, lavoro, celebrazioni — `foto.html` è stata eliminata, eventi e sport
  sono diventate gallerie). Stili nella sezione
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
- **Sezioni Streaming e Video** — *eliminate* nella ristrutturazione (vedi
  "Ristrutturazione: via Foto, Streaming e Video; storie nelle gallerie"). Le
  griglie in stile piattaforma, i filtri a chip, le pagine `*-watch.html`, il loro
  CSS (`.video-grid`, `.video-card`, `.watch-*`, `.chip`, `.panel-note`) e gli
  helper di `js/main.js` non esistono più. I video vivono come storie dentro le
  categorie (vedi "Componente storie").
- **Classi CSS principali**: `.panels`/`.panel`/`.panel-title`/`.panel-slides`/
  `.panel-slide`, `.panel-montage` (collage a scorrimento), `.social-links`/`.social-link`, `.masonry`/`.masonry-item`,
  `.stories`/`.story`/`.story-viewer` (storie video), `.ph` (placeholder foto generico), `.site-nav`,
  `.lightbox`, `.mobile-menu`, `.btn`.

## Placeholder ancora da sostituire

**Foto mancanti** (nessun file disponibile in `immagini/`, vedi "Immagini reali
inserite" — quando arriveranno, seguire la stessa pipeline di ottimizzazione
descritta lì prima di collegarle):
- Foto di Brand e Gala: non esistono più pannelli/gallerie dedicati (Eventi è
  una galleria unica), quindi quando arriveranno andranno semplicemente aggiunte
  alla masonry di `eventi.html`
- Foto di calcio e pallavolo: non esistono più pannelli/gallerie dedicati (Sport
  è una galleria unica), quindi quando arriveranno andranno semplicemente
  aggiunte alla masonry di `sport.html`

**Video**:
- Nessun video per Programmi TV e Feste Private: le loro file di storie mostrano il
  segnaposto "Video in arrivo". Quando arriveranno, basta aggiungere voci a
  `VIDEO_DATA` con `categoria: 'programmi-tv'` o `'feste-private'` (i
  `data-categoria` di quelle pagine), più il poster in `assets/video/poster/`.
- I `.mp4` sono solo in locale: vanno caricati su un hosting di file MP4 diretti e
  i `src` aggiornati perché le storie funzionino online (vedi "Deploy").
- Streaming è stato eliminato: quei contenuti non arriveranno.

**Altri**:
- `contattami.html` — email reale (anche in `js/main.js`, funzione
  `initContactForm`, indirizzo del `mailto:`). *Instagram e LinkedIn sono stati
  inseriti*: `https://www.instagram.com/ph.samuele/?hl=it` e
  `https://www.linkedin.com/in/samuele-casabianca-0387b7237/`, anche nella riga
  social delle pagine a pannelli.

## Prossimi passi

1. Ricevere le foto mancanti (Brand, Gala, Calcio, Pallavolo) e inserirle con la
   stessa pipeline usata per le altre categorie (vedi "Immagini reali inserite").
2. Pubblicare i video: caricarli su un hosting che serva file MP4 diretti (non
   un embed YouTube, vedi "Deploy"), idealmente dopo averli ricompressi, e
   aggiornare i `src` in `js/video-data.js`.
3. Inserire l'email reale di Samuele (i social sono già reali).
4. Rifiniture su testi bio e descrizioni categorie (ora testi provvisori).
5. Eventuale favicon e immagine Open Graph per la condivisione.
6. Deploy (hosting statico: GitHub Pages, Netlify, ecc.) — fuori scope attuale.
