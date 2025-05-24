import { bitcoinPrices, historicalPrices, type BitcoinPrice, type InsertBitcoinPrice, type HistoricalPrice, type InsertHistoricalPrice } from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, gte, lt } from "drizzle-orm";

export interface IBitcoinStorage {
  saveBitcoinPrice(price: InsertBitcoinPrice): Promise<BitcoinPrice>;
  getLatestBitcoinPrice(): Promise<BitcoinPrice | undefined>;
  saveHistoricalPrices(prices: InsertHistoricalPrice[]): Promise<void>;
  getHistoricalPrices(timeframe: string, maxAge?: Date): Promise<HistoricalPrice[]>;
  clearOldHistoricalData(olderThan: Date): Promise<void>;
}

export class DatabaseBitcoinStorage implements IBitcoinStorage {
  async saveBitcoinPrice(insertPrice: InsertBitcoinPrice): Promise<BitcoinPrice> {
    const [price] = await db
      .insert(bitcoinPrices)
      .values(insertPrice)
      .returning();
    return price;
  }

  async getLatestBitcoinPrice(): Promise<BitcoinPrice | undefined> {
    const [price] = await db
      .select()
      .from(bitcoinPrices)
      .orderBy(desc(bitcoinPrices.timestamp))
      .limit(1);
    return price || undefined;
  }

  async saveHistoricalPrices(prices: InsertHistoricalPrice[]): Promise<void> {
    if (prices.length === 0) return;
    
    await db
      .insert(historicalPrices)
      .values(prices)
      .onConflictDoNothing();
  }

  async getHistoricalPrices(timeframe: string, maxAge?: Date): Promise<HistoricalPrice[]> {
    if (maxAge) {
      return await db
        .select()
        .from(historicalPrices)
        .where(and(
          eq(historicalPrices.timeframe, timeframe),
          gte(historicalPrices.createdAt, maxAge)
        ))
        .orderBy(historicalPrices.timestamp);
    }

    return await db
      .select()
      .from(historicalPrices)
      .where(eq(historicalPrices.timeframe, timeframe))
      .orderBy(historicalPrices.timestamp);
  }

  async clearOldHistoricalData(olderThan: Date): Promise<void> {
    await db
      .delete(historicalPrices)
      .where(lt(historicalPrices.createdAt, olderThan));
  }
}

export const bitcoinStorage = new DatabaseBitcoinStorage();
