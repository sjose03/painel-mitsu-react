import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import { Modal, Button } from 'antd';
import { api } from '../../services';
import { tableIcons } from '../../utils/icons';
import { translate } from '../../utils/translate';
import 'antd/dist/antd.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
type Endereco = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  unidade: string;
  ibge: string;
  gia: string;
};

type Criatorio = {
  CodCriatorio: number;
  CNPJ: string;
  Responsavel: string;
  NroIbama: number;
  CEP: string;
  UF: string;
  Cidade: string;
  Bairro: string;
  Logradouro: string;
  Numero: number;
  Criatorio: string;
};

type LinhaTabela = {
  CodCriatorio: number;
  Responsavel: string;
  Cidade: string;
};
const CadCriatorio: React.FC = () => {
  const [cepValor, setCep] = useState('');
  const [bairroValor, setBairro] = useState('');
  const [rua, setRua] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [ibgeValor, setIbge] = useState('');
  const [nomeValor, setNomeValor] = useState('');
  const [cnpjValor, setCnpjValor] = useState('');
  const [autIbamaValor, setAutIbamaValor] = useState('');
  const [responsavelValor, setResponsavelValor] = useState('');
  const [numeroValor, setNumeroValor] = useState('');
  const [codCriatorioValor, setCodCriatorioValor] = useState<
    number | undefined
  >(undefined);

  const [criatorios, setCriatorios] = useState([]);
  const [visible, setVisible] = useState(false);
  const [submit,setSubmit] = useState(false)

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (e) => {
    setVisible(false);
  };

  const handleCancel = (e) => {
    setVisible(false);
  };

  function ClearForm() {
    setAutIbamaValor('');
    setCep('');
    setBairro('');
    setRua('');
    setCidade('');
    setEstado('');
    setIbge('');
    setNomeValor('');
    setCnpjValor('');
    setResponsavelValor('');
    setNumeroValor('');
    setCodCriatorioValor(undefined);
  }
  useEffect(() => {
    async function callCep() {
      if (cepValor.length >= 8) {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cepValor}/json/`,
        );
        const responseValues: Endereco = response.data;
        const { bairro, logradouro, uf, localidade, ibge } = responseValues;
        setRua(logradouro);
        setBairro(bairro);
        setCidade(localidade);
        setEstado(uf);
        setIbge(ibge);
      }
    }
    callCep();
  }, [cepValor]);

  async function CallApiCriatorioUnico(cod) {
    const response = await api.post('/Select_Criatorio_ID', {
      cod,
    });
    response.data.map((value) => {
      const nome = value.Criatorio;
      const cnpj = value.CNPJ;
      const autIbama = value.NroIbama;
      const responsavel = value.Responsavel;
      const cep = value.CEP;
      const numero = value.Numero;
      const codCriatorio = value.CodCriatorio;
      setNomeValor(nome);
      setResponsavelValor(responsavel);
      setCnpjValor(cnpj);
      setAutIbamaValor(autIbama);
      setCep(cep);
      setNumeroValor(numero);
      setCodCriatorioValor(codCriatorio);
      return 1;
    });
  }

  async function HandleSubbmit(event) {
    event.preventDefault();
    if (!codCriatorioValor) {
      const response = await api.post('/Insert_criatorio', {
        cnpj: cnpjValor,
        responsavel: responsavelValor,
        nro_ibama: autIbamaValor,
        cep: cepValor,
        uf: estado,
        cidade,
        ibge_cidade: ibgeValor,
        bairro: bairroValor,
        rua,
        numero: numeroValor,
        nome: nomeValor,
      });
      if (response.status === 200) {
        setSubmit(!submit)
        toast.success('Criatorio cadastrado !!', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error('Problema ao cadastrar Criatorio !!', {
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
      const response = await api.post('/Update_criatorio', {
        cnpj: cnpjValor,
        responsavel: responsavelValor,
        nro_ibama: autIbamaValor,
        cep: cepValor,
        uf: estado,
        cidade,
        ibge_cidade: ibgeValor,
        bairro: bairroValor,
        rua,
        numero: numeroValor,
        nome: nomeValor,
        cod: codCriatorioValor,
      });
      if (response.status === 200) {
        setSubmit(!submit)
        toast.success('Criatorio atualizado !!', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error('Problema ao atualizar Criatorio !!', {
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

  useEffect(() => {
    async function callApiCriatoriosFull() {
      const response = await api.get('/Select_Criatorio');
      setCriatorios(response.data);
    }
    callApiCriatoriosFull();
  }, [submit]);

  return (
    <>
      <header className="page-header">
        <div className="container-fluid">
          <h2 className="no-margin-bottom">Cadastro Criatorios</h2>
        </div>
      </header>
      <div className="breadcrumb-holder container-fluid">
        <ul className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Inicio</a>
          </li>
          <li className="breadcrumb-item active">Cadastro - Criatorios</li>
        </ul>
      </div>
      <section className="forms">
        <div className="container-fluid">
          <div className="row">
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
                    onClick={showModal}
                  >
                    Buscar Criatorio
                  </Button>

                  <Modal
                    title="Lista de Criatorios"
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    width="50vw"
                    footer={null}
                  >
                    <MaterialTable
                      columns={[
                        {
                          title: 'CodCriatorio',
                          field: 'CodCriatorio',
                          hidden: true,
                        },
                        { title: 'Responsavel', field: 'Responsavel' },
                        { title: 'Criatorio', field: 'Criatorio' },
                      ]}
                      onRowClick={(event, rowData: any) => {
                        const cod = rowData.CodCriatorio;
                        CallApiCriatorioUnico(cod);
                        setVisible(false);
                      }}
                      data={criatorios}
                      icons={tableIcons}
                      localization={translate}
                      title="Lista de Criatorios"
                    />
                  </Modal>
                </div>
              </div>
            </div>
            <div className="col-lg-10">
              <div className="card">
                <div className="card-close" />
                <div className="card-header d-flex align-items-center">
                  <h3 className="h4">Cadastro de Criatorio</h3>
                </div>
                <div className="card-body">
                  <form
                    className="form-horizontal form-validate"
                    onSubmit={HandleSubbmit}
                    method="POST"
                  >
                    <div className="form-group row">
                      <label className="col-sm-3 form-control-label">
                        Nome
                      </label>
                      <div className="col-sm-6">
                        <input
                          id="criatorio_id"
                          name="criatorio_id"
                          value={codCriatorioValor}
                          type="hidden"
                          className="form-control form-control-success"
                        />
                        <input
                          id="criatorio_nome"
                          name="criatorio_nome"
                          type="text"
                          onChange={(e) => setNomeValor(e.target.value)}
                          value={nomeValor}
                          className="form-control form-control-success"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 form-control-label">
                        CNPJ
                      </label>
                      <div className="col-sm-4">
                        <input
                          id="criatorio_cnpj"
                          name="criatorio_cnpj"
                          type="text"
                          onChange={(e) => setCnpjValor(e.target.value)}
                          value={cnpjValor}
                          className="form-control form-control-success"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 form-control-label">
                        Autorização IBAMA
                      </label>
                      <div className="col-sm-3">
                        <input
                          id="criatorio_ibama"
                          name="criatorio_ibama"
                          onChange={(e) => setAutIbamaValor(e.target.value)}
                          value={autIbamaValor}
                          type="text"
                          className="form-control form-control-success"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 form-control-label">
                        Responsavel
                      </label>
                      <div className="col-sm-6">
                        <input
                          id="criatorio_responsavel"
                          name="criatorio_responsavel"
                          onChange={(e) => setResponsavelValor(e.target.value)}
                          value={responsavelValor}
                          type="text"
                          className="form-control form-control-success"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-3 form-control-label">CEP</label>
                      <div className="col-sm-3">
                        <input
                          value={cepValor}
                          onChange={(e) => setCep(e.target.value)}
                          type="text"
                          className="form-control form-control-success"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 form-control-label">Rua</label>
                      <div className="col-sm-6">
                        <input
                          id="criatorio_rua"
                          name="criatorio_rua"
                          disabled
                          value={rua}
                          // onChange={(e)=> setRua(e.target.value)}
                          type="text"
                          className="form-control form-control-success"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 form-control-label">
                        Bairro
                      </label>
                      <div className="col-sm-4">
                        <input
                          id="criatorio_bairro"
                          name="criatorio_bairro"
                          disabled
                          value={bairroValor}
                          type="text"
                          className="form-control form-control-success"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 form-control-label">
                        Cidade
                      </label>
                      <div className="col-sm-4">
                        <input
                          id="criatorio_cidade"
                          name="criatorio_cidade"
                          disabled
                          value={cidade}
                          type="text"
                          className="form-control form-control-success"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 form-control-label">
                        Estado
                      </label>
                      <div className="col-sm-2">
                        <input
                          id="criatorio_uf"
                          name="criatorio_uf"
                          type="text"
                          value={estado}
                          disabled
                          className="form-control form-control-success"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 form-control-label">
                        IBGE
                      </label>
                      <div className="col-sm-2">
                        <input
                          id="criatorio_ibge"
                          name="criatorio_ibge"
                          type="text"
                          disabled
                          value={ibgeValor}
                          className="form-control form-control-success"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 form-control-label">
                        Numero
                      </label>
                      <div className="col-sm-2">
                        <input
                          id="criatorio_numero"
                          name="criatorio_numero"
                          type="text"
                          onChange={(e) => setNumeroValor(e.target.value)}
                          value={numeroValor}
                          className="form-control form-control-success"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-9 offset-sm-3">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          id="btnCadCriatorio"
                        >
                          {codCriatorioValor ? 'Atualizar' : 'Cadastrar'}
                        </button>
                        <button
                          style={{ marginLeft: 12 }}
                          onClick={ClearForm}
                          type="button"
                          className="btn btn-primary"
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

export default CadCriatorio;
