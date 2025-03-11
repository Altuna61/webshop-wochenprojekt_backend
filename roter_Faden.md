## 1. Planung und Architektur bestimmen:

- Datenbank in dbdiagramm.io erstellen
- API- Endpunkte definieren
- Technologien auswählen (Bun, Hono, Drizzle ORM, Postgres, React, Zustand, TailwindCSS)
- Docker? -> .yml

## 2. Datenbankmodell erstellen:

s. Datenbankstruktur in Teams (Marco)

## 3. Backend mit Bun, Hono & Drizzle ORM erstellen:

### 1. Projekt-Setup:

- bun init
- bun add hono drizzle-orm pg dotenv

### 2. Verbindung zur Datenbank einrichten:

src/db/index.ts

```
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema });
```

npm install pg

npm install --save-dev @types/pg

### 3. Tabellen mit Drizzle ORM erstellen:

src/db/schema.ts

### 4. API-Endpunkte mit Hono erstellen:

src/routes/products.ts

# Server starten: bun run src/index.ts
