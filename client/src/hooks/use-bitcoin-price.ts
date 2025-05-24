import { useQuery } from '@tanstack/react-query';
import { fetchBitcoinPrice, fetchHistoricalPrices, type BitcoinPriceData, type HistoricalPriceData } from '@/lib/bitcoin-api';

export function useBitcoinPrice() {
  return useQuery<BitcoinPriceData>({
    queryKey: ['/api/bitcoin/price'],
    refetchInterval: 30000, // Refresh every 30 seconds
    staleTime: 25000,
  });
}

export function useHistoricalPrices(days: number = 365) {
  return useQuery<HistoricalPriceData[]>({
    queryKey: ['/api/bitcoin/history', days],
    staleTime: 300000, // 5 minutes
  });
}
