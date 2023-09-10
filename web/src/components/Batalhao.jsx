import { useState } from "react";
import { Button, Card, Form, Modal, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { Input } from "./Input";

export function Batalhao(props) {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [isUpdated, setIsUpdated] = useState(false);

    async function editBatalhao(data) {
        await props.editBatalhao({ ...data, id: props.batalhao.id });
        setIsUpdated(false);
    }

    return (
        <>
            <Card className="mb-3 p-3 bg-light">
                <Card.Title><strong>Nome: </strong>{props.batalhao.nome}</Card.Title>
                <Card.Text><strong>CRN: </strong>{props.batalhao.crn}</Card.Text>
                <Row xs="auto" className="d-flex justify-content-end">
                    <Button variant="secondary" onClick={() => setIsUpdated(true)}>Editar</Button>
                    <Button
                        variant="outline-danger"
                        className="ms-3"
                        onClick={props.removeBatalhao}
                    >
                        Apagar
                    </Button>
                </Row>
            </Card>
            <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
                <Modal.Header>
                    <Modal.Title>Editar batalhão: {props.batalhao.nome}</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(editBatalhao)} validated={!!errors}>
                    {/* <Modal.Body>
                        <Input
                            className="mb-3"
                            type='text'
                            defaultValue={props.batalhao.nome}
                            label='Nome do batalhão'
                            placeholder='Insira o nome do batalhão'
                            required={true}
                            name='nameBatalhao'
                            error={errors.nameBatalhao}
                            validations={register('nameBatalhao', {
                                required: {
                                    value: true,
                                    message: 'Nome do batalhão é obrigatório.'
                                }
                            })}
                        />
                        <Input
                            className="mb-3"
                            type='text'
                            defaultValue={props.batalhao.crn}
                            label='CRN do batalhão'
                            placeholder='Insira o crn do batalhão'
                            required={true}
                            name='crnBatalhao'
                            error={errors.crnBatalhao}
                            validations={register('crnBatalhao', {
                                required: {
                                    value: true,
                                    message: 'CRN do batalhão é obrigatório.'
                                }
                            })}
                        />
                    </Modal.Body> */}


                    <Modal.Body className="py-3 mb-3 caixa-pesquisa bg-light">

                    <Row>
                        <Col md='8'>
                            <Form.Group controlId="searchQuery">
                                <Form.Label className="mb-0">Nome do Batalhão</Form.Label>
                                {/* <Form.Control
                                    type="text"
                                    placeholder="Digite a consulta"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                /> */}
                                <Input
                                    className="mb-3"
                                    type='text'
                                    defaultValue={props.batalhao.nome_batalhao}
                                    label=''
                                    placeholder='Insira o nome do Batalhão'
                                    required={true}
                                    name='nomeBatalhao'
                                    error={errors.nomeBatalhao}
                                    validations={register('nomeBatalhao', {
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
                                <Form.Label className="mb-0">Comandante</Form.Label>
                                <Input
                                    className="mb-3"
                                    type='text'
                                    defaultValue={props.batalhao.comandante}
                                    label=''
                                    placeholder='Comandante'
                                    required={true}
                                    name='comandante'
                                    error={errors.comandante}
                                    validations={register('comandante', {
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
                                <Form.Label className="mb-0">Data de Fundação</Form.Label>
                                <Input
                                    className="mb-3"
                                    type='date'
                                    defaultValue={props.batalhao.data_fundacao}
                                    label=''
                                    placeholder='Data de fundacao do Batalhão'
                                    required={true}
                                    name='dataFundacao'
                                    error={errors.dataFundacao}
                                    validations={register('dataFundacao', {
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
                                <Form.Label className="mb-0">Tipo de Batalhão:</Form.Label>
                                <Input
                                    className="mb-3"
                                    type='text'
                                    defaultValue={props.batalhao.tipo}
                                    label=''
                                    placeholder='Tipo do Batalhão'
                                    required={true}
                                    name='tipo'
                                    error={errors.tipo}
                                    validations={register('tipo', {
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
                                <Form.Label className="mb-0">Nº de Efetivo:</Form.Label>
                                <Input
                                    className="mb-3"
                                    type='number'
                                    defaultValue={props.batalhao.efetivo}
                                    label=''
                                    placeholder='Efetivo do Batalhão'
                                    required={true}
                                    name='efetivo'
                                    error={errors.efetivo}
                                    validations={register('efetivo', {
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
                                <Form.Label className="mb-0">Comando Regional:</Form.Label>
                                <Input
                                    className="mb-3"
                                    type='text'
                                    defaultValue={props.batalhao.comando_regional}
                                    label=''
                                    placeholder='Insira o nome CR do Batalhão'
                                    required={true}
                                    name='comandoRegional'
                                    error={errors.comandoRegional}
                                    validations={register('comandoRegional', {
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
                        <Col>
                            <Form.Group controlId="searchQuery">
                                <Form.Label className="mb-0">Missões e Valores</Form.Label>
                                <Input
                                    className="mb-3"
                                    type='text'
                                    defaultValue={props.batalhao.missao_valores}
                                    label=''
                                    placeholder='Insira missão e valor'
                                    required={false}
                                    name='missaoValores'
                                    error={errors.missaoValores}
                                    validations={register('missaoValores', {
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
                        <Col>
                            <Form.Group controlId="searchQuery">
                                <Form.Label className="mb-0">Contato (E-mail e telefone)</Form.Label>
                                <Input
                                    className="mb-3"
                                    type='text'
                                    defaultValue={props.batalhao.contato}
                                    label=''
                                    placeholder='Insira o nome do Batalhão'
                                    required={true}
                                    name='contato'
                                    error={errors.contato}
                                    validations={register('contato', {
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
                                <Form.Label className="mb-0">Status</Form.Label>
                                <Input
                                    className="mb-3"
                                    type='text'
                                    defaultValue={props.batalhao.status}
                                    label=''
                                    placeholder='Insira status do Batalhão'
                                    required={true}
                                    name='statusC'
                                    error={errors.statusC}
                                    validations={register('statusC', {
                                        required: {
                                            value: true,
                                            message: 'Nome do batalhão é obrigatório.'
                                        }
                                    })}
                                />
                            </Form.Group>
                        </Col>
                        <Col md='6'>
                            <Form.Group controlId="searchQuery">
                                <Form.Label className="mb-0">Região de atuação</Form.Label>
                                <Input
                                    className="mb-3"
                                    type='number'
                                    defaultValue={props.batalhao.id_regiao}
                                    label=''
                                    placeholder='Insira o Comando Regional do Batalhão'
                                    required={true}
                                    name='idRegiao'
                                    error={errors.idRegiao}
                                    validations={register('idRegiao', {
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
                        <Button variant="primary" type="submit">
                            Editar
                        </Button>
                        <Button variant="secondary" onClick={() => setIsUpdated(false)}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}
