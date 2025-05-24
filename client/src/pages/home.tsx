import { Bitcoin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/header';
import SatoshiCalculator from '@/components/satoshi-calculator';
import BitcoinChart from '@/components/bitcoin-chart';
import GrowthProjections from '@/components/growth-projections';
import EducationalContent from '@/components/educational-content';
import Footer from '@/components/footer';
import { useBitcoinPrice } from '@/hooks/use-bitcoin-price';
import { formatCurrency } from '@/lib/calculators';

export default function Home() {
  const { data: priceData, isLoading } = useBitcoinPrice();

  const adZoneStyle = "bg-card border border-border rounded-lg p-4 text-center";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-card to-background py-20 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Calculate Your <span className="text-bitcoin">Satoshi Wealth</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover how much Bitcoin you can accumulate and track your journey to financial freedom with our advanced calculators.
            </p>
            
            <Card className="bg-card rounded-xl p-6 inline-block animate-pulse-glow border-bitcoin/20">
              <CardContent className="p-0">
                <div className="text-sm text-gray-400 mb-2">Current Bitcoin Price</div>
                <div className="text-3xl font-bold text-bitcoin">
                  {isLoading ? (
                    <span className="animate-pulse">Loading...</span>
                  ) : priceData ? (
                    formatCurrency(priceData.price)
                  ) : (
                    'Error loading price'
                  )}
                </div>
                {priceData && (
                  <div className={`text-sm ${priceData.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {priceData.change24h >= 0 ? '+' : ''}{priceData.change24h.toFixed(2)}% (24h)
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Ad Zone 1 - Header Banner */}
          <div className={`${adZoneStyle} mb-8`}>
            <div className="text-xs text-gray-500 mb-2">Advertisement</div>
            <div className="h-20 bg-gradient-to-r from-muted to-muted/80 rounded flex items-center justify-center">
              <span className="text-gray-400">728x90 Ad Space</span>
            </div>
          </div>
        </div>
      </section>

      <SatoshiCalculator />
      <BitcoinChart />
      <GrowthProjections />
      <EducationalContent />
      <Footer />
    </div>
  );
}
