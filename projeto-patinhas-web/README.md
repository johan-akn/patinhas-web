# 🐾 Projeto Patinhas Web

Uma aplicação web responsiva para ajudar a reunir pets perdidos com suas famílias, desenvolvida com React e Vite.

## 📱 Funcionalidades

- **📋 Lista de Pets**: Visualização de todos os pets perdidos e encontrados
- **🗺️ Mapa Interativo**: Localização dos pets em um mapa usando React Leaflet
- **📝 Relatar Pet**: Formulário para cadastrar pets perdidos ou encontrados
- **📱 Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile

## 🛠️ Tecnologias Utilizadas

- **React 19** - Biblioteca principal
- **React Router DOM** - Navegação entre páginas
- **React Leaflet** - Mapas interativos
- **Vite** - Bundler e servidor de desenvolvimento
- **CSS3** - Estilização com Flexbox e Grid
- **Context API** - Gerenciamento de estado

## 📂 Estrutura do Projeto

```
projeto-patinhas-web/
├── src/
│   ├── assets/           # Imagens e recursos estáticos
│   ├── components/       # Componentes reutilizáveis
│   │   ├── Navbar.jsx    # Barra de navegação
│   │   └── PetCard.jsx   # Card para exibir informações do pet
│   ├── context/          # Gerenciamento de estado
│   │   └── PetsContext.jsx
│   ├── pages/            # Componentes de página
│   │   ├── ListPage.jsx  # Página da lista de pets
│   │   ├── MapPage.jsx   # Página do mapa
│   │   └── ReportPage.jsx # Página de cadastro
│   ├── App.jsx           # Componente principal
│   ├── main.jsx          # Ponto de entrada
│   └── index.css         # Estilos globais
├── index.html
└── package.json
```

## 🚀 Como Executar

1. **Clone o repositório**
   ```bash
   git clone [url-do-repositorio]
   cd projeto-patinhas-web
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o projeto**
   ```bash
   npm run dev
   ```

4. **Acesse no navegador**
   ```
   http://localhost:5173
   ```

## 📱 Responsividade

O projeto foi desenvolvido com **design responsivo** usando:

- **Flexbox e CSS Grid** para layouts fluidos
- **Media Queries** para diferentes tamanhos de tela:
  - Desktop: `> 768px`
  - Tablet: `≤ 768px`
  - Mobile: `≤ 480px`
- **Tipografia responsiva** com `clamp()`
- **Componentes adaptativos** que se ajustam automaticamente

## 🎨 Recursos de Design

- **Interface moderna** com cores consistentes
- **Ícones emoji** para melhor usabilidade
- **Animações suaves** nos hover effects
- **Cards responsivos** para exibição dos pets
- **Mapa interativo** com marcadores personalizados

## 🗺️ Funcionalidades do Mapa

- Centralizado em **Florianópolis, SC**
- Marcadores coloridos por status:
  - 🔴 **Vermelho**: Pets perdidos
  - 🟢 **Verde**: Pets encontrados
- **Popups informativos** com foto e detalhes do pet
- **Navegação suave** e controles de zoom

## 📋 Cadastro de Pets

- Formulário completo com validação
- Upload de foto (com preview)
- Geolocalização automática
- Campos para nome, tipo, status e localização
- Feedback visual durante o envio

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção
- `npm run lint` - Executa o linter

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

**Desenvolvido com ❤️ para ajudar nossos amigos de quatro patas! 🐕🐱**
