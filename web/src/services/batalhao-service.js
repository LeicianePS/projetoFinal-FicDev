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
        nome: data.nameBatalhao,
        crn: data.crnBatalhao
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
        nome: data.nameBatalhao,
        crn: data.crnBatalhao
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}
