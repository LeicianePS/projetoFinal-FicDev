import { Container, Col, Modal, Row, Table, Form, Button, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { FaPlus, FaSearch, FaTrash, FaEdit, FaTimes } from 'react-icons/fa';

//import { Batalhao } from "../../components/Batalhao";
import { Header } from "../../components/Header";

import { deleteBatalhao, getBatalhoes, updateBatalhao, filtroBatalhao } from "../../services/batalhao-service";
import PaginationComponent from "../../components/PaginationComponent";
import AlertaFeedback from "../../components/layout/Alert";
import {  getRegioes } from "../../services/regiao-service";

export function Batalhoes() {
    const [batalhoes, setBatalhoes] = useState([]);
    const [show, setShow] = useState(false);
    const [alerta, setAlerta] = useState({});
    const [showRemove, setShowRemove] = useState(false);

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
            const result = await deleteBatalhao(id);
            setAlerta(result.data);
            setShow(true);
            await findBatalhoes();
        } catch (error) {
            console.error(error);
            setAlerta(error.response.data);
            setShow(true);
        }
        handleClose()
    }


    async function filtrarBatalhao(query) {
    //setCurrentPage(1);
        try {
            const result = await filtroBatalhao(query);
            setBatalhoes(result.data);
        } catch (error) {
            console.error(error);
        }
    }



    const [isUpdated, setIsUpdated] = useState(false);

    const [batalhaoEdit, setBatalhaoEdit] = useState({});
    async function editBatalhao() {
        try {
            const result = await updateBatalhao({
                id: batalhaoEdit.id,
                nomeBatalhao: batalhaoEdit.nome_batalhao,
                dataFundacao: batalhaoEdit.data_fundacao,
                comandante: batalhaoEdit.comandante,
                tipo: batalhaoEdit.tipo,
                efetivo: batalhaoEdit.efetivo,
                missaoValores: batalhaoEdit.missao_valores,
                contato: batalhaoEdit.contato,
                comandoRegional: batalhaoEdit.comando_regional,
                statusC: batalhaoEdit.status,
                idRegiao: batalhaoEdit.id_regiao

                // nomeBatalhao: data.nomeBatalhao,
                // dataFundacao: data.dataFundacao,
                // comandante: data.comandante,
                // tipo: data.tipo,
                // efetivo: data.efetivo,
                // missaoValores: data.missaoValores,
                // contato: data.contato,
                // comandoRegional: data.comandoRegional,
                // status: data.statusC,
                // idRegiao: data.idRegiao
            });


            setIsUpdated(false);
            setShow(true);
            setAlerta(result.data);
            await findBatalhoes();
        } catch (error) {
            console.error(error);
            setShow(true);
            setAlerta(error.response.data);
        }
    }

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
        <Container fluid className="cor-page min-height m-0 p-0 h-100">

            { show ?  <AlertaFeedback  setShow={setShow} alerta={alerta}></AlertaFeedback> : <></>  }


            <Row className="justify-content-between p-3 align-items-center" xs={12}>
                <Col md='6' xs={6} className="">
                    <Header title="Listagem de Batalhões"  />
                </Col>
                <Col className="d-flex justify-content-end">
                    <Button className="align-items-center" onClick={() => navigate("/batalhao-adicionar")} size="lg" xs={6}>
                        <Link to="/batalhao-adicionar">Adicionar <b><FaPlus/></b> </Link>
                    </Button>
                    {/* <Button variant="outline-secondary" onClick={() => {
                        sessionStorage.removeItem('token');
                        navigate('/');
                    }}>Sair</Button> */}
                </Col>
            </Row>

            <Form className="mx-3 my-3 caixa-pesquisa" onSubmit={handleSearch} xs={12}>
                <Row className="justify-content-between align-items-center">
                    {/* <Col >
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                    </Col> */}
                    <Col>
                        <Form.Group controlId="searchQuery">
                            <Form.Label  className="b-0">Buscar por Nome, Comandante, ou Região:</Form.Label>
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

                <Col className="d-flex justify-content-end pt-3 pb-2 " xs={12}>
                    <Button variant="outline-secondary" onClick={() => {setQuery(''); filtrarBatalhao('')}} className="align-items-start me-2 p-2" size="lg" xs={5}>
                        Limpar <FaTimes />
                    </Button>
                    <Button variant="outline-primary" type="submit" className="ms-2 px-2"  size="lg" xs={7}>
                        Pesquisar <FaSearch/>
                    </Button>
                </Col>
            </Form>


            <Row className="justify-content-start my-4 mx-2 align-items-center" fluid>   {/* d-none d-md-block */}
                <h5>Batalhões</h5>
                <Table striped bordered hover className="my-1      d-none d-sm-table " >
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Nome Batalhão</th>
                            <th>Tipo</th>
                            <th>Efetivo</th>
                            <th>CR</th>
                            <th>Comandante</th>
                            <th>Região</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {batalhoes && batalhoes.length > 0
                        ? getCurrentPageData().map((batalhao, index) => (
                            <tr key={index}>
                                <td>{batalhao.id}</td>
                                <td>{batalhao.nome_batalhao}</td>
                                <td>{ batalhao.tipo == "PM" ? "Polícia Militar" : "Corpo de Bombeiros"}</td>
                                <td>{batalhao.efetivo}</td>
                                <td>{batalhao.comando_regional}</td>
                                <td>{batalhao.comandante}</td>
                                <td>{batalhao.RegiaoModel?.nome_regiao ? batalhao.RegiaoModel?.nome_regiao : batalhao?.nome_regiao} </td>
                                <td className="d-flex justify-content-center">
                                    <Link className="mx-1 px-1 text-dark" onClick={() => abrirModal(true, batalhao)}><FaEdit /></Link>

                                    {/* <Link className="mx-1 px-1" to={`/batalhao-editar/${batalhao.id}`}><FaPen size="20px"/></Link>  */}

                                    {/* <button className="mx-1 px-1" onClick={() => abrirEditarBatalhao(batalhao)}><FaEdit size="20px"/></button>  */}
                                    {/* <Link className="mx-1 px-1" onClick={async () => await removeBatalhao(batalhao.id)}><FaTrash size="20px"/></Link> */}
                                    <Link className="mx-1 px-1 text-dark" onClick={() => abrirModalDeRemocao(batalhao.id)}><FaTrash /></Link>
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

                <div className='px-2 d-sm-none ' >
          	        {batalhoes && batalhoes.length > 0
                        ? getCurrentPageData().map((batalhao, index) => (
                            <Card key={index} striped bordered className="py-2 px-3 cor-layout" >
                                <div> <b>Id:</b> {batalhao.id}</div>
                                <div> <b>Nome:</b> {batalhao.nome_batalhao}</div>
                                <div> <b>Tipo:</b> { batalhao.tipo == "PM" ? "Polícia Militar" : "Corpo de Bombeiros"}</div>
                                <div> <b>Efetivo:</b> {batalhao.efetivo}</div>
                                <div> <b>CR:</b> {batalhao.comando_regional}</div>
                                <div> <b>Comandante:</b> {batalhao.comandante}</div>
                                <div> <b>Região:</b> {batalhao.RegiaoModel?.nome_regiao ? batalhao.RegiaoModel?.nome_regiao : batalhao?.nome_regiao} </div>
                                <div className="d-flex justify-content-center">
                                    <Col className="d-flex justify-content-between pt-3 pb-2 " xs={12}>
                                        <Button variant="warning" onClick={() => abrirModal(true, batalhao)} className="align-items-start me-2 " xs={5}>
                                            Editar <FaEdit size="20px"/>
                                        </Button>
                                        <Button variant="danger" type="submit" onClick={() => abrirModalDeRemocao(batalhao.id)} className="ms-2 " xs={7}>
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
                    <Button variant="primary" onClick={async () => removeBatalhao(idToRemove)} size="lg">
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


            <Modal show={isUpdated} onHide={() => setIsUpdated(false)} size="xl">
                <Modal.Header >
                    <Modal.Title className="text-dark">Editar batalhao: {batalhaoEdit.nome_batalhao}</Modal.Title>
                </Modal.Header>



                <Form className="mx-2 pb-3" validate onSubmit={handleSubmit(editBatalhao)} validated={!!errors}>
                    <Modal.Body className="py-3 mb-3 caixa-pesquisa bg-light">

                        <Row>
                            <Col md='8'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">Nome do Batalhão</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        className="mb-3"
                                        type='text'
                                        defaultValue={batalhaoEdit.nome_batalhao}
                                        placeholder='Insira o nome do Batalhão'
                                        required={true}
                                        name='nomeBatalhao'
                                        error={errors.nomeBatalhao}
                                        onChange={(e) =>
                                            setBatalhaoEdit({
                                            ...batalhaoEdit,
                                            nome_batalhao: e.target.value,
                                            })
                                        }
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
                                    <Form.Control
                                        size="lg"
                                        className="mb-3"
                                        type='text'
                                        defaultValue={batalhaoEdit.comandante}
                                        label=''
                                        placeholder='Comandante'
                                        required={true}
                                        name='comandante'
                                        error={errors.comandante}
                                        onChange={(e) =>
                                            setBatalhaoEdit({
                                            ...batalhaoEdit,
                                            comandante: e.target.value,
                                            })
                                        }
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
                                    <Form.Control
                                        size="lg"
                                        className="mb-3"
                                        type='date'
                                        defaultValue={batalhaoEdit.data_fundacao}
                                        label=''
                                        placeholder='Data de fundacao do Batalhão'
                                        required={true}
                                        name='dataFundacao'
                                        error={errors.dataFundacao}
                                        onChange={(e) =>
                                            setBatalhaoEdit({
                                            ...batalhaoEdit,
                                            data_fundacao: e.target.value,
                                            })
                                        }
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
                                    <Form.Select
                                        size="lg"
                                        aria-label="Selecione um tipo"
                                        defaultValue={batalhaoEdit.tipo}
                                        type='text'
                                        name='tipo'
                                        error={errors.tipo}
                                        onChange={(e) =>
                                            setBatalhaoEdit({
                                            ...batalhaoEdit,
                                            tipo: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="PM"> Polícia Militar </option>
                                        <option value="CBM">Corpo de Bombeiros Militar</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md='3'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">Nº de Efetivo:</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        className="mb-3"
                                        type='number'
                                        defaultValue={batalhaoEdit.efetivo}
                                        label=''
                                        placeholder='Efetivo do Batalhão'
                                        required={true}
                                        name='efetivo'
                                        error={errors.efetivo}
                                        onChange={(e) =>
                                            setBatalhaoEdit({
                                            ...batalhaoEdit,
                                            efetivo: e.target.value,
                                            })
                                        }
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
                                    {/* <Form.Control
                                        size="lg"
                                        className="mb-3"
                                        type='text'
                                        defaultValue={batalhaoEdit.comando_regional}
                                        label=''
                                        placeholder='Insira o nome CR do Batalhão'
                                        required={true}
                                        name='comandoRegional'
                                        error={errors.comandoRegional}
                                        onChange={(e) =>
                                            setBatalhaoEdit({
                                            ...batalhaoEdit,
                                            comando_regional: e.target.value,
                                            })
                                        }
                                        validations={register('comandoRegional', {
                                            required: {
                                                value: true,
                                                message: ' é obrigatório.'
                                            }
                                        })}
                                    /> */}

                                    <Form.Select
                                        size="lg"
                                        aria-label="Selecione um Comando Regional"
                                        defaultValue={batalhaoEdit.comando_regional}
                                        type='text'
                                        name='comandoRegional'
                                        error={errors.comandoRegional}
                                        onChange={(e) =>
                                            setBatalhaoEdit({
                                            ...batalhaoEdit,
                                            comando_regional: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="Comando Regional 01"> Comando Regional 01 </option>
                                        <option value="Comando Regional 02"> Comando Regional 02 </option>
                                        <option value="Comando Regional 03"> Comando Regional 03 </option>
                                        <option value="Comando Regional 04"> Comando Regional 04 </option>
                                        <option value="Comando Regional 05"> Comando Regional 05 </option>
                                        <option value="Comando Regional 06"> Comando Regional 06 </option>
                                        <option value="Comando Regional 07"> Comando Regional 07 </option>
                                        <option value="Comando Regional 08"> Comando Regional 01 </option>
                                        <option value="Comando Regional 09"> Comando Regional 09 </option>
                                        <option value="Comando Regional 10"> Comando Regional 10 </option>
                                        <option value="Comando Regional 11"> Comando Regional 11 </option>
                                        <option value="Comando Regional 12"> Comando Regional 12 </option>
                                        <option value="Comando Regional 13"> Comando Regional 13 </option>
                                        <option value="Comando Regional 14"> Comando Regional 14 </option>
                                        <option value="Comando Regional 15"> Comando Regional 15 </option>

                                    </Form.Select>

                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">Missões e Valores</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        className="mb-3"
                                        type='text'
                                        defaultValue={batalhaoEdit.missao_valores}
                                        label=''
                                        placeholder='Insira missão e valor'
                                        required={false}
                                        name='missaoValores'
                                        error={errors.missaoValores}
                                        onChange={(e) =>
                                            setBatalhaoEdit({
                                            ...batalhaoEdit,
                                            missao_valores: e.target.value,
                                            })
                                        }
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
                                    <Form.Control
                                        size="lg"
                                        className="mb-3"
                                        type='text'
                                        defaultValue={batalhaoEdit.contato}
                                        label=''
                                        placeholder='Insira o nome do Batalhão'
                                        required={true}
                                        name='contato'
                                        error={errors.contato}
                                        onChange={(e) =>
                                            setBatalhaoEdit({
                                            ...batalhaoEdit,
                                            contato: e.target.value,
                                            })
                                        }
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
                            {/* <Col md='6'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">Status</Form.Label>
                                    <Form.Control
                                        className="mb-3"
                                        type='text'
                                        defaultValue={batalhaoEdit.status}
                                        label=''
                                        placeholder='Insira status do Batalhão'
                                        required={true}
                                        name='statusC'
                                        error={errors.statusC}
                                        onChange={(e) =>
                                            setBatalhaoEdit({
                                            ...batalhaoEdit,
                                            status: e.target.value,
                                            })
                                        }
                                        validations={register('statusC', {
                                            required: {
                                                value: true,
                                                message: 'Status é obrigatório.'
                                            }
                                        })}
                                    />
                                </Form.Group>
                            </Col> */}

                            <Col md='3'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">Status</Form.Label>
                                    {/* Use o Form.Select para selecionar a região */}
                                    <Form.Select
                                    size="lg"
                                    aria-label="Selecione um status"
                                    defaultValue={batalhaoEdit.status}
                                    type='text'
                                    name='statusC'
                                    error={errors.statusC}
                                        onChange={(e) =>
                                            setBatalhaoEdit({
                                            ...batalhaoEdit,
                                            status: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="ativo"> ativo </option>
                                        <option value="inativo"> inativo </option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            {/* <Col md='6'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">Região de atuação</Form.Label>
                                    <Form.Control
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
                                        size="lg"
                                        aria-label="Selecione uma região"
                                        defaultValue={batalhaoEdit.id_regiao}
                                        name='idRegiao'
                                        error={errors.idRegiao}
                                        onChange={(e) =>
                                            setBatalhaoEdit({
                                            ...batalhaoEdit,
                                            id_regiao: e.target.value,
                                            })
                                        }
                                        // {...register('id_regiao', {
                                        //     required: {
                                        //     value: true,
                                        //     message: 'Região de atuação é obrigatória.'
                                        //     }
                                        // })}
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
                            <Button variant="secondary" onClick={() => setIsUpdated(false)} className="mx-4" size="lg">
                                Fechar
                            </Button>
                            <Button variant="primary" type="submit" onClick={()=> {editBatalhao()}} size="lg">
                                Editar
                            </Button>

                    </Modal.Footer>
                </Form>
            </Modal>




        </Container>
    );
}
