import { Container, Col, Modal, Form, Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';

import { Nutricionista } from "../components/Nutricionista";
import { Header } from "../components/Header";
import { Input } from '../components/Input';

import { createNutricionista, deleteNutricionista, getNutricionistas, updateNutricionista } from "../services/nutricionista-service";

export function Nutricionistas() {
    const [nutricionistas, setNutricionistas] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
    const { handleSubmit, register, formState: { errors } } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        findNutricionistas();
        // eslint-disable-next-line
    }, []);

    async function findNutricionistas() {
        try {
            const result = await getNutricionistas();
            setNutricionistas(result.data);
        } catch (error) {
            console.error(error);
            navigate('/');
        }
    }

    async function removeNutricionista(id) {
        try {
            await deleteNutricionista(id);
            await findNutricionistas();
        } catch (error) {
            console.error(error);
        }
    }

    async function addNutricionista(data) {
        try {
            await createNutricionista(data);
            setIsCreated(false);
            await findNutricionistas();
        } catch (error) {
            console.error(error);
        }
    }

    async function editNutricionista(data) {
        try {
            await updateNutricionista({
                id: data.id,
                nameNutricionista: data.nameNutricionista,
                crnNutricionista: data.crnNutricionista
            });
            await findNutricionistas();
        } catch (error) {
            console.error(error);
        }
    }







    return (
        <Container fluid className="cor-page">
            <Header title="Nutricionistas" />
            <Row className="w-50 m-auto mb-5 mt-5 ">
                <Col md='10'>
                    <Button onClick={() => setIsCreated(true)}>Criar novo nutricionista</Button>
                </Col>
                <Col>
                    <Button variant="outline-secondary" onClick={() => {
                        sessionStorage.removeItem('token');
                        navigate('/');
                    }}>Sair</Button>
                </Col>
            </Row>
            <Col className="w-50 m-auto">
                {nutricionistas && nutricionistas.length > 0
                    ? nutricionistas.map((nutricionista, index) => (
                        <Nutricionista
                            key={index}
                            nutricionista={nutricionista}
                            removeNutricionista={async () => await removeNutricionista(nutricionista.id)}
                            editNutricionista={editNutricionista}
                        />
                    ))
                    : <p className="text-center">Não existe nenhum nutricionista cadastrado!</p>}
            </Col>
            {/* Formulário dentro do Modal, ideal seria componentizar também, pois é parecido com o Modal de editar */}
            <Modal show={isCreated} onHide={() => setIsCreated(false)}>
                <Modal.Header>
                    <Modal.Title>Cadastrar novo nutricionista</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(addNutricionista)} validated={!!errors}>
                    <Modal.Body>
                        <Input
                            className="mb-3"
                            type='text'
                            label='Nome do nutricionista'
                            placeholder='Insira o nome do nutricionista'
                            required={true}
                            name='nameNutricionista'
                            error={errors.nameNutricionista}
                            validations={register('nameNutricionista', {
                                required: {
                                    value: true,
                                    message: 'Nome do nutricionista é obrigatório.'
                                }
                            })}
                        />
                        <Input
                            className="mb-3"
                            type='text'
                            label='CRN do nutricionista'
                            placeholder='Insira o crn do nutricionista'
                            required={true}
                            name='crnNutricionista'
                            error={errors.crnNutricionista}
                            validations={register('crnNutricionista', {
                                required: {
                                    value: true,
                                    message: 'CRN do nutricionista é obrigatório.'
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
