import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { Modal, Button } from 'antd';
import { toast } from 'react-toastify';
import { api } from '../../services';
import { tableIcons } from '../../utils/icons';
import { translate } from '../../utils/translate';

import './styles.css';

toast.configure();

const Familia: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const [passaros, setPassaros] = useState([])
  const [mae, setMae] = useState('')
  const [pai, setPai] = useState('')
  const [avôpai, setAvôPai] = useState('')
  const [avóPai, setAvóPai] = useState('')
  const [avôMãe, setAvôMãe] = useState('')
  const [avóMãe, setAvóMãe] = useState('')
  const [bisavôAvôPai, setBisavôAvôPai] = useState('')
  const [bisavóAvôPai, setBisavóAvôPai] = useState('')
  const [bisavôAvóPai, setBisavôAvóPai] = useState('')
  const [bisavóAvóPai, setBisavóAvóPai] = useState('')
  const [bisavôAvôMãe, setBisavôAvôMãe] = useState('')
  const [bisavóAvôMãe, setBisavóAvôMãe] = useState('')
  const [bisavôAvóMãe, setBisavôAvóMãe] = useState('')
  const [bisavóAvóMãe, setBisavóAvóMãe] = useState('')
  const [filho, setFilho] = useState('')
  const [sexo, setSexo] = useState('')


  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (e) => {
    setVisible(false);
  };

  const handleCancel = (e) => {
    setVisible(false);
  };


  async function CallFamiliaId(cod) {
    const response = await api.post('/Select_Familia', {
      cod
    })
    response.data.map((ele) => {
      setPai(ele.Pai)
      setFilho(ele.Nome)
      setMae(ele.Mae)
      setAvôPai(ele.AvôPai)
      setAvóPai(ele.AvóPai)
      setAvôMãe(ele.AvôMãe)
      setAvóMãe(ele.AvóMãe)
      setBisavôAvôPai(ele.BisavôAvôPai)
      setBisavóAvôPai(ele.BisavóAvôPai)
      setBisavôAvóPai(ele.BisavôAvóPai)
      setBisavóAvóPai(ele.BisavóAvóPai)
      setBisavôAvôMãe(ele.BisavôAvôMãe)
      setBisavóAvôMãe(ele.BisavóAvôMãe)
      setBisavôAvóMãe(ele.BisavôAvóMãe)
      setBisavóAvóMãe(ele.BisavóAvóMãe)
      setSexo(ele.Sexo)
      return 1
    })
  }

  useEffect(() => {
    async function CallApiFullPassaro() {
      const response = await api.get('/Select_Passaro')
      setPassaros(response.data)
    }
    CallApiFullPassaro()
  }, [])
  return (
    <>
      <header className="page-header">
        <div className="container-fluid">
          <h2 className="no-margin-bottom no-print">Familia</h2>
        </div>
      </header>

      <div id="container">
        <div style={{ marginBottom: '40%', marginLeft: '2%' }}>
          <Button
            onClick={
              showModal
            }
            style={{
              background: '#FF3F3F',
              color: '#ffffff',
              fontWeight: 600,
              borderRadius: 8,
            }}
            className='no-print'
          >
            Buscar Passaros
          </Button>
          <Modal
            title="Lista de Pássaros"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
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
                CallFamiliaId(cod);
                setVisible(false);
              }}
              data={passaros}
              icons={tableIcons}
              localization={translate}
              title="Lista de Criatorios"
            />
          </Modal>
        </div>
        <div id="filho">
          <div>
            <strong
              style={{
                display: filho !== '' ? 'block' : 'none',
                background: sexo === 'Macho' ? '#9BF6FF' : '#FFC6FF',

              }}
              id="filho_passaro">
              {filho}
            </strong>

            <span>Pássaro</span>
          </div>
        </div>

        <div className="pai-mae">
          <div style={{
            display: pai !== '' ? 'block' : 'none'
          }} id="pai_passaro_div">
            <strong

              style={{
                background: '#9BF6FF'

              }} id="pai_passaro">{pai}</strong>

            <span>Pai</span>
          </div>
          <div
            style={{
              display: mae !== '' ? 'block' : 'none'
            }}
            id="mae_passaro_div">
            <strong id="mae_passaro"
              style={{
                background: '#FFC6FF',

              }}
            >{mae}</strong>

            <span>Mãe</span>
          </div>
        </div>
        <div className="pai-mae">
          <div>
            <div>
              <strong
                style={{
                  background: '#FFC6FF',
                  display: avôpai !== '' ? 'block' : 'none'

                }}
                className="pai_pai_passaro_div" id="pai_pai_passaro">
                {avôpai}
              </strong>

              <span className="pai_pai_passaro_div"
              style={{
                display: avôpai !== '' ? 'block' : 'none'
              }}
              >Avô Paterno</span>
              <strong
                style={{
                  background: '#9BF6FF',
                  display: avóPai !== '' ? 'block' : 'none'


                }}
                className="mae_pai_passaro_div" id="mae_pai_passaro">
                {avóPai}
              </strong>

              <span
              
              style={{
                display: avóPai !== '' ? 'block' : 'none'
              }}className="mae_pai_passaro_div">Avó Paterna</span>
            </div>
          </div>
          <div>
            <div>
              <strong
                style={{
                  background: '#FFC6FF',
                  display: avôMãe !== '' ? 'block' : 'none'


                }}
                className="pai_mae_passaro_div" id="pai_mae_passaro">
                {avôMãe}
              </strong>
              <span
               style={{
                display: avôMãe !== '' ? 'block' : 'none'
              }}
              className="pai_mae_passaro_div">Avô Materno</span>
              <strong
                style={{
                  background: '#9BF6FF',
                  display: avóMãe !== '' ? 'block' : 'none'


                }}
                className="mae_mae_passaro_div" id="mae_mae_passaro">
                {avóMãe}
              </strong>

              <span
              style={{
                display: avóMãe !== '' ? 'block' : 'none'
              }}
              className="mae_mae_passaro_div">Avó Materna</span>
            </div>
          </div>
        </div>
        <div className="bisavo">
          <div>
            <div>
              <div>
                <strong
                  className="pai_pai_pai_passaro_div"
                  id="pai_pai_pai_passaro"
                  style={{
                    background: '#9BF6FF',
                    display: bisavôAvôPai !== '' ? 'block' : 'none'


                  }}
                >
                  {bisavôAvôPai}
                </strong>

                <span 
                
                style={{
                  display: bisavôAvôPai !== '' ? 'block' : 'none'
                }}className="pai_pai_pai_passaro_div">
                  Pai do avô paterno
                </span>
                <strong
                  style={{
                    background: '#FFC6FF',
                    display: bisavóAvôPai !== '' ? 'block' : 'none'


                  }}
                  className="mae_pai_pai_passaro_div"
                  id="mae_pai_pai_passaro"
                >
                  {bisavóAvôPai}
                </strong>

                <span
                
                style={{
                  display: bisavóAvôPai !== '' ? 'block' : 'none'
                }}className="mae_pai_pai_passaro_div">
                  Mãe do avô paterno
                </span>
              </div>
            </div>
            <div>
              <div>
                <strong
                  className="pai_mae_pai_passaro_div"
                  id="pai_mae_pai_passaro"
                  style={{
                    background: '#9BF6FF',
                    display: bisavôAvóPai !== '' ? 'block' : 'none'

                  }}
                >
                  {bisavôAvóPai}
                </strong>

                <span
                                style={{
                                  display: bisavôAvóPai !== '' ? 'block' : 'none'
                                }}
                className="pai_mae_pai_passaro_div">
                  Pai da avó paterna
                </span>
                <strong
                  className="mae_mae_pai_passaro_div"
                  id="mae_mae_pai_passaro"
                  style={{
                    background: '#FFC6FF',
                    display: bisavóAvóPai !== '' ? 'block' : 'none'


                  }}
                >
                  {bisavóAvóPai}
                </strong>

                <span 
                style={{
                  display: bisavóAvóPai !== '' ? 'block' : 'none'
                }}
                className="mae_mae_pai_passaro_div">
                  Mãe da avó paterna
                </span>
              </div>
            </div>
          </div>

          <div>
            <div>
              <div>
                <strong
                  className="pai_pai_mae_passaro_div"
                  id="pai_pai_mae_passaro"

                  style={{
                    background: '#9BF6FF',
                    display: bisavôAvôMãe !== '' ? 'block' : 'none'


                  }}
                >
                  {bisavôAvôMãe}
                </strong>

                <span 
                style={{
                  display: bisavôAvôMãe !== '' ? 'block' : 'none'
                }}
                className="pai_pai_mae_passaro_div">
                  Pai do avô materno
                </span>
                <strong
                  className="mae_pai_mae_passaro_div"
                  id="mae_pai_mae_passaro"
                  style={{
                    background: '#FFC6FF',
                    display: bisavóAvôMãe !== '' ? 'block' : 'none'


                  }}
                >
                  {bisavóAvôMãe}
                </strong>

                <span
                                style={{
                                  display: bisavóAvôMãe !== '' ? 'block' : 'none'
                                }}
                className="mae_pai_mae_passaro_div">
                  Mãe do avô materno
                </span>
              </div>
            </div>
            <div>
              <div>
                <strong
                  className="pai_mae_mae_passaro_div"
                  id="pai_mae_mae_passaro"
                  style={{
                    background: '#9BF6FF',
                    display: bisavôAvóMãe !== '' ? 'block' : 'none'


                  }}
                >
                  {bisavôAvóMãe}
                </strong>

                <span
                style={{
                  display: bisavôAvóMãe !== '' ? 'block' : 'none'
                }}
                className="pai_mae_mae_passaro_div">
                  Pai da avó materna
                </span>
                <strong
                  className="mae_mae_mae_passaro_div"
                  id="mae_mae_mae_passaro"
                  style={{
                    background: '#FFC6FF',
                    display: bisavóAvóMãe !== '' ? 'block' : 'none'


                  }}
                >
                  {bisavóAvóMãe}
                </strong>

                <span
                style={{
                  display: bisavóAvóMãe !== '' ? 'block' : 'none'
                }}
                className="mae_mae_mae_passaro_div">
                  Mãe da avó materna
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Familia;
