import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const industriesTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleIndustriesMouseEnter = () => {
    if (industriesTimeout.current) {
      clearTimeout(industriesTimeout.current);
    }
    setIndustriesOpen(true);
  };

  const handleIndustriesMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIndustriesOpen(false);
    }, 300);
    industriesTimeout.current = timeout;
  };

  const scrollToDemo = () => {
    const demoElement = document.getElementById('demo');
    if (demoElement) {
      demoElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border-2" style={{ borderColor: '#0000cf' }}>
              <img 
                src="/images/header.png" 
                alt="LeadReach AI Character"
                className="w-full h-full object-contain"
                loading="eager"
                decoding="async"
              />
            </div>
            <span className="text-xl font-bold text-gray-900">
              LeadReach<span style={{ color: '#0000cf' }}>AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Industries Dropdown */}
            <div 
              className="relative"
              onMouseEnter={handleIndustriesMouseEnter}
              onMouseLeave={handleIndustriesMouseLeave}
            >
              <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors py-2 px-3 rounded-lg">
                Industries
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {industriesOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    <Link 
                      to="/integrations/services" 
                      className="block px-4 py-3 text-gray-700 transition-all duration-200 rounded-lg mx-2 hover:bg-blue-600 hover:text-white"
                    >
                      Services
                    </Link>
                    <Link 
                      to="/integrations/ecommerce" 
                      className="block px-4 py-3 text-gray-700 transition-all duration-200 rounded-lg mx-2 hover:bg-blue-600 hover:text-white"
                    >
                      E-commerce
                    </Link>
                    <Link 
                      to="/integrations/medical" 
                      className="block px-4 py-3 text-gray-700 transition-all duration-200 rounded-lg mx-2 hover:bg-blue-600 hover:text-white"
                    >
                      Medical
                    </Link>
                    <Link 
                      to="/integrations/real-estate" 
                      className="block px-4 py-3 text-gray-700 transition-all duration-200 rounded-lg mx-2 hover:bg-blue-600 hover:text-white"
                    >
                      Real Estate
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            <Link 
              to="/features" 
              className="text-gray-600 hover:text-gray-900 transition-all duration-200 py-2 px-3 rounded-lg hover:bg-blue-600 hover:text-white"
            >
              Features
            </Link>
            <Link 
              to="/integrations" 
              className="text-gray-600 hover:text-gray-900 transition-all duration-200 py-2 px-3 rounded-lg hover:bg-blue-600 hover:text-white"
            >
              Integrations
            </Link>
            <Link 
              to="/about-us" 
              className="text-gray-600 hover:text-gray-900 transition-all duration-200 py-2 px-3 rounded-lg hover:bg-blue-600 hover:text-white"
            >
              About
            </Link>
            <Link 
              to="/faq" 
              className="text-gray-600 hover:text-gray-900 transition-all duration-200 py-2 px-3 rounded-lg hover:bg-blue-600 hover:text-white"
            >
              FAQs
            </Link>
          </div>

          {/* Right Side - Language & CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Selector */}
            <div className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors py-2">
              <img src="/flags/uk.png" alt="UK Flag" className="w-5 h-5 rounded-sm" />
              <span className="text-sm font-medium">EN</span>
              <ChevronDown className="h-3 w-3" />
            </div>
            
            {/* CTA Button */}
            <Button 
              onClick={scrollToDemo}
              className="bg-lime-400 hover:bg-lime-500 text-black px-6 py-2.5 rounded-full font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
              style={{ backgroundColor: '#a3e635' }}
            >
              Talk to a Smart Agent
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-gray-900 p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-6 py-4 space-y-2 bg-white border-t border-gray-100 rounded-lg shadow-lg">
              {/* Mobile Industries Section */}
              <div className="space-y-2">
                <button 
                  className="text-gray-600 font-medium py-3 px-4 border-b border-gray-200 bg-gray-50 rounded-lg block w-full text-left flex items-center justify-between"
                  onClick={() => setIndustriesOpen(!industriesOpen)}
                >
                  Industries
                  <ChevronDown className={`w-4 h-4 transition-transform ${industriesOpen ? 'rotate-180' : ''}`} />
                </button>
                {industriesOpen && (
                  <div className="pl-4 space-y-2">
                    <Link 
                      to="/integrations/services" 
                      className="block text-gray-600 hover:text-white transition-all duration-200 py-2 px-2 rounded hover:bg-blue-600"
                      onClick={() => setIsOpen(false)}
                    >
                      Services
                    </Link>
                    <Link 
                      to="/integrations/ecommerce" 
                      className="block text-gray-600 hover:text-white transition-all duration-200 py-2 px-2 rounded hover:bg-blue-600"
                      onClick={() => setIsOpen(false)}
                    >
                      E-commerce
                    </Link>
                    <Link 
                      to="/integrations/medical" 
                      className="block text-gray-600 hover:text-white transition-all duration-200 py-2 px-2 rounded hover:bg-blue-600"
                      onClick={() => setIsOpen(false)}
                    >
                      Medical
                    </Link>
                    <Link 
                      to="/integrations/real-estate" 
                      className="block text-gray-600 hover:text-white transition-all duration-200 py-2 px-2 rounded hover:bg-blue-600"
                      onClick={() => setIsOpen(false)}
                    >
                      Real Estate
                    </Link>
                  </div>
                )}
              </div>
              
              <Link 
                to="/features" 
                className="block text-gray-600 hover:text-white transition-all duration-200 py-3 px-4 rounded-lg hover:bg-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>
              <Link 
                to="/integrations" 
                className="block text-gray-600 hover:text-white transition-all duration-200 py-3 px-4 rounded-lg hover:bg-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Integrations
              </Link>
              <Link 
                to="/about-us" 
                className="block text-gray-600 hover:text-white transition-all duration-200 py-3 px-4 rounded-lg hover:bg-blue-600"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/faq" 
                className="block text-gray-600 hover:text-white transition-all duration-200 py-3 px-4 rounded-lg hover:bg-blue-600"
                onClick={() => setIsOpen(false)}
              >
                FAQs
              </Link>
              
              {/* Mobile CTA Button */}
              <Button 
                onClick={() => {
                  setIsOpen(false);
                  scrollToDemo();
                }}
                className="w-full bg-lime-400 hover:bg-lime-500 text-black px-6 py-3 rounded-full font-semibold transition-all duration-200 shadow-lg mt-4"
                style={{ backgroundColor: '#a3e635' }}
              >
                Talk to a Smart Agent
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
