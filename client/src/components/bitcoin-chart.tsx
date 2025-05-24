import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useHistoricalPrices, useBitcoinPrice } from '@/hooks/use-bitcoin-price';
import { formatCurrency, formatLargeNumber } from '@/lib/calculators';

export default function BitcoinChart() {
  const [timeframe, setTimeframe] = useState<number>(365);
  const { data: historicalData, isLoading: isLoadingHistory, error: historyError } = useHistoricalPrices(timeframe);
  const { data: priceData, isLoading: isLoadingPrice, error: priceError } = useBitcoinPrice();

  const timeframeOptions = [
    { label: '1Y', days: 365 },
    { label: '5Y', days: 1825 },
    { label: 'ALL', days: 5475 }, // ~15 years
  ];

  const chartData = historicalData?.map(point => ({
    date: new Date(point.timestamp).toLocaleDateString(),
    price: point.price,
  })) || [];

  const adZoneStyle = "bg-muted border border-border rounded-lg p-4";

  if (isLoadingHistory || isLoadingPrice) {
    return (
      <section id="charts" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Loading charts...</div>
          </div>
        </div>
      </section>
    );
  }

  if (historyError && !historicalData) {
    return (
      <section id="charts" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-red-400">Unable to load chart data. Please try again in a moment.</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="charts" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Bitcoin Historical Performance</h2>
          <p className="text-gray-400">15 years of Bitcoin price history and growth projections</p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Chart */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Bitcoin Price Chart</CardTitle>
                  <div className="flex space-x-2">
                    {timeframeOptions.map(({ label, days }) => (
                      <Button
                        key={label}
                        variant={timeframe === days ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTimeframe(days)}
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                      <XAxis 
                        dataKey="date" 
                        stroke="#9CA3AF"
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis 
                        stroke="#9CA3AF"
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => `$${formatLargeNumber(value)}`}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#262626',
                          border: '1px solid #333333',
                          borderRadius: '8px',
                          color: '#FAFAFA'
                        }}
                        formatter={(value: number) => [formatCurrency(value), 'Price']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#F7931A" 
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Price Stats */}
          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Price Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-gray-400">Current Price</div>
                  <div className="text-lg font-bold text-bitcoin">
                    {priceData ? formatCurrency(priceData.price) : 'Loading...'}
                  </div>
                  {priceData && (
                    <div className={`text-xs ${priceData.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {priceData.change24h >= 0 ? '+' : ''}{priceData.change24h.toFixed(2)}% (24h)
                    </div>
                  )}
                </div>
                
                <div>
                  <div className="text-sm text-gray-400">All-Time High</div>
                  <div className="text-lg font-bold text-green-400">
                    {priceData ? formatCurrency(priceData.ath) : 'Loading...'}
                  </div>
                  <div className="text-xs text-gray-500">{priceData?.athDate}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-400">All-Time Low</div>
                  <div className="text-lg font-bold text-red-400">
                    {priceData ? formatCurrency(priceData.atl) : 'Loading...'}
                  </div>
                  <div className="text-xs text-gray-500">{priceData?.atlDate}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-400">Market Cap</div>
                  <div className="text-lg font-bold">
                    {priceData ? `$${formatLargeNumber(priceData.marketCap)}` : 'Loading...'}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Ad Zone - Sidebar */}
            <div className={adZoneStyle}>
              <div className="text-xs text-gray-500 mb-2 text-center">Advertisement</div>
              <div className="h-48 bg-gradient-to-b from-muted to-muted/80 rounded flex items-center justify-center">
                <span className="text-gray-400 text-sm">300x250 Ad Space</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
