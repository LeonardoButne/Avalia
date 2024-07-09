import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Arquivo CSS para estilos

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    Feedback Aqui
                </Link>
                <ul className="nav-menu">
                    <li className="nav-item">
                        <Link to="/" className="nav-links">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="nav-links">
                            Sobre
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/contact" className="nav-links">
                            Contacto
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="nav-links">
                            Login
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
