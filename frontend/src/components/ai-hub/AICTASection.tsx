import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AICTASection: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-[#0F172A] to-[#3d2519] py-20 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-10 right-20 w-64 h-64 bg-[#2563EB]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-20 w-48 h-48 bg-[#2563EB]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[800px] mx-auto px-6 text-center relative z-10">
        <h2 className="font-fraunces text-4xl text-white mb-4">
          Explore Our Full Property Listings
        </h2>
        <p className="font-manrope font-light text-lg text-white/60 mb-8 max-w-[560px] mx-auto">
          Browse all available properties or let our AI find
          the perfect match for your needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/properties"
            className="inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1E40AF] text-white font-manrope font-semibold px-8 py-4 rounded-xl transition-all"
          >
            Browse Properties
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-manrope font-semibold px-8 py-4 rounded-xl transition-all hover:bg-white/5"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AICTASection;
