import { useState } from 'react';
import { MdDescription, MdPhone, MdPerson, MdPhoto, MdLocationOn } from 'react-icons/md';
import { usePets } from '../context/PetsContext.jsx';
import { useNavigate } from 'react-router-dom';
import LocationPicker from '../components/LocationPicker.jsx';
import Swal from 'sweetalert2';
import './ReportPage.css';

const ReportPage = () => {
  const { addPet } = usePets();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    status: 'perdido',
    type: 'cachorro',
    description: '',
    neighborhood: '',
    contactName: '',
    contactPhone: '',
    photoFile: null,
    photoUri: '',
    latitude: '',
    longitude: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addressInfo, setAddressInfo] = useState({
    street: '',
    neighborhood: '',
    isLoading: false,
    isManual: false
  });

  const neighborhoods = [
    'Centro', 'Trindade', 'Lagoa da Conceição', 'Canasvieiras', 'Ingleses',
    'Jurerê', 'Daniela', 'Cachoeira do Bom Jesus', 'Santo Antônio de Lisboa',
    'Sambaqui', 'Barra da Lagoa', 'Joaquina', 'Campeche', 'Armação',
    'Pântano do Sul', 'Ribeirão da Ilha', 'Coqueiros', 'Estreito',
    'Balneário', 'Capoeiras', 'Monte Verde', 'Agronômica', 'Córrego Grande',
    'Santa Mônica', 'Saco Grande', 'João Paulo'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          photoFile: file,
          photoUri: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Função para buscar endereço baseado nas coordenadas
  const getAddressFromCoordinates = async (lat, lng) => {
    setAddressInfo(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Usando Nominatim (OpenStreetMap) para reverse geocoding - gratuito
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      
      if (response.ok) {
        const data = await response.json();
        const address = data.address || {};
        
        // Extrair informações do endereço
        const street = address.road || address.pedestrian || address.path || '';
        const houseNumber = address.house_number || '';
        const fullStreet = houseNumber ? `${street}, ${houseNumber}` : street;
        
        const neighborhood = address.suburb || 
                           address.neighbourhood || 
                           address.city_district || 
                           address.quarter || 
                           address.residential || '';
        
        setAddressInfo({
          street: fullStreet || 'Endereço não encontrado',
          neighborhood: neighborhood || 'Bairro não identificado',
          isLoading: false
        });

        // Se o bairro foi identificado e está na lista, preencher automaticamente
        if (neighborhood && neighborhoods.includes(neighborhood)) {
          setFormData(prev => ({
            ...prev,
            neighborhood: neighborhood
          }));
        }
      } else {
        throw new Error('Erro na requisição');
      }
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
      setAddressInfo({
        street: 'Erro ao buscar endereço',
        neighborhood: 'Erro ao buscar bairro',
        isLoading: false
      });
    }
  };

  const handleLocationSelect = (position) => {
    setFormData(prev => ({
      ...prev,
      latitude: position[0].toString(),
      longitude: position[1].toString()
    }));
    
    // Buscar endereço baseado nas coordenadas
    getAddressFromCoordinates(position[0], position[1]);
  };

  const handleAddressSelect = (addressData) => {
    setAddressInfo({
      street: addressData.street,
      neighborhood: addressData.neighborhood,
      isLoading: false,
      isManual: addressData.isManual || false
    });

    // Se o bairro foi informado e está na lista, preencher automaticamente
    if (addressData.neighborhood && neighborhoods.includes(addressData.neighborhood)) {
      setFormData(prev => ({
        ...prev,
        neighborhood: addressData.neighborhood
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validações
      if (!formData.name.trim()) {
        Swal.fire({
          icon: 'warning',
          title: 'Nome necessário',
          text: 'Por favor, digite o nome do pet.',
          confirmButtonText: 'OK'
        });
        return;
      }

      if (!formData.description.trim()) {
        Swal.fire({
          icon: 'warning',
          title: 'Descrição necessária',
          text: 'Por favor, adicione uma descrição do pet.',
          confirmButtonText: 'OK'
        });
        return;
      }

      if (!formData.neighborhood) {
        Swal.fire({
          icon: 'warning',
          title: 'Bairro necessário',
          text: 'Por favor, selecione o bairro.',
          confirmButtonText: 'OK'
        });
        return;
      }

      if (!formData.contactName.trim()) {
        Swal.fire({
          icon: 'warning',
          title: 'Nome do contato necessário',
          text: 'Por favor, digite seu nome.',
          confirmButtonText: 'OK'
        });
        return;
      }

      if (!formData.contactPhone.trim()) {
        Swal.fire({
          icon: 'warning',
          title: 'Telefone necessário',
          text: 'Por favor, digite seu telefone.',
          confirmButtonText: 'OK'
        });
        return;
      }

      // Validar localização (coordenadas ou endereço manual)
      if (!formData.latitude && !formData.longitude && !addressInfo.isManual) {
        Swal.fire({
          icon: 'warning',
          title: 'Localização necessária',
          text: 'Por favor, selecione a localização ou digite o endereço manualmente.',
          confirmButtonText: 'OK'
        });
        return;
      }

      // Se é endereço manual, validar se tem as informações básicas
      if (addressInfo.isManual && (!addressInfo.street || !addressInfo.neighborhood)) {
        Swal.fire({
          icon: 'warning',
          title: 'Endereço incompleto',
          text: 'Por favor, preencha a rua e o bairro do endereço manual.',
          confirmButtonText: 'OK'
        });
        return;
      }

      // Se não há foto do arquivo, usa uma padrão
      let photoUri = formData.photoUri;
      if (!photoUri) {
        photoUri = formData.type === 'cachorro' 
          ? 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=300&fit=crop'
          : 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=300&fit=crop';
      }

      const newPet = {
        name: formData.name.trim(),
        status: formData.status,
        type: formData.type,
        description: formData.description.trim(),
        neighborhood: formData.neighborhood,
        contact: {
          name: formData.contactName.trim(),
          phone: formData.contactPhone.trim()
        },
        photoUri,
        ...(formData.latitude && formData.longitude && {
          location: {
            latitude: parseFloat(formData.latitude),
            longitude: parseFloat(formData.longitude)
          }
        }),
        address: {
          street: addressInfo.street || '',
          neighborhood: addressInfo.neighborhood || formData.neighborhood,
          isManual: addressInfo.isManual || false
        }
      };

      addPet(newPet);
      Swal.fire({
        icon: 'success',
        title: 'Pet registrado!',
        text: 'Pet registrado com sucesso!',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/');
      });
    } catch (error) {
      console.error('Erro ao registrar pet:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro ao registrar pet. Tente novamente.',
        confirmButtonText: 'OK'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="report-page">
      <div className="report-page-container">
        <div className="report-page-header">
          <h1>Relatar Pet</h1>
          <p>Cadastre um pet perdido ou encontrado</p>
        </div>

        <form onSubmit={handleSubmit} className="report-form">
          <div className="form-section">
            <h3><MdDescription /> Informações do Pet</h3>
            
            <div className="form-group">
              <label htmlFor="name">Nome do Pet *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Digite o nome do pet"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="status">Status *</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                >
                  <option value="perdido">Perdido</option>
                  <option value="encontrado">Encontrado</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="type">Tipo *</label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="cachorro">Cachorro</option>
                  <option value="gato">Gato</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Descrição *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Descreva o pet: raça, porte, cor, características..."
                rows="4"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="neighborhood">Bairro *</label>
              <select
                id="neighborhood"
                name="neighborhood"
                value={formData.neighborhood}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecione o bairro</option>
                {neighborhoods.map(neighborhood => (
                  <option key={neighborhood} value={neighborhood}>
                    {neighborhood}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-section">
            <h3><MdPhone /> Seus Dados para Contato</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contactName">Seu Nome *</label>
                <input
                  type="text"
                  id="contactName"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  placeholder="Digite seu nome"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contactPhone">Seu Telefone *</label>
                <input
                  type="tel"
                  id="contactPhone"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  placeholder="(48) 99999-9999"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3><MdPhoto /> Foto do Pet</h3>
            
            <div className="form-group">
              <label htmlFor="photo">Adicionar Foto</label>
              <input
                type="file"
                id="photo"
                accept="image/*"
                onChange={handleFileChange}
              />
              {formData.photoUri && (
                <div className="photo-preview">
                  <img src={formData.photoUri} alt="Preview" />
                </div>
              )}
            </div>
          </div>

          <div className="form-section">
            <h3><MdLocationOn /> Localização</h3>
            
            <div className="form-group">
              <label>Onde o pet foi {formData.status === 'perdido' ? 'perdido' : 'encontrado'}? *</label>
              <LocationPicker 
                onLocationSelect={handleLocationSelect}
                onAddressSelect={handleAddressSelect}
                initialPosition={
                  formData.latitude && formData.longitude 
                    ? [parseFloat(formData.latitude), parseFloat(formData.longitude)]
                    : null
                }
              />
              
              {/* Exibir endereço baseado nas coordenadas ou manual */}
              {((formData.latitude && formData.longitude) || addressInfo.isManual) && (
                <div className="address-info">
                  {addressInfo.isLoading ? (
                    <p className="address-loading">🔍 Buscando endereço...</p>
                  ) : (
                    <>
                      {addressInfo.street && (
                        <p className="address-street">
                          <MdLocationOn /> <strong>Endereço:</strong> {addressInfo.street}
                          {addressInfo.isManual && <span className="manual-badge"> (Manual)</span>}
                        </p>
                      )}
                      {addressInfo.neighborhood && (
                        <p className="address-neighborhood">
                          <strong>Bairro identificado:</strong> {addressInfo.neighborhood}
                        </p>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registrando...' : 'Registrar Pet'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportPage;
