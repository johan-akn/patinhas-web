import { useState } from 'react';
import { MdClear } from 'react-icons/md';
import './FilterBar.css';

const FilterBar = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({
    status: 'todos',
    type: 'todos',
    neighborhood: 'todos'
  });

  const neighborhoods = [
    'Centro', 'Trindade', 'Lagoa da Conceição', 'Canasvieiras', 'Ingleses',
    'Jurerê', 'Daniela', 'Cachoeira do Bom Jesus', 'Santo Antônio de Lisboa',
    'Sambaqui', 'Barra da Lagoa', 'Joaquina', 'Campeche', 'Armação',
    'Pântano do Sul', 'Ribeirão da Ilha', 'Coqueiros', 'Estreito',
    'Balneário', 'Capoeiras', 'Monte Verde', 'Agronômica', 'Córrego Grande',
    'Santa Mônica', 'Saco Grande', 'João Paulo'
  ];

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      status: 'todos',
      type: 'todos',
      neighborhood: 'todos'
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="status-filter">Status:</label>
        <select
          id="status-filter"
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
        >
          <option value="todos">Todos</option>
          <option value="perdido">Perdidos</option>
          <option value="encontrado">Encontrados</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="type-filter">Espécie:</label>
        <select
          id="type-filter"
          value={filters.type}
          onChange={(e) => handleFilterChange('type', e.target.value)}
        >
          <option value="todos">Todos</option>
          <option value="cachorro">Cachorros</option>
          <option value="gato">Gatos</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="neighborhood-filter">Bairro:</label>
        <select
          id="neighborhood-filter"
          value={filters.neighborhood}
          onChange={(e) => handleFilterChange('neighborhood', e.target.value)}
        >
          <option value="todos">Todos os bairros</option>
          {neighborhoods.map(neighborhood => (
            <option key={neighborhood} value={neighborhood}>
              {neighborhood}
            </option>
          ))}
        </select>
      </div>

      <button className="clear-filters-btn" onClick={clearFilters}>
         Limpar Filtros
      </button>
    </div>
  );
};

export default FilterBar;
