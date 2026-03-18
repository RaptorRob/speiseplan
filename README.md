# speiseplan

Speiseplan-Website 

1. System-Architektur
Die App ist eine Lightweight-Node.js-Webanwendung. Sie verzichtet auf komplexe Datenbanken und nutzt ein JSON-basiertes Flat-File-System im Ordner /data.

Backend: Node.js mit Express-Framework.

Frontend: Vanilla JavaScript (ES6+), CSS3, HTML5.

Datenhaltung: Persistente JSON-Dateien (users.json, orders.json).

2. Key Features & Business Logic
6-Wochen-Turnus: Automatische Berechnung der Menü-Woche basierend auf dem Referenzdatum 2023-12-18 (Mo).

Mittwoch-Rhythmus: Der Admin-Serviceplan ist auf den hausinternen Wechsel (Mittwoch bis Dienstag) optimiert.

PAX-Validierung: Frontend-Logik verhindert, dass mehr Essen bestellt werden, als Personen (pax) im Zimmer registriert sind.

Farbleitsystem: Konsistente CSS-Klassen (type-A, type-B, type-C) für die Menü-Kategorien in Gast- und Admin-Ansicht.

Druck-Engine: Dynamische Generierung von Einzel-Zugangsbelegen für Gäste mit automatischem Page-Break.

3. Projektstruktur
Plaintext
/haus-gothensee
├── server.js            # Express-Server & API-Endpunkte
├── package.json         # Abhängigkeiten (express)
├── /data                # Datenbank-Ersatz
│   ├── users.json       # Zimmer, Passwörter, Tische, Slots
│   └── orders.json      # Gespeicherte Bestellungen
└── /public              # Frontend-Assets
    ├── index.html       # Login-Maske
    ├── admin.html       # Admin-Interface (Zimmer & Serviceplan)
    ├── app.js           # Gast-Logik & UI-Rendering
    ├── menu.js          # Speiseplan-Daten (Woche 1-6)
    └── style.css        # Globales Design & Druck-Layouts


🚀 Startanleitung für Entwickler
Um die Anwendung lokal oder auf einem Server in Betrieb zu nehmen, folge diesen Schritten:

1. Voraussetzungen
Stelle sicher, dass Node.js (Version 16 oder höher) auf dem System installiert ist.

2. Installation
Navigiere in den Projektordner und installiere die notwendigen Abhängigkeiten (hauptsächlich express):

Bash
npm install express
Falls noch keine package.json existiert, kann diese mit npm init -y erstellt werden.

3. Server starten
Starte den Node.js-Prozess mit folgendem Befehl:

Bash
node server.js
Der Server läuft standardmäßig auf Port 3000.

4. Zugriff
Gast-Ansicht: http://localhost:3000

Admin-Bereich: Nach dem Login mit den Admin-Daten (Standard: admin / admin99) wird man automatisch zur admin.html weitergeleitet.

Hinweis für den Dev: Die Datei menu.js im /public-Ordner enthält das globale Objekt fullMenuData. Hier müssen die Speisepläne für alle 6 Wochen im vordefinierten Schema hinterlegt werden, damit das System die IDs korrekt den Bestellungen zuordnen kann.