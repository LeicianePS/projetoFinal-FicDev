import { Container, Col, Modal, Row, Table, Form, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { FaPlus, FaSearch, FaTrash, FaEdit, FaTimes, FaPen } from 'react-icons/fa';

//import { Usuario } from "../../components/Usuario";
import { Header } from "../../components/Header";
import { Input } from '../../components/Input';

import { createUsuario, deleteUsuario, getUsuarios, updateUsuario, filtroUsuario } from "../../services/usuario-service";
import PaginationComponent from "../../components/PaginationComponent";
import AlertaFeedback from "../../components/layout/Alert";

export function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
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
            await deleteUsuario(id);
            await findUsuarios();
        } catch (error) {
            console.error(error);
        }
    }

    async function addUsuario(data) {
        try {
            await createUsuario(data);
            setIsCreated(false);
            await findUsuarios();
        } catch (error) {
            console.error(error);
        }
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
    async function editUsuario() {
        try {
            await updateUsuario({
                id: usuarioEdit.id,
                nome: usuarioEdit.nome,
                cpf: usuarioEdit.cpf,
                email: usuarioEdit.email,
                senha: usuarioEdit.senha,
                telefone: usuarioEdit.telefone,
                matricula: usuarioEdit.matricula
            });
            setIsUpdated(false);
            await findUsuarios();
        } catch (error) {
            console.error(error);
        }
    }

    
    const abrirModal = (trueFalse, usuario ) => {
        setIsUpdated(trueFalse);
        setUsuarioEdit(usuario)
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



            <Row className="justify-content-between p-4 align-items-center">
                <Col md='6' xs='7' className="">
                    <Header title="Listagem de Usuários"  />
                </Col>
                <Col className="d-flex justify-content-end">
                    <Button className="align-items-center" onClick={() => setIsCreated(true)}>
                        <Link to="/usuario-adicionar">Adicionar <b ><FaPlus/></b> </Link>
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
                            <Form.Label  className="b-0">Buscar por Nome, email ou cpf:</Form.Label>
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
                    <Button variant="outline-secondary" onClick={() => {setQuery(''); filtrarUsuario('')}} className="align-items-center mx-4">
                        Limpar <FaTimes/>
                    </Button>
                    <Button variant="outline-primary" type="submit" className="align-items-center">
                        Pesquisar <FaSearch/>
                    </Button>
                </Col>
            </Form>


            <Row className="justify-content-between m-4 align-items-center bg-light ">   {/* d-none d-md-block */}
                <h5>Usuários</h5>
                <Table responsive striped bordered hover className="col-md-10 my-1 ">
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
                                    <Link className="mx-1 px-1" onClick={() => abrirModal(true, usuario)}><FaEdit size="18px"/></Link> 
                                    
                                    {/* <Link className="mx-1 px-1" to={`/usuario-editar/${usuario.id}`}><FaPen size="18px"/></Link>  */}
                                    
                                    {/* <button className="mx-1 px-1" onClick={() => abrirEditarUsuario(usuario)}><FaEdit size="18px"/></button>  */}
                                    <Link className="mx-1 px-1" onClick={() => abrirModalDeRemocao(usuario.id)}><FaTrash size="18px"/></Link>
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


            <Modal show={isUpdated} onHide={() => setIsUpdated(false)} size="xl">
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
                                        className="mb-3"
                                        type='text'
                                        defaultValue={usuarioEdit.nome}
                                        label=''
                                        placeholder='Insira o nome do Batalhão'
                                        required={true}
                                        name='nome'
                                        error={errors.nome}
                                        onChange={(e) =>
                                            setUsuarioEdit({
                                              ...usuarioEdit,
                                              nome: e.target.value,
                                            })
                                          }
                                        validations={register('nome', {
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
                                    <Form.Label className="mb-0">CPF</Form.Label>
                                    <Form.Control
                                        className="mb-3"
                                        type='text'
                                        defaultValue={usuarioEdit.cpf}
                                        label=''
                                        placeholder='Cpf'
                                        required={true}
                                        name='cpf'
                                        error={errors.cpf}
                                        onChange={(e) =>
                                            setUsuarioEdit({
                                              ...usuarioEdit,
                                              cpf: e.target.value,
                                            })
                                          }
                                        validations={register('cpf', {
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
                                    <Form.Label className="mb-0">E-mail</Form.Label>
                                    <Form.Control
                                        className="mb-3"
                                        type='email'
                                        defaultValue={usuarioEdit.email}
                                        label=''
                                        placeholder='E-mail'
                                        required={true}
                                        name='email'
                                        error={errors.email}
                                        onChange={(e) =>
                                            setUsuarioEdit({
                                              ...usuarioEdit,
                                              email: e.target.value,
                                            })
                                          }
                                        validations={register('email', {
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
                                    <Form.Label className="mb-0">Senha:</Form.Label>
                                    <Form.Control
                                        className="mb-3"
                                        type='text'
                                        defaultValue={usuarioEdit.senha}
                                        label=''
                                        placeholder='Senha'
                                        required={true}
                                        name='senha'
                                        error={errors.senha}
                                        onChange={(e) =>
                                            setUsuarioEdit({
                                              ...usuarioEdit,
                                              senha: e.target.value,
                                            })
                                          }
                                        validations={register('senha', {
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
                                    <Form.Label className="mb-0">Telefone:</Form.Label>
                                    <Form.Control
                                        className="mb-3"
                                        type='text'
                                        defaultValue={usuarioEdit.telefone}
                                        label=''
                                        placeholder='Telefone'
                                        required={true}
                                        name='telefone'
                                        error={errors.telefone}
                                        onChange={(e) =>
                                            setUsuarioEdit({
                                              ...usuarioEdit,
                                              telefone: e.target.value,
                                            })
                                          }
                                        validations={register('telefone', {
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
                                    <Form.Label className="mb-0">Matrícula:</Form.Label>
                                    <Form.Control
                                        className="mb-3"
                                        type='text'
                                        defaultValue={usuarioEdit.matricula}
                                        label=''
                                        placeholder='Matrícula'
                                        required={true}
                                        name='matricula'
                                        error={errors.matricula}
                                        onChange={(e) =>
                                            setUsuarioEdit({
                                              ...usuarioEdit,
                                              matricula: e.target.value,
                                            })
                                          }
                                        validations={register('matricula', {
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
