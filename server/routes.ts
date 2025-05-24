import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // Bitcoin price API endpoint
  app.get('/api/bitcoin/price', async (req, res) => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true');
      
      if (!response.ok) {
        throw new Error(`CoinGecko API error: ${response.statusText}`);
      }
      
      const data = await response.json();
      const bitcoinData = data.bitcoin;
      
      // Fetch additional data for ATH/ATL
      const coinDataResponse = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false');
      
      if (!coinDataResponse.ok) {
        throw new Error(`CoinGecko coin data API error: ${coinDataResponse.statusText}`);
      }
      
      const coinData = await coinDataResponse.json();
      const marketData = coinData.market_data;
      
      const priceData = {
        price: bitcoinData.usd,
        marketCap: bitcoinData.usd_market_cap,
        volume24h: bitcoinData.usd_24h_vol,
        change24h: bitcoinData.usd_24h_change,
        ath: marketData.ath.usd,
        atl: marketData.atl.usd,
        athDate: new Date(marketData.ath_date.usd).toLocaleDateString(),
        atlDate: new Date(marketData.atl_date.usd).toLocaleDateString(),
      };
      
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
      
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${maxDays}&interval=daily`);
      
      if (!response.ok) {
        throw new Error(`CoinGecko historical API error: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      const historicalData = data.prices.map((point: [number, number]) => ({
        timestamp: point[0],
        price: point[1],
      }));
      
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
