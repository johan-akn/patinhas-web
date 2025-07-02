import React, { createContext, useContext, useState } from 'react';

const PetsContext = createContext();

export const usePets = () => {
  const context = useContext(PetsContext);
  if (!context) {
    throw new Error('usePets deve ser usado dentro de um PetsProvider');
  }
  return context;
};

export const PetsProvider = ({ children }) => {
  const [pets, setPets] = useState([
    {
      id: '1',
      name: 'Max',
      status: 'perdido',
      type: 'cachorro',
      photoUri: 'https://p2.trrsf.com/image/fget/cf/940/0/images.terra.com/2023/03/15/2063712264-shutterstock1738196390.jpg',
      description: 'Cachorro de porte médio, muito carinhoso e brincalhão. Desapareceu durante caminhada.',
      neighborhood: 'Centro',
      contact: {
        name: 'Maria Silva',
        phone: '(48) 99999-1234'
      },
      location: {
        latitude: -27.5954,
        longitude: -48.5480
      },
      address: {
        street: 'Rua Felipe Schmidt, 390',
        neighborhood: 'Centro'
      }
    },
    {
      id: '2', 
      name: 'Luna',
      status: 'encontrado',
      type: 'gato',
      photoUri: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=300&fit=crop',
      description: 'Gata persa, pelagem longa e clara. Muito dócil e carinhosa.',
      neighborhood: 'Trindade',
      contact: {
        name: 'João Santos',
        phone: '(48) 99999-5678'
      },
      location: {
        latitude: -27.5977,
        longitude: -48.5183
      },
      address: {
        street: 'Rua Lauro Linhares, 2123',
        neighborhood: 'Trindade'
      }
    },
    {
      id: '3',
      name: 'Buddy',
      status: 'perdido',
      type: 'cachorro',
      photoUri: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=300&fit=crop',
      description: 'Bulldog de 3 anos, muito amigável com crianças.',
      neighborhood: 'Lagoa da Conceição',
      contact: {
        name: 'Ana Costa',
        phone: '(48) 99999-9012'
      },
      location: {
        latitude: -27.6088,
        longitude: -48.4577
      },
      address: {
        street: 'Avenida das Rendeiras, 1031',
        neighborhood: 'Lagoa da Conceição'
      }
    },
    {
      id: '4',
      name: 'Mel',
      status: 'encontrado',
      type: 'gato',
      photoUri: 'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=300&h=300&fit=crop',
      description: 'Gatinha laranja muito meiga, estava perdida há 3 dias. Muito carinhosa com crianças.',
      neighborhood: 'Canasvieiras',
      contact: {
        name: 'Carlos Pereira',
        phone: '(48) 99888-7654'
      },
      location: {
        latitude: -27.430609,
        longitude: -48.4633
      },
      address: {
        street: 'Rua das Acácias, 258',
        neighborhood: 'Canasvieiras'
      }
    },
    {
      id: '5',
      name: 'Thor',
      status: 'perdido',
      type: 'cachorro',
      photoUri: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=300&h=300&fit=crop',
      description: 'Pastor Alemão, porte grande, muito dócil. Fugiu durante os fogos de artifício.',
      neighborhood: 'Ingleses',
      contact: {
        name: 'Fernanda Lima',
        phone: '(48) 99777-3210'
      },
      location: {
        latitude: -27.4377,
        longitude: -48.3988
      },
      address: {
        street: 'Rua Dom João Becker, 89',
        neighborhood: 'Ingleses'
      }
    },
    {
      id: '6',
      name: 'Mimi',
      status: 'encontrado',
      type: 'gato',
      photoUri: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=300&h=300&fit=crop',
      description: 'Gata siamês, muito elegante e independente. Encontrada na praia.',
      neighborhood: 'Jurerê',
      contact: {
        name: 'Roberto Machado',
        phone: '(48) 99666-5432'
      },
      location: {
        latitude: -27.439930,
        longitude: -48.4944
      },
      address: {
        street: 'Avenida dos Búzios, 1447',
        neighborhood: 'Jurerê'
      }
    },
    {
      id: '7',
      name: 'Bolt',
      status: 'perdido',
      type: 'cachorro',
      photoUri: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=300&fit=crop',
      description: 'Beagle muito energético, adora correr. Saiu para passear e não voltou.',
      neighborhood: 'Daniela',
      contact: {
        name: 'Patricia Souza',
        phone: '(48) 99555-8765'
      },
      location: {
        latitude: -27.448926,
        longitude: -48.527019
      },
      address: {
        street: 'Rua Aderbal Ramos da Silva, 156',
        neighborhood: 'Daniela'
      }
    },
    {
      id: '8',
      name: 'Princesa',
      status: 'encontrado',
      type: 'gato',
      photoUri: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=300&h=300&fit=crop',
      description: 'Gata preta de olhos verdes, muito carinhosa. Estava machucada quando encontrada.',
      neighborhood: 'Cachoeira do Bom Jesus',
      contact: {
        name: 'Miguel Santos',
        phone: '(48) 99444-1098'
      },
      location: {
        latitude: -27.4244,
        longitude: -48.4252
      },
      address: {
        street: 'Estrada Geral de Cachoeira do Bom Jesus, 783',
        neighborhood: 'Cachoeira do Bom Jesus'
      }
    },
    {
      id: '9',
      name: 'Rex',
      status: 'perdido',
      type: 'cachorro',
      photoUri: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=300&h=300&fit=crop',
      description: 'Labrador chocolate, muito obediente e calmo. Desapareceu do quintal.',
      neighborhood: 'Santo Antônio de Lisboa',
      contact: {
        name: 'Isabella Rocha',
        phone: '(48) 99333-7890'
      },
      location: {
        latitude: -27.506389,
        longitude: -48.519713
      },
      address: {
        street: 'Rua Coronel Lopes Trovão, 234',
        neighborhood: 'Santo Antônio de Lisboa'
      }
    },
    {
      id: '10',
      name: 'Fifi',
      status: 'encontrado',
      type: 'gato',
      photoUri: 'https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=300&h=300&fit=crop',
      description: 'Gata branca pequena, muito tímida. Estava escondida embaixo de um carro.',
      neighborhood: 'Sambaqui',
      contact: {
        name: 'Eduardo Silva',
        phone: '(48) 99222-4567'
      },
      location: {
        latitude: -27.490927,
        longitude: -48.519831
      },
      address: {
        street: 'Rua Lúcio Costa, 512',
        neighborhood: 'Sambaqui'
      }
    },
    {
      id: '11',
      name: 'Toby',
      status: 'perdido',
      type: 'cachorro',
      photoUri: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=300&h=300&fit=crop',
      description: 'Bulldog francês, respiração ofegante característico da raça. Muito dócil.',
      neighborhood: 'Barra da Lagoa',
      contact: {
        name: 'Larissa Costa',
        phone: '(48) 99111-2345'
      },
      location: {
        latitude: -27.5750,
        longitude: -48.4150
      },
      address: {
        street: 'Rua Afonso Delambert Neto, 678',
        neighborhood: 'Barra da Lagoa'
      }
    },
    {
      id: '12',
      name: 'Nala',
      status: 'encontrado',
      type: 'gato',
      photoUri: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=300&h=300&fit=crop',
      description: 'Gata rajada, muito esperta e brincalhona. Estava faminta quando encontrada.',
      neighborhood: 'Joaquina',
      contact: {
        name: 'Rafael Oliveira',
        phone: '(48) 99000-6789'
      },
      location: {
        latitude: -27.627284,
        longitude: -48.445845
      },
      address: {
        street: 'Rua Tertuliano Brito Xavier, 321',
        neighborhood: 'Joaquina'
      }
    },
    {
      id: '13',
      name: 'Zeus',
      status: 'perdido',
      type: 'cachorro',
      photoUri: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=300&h=300&fit=crop',
      description: 'Cachorro de pequeno porte, muito protetor mas gentil. Collar azul.',
      neighborhood: 'Campeche',
      contact: {
        name: 'Juliana Mendes',
        phone: '(48) 98888-5432'
      },
      location: {
        latitude: -27.6733,
        longitude: -48.4888
      }
    },
    {
      id: '14',
      name: 'Bella',
      status: 'encontrado',
      type: 'gato',
      photoUri: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=300&h=300&fit=crop',
      description: 'Gata maine coon, pelagem longa e fofinha. Muito calma e carinhosa.',
      neighborhood: 'Armação',
      contact: {
        name: 'Gustavo Ferreira',
        phone: '(48) 98777-1234'
      },
      location: {
        latitude: -27.7433,
        longitude: -48.5077
      }
    },
    {
      id: '15',
      name: 'Simba',
      status: 'perdido',
      type: 'gato',
      photoUri: 'https://images.unsplash.com/photo-1511044568932-338cba0ad803?w=300&h=300&fit=crop',
      description: 'Gato persa laranja, pelo longo e olhos azuis. Muito manso e caseiro.',
      neighborhood: 'Pântano do Sul',
      contact: {
        name: 'Camila Barbosa',
        phone: '(48) 98666-9876'
      },
      location: {
        latitude: -27.7777,
        longitude: -48.5122
      }
    }
  ]);

  const addPet = (newPet) => {
    const pet = {
      ...newPet,
      id: Date.now().toString()
    };
    setPets(prevPets => [...prevPets, pet]);
  };

  const value = {
    pets,
    addPet
  };

  return (
    <PetsContext.Provider value={value}>
      {children}
    </PetsContext.Provider>
  );
};
