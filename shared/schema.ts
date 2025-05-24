import { pgTable, text, serial, integer, boolean, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const bitcoinPrices = pgTable("bitcoin_prices", {
  id: serial("id").primaryKey(),
  price: decimal("price", { precision: 12, scale: 2 }).notNull(),
  marketCap: decimal("market_cap", { precision: 15, scale: 2 }),
  volume24h: decimal("volume_24h", { precision: 15, scale: 2 }),
  change24h: decimal("change_24h", { precision: 5, scale: 2 }),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const insertBitcoinPriceSchema = createInsertSchema(bitcoinPrices).omit({
  id: true,
  timestamp: true,
});

export type InsertBitcoinPrice = z.infer<typeof insertBitcoinPriceSchema>;
export type BitcoinPrice = typeof bitcoinPrices.$inferSelect;
