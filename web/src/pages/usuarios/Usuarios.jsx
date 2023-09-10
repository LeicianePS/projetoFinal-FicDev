import { Container, Col, Modal, Row, Table, Form, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { FaPlus, FaSearch, FaTrash, FaEdit, FaTimes } from 'react-icons/fa';

//import { Usuario } from "../../components/Usuario";
import { Header } from "../../components/Header";
import { Input } from '../../components/Input';

import { createUsuario, deleteUsuario, getUsuarios, updateUsuario, filtroUsuario } from "../../services/usuario-service";

export function Usuarios() {
    const [batalhoes, setUsuarios] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
    const { handleSubmit, register, formState: { errors } } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        findUsuarios();
        // eslint-disable-next-line
    }, []);

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

    async function editUsuario(data) {
        try {
            await updateUsuario({
                id: usuarioEdit.id,
                nome: data.nome,
                cpf: data.cpf,
                email: data.email,
                senha: data.senha,
                telefone: data.telefone,
                matricula: data.matricula
            });
            setIsUpdated(false);
            await findUsuarios();
        } catch (error) {
            console.error(error);
        }
    }

    const [usuarioEdit, setUsuarioEdit] = useState([]);
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
                <h5>Batalhões</h5>
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
                        {batalhoes && batalhoes.length > 0
                        ? batalhoes.map((usuario, index) => (
                            <tr key={index}>
                                <td>{usuario.id}</td>
                                <td>{usuario.nome}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.cpf}</td>
                                <td>{usuario.telefone}</td>
                                <td>{usuario.matricula}</td>
                                <td className="d-flex justify-content-center">
                                    <Link className="mx-1 px-1" onClick={() => abrirModal(true, usuario)}><FaEdit size="18px"/></Link> 
                                    
                                    {/* <Link className="mx-1 px-1" to={`/usuario-editar/${usuario.id}`}><FaEdit size="18px"/></Link>  */}
                                    
                                    {/* <button className="mx-1 px-1" onClick={() => abrirEditarUsuario(usuario)}><FaEdit size="18px"/></button>  */}
                                    <Link className="mx-1 px-1" onClick={async () => await removeUsuario(usuario.id)}><FaTrash size="18px"/></Link>
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
                                    <Input
                                        className="mb-3"
                                        type='text'
                                        defaultValue={usuarioEdit.nome}
                                        label=''
                                        placeholder='Insira o nome do Batalhão'
                                        required={true}
                                        name='nome'
                                        error={errors.nome}
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
                                    <Input
                                        className="mb-3"
                                        type='text'
                                        defaultValue={usuarioEdit.cpf}
                                        label=''
                                        placeholder='Cpf'
                                        required={true}
                                        name='cpf'
                                        error={errors.cpf}
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
                                    <Input
                                        className="mb-3"
                                        type='text'
                                        defaultValue={usuarioEdit.email}
                                        label=''
                                        placeholder='E-mail'
                                        required={true}
                                        name='email'
                                        error={errors.email}
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
                                    <Input
                                        className="mb-3"
                                        type='text'
                                        defaultValue={usuarioEdit.senha}
                                        label=''
                                        placeholder='Senha'
                                        required={true}
                                        name='senha'
                                        error={errors.senha}
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
                                    <Input
                                        className="mb-3"
                                        type='text'
                                        defaultValue={usuarioEdit.telefone}
                                        label=''
                                        placeholder='Telefone'
                                        required={true}
                                        name='telefone'
                                        error={errors.telefone}
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
                                    <Input
                                        className="mb-3"
                                        type='text'
                                        defaultValue={usuarioEdit.matricula}
                                        label=''
                                        placeholder='Matrícula'
                                        required={true}
                                        name='matricula'
                                        error={errors.matricula}
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
