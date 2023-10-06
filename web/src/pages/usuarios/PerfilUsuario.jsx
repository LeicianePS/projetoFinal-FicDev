import { Container, Col, Modal, Row, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { FaEdit, FaPen, FaUser } from 'react-icons/fa';


import { updateUsuario, updateSenhaUsuario, getUsuarioByUserToken } from "../../services/usuario-service";
import AlertaFeedback from "../../components/layout/Alert";

export function PerfilUsuario() {
    const [usuario, setUsuario] = useState({});
    const [alerta, setAlerta] = useState({});
    const [show, setShow] = useState(false);
    const { handleSubmit, register, formState: { errors } } = useForm();

    const param = useParams();

    useEffect( () => {
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


    const [isUpdated, setIsUpdated] = useState(false);
    const [usuarioEdit, setUsuarioEdit] = useState({});

    async function editUsuario() {
        try {
            setIsUpdated(false);
            const result = await updateUsuario({
                id: usuarioEdit.id,
                nome: usuarioEdit.nome,
                cpf: usuarioEdit.cpf,
                email: usuarioEdit.email,
                telefone: usuarioEdit.telefone,
                matricula: usuarioEdit.matricula
            });
            setUsuario(usuarioEdit)
            setAlerta(result.data);
            setShow(true);
        } catch (error) {
            console.error(error);
        }
    }


    const handleClose = () => {
        setShowAtualizarSenha(false);
    };
    const [usuarioSenha, setUsuarioSenha] = useState({})
    const [showAtualizarSenha, setShowAtualizarSenha] = useState(false);
    async function atualizarSenha() {
        try {
            const result = await updateSenhaUsuario({
                id: usuarioSenha.id,
                senha: usuarioSenha.senha,
                novaSenha: usuarioSenha.novaSenha,
                novaSenha2: usuarioSenha.novaSenha2
            });
            setShowAtualizarSenha(false);
            setUsuarioEdit({})

            setAlerta(result.data);
            setShow(true);
        } catch (error) {
            console.error(error);
            setAlerta(error.response.data);
            setShow(true);
            setShowAtualizarSenha(false);
        }
    }

    const abrirModal = ( usuario ) => {
        setIsUpdated(true);
        setUsuarioEdit(usuario)
    }

    const abrirModalSenha = ( usuario ) => {
        setShowAtualizarSenha(true);
        setUsuarioSenha({
            ...usuarioSenha,
            id: usuario.id,
          })
        //setUsuarioSenha(usuario)
    }


    return (
        <Container fluid className="cor-page min-height d-flex justify-content-center align-items-center ">


            <div className="d-flex flex-column align-items-center justify-content-center col-md-8 col-sm-10 m-3 p-0 perfil" variant="outline-danger">
                { show ?  <AlertaFeedback  setShow={setShow} alerta={alerta}></AlertaFeedback> : <></>  }
                <FaUser size="50px" className="mb-3" />
                <h4 className="mb-4"> {usuario.nome} </h4>
                <div className="col-12">
                    <p><strong>Perfil:</strong> {usuario.perfil}</p>
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
                            <Button variant="secondary" onClick={() => setIsUpdated(false)} className="mx-4">
                                Fechar
                            </Button>
                            <Button variant="primary" type="submit" onClick={()=> {editUsuario()}}>
                                Salvar
                            </Button>
                    </Modal.Footer>
                </Form>
            </Modal>



            <Modal show={showAtualizarSenha} onHide={handleClose} size="md">
                <Modal.Header closeButton>
                    <Modal.Title>Atualizar Senha</Modal.Title>
                </Modal.Header>
                <Form className="mx-2 pb-3" validate onSubmit={handleSubmit(()=> {atualizarSenha()})} validated={!!errors}>
                    <Modal.Body className="py-3 mb-3 caixa-pesquisa bg-light " size="md">

                        <Row className="d-flex justify-content-center">
                            <Col md='8'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">Senha Atual</Form.Label>
                                    <Form.Control
                                        className="mb-3"
                                        type='password'
                                        label=''
                                        placeholder='Senha'
                                        required={true}
                                        name='senha'
                                        error={errors.senha}
                                        onChange={(e) =>
                                            setUsuarioSenha({
                                              ...usuarioSenha,
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
                            </Col>
                        </Row>

                        <Row className="d-flex justify-content-center">
                            <Col md='8'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">Nova Senha </Form.Label>
                                    <Form.Control
                                        className="mb-3"
                                        type='password'
                                        label=''
                                        placeholder='Senha'
                                        required={true}
                                        name='novaSenha'
                                        error={errors.novaSenha}
                                        onChange={(e) =>
                                            setUsuarioSenha({
                                              ...usuarioSenha,
                                              novaSenha: e.target.value,
                                            })
                                          }
                                        validations={register('novaSenha', {
                                            required: {
                                                value: true,
                                                message: ' é obrigatório.'
                                            }
                                        })}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="d-flex justify-content-center">

                            <Col md='8'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">Confirmar Nova Senha:</Form.Label>
                                    <Form.Control
                                        className="mb-3"
                                        type='password'
                                        label=''
                                        placeholder='Senha'
                                        required={true}
                                        name='novaSenha2'
                                        error={errors.novaSenha2}
                                        onChange={(e) =>
                                            setUsuarioSenha({
                                              ...usuarioSenha,
                                              novaSenha2: e.target.value,
                                            })
                                          }
                                        validations={register('novaSenha2', {
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
                            <Button variant="secondary" onClick={handleClose} className="mx-4">
                                Fechar
                            </Button>
                            <Button variant="primary" type="submit" onClick={()=> {atualizarSenha()}}>
                                Salvar
                            </Button>
                    </Modal.Footer>
                </Form>
            </Modal>




        </Container>
    );
}
