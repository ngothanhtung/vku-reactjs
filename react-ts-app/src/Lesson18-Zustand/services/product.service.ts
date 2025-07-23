import apiClient from '../libraries/api-client';

export const getProducts = async () => {
  const result = await apiClient.get('/products');
  return result;
};
