import { Container, Col, Modal, Row, Table, Form, Button } from "react-bootstrap";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { FaPlus, FaSearch, FaTrash, FaEdit, FaTimes, FaPen, FaUser } from 'react-icons/fa';
import logo from '../../assets/images/logo_govmt.png'; // Importe a imagem

//import { Usuario } from "../../components/Usuario";
import { Header } from "../../components/Header";
import { Input } from '../../components/Input';

import { createUsuario, deleteUsuario, getUsuarios, updateUsuario, filtroUsuario, getUsuarioByCPF } from "../../services/usuario-service";
import PaginationComponent from "../../components/PaginationComponent";
import AlertaFeedback from "../../components/layout/Alert";

export function PerfilUsuario() {
    const [usuario, setUsuario] = useState({});

    const [isCreated, setIsCreated] = useState(false);
    const [alerta, setAlerta] = useState({});
    const [show, setShow] = useState(false);
    const [showRemove, setShowRemove] = useState(false);

    const { handleSubmit, register, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const param = useParams();
    useEffect( () => {

        async function findUsuarioPerfil() {
            try {
              const response = await getUsuarioByCPF(param.cpf);
              setUsuario(response.data);
            } catch (error) {
              console.error(error);
            }
        }
      
        findUsuarioPerfil(); 
        
    }, [param]); 
    


   

    async function addUsuario(data) {
        try {
            await createUsuario(data);
            setIsCreated(false);
        } catch (error) {
            console.error(error);
        }
    }

    

    const [isUpdated, setIsUpdated] = useState(false);
    const [usuarioEdit, setUsuarioEdit] = useState({});
    async function editUsuario() {
        try {
            await updateUsuario({
                id: usuarioEdit.id,
                nome: usuarioEdit.nome,
                cpf: usuarioEdit.cpf,
                email: usuarioEdit.email,
                telefone: usuarioEdit.telefone,
                matricula: usuarioEdit.matricula
            });
            setIsUpdated(false);
            setUsuario(usuarioEdit)
        } catch (error) {
            console.error(error);
        }
    }

    
    const abrirModal = ( usuario ) => {
        setIsUpdated(true);
        setUsuarioEdit(usuario)
    }
    const abrirModalSenha = ( usuario ) => {
        setIsUpdated(true);
        setUsuarioEdit(usuario)
    }

    const abrirEditarUsuario = (usuario) => {
        //var jsonUsuario = JSON.stringify(usuario)
        window.localStorage.setItem('usuarioEditar', JSON.stringify(usuario))
        navigate(`/usuario-editar/${usuario.id}`);
    }





    return (
        <Container fluid className="cor-page min-height d-flex justify-content-center align-items-center">

        { show ?  <AlertaFeedback  setShow={setShow} alerta={alerta}></AlertaFeedback> : <></>  }

            <div className="d-flex flex-column align-items-center justify-content-center col-md-8 col-sm-10 m-3 p-0 perfil" variant="outline-danger">
                <FaUser size="50px" className="mb-3" />
                <h4 className="mb-4">Perfil do Usuário</h4>
                <div className="col-12">
                    <p><strong>Nome:</strong> {usuario.nome}</p>
                    <p><strong>CPF:</strong> {usuario.cpf}</p>
                    <p><strong>Email:</strong> {usuario.email}</p>
                    <p><strong>Telefone:</strong> {usuario.telefone}</p>
                    <p><strong>Matrícula:</strong> {usuario.matricula}</p>
                    {/* Adicione mais informações do usuário aqui */}
                </div>
                
                <Row className="justify-content-between align-items-center col-12">
                    <Col className="p-0 m-0">
                       <Button className="mt-3" onClick={() => abrirModal(usuario)}>
                            Editar Usuário
                            <FaEdit size="18px" className="mr-2" />
                        </Button>
                    </Col>
                    <Col className="d-flex justify-content-end p-0 ms-2">
                        <Button className="mt-3" onClick={() => abrirModalSenha(usuario)}>
                            Atualizar Senha
                            <FaPen size="18px" className="mr-2" />
                        </Button>
                    </Col>
                </Row>
            </div>


            <Modal show={isUpdated} onHide={() => setIsUpdated(false)} size="xl">
                <Modal.Header>
                    <Modal.Title>Editar usuário: {usuarioEdit.nome}</Modal.Title>
                </Modal.Header>
                
                <Form className="mx-2 pb-3" validate onSubmit={handleSubmit(editUsuario)} validated={!!errors}>
                    <Modal.Body className="py-3 mb-3 caixa-pesquisa bg-light">

                        <Row>
                            <Col md='8'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">Nome do Usuário</Form.Label>
                                    <Form.Control
                                        className="mb-3"
                                        type='text'
                                        defaultValue={usuarioEdit.nome}
                                        label=''
                                        placeholder='Insira o nome do Batalhão'
                                        required={true}
                                        name='nome'
                                        error={errors.nome}
                                        onChange={(e) =>
                                            setUsuarioEdit({
                                              ...usuarioEdit,
                                              nome: e.target.value,
                                            })
                                          }
                                        validations={register('nome', {
                                            required: {
                                                value: true,
                                                message: 'Nome do batalhão é obrigatório.'
                                            }
                                        })}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md='4'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">CPF</Form.Label>
                                    <Form.Control
                                        className="mb-3"
                                        type='text'
                                        defaultValue={usuarioEdit.cpf}
                                        label=''
                                        placeholder='Cpf'
                                        required={true}
                                        name='cpf'
                                        error={errors.cpf}
                                        onChange={(e) =>
                                            setUsuarioEdit({
                                              ...usuarioEdit,
                                              cpf: e.target.value,
                                            })
                                          }
                                        validations={register('cpf', {
                                            required: {
                                                value: true,
                                                message: ' é obrigatório.'
                                            }
                                        })}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>


                        <Row>
                            <Col md='6'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">E-mail</Form.Label>
                                    <Form.Control
                                        className="mb-3"
                                        type='email'
                                        defaultValue={usuarioEdit.email}
                                        label=''
                                        placeholder='E-mail'
                                        required={true}
                                        name='email'
                                        error={errors.email}
                                        onChange={(e) =>
                                            setUsuarioEdit({
                                              ...usuarioEdit,
                                              email: e.target.value,
                                            })
                                          }
                                        validations={register('email', {
                                            required: {
                                                value: true,
                                                message: ' é obrigatório.'
                                            }
                                        })}
                                    />
                                </Form.Group>
                            </Col>
                            {/* <Col md='3'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">Senha:</Form.Label>
                                    <Form.Control
                                        className="mb-3"
                                        type='text'
                                        defaultValue={usuarioEdit.senha}
                                        label=''
                                        placeholder='Senha'
                                        required={true}
                                        name='senha'
                                        error={errors.senha}
                                        onChange={(e) =>
                                            setUsuarioEdit({
                                              ...usuarioEdit,
                                              senha: e.target.value,
                                            })
                                          }
                                        validations={register('senha', {
                                            required: {
                                                value: true,
                                                message: ' é obrigatório.'
                                            }
                                        })}
                                    />
                                </Form.Group>
                            </Col> */}
                            <Col md='3'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">Telefone:</Form.Label>
                                    <Form.Control
                                        className="mb-3"
                                        type='text'
                                        defaultValue={usuarioEdit.telefone}
                                        label=''
                                        placeholder='Telefone'
                                        required={true}
                                        name='telefone'
                                        error={errors.telefone}
                                        onChange={(e) =>
                                            setUsuarioEdit({
                                              ...usuarioEdit,
                                              telefone: e.target.value,
                                            })
                                          }
                                        validations={register('telefone', {
                                            required: {
                                                value: true,
                                                message: ' é obrigatório.'
                                            }
                                        })}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md='3'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">Matrícula:</Form.Label>
                                    <Form.Control
                                        className="mb-3"
                                        type='text'
                                        defaultValue={usuarioEdit.matricula}
                                        label=''
                                        placeholder='Matrícula'
                                        required={true}
                                        name='matricula'
                                        error={errors.matricula}
                                        onChange={(e) =>
                                            setUsuarioEdit({
                                              ...usuarioEdit,
                                              matricula: e.target.value,
                                            })
                                          }
                                        validations={register('matricula', {
                                            required: {
                                                value: true,
                                                message: ' é obrigatório.'
                                            }
                                        })}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                            <Button variant="primary" type="submit" onClick={()=> {editUsuario()}}>
                                Salvar
                            </Button>
                            <Button variant="secondary" onClick={() => setIsUpdated(false)}>
                                Fechar
                            </Button>
                    </Modal.Footer>
                </Form>
            </Modal>




        </Container>
    );
}
