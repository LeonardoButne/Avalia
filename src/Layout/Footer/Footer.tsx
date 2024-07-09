import React from 'react';
import './Footer.css'; // Arquivo CSS para estilos

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <h3>Feedback Aqui</h3>
                    <p>Seu feedback é muito importante para nós!</p>
                </div>
                <div className="footer-social-icons">
                    <a href="https://www.facebook.com" className="social-icon-link" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook"></i>
                    </a>
                    <a href="https://www.twitter.com" className="social-icon-link" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://www.instagram.com" className="social-icon-link" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://www.linkedin.com" className="social-icon-link" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin"></i>
                    </a>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Feedback Aqui. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
