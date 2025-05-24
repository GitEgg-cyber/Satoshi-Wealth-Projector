import { useState, useEffect } from 'react';
import { Calculator, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useBitcoinPrice } from '@/hooks/use-bitcoin-price';
import { usdToSatoshis, satoshisToBtc, calculateDCA, formatCurrency } from '@/lib/calculators';

export default function SatoshiCalculator() {
  const [usdAmount, setUsdAmount] = useState<string>('1000');
  const [monthlyAmount, setMonthlyAmount] = useState<string>('500');
  const [timePeriod, setTimePeriod] = useState<string>('36');
  
  const { data: priceData, isLoading } = useBitcoinPrice();
  
  const btcPrice = priceData?.price || 0;
  const satoshis = usdToSatoshis(parseFloat(usdAmount) || 0, btcPrice);
  const btcAmount = satoshisToBtc(satoshis);
  
  const dcaResult = calculateDCA(
    parseFloat(monthlyAmount) || 0,
    parseInt(timePeriod) || 0,
    btcPrice
  );

  const quickAmounts = [100, 500, 1000, 5000];

  if (isLoading) {
    return (
      <section id="calculator" className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Loading calculator...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="calculator" className="py-16 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Satoshi Wealth Calculator</h2>
          <p className="text-gray-400">Convert any amount to satoshis and see your Bitcoin accumulation potential</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 animate-slide-up">
          {/* USD to Satoshi Calculator */}
          <Card className="bg-background border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="text-bitcoin mr-3" />
                USD to Satoshi Converter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="usd-amount" className="text-sm font-medium text-gray-300 mb-2">
                  Amount in USD
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                  <Input
                    id="usd-amount"
                    type="number"
                    value={usdAmount}
                    onChange={(e) => setUsdAmount(e.target.value)}
                    className="pl-8"
                    placeholder="1000"
                  />
                </div>
              </div>
              
              <Card className="bg-muted">
                <CardContent className="p-4">
                  <div className="text-sm text-gray-400 mb-1">Equivalent in Satoshis</div>
                  <div className="text-2xl font-bold text-bitcoin">
                    {satoshis.toLocaleString()} sats
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    ≈ {btcAmount.toFixed(8)} BTC
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {quickAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant={usdAmount === amount.toString() ? "default" : "outline"}
                    onClick={() => setUsdAmount(amount.toString())}
                    className="text-sm"
                  >
                    ${amount}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* DCA Calculator */}
          <Card className="bg-background border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="text-bitcoin mr-3" />
                DCA Strategy Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="monthly-amount" className="text-sm font-medium text-gray-300 mb-2">
                    Monthly Investment
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                    <Input
                      id="monthly-amount"
                      type="number"
                      value={monthlyAmount}
                      onChange={(e) => setMonthlyAmount(e.target.value)}
                      className="pl-8"
                      placeholder="500"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-300 mb-2">Time Period</Label>
                  <Select value={timePeriod} onValueChange={setTimePeriod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">1 Year</SelectItem>
                      <SelectItem value="24">2 Years</SelectItem>
                      <SelectItem value="36">3 Years</SelectItem>
                      <SelectItem value="60">5 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Card className="bg-muted">
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Investment</span>
                    <span className="font-semibold">{formatCurrency(dcaResult.totalInvestment)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Satoshis Accumulated</span>
                    <span className="font-semibold text-bitcoin">
                      {dcaResult.totalSatoshis.toLocaleString()} sats
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Bitcoin Amount</span>
                    <span className="font-semibold">{dcaResult.btcAmount.toFixed(8)} BTC</span>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
