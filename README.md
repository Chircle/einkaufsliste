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

## Live-Sync einrichten (optional, für den Teilen-Button)

Ohne diesen Schritt funktioniert die App komplett normal – nur „Teilen" liefert dann nur eine Text-Kopie statt eines echten Live-Links. Mit Firebase Realtime Database (Google, kostenloses Kontingent) dauert die Einrichtung ca. 10 Minuten. Die Zugangsdaten landen dabei **nicht im Repo/Git-Verlauf**, sondern als verschlüsselte GitHub Secrets – der Deploy-Workflow baut `firebase-config.js` bei jedem Push automatisch daraus zusammen.

1. [console.firebase.google.com](https://console.firebase.google.com) → **„Projekt hinzufügen"** (Google-Analytics-Frage kannst du mit „Nein" beantworten)
2. Im Projekt: **Build → Realtime Database → „Datenbank erstellen"** (Standort egal, Startmodus „Testmodus" reicht fürs Erste)
3. **Projekteinstellungen** (Zahnrad oben links) → runterscrollen zu **„Meine Apps"** → Web-App hinzufügen (`</>`-Symbol) → Namen vergeben → **Firebase Hosting NICHT aktivieren** (brauchst du nicht, du hostest ja schon über GitHub Pages)
4. Firebase zeigt dir jetzt einen `firebaseConfig`-Block mit 7 Werten – die brauchst du im nächsten Schritt
5. Im GitHub-Repo: **Settings → Secrets and variables → Actions → „New repository secret"** – für jeden der 7 Werte einen eigenen Secret anlegen, mit **exakt diesen Namen**:

   | Secret-Name | Wert aus `firebaseConfig` |
   |---|---|
   | `FIREBASE_API_KEY` | `apiKey` |
   | `FIREBASE_AUTH_DOMAIN` | `authDomain` |
   | `FIREBASE_DATABASE_URL` | `databaseURL` |
   | `FIREBASE_PROJECT_ID` | `projectId` |
   | `FIREBASE_STORAGE_BUCKET` | `storageBucket` |
   | `FIREBASE_MESSAGING_SENDER_ID` | `messagingSenderId` |
   | `FIREBASE_APP_ID` | `appId` |

6. Unter **Realtime Database → Regeln** in Firebase folgendes eintragen und veröffentlichen:

   ```json
   {
     "rules": {
       "lists": {
         "$listId": {
           ".read": true,
           ".write": true
         }
       }
     }
   }
   ```

7. Irgendeine Kleinigkeit committen & pushen (oder im Actions-Tab **„Re-run all jobs"**), damit der Workflow einmal mit den neuen Secrets durchläuft

**Wichtig zu wissen:**
- Diese Regeln sind bewusst offen – jede und jeder mit dem (langen, zufälligen) Freigabe-Code kann diese eine Liste lesen und bearbeiten, ganz ohne Login. Genau wie bei einem geteilten Google-Docs-Link: ohne den Code kommt niemand ran, aber es gibt keine Zugriffskontrolle im Hintergrund. Für eine private Einkaufsliste mit Familie/WG völlig ausreichend – für sensible Daten wäre das zu wenig.
- Die Secrets halten die Werte aus deinem **Git-Verlauf** raus. Im ausgelieferten JavaScript (das jede Besucherin im Browser lädt) stehen sie trotzdem – das lässt sich bei einer rein clientseitigen App nicht vermeiden. Das ist auch unkritisch: Firebase-Web-Configs sind grundsätzlich öffentlich sichtbar, jede Website die Firebase nutzt zeigt sie im Quellcode. Die eigentliche Absicherung passiert über die Regeln oben, nicht über Geheimhaltung der Config selbst.

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