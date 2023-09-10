// Drawer.jsx
import React from 'react';
import { Nav, Col } from 'react-bootstrap';

import { Link, useLocation } from 'react-router-dom';

const DrawerMenu = () => {
  const location = useLocation();

  // Defina uma função para verificar se um item de menu deve estar ativo
  const isActive = (pathname) => {
    return location.pathname === pathname;
  };

  return (
    <Nav className="col-md-3 col-lg-2 d-md-block cor-layout text-dark">
      {/* Adicione links de navegação ou itens de menu aqui */}
        <Col md={6} className="d-none d-md-block col-md-12 col-lg-12">
          {/* Conteúdo visível apenas em telas médias e maiores */}
          <ul>
            <b>GESTÃO</b>   
            <li className={isActive('/batalhoes') ? 'active' : ''}>
              <Link to="/batalhoes">Batalhões</Link>
            </li>
            <li className={isActive('/regioes') ? 'active' : ''}>
              <Link to="/regioes">Regiões</Link>
            </li>
            {/* <li className={isActive('/darkmode') ? 'active' : ''}>
              <Link to="/darkmode">Dark Mode</Link>
            </li>
            <li className={isActive('/nutricionistas') ? 'active' : ''}>
              <Link to="/nutricionistas">Nutricionista</Link>
            </li> */}
          </ul>
          <ul>
            <b>ACESSO</b>
            <li className={isActive('/foods') ? 'active' : ''}>
              <Link to="/foods">Usuários</Link>
            </li>
          </ul>
        </Col>
    </Nav>
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

