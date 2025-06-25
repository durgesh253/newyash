import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="text-2xl font-bold">
              LeadReach<span className="text-blue-400">AI</span>.com
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Unlock intelligent, automated Voice and lead conversation powered by real-time data and predictive insights. Whether you're scaling or optimizing an enterprise pipeline, LeadReachAI helps you identify, engage, and convert your ideal customers — faster.
            </p>
            <div className="flex items-center space-x-2">
              <Input 
                placeholder="Enter email address" 
                className="bg-slate-800 border-slate-700 text-white placeholder-gray-400 flex-1" 
              />
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
                →
              </Button>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <input type="checkbox" className="w-3 h-3" />
              <span className="text-gray-400">
                I agree to the <Link to="/privacy-policy" className="text-blue-400 underline">Privacy policy</Link>.
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Home
              </Link>
              <Link to="/about-us" className="block text-gray-300 hover:text-white transition-colors text-sm">
                About us
              </Link>
              <Link to="/integrations/services" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Integrations
              </Link>
              <Link to="/pricing" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Pricing
              </Link>
              <Link to="/blog" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Blog
              </Link>
              <Link to="/faq" className="block text-gray-300 hover:text-white transition-colors text-sm">
                FAQ
              </Link>
              <Link to="/contact-us" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Contact us
              </Link>
            </div>
          </div>

          {/* Customer Access & Demos */}
          <div>
            <h3 className="font-semibold text-white mb-4">Customers Access & Demos</h3>
            <div className="space-y-2">
              <Link to="/login" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Login
              </Link>
            </div>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact us</h3>
            <div className="space-y-3">
              <div className="text-sm text-gray-300">
                <div className="font-medium">Sensor Wie LLC.</div>
                <div className="flex items-center mt-1">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>4023 Kennett Pike #50762</span>
                </div>
                <div>Wilmington, DE 19807</div>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Phone className="w-3 h-3 mr-2" />
                <span>+1 (267) 588-5540</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Mail className="w-3 h-3 mr-2" />
                <span>hello@leadreachai.com</span>
              </div>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex space-x-3 mt-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Linkedin className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Youtube className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div>
            Copyright @ 2025 designed by ThemetochiMount — powered by Webflow
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy policy
            </Link>
            <Link to="/terms-conditions" className="hover:text-white transition-colors">
              Terms & conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;