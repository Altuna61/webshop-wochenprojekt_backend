// Ein Datenbank-Client (hier Drizzle ORM mit PostgreSQL) ist eine Schnittstelle, die die Kommunikation zwischen der Anwendung und der Datenbank verwaltet.

// Ein Client kann:
// - Datenbankverbindungen verwalten (z. B. über einen Pool)
// - SQL-Abfragen ausführen (z. B. SELECT, INSERT, UPDATE)
// - Transaktionen verwalten (z. B. mehrere Abfragen in einem Schritt ausführen)
// - Datenbank-Migrationen und Schema-Management unterstützen

// In diesem Fall nutzt der Code Drizzle ORM, das eine abstrakte und typsichere Schnittstelle für PostgreSQL bietet.

import { drizzle } from "drizzle-orm/node-postgres"; // npm install drizzle-orm pg
import { Pool } from "pg";
import * as schema from "./schema";
import { ENV } from "../env";

// Verbindungspool für die API
// Ein Verbindungspool erlaubt mehreren gleichzeitigen Anfragen, indem er offene Verbindungen wiederverwendet
const pool = new Pool({
  connectionString: ENV.DATABASE_URL,
});

// Erstellt eine db-Instanz von Drizzle ORM mit dem Verbindungspool
// Nutzen: Diese Instanz wird für alle Datenbankabfragen in der API verwendet
export const db = drizzle({ client: pool, schema });

// Erstellt eine alternative singleConnectionDb-Instanz
// Hier wird eine einzelne Datenbankverbindung anstelle eines Pools genutzt
// Nutzen: Diese Variante kann für einmalige Skripte oder Migrationsprozesse verwendet werden
export const singleConnectionDb = drizzle(ENV.DATABASE_URL, { schema });

// Erstellt einen Typ Transaction für Drizzle-Transaktionen
// Nutzen: Erlaubt eine typsichere Verwendung von Transaktionen im Code
export type Transaction = Parameters<Parameters<typeof db.transaction>[0]>[0];
