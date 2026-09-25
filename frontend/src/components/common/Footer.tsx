import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    // TODO: Submit to backend
    setEmail('');
  };

  return (
    <footer className="bg-[#111827] text-white">
      <div className="max-w-[1280px] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <Link to="/" className="flex items-center mb-6">
              <img
                src="/propert-e-logo-transparent.png"
                alt="Propert-E"
                loading="lazy"
                decoding="async"
                className="h-12 w-auto object-contain brightness-0 invert"
                draggable={false}
              />
            </Link>
            <p className="font-manrope font-extralight text-[#9ca3af] text-sm leading-relaxed mb-6">
              AI-powered luxury real estate platform connecting you with your dream home through intelligent matching and personalized recommendations.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <button 
                type="button"
                aria-label="Facebook"
                onClick={(e) => e.preventDefault()}
                className="w-10 h-10 bg-[rgba(255,255,255,0.05)] hover:bg-[#2563EB] border border-[rgba(255,255,255,0.1)] rounded-lg flex items-center justify-center transition-all group cursor-pointer"
              >
                <Facebook className="w-5 h-5 text-[#9ca3af] group-hover:text-white transition-[color]" />
              </button>
              <button 
                type="button"
                aria-label="Twitter"
                onClick={(e) => e.preventDefault()}
                className="w-10 h-10 bg-[rgba(255,255,255,0.05)] hover:bg-[#2563EB] border border-[rgba(255,255,255,0.1)] rounded-lg flex items-center justify-center transition-all group cursor-pointer"
              >
                <Twitter className="w-5 h-5 text-[#9ca3af] group-hover:text-white transition-[color]" />
              </button>
              <button 
                type="button"
                aria-label="Instagram"
                onClick={(e) => e.preventDefault()}
                className="w-10 h-10 bg-[rgba(255,255,255,0.05)] hover:bg-[#2563EB] border border-[rgba(255,255,255,0.1)] rounded-lg flex items-center justify-center transition-all group cursor-pointer"
              >
                <Instagram className="w-5 h-5 text-[#9ca3af] group-hover:text-white transition-[color]" />
              </button>
              <button 
                type="button"
                aria-label="LinkedIn"
                onClick={(e) => e.preventDefault()}
                className="w-10 h-10 bg-[rgba(255,255,255,0.05)] hover:bg-[#2563EB] border border-[rgba(255,255,255,0.1)] rounded-lg flex items-center justify-center transition-all group cursor-pointer"
              >
                <Linkedin className="w-5 h-5 text-[#9ca3af] group-hover:text-white transition-[color]" />
              </button>
              <button 
                type="button"
                aria-label="YouTube"
                onClick={(e) => e.preventDefault()}
                className="w-10 h-10 bg-[rgba(255,255,255,0.05)] hover:bg-[#2563EB] border border-[rgba(255,255,255,0.1)] rounded-lg flex items-center justify-center transition-all group cursor-pointer"
              >
                <Youtube className="w-5 h-5 text-[#9ca3af] group-hover:text-white transition-[color]" />
              </button>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-syne font-bold text-white text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/properties" className="font-manrope font-extralight text-[#9ca3af] text-sm hover:text-white hover:pl-2 transition-all inline-block">
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link to="/ai-hub" className="font-manrope font-extralight text-[#9ca3af] text-sm hover:text-white hover:pl-2 transition-all inline-block">
                  AI Property Hub
                </Link>
              </li>
              <li>
                <Link to="/about" className="font-manrope font-extralight text-[#9ca3af] text-sm hover:text-white hover:pl-2 transition-all inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="font-manrope font-extralight text-[#9ca3af] text-sm hover:text-white hover:pl-2 transition-all inline-block">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h4 className="font-syne font-bold text-white text-lg mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li>
                <a href="https://maps.google.com/?q=40+JP+Nagar+Manjunath+Garden+Bangalore" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 font-manrope font-extralight text-[#9ca3af] text-sm hover:text-white transition-[color] group">
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#2563EB]" />
                  <span className="leading-relaxed">
                    40, JP Nagar<br />
                    Manjunath Garden,<br />
                    Bangalore
                  </span>
                </a>
              </li>
              <li>
                <a href="tel:+918296540658" className="flex items-center gap-3 font-manrope font-extralight text-[#9ca3af] text-sm hover:text-white transition-[color]">
                  <Phone className="w-5 h-5 flex-shrink-0 text-[#2563EB]" />
                  <span>+91 8296540658</span>
                </a>
              </li>
              <li>
                <a href="mailto:properte@gmail.com" className="flex items-center gap-3 font-manrope font-extralight text-[#9ca3af] text-sm hover:text-white transition-[color]">
                  <Mail className="w-5 h-5 flex-shrink-0 text-[#2563EB]" />
                  <span>properte@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="font-syne font-bold text-white text-lg mb-6">Stay Updated</h4>
            <p className="font-manrope font-extralight text-[#9ca3af] text-sm mb-4 leading-relaxed">
              Subscribe to our newsletter for the latest listings, market insights, and exclusive offers.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 font-manrope font-extralight text-sm text-white placeholder:text-[#6b7280] focus:outline-none focus:border-[#2563EB] transition-[border-color]"
                required
              />
              <button 
                type="submit"
                className="w-full bg-[#2563EB] hover:bg-[#1E40AF] text-white font-manrope font-bold text-sm px-4 py-3 rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                Subscribe
              </button>
            </form>
            <p className="font-manrope font-extralight text-[#6b7280] text-xs mt-3">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[rgba(255,255,255,0.1)] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-manrope font-extralight text-[#6b7280] text-sm text-center md:text-left">
              © 2026 Propert-E. All rights reserved. Powered by AI.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#" className="font-manrope font-extralight text-[#6b7280] text-sm hover:text-white transition-[color]">
                Privacy Policy
              </a>
              <a href="#" className="font-manrope font-extralight text-[#6b7280] text-sm hover:text-white transition-[color]">
                Terms of Service
              </a>
              <a href="#" className="font-manrope font-extralight text-[#6b7280] text-sm hover:text-white transition-[color]">
                Cookie Policy
              </a>
              <a href="#" className="font-manrope font-extralight text-[#6b7280] text-sm hover:text-white transition-[color]">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;