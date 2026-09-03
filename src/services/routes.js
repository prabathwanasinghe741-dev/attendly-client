import api from "./api.js";

// Users
export const verifyToken = (token) => api.get(`/api/v1/users/verify/${token}`);
export const aboutMe = () => api.get(`/api/v1/users/me`);
export const registerUser = (data) => api.post('/api/v1/users/add/new', data);
export const loginUser = (data) => api.post('/api/v1/users/login', data);

// Sections
export const addSection = (name) => api.get(`/api/v1/sections/add/${name}`);
export const deleteSection = (name) => api.get(`/api/v1/sections/delete/${name}`);
export const getAllSections = () => api.get('/api/v1/sections/all');

// Class
export const getAllInSection = (section) => api.get(`/api/v1/class/get/${section}`);
export const deleteClass = (section, name) => api.get(`/api/v1/class/delete/${section}/${name}`);
export const getAllClass = (section, name) => api.get(`/api/v1/class/all`);
export const classForMe = () => api.get('/api/v1/class/user');
export const amIin = () => api.get('/api/v1/class/user/in');
export const leaveClass = (id) => api.get(`/api/v1/class/leave/${id}`);
export const addClass = (data) => api.post('/api/v1/class/add/new', data);
export const enterClass = (data) => api.post('/api/v1/class/enter', data);