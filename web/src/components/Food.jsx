import { useState } from "react";
import { Button, Card, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { Input } from "./Input";

export function Food(props) {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [isUpdated, setIsUpdated] = useState(false);

    async function editFood(data) {
        await props.editFood({ ...data, id: props.food.id });
        setIsUpdated(false);
    }

    return (
        <>
            <Card className="mb-3 p-3 bg-light">
                <Card.Title><strong>Nome: </strong>{props.food.nome}</Card.Title>
                <Card.Text><strong>Unidade de medida: </strong>{props.food.unidadeMedida}</Card.Text>
                <Row xs="auto" className="d-flex justify-content-end">
                    <Button variant="secondary" onClick={() => setIsUpdated(true)}>Editar</Button>
                    <Button
                        variant="outline-danger"
                        className="ms-3"
                        onClick={props.removeFood}
                    >
                        Apagar
                    </Button>
                </Row>
            </Card>
            <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
                <Modal.Header>
                    <Modal.Title>Editar alimento: {props.food.nome}</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(editFood)} validated={!!errors}>
                    <Modal.Body>
                        <Input
                            className="mb-3"
                            type='text'
                            defaultValue={props.food.nome}
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
                            <Form.Select {...register('unity')} defaultValue={props.food.unidadeMedida}>
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
