// Header.jsx
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Row, Container, Col,  Modal, Button, Dropdown } from 'react-bootstrap';
import { FaUser, FaSignOutAlt } from 'react-icons/fa'; // Importe o ícone de usuário


const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleToggleMenu = () => setShowMenu(!showMenu);

  const navigate = useNavigate();

  const handleLogout = () => {
    // Implemente a lógica de logout aqui, por exemplo, limpar o token de autenticação.
    // Em seguida, redirecione o usuário para a página de login.
    // window.location.href = '/login';
    sessionStorage.removeItem('token');
    navigate('/');
  };
  
  return (
    <Navbar variant="light" className='justify-content-between px-4 cor-layout'>
        <Navbar.Brand className="d-flex justify-content-start" >Seu Aplicativo</Navbar.Brand>
        <Nav className="ml-auto d-flex justify-content-end" color='white'>
        <Dropdown show={showMenu} onToggle={handleToggleMenu} drop="left">
          <Dropdown.Toggle as={FaUser} id="user-dropdown" size="24px" style={{ cursor: 'pointer' }} />
          <Dropdown.Menu
            alignRight={false} // Impede que o menu ajuste o tamanho da tela
            style={{ position: 'absolute', top: '50px', left: 'auto', right: '0' }}
          >
            <Dropdown.Item>{window.localStorage.getItem('user')}</Dropdown.Item>
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
