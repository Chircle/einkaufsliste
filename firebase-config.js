// Platzhalter für lokale Entwicklung / falls kein GitHub-Actions-Deploy genutzt wird.
//
// Auf GitHub Pages wird diese Datei bei JEDEM Deploy automatisch von
// .github/workflows/deploy.yml aus den Repository Secrets neu generiert -
// die echten Werte stehen NIE in diesem Repo/Git-Verlauf, sondern nur
// verschlüsselt in GitHub selbst (Settings -> Secrets and variables -> Actions).
//
// Ohne Secrets bleibt FIREBASE_CONFIG leer und die App läuft normal weiter -
// "Teilen" liefert dann nur eine Text-Kopie ohne Link und ohne Live-Sync.
//
// Einrichtung: siehe README.md, Abschnitt "Live-Sync einrichten".

window.FIREBASE_CONFIG = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};