import React from 'react';
import { Filters, Doctor } from '../types';
import { Search } from 'lucide-react';

interface FilterPanelProps {
  filters: Filters;
  updateFilters: (newFilters: Partial<Filters>) => void;
  clearFilters: () => void;
  allSpecialties: string[];
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  updateFilters,
  clearFilters,
  allSpecialties
}) => {
  const handleConsultationChange = (type: 'Video Consult' | 'In Clinic' | 'All') => {
    if (type === 'All') {
      updateFilters({ consultationType: null });
    } else {
      updateFilters({
        consultationType: filters.consultationType === type ? null : type
      });
    }
  };
  
  const handleSpecialtyChange = (specialty: string) => {
    const specialties = [...filters.specialties];
    
    if (specialties.includes(specialty)) {
      updateFilters({
        specialties: specialties.filter(s => s !== specialty)
      });
    } else {
      updateFilters({
        specialties: [...specialties, specialty]
      });
    }
  };
  
  const handleSortChange = (sortType: 'fees' | 'experience') => {
    updateFilters({
      sort: filters.sort === sortType ? null : sortType
    });
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      {/* Sort Section */}
      <div className="mb-6">
      <h3 
  data-testid="filter-header-sort"
  className="text-base font-medium text-blue-600 hover:text-blue-800 mb-3"
>
  Sort by
</h3>

        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              data-testid="sort-fees"
              checked={filters.sort === 'fees'}
              onChange={() => handleSortChange('fees')}
              className="h-4 w-4 text-blue-600 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">
              Price: Low-High
            </span>
          </label>
          
          <label className="flex items-center">
            <input
              type="radio"
              data-testid="sort-experience"
              checked={filters.sort === 'experience'}
              onChange={() => handleSortChange('experience')}
              className="h-4 w-4 text-blue-600 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">
              Experience: Most Experience first
            </span>
          </label>
        </div>
      </div>

      {/* Filters Section */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-base font-medium text-gray-900">Filters</h3>
          <button 
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Clear All
          </button>
        </div>

        {/* Specialities Section */}
        <div className="mb-6">
          <h4 
            data-testid="filter-header-speciality"
            className="text-base font-medium text-blue-600 hover:text-blue-800 mb-3"
          >
            Specialities
          </h4>
          <div className="relative mb-2">
            <input
              type="text"
              placeholder="Search specialities"
              className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-md"
            />
            <Search className="absolute left-2 top-2.5 text-gray-400" size={16} />
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {allSpecialties.map(specialty => (
              <label key={specialty} className="flex items-center">
                <input
                  type="checkbox"
                  data-testid={`filter-specialty-${specialty.replace('/', '-')}`}
                  checked={filters.specialties.includes(specialty)}
                  onChange={() => handleSpecialtyChange(specialty)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">{specialty}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Mode of consultation */}
        <div>
          <h4 
            data-testid="filter-header-moc"
            className="text-base font-medium text-blue-600 hover:text-blue-800 mb-3"
          >
            Mode of consultation
          </h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                data-testid="filter-video-consult"
                checked={filters.consultationType === 'Video Consult'}
                onChange={() => handleConsultationChange('Video Consult')}
                className="h-4 w-4 text-blue-600 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Video Consultation</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="radio"
                data-testid="filter-in-clinic"
                checked={filters.consultationType === 'In Clinic'}
                onChange={() => handleConsultationChange('In Clinic')}
                className="h-4 w-4 text-blue-600 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">In-clinic Consultation</span>
            </label>

            <label className="flex items-center">
              <input
                type="radio"
                checked={filters.consultationType === null}
                onChange={() => handleConsultationChange('All')}
                className="h-4 w-4 text-blue-600 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">All</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;