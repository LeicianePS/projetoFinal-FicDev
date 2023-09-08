import { Container, Col, Modal, Form, Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';

import { Food } from "../components/Food";
import { Header } from "../components/Header";
import { Input } from '../components/Input';

import { createFood, deleteFood, getFoods, updateFood } from "../services/food-service";

export function Foods() {
    const [foods, setFoods] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
    const { handleSubmit, register, formState: { errors } } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        findFoods();
        // eslint-disable-next-line
    }, []);

    async function findFoods() {
        try {
            const result = await getFoods();
            setFoods(result.data);
        } catch (error) {
            console.error(error);
            navigate('/');
        }
    }

    async function removeFood(id) {
        try {
            await deleteFood(id);
            await findFoods();
        } catch (error) {
            console.error(error);
        }
    }

    async function addFood(data) {
        try {
            await createFood(data);
            setIsCreated(false);
            await findFoods();
        } catch (error) {
            console.error(error);
        }
    }

    async function editFood(data) {
        try {
            await updateFood({
                id: data.id,
                nameFood: data.nameFood,
                unity: data.unity
            });
            await findFoods();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container fluid className="cor-page min-height">
            <Header title="Alimentos" />
            <Row>
                <Col md='10'>
                    <Button onClick={() => setIsCreated(true)}>Criar novo alimento</Button>
                </Col>
                <Col>
                    <Button variant="outline-secondary" onClick={() => {
                        sessionStorage.removeItem('token');
                        navigate('/');
                    }}>Sair</Button>
                </Col>
            </Row>
            <Col className="w-50 m-auto">
                {foods && foods.length > 0
                    ? foods.map((food, index) => (
                        <Food
                            key={index}
                            food={food}
                            removeFood={async () => await removeFood(food.id)}
                            editFood={editFood}
                        />
                    ))
                    : <p className="text-center">Não existe nenhum alimento cadastrado!</p>}
            </Col>
            {/* Formulário dentro do Modal, ideal seria componentizar também, pois é parecido com o Modal de editar */}
            <Modal show={isCreated} onHide={() => setIsCreated(false)}>
                <Modal.Header>
                    <Modal.Title>Cadastrar novo alimento</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(addFood)} validated={!!errors}>
                    <Modal.Body>
                        <Input
                            className="mb-3"
                            type='text'
                            label='Nome do alimento'
                            placeholder='Insira o nome do alimento'
                            required={true}
                            name='nameFood'
                            error={errors.nameFood}
                            validations={register('nameFood', {
                                required: {
                                    value: true,
                                    message: 'Nome do alimento é obrigatório.'
                                }
                            })}
                        />
                        <Form.Group>
                            <Form.Label>Seleciona a unidade de medida</Form.Label>
                            <Form.Select {...register('unity')}>
                                <option disabled>Clique para selecionar</option>
                                <option value={'Kilograma'}>Kilograma</option>
                                <option value={'Grama'}>Grama</option>
                                <option value={'Mililitro'}>Mililitro</option>
                                <option value={'Litro'}>Litro</option>
                            </Form.Select>
                        </Form.Group>
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
