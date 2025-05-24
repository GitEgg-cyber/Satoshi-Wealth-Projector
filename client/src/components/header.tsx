import { useState } from 'react';
import { Bitcoin, Menu, X } from 'lucide-react';
import { useBitcoinPrice } from '@/hooks/use-bitcoin-price';
import { formatCurrency } from '@/lib/calculators';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: priceData, isLoading } = useBitcoinPrice();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Bitcoin className="text-bitcoin text-2xl" />
            <h1 className="text-xl font-bold text-white">Satoshi Wealth</h1>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('calculator')}
              className="text-gray-300 hover:text-bitcoin transition-colors"
            >
              Calculator
            </button>
            <button 
              onClick={() => scrollToSection('charts')}
              className="text-gray-300 hover:text-bitcoin transition-colors"
            >
              Charts
            </button>
            <button 
              onClick={() => scrollToSection('education')}
              className="text-gray-300 hover:text-bitcoin transition-colors"
            >
              Learn
            </button>
          </nav>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400 hidden sm:block">
              BTC: {isLoading ? (
                <span className="animate-pulse">Loading...</span>
              ) : (
                <span className="text-bitcoin font-semibold">
                  {priceData ? formatCurrency(priceData.price) : 'Error'}
                </span>
              )}
            </span>
            <button 
              className="md:hidden text-gray-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('calculator')}
                className="text-gray-300 hover:text-bitcoin transition-colors text-left"
              >
                Calculator
              </button>
              <button 
                onClick={() => scrollToSection('charts')}
                className="text-gray-300 hover:text-bitcoin transition-colors text-left"
              >
                Charts
              </button>
              <button 
                onClick={() => scrollToSection('education')}
                className="text-gray-300 hover:text-bitcoin transition-colors text-left"
              >
                Learn
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
