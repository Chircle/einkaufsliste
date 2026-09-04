# 🧺 Meine Einkaufsliste

Eine süße, installierbare Einkaufslisten-App. Läuft komplett im Browser, speichert automatisch und sortiert deine Artikel wie ein echter Supermarkt-Rundgang – von Gemüse bis Drogerie.

## Features

- **Automatische Sortierung** nach Supermarkt-Bereichen (Gemüse, Obst, Backwaren, Milchprodukte, Fleisch & Wurst, Fisch, Tiefkühl, Trockenwaren, Gewürze, Getränke, Süßes, Drogerie, Sonstiges)
- **Ganze Listen einfügen** – Text kopieren und direkt ins Eingabefeld pasten, wird automatisch in einzelne Artikel zerlegt
- **Keine Dubletten** – ein Artikel, der schon auf der Liste steht, wird nicht doppelt angelegt
- **Mengen-Dropdown** pro Artikel (Stk/Pck, g, kg, L, …), standardmäßig „1 Stk/Pck"
- **Stift-Animation** beim Abhaken – die Linie zeichnet sich sichtbar von links nach rechts
- **Bearbeiten-Modus**: Artikel umbenennen und per Drag & Drop in eine andere Kategorie ziehen
- **Listen speichern** unter einem Namen (z. B. ein Gericht) oder standardmäßig als „Wocheneinkauf KW …"
- **Teilen-Button** – teilt einen Link, der die komplette Liste enthält. Öffnet die Empfängerin/der Empfänger den Link, bekommt sie/er eine „Übernehmen"-Karte angezeigt und kann die Artikel mit einem Klick in die eigene Liste holen (kein Server nötig, die Daten stecken direkt im Link)
- **Installierbar als PWA** – Icon auf dem Startbildschirm, läuft offline dank Service Worker

## Nutzung

Einfach `index.html` öffnen (lokal oder gehostet) – keine Installation, kein Build-Schritt nötig.

## Als PWA installieren

1. Diese Dateien auf einen Hosting-Dienst mit HTTPS legen (z. B. [GitHub Pages](https://pages.github.com/), Netlify, Vercel)
2. Seite auf dem Handy öffnen
3. **iPhone:** Teilen-Button → „Zum Home-Bildschirm"
4. **Android/Chrome:** Menü → „App installieren" (oder automatischer Install-Banner)

Die App funktioniert danach auch offline – die Liste selbst wird sowieso lokal gespeichert.

## Auf GitHub Pages hosten

**Variante A – mit GitHub Actions (empfohlen, im Repo bereits enthalten):**

1. Alle Dateien inkl. `.github/workflows/deploy.yml` in den Repo-Root pushen
2. **Settings → Pages → Source:** „GitHub Actions" auswählen
3. Bei jedem Push auf `main` deployt die Action automatisch – Fortschritt siehst du im „Actions"-Tab
4. Seite ist danach live unter `https://dein-name.github.io/dein-repo/`

**Variante B – ohne Workflow, klassisch:**

1. Alle Dateien (inkl. `.nojekyll`) in den Repo-Root pushen
2. **Settings → Pages → Source:** „Deploy from a branch" → Branch `main`, Ordner `/ (root)`
3. Seite ist nach ca. 1 Minute live

## Technik

Ein einziges selbstständiges HTML-File (Vanilla JS, kein Framework, keine Abhängigkeiten außer Google Fonts). Daten werden über die `window.storage`-API persistiert.

## Projektstruktur

```
├── index.html            # Die App selbst
├── manifest.json         # Web App Manifest (PWA-Metadaten, Icons, Farben)
├── sw.js                 # Service Worker (Offline-Caching)
├── icon-192.png          # App-Icon 192×192
├── icon-512.png          # App-Icon 512×512
├── apple-touch-icon.png  # App-Icon fürs iPhone
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions Workflow für automatisches Deployment
├── .nojekyll              # Deaktiviert Jekyll-Verarbeitung auf GitHub Pages
└── .gitignore             # Ignoriert OS-/Editor-Müll
```

## Lizenz

Privates Projekt – nutz es, wie du magst.