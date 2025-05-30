export interface BitcoinPriceData {
  price: number;
  marketCap: number;
  volume24h: number;
  change24h: number;
  ath: number;
  atl: number;
  athDate: string;
  atlDate: string;
}

export interface HistoricalPriceData {
  timestamp: number;
  price: number;
}

export async function fetchBitcoinPrice(): Promise<BitcoinPriceData> {
  try {
    const apiKey = '5cc829bc-f5e6-47ce-8df6-805a06ec6719';
    const response = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC&convert=USD`, {
      headers: {
        'Accepts': 'application/json',
        '5cc829bc-f5e6-47ce-8df6-805a06ec6719': apiKey,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Bitcoin price: ${response.statusText}`);
    }
    
    const data = await response.json();
    return {
      price: data.data.BTC.quote.USD.price,
      marketCap: data.data.BTC.quote.USD.market_cap,
      volume24h: data.data.BTC.quote.USD.volume_24h,
      change24h: data.data.BTC.quote.USD.percent_change_24h,
      ath: data.data.BTC.quote.USD.ath,
      atl: data.data.BTC.quote.USD.atl,
      athDate: data.data.BTC.quote.USD.ath_date,
      atlDate: data.data.BTC.quote.USD.atl_date,
    };
  } catch (error) {
    console.error('Error fetching Bitcoin price:', error);
    throw error;
  }
}





export async function fetchHistoricalPrices(days: number = 365): Promise<HistoricalPriceData[]> {
  try {
    const response = await fetch(`/api/bitcoin/history?days=${days}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch historical data: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching historical data:', error);
    throw error;
  }
}
