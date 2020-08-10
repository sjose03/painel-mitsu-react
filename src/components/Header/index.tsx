import React from 'react';

// import { Container } from './styles';

const Header: React.FC = () => {
  return (
    <header className="header">
      <nav className="navbar ">
        <div className="search-box">
          <button type="button" className="dismiss">
            <i className="icon-close" />
          </button>
          <form id="searchForm" action="#" role="search">
            <input
              type="search"
              placeholder="Insira a Matricula a ser buscada..."
              className="form-control"
            />
          </form>
        </div>
        <div className="container-fluid">
          <div className="navbar-holder d-flex align-items-center justify-content-between">
            <div className="navbar-header">
              <a href="/" className="navbar-brand d-none d-sm-inline-block">
                <div className="brand-text d-none d-lg-inline-block">
                  <span>Painel </span>
                  <strong> Pássaros</strong>
                </div>
                <div className="brand-text d-none d-sm-inline-block d-lg-none">
                  <strong>PA</strong>
                </div>
              </a>
              <button
                id="toggle-btn"
                style={{ border: 0, background: '#2F333E' }}
                type="button"
                className="menu-btn active"
              >
                <span />
                <span />
                <span />
              </button>
            </div>
            <ul className="nav-menu list-unstyled d-flex flex-md-row align-items-md-center">
              <li className="nav-item ">
                <a href="/login" className="nav-link logout ">
                  <span className="d-none d-sm-inline ">Sair</span>
                  <i className="fa fa-sign-out" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
