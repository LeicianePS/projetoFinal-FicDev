import { useEffect, useState } from "react";
import { Container, Button, Col, Form, Modal, Row, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { Input } from "../../components/Input";

import { useNavigate, useParams } from "react-router-dom";
import { createRegiao, deleteRegiao, getRegioes, updateRegiao, getRegiaoById } from "../../services/regiao-service";
import { Header } from "../../components/Header";

export function EditarRegiao(props) {
    const { handleSubmit, register, formState: { errors } } = useForm();
    
    const { id } = useParams();
    const [regiaoEdit, setRegiaoEdit] = useState([]);

    useEffect(() => {
        // var jsonRegiaoEdit = window.localStorage.getItem('regiaoEditar')
        // var regiaoEditar = JSON.parse(jsonRegiaoEdit);
        // setRegiaoEdit(regiaoEditar);


        async function fetchRegiao() {
          try {
            const response = await getRegiaoById(id);
            setRegiaoEdit(response.data);
          } catch (error) {
            console.error(error);
          }
        }
    
        fetchRegiao(); // Chame a função assíncrona imediatamente
      }, [id]);

    const navigate = useNavigate();

    
    async function editRegiao(data) {
        try {
            await updateRegiao({
                id: regiaoEdit.id_regiao,
                nomeRegiao: data.nomeRegiao,
                populacao: data.populacao,
                cidadesJurisdicao: data.cidadesJurisdicao,
            });
            await navigate('/regioes');
        } catch (error) {
            console.error(error);
        }
    }




    const cancel = ()=> {
        window.localStorage.removeItem('regiaoEditar')
        navigate('/regioes')
    }


    return (
        <Container fluid className="cor-page min-height ">
            <Row className="justify-content-between p-4 align-items-center">
                <Col md='6' xs='7' className="">
                    <Header title="Atualizar Região"  />
                </Col>

            </Row>


            <Card.Title className="mx-4 pb-3"><strong>Nome: </strong>{regiaoEdit.nome_regiao}</Card.Title>
            
            <Form className="mx-4 pb-3" validate onSubmit={handleSubmit(editRegiao)} validated={!!errors}>
            <Modal.Body className="py-3 mb-3 caixa-pesquisa bg-light">

                <Row>
                    <Col md='8'>
                        <Form.Group controlId="searchQuery">
                            <Form.Label className="mb-0">Nome da Região</Form.Label>
                            <Input
                                className="mb-3"
                                type='text'
                                defaultValue={regiaoEdit.nome_regiao}
                                label=''
                                placeholder='Insira o nome da Região'
                                required={true}
                                name='nomeRegiao'
                                error={errors.nomeRegiao}
                                validations={register('nomeRegiao', {
                                    required: {
                                        value: true,
                                        message: 'Nome da região é obrigatório.'
                                    }
                                })}
                            />
                        </Form.Group>
                    </Col>
                    <Col md='4'>
                        <Form.Group controlId="searchQuery">
                            <Form.Label className="mb-0">População</Form.Label>
                            <Input
                                className="mb-3"
                                type='number'
                                defaultValue={regiaoEdit.populacao}
                                label=''
                                placeholder='Comandante'
                                required={true}
                                name='populacao'
                                error={errors.populacao}
                                validations={register('populacao', {
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
                    <Col md='12'>
                        <Form.Group controlId="searchQuery">
                            <Form.Label className="mb-0">Jurisdição:</Form.Label>
                            <Input
                                className="mb-3"
                                type='text'
                                defaultValue={regiaoEdit.cidadesbairros_atuacao}
                                label=''
                                placeholder='Jurisdição'
                                required={true}
                                name='cidadesJurisdicao'
                                error={errors.cidadesJurisdicao}
                                validations={register('cidadesJurisdicao', {
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
