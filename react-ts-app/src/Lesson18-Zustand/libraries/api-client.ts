/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios from 'axios';

const URL = 'https://api.escuelajs.co/api/v1';

const apiClient = Axios.create({
  baseURL: URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
