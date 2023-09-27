import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://15.229.118.130:8080', //15.229.118.130
    headers: {
        "Content-Type": 'application/json'
    }
});
