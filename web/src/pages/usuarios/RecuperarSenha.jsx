import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { recuperarSenhaUsuario } from '../../services/usuario-service';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import AlertaFeedback from "../../components/layout/Alert";


const RecuperarSenha = () => {
  //const [email, setEmail] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');
  const [showPassword, setShowPassword] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Adicione a lógica para enviar o e-mail de recuperação e processar a nova senha aqui
    //console.log(`Nova senha: ${novaSenha}`);
    //console.log(`Confirmação de senha: ${confirmarSenha}`);
    async function recuperarSenha() {
        try {
            const result = await recuperarSenhaUsuario({
                //email: email,
                novaSenha,
                confirmarSenha,
                token
            });
            setAlerta(result.data);
            setShow(true);
            setTimeout(() => {
                navigate('/');
            }, 1500);
        } catch (error) {
            console.error(error);
            setAlerta(error.response.data);
            setShow(true);
        }
    }
    recuperarSenha()
    
    //console.log(`Link de recuperação de recuperação solicitado para: ${result.data}`);
    
  };

  return (
    
      <Row className="d-flex justify-content-center mt-5 align-items-center">
        { show ?  <AlertaFeedback  setShow={setShow} alerta={alerta}></AlertaFeedback> : <></>  }

        <Col md={6} className=" mt-5 ">
          <h2>Recuperação de Senha</h2>
          <Form onSubmit={handleSubmit} className='mt-4'>
            {/* <Form.Group controlId="email">
              <Form.Label>Endereço de E-mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group> */}
              <InputGroup className="mb-3">
                <Form.Control
                    size='lg'
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Digite a nova senha"
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                    required
                />
                <button
                    
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={togglePasswordVisibility} 
                >
                    {showPassword ? <FaEye/> : <FaEyeSlash/>}
                </button>
              </InputGroup>

            {/* <Form.Group controlId="novaSenha">
              <Form.Label>Nova Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Digite a nova senha"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                required
              />
            </Form.Group> */}

            <InputGroup className="mb-3">
                <Form.Control
                    size='lg'
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Digite a nova senha"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    required
                />
                <button
                    
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={togglePasswordVisibility} 
                >
                    {showPassword ? <FaEye/> : <FaEyeSlash/>}
                </button>
            </InputGroup>

            {/* <Form.Group controlId="confirmarSenha">
              <Form.Label>Confirmação de Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirme a nova senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required
              />
            </Form.Group> */}

            <div className="d-flex justify-content-between pt-2">
                <Button type="submit" > Recuperar Senha </Button>
                <Link to="/" >Cancelar</Link>
            </div>
            
          </Form>
        </Col>
      </Row>
  );
};

export default RecuperarSenha;
