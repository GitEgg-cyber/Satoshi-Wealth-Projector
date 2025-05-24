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
    const response = await fetch('/api/bitcoin/price');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Bitcoin price: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
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
