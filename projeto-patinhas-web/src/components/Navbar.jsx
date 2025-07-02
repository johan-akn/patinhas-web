import { Link, useLocation } from 'react-router-dom';
import { MdPets, MdList, MdMap, MdAdd } from 'react-icons/md';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    if (path !== '/' && location.pathname.startsWith(path)) {
      return true;
    }
    return false;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <MdPets /> Patinhas
        </Link>
        <div className="navbar-menu">
          <Link 
            to="/" 
            className={`navbar-link ${isActive('/') ? 'active' : ''}`}
          >
            <MdList /> Lista
          </Link>
          <Link 
            to="/mapa" 
            className={`navbar-link ${isActive('/mapa') ? 'active' : ''}`}
          >
            <MdMap /> Mapa
          </Link>
          <Link 
            to="/relatar" 
            className={`navbar-link ${isActive('/relatar') ? 'active' : ''}`}
          >
            <MdAdd /> Relatar
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
