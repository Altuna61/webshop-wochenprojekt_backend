// Eine seed.ts-Datei wird in einer Datenbank verwendet, um Testdaten oder Standardwerte einzufügen. Sie sorgt dafür, dass die Datenbank nach der Migration nicht leer ist.

// Erstellt Beispieldaten (z. B. Demo-User, Produkte, Kategorien).
// Hilft beim Testen der Anwendung.
// Wird oft bei der ersten Einrichtung oder nach einem Datenbank-Reset genutzt.

// db: Datenbank-Client. Mit diesem Client kannst du Daten in die Datenbank einfügen, abfragen oder ändern
import { db } from "./client";
import {
  category_enum,
  orderPostionTable,
  ordersTable,
  productsTable,
  usersTable,
} from "./schema";

// Die Funktion seed wird später verwendet, um die Datenbank mit Beispieldaten zu füllen (User, Produkte, Bestellungen etc.)
// (Diese Funktion wird verwendet, um Daten in die Datenbank einzufügen)
async function seed() {
  console.log("Seeding database...");

  // user hinzufügen
  await db.insert(usersTable).values({
    id: 1,
    firstname: "Mery",
    lastname: "Keskin",
    email: "mery@keskin.de",
    password: "bsp123",
  });
  // Produkte hinzufügen
  const insertedProducts = await db
    .insert(productsTable)
    .values([
      {
        id: 1,
        name: "Gaming Laptop",
        price: "1499.99",
        category: category_enum.enumValues[1], // Electronics
        imageUrl: "https://example.com/gaming-laptop.jpg",
        description:
          "High-performance gaming laptop with RTX 4080 and 32GB RAM.",
      },
      {
        id: 2,
        name: "Smart LED Strip",
        price: "29.99",
        category: category_enum.enumValues[2], // Home
        imageUrl: "https://example.com/smart-led-strip.jpg",
        description:
          "RGB LED strip with smart home integration and app control.",
      },
      {
        id: 3,
        name: "Organic Face Cream",
        price: "19.99",
        category: category_enum.enumValues[3], // Beauty & Health
        imageUrl: "https://example.com/face-cream.jpg",
        description: "Moisturizing face cream with natural ingredients.",
      },
      {
        id: 4,
        name: "Men's Winter Jacket",
        price: "99.99",
        category: category_enum.enumValues[0], // Clothing
        imageUrl: "https://example.com/winter-jacket.jpg",
        description: "Warm and stylish winter jacket for men.",
      },
      {
        id: 5,
        name: "Wireless Headphones",
        price: "199.99",
        category: category_enum.enumValues[1], // Electronics
        imageUrl: "https://example.com/wireless-headphones.jpg",
        description:
          "Noise-canceling over-ear wireless headphones with 40h battery life.",
      },
      {
        id: 6,
        name: "Luxury Scented Candle",
        price: "24.99",
        category: category_enum.enumValues[4], // Gifts
        imageUrl: "https://example.com/scented-candle.jpg",
        description: "Handmade scented candle with lavender and vanilla aroma.",
      },
      {
        id: 7,
        name: "Ergonomic Office Chair",
        price: "299.99",
        category: category_enum.enumValues[2], // Home
        imageUrl: "https://example.com/office-chair.jpg",
        description: "Comfortable and adjustable ergonomic office chair.",
      },
    ])
    .returning();

  // Ohne .returning() würde die insert()-Funktion einfach die Daten einfügen und nichts zurückgeben.
  // um auf die eingefügten Daten zugreifen zu können (z. B. um sie weiterzuverwenden oder zu prüfen), benötigt man .returning().
  // die neu eingefügten Zeilen werden als Array zurückgegeben

  console.log("Inserted products: ", insertedProducts);

  // Bestellung hinzufügen
  const insertedOrder = await db
    .insert(ordersTable)
    .values({
      id: 1,
      userId: 1,
      orderTime: new Date("2025-03-13T10:00:00Z"),
      status: "Pending", // Enum-Wert
      createdAt: new Date(), // manuell gesetzt, oder entfernen, um defaultNow() zu verwenden
    })
    .returning();

  console.log("Inserted order:", insertedOrder);

  // Bestellposition hinzufügen
  if (insertedOrder.length > 0) {
    await db.insert(orderPostionTable).values([
      {
        orderId: insertedOrder[0].id,
        productId: insertedProducts[0].id,
        quantity: "2",
        priceAtOrder: "299.99",
      },
    ]);
    console.log("Inserted order positions.");
  }
  console.log("Seeding completed.");
}

seed();
