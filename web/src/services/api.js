import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://15.229.118.130:8080', //15.228.159.110
    headers: {
        "Content-Type": 'application/json'
    }
});
