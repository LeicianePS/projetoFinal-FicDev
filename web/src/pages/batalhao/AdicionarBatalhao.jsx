import { useState, useEffect } from "react";
import { Container, Button, Col, Form, Modal, Row, FloatingLabel } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { Input } from "../../components/Input";

import { useNavigate } from "react-router-dom";
import { createBatalhao } from "../../services/batalhao-service";
import {  getRegioes } from "../../services/regiao-service";

import { Header } from "../../components/Header";
import AlertaFeedback from "../../components/layout/Alert";

export function AdicionarBatalhao(props) {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [regioes, setRegioes] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [show, setShow] = useState(false);

    useEffect(() => {
        findRegioes();

        // eslint-disable-next-line
    }, []);
    async function findRegioes() {
        try {
            const result = await getRegioes();
            setRegioes(result.data);
        } catch (error) {
            console.error(error);
            navigate('/');
        }
    }

    const navigate = useNavigate();

    async function addBatalhao(data) {
        try {
            const result = await createBatalhao(data);
            setAlerta(result.data);
            setShow(true);

            setTimeout(() => {
                navigate('/batalhoes');
            }, 1500);
        } catch (error) {
            console.error(error);
        }
    }

    const cancel = () => {
        navigate('/batalhoes')
    }


    return (
        <Container fluid className="cor-page min-height ">

            { show ?  <AlertaFeedback  setShow={setShow} alerta={alerta}></AlertaFeedback> : <></>  }


            <Row className="justify-content-between p-4 align-items-center">
                <Col md='6' xs='7' className="">
                    <Header title="Cadastro de Batalhões"  />
                </Col>
                {/* <Col className="d-flex justify-content-end">
                    <Button className="align-items-center" onClick={() => setIsCreated(true)}>
                        <Link to="/batalhao-adicionar">Adicionar <b ><FaPlus/></b> </Link>
                    </Button>

                </Col> */}
            </Row>



            <Form className="mx-4 pb-3" noValidate onSubmit={handleSubmit(addBatalhao)} validated={!!errors}>
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

                                    placeholder='Comandante'
                                    required={true}
                                    name='comandante'
                                    error={errors.comandante}
                                    validations={register('comandante', {
                                        required: {
                                            value: true,
                                            message: 'Comandante é obrigatório.'
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
                                    label=''
                                    placeholder='Data de fundacao do Batalhão'
                                    required={true}
                                    name='dataFundacao'
                                    error={errors.dataFundacao}
                                    validations={register('dataFundacao', {
                                        required: {
                                            value: true,
                                            message: 'Data de Fundação é obrigatório.'
                                        }
                                    })}
                                />
                            </Form.Group>
                        </Col>
                        <Col md='3'>
                            <Form.Group controlId="searchQuery">
                                <Form.Label className="mb-0">Tipo de Batalhão:</Form.Label>
                                <Form.Select
                                    size="lg"
                                    className="mb-3"
                                    aria-label="Selecione um tipo"
                                    type='text'
                                    label=''
                                    placeholder='Tipo do Batalhão'
                                    required={true}
                                    name='tipo'
                                    error={errors.tipo}
                                    {...register('tipo', {
                                        required: {
                                        value: true,
                                        message: 'Tipo é obrigatóriao'
                                        }
                                    })}
                                >
                                    <option value="">Selecione um tipo</option>
                                    <option value="PM"> Polícia Militar </option>
                                    <option value="CBM">Corpo de Bombeiros Militar</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md='3'>
                            <Form.Group controlId="searchQuery">
                                <Form.Label className="mb-0">Nº de Efetivo:</Form.Label>
                                <Input
                                    className="mb-3"
                                    type='number'
                                    label=''
                                    placeholder='Efetivo do Batalhão'
                                    required={true}
                                    name='efetivo'
                                    error={errors.efetivo}
                                    validations={register('efetivo', {
                                        required: {
                                            value: true,
                                            message: 'Efetivo é obrigatório.'
                                        }
                                    })}
                                />
                            </Form.Group>
                        </Col>
                        <Col md='3'>
                            <Form.Group controlId="searchQuery">
                                <Form.Label className="mb-0">Comando Regional:</Form.Label>
                                {/* <Input
                                    className="mb-3"
                                    type='text'
                                    label=''
                                    placeholder='Insira o nome CR do Batalhão'
                                    required={true}
                                    name='comandoRegional'
                                    error={errors.comandoRegional}
                                    validations={register('comandoRegional', {
                                        required: {
                                            value: true,
                                            message: 'Comando Regional é obrigatório.'
                                        }
                                    })}
                                /> */}
                                    <Form.Select
                                    size="lg"
                                    className="mb-3"
                                    aria-label="Selecione um Comando Regional"
                                    type='text'
                                    label=''
                                    placeholder='Comando Regional do Batalhão'
                                    required={true}
                                    name='comandoRegional'
                                    error={errors.tipo}
                                    {...register('comandoRegional', {
                                        required: {
                                        value: true,
                                        message: 'Comando Regional é obrigatóriao'
                                        }
                                    })}
                                >
                                    <option value="">Selecione um Comando Regional</option>
                                    <option value="Comando Regional 01"> Comando Regional 01 </option>
                                    <option value="Comando Regional 02"> Comando Regional 02 </option>
                                    <option value="Comando Regional 03"> Comando Regional 03 </option>
                                    <option value="Comando Regional 04"> Comando Regional 04 </option>
                                    <option value="Comando Regional 05"> Comando Regional 05 </option>
                                    <option value="Comando Regional 06"> Comando Regional 06 </option>
                                    <option value="Comando Regional 07"> Comando Regional 07 </option>
                                    <option value="Comando Regional 08"> Comando Regional 01 </option>
                                    <option value="Comando Regional 09"> Comando Regional 09 </option>
                                    <option value="Comando Regional 10"> Comando Regional 10 </option>
                                    <option value="Comando Regional 11"> Comando Regional 11 </option>
                                    <option value="Comando Regional 12"> Comando Regional 12 </option>
                                    <option value="Comando Regional 13"> Comando Regional 13 </option>
                                    <option value="Comando Regional 14"> Comando Regional 14 </option>
                                    <option value="Comando Regional 15"> Comando Regional 15 </option>

                                </Form.Select>

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
                                    label=''
                                    placeholder='Insira missão e valor'
                                    required={false}
                                    name='missaoValores'
                                    error={errors.missaoValores}
                                    validations={register('missaoValores', {
                                        required: {
                                            value: true,
                                            message: 'Missões e Valores é obrigatório.'
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
                                    label=''
                                    placeholder='Insira o nome do Batalhão'
                                    required={true}
                                    name='contato'
                                    error={errors.contato}
                                    validations={register('contato', {
                                        required: {
                                            value: true,
                                            message: 'Contato é obrigatório.'
                                        }
                                    })}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        {/* <Col md='6'>
                            <Form.Group controlId="searchQuery">
                                <Form.Label className="mb-0">Status</Form.Label>
                                <Input
                                    className="mb-3"
                                    type='text'
                                    label=''
                                    placeholder='Insira status do Batalhão'
                                    required={true}
                                    name='statusC'
                                    error={errors.statusC}
                                    validations={register('statusC', {
                                        required: {
                                            value: true,
                                            message: 'Status é obrigatório.'
                                        }
                                    })}
                                />
                            </Form.Group>
                        </Col> */}
                        <Col md='3'>
                            <Form.Group controlId="searchQuery">
                                <Form.Label className="mb-0">Status</Form.Label>
                                {/* Use o Form.Select para selecionar a região */}
                                <Form.Select
                                    size="lg"
                                    aria-label="Selecione um status"
                                    type='text'
                                    name='statusC'
                                    placeholder='Insira status do Batalhão'
                                    error={errors.statusC}
                                    {...register('statusC', {
                                        required: {
                                        value: true,
                                        message: 'Status é obrigatóriao'
                                        }
                                    })}
                                >
                                    <option value="">Selecione um status</option>
                                    <option value="ativo" > ativo </option>
                                    <option value="inativo"> inativo </option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        {/* <Col md='3'>
                            <Form.Group controlId="searchQuery">
                                <Form.Label className="mb-0">Região de atuação</Form.Label>
                                <Input
                                    className="mb-3"
                                    type='number'
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
                        </Col> */}

                        {/* <Col md='3'>
                            <Form.Group controlId="searchQuery">
                                <Form.Label className="mb-0">Região de atuação</Form.Label>
                                <Form.Select aria-label="Floating label select example" >
                                    <option value="">Selecione uma região</option>
                                    {regioes.map((regiao, index) => (
                                        <option key={index} value={regiao.id_regiao}>
                                            {regiao.nome_regiao}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col> */}

                        <Col md='3'>
                            <Form.Group controlId="searchQuery">
                                <Form.Label className="mb-0">Região de Atuação</Form.Label>
                                {/* Use o Form.Select para selecionar a região */}
                                <Form.Select
                                size="lg"
                                aria-label="Selecione uma região"
                                name='idRegiao'
                                error={errors.idRegiao}
                                {...register('idRegiao', {
                                    required: {
                                    value: true,
                                    message: 'Região de atuação é obrigatória.'
                                    }
                                })}
                                >
                                <option value="">Selecione uma região</option>
                                {regioes.map((regiao, index) => (
                                    <option key={index} value={regiao.id_regiao}>
                                    {regiao.nome_regiao}
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
