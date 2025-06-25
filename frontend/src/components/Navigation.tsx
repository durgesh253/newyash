import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const industriesTimeout = useRef<NodeJS.Timeout | null>(null);

  return (
    <nav className="fixed w-full top-0 z-50 bg-white shadow-sm border-b border-border lg:rounded-full lg:backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/images/logo.png" alt="LeadReach AI Logo" className="h-12 w-auto" />
          </Link>

          {/* Desktop Navigation (now shows at lg - 1024px+) */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/about-us" className="text-foreground hover:text-primary transition-colors">About Us</Link>
              <Link to="/features" className="text-foreground hover:text-primary transition-colors">Features</Link>

              {/* Industries Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => {
                  if (industriesTimeout.current) clearTimeout(industriesTimeout.current);
                  setIndustriesOpen(true);
                }}
                onMouseLeave={() => {
                  industriesTimeout.current = setTimeout(() => setIndustriesOpen(false), 200);
                }}
              >
                <button className="text-foreground hover:text-primary transition-colors flex items-center">
                  Industries <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {industriesOpen && (
                  <div
                    onMouseEnter={() => {
                      if (industriesTimeout.current) clearTimeout(industriesTimeout.current);
                      setIndustriesOpen(true);
                    }}
                    onMouseLeave={() => {
                      industriesTimeout.current = setTimeout(() => setIndustriesOpen(false), 200);
                    }}
                    className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-md shadow-lg z-50"
                  >
                    <Link to="/integrations/services" className="block px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors">Services</Link>
                    <Link to="/integrations/ecommerce" className="block px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors">E-commerce</Link>
                    <Link to="/integrations/medical" className="block px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors">Medical</Link>
                    <Link to="/integrations/real-estate" className="block px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors">Real Estate</Link>
                  </div>
                )}
              </div>

              <Link to="/integrations" className="text-foreground hover:text-primary transition-colors">Integrations</Link>
              <Link to="/pricing" className="text-foreground hover:text-primary transition-colors">Pricing</Link>
              <Link to="/faq" className="text-foreground hover:text-primary transition-colors">FAQ</Link>
              <Link to="/contact-us" className="text-foreground hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>

          {/* Mobile Menu Button (visible below 1024px) */}
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-foreground hover:text-primary">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-4 pt-4 pb-4 space-y-1 bg-card border-t border-border rounded-2xl">
              <Link to="/" className="block px-3 py-2 text-foreground hover:text-primary">Home</Link>
              <Link to="/about-us" className="block px-3 py-2 text-foreground hover:text-primary">About Us</Link>
              <Link to="/features" className="block px-3 py-2 text-foreground hover:text-primary">Features</Link>
              <Link to="/integrations" className="block px-3 py-2 text-foreground hover:text-primary">Integrations</Link>
              <div className="pl-4">
                <Link to="/integrations/services" className="block px-3 py-2 text-foreground hover:text-primary text-sm">Services</Link>
                <Link to="/integrations/ecommerce" className="block px-3 py-2 text-foreground hover:text-primary text-sm">E-commerce</Link>
                <Link to="/integrations/medical" className="block px-3 py-2 text-foreground hover:text-primary text-sm">Medical</Link>
                <Link to="/integrations/real-estate" className="block px-3 py-2 text-foreground hover:text-primary text-sm">Real Estate</Link>
              </div>
              <Link to="/pricing" className="block px-3 py-2 text-foreground hover:text-primary">Pricing</Link>
              <Link to="/faq" className="block px-3 py-2 text-foreground hover:text-primary">FAQ</Link>
              <Link to="/contact-us" className="block px-3 py-2 text-foreground hover:text-primary">Contact</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
