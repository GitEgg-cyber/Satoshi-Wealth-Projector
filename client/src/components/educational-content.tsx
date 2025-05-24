import { GraduationCap, TrendingUp, Shield, BookOpen, Calculator, PieChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const educationalCards = [
  {
    icon: GraduationCap,
    title: "What is a Satoshi?",
    description: "A satoshi (sat) is the smallest unit of Bitcoin, named after Bitcoin's creator. 1 Bitcoin = 100,000,000 satoshis.",
    link: "#"
  },
  {
    icon: TrendingUp,
    title: "Dollar Cost Averaging",
    description: "DCA is an investment strategy where you buy a fixed amount regularly, reducing the impact of volatility.",
    link: "#"
  },
  {
    icon: Shield,
    title: "Secure Storage",
    description: "Learn about hardware wallets, private keys, and best practices for keeping your Bitcoin safe.",
    link: "#"
  },
  {
    icon: BookOpen,
    title: "Bitcoin Basics",
    description: "Understanding the fundamentals of Bitcoin, blockchain technology, and decentralized finance.",
    link: "#"
  },
  {
    icon: Calculator,
    title: "Investment Strategies",
    description: "Explore different approaches to Bitcoin investing, from HODLing to trading strategies.",
    link: "#"
  },
  {
    icon: PieChart,
    title: "Portfolio Management",
    description: "Learn how to incorporate Bitcoin into a diversified investment portfolio effectively.",
    link: "#"
  }
];

export default function EducationalContent() {
  const adZoneStyle = "bg-muted border border-border rounded-lg p-6 text-center";

  return (
    <section id="education" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Learn About Bitcoin & Satoshis</h2>
          <p className="text-gray-400">Essential knowledge for your Bitcoin journey</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {educationalCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <Card 
                key={index}
                className="bg-card border-border hover:border-bitcoin transition-colors group cursor-pointer"
              >
                <CardHeader>
                  <div className="text-bitcoin text-2xl mb-4">
                    <IconComponent />
                  </div>
                  <CardTitle className="text-lg">{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm mb-4">
                    {card.description}
                  </p>
                  <a 
                    href={card.link} 
                    className="text-bitcoin text-sm font-medium hover:text-bitcoin-dark transition-colors group-hover:underline"
                  >
                    Learn More →
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Ad Zone - Content Section */}
        <div className={`mt-12 ${adZoneStyle}`}>
          <div className="text-xs text-gray-500 mb-4">Advertisement</div>
          <div className="h-24 bg-gradient-to-r from-muted to-muted/80 rounded flex items-center justify-center">
            <span className="text-gray-400">970x90 Leaderboard Ad Space</span>
          </div>
        </div>
      </div>
    </section>
  );
}
