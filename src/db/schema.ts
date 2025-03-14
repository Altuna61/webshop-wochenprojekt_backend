// Dieser Code definiert eine Datenbankstruktur für einen Online-Shop mit Drizzle ORM.
// Er legt Tabellen für Benutzer, Produkte, Bestellungen usw. an und bestimmt, wie sie miteinander verbunden sind.

import { relations } from "drizzle-orm";
import { decimal, primaryKey } from "drizzle-orm/gel-core";
import {
  integer,
  pgEnum,
  pgTable,
  text,
  numeric,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const category_enum = pgEnum("category_enum", [
  "Clothing",
  "Electronics",
  "Home",
  "Beauty & Health",
  "Gifts",
]);

export const orderStatus_enum = pgEnum("orderStatus_enum", [
  "Pending",
  "Shipped",
  "Delivered",
  "Cancelled",
]);

// USERS
// 1. table definition
export const usersTable = pgTable("users", {
  id: integer("id").primaryKey(),
  adressId: integer("adress_id"),
  firstname: text("firstname").notNull(),
  lastname: text("lastname").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});

// 2. relations (ein Benutzer kann mehrere Bestellungen(ordersTable) haben)
export const userRelations = relations(usersTable, ({ many }) => ({
  ordersTable: many(ordersTable, { relationName: "orders_to_users" }),
}));

// 3. types
// TypeScript Typen für Sicherheit
export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;

// schemas

// ADDRESSES
// 1. table definition
export const addressesTable = pgTable("adresses", {
  id: integer("id").primaryKey(),
  street: text("street").notNull(),
  housenumber: text("housenumber").notNull(),
  city: text("city").notNull(),
  zipcode: text("zipcode").notNull(),
});

// 2. relations (Jeder Benutzer kann eine Adresse haben, aber eine Adresse gehört nur einem Benutzer)

// 3. Types
// TypeScript Typen für Sicherheit
export type Adress = typeof addressesTable.$inferSelect;
export type NewAdress = typeof addressesTable.$inferInsert;

// schemas

// PRODUCTS
// 1. table definition
export const productsTable = pgTable("products", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  price: numeric("price"),
  category: category_enum().notNull(),
  imageUrl: text("image_url").notNull(),
  description: text("description").notNull(),
});

// 2. relations (Ein Produkt kann in mehreren Bestellpositionen (order_positions) vorkommen)
export const productRelations = relations(productsTable, ({ many }) => ({
  orderPostionTable: many(orderPostionTable, {
    relationName: "products_to_order_positions",
  }),
}));

// 3. Types
// TypeScript Typen für Sicherheit
export type Product = typeof productsTable.$inferSelect;
export type NewProduct = typeof productsTable.$inferInsert;

// schemas
// Zod-Schemas zur Validierung
// Überprüfung: imageUrl muss eine gültige URL sein
export const NewProductSchema = createInsertSchema(productsTable, {
  imageUrl: (value) => value.url("This is not a valid url"),
});

// ORDER POSITION
// Eine Bestellposition enthält ein Produkt in einer bestimmten Menge
export const orderPostionTable = pgTable("order_position", {
  orderId: numeric("order_id").notNull(),
  productId: numeric("product_id").notNull(),
  quantity: numeric("quantity"),
  priceAtOrder: decimal("price_at_order"),
});
// warum zsmgesetzter key? -> Ein Produkt kann mehrmals in einer Bestellung vorkommen – z. B. 3x iPhone und 2x Laptop
(table) => [primaryKey({ columns: [table.orderId, table.productId] })];

// 2. Relations
// Jede Bestellposition gehört genau zu einer Bestellung
// Jede Bestellposition gehört genau zu einem Produkt
export const orderPositionsRelations = relations(
  orderPostionTable,
  ({ one }) => ({
    ordersTable: one(ordersTable, {
      fields: [orderPostionTable.orderId],
      references: [ordersTable.id],
      relationName: "orders_to_order_positions",
    }),
    productsTable: one(productsTable, {
      fields: [orderPostionTable.productId],
      references: [productsTable.id],
      relationName: "products_to_order_positions",
    }),
  })
);

// 3. types
// TypeScript Typen für Sicherheit
export type OrderPosition = typeof orderPostionTable.$inferSelect;
export type NewOrderPosition = typeof orderPostionTable.$inferSelect;

// 4. Zod
export const NewOrderPositionSchema = createInsertSchema(orderPostionTable);

// ORDERS
// Eine Bestellung gehört zu genau einem Benutzer (userId)
// 1. Table definition
export const ordersTable = pgTable("orders", {
  id: integer("id").primaryKey(),
  userId: integer("user_id").notNull(),
  orderTime: timestamp("orderTime").notNull(),
  status: orderStatus_enum().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// 2. realations
// Eine Bestellung hat mehrere Bestellpositionen (orderPostionTable)
// Eine Bestellung gehört genau zu einem Benutzer (usersTable)
export const ordersRelations = relations(ordersTable, ({ many, one }) => ({
  orderPostionTable: many(orderPostionTable, {
    relationName: "orders_to_order_positions",
  }),
  user: one(usersTable, {
    fields: [ordersTable.id],
    references: [usersTable.id],
    relationName: "orders_to_users",
  }),
}));

// 3. types
// TypeScript Typen für Sicherheit
export type Order = typeof ordersTable.$inferSelect;
export type NewOrder = typeof ordersTable.$inferInsert;

// 4. Zod
export const NewOrderSchema = createInsertSchema(ordersTable);
