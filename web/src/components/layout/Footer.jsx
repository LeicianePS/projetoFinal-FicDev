// Footer.jsx
import React from 'react';
import { Container, Row } from 'react-bootstrap';
import brasao from '../../assets/images/brasao_mt.png'; // Importe a imagem


const Footer = () => {
  return (
    <Container className='align-items-center cor-layout'>
      <footer className="footer d-flex justify-content-between" >
        {/* Conteúdo do rodapé */}

        <div className='d-none d-sm-block'>
          <img src={brasao} alt="" width={"30px"} className='mx-2'/>
          Governo de Mato Grosso
        </div>
 	      <div className='d-sm-none'>
          <img src={brasao} alt="" width={"30px"} className='mx-2'/>
          GOV MT
        </div>


        <div className='mx-2 d-none d-sm-block'>
          Secretaria Estadual de Segurança Pública (SESP-MT)
        </div>
	      <div className='mx-2 d-sm-none'>
          SESP-MT
        </div>
        
      </footer>
    </Container>
  );
}

export default Footer;





































// // Footer.jsx
// import React from 'react';
// import Typography from '@material-ui/core/Typography';

// const Footer = () => {
//   return (
//     <footer>
//       <Typography variant="body2" color="textSecondary" align="center">
//         © {new Date().getFullYear()} Seu Aplicativo. Todos os direitos reservados.
//       </Typography>
//     </footer>
//   );
// }

// export default Footer;

