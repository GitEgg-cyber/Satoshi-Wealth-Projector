import { Bitcoin, Twitter, Facebook, Linkedin, MessageCircle } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const shareUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent("Check out this Bitcoin calculator and educational platform!");

  const socialLinks = [
    {
      icon: Twitter,
      label: "Twitter",
      url: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
      color: "text-blue-400"
    },
    {
      icon: Facebook,
      label: "Facebook", 
      url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      color: "text-blue-600"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      color: "text-blue-500"
    },
    {
      icon: MessageCircle,
      label: "Reddit",
      url: `https://reddit.com/submit?url=${shareUrl}&title=${shareText}`,
      color: "text-orange-500"
    }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSocialShare = (url: string) => {
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Bitcoin className="text-bitcoin text-xl" />
              <span className="text-lg font-bold">Satoshi Wealth</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your comprehensive Bitcoin calculator and education platform.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Tools</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button 
                  onClick={() => scrollToSection('calculator')}
                  className="hover:text-bitcoin transition-colors"
                >
                  Satoshi Calculator
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('charts')}
                  className="hover:text-bitcoin transition-colors"
                >
                  Price Charts
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-bitcoin transition-colors">DCA Calculator</a>
              </li>
              <li>
                <a href="#" className="hover:text-bitcoin transition-colors">Portfolio Tracker</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button 
                  onClick={() => scrollToSection('education')}
                  className="hover:text-bitcoin transition-colors"
                >
                  Educational Content
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-bitcoin transition-colors">Bitcoin News</a>
              </li>
              <li>
                <a href="#" className="hover:text-bitcoin transition-colors">Market Analysis</a>
              </li>
              <li>
                <a href="#" className="hover:text-bitcoin transition-colors">Investment Guide</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Share</h4>
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <button
                    key={social.label}
                    onClick={() => handleSocialShare(social.url)}
                    className={`bg-muted hover:bg-muted/80 p-2 rounded transition-colors ${social.color}`}
                    aria-label={`Share on ${social.label}`}
                  >
                    <IconComponent size={16} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} Satoshi Wealth Calculator. All rights reserved. | 
             <a href="#" className="text-bitcoin hover:text-bitcoin-dark ml-1">Privacy Policy</a> | 
             <a href="#" className="text-bitcoin hover:text-bitcoin-dark ml-1">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
