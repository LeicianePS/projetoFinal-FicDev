// Header.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation} from "react-router-dom";
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { FaUser, FaSignOutAlt, FaBars, FaUserShield, FaMapMarkedAlt, FaUserFriends, FaLightbulb } from 'react-icons/fa'; // Importe o ícone de usuário
import logo from '../../assets/images/logo_govmt.png'; // Importe a imagem
import fontMais from '../../assets/images/font+.png';
import fontMenos from '../../assets/images/font-.png';
import {getUsuarioByCPF} from '../../services/usuario-service';
import { FaBuildingShield } from 'react-icons/fa6';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showMenuBars, setShowMenuBars] = useState(false);
  const [usuario, setUsuario] = useState({})

  const handleToggleMenu = () => setShowMenu(!showMenu);
  const handleToggleMenuBars = () => setShowMenuBars(!showMenu);
  const [temaDark, setTemaDark] = useState(false);
  const [tema, setTema] = useState('');

  useEffect( () => {
    if (!localStorage.getItem('temaLocal')){
      localStorage.setItem('temaLocal', 'white');
    }

    async function findUsuarioPerfil() {
        try {
          const response = await getUsuarioByCPF(window.localStorage.getItem('user'));
          setUsuario(response.data);
        } catch (error) {
          console.error(error);
        }
    }

    findUsuarioPerfil();

}, []);

 const darkMode = () => {
    if (!temaDark) {
      setTemaDark(true);
    }else {
      setTemaDark(false)
    }
    localStorage.setItem('temaLocal', temaDark ? 'black' : 'white');
    if (temaDark){
      setTema('black')
    }else{
      setTema('white')
    }
  };


  const navigate = useNavigate();
  const location = useLocation();

  // Verifica se um item do menu está ativo
  const isActive = (pathname) => {
    return location.pathname === pathname;
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };


 


  const [tamanhoFonte, setTamanhoFonte] = useState(16); // Valor inicial de 16px

  // Tamanhos mínimo e máximo da fonte
  const tamanhoMinimo = 16;
  const tamanhoMaximo = 32;

  const aumentarFonte = () => {
    if (tamanhoFonte < tamanhoMaximo) {
      setTamanhoFonte(tamanhoFonte + 4);
    }
  };

  const diminuirFonte = () => {
    if (tamanhoFonte > tamanhoMinimo) {
      setTamanhoFonte(tamanhoFonte - 4);
    }
  };

  // Define o tamanho da fonte diretamente no elemento <body>
  document.body.style.setProperty('--tamanho-fonte', `${tamanhoFonte}px`);
  document.body.style.setProperty('--tema', `${tema}`);


  return (
    <Navbar variant="light" className='justify-content-between px-4 cor-layout'>
        <Nav className="d-flex justify-content-start d-md-none ">
          <Dropdown className="" style={{ padding: '0px 20px 0px 0px'}}>
            <Dropdown.Toggle as={FaBars} id="dropdown-basic" size="24px" style={{ cursor: 'pointer'}} />

            <Dropdown.Menu className='px-3'
              alignRight={false} // Impede que o menu ajuste o tamanho da tela
              style={{ position: 'absolute', top: '35px', left: '0', right: 'auto' }}
            >
              <b>GESTÃO</b>
              <Dropdown.Item className={isActive('/batalhoes') ? 'active  align-items-center' : ' align-items-center'}>
                <Link to="/batalhoes"><FaBuildingShield size="24px" className='me-3'/>Batalhões</Link>
              </Dropdown.Item>
              <Dropdown.Item className={isActive('/regioes') ? 'active  align-items-center' : ' align-items-center'}>
                <Link to="/regioes"><FaMapMarkedAlt size="24px" className='me-3'/>Regiões</Link>
              </Dropdown.Item>
              <Dropdown.Item className={isActive('/militares') ? 'active  align-items-center' : ' align-items-center'}>
                <Link to="/militares"><FaUserShield size="24px" className='me-3'/>Militares</Link>
              </Dropdown.Item>

              <br/>
              {
                usuario.perfil == "admin" ? <div><b>ACESSO</b>
                <Dropdown.Item className={isActive('/usuarios') ? 'active' : ''}>
                  <Link to="/usuarios"><FaUserFriends size="24px" className='me-3'/>Usuários</Link>
                </Dropdown.Item></div> : <></>
              }

            </Dropdown.Menu>
          </Dropdown>
        </Nav>

        <Nav className="d-flex justify-content-start ">
          <Link to="/home-dash"><img src={logo} alt="" width={"100px"}/></Link>
        </Nav>

        <Nav className="ml-auto d-flex justify-content-end" color='white'>
            <button onClick={darkMode} className='mx-2 me-5'><FaLightbulb/></button>


            <button onClick={aumentarFonte} className='mx-2'><img src={fontMais} alt="" width={"30px"}/></button>
            <button onClick={diminuirFonte} className='mx-2 me-5'><img src={fontMenos} alt="" width={"30px"}/></button>

          <Dropdown show={showMenu} onToggle={handleToggleMenu} drop="left">
            <Dropdown.Toggle as={FaUser} id="user-dropdown" size="30px" style={{ cursor: 'pointer' }} />
            <Dropdown.Menu
              alignRight={false} // Impede que o menu ajuste o tamanho da tela
              style={{ position: 'absolute', top: '50px', left: 'auto', right: '0' }}
            >
              <Dropdown.Item className={isActive('/usuario-perfil') ? 'active  align-items-center' : ' align-items-center'} onClick={()=> {navigate(`/usuario-perfil/${window.localStorage.getItem('user')}`)}} >
                  <FaUser size="24px" className='me-3'/> <b>Usuário:</b> {usuario.nome}
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>
                <FaSignOutAlt /> Sair
              </Dropdown.Item>
              {/* <Link className="mx-1 px-1" to={`/regiao-editar/${regiao.id_regiao}`}><FaPen size="18px"/></Link>  */}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
    </Navbar>

  );
}

export default Header;
