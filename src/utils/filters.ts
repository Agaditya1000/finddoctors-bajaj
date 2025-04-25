import { Doctor, Filters } from '../types';

export const filterDoctors = (doctors: Doctor[], filters: Filters): Doctor[] => {
  let filteredDoctors = [...doctors];
  
  // Filter by search query
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filteredDoctors = filteredDoctors.filter(doctor => 
      doctor.name.toLowerCase().includes(query)
    );
  }
  
  // Filter by consultation type
  if (filters.consultationType) {
    filteredDoctors = filteredDoctors.filter(doctor => {
      if (filters.consultationType === 'Video Consult') {
        return doctor.video_consult;
      } else if (filters.consultationType === 'In Clinic') {
        return doctor.in_clinic;
      }
      return true;
    });
  }
  
  // Filter by specialties
  if (filters.specialties.length > 0) {
    filteredDoctors = filteredDoctors.filter(doctor => 
      filters.specialties.some(specialty => 
        doctor.specialities.some(s => s.name === specialty)
      )
    );
  }
  
  // Sort doctors
  if (filters.sort) {
    filteredDoctors.sort((a, b) => {
      if (filters.sort === 'fees') {
        const feeA = parseInt(a.fees.replace(/[^\d]/g, ''));
        const feeB = parseInt(b.fees.replace(/[^\d]/g, ''));
        return feeA - feeB;
      } else if (filters.sort === 'experience') {
        const expA = parseInt(a.experience.split(' ')[0]);
        const expB = parseInt(b.experience.split(' ')[0]);
        return expB - expA;
      }
      return 0;
    });
  }
  
  return filteredDoctors;
};

export const getAllSpecialties = (doctors: Doctor[]): string[] => {
  const specialtySet = new Set<string>();
  
  doctors.forEach(doctor => {
    doctor.specialities.forEach(specialty => {
      specialtySet.add(specialty.name);
    });
  });
  
  return Array.from(specialtySet).sort();
};