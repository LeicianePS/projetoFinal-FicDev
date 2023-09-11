import { api } from "./api";

export async function getRegioes() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/regioes', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function deleteRegiao(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.delete(`/regiao/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function updateRegiao(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/regiao/${data.id}`, {
        id_regiao: data.id,
        nome_regiao: data.nomeRegiao,
        populacao: data.populacao,
        cidadesbairros_atuacao: data.cidadesJurisdicao,

    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function createRegiao(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.post('/regiao', {
        nome_regiao: data.nomeRegiao,
        populacao: data.populacao,
        cidadesbairros_atuacao: data.cidadesJurisdicao,
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}



export async function getRegiaoById(id_regiao) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get(`/regiao/${id_regiao}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}


export async function filtroRegiao(search) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.post('/regiao-filtro', {
        paramPesquisa: search
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}
