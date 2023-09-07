import { useState } from "react";
import { Button, Card, Form, Modal, Row } from "react-bootstrap";
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
                    <Modal.Body>
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
