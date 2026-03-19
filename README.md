# speiseplan

# Dokumentation & Handover: Speiseplan-App "Haus Gothensee"

Dieses Dokument enthält alle technischen Spezifikationen und Anleitungen für die Inbetriebnahme und Wartung der Speiseplan-Anwendung.

---

## 🛠 1. Technische Architektur
Die Anwendung ist eine **Node.js-Web-App**, die auf Einfachheit und Portabilität optimiert wurde. Sie nutzt ein JSON-basiertes Flat-File-System statt einer schweren Datenbank.

- **Backend:** Node.js (Express Framework)
- **Frontend:** HTML5, CSS3, Vanilla JavaScript (keine Framework-Abhängigkeiten)
- **Datenbank:** JSON-Files im Verzeichnis `/data`
- **Standard-Port:** `3000`

---

## 📂 2. Projektstruktur & Dateisystem
Das Projekt folgt einer klaren Struktur für eine einfache Trennung von Logik und Daten:

```text
/haus-gothensee
├── server.js              # Hauptserver: API-Routen & File-Handling
├── package.json           # Node-Abhängigkeiten
├── /data                  # Datenbank-Verzeichnis (Wird automatisch erstellt)
│   ├── users.json         # Zimmer-Accounts, Passwörter, Kapazitäten
│   └── orders.json        # Bestell-Historie nach Turnus-Wochen
└── /public                # Client-seitige Dateien (Web-Root)
    ├── index.html         # Login-Seite & App-Container
    ├── admin.html         # Admin-Dashboard (Management & Serviceplan)
    ├── app.js             # Client-Logik (Bestellungen, Validierung, PAX-Limit)
    ├── menu.js            # Speiseplan-Daten (Turnus-Wochen 1-6)
    └── style.css          # Globales Design & Print-Layouts
```    

# ⚡ Wichtige Hausregeln & Logik (Update)

### 🔒 Bestell-Deadline
- **Zeitpunkt:** Jeden Dienstag ab 0 Uhr bis Donnerstag, 12:00 Uhr mittags kann bestellt werden.
- **Effekt:** Nach diesem Zeitpunkt akzeptiert die API keine `POST`-Requests für die aktuelle Woche mehr. Das Frontend sperrt die Eingabemasken für Gäste automatisch.

### 📅 Wochenwechsel & Vorschau
- **Logik:** Das System nutzt einen rollierenden 6-Wochen-Turnus.
- **Vorschau-Modus:** Ab Dienstag (00:00 Uhr) kann im Admin-Bereich bereits die kommende Woche eingesehen und gedruckt werden.
- **Archiv:** Die Vorwoche bleibt im Admin-Bereich über ein Auswahlmenü ("Woche wählen") bis zum endgültigen Turnuswechsel (Mittwoch morgen) für den Nachtrag/Druck verfügbar.

### 🖨️ Druck-Spezifikationen
- Der Service-Plan ist so programmiert, dass er die Menü-IDs gegen die `menu.js` der jeweiligen Woche mappt. Beim Wechsel der Ansicht (z.B. zurück auf die Vorwoche) werden die korrekten Menütexte der vergangenen Woche geladen.

## 🚀 Startanleitung für Entwickler
Um die Anwendung lokal oder auf einem Server in Betrieb zu nehmen, folge diesen Schritten:

## 1. Voraussetzungen
Stelle sicher, dass Node.js (Version 16 oder höher) auf dem System installiert ist.

## 2. Installation
Navigiere in den Projektordner und installiere die notwendigen Abhängigkeiten (hauptsächlich express):

```Bash
npm install express
Falls noch keine package.json existiert, kann diese mit npm init -y erstellt werden.
```

## 3. Server starten
Starte den Node.js-Prozess mit folgendem Befehl:

```Bash
node server.js
Der Server läuft standardmäßig auf Port 3000.
```

## 4. Zugriff
Gast-Ansicht: http://localhost:3000

Admin-Bereich: Nach dem Login mit den Admin-Daten (Standard: admin / admin99) wird man automatisch zur admin.html weitergeleitet.

Hinweis für den Dev: Die Datei menu.js im /public-Ordner enthält das globale Objekt fullMenuData. Hier müssen die Speisepläne für alle 6 Wochen im vordefinierten Schema hinterlegt werden, damit das System die IDs korrekt den Bestellungen zuordnen kann.