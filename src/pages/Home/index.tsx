/* eslint-disable no-new */
import React, { useEffect, useState, useRef } from 'react';

import Chart from 'chart.js';
import { api } from '../../services';

const Home: React.FC = () => {
  const chartRef = useRef(null);
  const [qtdPassaros, setQtdPassaros] = useState<null | number>(null);
  const [qtdCriatorios, setQtdCriatorios] = useState<null | number>(null);
  const [qtdAnilhasTotais, setQtdAnilhasTotais] = useState<null | number>(null);
  const [qtdAnilhasLivres, setQtdAnilhasLivres] = useState<null | number>(null);
  const [qtdAnilhasUsadas, setQtdAnilhasUsadas] = useState<null | number>(null);
  const [percentUsoAnilhas, setPercUsoAnilhas] = useState<null | string>(null);
  useEffect(() => {
    const uso = ['Sim', 'Não'];
    new Chart(chartRef.current, {
      type: 'pie',
      data: {
        labels: uso,
        datasets: [
          {
            label: 'Em Uso',
            fill: true,
            lineTension: 0,
            backgroundColor: ['#f15765'],
            // borderColor: '#f15765',
            pointBorderColor: '#da4c59',
            pointHoverBackgroundColor: '#da4c59',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            borderWidth: 1,
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBorderColor: '#fff',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 0,
            data: [qtdAnilhasLivres, qtdAnilhasUsadas],
            spanGaps: false,
          },
        ],
      },
    });
  }, [chartRef, qtdAnilhasLivres, qtdAnilhasUsadas]);

  async function callApi() {
    const qtdPassaro = await api.get('/Select_QTD_Vivo');
    qtdPassaro.data.map((data) => setQtdPassaros(data.qtd));
    const qtdCriatorio = await api.get('Select_QTD_Criatorio');
    qtdCriatorio.data.map((data) => setQtdCriatorios(data.count));
    const qtdAnilhas = await api.get('Select_QTD_Anilha');
    const qtdAnilhasLivre = qtdAnilhas.data
      .filter((data) => data['Em Uso?'] === 'Não')
      .map((data) => Number(data.Qtd))
      .reduce((total, num) => total + num);
    setQtdAnilhasLivres(qtdAnilhasLivre);
    const qtdAnilhasuUsada = qtdAnilhas.data
      .filter((data) => data['Em Uso?'] === 'Sim')
      .map((data) => Number(data.Qtd))
      .reduce((total, num) => total + num);
    setQtdAnilhasUsadas(qtdAnilhasuUsada);

    const qtdAnilhasTotal = qtdAnilhas.data
      .map((data) => Number(data.Qtd))
      .reduce((total, num) => total + num);
    setQtdAnilhasTotais(qtdAnilhasTotal);

    const percentUsoAnilha = (qtdAnilhasLivre / qtdAnilhasTotal).toLocaleString(
      undefined,
      {
        style: 'percent',
        minimumFractionDigits: 0,
      },
    );
    setPercUsoAnilhas(percentUsoAnilha);
  }
  useEffect(() => {
    callApi();
  }, []);
  return (
    <>
      <header className="page-header">
        <div className="container-fluid">
          <h2 className="no-margin-bottom">Visão Geral</h2>
        </div>
      </header>
      <section className="dashboard-counts no-padding-bottom">
        <div className="container-fluid">
          <div className="row bg-white has-shadow">
            <div className="col-xl-4 col-sm-6">
              <div className="item d-flex align-items-center">
                <div className="icon bg-red">
                  <i className="fas fa-dove " />
                </div>
                <div className="title">
                  <span>Pássaros</span>
                </div>
                <div className="number">
                  <strong id="qtd_passaros">{qtdPassaros || '...'}</strong>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6">
              <div className="item d-flex align-items-center">
                <div className="icon bg-red">
                  <i className="fas fa-warehouse" />
                </div>
                <div className="title">
                  <span>Criatorios</span>
                </div>
                <div className="number">
                  <strong id="qtd_criatorios">{qtdCriatorios || '...'}</strong>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6">
              <div className="item d-flex align-items-center">
                <div className="icon bg-red">
                  <i className="fas fa-barcode" />
                </div>
                <div className="title">
                  <span>Anilhas Livres</span>
                </div>
                <div className="number">
                  <strong id="qtd_anilhas">{qtdAnilhasLivres || '...'}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="dashboard-header">
        <div className="container-fluid">
          <div className="row">
            <div className="statistics col-lg-3 col-12">
              <div className="statistic d-flex align-items-center bg-white has-shadow">
                <div className="icon bg-red fas fa-barcode" />
                <div className="text">
                  <strong id="qtd_total_anilhas">
                    {qtdAnilhasTotais || '...'}
                  </strong>
                  <br />
                  <small>Total de Anilhas</small>
                </div>
              </div>
            </div>

            <div className="chart col-lg-4 col-12">
              <div className="bar-chart has-shadow bg-white">
                <div className="title">
                  <strong id="percentual_anilhas" className="text-red">
                    {percentUsoAnilhas || '...'}
                  </strong>
                  <br />

                  <small>Anilhas Usadas</small>
                </div>
                <canvas ref={chartRef} id="lineCahrt" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="main-footer ">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              <p>Painel Pássaros &copy; 2020</p>
            </div>
            <div className="col-sm-6 text-right" />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
