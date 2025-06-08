import { useState } from 'react';

function CityModal({ isOpen, onClose, onSelectCity }) {
  const [selectedCity, setSelectedCity] = useState('');
  
  const cities = [
    'Kathmandu', 'Biratnagar', 'Butwal',
    'Nepalgunj', 'Narayangarh', 'Birtamode',
    'Damauli', 'Itahari', 'Birgunj', 'Pokhara'
  ];

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    if (onSelectCity) onSelectCity(city);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-[90%] max-w-md rounded-lg bg-gray-800 p-6 text-white">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-medium">Cities</h2>
          <button 
            onClick={onClose}
            className="text-2xl focus:outline-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        
        {/* City Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => handleCitySelect(city)}
              className={`rounded-md px-4 py-3 transition duration-200 ${
                selectedCity === city 
                  ? 'bg-cyan-500 text-white' 
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Create the LocationComponent that will be used in Header.jsx
function LocationComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Kathmandu'); // Default city
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  const handleCitySelect = (city) => {
    setSelectedCity(city);
    closeModal();
  };
  
  return (
    <>
      <div onClick={openModal} className="flex items-center cursor-pointer">
        <span className="material-icons mr-1 text-sm">location_on</span>
        <span className="text-sm font-medium">{selectedCity}</span>
      </div>
      
      <CityModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        onSelectCity={handleCitySelect}
      />
    </>
  );
}

export default LocationComponent;