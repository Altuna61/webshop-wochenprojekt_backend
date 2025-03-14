// Ein API-Schema ist eine strukturierte Beschreibung einer API (Application Programming Interface). Es definiert, wie Clients und Server miteinander kommunizieren können, indem es die verfügbaren Endpunkte, Anfragetypen, erwarteten Parameter, Antwortformate und Fehlercodes festlegt.

import { z } from "zod";
import { NewOrderSchema } from "../db/schema";

// POST Route
export const OrderPostSchema = NewOrderSchema.extend({
  orderPositions: z
    .array(
      z.object({
        productId: z.number(),
        quantity: z.coerce.string(),
      })
    )
    .nonempty(),
});

export type OrderPost = z.infer<typeof OrderPostSchema>;
