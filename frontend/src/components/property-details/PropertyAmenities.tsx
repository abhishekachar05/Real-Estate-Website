import React from 'react';
import {
  Dumbbell, Waves, Footprints, Gamepad2, Trophy, Activity,
  Users, Baby, Building, Clapperboard,
  Shield, Camera, Flame, Lock, Phone,
  Car, ParkingCircle, Plug,
  Zap, ArrowUpDown, Droplet, Fuel, Wifi, AirVent, Droplets,
  TreePine, Flower2, DoorOpen, Compass, Eye, Heater,
  Shirt, DoorClosed, PawPrint,
  CheckCircle
} from 'lucide-react';

// Map amenity names (case-insensitive) to Lucide icons
const AMENITY_ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  'gym': Dumbbell,
  'fitness center': Dumbbell,
  'gymnasium': Dumbbell,
  'fully equipped gymnasium': Dumbbell,
  'exercise room/gym': Dumbbell,
  'swimming pool': Waves,
  'olympic-size swimming pool': Waves,
  'pool': Waves,
  'jogging track': Footprints,
  'indoor games': Gamepad2,
  'sports facility': Trophy,
  'yoga room': Activity,
  'clubhouse': Users,
  'clubhouse open hall': Users,
  'children play area': Baby,
  "children's play area": Baby,
  'multipurpose hall': Building,
  'home theater': Clapperboard,
  'security': Shield,
  'security system': Shield,
  '24/7 advanced security': Shield,
  'cctv surveillance': Camera,
  'cctv': Camera,
  'fire safety': Flame,
  'gated community': Lock,
  'intercom': Phone,
  'parking': Car,
  'covered parking': ParkingCircle,
  'covered valet parking': ParkingCircle,
  'visitor parking': ParkingCircle,
  'ev charging': Plug,
  'power backup': Zap,
  'lift': ArrowUpDown,
  'elevator': ArrowUpDown,
  'water supply 24/7': Droplet,
  'piped gas': Fuel,
  'gas pipeline': Fuel,
  'wi-fi': Wifi,
  'high-speed internet ready': Wifi,
  'air conditioning': AirVent,
  'central heating and air conditioning': AirVent,
  'rain water harvesting': Droplets,
  'garden': TreePine,
  'landscaped garden': Flower2,
  'balcony': DoorOpen,
  'terrace': DoorOpen,
  'lake view': Eye,
  'fireplace': Heater,
  'dock': Waves,
  'garage': Car,
  'laundry service': Shirt,
  'servant room': DoorClosed,
  'master bathroom': DoorClosed,
  'guest bathroom': DoorClosed,
  'pet friendly': PawPrint,
  'vastu compliant': Compass,
};

function getAmenityIcon(name: string): React.FC<{ className?: string }> {
  return AMENITY_ICON_MAP[name.toLowerCase().trim()] || CheckCircle;
}

interface PropertyAmenitiesProps {
  amenities?: string[];
}

const PropertyAmenities: React.FC<PropertyAmenitiesProps> = ({ amenities = [] }) => {
  if (amenities.length === 0) return null;

  return (
    <div className="mb-12">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 bg-[#2563EB] rounded-full" />
        <h2 className="font-syne text-2xl text-[#0F172A]">
          Key Amenities
        </h2>
      </div>

      {/* Amenities Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {amenities.map((amenity, index) => {
          const Icon = getAmenityIcon(amenity);
          return (
            <div
              key={index}
              className="flex items-center gap-3 bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl px-4 py-3 transition-all hover:border-[#2563EB]/30 hover:shadow-sm"
            >
              <div className="w-9 h-9 bg-[rgba(37, 99, 235,0.1)] rounded-lg flex items-center justify-center shrink-0">
                <Icon className="w-[18px] h-[18px] text-[#2563EB]" />
              </div>
              <span className="font-manrope text-sm text-[#0F172A]">
                {amenity}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PropertyAmenities;