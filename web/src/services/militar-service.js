import { api } from "./api";

export async function getMilitares() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/militares', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function deleteMilitar(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.delete(`/militar/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function updateMilitar(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/militar/${data.id}`, {
        nome: data.nome,
        cpf: data.cpf,
        email: data.email,
        nascimento: data.nascimento,
        posto: data.posto,
        salario_atual: data.salarioAtual,
        matricula: data.matricula,
        id_batalhao: data.idBatalhao

    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function createMilitar(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.post('/militar', {
        nome: data.nome,
        cpf: data.cpf,
        email: data.email,
        nascimento: data.nascimento,
        posto: data.posto,
        salario_atual: data.salarioAtual,
        matricula: data.matricula,
        id_batalhao: data.idBatalhao
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}



export async function getMilitarById(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get(`/militar/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}



export async function filtroMilitar(search) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.post('/militar-filtro', {
        paramPesquisa: search
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}


export async function getSalariosTotal() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/salarios-total', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function getSalariosMedia() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/salarios-media', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}
