import { useState } from "react";
import { Button, Row, Col, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { Input } from "../components/Input";
import { Header } from '../components/Header';
import { Modal } from '../components/Modal';

import { loginUser } from '../services/user-services';

import login from '../assets/images/login_img.png';


export function Login() {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const user = await loginUser(data);
            setResult(user);
            navigate('/home-dash');
        } catch (error) {
            setResult({
                title: 'Houve um erro no login!',
                message: error.response.data.error,
            });
        }
    }

    return (
        
            <Row className="align-items-center">
                <Col className="d-flex justify-content-center login-left">
                    <img src={login} alt="" className="image-login align-items-center"/>
                </Col>

                <Col className="justify-content-center m-0 p-0  bordered">
                    <h3 className="rounded d-flex justify-content-center py-4 " > Entre na sua conta </h3> 
                    <Form
                        noValidate
                        validated={!!errors}
                        onSubmit={handleSubmit(onSubmit)}
                        className=" rounded p-5 d-flex align-items-center"
                    >
                        <Col>
                            <Input
                                className="mb-4"
                                label="CPF"
                                type="text"
                                placeholder="Insira seu cpf"
                                error={errors.cpf}
                                required={true}
                                name="cpf"
                                validations={register('cpf', {
                                    required: {
                                        value: true,
                                        message: 'CPF é obrigatório'
                                    },
                                    // pattern: {
                                    //     value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
                                    //     message: 'CPF inválido!'
                                    // }
                                })}
                            />
                            <Input
                                className="mb-4"
                                label="Senha"
                                type="senha"
                                placeholder="Insira sua senha"
                                error={errors.senha}
                                required={true}
                                name="senha"
                                validations={register('senha', {
                                    required: {
                                        value: true,
                                        message: 'Senha é obrigatório'
                                    }
                                })}
                            />
                            <div className="d-flex justify-content-between">
                                <Button type="submit">Entrar</Button>
                                <Link to="/register">Criar conta</Link>
                            </div>
                        </Col>
                    </Form>
                </Col>
            </Row>
    );
}






// import { useState } from "react";
// import { Button, Col, Container, Form } from "react-bootstrap";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";

// import { Input } from "../components/Input";
// import { Header } from '../components/Header';
// import { Modal } from '../components/Modal';

// import { loginUser } from '../services/user-services';

// export function Login() {
//     const { handleSubmit, register, formState: { errors } } = useForm();
//     const [result, setResult] = useState(null);
//     const navigate = useNavigate();

//     const onSubmit = async (data) => {
//         try {
//             const user = await loginUser(data);
//             setResult(user);
//             navigate('/nutricionistas');
//         } catch (error) {
//             setResult({
//                 title: 'Houve um erro no login!',
//                 message: error.response.data.error,
//             });
//         }
//     }

//     return (
//         <Container>
//             <Modal
//                 show={result}
//                 title={result?.title}
//                 message={result?.message}
//                 handleClose={() => setResult(null)}
//             />
//             <Header title="Entre na sua conta" />
//             <Form
//                 noValidate
//                 validated={!!errors}
//                 onSubmit={handleSubmit(onSubmit)}
//                 className="bg-light rounded p-5 shadow w-50 m-auto"
//             >
//                 <Col>
//                     <Input
//                         className="mb-4"
//                         label="E-mail"
//                         type="text"
//                         placeholder="Insira seu e-mail"
//                         error={errors.email}
//                         required={true}
//                         name="email"
//                         validations={register('email', {
//                             required: {
//                                 value: true,
//                                 message: 'E-mail é obrigatório'
//                             },
//                             pattern: {
//                                 value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
//                                 message: 'E-mail inválido!'
//                             }
//                         })}
//                     />
//                     <Input
//                         className="mb-4"
//                         label="Senha"
//                         type="password"
//                         placeholder="Insira sua senha"
//                         error={errors.password}
//                         required={true}
//                         name="password"
//                         validations={register('password', {
//                             required: {
//                                 value: true,
//                                 message: 'Senha é obrigatório'
//                             }
//                         })}
//                     />
//                     <div className="d-flex justify-content-between">
//                         <Button type="submit">Entrar</Button>
//                         <Link to="/register">Criar conta</Link>
//                     </div>
//                 </Col>
//             </Form>
//         </Container>
//     );
// }
