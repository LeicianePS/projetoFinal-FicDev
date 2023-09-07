import { Container, Col, Modal, Form, Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';

import { Batalhao } from "../components/Batalhao";
import { Header } from "../components/Header";
import { Input } from '../components/Input';

import { createBatalhao, deleteBatalhao, getBatalhoes, updateBatalhao } from "../services/batalhao-service";

export function Batalhoes() {
    const [batalhoes, setBatalhoes] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
    const { handleSubmit, register, formState: { errors } } = useForm();
    const navigate = useNavigate();

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

    async function removeBatalhao(id) {
        try {
            await deleteBatalhao(id);
            await findBatalhoes();
        } catch (error) {
            console.error(error);
        }
    }

    async function addBatalhao(data) {
        try {
            await createBatalhao(data);
            setIsCreated(false);
            await findBatalhoes();
        } catch (error) {
            console.error(error);
        }
    }

    async function editBatalhao(data) {
        try {
            await updateBatalhao({
                id: data.id,
                nameBatalhao: data.nameBatalhao,
                crnBatalhao: data.crnBatalhao
            });
            await findBatalhoes();
        } catch (error) {
            console.error(error);
        }
    }







    return (
        <Container fluid>
            <Header title="Batalhoes" />
            <Row className="w-50 m-auto mb-5 mt-5 ">
                <Col md='10'>
                    <Button onClick={() => setIsCreated(true)}>Criar novo batalhão</Button>
                </Col>
                <Col>
                    <Button variant="outline-secondary" onClick={() => {
                        sessionStorage.removeItem('token');
                        navigate('/');
                    }}>Sair</Button>
                </Col>
            </Row>
            <Col className="w-50 m-auto">
                {batalhoes && batalhoes.length > 0
                    ? batalhoes.map((batalhao, index) => (
                        <Batalhao
                            key={index}
                            batalhao={batalhao}
                            removeBatalhao={async () => await removeBatalhao(batalhao.id)}
                            editBatalhao={editBatalhao}
                        />
                    ))
                    : <p className="text-center">Não existe nenhum batalhão cadastrado!</p>}
            </Col>
            {/* Formulário dentro do Modal, ideal seria componentizar também, pois é parecido com o Modal de editar */}
            <Modal show={isCreated} onHide={() => setIsCreated(false)}>
                <Modal.Header>
                    <Modal.Title>Cadastrar novo batalhão</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(addBatalhao)} validated={!!errors}>
                    <Modal.Body>
                        <Input
                            className="mb-3"
                            type='text'
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
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Criar
                        </Button>
                        <Button variant="secondary" onClick={() => setIsCreated(false)}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    );
}
