import { useEffect } from 'react';
import { MdClose, MdPets, MdLocationOn, MdPhone, MdDescription } from 'react-icons/md';
import { FaDog, FaCat } from 'react-icons/fa';
import './PetModal.css';

const PetModal = ({ pet, isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen || !pet) return null;

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

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <MdClose className="modal-close" onClick={onClose}/>
                <div className="modal-header">
                    <div className="modal-image">
                        <img src={pet.photoUri} alt={pet.name} />
                        <div
                            className="modal-status"
                            style={{ backgroundColor: getStatusColor(pet.status) }}
                        >
                            {getStatusText(pet.status)}
                        </div>
                    </div>

                    <div className="modal-basic-info">
                        <h2>{pet.name}</h2>
                        <p className="pet-type">
                            {pet.type === 'cachorro' ? <><FaDog /> Cachorro</> : <><FaCat /> Gato</>}
                        </p>
                        <p className="pet-location">
                            <MdLocationOn /> {pet.neighborhood}, Florianópolis
                        </p>
                    </div>
                </div>

                <div className="modal-body">
                    <div className="info-section">
                        <h3><MdDescription /> Descrição</h3>
                        <p>{pet.description}</p>
                    </div>

                    <div className="info-section">
                        <h3><MdPhone /> Contato</h3>
                        <div className="contact-info">
                            <p><strong>Nome:</strong> {pet.contact.name}</p>
                            <p><strong>Telefone:</strong> {pet.contact.phone}</p>
                        </div>
                    </div>

                    <div className="info-section">
                        <h3><MdLocationOn /> Localização</h3>
                        {pet.address ? (
                            <div className="location-details">
                                {pet.address.street && (
                                    <p><strong>Endereço:</strong> {pet.address.street}
                                        {pet.address.isManual && <span className="manual-badge"> Manual</span>}
                                    </p>
                                )}
                                <p><strong>Bairro:</strong> {pet.address.neighborhood || pet.neighborhood}, Florianópolis</p>
                                {/* {pet.location && (
                                    <div className="coordinates">
                                        <p><strong>Coordenadas:</strong></p>
                                        <p>Latitude: {pet.location.latitude}</p>
                                        <p>Longitude: {pet.location.longitude}</p>
                                    </div>
                                )} */}
                            </div>
                        ) : (
                            <div className="location-details">
                                <p><strong>Bairro:</strong> {pet.neighborhood}, Florianópolis</p>
                                {pet.location && (
                                    <>
                                        <p>Latitude: {pet.location.latitude}</p>
                                        <p>Longitude: {pet.location.longitude}</p>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="modal-footer">
                    <a href={`tel:${pet.contact.phone}`} className="contact-link">
                        <button className="contact-btn">
                            <MdPhone /> Entrar em Contato
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PetModal;
