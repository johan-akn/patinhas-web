import { Link } from 'react-router-dom';
import { MdPets, MdList, MdMap, MdAdd } from 'react-icons/md';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <MdPets /> Patinhas
        </Link>
        <div className="navbar-menu">
          <Link to="/" className="navbar-link">
            <MdList /> Lista
          </Link>
          <Link to="/mapa" className="navbar-link">
            <MdMap /> Mapa
          </Link>
          <Link to="/relatar" className="navbar-link">
            <MdAdd /> Relatar
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
