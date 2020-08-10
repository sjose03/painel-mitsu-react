/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { api } from '../../services';
import { tableIcons } from '../../utils/icons';
import { translate } from '../../utils/translate';
import { Modal, Button } from 'antd';
import { toast } from 'react-toastify';


toast.configure();


const CadAnilhas: React.FC = () => {
  
  const [anilhas,setAnilhas] =useState([])
  const [visibleAnilha,setVisibleAnilha] =useState(false)
  const [visibleCriatorio,setVisibleCriatorio] =useState(false)
  const [criatorios,setCriatorios] = useState([])
  const [codCriatorio, setCodCriatorio] = useState<number | undefined>(undefined)
  const [codAnilha, setCodAnilha] = useState<number | undefined>(undefined)
  const [siglaValor, setSiglaValor] = useState('')
  const [nroAnilhaValor, setNroAnilhaValor] = useState('')
  const [emUsoValor,setEmUsoValor] = useState('')
  const [criatorioValor,setCriatorioValor] = useState('')
  const [submit,setSubmit] = useState(false)


  async function callApiAnilhaUnica(cod) {
    const response = await api.post('/Select_Anilha_ID', {
      cod,
    });
    response.data.map((ele)=>{
      setCodAnilha(ele.CodAnilha)
      setSiglaValor(ele.Sigla)
      setNroAnilhaValor(ele.NroAnilha)
      setEmUsoValor(ele.EmUso)
      setCodCriatorio(ele.CodCriatorio)
      setCriatorioValor(ele.Criatorio)
      
      return 1
    })
  }

  function ClearForm(){
    setCodAnilha(undefined)
      setSiglaValor('')
      setNroAnilhaValor('')
      setEmUsoValor('')
      setCodCriatorio(undefined)
      setCriatorioValor('')
  }
  async function HandleSubbmit(event) {
    event.preventDefault();
    if (!codAnilha) {
      const response = await api.post('/Insert_Anilha', {
        cod_criatorio: codCriatorio,
        sigla: siglaValor,
        nro_anilha: nroAnilhaValor,
      });
      if (response.status === 200) {
        setSubmit(!submit)
        toast.success('Anilha cadastrada !!', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error('Problema ao cadastrar Anilha !!', {
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
      const response = await api.post('/Update_Anilha', {
        cod:codAnilha,
        cod_criatorio: codCriatorio,
        sigla: siglaValor,
        nro_anilha: nroAnilhaValor,
        
      });
      if (response.status === 200) {
        setSubmit(!submit)
        toast.success('Anilha atualizada !!', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error('Problema ao atualizar a Anilha !!', {
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


  async function callApiCriatorioUnica(cod) {
    const response = await api.post('/Select_Criatorio_ID', {
      cod,
    });
    response.data.map((ele)=>{
      setCodCriatorio(ele.CodCriatorio)
      setCriatorioValor(ele.Criatorio)
      return 1
    })
  }
  useEffect(() => {

    async function callApiAnilhaFull() {
      const response = await api.get('/Select_Anilha');
      setAnilhas(response.data);
    }
  
    async function callApiCriatorioFull() {
      const response = await api.get('/Select_Criatorio');
      setCriatorios(response.data);
    }

    callApiCriatorioFull()
    callApiAnilhaFull()
  }, [submit]);

  const showModalAnilha = () => {
    setVisibleAnilha(true);
  };

  const handleOkAnilha = (e) => {
    setVisibleAnilha(false);
  };

  const handleCancelAnilha = (e) => {
    setVisibleAnilha(false);
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

  // const { a } = criatoriosUnique;
  return (
    <>
      <header className="page-header">
        <div className="container-fluid">
          <h2 className="no-margin-bottom">Cadastro Anilhas</h2>
        </div>
      </header>

      <div className="breadcrumb-holder container-fluid">
        <ul className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Inicio</a>
          </li>
          <li className="breadcrumb-item active">Cadastro - Anilhas</li>
        </ul>
      </div>
      <section className="forms">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3">
              <div className="card">
                <div className="card-body text-center">
                  <Button
                    onClick={showModalAnilha}
                    
                    style={{
                      background: '#FF3F3F',
                      color: '#ffffff',
                      fontWeight: 600,
                      borderRadius: 8,
                    }}
                  >
                    Buscar Anilhas
                  </Button>
                  <Modal
                    title="Lista de Anilhas"
                    visible={visibleAnilha}
                    onOk={handleOkAnilha}
                    onCancel={handleCancelAnilha}
                    width="50vw"
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
                        callApiAnilhaUnica(cod);
                        setVisibleAnilha(false);
                      }}
                      data={anilhas}
                      icons={tableIcons}
                      localization={translate}
                      title="Lista de Anilhas"
                    />
                  </Modal>

                </div>
              </div>
            </div>

            <div className="col-lg-10">
              <div className="card">
                <div className="card-close" />
                <div className="card-header d-flex align-items-center">
                  <h3 className="h4">Cadastro de Anilhas</h3>
                </div>
                <div className="card-body">
                  <form
                    className="form-horizontal"
                    id="form_anilha"
                    method="POST"
                    onSubmit={HandleSubbmit}
                  >
                    <div className="form-group row">
                      <div className="col-sm-4">
                        <input
                          id="cod_criatorio"
                          name="cod_criatorio"
                          value={codCriatorio}
                          type="hidden"
                          placeholder="Criatorio"
                          className="form-control form-control-warning"
                          disabled
                        />
                        <input
                          id="nome_criatorio"
                          type="text"
                          placeholder="Criatorio"
                          className="form-control form-control-warning"
                          disabled
                          value={criatorioValor}
                        />
                      </div>
                      <div className="input-group-append">
                        <Button
                          onClick={showModalCriatorio}
                        >
                          <i className="fas fa-search" />
                        </Button>
                      </div>
                      <Modal
                    title="Lista de Criatorios"
                    visible={visibleCriatorio}
                    onOk={handleOkCriatorio}
                    onCancel={handleCancelCriatorio}
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
                        callApiCriatorioUnica(cod);
                        setVisibleCriatorio(false);
                      }}
                      data={criatorios}
                      icons={tableIcons}
                      localization={translate}
                      title="Lista de Criatorios"
                    />
                  </Modal>

                      <div className="col-sm-1">
                        <input
                          id="id_anilha"
                          name="id_anilha"
                          type="hidden"
                          value={codAnilha}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-4">
                        <input
                          id="nro_anilha"
                          name="nro_anilha"
                          type="text"
                          placeholder="Numero da Anilha"
                          className="form-control form-control-success"
                          value={nroAnilhaValor}
                          onChange={(e) =>
                            setNroAnilhaValor( e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-sm-2">
                        <input
                          id="sigla_anilha"
                          name="sigla_anilha"
                          type="text"
                          value={siglaValor}
                          placeholder="Sigla"
                          onChange={(e)=>{
                            setSiglaValor(e.target.value)
                          }}
                          className="form-control form-control-warning"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 form-control-label">
                        Em Uso
                      </label>
                      <div className="col-sm-2">
                        <input
                          id="emUso_anilha"
                          type="checkbox"
                          
                          className="radio-template"
                          onChange={(e)=>setEmUsoValor(e.target.checked ? 'Sim' : 'Não')}
                          checked={emUsoValor === 'Sim'}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-9 offset-sm-3">
                        <button
                          type="submit"
                          id="btn-cad"
                          className="btn btn-primary"
                        >
                          {codAnilha ? 'Atualizar' : 'Cadastrar'}
                        </button>
                        <button type="button" onClick={ClearForm} style={{ marginLeft: 12 }} className="btn btn-primary">
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

export default CadAnilhas;
