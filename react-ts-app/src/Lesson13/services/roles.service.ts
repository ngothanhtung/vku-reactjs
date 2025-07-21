import { apiClient } from '../libraries/api-client';

export const getRoles = async () => {
  const result = await apiClient.get('/security/roles');
  return result;
};

export const getRoleById = async (id: number) => {
  const result = await apiClient.get(`/security/roles/${id}`);
  return result;
};

export const createRole = async (role: { code: string; name: string; description: string }) => {
  const result = await apiClient.post('/security/roles', role);
  return result;
};

export const updateRole = async (id: number, role: { code: string; name: string; description: string }) => {
  const result = await apiClient.patch(`/security/roles/${id}`, role);
  return result;
};

export const deleteRole = async (id: number) => {
  const result = await apiClient.delete(`/security/roles/${id}`);
  return result;
};

export const getUsersByRoleId = async (id: number) => {
  const result = await apiClient.get(`/security/roles/${id}/users`);
  return result;
};
