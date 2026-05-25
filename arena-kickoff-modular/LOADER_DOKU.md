# loader.js - Funktionsbeschreibung

Diese Datei erklaert, wie der Loader in [loader.js](loader.js) arbeitet und wie er in [ARENA_Kickoff_Presentation_modular.html](../ARENA_Kickoff_Presentation_modular.html) eingebunden ist.

## Ziel des Loaders

Der Loader baut die modulare Impress-Praesentation dynamisch zur Laufzeit auf:

- Er laedt alle Slide-HTML-Dateien aus dem Ordner [slides](slides).
- Er fuegt den geladenen Markup-Inhalt in den Impress-Container ein.
- Er ergaenzt den Overview-Step fuer die Esc-Uebersicht.
- Er initialisiert danach impress.js.

Damit koennen Slides einzeln gepflegt werden, ohne eine grosse monolithische HTML-Datei zu bearbeiten.

## Ablauf in loader.js

### 1. Konfiguration

- `TOTAL_SLIDES = 17`: Anzahl der zu ladenden Slides.
- `SLIDE_BASE = 'arena-kickoff-modular/slides/'`: Basis-Pfad fuer die Slide-Dateien.

### 2. Slide-Pfade erzeugen

`buildSlidePath(index)` erzeugt Dateinamen mit zwei Stellen, z. B. `01.html`, `02.html`, ...

### 3. Einzelne Slide laden

`loadSlide(index)` nutzt `fetch(...)`:

- Bei erfolgreicher Antwort wird der HTML-Text zurueckgegeben.
- Bei Fehler wird eine Exception mit Slide-Nummer geworfen.

### 4. Alle Slides laden

`loadAllSlides()` erstellt Requests von 1 bis `TOTAL_SLIDES` und wartet mit `Promise.all(...)` auf alle Ergebnisse.

### 5. Overview-Step erzeugen

`createOverviewStep()` erstellt einen zusaetzlichen Step mit ID `overview` und den entsprechenden `data-*` Attributen fuer die Gesamtansicht.

### 6. Presentation initialisieren

`initPresentation()`:

- startet `impress().init()`
- legt Esc als Shortcut fuer `impress().goto('overview')` fest
- reduziert die Sichtbarkeit der Hint-Box nach der ersten Tastatureingabe

### 7. Fehlerbehandlung

`showLoadError(error)` zeigt im Impress-Container eine sichtbare Fehlermeldung an, wenn Slide-Dateien nicht geladen werden koennen.

### 8. Startpunkt

Beim Event `DOMContentLoaded`:

1. Container `#impress` wird gesucht.
2. Slides werden geladen.
3. Markup wird zusammengefuegt und in den Container geschrieben.
4. Overview-Step wird angehaengt.
5. Impress wird initialisiert.

## Einbindung in ARENA_Kickoff_Presentation_modular.html

Die HTML-Datei bindet den Loader am Ende von `body` ein, nachdem impress.js geladen wurde.

```html
<script src="https://cdn.jsdelivr.net/gh/impress/impress.js@2.0.0/js/impress.min.js"></script>
<script src="arena-kickoff-modular/loader.js"></script>
```

Wichtig ist die Reihenfolge:

1. erst impress.js
2. dann loader.js

Sonst ist `impress()` beim Aufruf in `loader.js` nicht verfuegbar.

## Voraussetzungen

- Der Container `<div id="impress"></div>` muss vorhanden sein.
- Die Slide-Dateien muessen unter `arena-kickoff-modular/slides/` liegen.
- Die Anzahl in `TOTAL_SLIDES` muss zur Anzahl der Dateien passen.
- Die Seite sollte ueber einen lokalen Webserver laufen (nicht direkt ueber `file://`), damit `fetch(...)` auf lokale Dateien zugreifen kann.

## Anpassungen

Wenn neue Slides dazukommen:

1. neue Datei im Ordner [slides](slides) anlegen (z. B. `18.html`)
2. `TOTAL_SLIDES` in [loader.js](loader.js) erhoehen

Wenn eine Manifest-basierte Loesung gewuenscht ist, kann `TOTAL_SLIDES` spaeter durch eine zentrale Liste ersetzt werden.