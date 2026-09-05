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
- **Teilen-Button mit Live-Sync (optional, siehe unten)** – teilt einen kurzen Link (kein Datenwust in der URL). Wer den Link öffnet, kann live beitreten: Häkchen, neue Artikel, Umbenennungen – alles synct in Echtzeit zwischen allen, die den Link geöffnet haben. Ohne Firebase-Einrichtung teilt der Button stattdessen nur eine reine Text-Kopie (kein Link, kein Sync)
- **Installierbar als PWA** – Icon auf dem Startbildschirm, läuft offline dank Service Worker

## Nutzung

Einfach `index.html` öffnen (lokal oder gehostet) – keine Installation, kein Build-Schritt nötig.

## Als PWA installieren

1. Diese Dateien auf einen Hosting-Dienst mit HTTPS legen (z. B. [GitHub Pages](https://pages.github.com/), Netlify, Vercel)
2. Seite auf dem Handy öffnen
3. **iPhone:** Teilen-Button → „Zum Home-Bildschirm"
4. **Android/Chrome:** Menü → „App installieren" (oder automatischer Install-Banner)

Die App funktioniert danach auch offline – die Liste selbst wird sowieso lokal gespeichert.

**Wichtig zu wissen:**
Für eine private Einkaufsliste mit Familie/WG völlig ausreichend .

## Technik

Vanilla JS, kein Framework, keine Build-Schritte. Die eigene Liste wird über `localStorage` gespeichert (funktioniert überall, auch offline). Für Live-Sync beim Teilen wird optional Firebase Realtime Database angebunden – ohne Konfiguration läuft die App trotzdem vollständig lokal.

## Projektstruktur

```
├── index.html            # Die App selbst
├── manifest.json         # Web App Manifest (PWA-Metadaten, Icons, Farben)
├── sw.js                 # Service Worker (Offline-Caching)
├── firebase-config.js    # Platzhalter im Repo, wird beim Deploy aus GitHub Secrets generiert
├── favicon.png           # Icon fürs Browser-Tab
├── app-icon.png          # App-Icon fürs Handy (PWA-Installation)
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions Workflow für automatisches Deployment
├── .nojekyll              # Deaktiviert Jekyll-Verarbeitung auf GitHub Pages
└── .gitignore             # Ignoriert OS-/Editor-Müll
```

## Lizenz

Privates Projekt – nutz es, wie du magst.
