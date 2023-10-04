import { Container, Col, Modal, Row, Table, Form, Button, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { FaPlus, FaSearch, FaTrash, FaEdit, FaTimes } from 'react-icons/fa';
import {  getBatalhoes } from "../../services/batalhao-service";

import { Header } from "../../components/Header";

import { deleteMilitar, getMilitares, updateMilitar, filtroMilitar } from "../../services/militar-service";
import PaginationComponent from "../../components/PaginationComponent";
import AlertaFeedback from "../../components/layout/Alert";

export function Militares() {
    const [militares, setMilitares] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [show, setShow] = useState(false);
    const [showRemove, setShowRemove] = useState(false);
    const [batalhoes, setBatalhoes] = useState([]);

    const { handleSubmit, register, formState: { errors } } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        findMilitares();
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

    const totalPages = Math.ceil(militares.length / itemsPerPage);

    // getCurrentPageData carrega os dados da pagina atual, que são mostrados na tabela
    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return militares.slice(startIndex, endIndex);
    };
    // Função para ir para uma página específica
    const goToPage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
        }
    };




    async function findMilitares() {
        try {
            const result = await getMilitares();
            setMilitares(result.data);
        } catch (error) {
            console.error(error);
            navigate('/');
        }
    }

    async function removeMilitar(id) {
        try {
            const result = await deleteMilitar(id);
            setAlerta(result.data);
            setShow(true);
            await findMilitares();
        } catch (error) {
            console.error(error);
            setAlerta(error.response.data);
            setShow(true);
        }
        handleClose();
    }


    async function filtrarMilitar(query) {
        try {
            const result = await filtroMilitar(query);
            setMilitares(result.data);
        } catch (error) {
            console.error(error);
        }
    }



    const [isUpdated, setIsUpdated] = useState(false);
    const [militarEdit, setMilitarEdit] = useState({});
    async function editMilitar(data) {
        try {
            setIsUpdated(false);
            const result = await updateMilitar({
                id: militarEdit.id,
                nome: data.nome ? data.nome : militarEdit.nome,
                email: data.email ? data.email : militarEdit.email,
                cpf: data.cpf ? data.cpf : militarEdit.cpf,
                nascimento: data.nascimento ? data.nascimento : militarEdit.nascimento,
                posto: data.posto ? data.posto : militarEdit.posto,
                matricula: data.matricula ? data.matricula : militarEdit.matricula,
                salarioAtual: data.salarioAtual ? data.salarioAtual : militarEdit.salario_atual,
                idBatalhao: militarEdit.id_batalhao,
            });
            setAlerta(result.data);
            setShow(true);
            await findMilitares();
        } catch (error) {
            console.error(error);
            setAlerta(error.response.data);
            setShow(true);
        }
    }


    const abrirModal = (trueFalse, militar ) => {
        setIsUpdated(true);
        setMilitarEdit(militar)
    }

    const fecharModal = ()=> {
        setIsUpdated(false);
        setMilitarEdit({})
    }

    const abrirEditarMilitar = (militar) => {
        //var jsonMilitar = JSON.stringify(militar)
        window.localStorage.setItem('militarEditar', JSON.stringify(militar))
        navigate(`/militar-editar/${militar.id}`);
    }



    const [query, setQuery] = useState('');

    // Função que ativa a filtragem de pesquisa
    const handleSearch = async (e) => {
      e.preventDefault();
        if(query == '') {
            await findMilitares()
        } else {
            await filtrarMilitar(query)
        }
    };




    return (
        <Container fluid className="cor-page min-height">

        { show ?  <AlertaFeedback  setShow={setShow} alerta={alerta}></AlertaFeedback> : <></>  }



            <Row className="justify-content-between p-3 align-items-center" xs={12}>
                <Col md='6' xs={6} className="">
                    <Header title="Listagem de Militares"  />
                </Col>
                <Col className="d-flex justify-content-end">
                    <Button className="align-items-center" onClick={() => navigate("/militar-adicionar")} size="lg" xs={6}>
                        <Link to="/militar-adicionar">Adicionar <b ><FaPlus/></b> </Link>
                    </Button>
                    {/* <Button variant="outline-secondary" onClick={() => {
                        sessionStorage.removeItem('token');
                        navigate('/');
                    }}>Sair</Button> */}
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
                            <Form.Label  className="b-0">Buscar por nome, email ou posto:</Form.Label>
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
                    <Button variant="outline-secondary" onClick={() => {setQuery(''); filtrarMilitar('')}} className="align-items-start me-2 p-2" size="lg" xs={5}>
                        Limpar <FaTimes/>
                    </Button>
                    <Button variant="outline-primary" type="submit" className="ms-2 px-2"  size="lg" xs={7}>
                        Pesquisar <FaSearch/>
                    </Button>
                </Col>
            </Form>


            <Row className="justify-content-start my-4 mx-2 align-items-center">   {/* d-none d-md-block */}
                <h5>Usuários</h5>
                <Table responsive striped bordered hover className="my-1       d-none d-sm-table ">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Nome Usuário</th>
                            <th>E-mail</th>
                            <th>Posto</th>
                            <th>Nascimento</th>
                            <th>Salário Atual</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {militares && militares.length > 0
                        ? getCurrentPageData().map((militar, index) => (
                            <tr key={index}>
                                <td>{militar.id}</td>
                                <td>{militar.nome}</td>
                                <td>{militar.email}</td>
                                <td>{militar.posto}</td>
                                <td>{militar.nascimento}</td>
                                <td>{militar.salario_atual}</td>
                                <td className="d-flex justify-content-center">
                                    <Link className="mx-1 px-1" onClick={() => abrirModal(true, militar)}><FaEdit size="20px"/></Link>

                                    {/* <Link className="mx-1 px-1" to={`/militar-editar/${militar.id}`}><FaPen size="20px"/></Link>  */}

                                    {/* <button className="mx-1 px-1" onClick={() => abrirEditarMilitar(militar)}><FaEdit size="20px"/></button>  */}
                                    <Link className="mx-1 px-1" onClick={() => abrirModalDeRemocao(militar.id)}><FaTrash size="20px"/></Link>
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

                <div className='px-2 d-sm-none' >
          	        {militares && militares.length > 0
                        ? getCurrentPageData().map((militar, index) => (
                            <Card key={index} striped bordered className="py-2 px-3">
                                <div> <b>Id:</b> {militar.id}</div>
                                <div> <b>Nome:</b> {militar.nome}</div>
                                <div> <b>E-mail:</b> {militar.email}</div>
                                <div> <b>Posto:</b> {militar.posto}</div>
                                <div> <b>Data de Nascimento:</b> {militar.nascimento}</div>
                                <div> <b>Salário:</b> {militar.salario_atual}</div>
                                <div className="d-flex justify-content-center">
                                    <Col className="d-flex justify-content-between pt-3 pb-2 " xs={12}>
                                        <Button variant="warning" onClick={() => abrirModal(true, militar)} className="align-items-start me-2 " xs={5}>
                                            Editar <FaEdit size="20px"/>
                                        </Button>
                                        <Button variant="danger" type="submit" onClick={() => abrirModalDeRemocao(militar.id)} className="ms-2 " xs={7}>
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
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={async () => removeMilitar(idToRemove)}>
                        Continuar
                    </Button>
                    </Modal.Footer>
                </Modal>



                <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={goToPage}
                />

            </Row>


            <Modal show={isUpdated} onHide={() => fecharModal()} size="xl">
                <Modal.Header>
                    <Modal.Title>Editar usuário: {militarEdit.nome}</Modal.Title>
                </Modal.Header>

                <Form className="mx-2 pb-3" validate onSubmit={handleSubmit(editMilitar)} validated={!!errors}>
                    <Modal.Body className="py-3 mb-3 caixa-pesquisa bg-light">

                        <Row>
                            <Col md='8'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">Nome do Usuário</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        className="mb-3"
                                        type='text'
                                        placeholder={militarEdit.nome}
                                        {...register('nome', {
                                            // required: 'Este campo é obrigatório.',
                                        })}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md='4'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">CPF (999.999.999-99)</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder={militarEdit.cpf}
                                        {...register('cpf', {
                                            // required: 'CPF é obrigatório.',
                                            pattern: {
                                            value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/, // Formato de CPF: 999.999.999-99
                                            message: 'CPF inválido',
                                            },
                                        })}
                                    />
                                    {errors.cpf && <span>{errors.cpf.message}</span>}
                                </Form.Group>
                            </Col>
                        </Row>


                        <Row>
                            <Col md='6'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">E-mail (exemplo@email.com)</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="email"
                                        placeholder={militarEdit.email}
                                        {...register('email', {
                                            // required: 'E-mail é obrigatório.',
                                            pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                            message: 'E-mail inválido',
                                            },
                                        })}
                                    />
                                    {errors.email && <span>{errors.email.message}</span>}
                                </Form.Group>
                            </Col>

                            <Col md='3'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">Data de Nascimento</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="date"
                                        defaultValue={militarEdit.nascimento}
                                        {...register('nascimento', {
                                            required: {
                                                value: true,
                                                message: 'Data de Nascimento é obrigatório.'
                                            },
                                        })}
                                    />
                                    {errors.nascimento && <span>{errors.nascimento.message}</span>}
                                </Form.Group>
                            </Col>
                            <Col md='3'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">Matrícula:</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder={militarEdit.matricula}
                                        {...register('matricula', {
                                            // required: 'Este campo é obrigatório.',
                                            maxLength: {
                                            value: 8, // Defina o número máximo de caracteres permitidos aqui
                                            message: 'A matrícula deve ter no máximo 8 caracteres.',
                                            },
                                        })}
                                    />
                                    {errors.matricula && <span>{errors.matricula.message}</span>}
                                </Form.Group>
                            </Col>

                            <Col md='3'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">Posto:</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder={militarEdit.posto}
                                        {...register('posto', {
                                            // required: 'Este campo é obrigatório.',
                                           
                                        })}
                                    />
                                    {errors.posto && <span>{errors.posto.message}</span>}
                                </Form.Group>
                            </Col>
                            <Col md='3'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">Salário Atual:</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder={militarEdit.salario_atual}
                                        {...register('salarioAtual', {
                                            // required: 'Este campo é obrigatório.',
                                            maxLength: {
                                            value: 8, // Defina o número máximo de caracteres permitidos aqui
                                            message: 'A matrícula deve ter no máximo 8 caracteres.',
                                            },
                                        })}
                                    />
                                    {errors.salarioAtual && <span>{errors.salarioAtual.message}</span>}
                                </Form.Group>
                            </Col>

                            <Col md='3'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">Batalhão</Form.Label>
                                    {/* Use o Form.Select para selecionar a região */}
                                    <Form.Select
                                        size="lg"
                                        aria-label="Selecione um batalhão"
                                        defaultValue={militarEdit.id_batalhao}
                                        name='idBatalhao'
                                        error={errors.idBatalhao}
                                        onChange={(e) =>
                                            setMilitarEdit({
                                            ...militarEdit,
                                            id_batalhao: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="">Selecione um batalhão</option>
                                        {batalhoes.map((batalhao, index) => (
                                            <option key={index} value={batalhao.id_batalhao}>
                                            {batalhao.nome_batalhao}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                            <Button variant="secondary" onClick={() => fecharModal()} className="mx-4">
                                Fechar
                            </Button>
                            <Button variant="primary" type="submit">
                                Editar
                            </Button>
                    </Modal.Footer>
                </Form>



            </Modal>




        </Container>
    );
}
