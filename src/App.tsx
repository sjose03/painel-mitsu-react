import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import SideBar from './components/SideBar';
import Home from './pages/Home';
import CadAnilhas from './pages/CadAnilhas';
import CadCriatorio from './pages/CadCriatorio';
import CadPassaro from './pages/CadPassaro';
import Familia from './pages/Familia';
import { GlobalStyle } from './styles/globalStyle'

const App: React.FC = () => {
  return (
    <>
    <div className="page">
    
      <Header />

      <div className="page-content d-flex align-items-stretch">
        <SideBar />
        <div className="content-inner">
          <BrowserRouter>
            <Switch>
        
              <Route path="/" exact component={Home} />
              <Route path="/cadastro-anilhas" exact component={CadAnilhas} />
              <Route path="/cadastro-passaros" exact component={CadPassaro} />
              <Route path="/familia" exact component={Familia} />
              <Route
                path="/cadastro-criatorios"
                exact
                component={CadCriatorio}
              />
            </Switch>
          </BrowserRouter>
        </div>
          <GlobalStyle></GlobalStyle>
      </div>
    </div>
    </>
  );
};

export default App;
