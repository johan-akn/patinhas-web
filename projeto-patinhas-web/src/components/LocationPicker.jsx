import { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { MdLocationOn, MdMap, MdCheck } from 'react-icons/md';
import Swal from 'sweetalert2';
import 'leaflet/dist/leaflet.css';
import './LocationPicker.css';

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

const LocationMarker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
};

const LocationPicker = ({ onLocationSelect, initialPosition }) => {
  const [position, setPosition] = useState(initialPosition || null);
  const [isVisible, setIsVisible] = useState(false);
  const mapRef = useRef();

  // Centro padrão em Florianópolis
  const florianopolisCenter = [-27.5954, -48.5480];

  const handleLocationSelect = () => {
    if (position) {
      onLocationSelect(position);
      setIsVisible(false);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          const newPos = [location.coords.latitude, location.coords.longitude];
          setPosition(newPos);
          onLocationSelect(newPos);
        },
        (error) => {
          console.error('Erro ao obter localização:', error);
          alert('Não foi possível obter sua localização. Selecione no mapa.');
        }
      );
    } else {
      alert('Geolocalização não é suportada neste navegador.');
    }
  };

  return (
    <div className="location-picker">
      <div className="location-buttons">
        <button 
          type="button" 
          className="location-btn current"
          onClick={getCurrentLocation}
        >
          <MdLocationOn /> Localização Atual
        </button>
        <button 
          type="button" 
          className="location-btn map"
          onClick={() => setIsVisible(!isVisible)}
        >
          <MdMap /> Selecionar no Mapa
        </button>
      </div>

      {position && (
        <div className="selected-location">
          <p><MdLocationOn /> Localização selecionada:</p>
          <p>Lat: {position[0].toFixed(6)}, Lng: {position[1].toFixed(6)}</p>
        </div>
      )}

      {isVisible && (
        <div className="map-picker">
          <p className="map-instruction">Clique no mapa para selecionar a localização:</p>
          <div className="map-container-picker">
            <MapContainer
              center={position || florianopolisCenter}
              zoom={13}
              style={{ height: '300px', width: '100%' }}
              ref={mapRef}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <LocationMarker position={position} setPosition={setPosition} />
            </MapContainer>
          </div>
          
          {position && (
            <div className="map-actions">
              <button 
                type="button" 
                className="confirm-location-btn"
                onClick={handleLocationSelect}
              >
                <MdCheck /> Confirmar Localização
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
