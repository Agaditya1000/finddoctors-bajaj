import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Doctor, Filters } from './types';
import { fetchDoctors } from './services/api';
import { filterDoctors, getAllSpecialties } from './utils/filters';
import { getFiltersFromUrl, setUrlParams } from './utils/url';
import AutocompleteSearch from './components/AutocompleteSearch';
import FilterPanel from './components/FilterPanel';
import DoctorList from './components/DoctorList';

function App() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [allSpecialties, setAllSpecialties] = useState<string[]>([]);
  const [filters, setFilters] = useState<Filters>({
    searchQuery: '',
    consultationType: null,
    specialties: [],
    sort: null
  });

  useEffect(() => {
    const loadDoctors = async () => {
      setLoading(true);
      const data = await fetchDoctors();
      setDoctors(data);
      setAllSpecialties(getAllSpecialties(data));
      setLoading(false);
    };

    loadDoctors();
  }, []);

  useEffect(() => {
    if (doctors.length > 0) {
      const urlFilters = getFiltersFromUrl();
      setFilters(urlFilters);
    }
  }, [doctors]);

  useEffect(() => {
    if (doctors.length > 0) {
      setFilteredDoctors(filterDoctors(doctors, filters));
      setUrlParams(filters);
    }
  }, [doctors, filters]);

  useEffect(() => {
    const handlePopState = () => {
      const urlFilters = getFiltersFromUrl();
      setFilters(urlFilters);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const updateFilters = (newFilters: Partial<Filters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  const clearFilters = () => {
    setFilters({
      searchQuery: '',
      consultationType: null,
      specialties: [],
      sort: null
    });
  };

  const setSearchQuery = (query: string) => {
    updateFilters({ searchQuery: query });
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-60">
        {/* Header Section with Title and Search */}
        <header className="bg-blue-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          
            <AutocompleteSearch
              doctors={doctors}
              searchQuery={filters.searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-1/4">
              <FilterPanel
                filters={filters}
                updateFilters={updateFilters}
                clearFilters={clearFilters}
                allSpecialties={allSpecialties}
              />
            </div>

            <div className="w-full lg:w-3/4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-gray-800">
                    {filteredDoctors.length} Doctors found
                  </h2>
                </div>

                <DoctorList
                  doctors={filteredDoctors}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
