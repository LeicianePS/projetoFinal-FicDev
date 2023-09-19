import { useState } from "react";
import { Container, Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { Input } from "../../components/Input";

import { useNavigate } from "react-router-dom";
import { createUsuario} from "../../services/usuario-service";
import { Header } from "../../components/Header";
import AlertaFeedback from "../../components/layout/Alert";

export function AdicionarUsuario(props) {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [alerta, setAlerta] = useState({});
    const [show, setShow] = useState(false);


    const navigate = useNavigate();

    async function addUsuario(data) {
        try {
            const result = await createUsuario(data);
            setAlerta(result.data);
            setShow(true);

            setTimeout(() => {
                navigate('/usuarios');
            }, 1500);
        } catch (error) {
            console.error(error);
            setAlerta(error.response.data);
            setShow(true);
        }
    }

    const cancel = () => {
        navigate('/usuarios')
    }


    return (
        <Container fluid className="cor-page min-height ">

            { show ?  <AlertaFeedback  setShow={setShow} alerta={alerta}></AlertaFeedback> : <></>  }


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
                                    <Form.Label className="mb-0">E-mail (exemplo@email.com)</Form.Label>
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
                                                message: 'E-mail é obrigatório.'
                                            },
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                message: 'E-mail inválido',
                                            },
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
                                    <Form.Label className="mb-0">CPF (ex. 999.999.999-99)</Form.Label>
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
                                                message: 'CPF é obrigatório.'
                                            },
                                            pattern: {
                                                value: /\d{3}\.\d{3}\.\d{3}-\d{2}/, // Expressão regular para CPF
                                                message: 'CPF inválido', // Mensagem de erro para CPF inválido
                                            },

                                        })}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md='3'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">Telefone (ex. (XX) XXXX-XXXX)</Form.Label>
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
                                                message: 'Telefone é obrigatório.'
                                            },
                                            pattern: {
                                                value: /^(?:\(\d{2}\)\s?|\d{2}\s?)?\d{4,5}-\d{4}$/,
                                                message: 'Telefone inválido',
                                            },
                                            
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
                                                message: 'Matrícula é obrigatório.'
                                            },
                                            maxLength: {
                                                value: 8, // Defina o número máximo de caracteres permitidos aqui
                                                message: 'A matrícula deve ter no máximo 8 caracteres.',
                                            },
                                        })}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md='3'>
                                {/* <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">Perfil</Form.Label>
                                    <Form.Select
                                    aria-label="Perfil do Usuário"
                                    name='perfil'
                                    error={errors.perfil}
                                    {...register('perfil', {
                                        required: {
                                        value: true,
                                        message: 'Perfil do usuário é obrigatório.'
                                        }
                                    })}
                                    >
                                    <option value="">Selecione uma região</option>
                                    <option value="admin">Administrador</option>
                                    <option value="gestor">Gestor</option>
                                    </Form.Select>
                                </Form.Group> */}
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
