import { api } from "./api";

export async function getNutricionistas() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/nutricionistas', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function deleteNutricionista(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.delete(`/nutricionista/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function updateNutricionista(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/nutricionista/${data.id}`, {
        nome: data.nameNutricionista,
        crn: data.crnNutricionista
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function createNutricionista(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.post('/nutricionista', {
        nome: data.nameNutricionista,
        crn: data.crnNutricionista
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}
