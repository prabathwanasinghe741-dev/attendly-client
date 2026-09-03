import axios from 'axios';
import { readToken } from './session';

const api = axios.create({
    baseURL: "http://10.73.0.186:4000"
});

api.interceptors.request.use((request) => {
    request.headers.Authorization = "zD0730OD76308";
    if (readToken()) {
        request.headers['X-User-ID'] = readToken();
    }
    return request;
});

api.interceptors.response.use((response) => {
    return response.data;
});

export default api;