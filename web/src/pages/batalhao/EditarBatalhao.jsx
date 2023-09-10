import { useEffect, useState } from "react";
import { Container, Button, Col, Form, Modal, Row, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { Input } from "../../components/Input";

import { useNavigate, useParams } from "react-router-dom";
import { createBatalhao, deleteBatalhao, getBatalhoes, updateBatalhao } from "../../services/batalhao-service";
import { Header } from "../../components/Header";

export function EditarBatalhao(props) {
    const { handleSubmit, register, formState: { errors } } = useForm();
    
    const [batalhaoEdit, setBatalhaoEdit] = useState([]);
    const { idBatalhao } = useParams();

    useEffect(() => {
        var jsonBatalhaoEdit = window.localStorage.getItem('batalhaoEditar')
        var batalhaoEditar = JSON.parse(jsonBatalhaoEdit);
        setBatalhaoEdit(batalhaoEditar);
        // eslint-disable-next-line
    }, []);
    const navigate = useNavigate();

    
    async function editBatalhao(data) {
        try {
            await updateBatalhao({
                id: batalhaoEdit.id,
                nomeBatalhao: data.nomeBatalhao,
                dataFundacao: data.dataFundacao,
                comandante: data.comandante,
                tipo: data.tipo,
                efetivo: data.efetivo,
                missaoValores: data.missaoValores,
                contato: data.contato,
                comandoRegional: data.comandoRegional,
                status: data.statusC,
                idRegiao: data.idRegiao
            });
            await navigate('/batalhoes');
        } catch (error) {
            console.error(error);
        }
    }




    const cancel = ()=> {
        window.localStorage.removeItem('batalhaoEditar')
        navigate('/batalhoes')
    }


    return (
        <Container fluid className="cor-page min-height ">
            <Row className="justify-content-between p-4 align-items-center">
                <Col md='6' xs='7' className="">
                    <Header title="Atualização de Batalhões"  />
                </Col>

            </Row>


            <Card.Title><strong>Nome: </strong>{batalhaoEdit.nome_batalhao}</Card.Title>
            
            <Form className="mx-4 pb-3" validate onSubmit={handleSubmit(editBatalhao)} validated={!!errors}>
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
                                    defaultValue={batalhaoEdit.nome_batalhao}
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
                                    defaultValue={batalhaoEdit.comandante}
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
                                    defaultValue={batalhaoEdit.data_fundacao}
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
                                    defaultValue={batalhaoEdit.tipo}
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
                                    defaultValue={batalhaoEdit.efetivo}
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
                                    defaultValue={batalhaoEdit.comando_regional}
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
                                    defaultValue={batalhaoEdit.missao_valores}
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
                                    defaultValue={batalhaoEdit.contato}
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
                                    defaultValue={batalhaoEdit.status}
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
                                    defaultValue={batalhaoEdit.id_regiao}
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
