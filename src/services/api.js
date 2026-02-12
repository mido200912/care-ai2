import axios from 'axios';

const API_BASE_URL = 'https://controlled-ruperta-care-ai-0c006943.koyeb.app';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle token expiration
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth APIs
export const authAPI = {
    register: (userData) => api.post('/api/users/register', userData),
    login: (credentials) => api.post('/api/users/login', credentials),
    deleteAccount: () => api.delete('/api/users/delete'),
};

// Patient Medical Profile APIs
export const medicalAPI = {
    createProfile: (profileData) => api.post('/api/patients/medical-profile', profileData),
    updateProfile: (profileData) => api.put('/api/patients/medical-profile', profileData),
    getProfile: () => api.get('/api/patients/medical-profile'),
};

// Chatbot APIs
export const chatAPI = {
    sendQuery: (question) => api.post('/api/chatbot/query', { question }),
};

// Hospital APIs
export const hospitalAPI = {
    register: (hospitalData) => api.post('/api/hospitals/register', hospitalData),
};

export default api;
