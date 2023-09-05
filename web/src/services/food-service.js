import { api } from "./api";

export async function getFoods() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/foods', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function deleteFood(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.delete(`/food/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function updateFood(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/food/${data.id}`, {
        nome: data.nameFood,
        unidadeMedida: data.unity
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function createFood(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.post('/food', {
        nome: data.nameFood,
        unidadeMedida: data.unity
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}
