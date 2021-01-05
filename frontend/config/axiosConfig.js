import axios from 'axios';

const instanceApi = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instanceApi;
