/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { Modal, Button, DatePicker } from 'antd';
import { toast } from 'react-toastify';
import { Moment } from 'moment';
import { api } from '../../services';
import 'moment/locale/pt-br';
import { tableIcons } from '../../utils/icons';
import { translate } from '../../utils/translate';
import 'react-toastify/dist/ReactToastify.css';

const moment = require('moment');

toast.configure();

type Passaro = {
  CodPassaro: number;
  Nome: string;
  DataNascimento: string;
  Sexo: string;
  Tipo: string;
  Pai: string;
  CodPai: number;
  Mae: string;
  CodMae: number;
  Criatorio: string;
  CodCriatorio: number;
  Anilha: string;
  CodAnilha: number;
  Voz: number;
  Repeticao: number;
  Aprendizado: number;
  Melodia: number;
  Comportamento: number;
  Comentarios: string;
  Status: string;
  DataObito: null | string;
  MotivoObito: null | string;
  NotaFiscal: number;
};

const CadPassaro: React.FC = () => {
  const dateFormat = 'DD/MM/YYYY';
  const [visiblePassaros, setVisiblePassaros] = useState(false);
  const [visiblePai, setVisiblePai] = useState(false);
  const [visibleMae, setVisibleMae] = useState(false);
  const [visibleAnilhas, setVisibleAnilhas] = useState(false);
  const [visibleCriatorio, setVisibleCriatorio] = useState(false);
  const [passaros, setPassaros] = useState<Array<Passaro>>([]);
  const [pais, setPais] = useState([]);
  const [maes, setMaes] = useState([]);
  const [anilhas, setAnilhas] = useState([]);
  const [criatorios, setCriatorios] = useState([]);
  const [codPassaroValor, setCodPassaroValor] = useState<number | undefined>(
    undefined,
  );
  const [nomeValor, setNomeValor] = useState('');
  const [dtNascValor, setDtNascValor] = useState<Moment | null>(null);
  console.log(dtNascValor);
  const [sexoValor, setSexoValor] = useState('');
  const [tipoPassValor, setTipoPassValor] = useState('');
  const [paiValor, setPaiValor] = useState('');
  const [codPaiValor, setCodPaiValor] = useState<number | undefined>(undefined);
  const [maeValor, setMaeValor] = useState('');
  const [codMaeValor, setCodMaeValor] = useState<number | undefined>(undefined);
  const [anilhaValor, setAnilhaValor] = useState('');
  const [codAnilhaValor, setCodAnilhaValor] = useState<number | undefined>(
    undefined,
  );
  const [criatorioValor, setCriatorioValor] = useState('');
  const [codCriatorioValor, setCodCriatorioValor] = useState<
    number | undefined
  >(undefined);
  const [repeticaoValor, setRepeticaoValor] = useState('');
  const [vozValor, setVozValor] = useState('');
  const [aprendizadoValor, setAprendizadoValor] = useState('');
  const [melodiaValor, setMelodiaValor] = useState('');
  const [comportamentoValor, setComportamentoValor] = useState('');
  const [comentariosValor, setComentariosValor] = useState('');
  const [statusValor, setStatusValor] = useState('');
  const [dataObitoValor, setDataObitoValor] = useState<Moment | null>(null);
  const [motivoObitoValor, setMotivoObitoValor] = useState('');
  const [notaFiscalValor, setNotaFiscalValor] = useState('');
  const [submit, setSubmit] = useState(false);

  async function HandleSubbmit(event) {
    event.preventDefault();
    if (!codPassaroValor) {
      const response = await api.post('/Insert_Criacao', {
        cod_criatorio: codCriatorioValor,
        cod_anilha: codAnilhaValor,
        cod_pai: codPaiValor,
        cod_mae: codMaeValor,
        nome: nomeValor,
        sexo: sexoValor,
        nascimento: dtNascValor,
        tipo: tipoPassValor,
        voz: vozValor,
        repeticao: repeticaoValor,
        aprendizado: aprendizadoValor,
        melodia: melodiaValor,
        comportamento: comportamentoValor,
        observacao: comentariosValor,
      });
      if (response.status === 200) {
        setSubmit(!submit);
        toast.success('Pássaro cadastrado !!', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error('Problema ao cadastrar o pássaro !!', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      const response = await api.post('/Update_Criacao', {
        cod_criatorio: codCriatorioValor,
        cod_anilha: codAnilhaValor,
        cod_pai: codPaiValor,
        cod_mae: codMaeValor,
        nota: notaFiscalValor,
        nome: nomeValor,
        sexo: sexoValor,
        nascimento: dtNascValor,
        tipo: tipoPassValor,
        voz: vozValor,
        repeticao: repeticaoValor,
        aprendizado: aprendizadoValor,
        melodia: melodiaValor,
        comportamento: comportamentoValor,
        observacao: comentariosValor,
        cod: codPassaroValor,
        data_obito: dataObitoValor,
        status_vida: statusValor,
        motivo_obito: motivoObitoValor,
      });
      if (response.status === 200) {
        setSubmit(!submit);
        toast.success('Informações do pássaro atualizadas !!', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error('Problema ao atualizar as informações do pássaro !!', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  }

  function ClearForm() {
    setCodPassaroValor(undefined);
    setNomeValor('');
    setDtNascValor(null);
    setSexoValor('');
    setTipoPassValor('');
    setPaiValor('');
    setCodPaiValor(undefined);
    setMaeValor('');
    setCodMaeValor(undefined);
    setCriatorioValor('');
    setCodCriatorioValor(undefined);
    setAnilhaValor('');
    setCodAnilhaValor(undefined);
    setVozValor('');
    setRepeticaoValor('');
    setAprendizadoValor('');
    setMelodiaValor('');
    setComportamentoValor('');
    setComentariosValor('');
    setDataObitoValor(null);
    setMotivoObitoValor('');
    setNotaFiscalValor('');
    setStatusValor('');
  }

  const showModalPassaros = () => {
    setVisiblePassaros(true);
  };

  const handleOkPassaros = (e) => {
    setVisiblePassaros(false);
  };

  const handleCancelPassaros = (e) => {
    setVisiblePassaros(false);
  };

  const showModalPai = () => {
    setVisiblePai(true);
  };

  const handleOkPai = (e) => {
    setVisiblePai(false);
  };

  const handleCancelPai = (e) => {
    setVisiblePai(false);
  };

  const showModalMae = () => {
    setVisibleMae(true);
  };

  const handleOkMae = (e) => {
    setVisibleMae(false);
  };

  const handleCancelMae = (e) => {
    setVisibleMae(false);
  };

  const showModalCriatorio = () => {
    setVisibleCriatorio(true);
  };

  const handleOkCriatorio = (e) => {
    setVisibleCriatorio(false);
  };

  const handleCancelCriatorio = (e) => {
    setVisibleCriatorio(false);
  };

  const showModalAnilhas = () => {
    setVisibleAnilhas(true);
  };

  const handleOkAnilhas = (e) => {
    setVisibleAnilhas(false);
  };

  const handleCancelAnilhas = (e) => {
    setVisibleAnilhas(false);
  };

  async function CallApiPaiUnico(cod) {
    const response = await api.post('/Select_Pai_ID', {
      cod,
    });
    response.data.map((ele) => {
      setCodPaiValor(ele.CodPassaro);
      setPaiValor(ele.Nome);
      return 1;
    });
  }

  async function CallApiMaeUnico(cod) {
    const response = await api.post('/Select_Mae_ID', {
      cod,
    });
    response.data.map((ele) => {
      setCodMaeValor(ele.CodPassaro);
      setMaeValor(ele.Nome);
      return 1;
    });
  }

  async function CallApiAnilhasUnico(cod) {
    const response = await api.post('/Select_Anilha_ID', {
      cod,
    });
    response.data.map((ele) => {
      setCodAnilhaValor(ele.CodAnilha);
      setAnilhaValor(ele.Anilha);
      return 1;
    });
  }
  async function CallApiCriatorioUnico(cod) {
    const response = await api.post('/Select_Criatorio_ID', {
      cod,
    });
    response.data.map((ele) => {
      setCriatorioValor(ele.Criatorio);
      setCodCriatorioValor(ele.CodCriatorio);
      return 1;
    });
  }

  async function CallApiPassaroUnico(cod) {
    const response = await api.post('/Select_Passaro_ID', {
      cod,
    });
    response.data.map((value) => {
      const nome = value.Nome;
      const codPassaro = value.CodPassaro;
      const dtNasc = moment(value.DataNascimento).utc();
      const sexo = value.Sexo;
      const tipo = value.Tipo;
      const pai = value.Pai;
      const codPai = value.CodPai;
      const mae = value.Mae;
      const codMae = value.CodMae;
      const criatorio = value.Criatorio;
      const codCriatorio = value.CodCriatorio;
      const anilha = value.Anilha;
      const codAnilha = value.CodAnilha;
      const voz = value.Voz;
      const repeticao = value.Repeticao;
      const aprendizado = value.Aprendizado;
      const melodia = value.Melodia;
      const comportamento = value.Comportamento;
      const comentarios = value.Comentarios;
      const status = value.Status;
      const dataObito = value.DataObito;
      const motivoObito = value.MotivoObito;
      const notaFiscal = value.NotaFiscal;
      setCodPassaroValor(codPassaro);
      setNomeValor(nome);
      setDtNascValor(dtNasc);
      setSexoValor(sexo);
      setTipoPassValor(tipo);
      setPaiValor(pai);
      setCodPaiValor(codPai);
      setMaeValor(mae);
      setCodMaeValor(codMae);
      setCriatorioValor(criatorio);
      setCodCriatorioValor(codCriatorio);
      setAnilhaValor(anilha);
      setCodAnilhaValor(codAnilha);
      setVozValor(voz);
      setRepeticaoValor(repeticao);
      setAprendizadoValor(aprendizado);
      setMelodiaValor(melodia);
      setComportamentoValor(comportamento);
      setComentariosValor(comentarios);
      setDataObitoValor(dataObito);
      setMotivoObitoValor(motivoObito);
      setNotaFiscalValor(notaFiscal);
      setStatusValor(status);

      return 1;
    });
  }

  useEffect(() => {
    async function callApiPassarosFull() {
      const response = await api.get('/Select_Passaro');
      setPassaros(response.data);
    }
    async function callApiPaisFull() {
      const response = await api.get('/Select_Pai');
      setPais(response.data);
    }
    async function callApiMaesFull() {
      const response = await api.get('/Select_Mae');
      setMaes(response.data);
    }
    async function callApiAnilhasFull() {
      const response = await api.get('/Select_Anilha');
      setAnilhas(response.data);
    }
    async function callApiCriatoriosFull() {
      const response = await api.get('/Select_Criatorio');
      setCriatorios(response.data);
    }
    callApiPassarosFull();
    callApiPaisFull();
    callApiMaesFull();
    callApiAnilhasFull();
    callApiCriatoriosFull();
  }, [submit]);

  return (
    <>
      <header className="page-header">
        <div className="container-fluid">
          <h2 className="no-margin-bottom">Cadastro de Pássaros</h2>
        </div>
      </header>
      <div className="breadcrumb-holder container-fluid">
        <ul className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Inicio</a>
          </li>

          <li className="breadcrumb-item active">Cadastro - Pássaros</li>
        </ul>
      </div>

      <section className="forms">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8">
              <div className="col-lg-3">
                <div className="card">
                  <div className="card-body text-center">
                    <Button
                      style={{
                        background: '#FF3F3F',
                        color: '#ffffff',
                        fontWeight: 600,
                        borderRadius: 8,
                      }}
                      className="btn btn-primary"
                      onClick={showModalPassaros}
                    >
                      Buscar Pássaros
                    </Button>
                    <Modal
                      title="Lista de Pássaros"
                      visible={visiblePassaros}
                      onOk={handleOkPassaros}
                      onCancel={handleCancelPassaros}
                      width="70vw"
                      style={{
                        height: '80vh',
                      }}
                      footer={null}
                    >
                      <MaterialTable
                        columns={[
                          {
                            title: 'CodPassaro',
                            field: 'CodPassaro',
                            hidden: true,
                          },
                          { title: 'Nome', field: 'Nome' },
                          { title: 'Sexo', field: 'Sexo' },
                          { title: 'Pai', field: 'Pai' },
                          { title: 'Mae', field: 'Mae' },
                          { title: 'Tipo', field: 'Tipo' },
                          { title: 'Criatorio', field: 'Criatorio' },
                          { title: 'Anilha', field: 'Anilha' },
                          { title: 'Status', field: 'Status' },
                        ]}
                        onRowClick={(event, rowData: any) => {
                          const cod = rowData.CodPassaro;
                          CallApiPassaroUnico(cod);
                          setVisiblePassaros(false);
                        }}
                        data={passaros}
                        icons={tableIcons}
                        localization={translate}
                        title="Lista de Criatorios"
                      />
                    </Modal>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-close" />
                <div className="card-header d-flex align-items-center">
                  <h3 className="h4">Cadastro de Pássaros</h3>
                </div>
                <div className="card-body">
                  <p>Insira as informações para o cadastro.</p>
                  <form
                    className="form-horizontal"
                    id="form_passaros"
                    method="POST"
                    onSubmit={HandleSubbmit}
                  >
                    <div className="form-group row">
                      <label className="col-sm-3 form-control-label">
                        Nome
                      </label>
                      <div className="col-sm-5">
                        <input
                          id="nome_passaro"
                          name="nome_passaro"
                          type="text"
                          value={nomeValor}
                          onChange={(e) => setNomeValor(e.target.value)}
                          className="form-control form-control-success"
                          required
                        />
                        <input
                          id="id_passaro"
                          value={codPassaroValor}
                          type="hidden"
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-3 form-control-label">
                        Dt Nascimento
                      </label>
                      <div className="col-sm-4">
                        <DatePicker
                          format={dateFormat}
                          onChange={(m) => setDtNascValor(m)}
                          allowClear
                          value={dtNascValor}
                          placeholder="Dt Nasc"
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-3 form-control-label">
                        Sexo
                      </label>
                      <div className="col-sm-4">
                        <select
                          value={sexoValor}
                          onChange={(e) => setSexoValor(e.target.value)}
                          className="form-control mb-3"
                        >
                          <option />
                          <option>Macho</option>
                          <option>Fêmea</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-3 form-control-label">
                        Tipo Passaro
                      </label>
                      <div className="col-sm-4">
                        <select
                          id="tipo_passaro"
                          value={tipoPassValor}
                          onChange={(e) => setTipoPassValor(e.target.value)}
                          className="form-control mb-3"
                        >
                          <option>Venda</option>
                          <option>Matriz</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-3 form-control-l abel">
                        Pai
                      </label>
                      <div className="col-sm-4">
                        <input
                          id="id_passaro_pai"
                          name="id_passaro"
                          value={codPaiValor}
                          type="hidden"
                          className="form-control"
                        />
                        <input
                          id="id_especie_pai"
                          name="id_especie"
                          type="hidden"
                          className="form-control"
                          value="1"
                        />
                        <input
                          id="nome_pai"
                          name="nome_pai"
                          value={paiValor}
                          type="text"
                          className="form-control form-control-warning"
                          disabled
                        />
                      </div>
                      <div className="input-group-append">
                        <Button
                          onClick={showModalPai}
                          className="btn btn-primary"
                          data-toggle="modal"
                          data-target="#modalPai"
                        >
                          <i className="fas fa-search" />
                        </Button>
                      </div>
                      <Modal
                        title="Lista de Pais"
                        visible={visiblePai}
                        onOk={handleOkPai}
                        onCancel={handleCancelPai}
                        width="70vw"
                        style={{
                          height: '80vh',
                        }}
                        footer={null}
                      >
                        <MaterialTable
                          columns={[
                            {
                              title: 'CodPassaro',
                              field: 'CodPassaro',
                              hidden: true,
                            },
                            { title: 'Nome', field: 'Nome' },

                            { title: 'Pai', field: 'Pai' },
                            { title: 'Mae', field: 'Mae' },

                            { title: 'Criatorio', field: 'Criatorio' },
                            { title: 'Anilha', field: 'Anilha' },
                            { title: 'Tipo', field: 'Tipo' },
                          ]}
                          onRowClick={(event, rowData: any) => {
                            const cod = rowData.CodPassaro;
                            CallApiPaiUnico(cod);
                            setVisiblePai(false);
                          }}
                          data={pais}
                          icons={tableIcons}
                          localization={translate}
                          title="Lista de Pais"
                        />
                      </Modal>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-3 form-control-l abel">
                        Mãe
                      </label>
                      <div className="col-sm-4">
                        <input
                          id="id_passaro_mae"
                          name="id_passaro_mae"
                          value={codMaeValor}
                          type="hidden"
                          className="form-control"
                        />

                        <input
                          id="id_especie_mae"
                          name="id_especie"
                          type="hidden"
                          className="form-control"
                          value="1"
                        />
                        <input
                          id="nome_mae"
                          name="nome_mae"
                          value={maeValor}
                          type="text"
                          className="form-control form-control-warning"
                          disabled
                        />
                      </div>
                      <div className="input-group-append">
                        <Button
                          onClick={showModalMae}
                          className="btn btn-primary"
                        >
                          <i className="fas fa-search" />
                        </Button>
                      </div>
                      <Modal
                        title="Lista de Mães"
                        visible={visibleMae}
                        onOk={handleOkMae}
                        onCancel={handleCancelMae}
                        width="70vw"
                        style={{
                          height: '80vh',
                        }}
                        footer={null}
                      >
                        <MaterialTable
                          columns={[
                            {
                              title: 'CodPassaro',
                              field: 'CodPassaro',
                              hidden: true,
                            },
                            { title: 'Nome', field: 'Nome' },

                            { title: 'Pai', field: 'Pai' },
                            { title: 'Mae', field: 'Mae' },

                            { title: 'Criatorio', field: 'Criatorio' },
                            { title: 'Anilha', field: 'Anilha' },
                            { title: 'Tipo', field: 'Tipo' },
                          ]}
                          onRowClick={(event, rowData: any) => {
                            const cod = rowData.CodPassaro;
                            CallApiMaeUnico(cod);
                            setVisibleMae(false);
                          }}
                          data={maes}
                          icons={tableIcons}
                          localization={translate}
                          title="Lista de Mães"
                        />
                      </Modal>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-3 form-control-l abel">
                        Criatorios
                      </label>
                      <div className="col-sm-4">
                        <input
                          id="nome_criatorio"
                          name="nome_criatorio"
                          value={criatorioValor}
                          type="text"
                          className="form-control form-control-warning"
                          disabled
                        />
                        <input
                          id="id_criatorio"
                          name="nome_criatorio"
                          value={codCriatorioValor}
                          type="hidden"
                        />
                      </div>
                      <div className="input-group-append">
                        <Button
                          onClick={showModalCriatorio}
                          className="btn btn-primary"
                        >
                          <i className="fas fa-search" />
                        </Button>
                      </div>
                      <Modal
                        title="Lista de Criatorios"
                        visible={visibleCriatorio}
                        onOk={handleOkCriatorio}
                        onCancel={handleCancelCriatorio}
                        width="70vw"
                        style={{
                          height: '80vh',
                        }}
                        footer={null}
                      >
                        <MaterialTable
                          columns={[
                            {
                              title: 'CodCriatorio',
                              field: 'CodCriatorio',
                              hidden: true,
                            },
                            { title: 'Criatorio', field: 'Criatorio' },

                            { title: 'Cidade', field: 'Cidade' },
                            { title: 'Responsavel', field: 'Responsavel' },
                          ]}
                          onRowClick={(event, rowData: any) => {
                            const cod = rowData.CodCriatorio;
                            CallApiCriatorioUnico(cod);
                            setVisibleCriatorio(false);
                          }}
                          data={criatorios}
                          icons={tableIcons}
                          localization={translate}
                          title="Lista de Criatorios"
                        />
                      </Modal>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-3 form-control-l abel">
                        Anilha
                      </label>
                      <div className="col-sm-4">
                        <input
                          id="nome_anilha"
                          name="nome_anilha"
                          value={anilhaValor}
                          type="text"
                          className="form-control form-control-warning"
                          disabled
                        />
                      </div>
                      <input
                        id="id_anilha"
                        value={codAnilhaValor}
                        type="hidden"
                      />
                      <div className="input-group-append">
                        <Button
                          onClick={showModalAnilhas}
                          className="btn btn-primary"
                        >
                          <i className="fas fa-search" />
                        </Button>
                      </div>
                      <Modal
                        title="Lista de Anilhas"
                        visible={visibleAnilhas}
                        onOk={handleOkAnilhas}
                        onCancel={handleCancelAnilhas}
                        width="70vw"
                        style={{
                          height: '80vh',
                        }}
                        footer={null}
                      >
                        <MaterialTable
                          columns={[
                            {
                              title: 'CodAnilha',
                              field: 'CodAnilha',
                              hidden: true,
                            },
                            { title: 'Anilha', field: 'Anilha' },

                            { title: 'Criatorio', field: 'Criatorio' },
                            { title: 'Em Uso', field: 'EmUso' },
                          ]}
                          onRowClick={(event, rowData: any) => {
                            const cod = rowData.CodAnilha;
                            CallApiAnilhasUnico(cod);
                            setVisibleAnilhas(false);
                          }}
                          data={anilhas}
                          icons={tableIcons}
                          localization={translate}
                          title="Lista de Anilhas"
                        />
                      </Modal>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-3 form-control-label">
                        Repetição
                      </label>
                      <div className="col-sm-2">
                        <input
                          value={repeticaoValor}
                          onChange={(e) => setRepeticaoValor(e.target.value)}
                          id="repeticao_passaro"
                          name="repeticao_passaro"
                          type="text"
                          className="form-control form-control-success"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 form-control-label">Voz</label>
                      <div className="col-sm-2">
                        <input
                          value={vozValor}
                          onChange={(e) => setVozValor(e.target.value)}
                          id="voz_passaro"
                          name="voz_passaro"
                          type="text"
                          className="form-control form-control-success"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 form-control-label">
                        Aprendizado
                      </label>
                      <div className="col-sm-2">
                        <input
                          value={aprendizadoValor}
                          onChange={(e) => setAprendizadoValor(e.target.value)}
                          id="aprendizado_passaro"
                          name="aprendizado_passaro"
                          type="text"
                          className="form-control form-control-success"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 form-control-label">
                        Melodia
                      </label>
                      <div className="col-sm-2">
                        <input
                          value={melodiaValor}
                          onChange={(e) => setMelodiaValor(e.target.value)}
                          id="melodia_passaro"
                          name="melodia_passaro"
                          type="text"
                          className="form-control form-control-success"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 form-control-label">
                        Comportamento
                      </label>
                      <div className="col-sm-2">
                        <input
                          value={comportamentoValor}
                          onChange={(e) =>
                            setComportamentoValor(e.target.value)
                          }
                          id="comportamento_passaro"
                          name="comportamento_passaro"
                          type="text"
                          className="form-control form-control-success"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 form-control-label">
                        Comentarios
                      </label>
                      <div className="col-sm-2">
                        <textarea
                          value={comentariosValor}
                          onChange={(e) => setComentariosValor(e.target.value)}
                          name="comentario"
                          id="comentario_passaro"
                          cols={50}
                          rows={5}
                          style={{
                            resize: 'none',
                            border: 'solid 1px #DEE1E6',
                          }}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-3 form-control-label">
                        Status
                      </label>
                      <div className="col-sm-2">
                        <select
                          value={statusValor}
                          onChange={(e) => setStatusValor(e.target.value)}
                          id="status_passaro"
                          className="form-control mb-3"
                        >
                          <option>Vivo</option>
                          <option>Morto</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-3 form-control-label">
                        Dt Obito
                      </label>
                      <div className="col-sm-4">
                        <DatePicker
                          format={dateFormat}
                          onChange={(m) => setDataObitoValor(m)}
                          allowClear
                          placeholder="Dt Obito"
                          value={dataObitoValor}
                        />
                        {/* <input
                          value={dataObitoValor !== null ? formatDate(dataObitoValor) : undefined }
                          onChange={(e) => setDataObitoValor(e.target.value)}
                          id="data_obito_passaro"
                          name="data_obito_passaro"
                          type="date"
                          className="form-control form-control-success"
                        /> */}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-3 form-control-label">
                        Motivo Obito
                      </label>
                      <div className="col-sm-2">
                        <textarea
                          value={motivoObitoValor}
                          onChange={(e) => setMotivoObitoValor(e.target.value)}
                          name="comentario"
                          id="obito_passaro"
                          cols={50}
                          rows={2}
                          style={{
                            resize: 'none',
                            border: 'solid 1px #DEE1E6',
                          }}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-3 form-control-label">
                        Nota Fiscal
                      </label>
                      <div className="col-sm-6">
                        <input
                          value={notaFiscalValor}
                          onChange={(e) => setNotaFiscalValor(e.target.value)}
                          id="nota_fiscal_passaro"
                          name="nota_fiscal_passaro"
                          type="text"
                          className="form-control form-control-warning"
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-sm-9 offset-sm-3">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          id="btn-cad"
                        >
                          {codPassaroValor ? 'Atualizar' : 'Cadastrar'}
                        </button>
                        <button
                          type="button"
                          onClick={ClearForm}
                          className="btn btn-primary"
                          style={{ marginLeft: 12 }}
                        >
                          Novo
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CadPassaro;
