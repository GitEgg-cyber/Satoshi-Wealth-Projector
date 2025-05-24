import type { Express } from "express";
import { createServer, type Server } from "http";

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 60000; // 1 minute for price data
const HISTORICAL_CACHE_DURATION = 300000; // 5 minutes for historical data

function getCachedData(key: string, maxAge: number) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < maxAge) {
    return cached.data;
  }
  return null;
}

function setCachedData(key: string, data: any) {
  cache.set(key, { data, timestamp: Date.now() });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Bitcoin price API endpoint
  app.get('/api/bitcoin/price', async (req, res) => {
    try {
      const cacheKey = 'bitcoin-price';
      const cachedData = getCachedData(cacheKey, CACHE_DURATION);
      
      if (cachedData) {
        return res.json(cachedData);
      }

      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true');
      
      if (!response.ok) {
        if (response.status === 429) {
          // Rate limited - return cached data if available, otherwise error
          const staleData = cache.get(cacheKey);
          if (staleData) {
            return res.json(staleData.data);
          }
        }
        throw new Error(`CoinGecko API error: ${response.statusText}`);
      }
      
      const data = await response.json();
      const bitcoinData = data.bitcoin;
      
      // Fetch additional data for ATH/ATL with retry logic
      let coinData;
      try {
        const coinDataResponse = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false');
        
        if (coinDataResponse.ok) {
          coinData = await coinDataResponse.json();
        }
      } catch (coinError) {
        console.warn('Failed to fetch additional coin data, using basic data only');
      }
      
      const priceData = {
        price: bitcoinData.usd,
        marketCap: bitcoinData.usd_market_cap,
        volume24h: bitcoinData.usd_24h_vol,
        change24h: bitcoinData.usd_24h_change,
        ath: coinData?.market_data?.ath?.usd || 73750, // Fallback to known ATH
        atl: coinData?.market_data?.atl?.usd || 0.0048, // Fallback to known ATL
        athDate: coinData?.market_data?.ath_date?.usd ? new Date(coinData.market_data.ath_date.usd).toLocaleDateString() : 'Mar 14, 2024',
        atlDate: coinData?.market_data?.atl_date?.usd ? new Date(coinData.market_data.atl_date.usd).toLocaleDateString() : 'Jul 5, 2013',
      };
      
      setCachedData(cacheKey, priceData);
      res.json(priceData);
    } catch (error) {
      console.error('Bitcoin price API error:', error);
      res.status(500).json({ 
        message: 'Failed to fetch Bitcoin price data',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Historical price data endpoint
  app.get('/api/bitcoin/history', async (req, res) => {
    try {
      const days = parseInt(req.query.days as string) || 365;
      const maxDays = Math.min(days, 5475); // Limit to ~15 years
      const cacheKey = `bitcoin-history-${maxDays}`;
      
      const cachedData = getCachedData(cacheKey, HISTORICAL_CACHE_DURATION);
      if (cachedData) {
        return res.json(cachedData);
      }
      
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${maxDays}&interval=daily`);
      
      if (!response.ok) {
        if (response.status === 429) {
          // Rate limited - return cached data if available
          const staleData = cache.get(cacheKey);
          if (staleData) {
            return res.json(staleData.data);
          }
        }
        throw new Error(`CoinGecko historical API error: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      const historicalData = data.prices.map((point: [number, number]) => ({
        timestamp: point[0],
        price: point[1],
      }));
      
      setCachedData(cacheKey, historicalData);
      res.json(historicalData);
    } catch (error) {
      console.error('Historical data API error:', error);
      res.status(500).json({ 
        message: 'Failed to fetch historical data',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
