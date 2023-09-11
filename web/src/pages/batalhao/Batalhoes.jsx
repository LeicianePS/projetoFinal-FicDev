import { Container, Col, Modal, Row, Table, Form, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { FaPlus, FaSearch, FaTrash, FaEdit, FaTimes, FaPen } from 'react-icons/fa';

//import { Batalhao } from "../../components/Batalhao";
import { Header } from "../../components/Header";
import { Input } from '../../components/Input';

import { createBatalhao, deleteBatalhao, getBatalhoes, updateBatalhao, filtroBatalhao } from "../../services/batalhao-service";
import PaginationComponent from "../../components/PaginationComponent";
import {  getRegioes } from "../../services/regiao-service";

export function Batalhoes() {
    const [batalhoes, setBatalhoes] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [regioes, setRegioes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        findBatalhoes();
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


    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5); // Número de itens por página
   
    const totalPages = Math.ceil(batalhoes.length / itemsPerPage);

    // getCurrentPageData carrega os dados da pagina atual, que são mostrados na tabela
    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return batalhoes.slice(startIndex, endIndex);
    };
    // Função para ir para uma página específica
    const goToPage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
        }
    };




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

    async function filtrarBatalhao(query) {
        try {
            const result = await filtroBatalhao(query);
            setBatalhoes(result.data);
        } catch (error) {
            console.error(error);
        }
    }

    

    const [isUpdated, setIsUpdated] = useState(false);

    async function editBatalhao(data) {
        try {
            await updateBatalhao({
                id: batalhaoEdit.id,
                nomeBatalhao: data.nomeBatalhao,
                dataFundacao: data.dataFundacao,
                comandante: data.comandante,
                tipo: data.tipo,
                efetivo: data.efetivo,
                missaoValores: data.missaoValores,
                contato: data.contato,
                comandoRegional: data.comandoRegional,
                status: data.statusC,
                idRegiao: data.idRegiao
            });
            setIsUpdated(false);
            await findBatalhoes();
        } catch (error) {
            console.error(error);
        }
    }

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
  
    // Função que ativa a filtragem de pesquisa
    const handleSearch = async (e) => {
      e.preventDefault();
        if(query == '') {
            await findBatalhoes()
        } else {
            await filtrarBatalhao(query)
        }
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
                            <Form.Label  className="b-0">Buscar por Nome, Tipo ou Comandante:</Form.Label>
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
                    <Button variant="outline-secondary" onClick={() => {setQuery(''); filtrarBatalhao('')}} className="align-items-center mx-4">
                        Limpar <FaTimes/>
                    </Button>
                    <Button variant="outline-primary" type="submit" className="align-items-center">
                        Pesquisar <FaSearch/>
                    </Button>
                </Col>
            </Form>


            <Row className="justify-content-between m-4 align-items-center bg-light ">   {/* d-none d-md-block */}
                <h5>Batalhões</h5>
                <Table responsive striped bordered hover className="col-md-10 my-1 ">
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
                        ? getCurrentPageData().map((batalhao, index) => (
                            <tr key={index}>
                                <td>{batalhao.id}</td>
                                <td>{batalhao.nome_batalhao}</td>
                                <td>{batalhao.tipo}</td>
                                <td>{batalhao.efetivo}</td>
                                <td>{batalhao.comando_regional}</td>
                                <td>{batalhao.comandante}</td>
                                <td className="d-flex justify-content-center">
                                    <Link className="mx-1 px-1" onClick={() => abrirModal(true, batalhao)}><FaEdit size="18px"/></Link> 
                                    
                                    {/* <Link className="mx-1 px-1" to={`/batalhao-editar/${batalhao.id}`}><FaPen size="18px"/></Link>  */}
                                    
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

                <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={goToPage}
                />

            </Row>


            <Modal show={isUpdated} onHide={() => setIsUpdated(false)} size="xl">
                <Modal.Header>
                    <Modal.Title>Editar batalhao: {batalhaoEdit.nome_batalhao}</Modal.Title>
                </Modal.Header>
                


                <Form className="mx-2 pb-3" validate onSubmit={handleSubmit(editBatalhao)} validated={!!errors}>
                    <Modal.Body className="py-3 mb-3 caixa-pesquisa bg-light">

                        <Row>
                            <Col md='8'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">Nome do Batalhão</Form.Label>
                                    <Input
                                        className="mb-3"
                                        type='text'
                                        defaultValue={batalhaoEdit.nome_batalhao}
                                        label=''
                                        placeholder='Insira o nome do Batalhão'
                                        required={true}
                                        name='nomeBatalhao'
                                        error={errors.nomeBatalhao}
                                        validations={register('nomeBatalhao', {
                                            required: {
                                                value: true,
                                                message: 'Nome do batalhão é obrigatório.'
                                            }
                                        })}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md='4'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">Comandante</Form.Label>
                                    <Input
                                        className="mb-3"
                                        type='text'
                                        defaultValue={batalhaoEdit.comandante}
                                        label=''
                                        placeholder='Comandante'
                                        required={true}
                                        name='comandante'
                                        error={errors.comandante}
                                        validations={register('comandante', {
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
                            <Col md='3'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">Data de Fundação</Form.Label>
                                    <Input
                                        className="mb-3"
                                        type='date'
                                        defaultValue={batalhaoEdit.data_fundacao}
                                        label=''
                                        placeholder='Data de fundacao do Batalhão'
                                        required={true}
                                        name='dataFundacao'
                                        error={errors.dataFundacao}
                                        validations={register('dataFundacao', {
                                            required: {
                                                value: true,
                                                message: ' é obrigatório.'
                                            }
                                        })}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md='3'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">Tipo de Batalhão:</Form.Label>
                                    <Input
                                        className="mb-3"
                                        type='text'
                                        defaultValue={batalhaoEdit.tipo}
                                        label=''
                                        placeholder='Tipo do Batalhão'
                                        required={true}
                                        name='tipo'
                                        error={errors.tipo}
                                        validations={register('tipo', {
                                            required: {
                                                value: true,
                                                message: ' é obrigatório.'
                                            }
                                        })}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md='3'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">Nº de Efetivo:</Form.Label>
                                    <Input
                                        className="mb-3"
                                        type='number'
                                        defaultValue={batalhaoEdit.efetivo}
                                        label=''
                                        placeholder='Efetivo do Batalhão'
                                        required={true}
                                        name='efetivo'
                                        error={errors.efetivo}
                                        validations={register('efetivo', {
                                            required: {
                                                value: true,
                                                message: ' é obrigatório.'
                                            }
                                        })}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md='3'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">Comando Regional:</Form.Label>
                                    <Input
                                        className="mb-3"
                                        type='text'
                                        defaultValue={batalhaoEdit.comando_regional}
                                        label=''
                                        placeholder='Insira o nome CR do Batalhão'
                                        required={true}
                                        name='comandoRegional'
                                        error={errors.comandoRegional}
                                        validations={register('comandoRegional', {
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
                            <Col>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">Missões e Valores</Form.Label>
                                    <Input
                                        className="mb-3"
                                        type='text'
                                        defaultValue={batalhaoEdit.missao_valores}
                                        label=''
                                        placeholder='Insira missão e valor'
                                        required={false}
                                        name='missaoValores'
                                        error={errors.missaoValores}
                                        validations={register('missaoValores', {
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
                            <Col>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">Contato (E-mail e telefone)</Form.Label>
                                    <Input
                                        className="mb-3"
                                        type='text'
                                        defaultValue={batalhaoEdit.contato}
                                        label=''
                                        placeholder='Insira o nome do Batalhão'
                                        required={true}
                                        name='contato'
                                        error={errors.contato}
                                        validations={register('contato', {
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
                            <Col md='6'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">Status</Form.Label>
                                    <Input
                                        className="mb-3"
                                        type='text'
                                        defaultValue={batalhaoEdit.status}
                                        label=''
                                        placeholder='Insira status do Batalhão'
                                        required={true}
                                        name='statusC'
                                        error={errors.statusC}
                                        validations={register('statusC', {
                                            required: {
                                                value: true,
                                                message: 'Nome do batalhão é obrigatório.'
                                            }
                                        })}
                                    />
                                </Form.Group>
                            </Col>
                            {/* <Col md='6'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">Região de atuação</Form.Label>
                                    <Input
                                        className="mb-3"
                                        type='number'
                                        defaultValue={batalhaoEdit.id_regiao}
                                        label=''
                                        placeholder='Insira o Comando Regional do Batalhão'
                                        required={true}
                                        name='idRegiao'
                                        error={errors.idRegiao}
                                        validations={register('idRegiao', {
                                            required: {
                                                value: true,
                                                message: ' é obrigatório.'
                                            }
                                        })}
                                    />
                                </Form.Group>
                            </Col> */}
                            <Col md='3'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">Região de Atuação</Form.Label>
                                    {/* Use o Form.Select para selecionar a região */}
                                    <Form.Select
                                    aria-label="Selecione uma região"
                                    defaultValue={batalhaoEdit.id_regiao}
                                    name='idRegiao'
                                    error={errors.idRegiao}
                                    {...register('idRegiao', {
                                        required: {
                                        value: true,
                                        message: 'Região de atuação é obrigatória.'
                                        }
                                    })}
                                    >
                                    <option value="">Selecione uma região</option>
                                    {regioes.map((regiao, index) => (
                                        <option key={index} value={regiao.id_regiao}>
                                            {regiao.nome_regiao}
                                        </option>
                                    ))}
                                    </Form.Select>
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
