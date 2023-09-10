import { Container, Col, Modal, Row, Table, Form, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { FaPlus, FaSearch, FaTrash, FaEdit, FaTimes } from 'react-icons/fa';

//import { Regiao } from "../../components/Regiao";
import { Header } from "../../components/Header";
import { Input } from '../../components/Input';

import { createRegiao, deleteRegiao, getRegioes, updateRegiao, filtroRegiao } from "../../services/regiao-service";

export function Regioes() {
    const [regioes, setRegioes] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
    const { handleSubmit, register, formState: { errors } } = useForm();
    const navigate = useNavigate();

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

    async function removeRegiao(id) {
        try {
            await deleteRegiao(id);
            await findRegioes();
        } catch (error) {
            console.error(error);
        }
    }

    async function addRegiao(data) {
        try {
            await createRegiao(data);
            setIsCreated(false);
            await findRegioes();
        } catch (error) {
            console.error(error);
        }
    }

    async function filtrarRegiao(query) {
        try {
            const result = await filtroRegiao(query);
            setRegioes(result.data);
        } catch (error) {
            console.error(error);
        }
    }

    

    const [isUpdated, setIsUpdated] = useState(false);

    async function editRegiao(data) {
        try {
            await updateRegiao({
                id: regiaoEdit.id_regiao,
                nomeRegiao: data.nomeRegiao,
                populacao: data.populacao,
                cidadesJurisdicao: data.cidadesJurisdicao,
            });
            setIsUpdated(false);
            await findRegioes();
        } catch (error) {
            console.error(error);
        }
    }

    const [regiaoEdit, setRegiaoEdit] = useState([]);
    const abrirModal = (trueFalse, regiao ) => {
        setIsUpdated(trueFalse);
        setRegiaoEdit(regiao)
    }

    const abrirEditarRegiao = (regiao) => {
        //var jsonRegiao = JSON.stringify(regiao)
        window.localStorage.setItem('regiaoEditar', JSON.stringify(regiao))
        navigate(`/regiao-editar/${regiao.id_regiao}`);
    }



    const [query, setQuery] = useState('');
  
    // Função que ativa a filtragem de pesquisa
    const handleSearch = async (e) => {
      e.preventDefault();
        if(query == '') {
            await findRegioes()
        } else {
            await filtrarRegiao(query)
        }
    };




    return (
        <Container fluid className="cor-page min-height">
            <Row className="justify-content-between p-4 align-items-center">
                <Col md='6' xs='7' className="">
                    <Header title="Listagem de Regiões"  />
                </Col>
                <Col className="d-flex justify-content-end">
                    <Button className="align-items-center" onClick={() => setIsCreated(true)}>
                        <Link to="/regiao-adicionar">Adicionar <b ><FaPlus/></b> </Link>
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
                            <Form.Label  className="b-0">Buscar por Nome ou Jurisdição da Região:</Form.Label>
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
                    <Button variant="outline-secondary" onClick={() => {setQuery(''); filtrarRegiao('')}} className="align-items-center mx-4">
                        Limpar <FaTimes/>
                    </Button>
                    <Button variant="outline-primary" type="submit" className="align-items-center">
                        Pesquisar <FaSearch/>
                    </Button>
                </Col>
            </Form>


            <Row className="justify-content-between m-4 align-items-center bg-light ">   {/* d-none d-md-block */}
                <h5>Regiões</h5>
                <Table responsive striped bordered hover className="col-md-10 my-1 ">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Nome Região</th>
                            <th>População</th>
                            <th>Jurisdição</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {regioes && regioes.length > 0
                        ? regioes.map((regiao, index) => (
                            <tr key={index}>
                                <td>{regiao.id_regiao}</td>
                                <td>{regiao.nome_regiao}</td>
                                <td>{regiao.populacao}</td>
                                <td>{regiao. cidadesbairros_atuacao}</td>
                                <td className="d-flex justify-content-center">
                                    <Link className="mx-1 px-1" onClick={() => abrirModal(true, regiao)}><FaEdit size="18px"/></Link> 
                                    
                                    {/* <Link className="mx-1 px-1" to={`/regiao-editar/${regiao.id}`}><FaEdit size="18px"/></Link>  */}
                                    
                                    {/* <button className="mx-1 px-1" onClick={() => abrirEditarRegiao(regiao)}><FaEdit size="18px"/></button>  */}
                                    <Link className="mx-1 px-1" onClick={async () => await removeRegiao(regiao.id_regiao)}><FaTrash size="18px"/></Link>
                                </td>
                            </tr>
                        ))
                        : (
                            <tr>
                            <td colSpan="5" className="text-center">
                                Não existe nenhuma região cadastrado!
                            </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Row>


            <Modal show={isUpdated} onHide={() => setIsUpdated(false)} size="xl">
                <Modal.Header>
                    <Modal.Title>Editar regiao: {regiaoEdit.nome_regiao}</Modal.Title>
                </Modal.Header>
                


                <Form className="mx-2 pb-3" validate onSubmit={handleSubmit(editRegiao)} validated={!!errors}>
                    <Modal.Body className="py-3 mb-3 caixa-pesquisa bg-light">

                        <Row>
                            <Col md='8'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">Nome do Região</Form.Label>
                                    <Input
                                        className="mb-3"
                                        type='text'
                                        defaultValue={regiaoEdit.nome_regiao}
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
                                    <Form.Label className="mb-0">Tipo de Região:</Form.Label>
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
                            <Button variant="primary" type="submit">
                                Editar
                            </Button>
                            <Button variant="secondary" onClick={() => setIsUpdated(false)}>
                                Fechar
                            </Button>
                        
                    </Modal.Footer>
                </Form>
            </Modal>




        </Container>
    );
}
