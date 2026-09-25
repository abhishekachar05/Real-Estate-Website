import React from 'react';

interface PropertyAboutProps {
  description?: string;
}

const PropertyAbout: React.FC<PropertyAboutProps> = ({ 
  description = `Discover the epitome of urban luxury at Skyline Towers. This meticulously designed 4BHK residence offers a seamless blend of contemporary architecture and premium living. The property features an expansive living area with floor-to-ceiling windows, premium oak flooring, and state-of-the-art smart home integration.

The master suite is a sanctuary retreat with a spacious walk-in closet and an ensuite bathroom featuring imported Italian marble. All three additional bedrooms are generously proportioned, each with ample natural light coming in through floor-to-ceiling windows. The modern kitchen boasts top-tier appliances and custom Italian cabinetry. The home is crafted for discerning lifestyles.` 
}) => {
  return (
    <div className="mb-12">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 bg-[#2563EB] rounded-full" />
        <h2 className="font-syne text-2xl text-[#0F172A]">
          About The Property
        </h2>
      </div>

      {/* Description */}
      <div className="space-y-4">
        {description.split('\n\n').map((paragraph, index) => (
          <p 
            key={index}
            className="font-manrope font-extralight text-base text-[#64748B] leading-relaxed"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default PropertyAbout;