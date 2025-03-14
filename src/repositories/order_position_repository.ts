import { db, type Transaction } from "../db/client";
import {
  orderPostionTable,
  orderStatus_enum,
  type NewOrderPosition,
} from "../db/schema";

export const OrderPositionRepository = (tx?: Transaction) => {
  const client = tx ?? db;
  return {
    async create(newOrderPosition: NewOrderPosition) {
      const [result] = await client
        .insert(orderPostionTable)
        .values(newOrderPosition)
        .returning();
      return result;
    },
  };
};
