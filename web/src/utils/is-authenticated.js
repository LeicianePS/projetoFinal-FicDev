/**
 * Verifica se o usuário está autenticado, verificando se possue o item 'token' no sessionStorage do navegador
 */

export const isAuthenticated = () => {
    const accessToken = sessionStorage.getItem('token');
    return accessToken;
};

export const isTokenSenha = () => {
    // if (!token) {
    //     return false;
    // }
    // return true;
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    return token;
};
