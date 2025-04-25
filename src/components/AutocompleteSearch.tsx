import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { Doctor } from '../types';

interface AutocompleteSearchProps {
  doctors: Doctor[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AutocompleteSearch: React.FC<AutocompleteSearchProps> = ({
  doctors,
  searchQuery,
  setSearchQuery,
}) => {
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSuggestions([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const matchedDoctors = doctors
      .filter((doctor) => doctor.name.toLowerCase().includes(query))
      .slice(0, 3);

    setSuggestions(matchedDoctors);
  }, [searchQuery, doctors]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (doctorName: string) => {
    setSearchQuery(doctorName);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="py-2 px-0">
      <div className="relative w-full max-w-9xl mx-auto">
        <div className="relative flex items-center">
          <input
            data-testid="autocomplete-input"
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Search Symptoms, Doctors, Specialists, Clinics"
            className="w-full py-3 pl-12 pr-10 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 shadow-md"
          />
          <Search className="absolute left-4 text-blue-500" size={20} />
          <div className="absolute right-4 text-blue-500 cursor-pointer">
            <Search size={18} />
          </div>
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
            {suggestions.map((doctor) => (
              <li
                key={doctor.id}
                data-testid="suggestion-item"
                onClick={() => handleSuggestionClick(doctor.name)}
                className="px-4 py-3 hover:bg-sky-100 cursor-pointer transition-colors"
              >
                {doctor.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AutocompleteSearch;
