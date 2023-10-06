import { Container, Col, Modal, Row, Table, Form, Button, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { FaPlus, FaSearch, FaTrash, FaEdit, FaTimes} from 'react-icons/fa';

//import { Regiao } from "../../components/Regiao";
import { Header } from "../../components/Header";

import { deleteRegiao, getRegioes, updateRegiao, filtroRegiao } from "../../services/regiao-service";
import PaginationComponent from "../../components/PaginationComponent";
import AlertaFeedback from "../../components/layout/Alert";
import { Spinner } from 'react-bootstrap';


export function Regioes() {
    const [regioes, setRegioes] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [show, setShow] = useState(false);
    const [showRemove, setShowRemove] = useState(false);

    const { handleSubmit, register, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false); // Estado para controlar a visibilidade do spinner


    useEffect(() => {
        findRegioes();

    }, []);

    // Função para abrir o modal de remoção
    const [idToRemove, setIdToRemove] = useState(null); // Estado para armazenar o ID a ser removido

    const abrirModalDeRemocao = (id) => {
        setIdToRemove(id); // Define o ID a ser removido
        setShowRemove(true); // Abre o modal
    };

    // Função para fechar o modal
    const handleClose = () => {
        setShowRemove(false);
    };


    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5); // Número de itens por página

    const totalPages = Math.ceil(regioes.length / itemsPerPage);

    // getCurrentPageData carrega os dados da pagina atual, que são mostrados na tabela
    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return regioes.slice(startIndex, endIndex);
    };
    // Função para ir para uma página específica
    const goToPage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
        }
    };


    async function findRegioes() {
        setIsLoading(true);
        try {
            const result = await getRegioes();
            setRegioes(result.data);
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        } catch (error) {
            console.error(error);
            navigate('/');
            setIsLoading(false);
        }
    }

    async function removeRegiao(id) {
        try {
            const result = await deleteRegiao(id);
            setAlerta(result.data);
            setShow(true);
            await findRegioes();
        } catch (error) {
            console.error(error);
            setAlerta(error.response.data);
            setShow(true);
        }
       handleClose()
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

    const [regiaoEdit, setRegiaoEdit] = useState({});
    async function editRegiao() {
        try {
            setIsUpdated(false);
            const result = await updateRegiao({
                id: regiaoEdit.id_regiao,
                nomeRegiao: regiaoEdit.nome_regiao,
                populacao: regiaoEdit.populacao,
                cidadesJurisdicao: regiaoEdit.cidadesbairros_atuacao,
            });
            setAlerta(result.data);
            setShow(true);

            await findRegioes();
        } catch (error) {
            console.error(error);
            setAlerta(error.response.data);
            setShow(true);

        }
    }

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
            {/* Mostra o spinner enquanto isLoading for verdadeiro */}
            {isLoading && (

            <div className="position-fixed d-flex align-items-center justify-content-center"
            style={{
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1, // Defina um valor adequado para o z-index
            }}>
                <Spinner animation="border" size="sm" />
                <Spinner animation="border" />
            </div>

            )}

                {/* Mostra o gráfico quando isLoading for falso */}
            {!isLoading && (
                <div>
                    { show ?  <AlertaFeedback setShow={setShow} alerta={alerta}></AlertaFeedback> : <></>  }


                    <Row className="justify-content-between p-3 align-items-center" xs={12}>
                        <Col md='6' xs={6} className="">
                            <Header title="Listagem de Regiões"  />
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <Button className="align-items-center" onClick={() => navigate("/regiao-adicionar")} size="lg" xs={6}>
                                <Link to="/regiao-adicionar">Adicionar <b ><FaPlus/></b> </Link>
                            </Button>
                        </Col>
                    </Row>

                    <Form className="mx-3 my-3 caixa-pesquisa " onSubmit={handleSearch} xs={12}>
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
                                        size="lg"
                                        type="text"
                                        placeholder="Digite a consulta"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Col className="d-flex justify-content-end pt-3 pb-2" xs={12}>
                            <Button variant="outline-secondary" onClick={() => {setQuery(''); filtrarRegiao('')}} className="align-items-start me-2 p-2" size="lg" xs={5}>
                                Limpar <FaTimes/>
                            </Button>
                            <Button variant="outline-primary" type="submit" className="ms-2 px-2"  size="lg" xs={7}>
                                Pesquisar <FaSearch/>
                            </Button>
                        </Col>
                    </Form>


                    <Row className="justify-content-start my-4 mx-2 align-items-center" >
                        <h5>Regiões</h5>
                        <Table responsive striped bordered hover className="my-1       d-none d-sm-table ">
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
                                ? getCurrentPageData().map((regiao, index) => (
                                    <tr key={index}>
                                        <td>{regiao.id_regiao}</td>
                                        <td>{regiao.nome_regiao}</td>
                                        <td>{regiao.populacao}</td>
                                        <td>{regiao.cidadesbairros_atuacao}</td>
                                        <td className="d-flex justify-content-center">
                                            <Link className="mx-1 px-1 text-dark" onClick={() => abrirModal(true, regiao)}><FaEdit /></Link>

                                            {/* <Link className="mx-1 px-1" to={`/regiao-editar/${regiao.id_regiao}`}><FaPen size="20px"/></Link>  */}

                                            {/* <button className="mx-1 px-1" onClick={() => abrirEditarRegiao(regiao)}><FaEdit size="20px"/></button>  */}
                                            {/* <Link className="mx-1 px-1" onClick={async () => await removeRegiao(regiao.id_regiao)}><FaTrash size="20px"/></Link> */}
                                            <Link className="mx-1 px-1 text-dark" onClick={() => abrirModalDeRemocao(regiao.id_regiao)}><FaTrash /></Link>
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

                        <div className='px-2 d-sm-none' >
                            {regioes && regioes.length > 0
                                ? getCurrentPageData().map((regiao, index) => (
                                    <Card key={index} striped bordered className="py-2 px-3 cor-layout">
                                        <div> <b>Id:</b> {regiao.id_regiao}</div>
                                        <div> <b>Nome:</b> {regiao.nome_regiao}</div>
                                        <div> <b>Efetivo:</b> {regiao.populacao}</div>
                                        <div> <b>CR:</b> {regiao.cidadesbairros_atuacao}</div>
                                        <div className="d-flex justify-content-center">
                                            <Col className="d-flex justify-content-between pt-3 pb-2 " xs={12}>
                                                <Button variant="warning" onClick={() => abrirModal(true, regiao)} className="align-items-start me-2 " xs={5}>
                                                    Editar <FaEdit size="20px"/>
                                                </Button>
                                                <Button variant="danger" type="submit" onClick={() => abrirModalDeRemocao(regiao.id_regiao)} className="ms-2 " xs={7}>
                                                    Deletar <FaTrash size="20px"/>
                                                </Button>
                                            </Col>
                                        </div>
                                    </Card>
                                ))
                                : (
                                    <div>
                                        <p colSpan="12" className="text-center">
                                            Não existe nenhum batalhão cadastrado!
                                        </p>
                                    </div>
                                )}
                        </div>




                        <Modal show={showRemove} onHide={handleClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>Removendo item!</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Tem certeza que deseja remover este item?</Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose} size="lg">
                                Cancelar
                            </Button>
                            <Button variant="primary" onClick={async () => removeRegiao(idToRemove)} size="lg">
                                Continuar
                            </Button>
                            </Modal.Footer>
                        </Modal>



                        {/* <Pagination>
                            <Pagination.Prev
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                            />
                                {Array.from({ length: totalPages }).map((_, index) => (

                                    <Pagination.Item
                                        key={index + 1}
                                        active={index + 1 === currentPage}
                                        onClick={() => setCurrentPage(index + 1)}
                                    >
                                        {index + 1}
                                    </Pagination.Item>
                                ))}
                            <Pagination.Next
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            />
                        </Pagination> */}

                        <PaginationComponent
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={goToPage}
                        />

                    </Row>


                    <Modal show={isUpdated} onHide={() => setIsUpdated(false)} size="xl">
                        <Modal.Header>
                            <Modal.Title>Editar regiao: {regiaoEdit.nome_regiao}</Modal.Title>
                        </Modal.Header>

                        <Form className="mx-2 pb-3" validate onSubmit={handleSubmit(editRegiao)} validated={!!errors}>
                            <Modal.Body className="py-3 mb-3 caixa-pesquisa bg-light">




                                {/* <Row>
                                    <Col md='8'>
                                        <Form.Group controlId="searchQuery">
                                            <Form.Label className="mb-0">Nome do Região</Form.Label>
                                            <Input
                                                className="mb-3"
                                                type='text'
                                                defaultValue={regiaoEdit.nome_regiao}
                                                label='Nome da Região'
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
                                </Row> */}



                            <Row>
                                <Col md='8'>
                                    <Form.Group controlId="searchQuery" className="mb-3">
                                        <Form.Label className="mb-0">Nome do Região</Form.Label>
                                        <Form.Control
                                            size="lg"
                                            type="text"
                                            placeholder='Insira a População estimada'
                                            defaultValue={regiaoEdit.nome_regiao}
                                            name='nomeRegiao'
                                            error={errors.nomeRegiao}
                                            required={true}
                                            onChange={(e) =>
                                                setRegiaoEdit({
                                                ...regiaoEdit,
                                                nome_regiao: e.target.value,
                                                })
                                            }
                                            validations={register('nomeRegiao', {
                                                required: {
                                                    value: true,
                                                    message: 'Nome da região é obrigatório.'
                                                },
                                            })}

                                        />
                                    </Form.Group>
                                </Col>
                                <Col md='4'>
                                    <Form.Group controlId="searchQuery" className="mb-3">
                                        <Form.Label className="mb-0">População</Form.Label>
                                        <Form.Control
                                            size="lg"
                                            type="number"
                                            placeholder='Insira a População estimada'
                                            defaultValue={regiaoEdit.populacao}
                                            name='populacao'
                                            error={errors.populacao}
                                            required={true}
                                            onChange={(e) =>
                                                setRegiaoEdit({
                                                ...regiaoEdit,
                                                populacao: e.target.value,
                                                })
                                            }
                                            validations={register('populacao', {
                                                required: {
                                                    value: true,
                                                    message: 'População é obrigatório.'
                                                }
                                            })}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>


                                <Form.Group controlId="searchQuery" className="mb-3">
                                    <Form.Label className="mb-0">Jurisdição</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder='Jurisdição'
                                        defaultValue={regiaoEdit.cidadesbairros_atuacao}
                                        onChange={(e) =>
                                            setRegiaoEdit({
                                                ...regiaoEdit,
                                                cidadesbairros_atuacao: e.target.value,
                                            })
                                            }
                                        name='cidadesJurisdicao'
                                        error={errors.cidadesJurisdicao}
                                        required={true}

                                        validations={register('cidadesJurisdicao', {
                                            required: {
                                                value: true,
                                                message: 'Jurisdição é obrigatório.'
                                            }
                                        })}

                                    />
                                </Form.Group>

                            </Modal.Body>
                            <Modal.Footer>
                                    <Button variant="secondary" onClick={() => setIsUpdated(false)} className="mx-4" size="lg">
                                        Fechar
                                    </Button>
                                    <Button variant="primary" type="submit" onClick={()=> {editRegiao()}} size="lg">  {/*onClick={() => navigate('/regioes')} */}
                                        Editar
                                    </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>


                </div>)}
        </Container>
    );
}
