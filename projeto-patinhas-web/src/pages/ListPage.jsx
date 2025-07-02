import { useState, useMemo } from 'react';
import { usePets } from '../context/PetsContext.jsx';
import PetCard from '../components/PetCard.jsx';
import FilterBar from '../components/FilterBar.jsx';
import PetModal from '../components/PetModal.jsx';
import './ListPage.css';

const ListPage = () => {
  const { pets } = usePets();
  const [filters, setFilters] = useState({
    status: 'todos',
    type: 'todos',
    neighborhood: 'todos'
  });
  const [selectedPet, setSelectedPet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredPets = useMemo(() => {
    return pets.filter(pet => {
      const statusMatch = filters.status === 'todos' || pet.status === filters.status;
      const typeMatch = filters.type === 'todos' || pet.type === filters.type;
      const neighborhoodMatch = filters.neighborhood === 'todos' || pet.neighborhood === filters.neighborhood;
      
      return statusMatch && typeMatch && neighborhoodMatch;
    });
  }, [pets, filters]);

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
    <div className="list-page">
      <div className="list-page-container">
        <div className="list-page-header">
          <h1>Pets Perdidos e Encontrados</h1>
          <p>Ajude a reunir pets com suas famílias</p>
        </div>

        <FilterBar onFiltersChange={handleFiltersChange} />

        <div className="results-summary">
          <p>
            {filteredPets.length === 0 
              ? 'Nenhum pet encontrado com os filtros selecionados.' 
              : `${filteredPets.length} ${filteredPets.length === 1 ? 'pet exibido' : 'pets exibidos'}`
            }
          </p>
        </div>

        <div className="pets-grid">
          {filteredPets.map(pet => (
            <PetCard key={pet.id} pet={pet} onClick={handlePetClick} />
          ))}
        </div>

        {filteredPets.length === 0 && filters.status === 'todos' && filters.type === 'todos' && filters.neighborhood === 'todos' && (
          <div className="empty-state">
            <p>Nenhum pet cadastrado ainda.</p>
          </div>
        )}

        <PetModal 
          pet={selectedPet}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default ListPage;
