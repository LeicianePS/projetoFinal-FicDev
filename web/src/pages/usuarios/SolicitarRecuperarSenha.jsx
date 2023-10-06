import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { solicitarRecuperarSenhaUsuario } from '../../services/usuario-service';
import AlertaFeedback from "../../components/layout/Alert";
import { Spinner } from 'react-bootstrap';

const RecuperarSenha = () => {
  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar a visibilidade do spinner



  const handleSubmit = (e) => {
    e.preventDefault();
    //

    async function solicitarRecuperarSenha(email) {
      setIsLoading(true);
      try {
          const result = await solicitarRecuperarSenhaUsuario(email);
          setAlerta(result.data);
          setShow(true);
          //console.log(result)

          setIsLoading(false);
          //console.log(`Link de recuperação: ${result.data.messageToken}`);
         setTimeout(() => {
              navigate('/');
          }, 2000);
      } catch (error) {
          console.error(error);
          setAlerta(error.response.data);
          setShow(true);
          setIsLoading(false);
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
    <Row className=''>
        {isLoading && (
            <div className="position-fixed d-flex align-items-center justify-content-center"
            style={{
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1, // Defina um valor adequado para o z-index
            }}>
                <Spinner animation="border" size="sm" />
                <Spinner animation="border" />
            </div>
        )}

        {!isLoading && (
            <div className='position-fixed d-flex align-items-center justify-content-center h-100 cor-page' style={{
                top: 0,
                left: 0,
                width: '100%',
                height: '70%',
                zIndex: 1, // Defina um valor adequado para o z-index
            }}>
                { show ? <AlertaFeedback  setShow={setShow} alerta={alerta}></AlertaFeedback> : <></>  }

                <Row className="justify-content-center ">
                    <Col col={12}>
                        <h4 className='text-center mb-2'>Solicitação de Recuperação de Senha</h4>
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
                            <div className="justify-content-between pt-2 d-block">
                                {/* <Button type="submit" className='col-12 col-md-4' size="lg"> Recuperar Senha </Button> */}
                                <Button variant="primary" type="submit" className='col-12 mt-2' size='lg'>
                                    Enviar E-mail de Recuperação
                                </Button>
                                <Link to="/" className='mt-3 col-12 d-flex justify-content-center link-border'>Voltar</Link>
                            </div>
                            
                        </Form>
                    </Col>
                </Row>
            </div>
        )}
    </Row>
  );
};

export default RecuperarSenha;
