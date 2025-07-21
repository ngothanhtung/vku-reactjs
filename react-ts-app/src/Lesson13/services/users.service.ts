import { apiClient } from '../libraries/api-client';

export const getUsers = async () => {
  const result = await apiClient.get('/security/users');
  return result;
};

export const getUserById = async (id: number) => {
  const result = await apiClient.get(`/security/users/${id}`);
  return result;
};

export const createUser = async (user: { username: string; password: string; fullName: string }) => {
  const result = await apiClient.post('/security/users', user);
  return result;
};

export const updateUser = async (id: number, user: { username: string; fullName: string }) => {
  const result = await apiClient.patch(`/security/users/${id}`, user);
  return result;
};

export const deleteUser = async (id: number) => {
  const result = await apiClient.delete(`/security/users/${id}`);
  return result;
};

export const addRoleToUser = async (userId: number, roleId: number) => {
  const result = await apiClient.put(`/security/users/${userId}/add-role-to-user`, { roleId });
  return result;
};

export const removeRoleFromUser = async (userId: number, roleId: number) => {
  const result = await apiClient.put(`/security/users/${userId}/remove-role-from-user`, { roleId });
  return result;
};
