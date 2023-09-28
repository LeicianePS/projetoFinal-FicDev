import { useState } from "react";
import { Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { Input } from "../components/Input";

import { loginUser } from '../services/user-services';

import login from '../assets/images/login_img.png';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import brasao from '../assets/images/brasao_mt.png';
import AlertaFeedback from "../components/layout/Alert";

export function Login() {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const [alerta, setAlerta] = useState({});

    const onSubmit = async (data) => {
        try {
            const user = await loginUser(data);
            //setResult(user);
            setAlerta({
                message: "Entrando na conta",
                variant: 'success'
            });
            setShow(true);
            setTimeout(() => {
                navigate('/home-dash');
            }, 100);
        } catch (error) {
            // setResult({
            //     title: 'Houve um erro no login!',
            //     message: "Login não pode ser concluído",
            //     variant: 'danger'
            // });
            setAlerta({
                message: "Não foi possível concluir o login, verifique seus dados",
                variant: 'danger'
            })
            setShow(true);
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
                    
                    { show ?  <AlertaFeedback  setShow={setShow} alerta={alerta}></AlertaFeedback> : <></>  }

                    
                    <div className="d-flex justify-content-center">
                        <img src={brasao} alt="" width={"120px"} className='mx-2 '/>
                    </div>
                        <h1 className="rounded d-flex justify-content-center py-2 " > Gestão de Batalhões </h1>
                    <h5 className="rounded d-flex justify-content-center py-4 " > Acessar Conta </h5>
                    <Form
                        noValidate
                        validated={!!errors}
                        onSubmit={handleSubmit(onSubmit)}
                        className=" rounded p-4 d-flex align-items-center"
                    >
                        <Col>
                            <Input
                                className="mb-4"
                                label="CPF"
                                type="text"
                                placeholder="Insira seu cpf (ex: 987.654.321-10)"
                                error={errors.cpf}
                                required={true}
                                name="cpf"
                                validations={register('cpf', {
                                    required: {
                                        value: true,
                                        message: 'CPF é obrigatório'
                                    },
                                    pattern: {
                                        value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/, // Formato de CPF: 999.999.999-99
                                        message: 'CPF inválido',
                                    },
                                })}
                            />

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

                            <div className="d-flex justify-content-between align-items-center">
                                <Button type="submit" size="lg">Entrar</Button>
                                <Link to="/solicitar-recuperar-senha">Recuperar Senha</Link>
                            </div>
                        </Col>
                    </Form>
                </Col>
            </Row>
    );
}
