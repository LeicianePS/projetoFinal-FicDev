// Drawer.jsx

import React, { useState, useEffect } from 'react';
import { Navbar, Col } from 'react-bootstrap';
import { FaSignOutAlt, FaBars, FaMapMarkedAlt, FaUserFriends, FaUserShield } from 'react-icons/fa';
import { FaBuildingShield} from 'react-icons/fa6';
import { Link, useLocation } from 'react-router-dom';
import {getUsuarioByUserToken} from '../../services/usuario-service';

const DrawerMenu = () => {
  const location = useLocation();
  const [usuario, setUsuario] = useState({})
  const [tema, setTema] = useState(localStorage.getItem('temaLocal'));

  useEffect( () => {
    console.log(tema)
    async function findUsuarioPerfil() {
        try {
          const response = await getUsuarioByUserToken();
          setUsuario(response.data);
        } catch (error) {
          console.error(error);
        }
    }

    findUsuarioPerfil();

}, []);

  // Defina uma função para verificar se um item de menu deve estar ativo
  const isActive = (pathname) => {
    return location.pathname === pathname;
  };

  return (
    <Navbar variant="light" className="col-md-3 col-lg-2 d-md-block cor-layout" >
      {/* Adicione links de navegação ou itens de menu aqui */}
        <Col md={6} className="d-none d-md-block col-md-12 col-lg-12">
          {/* Conteúdo visível apenas em telas médias e maiores */}
          <ul>
            <b>GESTÃO</b>
            <li className={isActive('/batalhoes') ? 'active  align-items-center' : ' align-items-center'}>
              <Link to="/batalhoes"><FaBuildingShield size="24px" className='me-3'/>Batalhões</Link>
            </li>
            <li className={isActive('/regioes') ? 'active  align-items-center' : ' align-items-center'}>
              <Link to="/regioes"><FaMapMarkedAlt size="24px" className='me-3'/>Regiões</Link>
            </li>
            <li className={isActive('/militares') ? 'active  align-items-center' : ' align-items-center'}>
              <Link to="/militares"><FaUserShield size="24px" className='me-3'/>Militares</Link>
            </li>

          </ul>
          {usuario.perfil == "admin" ? <ul>
            <b>ACESSO</b>
            <li className={isActive('/usuarios') ? 'active' : ''}>
              <Link to="/usuarios"><FaUserFriends size="24px" className='me-3'/>Usuários</Link>
            </li>
          </ul> : <></>}
        </Col>

    </Navbar>
  );
}

export default DrawerMenu;






















// // Drawer.jsx
// import React from 'react';
// import Drawer from '@material-ui/core/Drawer';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';

// const DrawerMenu = () => {
//   return (
//     <Drawer variant="permanent">
//       <List>
//         <ListItem button>
//           <ListItemText primary="Página 1" />
//         </ListItem>
//         <ListItem button>
//           <ListItemText primary="Página 2" />
//         </ListItem>
//         {/* Adicione mais itens de menu conforme necessário */}
//       </List>
//     </Drawer>
//   );
// }

// export default DrawerMenu;

