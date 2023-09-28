import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:8080', //15.229.118.130
    headers: {
        "Content-Type": 'application/json'
    }
});
