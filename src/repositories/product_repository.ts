// eq: Wird verwendet, um eine Bedingung zu erstellen, die wir später brauchen (zum Beispiel: "Finde das Produkt mit der ID 3")
// sql: um spezielle SQL-Anfragen zu erstellen
// db und Transaction: Diese stellen die Verbindung zur Datenbank her und helfen, mit ihr zu kommunizieren
import { eq, SQL } from "drizzle-orm";
import { db, type Transaction } from "../db/client";
import { productsTable, type NewProduct, type Product } from "../db/schema";

// Funktion ProductRepository stellt einen Container mit Funktionen bereit, die alle mit Produkten in der Datenbank arbeiten
// tx: Dies ist eine Option, die es dem Code ermöglicht, eine bestimmte Art von Transaktion (eine Gruppe von Datenbankaktionen) zu verwenden, wenn nötig. Wenn keine Transaktion übergeben wird, verwendet der Code die Standarddatenbankverbindung db
// client: Dies ist die Verbindung zur Datenbank. Wenn tx übergeben wird, wird es verwendet, andernfalls nimmt der Code db (die Standarddatenbankverbindung)

export const ProductRepository = (tx?: Transaction) => {
  const client = tx ?? db;
  return {
    async create(newProduct: NewProduct): Promise<Product> {
      //await client.insert(productsTable).values(newProduct).returning();: Dieser Befehl fügt das Produkt in die Datenbank ein. Nachdem das Produkt eingefügt wurde, wird das Produkt zurückgegeben, damit wir es in der Antwort sehen können
      const [result] = await client
        .insert(productsTable)
        .values(newProduct)
        .returning();
      return result;
    },

    // condition: Wenn du nach bestimmten Produkten suchen möchtest (z. B. nur nach Produkten mit einem bestimmten Preis), kannst du eine Bedingung angeben.
    //client.query.productsTable.findMany({ where: condition }): Diese Zeile fragt die Datenbank nach Produkten und gibt die Ergebnisse zurück.
    async findMany(condition?: SQL<unknown>) {
      return client.query.productsTable.findMany({
        where: condition,
      });
    },

    // client.select().from(productsTable).where(eq(productsTable.id, id));: Diese Zeile fragt die Datenbank nach einem Produkt mit dieser ID
    //Wenn das Produkt gefunden wird, wird es zurückgegeben.
    //Wenn es kein Produkt mit dieser ID gibt, wird null zurückgegeben

    async findById(id: number): Promise<Product | null> {
      const [result] = await client // array destructuring
        .select()
        .from(productsTable)
        .where(eq(productsTable.id, id));

      return result;
    },
  };
};
