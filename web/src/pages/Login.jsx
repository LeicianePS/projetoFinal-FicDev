import { useState } from "react";
import { Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { Input } from "../components/Input";

import { loginUser } from '../services/user-services';

import login from '../assets/images/login_img.png';
import { FaEye, FaEyeSlash } from "react-icons/fa";


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

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

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

                               {/* <Input
                                    className="mb-4"
                                    label="Senha"
                                    type={showPassword ? 'text' : 'password'}
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
                                />  */}

                            <InputGroup className="mb-3">
                                <Input
                                    className="mb-10 col-md-10"
                                    label="Senha"
                                    type={showPassword ? 'text' : 'password'}
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
                                <button
                                    
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={togglePasswordVisibility} 
                                >
                                    {showPassword ? <FaEye/> : <FaEyeSlash/>}
                                </button>
                            </InputGroup>

                            <div className="d-flex justify-content-between">
                                <Button type="submit" size="lg">Entrar</Button>
                                <Link to="/solicitar-recuperar-senha">Recuperar Senha</Link>
                            </div>
                        </Col>
                    </Form>
                </Col>
            </Row>
    );
}
