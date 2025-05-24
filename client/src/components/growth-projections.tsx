import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { calculateGrowthProjections, formatCurrency } from '@/lib/calculators';

export default function GrowthProjections() {
  const [initialInvestment, setInitialInvestment] = useState<string>('10000');
  const [growthRate, setGrowthRate] = useState<number[]>([100]);
  const [timeHorizon, setTimeHorizon] = useState<string>('10');

  const projections = calculateGrowthProjections(
    parseFloat(initialInvestment) || 0,
    parseInt(timeHorizon) || 0,
    0.5, // Conservative 50%
    growthRate[0] / 100, // User selected rate
    1.5 // Aggressive 150%
  );

  const calculateMultiplier = (final: number, initial: number) => {
    return initial > 0 ? (final / initial).toFixed(0) : '0';
  };

  return (
    <section className="py-16 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Growth Projections</h2>
          <p className="text-gray-400">Explore potential Bitcoin price scenarios based on historical patterns</p>
        </div>
        
        <Card className="bg-background border-border">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Projection Parameters</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="initial-investment" className="text-sm font-medium text-gray-300 mb-2">
                      Initial Investment
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                      <Input
                        id="initial-investment"
                        type="number"
                        value={initialInvestment}
                        onChange={(e) => setInitialInvestment(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-300 mb-2">
                      Annual Growth Rate
                    </Label>
                    <Slider
                      value={growthRate}
                      onValueChange={setGrowthRate}
                      max={200}
                      min={10}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-400 mt-1">
                      <span>10%</span>
                      <span className="text-bitcoin font-medium">{growthRate[0]}%</span>
                      <span>200%</span>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-300 mb-2">Time Horizon</Label>
                    <Select value={timeHorizon} onValueChange={setTimeHorizon}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 Years</SelectItem>
                        <SelectItem value="10">10 Years</SelectItem>
                        <SelectItem value="15">15 Years</SelectItem>
                        <SelectItem value="20">20 Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Projection Results</h3>
                <div className="space-y-4">
                  <Card className="bg-muted">
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-400 mb-1">Conservative (50% Annual)</div>
                      <div className="text-xl font-bold text-green-400">
                        {formatCurrency(projections.conservative)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {calculateMultiplier(projections.conservative, parseFloat(initialInvestment))}x return
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-muted">
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-400 mb-1">
                        Moderate ({growthRate[0]}% Annual)
                      </div>
                      <div className="text-xl font-bold text-bitcoin">
                        {formatCurrency(projections.moderate)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {calculateMultiplier(projections.moderate, parseFloat(initialInvestment))}x return
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-muted">
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-400 mb-1">Aggressive (150% Annual)</div>
                      <div className="text-xl font-bold text-purple-400">
                        {formatCurrency(projections.aggressive)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {calculateMultiplier(projections.aggressive, parseFloat(initialInvestment))}x return
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
            
            <div className="border-t border-border pt-6">
              <div className="text-xs text-gray-500 leading-relaxed">
                <strong>Disclaimer:</strong> These projections are for educational purposes only and should not be considered investment advice. 
                Cryptocurrency investments are highly volatile and carry significant risk. Past performance does not guarantee future results. 
                Always consult with a qualified financial advisor before making investment decisions.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
