import { Filters } from '../types';

export const setUrlParams = (filters: Filters): void => {
  const searchParams = new URLSearchParams(window.location.search);
  
  // Clear existing parameters
  Array.from(searchParams.keys()).forEach(key => {
    searchParams.delete(key);
  });
  
  // Add search query
  if (filters.searchQuery) {
    searchParams.set('search', filters.searchQuery);
  }
  
  // Add consultation type
  if (filters.consultationType) {
    searchParams.set('consultation', filters.consultationType);
  }
  
  // Add specialties (can have multiple)
  filters.specialties.forEach(specialty => {
    searchParams.append('specialty', specialty);
  });
  
  // Add sort
  if (filters.sort) {
    searchParams.set('sort', filters.sort);
  }
  
  // Update URL without reloading the page
  const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
  window.history.pushState({ path: newUrl }, '', newUrl);
};

export const getFiltersFromUrl = (): Filters => {
  const searchParams = new URLSearchParams(window.location.search);
  
  return {
    searchQuery: searchParams.get('search') || '',
    consultationType: (searchParams.get('consultation') as Filters['consultationType']) || null,
    specialties: searchParams.getAll('specialty'),
    sort: (searchParams.get('sort') as Filters['sort']) || null
  };
};