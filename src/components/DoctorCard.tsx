import React from 'react';
import { Doctor } from '../types';
import { MapPin, Building, Languages } from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div 
      data-testid="doctor-card"
      className="bg-white p-6 hover:bg-gray-50 transition-colors border-b border-gray-100"
    >
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <img
            src={doctor.photo}
            alt={doctor.name}
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-100"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h2 
                data-testid="doctor-name"
                className="text-lg font-medium text-gray-900"
              >
                {doctor.name}
              </h2>
              
              <div className="flex flex-wrap gap-2 mt-1">
                {doctor.specialities.map((specialty, index) => (
                  <span 
                    key={index}
                    className="text-sm bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full"
                  >
                    {specialty.name}
                  </span>
                ))}
              </div>
              
              <p className="text-sm text-gray-600 mt-2">
                {doctor.experience}
              </p>
              
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                <Languages size={16} />
                {doctor.languages.join(', ')}
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-lg font-semibold text-gray-900">
                {doctor.fees}
              </div>
              <p className="text-sm text-gray-500">Consultation</p>
            </div>
          </div>
          
          <div className="mt-3">
            <div className="flex items-center text-sm text-gray-600">
              <Building size={16} className="mr-1" />
              <span className="font-medium">{doctor.clinic.name}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <MapPin size={16} className="mr-1" />
              <span>{doctor.clinic.address.locality}, {doctor.clinic.address.city}</span>
            </div>
          </div>
          
          <div className="mt-4 flex gap-3">
            {doctor.video_consult && (
              <button className="flex-1 bg-blue-50 text-blue-700 py-2 px-4 rounded hover:bg-blue-100 transition-colors text-sm font-medium">
                Video Consult
              </button>
            )}
            {doctor.in_clinic && (
              <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors text-sm font-medium">
                Book Clinic Visit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;