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


  };

  return (

    <Row className='position-fixed d-flex align-items-center justify-content-center m-0 p-0 h-100' style={{
        top: 0,
        left: 0,
        width: '100%',
        height: '70%',
        zIndex: 1, // Defina um valor adequado para o z-index
    }}>
        { show ?  <AlertaFeedback  setShow={setShow} alerta={alerta}></AlertaFeedback> : <></>  }

        <Col md={6} className=" mt-5 ">
            <h3 className='mb-3'>Recuperação de Senha</h3>
            <Form onSubmit={handleSubmit} >
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

                <InputGroup className="mb-3">
                    <Form.Control
                        size='lg'
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirme a nova senha"
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

                <div className="d-md-flex justify-content-between pt-2 d-block">
                    <Button type="submit" className='col-12 col-md-4' size="lg"> Recuperar Senha </Button>
                    <Link to="/" className='mt-3 col-12 col-md-4 d-flex justify-content-center d-md-block link-border' > Cancelar </Link>
                </div>
            </Form>
        </Col>
      </Row>
  );
};

export default RecuperarSenha;
