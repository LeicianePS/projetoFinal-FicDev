import { Container, Col, Modal, Row, Table, Form, Button, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { FaPlus, FaSearch, FaTrash, FaEdit, FaTimes } from 'react-icons/fa';

//import { Usuario } from "../../components/Usuario";
import { Header } from "../../components/Header";

import { deleteUsuario, getUsuarios, updateUsuario, filtroUsuario } from "../../services/usuario-service";
import PaginationComponent from "../../components/PaginationComponent";
import AlertaFeedback from "../../components/layout/Alert";

export function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [show, setShow] = useState(false);
    const [showRemove, setShowRemove] = useState(false);

    const { handleSubmit, register, formState: { errors } } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        findUsuarios();
        // eslint-disable-next-line
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

    const totalPages = Math.ceil(usuarios.length / itemsPerPage);

    // getCurrentPageData carrega os dados da pagina atual, que são mostrados na tabela
    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return usuarios.slice(startIndex, endIndex);
    };
    // Função para ir para uma página específica
    const goToPage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
        }
    };




    async function findUsuarios() {
        try {
            const result = await getUsuarios();
            setUsuarios(result.data);
        } catch (error) {
            console.error(error);
            navigate('/');
        }
    }

    async function removeUsuario(id) {
        try {
            const result = await deleteUsuario(id);
            setAlerta(result.data);
            setShow(true);
            await findUsuarios();
        } catch (error) {
            console.error(error);
            setAlerta(error.response.data);
            setShow(true);
        }
        handleClose();
    }


    async function filtrarUsuario(query) {
        try {
            const result = await filtroUsuario(query);
            setUsuarios(result.data);
        } catch (error) {
            console.error(error);
        }
    }



    const [isUpdated, setIsUpdated] = useState(false);
    const [usuarioEdit, setUsuarioEdit] = useState({});
    async function editUsuario(data) {
        try {
            setIsUpdated(false);
            const result = await updateUsuario({
                // id: usuarioEdit.id,
                // nome: usuarioEdit.nome,
                // cpf: usuarioEdit.cpf,
                // email: usuarioEdit.email,
                // telefone: usuarioEdit.telefone,
                // matricula: usuarioEdit.matricula
                id: usuarioEdit.id,
                nome: data.nome ? data.nome : usuarioEdit.nome,
                cpf: data.cpf ? data.cpf : usuarioEdit.cpf,
                email: data.email ? data.email : usuarioEdit.email,
                telefone: data.telefone ? data.telefone : usuarioEdit.telefone,
                matricula: data.matricula ? data.matricula : usuarioEdit.matricula,
                perfil: usuarioEdit.perfil,
            });
            setAlerta(result.data);
            setShow(true);
            await findUsuarios();
        } catch (error) {
            console.error(error);
            setAlerta(error.response.data);
            setShow(true);
        }
    }


    const abrirModal = (trueFalse, usuario ) => {
        setIsUpdated(true);
        setUsuarioEdit(usuario)
    }

    const fecharModal = ()=> {
        setIsUpdated(false);
        setUsuarioEdit({})
    }

    const abrirEditarUsuario = (usuario) => {
        //var jsonUsuario = JSON.stringify(usuario)
        window.localStorage.setItem('usuarioEditar', JSON.stringify(usuario))
        navigate(`/usuario-editar/${usuario.id}`);
    }



    const [query, setQuery] = useState('');

    // Função que ativa a filtragem de pesquisa
    const handleSearch = async (e) => {
      e.preventDefault();
        if(query == '') {
            await findUsuarios()
        } else {
            await filtrarUsuario(query)
        }
    };




    return (
        <Container fluid className="cor-page min-height">

        { show ?  <AlertaFeedback  setShow={setShow} alerta={alerta}></AlertaFeedback> : <></>  }

            <Row className="justify-content-between p-3 align-items-center" xs={12}>
                <Col md='6' xs={6} className="">
                    <Header title="Listagem de Usuários"  />
                </Col>
                <Col className="d-flex justify-content-end">
                    <Button className="align-items-center" onClick={() => navigate("/usuario-adicionar")} size="lg" xs={6}>
                        <Link to="/usuario-adicionar">Adicionar <b ><FaPlus/></b> </Link>
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
                            <Form.Label  className="b-0">Buscar por nome, email ou cpf:</Form.Label>
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
                    <Button variant="outline-secondary" onClick={() => {setQuery(''); filtrarUsuario('')}} className="align-items-start me-2 p-2" size="lg" xs={5}>
                        Limpar <FaTimes/>
                    </Button>
                    <Button variant="outline-primary" type="submit" className="ms-2 px-2"  size="lg" xs={7}>
                        Pesquisar <FaSearch/>
                    </Button>
                </Col>
            </Form>


            <Row className="justify-content-start my-4 mx-2 align-items-center" >   {/* d-none d-md-block */}
                <h5>Usuários</h5>
                <Table responsive striped bordered hover className="my-1       d-none d-sm-table ">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Nome Usuário</th>
                            <th>E-mail</th>
                            <th>CPF</th>
                            <th>Telefone</th>
                            <th>Matrícula</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios && usuarios.length > 0
                        ? getCurrentPageData().map((usuario, index) => (
                            <tr key={index}>
                                <td>{usuario.id}</td>
                                <td>{usuario.nome}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.cpf}</td>
                                <td>{usuario.telefone}</td>
                                <td>{usuario.matricula}</td>
                                <td className="d-flex justify-content-center">
                                    <Link className="mx-1 px-1 text-dark" onClick={() => abrirModal(true, usuario)}><FaEdit /></Link>

                                    {/* <Link className="mx-1 px-1" to={`/usuario-editar/${usuario.id}`}><FaPen size="20px"/></Link>  */}

                                    {/* <button className="mx-1 px-1" onClick={() => abrirEditarUsuario(usuario)}><FaEdit size="20px"/></button>  */}
                                    <Link className="mx-1 px-1 text-dark" onClick={() => abrirModalDeRemocao(usuario.id)}><FaTrash /></Link>
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
          	        {usuarios && usuarios.length > 0
                        ? getCurrentPageData().map((usuario, index) => (
                            <Card key={index} striped bordered className="py-2 px-3 cor-layout">
                                <div> <b>Id:</b> {usuario.id}</div>
                                <div> <b>Nome:</b> {usuario.nome}</div>
                                <div> <b>Email:</b> {usuario.email}</div>
                                <div> <b>CPF:</b> {usuario.cpf}</div>
                                <div> <b>Telefone:</b> {usuario.telefone}</div>
                                <div> <b>Matrícula:</b> {usuario.matricula}</div>
                                <div className="d-flex justify-content-center">
                                    <Col className="d-flex justify-content-between pt-3 pb-2 " xs={12}>
                                        <Button variant="warning" onClick={() => abrirModal(true, usuario)} className="align-items-start me-2 " xs={5}>
                                            Editar <FaEdit size="20px"/>
                                        </Button>
                                        <Button variant="danger" type="submit" onClick={() => abrirModalDeRemocao(usuario.id)} className="ms-2 " xs={7}>
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
                    <Button variant="primary" onClick={async () => removeUsuario(idToRemove)}>
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
                    <Modal.Title>Editar usuário: {usuarioEdit.nome}</Modal.Title>
                </Modal.Header>


                <Form className="mx-2 pb-3" validate onSubmit={handleSubmit(editUsuario)} validated={!!errors}>
                    <Modal.Body className="py-3 mb-3 caixa-pesquisa bg-light">

                        <Row>
                            <Col md='8'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">Nome do Usuário</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        className="mb-3"
                                        type='text'
                                        placeholder={usuarioEdit.nome}
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
                                        placeholder={usuarioEdit.cpf}
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
                                        placeholder={usuarioEdit.email}
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
                                    <Form.Label className="mb-0">Telefone ((XX) XXXX-XXXX)</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="tel"
                                        placeholder={usuarioEdit.telefone}
                                        {...register('telefone', {
                                            // required: 'Telefone é obrigatório.',
                                            pattern: {
                                            value: /^(?:\(\d{2}\)\s?|\d{2}\s?)?\d{4,5}-\d{4}$/,
                                            message: 'Telefone inválido',
                                            },
                                        })}
                                    />
                                    {errors.telefone && <span>{errors.telefone.message}</span>}
                                </Form.Group>
                            </Col>
                            <Col md='3'>
                                <Form.Group controlId="searchQuery">
                                    <Form.Label className="mb-0">Matrícula:</Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        placeholder={usuarioEdit.matricula}
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
                                    <Form.Label className="mb-0">Perfil</Form.Label>
                                    {/* Use o Form.Select para selecionar a região */}
                                    <Form.Select
                                    size="lg"
                                    aria-label="Selecione um perfil"
                                    defaultValue={usuarioEdit.perfil}
                                    type='text'
                                    name='perfilC'
                                    error={errors.perfil}
                                        onChange={(e) =>
                                            setUsuarioEdit({
                                            ...usuarioEdit,
                                            perfil: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="admin">admin</option>
                                        <option value="gestor">gestor</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                            <Button variant="secondary" onClick={() => fecharModal()} className="mx-4" size="lg">
                                Fechar
                            </Button>
                            <Button variant="primary" type="submit" size="lg">
                                Editar
                            </Button>
                    </Modal.Footer>
                </Form>



            </Modal>




        </Container>
    );
}
