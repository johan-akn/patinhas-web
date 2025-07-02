import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MdLocationOn, MdVisibility } from 'react-icons/md';
import { FaDog, FaCat } from 'react-icons/fa';
import { usePets } from '../context/PetsContext.jsx';
import FilterBar from '../components/FilterBar.jsx';
import PetModal from '../components/PetModal.jsx';
import 'leaflet/dist/leaflet.css';
import './MapPage.css';

// Fix para os ícones do Leaflet
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const createCustomIcon = (color) => {
  return L.divIcon({
    html: `<div style="background-color: ${color}; width: 25px; height: 25px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    className: 'custom-marker',
    iconSize: [25, 25],
    iconAnchor: [12, 12]
  });
};

const lostIcon = createCustomIcon('#ef4444');
const foundIcon = createCustomIcon('#22c55e');

const MapPage = () => {
  const { pets } = usePets();
  const [filters, setFilters] = useState({
    status: 'todos',
    type: 'todos',
    neighborhood: 'todos'
  });
  const [selectedPet, setSelectedPet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Centro do mapa em Florianópolis
  const florianopolisCenter = [-27.5954, -48.5480];

  const filteredPets = pets.filter(pet => {
    const statusMatch = filters.status === 'todos' || pet.status === filters.status;
    const typeMatch = filters.type === 'todos' || pet.type === filters.type;
    const neighborhoodMatch = filters.neighborhood === 'todos' || pet.neighborhood === filters.neighborhood;
    
    return statusMatch && typeMatch && neighborhoodMatch;
  });

  const getMarkerIcon = (status) => {
    return status === 'perdido' ? lostIcon : foundIcon;
  };

  const getMarkerColor = (status) => {
    return status === 'perdido' ? '🔴' : '🟢';
  };

  const getStatusText = (status) => {
    return status === 'perdido' ? 'Perdido' : 'Encontrado';
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handlePetClick = (pet) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPet(null);
  };

  return (
    <div className="map-page">
      <div className="map-page-container">
        <div className="map-page-header">
          <h1>Mapa de Pets</h1>
          <p>Visualize a localização dos pets perdidos e encontrados</p>
          <div className="map-legend">
            <div className="legend-item">
              <span className="legend-icon lost">🔴</span>
              <span>Perdidos ({pets.filter(p => p.status === 'perdido').length})</span>
            </div>
            <div className="legend-item">
              <span className="legend-icon found">🟢</span>
              <span>Encontrados ({pets.filter(p => p.status === 'encontrado').length})</span>
            </div>
          </div>
        </div>

        <FilterBar onFiltersChange={handleFiltersChange} />

        <div className="results-summary">
          <p>
            {filteredPets.length === 0 
              ? 'Nenhum pet encontrado com os filtros selecionados.' 
              : `${filteredPets.length} ${filteredPets.length === 1 ? 'pet exibido' : 'pets exibidos'} no mapa`
            }
          </p>
        </div>

        <div className="map-container">
          <MapContainer
            center={florianopolisCenter}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {filteredPets.map(pet => (
              <Marker
                key={pet.id}
                position={[pet.location.latitude, pet.location.longitude]}
                icon={getMarkerIcon(pet.status)}
              >
                <Popup>
                  <div className="popup-content">
                    <div className="popup-main">
                      <div className="popup-image">
                        <img src={pet.photoUri} alt={pet.name} />
                      </div>
                      <div className="popup-info">
                        <h3>{pet.name}</h3>
                        <p>
                          <span className="popup-status" style={{
                            color: pet.status === 'perdido' ? '#ef4444' : '#22c55e'
                          }}>
                            {getMarkerColor(pet.status)} {getStatusText(pet.status)}
                          </span>
                        </p>
                        <p>{pet.type === 'cachorro' ? <><FaDog /> Cachorro</> : <><FaCat /> Gato</>}</p>
                        <p><MdLocationOn /> {pet.neighborhood}</p>
                      </div>
                    </div>
                    <button 
                      className="popup-btn"
                      onClick={() => handlePetClick(pet)}
                    >
                      <MdVisibility />
                      Ver Detalhes
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <PetModal 
          pet={selectedPet}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default MapPage;
