import { useState } from "react";
import { Button, Card, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { Input } from "./Input";

export function Nutricionista(props) {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [isUpdated, setIsUpdated] = useState(false);

    async function editNutricionista(data) {
        await props.editNutricionista({ ...data, id: props.nutricionista.id });
        setIsUpdated(false);
    }

    return (
        <>
            <Card className="mb-3 p-3 bg-light">
                <Card.Title><strong>Nome: </strong>{props.nutricionista.nome}</Card.Title>
                <Card.Text><strong>CRN: </strong>{props.nutricionista.crn}</Card.Text>
                <Row xs="auto" className="d-flex justify-content-end">
                    <Button variant="secondary" onClick={() => setIsUpdated(true)}>Editar</Button>
                    <Button
                        variant="outline-danger"
                        className="ms-3"
                        onClick={props.removeNutricionista}
                    >
                        Apagar
                    </Button>
                </Row>
            </Card>
            <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
                <Modal.Header>
                    <Modal.Title>Editar nutricionista: {props.nutricionista.nome}</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(editNutricionista)} validated={!!errors}>
                    <Modal.Body>
                        <Input
                            className="mb-3"
                            type='text'
                            defaultValue={props.nutricionista.nome}
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
                            defaultValue={props.nutricionista.crn}
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
