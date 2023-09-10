import React from 'react';


import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Foods } from "./pages/Foods";
import { Nutricionistas } from './pages/Nutricionistas'
import DarkModeExemple from './pages/DarkModeExemple'
import MainLayout from './components/MainLayout'; // Importe seu layout principal aqui
import { Batalhoes } from './pages/batalhao/Batalhoes'
import { AdicionarBatalhao } from './pages/batalhao/AdicionarBatalhao'
import { EditarBatalhao } from './pages/batalhao/EditarBatalhao'


import { isAuthenticated } from './utils/is-authenticated';

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



function AppNavigation() {
    const location = useLocation();
  
    console.log('Rota atual:', location.pathname);
  
    return null; // Este componente não renderiza nada, apenas captura a rota atual
  }


export function Navigations() {
    return (
        <BrowserRouter>
        <AppNavigation />
            <Routes>
                <Route index path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />

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
                    path="/foods"
                    element={(
                        <PrivateRoute>
                            <MainLayout>
                                <Foods />
                            </MainLayout>
                        </PrivateRoute>
                    )}
                />

                <Route
                    path="/nutricionistas"
                    element={(
                        <PrivateRoute>
                            <MainLayout>
                                <Nutricionistas />
                            </MainLayout>
                        </PrivateRoute>
                    )}
                />


                <Route
                    path="/darkmode"
                    element={(
                        <PrivateRoute>
                            <MainLayout>
                                <DarkModeExemple />   
                            </MainLayout>
                        </PrivateRoute>
                    )}
                />
            </Routes>
        </BrowserRouter>
    )
}
