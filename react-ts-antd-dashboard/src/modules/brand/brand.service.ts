import axios from "axios"
import type { IBrandDTO, IBrandResponse, ICreateBrandResponse, IUpdateBrandResponse } from "./brand.type"
export const fetchBrands = async ({page=1, limit=2}: {page: number, limit: number}): Promise<IBrandResponse> => {
        const response = await axios.get(`https://learn-backend-nodejs.onrender.com/api/v1/brands?page=${page}&limit=${limit}`)
        //bắt buộc phải return
        return response.data
}

export const createBrand = async (payload: IBrandDTO): Promise<ICreateBrandResponse> => {
        const response = await axios.post(`https://learn-backend-nodejs.onrender.com/api/v1/brands`, payload)
        //bắt buộc phải return
        return response.data
}

export const updateBrand = async (payload: IBrandDTO & { id: number }): Promise<IUpdateBrandResponse> => {
        const {id, ...data} = payload;
        const response = await axios.put(`https://learn-backend-nodejs.onrender.com/api/v1/brands/${id}`, data)
        //bắt buộc phải return
        return response.data
}

export const deleteBrand = async (id: number): Promise<IUpdateBrandResponse> => {
        const response = await axios.delete(`https://learn-backend-nodejs.onrender.com/api/v1/brands/${id}`)
        //bắt buộc phải return
        return response.data
}