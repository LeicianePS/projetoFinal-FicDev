// Header.jsx
import React, { useState } from 'react';
import { useNavigate, Link, useLocation} from "react-router-dom";
import { Navbar, Nav, Row, Container, Col,  Modal, Button, Dropdown } from 'react-bootstrap';
import { FaUser, FaSignOutAlt, FaBars } from 'react-icons/fa'; // Importe o ícone de usuário
import logo from '../../assets/images/logo_govmt.png'; // Importe a imagem

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showMenuBars, setShowMenuBars] = useState(false);

  const handleToggleMenu = () => setShowMenu(!showMenu);
  const handleToggleMenuBars = () => setShowMenuBars(!showMenu);

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
              {/* <Dropdown.Item className={isActive('/darkmode') ? 'active' : ''}>
                <Link to="/darkmode">Dark Mode</Link>
              </Dropdown.Item>
              <Dropdown.Item className={isActive('/nutricionistas') ? 'active' : ''}>
                <Link to="/nutricionistas">Nutricionista</Link>
              </Dropdown.Item> */}
              <br/>
              <b>ACESSO</b>
              <Dropdown.Item className={isActive('/foods') ? 'active' : ''}>
                <Link to="/foods">Usuários</Link>
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
              <Dropdown.Item>Usuário: {window.localStorage.getItem('user')}</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>
                <FaSignOutAlt /> Sair
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
    </Navbar>

    
  );
}

export default Header;























// // Header.jsx
// import React from 'react';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';

// const Header = () => {
//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <Typography variant="h6">Seu Aplicativo</Typography>
//       </Toolbar>
//     </AppBar>
//   );
// }

// export default Header;
