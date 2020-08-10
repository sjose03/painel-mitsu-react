import React from 'react';

const SideBar: React.FC = () => {
  return (
    <nav className="side-navbar">
      <span className="heading">Menu</span>
      <ul className="list-unstyled">
        <li className="active">
          <a href="/">
            <i className="fas fa-home" />
            Inicio
          </a>
        </li>
        <li>
          <a href="/familia">
            <i className="fas fa-code-branch" />
            Familía
          </a>
        </li>

        <li>
          <a href="#lista" aria-expanded="false" data-toggle="collapse">
            <i className="far fa-edit" />
            Cadastros
            <i className="fas fa-angle-right" />
          </a>
          <ul id="lista" className="collapse list-unstyled ">
            <li>
              <a href="/cadastro-anilhas">
                <i className="fas fa-barcode" />
                Anilhas
              </a>
            </li>
            <li>
              <a href="/cadastro-criatorios">
                <i className="fas fa-warehouse" />
                Criatorios
              </a>
            </li>
            <li>
              <a href="/cadastro-passaros">
                <i className="fas fa-dove" />
                Pássaros
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
