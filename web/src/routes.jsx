import React from 'react';


import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import DarkModeExemple from './pages/DarkModeExemple'
import MainLayout from './components/MainLayout'; // Importe seu layout principal aqui
import { Batalhoes } from './pages/batalhao/Batalhoes'
import { AdicionarBatalhao } from './pages/batalhao/AdicionarBatalhao'
import { EditarBatalhao } from './pages/batalhao/EditarBatalhao'

import { Regioes } from './pages/regiao/Regioes'
import { AdicionarRegiao } from './pages/regiao/AdicionarRegiao'
import { EditarRegiao } from './pages/regiao/EditarRegiao'

import { isAuthenticated, isTokenSenha } from './utils/is-authenticated';
import { Usuarios } from './pages/usuarios/Usuarios';
import { AdicionarUsuario } from './pages/usuarios/AdicionarUsuario';
import { EditarUsuario } from './pages/usuarios/EditarUsuario';
import { PerfilUsuario } from './pages/usuarios/PerfilUsuario';
import  SolicitarRecuperarSenha  from './pages/usuarios/SolicitarRecuperarSenha';
import  RecuperarSenha  from './pages/usuarios/RecuperarSenha';

import { Militares } from './pages/militar/Militares';
import { AdicionarMilitar } from './pages/militar/AdicionarMilitar';

import { HomeDashboard } from './pages/HomeDashboard';

/**
 * Cria rotas autenticadas
 */
export function PrivateRoute({ children }) {
    if (!isAuthenticated()) {
        // Pode trocar para renderizar uma página customizada de não autorizada,
        // nesse caso ele vai voltar para a tela de login
        return <Navigate to="/" replace />
    }
    return children;
}

export function TokenSenha({ children }) {
    if (!isTokenSenha()) {
        return <Navigate to="/" replace />
    }
    return children
}


function AppNavigation() {
    const location = useLocation();

    //console.log('Rota atual:', location.pathname);

    return null; // Este componente não renderiza nada, apenas captura a rota atual
}


export function Navigations() {
    return (
        <BrowserRouter>
        <AppNavigation />
            <Routes>
                <Route index path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/solicitar-recuperar-senha" element={<SolicitarRecuperarSenha />} />

                {/* <Route
                    path="/recuperar-senha"
                    element={(

                        <RecuperarSenha/>

                    )}
                /> */}
                <Route
                    path="/recuperar-senha"
                    element={(
                        <TokenSenha>
                            <RecuperarSenha/>
                        </TokenSenha>
                    )}
                />


                <Route
                    path="/home-dash"
                    element={(
                        <PrivateRoute>
                            <MainLayout>
                                <HomeDashboard />
                            </MainLayout>
                        </PrivateRoute>
                    )}
                />

                <Route
                    path="/batalhoes"
                    element={(
                        <PrivateRoute>
                            <MainLayout>
                                <Batalhoes />
                            </MainLayout>
                        </PrivateRoute>
                    )}
                />
                <Route
                    path="/batalhao-adicionar"
                    element={(
                        <PrivateRoute>
                            <MainLayout>
                                <AdicionarBatalhao />
                            </MainLayout>
                        </PrivateRoute>
                    )}
                />
                <Route
                    path="/batalhao-editar/:id"
                    element={(
                        <PrivateRoute>
                            <MainLayout>
                                <EditarBatalhao />
                            </MainLayout>
                        </PrivateRoute>
                    )}
                />




                <Route
                    path="/regioes"
                    element={(
                        <PrivateRoute>
                            <MainLayout>
                                <Regioes />
                            </MainLayout>
                        </PrivateRoute>
                    )}
                />
                <Route
                    path="/regiao-adicionar"
                    element={(
                        <PrivateRoute>
                            <MainLayout>
                                <AdicionarRegiao />
                            </MainLayout>
                        </PrivateRoute>
                    )}
                />
                <Route
                    path="/regiao-editar/:id"
                    element={(
                        <PrivateRoute>
                            <MainLayout>
                                <EditarRegiao />
                            </MainLayout>
                        </PrivateRoute>
                    )}
                />






                <Route
                    path="/usuarios"
                    element={(
                        <PrivateRoute>
                            <MainLayout>
                                <Usuarios />
                            </MainLayout>
                        </PrivateRoute>
                    )}
                />
                <Route
                    path="/usuario-adicionar"
                    element={(
                        <PrivateRoute>
                            <MainLayout>
                                <AdicionarUsuario />
                            </MainLayout>
                        </PrivateRoute>
                    )}
                />
                <Route
                    path="/usuario-editar/:id"
                    element={(
                        <PrivateRoute>
                            <MainLayout>
                                <EditarUsuario />
                            </MainLayout>
                        </PrivateRoute>
                    )}
                />
                <Route
                    path="/usuario-perfil"
                    element={(
                        <PrivateRoute>
                            <MainLayout>
                                <PerfilUsuario />
                            </MainLayout>
                        </PrivateRoute>
                    )}
                />






                <Route
                    path="/militares"
                    element={(
                        <PrivateRoute>
                            <MainLayout>
                                <Militares />
                            </MainLayout>
                        </PrivateRoute>
                    )}
                />
                <Route
                    path="/militar-adicionar"
                    element={(
                        <PrivateRoute>
                            <MainLayout>
                                <AdicionarMilitar />
                            </MainLayout>
                        </PrivateRoute>
                    )}
                />

            </Routes>
        </BrowserRouter>
    )
}
