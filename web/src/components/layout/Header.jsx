// Header.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation} from "react-router-dom";
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { FaUser, FaSignOutAlt, FaBars } from 'react-icons/fa'; // Importe o ícone de usuário
import logo from '../../assets/images/logo_govmt.png'; // Importe a imagem
import {getUsuarioByCPF} from '../../services/usuario-service';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showMenuBars, setShowMenuBars] = useState(false);
  const [usuario, setUsuario] = useState({})

  const handleToggleMenu = () => setShowMenu(!showMenu);
  const handleToggleMenuBars = () => setShowMenuBars(!showMenu);

  useEffect( () => {

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
  
  return (
    <Navbar variant="light" className='justify-content-between px-4 cor-layout'>
        <Nav className="d-flex justify-content-start d-md-none ">
          <Dropdown className="" style={{ padding: '0px 20px 0px 0px'}}>
            <Dropdown.Toggle as={FaBars} id="dropdown-basic" size="24px" style={{ cursor: 'pointer'}} />

            <Dropdown.Menu className='px-3'
              alignRight={false} // Impede que o menu ajuste o tamanho da tela
              style={{ position: 'absolute', top: '35px', left: 'auto', right: 'auto' }}
            >
              <b>GESTÃO</b> 
              <Dropdown.Item className={isActive('/batalhoes') ? 'active' : ''}>
                <Link to="/batalhoes">Batalhões</Link>
              </Dropdown.Item>
              <Dropdown.Item className={isActive('/regioes') ? 'active' : ''}>
                <Link to="/regioes">Regiões</Link>
              </Dropdown.Item>
               
              <br/>
              <b>ACESSO</b>
              <Dropdown.Item className={isActive('/usuarios') ? 'active' : ''}>
                <Link to="/usuarios">Usuários</Link>
              </Dropdown.Item>

            </Dropdown.Menu>
          </Dropdown>
        </Nav>

        <Nav className="d-flex justify-content-start ">
          <Link to="/home-dash"><img src={logo} alt="" width={"100px"}/></Link>
          
        </Nav>

        <Nav className="ml-auto d-flex justify-content-end" color='white'>
          <Dropdown show={showMenu} onToggle={handleToggleMenu} drop="left">
            <Dropdown.Toggle as={FaUser} id="user-dropdown" size="24px" style={{ cursor: 'pointer' }} />
            <Dropdown.Menu
              alignRight={false} // Impede que o menu ajuste o tamanho da tela
              style={{ position: 'absolute', top: '50px', left: 'auto', right: '0' }}
            >
              <Dropdown.Item onClick={()=> {navigate(`/usuario-perfil/${window.localStorage.getItem('user')}`)}} ><b>Usuário:</b> {usuario.nome}</Dropdown.Item>
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
