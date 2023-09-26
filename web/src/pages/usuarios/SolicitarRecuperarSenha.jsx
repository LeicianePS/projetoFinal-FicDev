import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { solicitarRecuperarSenhaUsuario } from '../../services/usuario-service';
import AlertaFeedback from "../../components/layout/Alert";

const RecuperarSenha = () => {
  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});
  const [show, setShow] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    //

    async function solicitarRecuperarSenha(email) {
      try {
          const result = await solicitarRecuperarSenhaUsuario(email);
          setAlerta(result.data);
          setShow(true);
          console.log(result)

          console.log(`Link de recuperação: ${result.data.messageToken}`);
          setTimeout(() => {
              navigate('/');
          }, 2500);
      } catch (error) {
          console.error(error);
          setAlerta(error.response.data);
          setShow(true);
      }
    }

    solicitarRecuperarSenha(email)
    // const result = await solicitarRecuperarSenhaUsuario(email)
    // console.error(result);
    // setAlerta(result.response.data);
    // setShow(true);
    // console.log(`E-mail de recuperação solicitado para: ${email}`);
  };

  return (
    <Container>
      { show ?  <AlertaFeedback  setShow={setShow} alerta={alerta}></AlertaFeedback> : <></>  }

      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <h2>Solicitação de Recuperação de Senha</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email" className="mb-3" >
              <Form.Label>Confirme seu endereço de E-mail</Form.Label>
              <Form.Control
                size='lg'
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Enviar E-mail de Recuperação
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RecuperarSenha;
