import { useState } from "react";
import { Container, Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { Input } from "../../components/Input";

import { useNavigate } from "react-router-dom";
import { createUsuario} from "../../services/usuario-service";
import { Header } from "../../components/Header";

export function AdicionarUsuario(props) {
    const { handleSubmit, register, formState: { errors } } = useForm();
    
 
    const navigate = useNavigate();

    async function addUsuario(data) {
        try {
            await createUsuario(data);
            navigate('/usuarios');
        } catch (error) {
            console.error(error);
        }
    }

    const cancel = () => {
        navigate('/usuarios')
    }


    return (
        <Container fluid className="cor-page min-height ">
            <Row className="justify-content-between p-4 align-items-center">
                <Col md='6' xs='7' className="">
                    <Header title="Cadastro de Usuários"  />
                </Col>
                {/* <Col className="d-flex justify-content-end">
                    <Button className="align-items-center" onClick={() => setIsCreated(true)}>
                        <Link to="/usuario-adicionar">Adicionar <b ><FaPlus/></b> </Link>
                    </Button>
                  
                </Col> */}
            </Row>


            
            <Form className="mx-2 pb-3" validate onSubmit={handleSubmit(addUsuario)} validated={!!errors}>
                    <Modal.Body className="py-3 mb-3 caixa-pesquisa bg-light">

                        <Row>
                            <Col md='6'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">Nome do Usuário</Form.Label>
                                    <Input
                                        className="mb-3"
                                        type='text'
                                        label=''
                                        placeholder='Insira o nome do Usuário'
                                        required={true}
                                        name='nome'
                                        error={errors.nome}
                                        validations={register('nome', {
                                            required: {
                                                value: true,
                                                message: 'Nome do usuário é obrigatório.'
                                            }
                                        })}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md='6'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">E-mail</Form.Label>
                                    <Input
                                        className="mb-3"
                                        type='email'
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
                        </Row>


                        <Row>
                            {/* <Col md='3'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">Senha</Form.Label>
                                    <Input
                                        className="mb-3"
                                        type='text'
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
                                    <Form.Label className="mb-0">CPF</Form.Label>
                                    <Input
                                        className="mb-3"
                                        type='text'
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
                            <Col md='3'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">Telefone</Form.Label>
                                    <Input
                                        className="mb-3"
                                        type='text'
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
                                    <Form.Label className="mb-0">Matrícula</Form.Label>
                                    <Input
                                        className="mb-3"
                                        type='text'
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
