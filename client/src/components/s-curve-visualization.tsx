import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart } from 'recharts';
import { TrendingUp, Zap, Globe, Bitcoin } from 'lucide-react';

// S-curve data for internet adoption (1990-2010)
const internetData = [
  { year: 1990, adoption: 0.1, users: 3 },
  { year: 1991, adoption: 0.2, users: 5 },
  { year: 1992, adoption: 0.4, users: 8 },
  { year: 1993, adoption: 0.8, users: 15 },
  { year: 1994, adoption: 1.5, users: 25 },
  { year: 1995, adoption: 3, users: 45 },
  { year: 1996, adoption: 5, users: 77 },
  { year: 1997, adoption: 8, users: 120 },
  { year: 1998, adoption: 12, users: 188 },
  { year: 1999, adoption: 18, users: 280 },
  { year: 2000, adoption: 26, users: 414 },
  { year: 2001, adoption: 35, users: 513 },
  { year: 2002, adoption: 42, users: 665 },
  { year: 2003, adoption: 48, users: 778 },
  { year: 2004, adoption: 54, users: 913 },
  { year: 2005, adoption: 60, users: 1024 },
  { year: 2006, adoption: 65, users: 1158 },
  { year: 2007, adoption: 69, users: 1319 },
  { year: 2008, adoption: 73, users: 1574 },
  { year: 2009, adoption: 76, users: 1802 },
  { year: 2010, adoption: 79, users: 2000 }
];

// Bitcoin data (2009-2024) with realistic adoption percentages
const bitcoinData = [
  { year: 2009, adoption: 0.001, users: 0.01, price: 0.0008 },
  { year: 2010, adoption: 0.01, users: 0.1, price: 0.08 },
  { year: 2011, adoption: 0.05, users: 0.5, price: 5 },
  { year: 2012, adoption: 0.1, users: 1, price: 200 },
  { year: 2013, adoption: 0.3, users: 3, price: 800 },
  { year: 2014, adoption: 0.5, users: 5, price: 350 },
  { year: 2015, adoption: 0.8, users: 8, price: 430 },
  { year: 2016, adoption: 1.2, users: 12, price: 970 },
  { year: 2017, adoption: 2.0, users: 20, price: 19000 },
  { year: 2018, adoption: 2.5, users: 25, price: 3800 },
  { year: 2019, adoption: 3.2, users: 32, price: 7200 },
  { year: 2020, adoption: 4.5, users: 45, price: 29000 },
  { year: 2021, adoption: 6.8, users: 68, price: 69000 },
  { year: 2022, adoption: 8.2, users: 82, price: 16500 },
  { year: 2023, adoption: 10.5, users: 105, price: 42000 },
  { year: 2024, adoption: 1.6, users: 128, price: 107000 }
];

// Future projections based on S-curve model
const bitcoinProjections = [
  { year: 2025, adoption: 16, users: 160, price: 150000 },
  { year: 2026, adoption: 20, users: 200, price: 225000 },
  { year: 2027, adoption: 25, users: 250, price: 340000 },
  { year: 2028, adoption: 31, users: 310, price: 500000 },
  { year: 2029, adoption: 38, users: 380, price: 750000 },
  { year: 2030, adoption: 46, users: 460, price: 1100000 },
  { year: 2035, adoption: 68, users: 680, price: 8500000 },
  { year: 2040, adoption: 79, users: 790, price: 25000000 }
];

const allBitcoinData = [...bitcoinData, ...bitcoinProjections];

export default function SCurveVisualization() {
  const [activeView, setActiveView] = useState<'adoption' | 'price'>('adoption');
  const [isZoomed, setIsZoomed] = useState(false);
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);
  const [showProjections, setShowProjections] = useState(false);

  // Animation effect for entering view
  useEffect(() => {
    const timer = setTimeout(() => setShowProjections(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const currentYear = 2024;
  const internetEquivalentYear = 1998; // Where Bitcoin is on internet timeline

  const formatPrice = (price: number) => {
    if (price >= 1000000) return `$${(price / 1000000).toFixed(1)}M`;
    if (price >= 1000) return `$${(price / 1000).toFixed(0)}K`;
    return `$${price.toFixed(2)}`;
  };

  const formatUsers = (users: number) => {
    if (users >= 1000) return `${(users / 1000).toFixed(0)}B`;
    return `${users.toFixed(0)}M`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
          <p className="font-semibold text-bitcoin">{label}</p>
          {activeView === 'adoption' ? (
            <>
              <p className="text-sm">Adoption: {data.adoption?.toFixed(1)}%</p>
              <p className="text-sm">Users: {formatUsers(data.users)}</p>
            </>
          ) : (
            <>
              <p className="text-sm">Price: {formatPrice(data.price)}</p>
              <p className="text-sm">Users: {formatUsers(data.users)}</p>
            </>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-bitcoin to-yellow-400 bg-clip-text text-transparent">
            The Bitcoin S-Curve: We're Still Early
          </h2>
          <p className="text-xl text-gray-300 mb-6">
            Bitcoin adoption mirrors the internet's explosive growth. See where we are on the curve.
          </p>
        </div>

        {/* Interactive Controls */}
        <div className="flex justify-center mb-8">
          <div className="bg-card rounded-lg p-2 border border-border">
            <Button
              variant={activeView === 'adoption' ? 'default' : 'ghost'}
              onClick={() => setActiveView('adoption')}
              className="mr-2"
            >
              <Globe className="w-4 h-4 mr-2" />
              Adoption Rate
            </Button>
            <Button
              variant={activeView === 'price' ? 'default' : 'ghost'}
              onClick={() => setActiveView('price')}
            >
              <Bitcoin className="w-4 h-4 mr-2" />
              Price Growth
            </Button>
          </div>
        </div>

        {/* Main S-Curve Chart */}
        <Card className="bg-card border-border mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <TrendingUp className="text-bitcoin mr-3" />
                {activeView === 'adoption' ? 'Adoption S-Curve Comparison' : 'Bitcoin Price S-Curve'}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsZoomed(!isZoomed)}
                className="text-xs"
              >
                {isZoomed ? 'Zoom Out' : 'Zoom to Present'}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                {activeView === 'adoption' ? (
                  <AreaChart data={isZoomed ? internetData.slice(-8) : internetData}>
                    <defs>
                      <linearGradient id="internetGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="bitcoinGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F7931A" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#F7931A" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                    <XAxis 
                      dataKey="year" 
                      stroke="#9CA3AF"
                      domain={isZoomed ? [2000, 2010] : ['dataMin', 'dataMax']}
                    />
                    <YAxis 
                      stroke="#9CA3AF"
                      tickFormatter={(value) => `${value}%`}
                      domain={isZoomed ? [20, 80] : [0, 80]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="adoption"
                      stroke="#3B82F6"
                      fill="url(#internetGradient)"
                      strokeWidth={3}
                      name="Internet Adoption"
                    />
                    {!isZoomed && (
                      <ReferenceLine 
                        x={internetEquivalentYear} 
                        stroke="#F7931A" 
                        strokeDasharray="5 5"
                        strokeWidth={2}
                        label={{ value: "Bitcoin Today ≈ Internet 1998", position: "top" }}
                      />
                    )}
                  </AreaChart>
                ) : (
                  <LineChart data={showProjections ? allBitcoinData : bitcoinData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                    <XAxis 
                      dataKey="year" 
                      stroke="#9CA3AF"
                      domain={isZoomed ? [2020, 2030] : [2009, 2040]}
                    />
                    <YAxis 
                      stroke="#9CA3AF"
                      scale="log"
                      domain={['dataMin', 'dataMax']}
                      tickFormatter={(value) => formatPrice(value)}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#F7931A"
                      strokeWidth={3}
                      dot={{ fill: '#F7931A', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 8, stroke: '#F7931A', strokeWidth: 2 }}
                    />
                    <ReferenceLine 
                      x={currentYear} 
                      stroke="#00FF00" 
                      strokeDasharray="5 5"
                      strokeWidth={2}
                      label={{ value: "We Are Here", position: "top" }}
                    />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Key Insights Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <Card className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 border-blue-500/30">
            <CardContent className="p-6">
              <div className="text-center">
                <Globe className="text-blue-400 text-3xl mx-auto mb-4" />
                <h3 className="text-lg font-bold text-blue-400 mb-2">Internet 1995</h3>
                <p className="text-2xl font-bold text-white mb-2">~1.6% Adoption</p>
                <p className="text-sm text-gray-300">50M users globally</p>
                <p className="text-xs text-gray-400 mt-2">5 years before explosive growth</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-bitcoin/20 to-yellow-600/20 border-bitcoin/30 animate-pulse-glow">
            <CardContent className="p-6">
              <div className="text-center">
                <Bitcoin className="text-bitcoin text-3xl mx-auto mb-4" />
                <h3 className="text-lg font-bold text-bitcoin mb-2">Bitcoin 2024</h3>
                <p className="text-2xl font-bold text-white mb-2">~1.6% Adoption</p>
                <p className="text-sm text-gray-300">128M users globally</p>
                <p className="text-xs text-gray-400 mt-2">Equivalent to Internet 1995!</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/20 to-green-800/20 border-green-500/30">
            <CardContent className="p-6">
              <div className="text-center">
                <Zap className="text-green-400 text-3xl mx-auto mb-4" />
                <h3 className="text-lg font-bold text-green-400 mb-2">Potential 2040</h3>
                <p className="text-2xl font-bold text-white mb-2">25% Adoption</p>
                <p className="text-sm text-gray-300">~2 billion users</p>
                <p className="text-xs text-gray-400 mt-2">Following internet curve</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Growth Projection Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">If Bitcoin Follows Internet S-Curve</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">2025 (Conservative)</span>
                  <span className="font-bold text-green-400">$150,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">2030 (Base Case)</span>
                  <span className="font-bold text-bitcoin">$1.1 Million</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">2035 (Exponential)</span>
                  <span className="font-bold text-purple-400">$8.5 Million</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">2040 (Maturity)</span>
                  <span className="font-bold text-yellow-400">$25 Million</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-xs text-gray-400">
                  <strong>Based on 50% CAGR:</strong> Historical S-curve adoption patterns suggest 
                  we're still in early exponential phase, similar to internet in 1998.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Why Today's Volatility Doesn't Matter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-4 bg-red-900/20 rounded-lg border border-red-500/30">
                  <p className="text-sm text-red-400 mb-2">Daily Price Swings</p>
                  <p className="text-2xl font-bold text-red-400">±5%</p>
                  <p className="text-xs text-gray-400">Seems huge day-to-day</p>
                </div>
                <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                  <p className="text-sm text-green-400 mb-2">15-Year S-Curve Growth</p>
                  <p className="text-2xl font-bold text-green-400">1,400x</p>
                  <p className="text-xs text-gray-400">Makes volatility invisible</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-xs text-gray-400">
                  On an S-curve timeline, today's ±20% moves are just noise. 
                  The internet had similar volatility in 1998 - but the long-term trend was unstoppable.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}