import { MdLocationOn, MdPerson, MdPhone } from 'react-icons/md';
import { FaDog, FaCat } from 'react-icons/fa';
import './PetCard.css';

const PetCard = ({ pet, onClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'perdido':
        return '#ef4444';
      case 'encontrado':
        return '#22c55e';
      default:
        return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'perdido':
        return 'Perdido';
      case 'encontrado':
        return 'Encontrado';
      default:
        return status;
    }
  };

  return (
    <div className="pet-card" onClick={() => onClick(pet)}>
      <div className="pet-card-image">
        <img src={pet.photoUri} alt={pet.name} />
        <div 
          className="pet-card-status"
          style={{ backgroundColor: getStatusColor(pet.status) }}
        >
          {getStatusText(pet.status)}
        </div>
      </div>
      <div className="pet-card-content">
        <h3 className="pet-card-name">{pet.name}</h3>
        <p className="pet-card-type">
          {pet.type === 'cachorro' ? <><FaDog /> Cachorro</> : <><FaCat /> Gato</>}
        </p>
        <p className="pet-card-location">
          <MdLocationOn /> {pet.neighborhood}
        </p>
        <p className="pet-card-description">
          {pet.description.length > 80 
            ? `${pet.description.substring(0, 80)}...` 
            : pet.description
          }
        </p>
        <div className="pet-card-contact">
          <p><MdPerson /> {pet.contact.name}</p>
          <p><MdPhone /> {pet.contact.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
