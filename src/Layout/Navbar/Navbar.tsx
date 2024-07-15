import React, { useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  useEffect(() => {
    const test = () => {
      const tabsNewAnim = document.getElementById('navbarSupportedContent');
      if (!tabsNewAnim) return;

      const activeItemNewAnim = tabsNewAnim.querySelector('.active');
      if (!activeItemNewAnim) return;

      const activeWidthNewAnimHeight = activeItemNewAnim.clientHeight;
      const activeWidthNewAnimWidth = activeItemNewAnim.clientWidth;
      const itemPosNewAnimTop = activeItemNewAnim.getBoundingClientRect().top - tabsNewAnim.getBoundingClientRect().top;
      const itemPosNewAnimLeft = activeItemNewAnim.getBoundingClientRect().left - tabsNewAnim.getBoundingClientRect().left;

      const horiSelector = document.querySelector('.hori-selector') as HTMLElement;
      if (!horiSelector) return;

      horiSelector.style.top = itemPosNewAnimTop + 'px';
      horiSelector.style.left = itemPosNewAnimLeft + 'px';
      horiSelector.style.height = activeWidthNewAnimHeight + 'px';
      horiSelector.style.width = activeWidthNewAnimWidth + 'px';

      tabsNewAnim.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'A') {
          const activeItems = tabsNewAnim.querySelectorAll('li');
          activeItems.forEach(item => item.classList.remove('active'));
          target.parentElement?.classList.add('active');

          const activeWidthNewAnimHeight = target.clientHeight;
          const activeWidthNewAnimWidth = target.clientWidth;
          const itemPosNewAnimTop = target.getBoundingClientRect().top - tabsNewAnim.getBoundingClientRect().top;
          const itemPosNewAnimLeft = target.getBoundingClientRect().left - tabsNewAnim.getBoundingClientRect().left;

          horiSelector.style.top = itemPosNewAnimTop + 'px';
          horiSelector.style.left = itemPosNewAnimLeft + 'px';
          horiSelector.style.height = activeWidthNewAnimHeight + 'px';
          horiSelector.style.width = activeWidthNewAnimWidth + 'px';
        }
      });
    };

    setTimeout(test, 0);
    window.addEventListener('resize', () => setTimeout(test, 500));
    const navbarToggler = document.querySelector('.navbar-toggler') as HTMLElement;
    if (navbarToggler) {
      navbarToggler.addEventListener('click', () => {
        const navbarCollapse = document.querySelector('.navbar-collapse') as HTMLElement;
        if (navbarCollapse) {
          navbarCollapse.classList.toggle('show');
          setTimeout(test, 300);
        }
      });
    }

    const setActiveClassOnLoad = () => {
      const path = window.location.pathname.split('/').pop() || 'PaginaPrincipal.tsx';
      const target = document.querySelector(`#navbarSupportedContent ul li a[href="${path}"]`);
      if (target) {
        target.parentElement?.classList.add('active');
      }
    };

    setActiveClassOnLoad();
  }, []);

  return (
    <nav className="navbar navbar-expand-custom navbar-mainbg">
      <a className="navbar-brand navbar-logo" href="#">Avalia Facil</a>
      <button className="navbar-toggler" type="button" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i className="fas fa-bars text-white"></i>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <div className="hori-selector"><div className="left"></div><div className="right"></div></div>
          <li className="nav-item active">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contacto">Contacto</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/sobre">Sobre</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
