import { useEffect, useState } from "react";
import { Container, Button, Col, Form, Modal, Row, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { Input } from "../../components/Input";

import { useNavigate, useParams } from "react-router-dom";
import { updateUsuario, getUsuarioById } from "../../services/usuario-service";
import { Header } from "../../components/Header";

export function EditarUsuario(props) {
    const { handleSubmit, register, formState: { errors } } = useForm();
    
    const [usuarioEdit, setUsuarioEdit] = useState([]);
    
    const { id } = useParams();
    useEffect( () => {
        // var jsonUsuarioEdit = window.localStorage.getItem('usuarioEditar')
        // var usuarioEditar = JSON.parse(jsonUsuarioEdit);
        // setUsuarioEdit(usuarioEditar);

        async function fetchUsuario() {
            try {
              const response = await getUsuarioById(id);
              setUsuarioEdit(response.data);
            } catch (error) {
              console.error(error);
            }
        }
      
        fetchUsuario(); // Chame a função assíncrona imediatamente
        
    }, [id]);
    const navigate = useNavigate();

    
    async function editUsuario(data) {
        try {
            await updateUsuario({
                id: usuarioEdit.id,
                nome: data.nome,
                cpf: data.cpf,
                email: data.email,
                senha: data.senha,
                telefone: data.telefone,
                matricula: data.matricula
            });
            await navigate('/usuarios');
        } catch (error) {
            console.error(error);
        }
    }




    const cancel = ()=> {
        //window.localStorage.removeItem('usuarioEditar')
        navigate('/usuarios')
    }


    return (
        <Container fluid className="cor-page min-height ">
            <Row className="justify-content-between p-4 align-items-center">
                <Col md='6' xs='7' className="">
                    <Header title="Atualizar Usuário"  />
                </Col>

            </Row>


            <Card.Title className="mx-4 pb-3"><strong>Nome: </strong>{usuarioEdit.nome}</Card.Title>
            
            <Form className="mx-4 pb-3" validate onSubmit={handleSubmit(editUsuario)} validated={!!errors}>
            <Modal.Body className="py-3 mb-3 caixa-pesquisa bg-light">

                <Row>
                    <Col md='8'>
                        <Form.Group controlId="searchQuery">
                            <Form.Label className="mb-0">Nome do Usuário</Form.Label>
                            <Input
                                className="mb-3"
                                type='text'
                                defaultValue={usuarioEdit.nome}
                                label=''
                                placeholder='Insira o nome do Batalhão'
                                required={true}
                                name='nome'
                                error={errors.nome}
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
                            <Input
                                className="mb-3"
                                type='text'
                                defaultValue={usuarioEdit.cpf}
                                label=''
                                placeholder='Cpf'
                                required={true}
                                name='cpf'
                                error={errors.cpf}
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
                    <Col md='3'>
                        <Form.Group controlId="searchQuery">
                            <Form.Label className="mb-0">E-mail</Form.Label>
                            <Input
                                className="mb-3"
                                type='text'
                                defaultValue={usuarioEdit.email}
                                label=''
                                placeholder='E-mail'
                                required={true}
                                name='email'
                                error={errors.email}
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
                            <Input
                                className="mb-3"
                                type='text'
                                defaultValue={usuarioEdit.senha}
                                label=''
                                placeholder='Senha'
                                required={true}
                                name='senha'
                                error={errors.senha}
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
                            <Input
                                className="mb-3"
                                type='text'
                                defaultValue={usuarioEdit.telefone}
                                label=''
                                placeholder='Telefone'
                                required={true}
                                name='telefone'
                                error={errors.telefone}
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
                            <Input
                                className="mb-3"
                                type='text'
                                defaultValue={usuarioEdit.matricula}
                                label=''
                                placeholder='Matrícula'
                                required={true}
                                name='matricula'
                                error={errors.matricula}
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
                   <Button variant="outline-secondary" onClick={() => cancel()} className="mx-4">
                        Cancelar
                    </Button>

                    <Button variant="primary" type="submit">
                        Salvar
                    </Button>
                    
                </Modal.Footer>
            </Form>

        </Container>
    );
}
