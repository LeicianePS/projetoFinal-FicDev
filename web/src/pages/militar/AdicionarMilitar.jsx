import { useEffect, useState } from "react";
import { Container, Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { Input } from "../../components/Input";
import {  getBatalhoes } from "../../services/batalhao-service";
import { useNavigate } from "react-router-dom";
import { createMilitar} from "../../services/militar-service";
import { Header } from "../../components/Header";
import AlertaFeedback from "../../components/layout/Alert";

export function AdicionarMilitar(props) {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [batalhoes, setBatalhoes] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [show, setShow] = useState(false);

    useEffect(() => {
        findBatalhoes();

        // eslint-disable-next-line
    }, []);
    async function findBatalhoes() {
        try {
            const result = await getBatalhoes();
            setBatalhoes(result.data);
        } catch (error) {
            console.error(error);
            navigate('/');
        }
    }


    const navigate = useNavigate();

    async function addMilitar(data) {
        try {
            const result = await createMilitar(data);
            setAlerta(result.data);
            setShow(true);

            setTimeout(() => {
                navigate('/militares');
            }, 1500);
        } catch (error) {
            console.error(error);
            setAlerta(error.response.data);
            setShow(true);
        }
    }

    const cancel = () => {
        navigate('/militares')
    }


    return (
        <Container fluid className="cor-page min-height ">

            { show ?  <AlertaFeedback  setShow={setShow} alerta={alerta}></AlertaFeedback> : <></>  }


            <Row className="justify-content-between p-4 align-items-center">
                <Col md='6' xs='7' className="">
                    <Header title="Cadastro de Militares"  />
                </Col>
                {/* <Col className="d-flex justify-content-end">
                    <Button className="align-items-center" onClick={() => setIsCreated(true)}>
                        <Link to="/militar-adicionar">Adicionar <b ><FaPlus/></b> </Link>
                    </Button>

                </Col> */}
            </Row>



            <Form className="mx-2 pb-3" validate onSubmit={handleSubmit(addMilitar)} validated={!!errors}>
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
                                    <Form.Label className="mb-0">Data de Nascimento</Form.Label>
                                    <Input
                                        className="mb-3"
                                        type='date'
                                        label=''
                                        placeholder='Data de Nascimento'
                                        required={true}
                                        name='nascimento'
                                        error={errors.nascimento}
                                        validations={register('nascimento', {
                                            required: {
                                                value: true,
                                                message: 'Data de Nascimento é obrigatório.'
                                            },
                                           

                                        })}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md='3'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">Posto</Form.Label>
                                    <Input
                                        className="mb-3"
                                        type='text'
                                        label=''
                                        placeholder='Posto'
                                        required={true}
                                        name='posto'
                                        error={errors.posto}
                                        validations={register('posto', {
                                            required: {
                                                value: true,
                                                message: 'Posto é obrigatório.'
                                            },
                                            
                                        })}
                                    />
                                </Form.Group>

                            </Col>
                            <Col md='3'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">Salário Atual</Form.Label>
                                    <Input
                                        className="mb-3"
                                        type="flot"
                                        label=''
                                        placeholder='Salário Atual'
                                        required={true}
                                        name='salarioAtual'
                                        error={errors.salarioAtual}
                                        validations={register('salarioAtual', {
                                            required: {
                                                value: true,
                                                message: 'Salário Atual é obrigatório.'
                                            }
                                        })}
                                    />
                                </Form.Group>
                            </Col>

                        </Row>


                        <Row>


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
                            <Form.Group controlId="searchQuery">
                                <Form.Label className="mb-0">Batalhão</Form.Label>
                                {/* Use o Form.Select para selecionar a região */}
                                <Form.Select
                                size="lg"
                                aria-label="Selecione um batalhão"
                                name='idBatalhao'
                                error={errors.idBatalhao}
                                {...register('idBatalhao', {
                                    required: {
                                    value: true,
                                    message: 'Batalhão de atuação é obrigatório.'
                                    }
                                })}
                                >
                                <option value="">Selecione um batalhão</option>
                                {batalhoes.map((batalhao, index) => (
                                    <option key={index} value={batalhao.id_batalhao}>
                                    {batalhao.nome_batalhao}
                                    </option>
                                ))}
                                </Form.Select>
                            </Form.Group>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={() => cancel()} className="mx-4" size="lg">
                            Cancelar
                        </Button>

                        <Button variant="primary" type="submit" size="lg">
                            Salvar
                        </Button>

                    </Modal.Footer>
                </Form>

        </Container>
    );
}
