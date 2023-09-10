import { Container, Col, Modal, Row, Table, Form, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { FaPlus, FaSearch, FaTrash, FaEdit } from 'react-icons/fa';

import { Batalhao } from "../../components/Batalhao";
import { Header } from "../../components/Header";
import { Input } from '../../components/Input';

import { createBatalhao, deleteBatalhao, getBatalhoes, updateBatalhao } from "../../services/batalhao-service";

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

    const [isUpdated, setIsUpdated] = useState(false);
    const [batalhaoEdit, setBatalhaoEdit] = useState([]);
    const abrirModal = (trueFalse, batalhao ) => {
        setIsUpdated(trueFalse);
        setBatalhaoEdit(batalhao)
    }

    const abrirEditarBatalhao = (batalhao) => {
        //var jsonBatalhao = JSON.stringify(batalhao)
        window.localStorage.setItem('batalhaoEditar', JSON.stringify(batalhao))
        navigate(`/batalhao-editar/${batalhao.id}`);
    }



    const [query, setQuery] = useState('');
  
    // Esta função será chamada quando o formulário for enviado
    const handleSearch = (e) => {
      e.preventDefault();
      
      // Aqui você pode implementar a lógica de busca com base na consulta "query"
      // e, em seguida, definir os resultados da pesquisa em "searchResults".
      // Por enquanto, vou apenas simular uma lista de resultados para fins de exemplo.
      const simulatedResults = [
        { name: 'Item 1', type: 'A' },
        { name: 'Item 2', type: 'B' },
        { name: 'Item 3', type: 'A' },
      ];
      setBatalhoes(simulatedResults);
    };




    return (
        <Container fluid className="cor-page min-height">
            <Row className="justify-content-between p-4 align-items-center">
                <Col md='6' xs='7' className="">
                    <Header title="Listagem de Batalhões"  />
                </Col>
                <Col className="d-flex justify-content-end">
                    <Button className="align-items-center" onClick={() => setIsCreated(true)}>
                        <Link to="/batalhao-adicionar">Adicionar <b ><FaPlus/></b> </Link>
                    </Button>
                    {/* <Button variant="outline-secondary" onClick={() => {
                        sessionStorage.removeItem('token');
                        navigate('/');
                    }}>Sair</Button> */}
                </Col>
            </Row>
                     
            <Form className="mx-4 my-3 caixa-pesquisa " onSubmit={handleSearch}>
                <Row className="justify-content-between align-items-center">
                    {/* <Col >
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                    </Col> */}
                    <Col>
                        <Form.Group controlId="searchQuery">
                            <Form.Label  className="b-0">Buscar por Nome ou Tipo:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite a consulta"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Col className="d-flex justify-content-end pt-3 pb-2">
                    <Button variant="outline-primary" type="submit" className="align-items-center">
                        Pesquisar <FaSearch/>
                    </Button>
                </Col>
            </Form>

            {/* <Form onSubmit={handleSearch}>
                <Form.Group controlId="searchQuery">
                    <Form.Label>Buscar por Nome ou Tipo:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Digite a consulta"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                Pesquisar
                </Button>
            </Form>         */}

            <Row className="justify-content-between m-4 align-items-center bg-light">
                <h5>Batalhões</h5>
                <Table responsive striped bordered hover className="col-md-10 my-1">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Nome Batalhão</th>
                            <th>Tipo</th>
                            <th>Efetivo</th>
                            <th>CR</th>
                            <th>Comandante</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {batalhoes && batalhoes.length > 0
                        ? batalhoes.map((batalhao, index) => (
                            <tr key={index}>
                                <td>{batalhao.id}</td>
                                <td>{batalhao.nome_batalhao}</td>
                                <td>{batalhao.tipo}</td>
                                <td>{batalhao.efetivo}</td>
                                <td>{batalhao.comando_regional}</td>
                                <td>{batalhao.comandante}</td>
                                <td className="d-flex justify-content-center">
                                    <Link className="mx-1 px-1" onClick={() => abrirModal(true, batalhao)}><FaEdit size="18px"/></Link> 
                                    
                                    {/* <Link className="mx-1 px-1" to={`/batalhao-editar/${batalhao.id}`}><FaEdit size="18px"/></Link>  */}
                                    
                                    {/* <button className="mx-1 px-1" onClick={() => abrirEditarBatalhao(batalhao)}><FaEdit size="18px"/></button>  */}
                                    <Link className="mx-1 px-1" onClick={async () => await removeBatalhao(batalhao.id)}><FaTrash size="18px"/></Link>
                                </td>
                            </tr>
                        ))
                        : (
                            <tr>
                            <td colSpan="5" className="text-center">
                                Não existe nenhum batalhão cadastrado!
                            </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Row>


            <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
                <Modal.Header>
                    <Modal.Title>Editar batalhao: {batalhaoEdit.nome_batalhao}</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(editBatalhao)} validated={!!errors}>
                    <Modal.Body>
                        <Input
                            className="mb-3"
                            type='text'
                            defaultValue={batalhaoEdit.nome_batalhao}
                            label='Nome do batalhao'
                            placeholder='Insira o nome do batalhao'
                            required={true}
                            name='nomeBatalhao'
                            error={errors.nomeBatalhao}
                            validations={register('nomeBatalhao', {
                                required: {
                                    value: true,
                                    message: 'Nome do batalhao é obrigatório.'
                                }
                            })}
                        />
                        <Input
                            className="mb-3"
                            type='text'
                            defaultValue={batalhaoEdit.comandante}
                            label='CRN do batalhao'
                            placeholder='Insira o crn do batalhao'
                            required={true}
                            name='comandante'
                            error={errors.comandante}
                            validations={register('comandante', {
                                required: {
                                    value: true,
                                    message: 'CRN do batalhao é obrigatório.'
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



            {/* Formulário dentro do Modal, ideal seria componentizar também, pois é parecido com o Modal de editar */}
            {/* <Modal show={isCreated} onHide={() => setIsCreated(false)}>
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
            </Modal> */}


        </Container>
    );
}
