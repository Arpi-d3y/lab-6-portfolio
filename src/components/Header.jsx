import { NavLink } from 'react-router-dom';
import useTheme from '../hooks/useTheme';

function Header() {
  const { theme, toggleTheme } = useTheme();

  const navClass = ({ isActive }) =>
    `nav-link ${isActive ? 'active fw-bold text-decoration-underline' : ''}`;

  return (
    <header>
      <nav className="navbar navbar-expand-lg border-bottom">
        <div className="container">
          <NavLink className="navbar-brand fw-bold" to="/">
            Arpi Portfolio
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className={navClass}>Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className={navClass}>About</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/projects" className={navClass}>Projects</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact" className={navClass}>Contact</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/messages" className={navClass}>Messages</NavLink>
              </li>
            </ul>

            <button
              className="btn btn-outline-secondary ms-lg-3 mt-2 mt-lg-0"
              onClick={toggleTheme}
            >
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;