import api from './api';

export const getAllSales = () => api.get('/sales');
export const getSaleById = (id) => api.get(`/sales/${id}`);
export const createSale = (data) => api.post('/sales', data);
