# Webshop-Projekt:

In dieser mehrwöchigen Aufgabe wirst du einen einfachen Online-Shop entwickeln. Das Ziel ist es, eine vollständige Webanwendung zu erstellen, bestehend aus einem Frontend und einem Backend. Dabei kommen moderne Web-Technologien zum Einsatz, die du bereits kennengelernt hast.

## _Ziele des Projekts:_

- Entwicklung eines Online-Shops mit Kunden-Login, Produktanzeige und einem funktionalen Warenkorb.
- Implementierung eines einfachen Authentifizierungssystems mit Cookie-basiertem Login.
- Speicherung von Bestellungen, Produkten und Profilinformationen in einer Datenbank.

## _Anforderungen:_

### Frontend:

- Umsetzung einer nutzerfreundlichen Shop-Oberfläche (Customer-Facing)
  -Produktanzeige mit Paginierung
  -Einkaufswagen-Funktionalität mit Zustand-Management (Zustand für den Warenkorb verwalten). Der Einkaufswagen kann rein Frontend-Seitig sein. Hierfür kannst du die Bibliothek react-Zustand benutzen.
  -Checkout-Prozess mit Bestellübersicht
  -Order-Historie
- Implementierung eines einfachen Login-Systems:
  -Passwort-Hashing und Vergleich mit gespeichertem Hash in der Datenbank
  -Cookie-basierte Authentifizierung (z. B. userId im Cookie speichern)
  Einstellungsbereich für den Benutzer:
  Profil bearbeiten (Adresse, Name etc.)
  Bestellhistorie anzeigen
- UI-Komponenten mit shadcn/ui und Styling mit TailwindCSS
- Formulare mit react-hook-form (z. B. für Login, Checkout, Profil)
- Skeleton Loading States für verbesserte Benutzerfreundlichkeit

### Backend:

- Erstellung eines Backends mit Bun, Hono, Drizzle ORM und Postgres, oder mit Spring und Postgres
- API-Endpunkte für:
  -Produkte abrufen (inkl. Paginierung)
  -Bestellungen verwalten
  -Benutzerverwaltung (Login, Profiländerungen)
- Datenbankstruktur mit relationalen Tabellen für Benutzer, Produkte, Bestellungen
- Seed-Skript zur Befüllung der Datenbank mit Beispielprodukten (z. B. mit ChatGPT generierte Dummy-Daten)
- Passende Bildquellen für Produkte finden oder selbst erstellen

### Infrastruktur & Deployment:

- Docker-Image für jede Komponente (Frontend, Backend, Datenbank)
- Docker Compose zur Orchestrierung der Services
