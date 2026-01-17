import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="container-custom py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl font-semibold mb-2">Join Our Newsletter</h3>
              <p className="text-primary-foreground/70">Get 10% off your first order and exclusive access to new arrivals.</p>
            </div>
            <form className="flex gap-2 w-full md:w-auto">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 w-full md:w-64"
              />
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 whitespace-nowrap">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="font-display text-2xl font-bold">Azm Store</Link>
            <p className="mt-4 text-primary-foreground/70 text-sm leading-relaxed">
              Premium products for modern living. We curate the finest items from around the world, 
              delivered right to your doorstep.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/products" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">All Products</Link></li>
              <li><Link to="/category/electronics" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Electronics</Link></li>
              <li><Link to="/category/home" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Home & Living</Link></li>
              <li><Link to="/category/accessories" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Accessories</Link></li>
              <li><Link to="/category/beauty" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Beauty & Care</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/contact" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/privacy" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-primary-foreground/70">
                <Mail className="h-4 w-4" />
                support@azmstore.com
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/70">
                <Phone className="h-4 w-4" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-start gap-2 text-primary-foreground/70">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>123 Commerce St, Suite 100<br />New York, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
            <p>© 2024 Azm Store. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <img src="https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons/svg/color/visa.svg" alt="Visa" className="h-6 opacity-70" />
              <img src="https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons/svg/color/mastercard.svg" alt="Mastercard" className="h-6 opacity-70" />
              <span className="text-xs">Secure payments powered by Stripe & PayPal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
