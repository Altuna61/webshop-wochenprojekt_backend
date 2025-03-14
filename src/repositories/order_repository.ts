import { db, type Transaction } from "../db/client";
import { ordersTable, type NewOrder } from "../db/schema";

export const OrderRepository = (tx?: Transaction) => {
  const client = tx ?? db;
  return {
    async create(newOrder: NewOrder) {
      const [result] = await client
        .insert(ordersTable)
        .values(newOrder)
        .returning();
      return result;
    },
  };
};
