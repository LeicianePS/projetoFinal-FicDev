import { api } from "./api";

export async function getUsuarios() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/usuarios', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function deleteUsuario(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.delete(`/usuario/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function updateUsuario(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/usuario/${data.id}`, {
        nome: data.nome,
        cpf: data.cpf,
        email: data.email,
        telefone: data.telefone,
        matricula: data.matricula

    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function createUsuario(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.post('/usuario', {
        nome: data.nome,
        cpf: data.cpf,
        email: data.email,
        //senha: data.senha,
        telefone: data.telefone,
        matricula: data.matricula,
        perfil: data.perfil
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}



export async function getUsuarioById(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get(`/usuario/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function getUsuarioByCPF(cpf) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get(`/usuario-perfil/${cpf}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}


export async function updateSenhaUsuario(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/usuario-senha/${data.id}`, {
        senha: data.senha,
        novaSenha: data.novaSenha,
        novaSenha2: data.novaSenha2
    },{
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}


export async function filtroUsuario(search) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.post('/usuario-filtro', {
        paramPesquisa: search
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}
