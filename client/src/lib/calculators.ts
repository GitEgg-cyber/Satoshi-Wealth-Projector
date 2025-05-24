export function usdToSatoshis(usdAmount: number, btcPrice: number): number {
  if (btcPrice <= 0) return 0;
  const btcAmount = usdAmount / btcPrice;
  return Math.round(btcAmount * 100_000_000);
}

export function satoshisToUsd(satoshis: number, btcPrice: number): number {
  const btcAmount = satoshis / 100_000_000;
  return btcAmount * btcPrice;
}

export function satoshisToBtc(satoshis: number): number {
  return satoshis / 100_000_000;
}

export interface DCACalculation {
  totalInvestment: number;
  totalSatoshis: number;
  btcAmount: number;
  averagePrice: number;
}

export function calculateDCA(
  monthlyAmount: number, 
  months: number, 
  currentBtcPrice: number
): DCACalculation {
  const totalInvestment = monthlyAmount * months;
  
  // Simplified calculation assuming current price for all purchases
  // In reality, you'd use historical prices or average price over time
  const totalBtcAmount = totalInvestment / currentBtcPrice;
  const totalSatoshis = Math.round(totalBtcAmount * 100_000_000);
  
  return {
    totalInvestment,
    totalSatoshis,
    btcAmount: totalBtcAmount,
    averagePrice: currentBtcPrice,
  };
}

export interface GrowthProjection {
  conservative: number;
  moderate: number;
  aggressive: number;
}

export function calculateGrowthProjections(
  initialInvestment: number,
  years: number,
  conservativeRate: number = 0.5,
  moderateRate: number = 1.0,
  aggressiveRate: number = 1.5
): GrowthProjection {
  const conservative = initialInvestment * Math.pow(1 + conservativeRate, years);
  const moderate = initialInvestment * Math.pow(1 + moderateRate, years);
  const aggressive = initialInvestment * Math.pow(1 + aggressiveRate, years);
  
  return {
    conservative,
    moderate,
    aggressive,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatLargeNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1) + 'B';
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + 'K';
  }
  return num.toLocaleString();
}
