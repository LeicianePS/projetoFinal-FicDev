import { api } from "./api";

export async function getBatalhoes() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/batalhoes', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function deleteBatalhao(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.delete(`/batalhao/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function updateBatalhao(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/batalhao/${data.id}`, {
        nome_batalhao: data.nomeBatalhao,
        data_fundacao: data.dataFundacao,
        comandante: data.comandante,
        tipo: data.tipo,
        efetivo: data.efetivo,
        missao_valores: data.missaoValores,
        contato: data.contato,
        comando_regional: data.comandoRegional,
        status: data.statusC,
        id_regiao: data.idRegiao

    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function createBatalhao(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.post('/batalhao', {
        nome_batalhao: data.nomeBatalhao,
        data_fundacao: data.dataFundacao,
        comandante: data.comandante,
        tipo: data.tipo,
        efetivo: data.efetivo,
        missao_valores: data.missaoValores,
        contato: data.contato,
        comando_regional: data.comandoRegional,
        status: data.statusC,
        id_regiao: data.idRegiao
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}




export async function getBatalhaoById(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get(`/batalhao/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}


export async function filtroBatalhao(search) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.post('/batalhao-filtro', {
        paramPesquisa: search
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}


export async function getBatalhoesCR() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/batalhoes-cr', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function getEfetivoCR() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/efetivo-cr', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function getBatalhoesTotal() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/batalhoes-total', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function getEfetivoTotal() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/efetivo-total', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}
