import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav id="navbar">
      <h2>Boxcar 🚘 </h2>
      <ul>
        <li className="active">
          <NavLink to="/">Meus serviços 🤩</NavLink>
        </li>
        <li>
          <NavLink to="/party/new" className="btn">
            Selecionar serviços 🛠️
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
