// config/axios.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000', // URL base da sua API
});

export default api;
