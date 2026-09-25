import React, { useState } from 'react';

interface PropertiesHeaderProps {
  totalProperties?: number;
  onSortChange?: (sort: string) => void;
  onViewChange?: (view: 'grid' | 'list') => void;
}

const PropertiesHeader: React.FC<PropertiesHeaderProps> = ({ 
  totalProperties = 107,
  onSortChange,
  onViewChange 
}) => {
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleSortChange = (value: string) => {
    setSortBy(value);
    onSortChange?.(value);
  };

  const handleViewChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
    onViewChange?.(mode);
  };

  return (
    <div className="border-b border-[#E2E8F0] bg-white sticky top-0 z-10">
      <div className="max-w-[1440px] mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Left - Title and Count */}
          <div>
            <h1 className="font-syne text-3xl text-[#0F172A] mb-1">
              All Properties
            </h1>
            <p className="font-manrope font-extralight text-sm text-[#6B7280]">
              Showing {totalProperties} {totalProperties === 1 ? 'property' : 'properties'}
            </p>
          </div>

          {/* Right - Sort and View Controls */}
          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="font-manrope font-extralight text-sm text-[#6B7280]">
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="bg-white border border-[#E2E8F0] rounded-lg px-4 py-2 font-manrope text-sm text-[#0F172A] cursor-pointer focus:outline-none focus:border-[#2563EB] appearance-none pr-8 bg-no-repeat bg-right"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23221410' d='M6 8L2 4h8z'/%3E%3C/svg%3E")`,
                  backgroundPosition: 'right 0.75rem center'
                }}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="beds">Most Beds</option>
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-[#FFFFFF] rounded-lg p-1">
              <button
                onClick={() => handleViewChange('grid')}
                className={`p-2 rounded transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#2563EB] shadow-sm'
                    : 'text-[#6B7280] hover:text-[#2563EB]'
                }`}
                title="Grid View"
              >
                <span className="material-icons text-xl">grid_view</span>
              </button>
              <button
                onClick={() => handleViewChange('list')}
                className={`p-2 rounded transition-all ${
                  viewMode === 'list'
                    ? 'bg-white text-[#2563EB] shadow-sm'
                    : 'text-[#6B7280] hover:text-[#2563EB]'
                }`}
                title="List View"
              >
                <span className="material-icons text-xl">view_list</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesHeader;