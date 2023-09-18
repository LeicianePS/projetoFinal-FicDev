import { useState } from "react";
import { Container, Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

import { Input } from "../../components/Input";

import { useNavigate } from "react-router-dom";
import { createRegiao } from "../../services/regiao-service";
import { Header } from "../../components/Header";
import AlertaFeedback from "../../components/layout/Alert";

export function AdicionarRegiao(props) {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [alerta, setAlerta] = useState({});
    const [show, setShow] = useState(false);
    
 
    const navigate = useNavigate();

    async function addRegiao(data) {
        try {
            const result = await createRegiao(data);
            setAlerta(result.data);
            setShow(true);

            setTimeout(() => {
                navigate('/regioes');
            }, 2500);
        } catch (error) {
            console.error(error);
        }
    }

    const cancel = () => {
        navigate('/regioes')
    }


    return (
        <Container fluid className="cor-page min-height ">

            { show ?  <AlertaFeedback  setShow={setShow} alerta={alerta}></AlertaFeedback> : <></>  }


            <Row className="justify-content-between p-4 align-items-center">
                <Col md='6' xs='7' className="">
                    <Header title="Cadastro de Regiões"  />
                </Col>
                {/* <Col className="d-flex justify-content-end">
                    <Button className="align-items-center" onClick={() => setIsCreated(true)}>
                        <Link to="/regiao-adicionar">Adicionar <b ><FaPlus/></b> </Link>
                    </Button>
                  
                </Col> */}
            </Row>


            
            <Form className="mx-2 pb-3" validate onSubmit={handleSubmit(addRegiao)} validated={!!errors}>
                    <Modal.Body className="py-3 mb-3 caixa-pesquisa bg-light">

                        <Row>
                            <Col md='8'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">Nome do Região</Form.Label>
                                    <Input
                                        className="mb-3"
                                        type='text'
                                        label=''
                                        placeholder='Insira o nome do Região'
                                        required={true}
                                        name='nomeRegiao'
                                        error={errors.nomeRegiao}
                                        validations={register('nomeRegiao', {
                                            required: {
                                                value: true,
                                                message: 'Nome do região é obrigatório.'
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
                                        label=''
                                        placeholder='População'
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
                                    <Form.Label className="mb-0">Jurisdição</Form.Label>
                                    <Input
                                        className="mb-3"
                                        type='text'
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
