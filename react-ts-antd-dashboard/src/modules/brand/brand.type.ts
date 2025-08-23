export interface IBrandDTO {
    brand_name: string;
    slug: string;
    description: string; 
}

export interface IBrand extends IBrandDTO{
    id: number;
}

export interface IBrandResponse {
    data: {
        data: IBrand[];
        totalRecords: number;
        page: number;
        limit: number;
        totalPages: number;
    }
}

export interface ICreateBrandResponse {
    data:  IBrand
}

export interface IUpdateBrandResponse {
    data:  IBrand
}