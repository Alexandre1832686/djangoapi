import { AxiosResponse } from "axios";
import CustomAxios from "./CustomAxios";
import IRating from "../data_interfaces/IRating";


const url = "ratings/";



const create = (
  user: number,
  ratingamount: number,
  commentaire: string,
  product: number
): Promise<AxiosResponse<IRating>> => (
  CustomAxios.post<unknown, AxiosResponse<IRating>>(
    'ratings/create/', { user,
      ratingamount,
      commentaire,
      product }
  )
);


const get = (id: number): Promise<AxiosResponse<IRating>> => (
  CustomAxios.get(`${url}${id}`)
);

const getAll = (id: number): Promise<AxiosResponse<IRating[]>> => (
  CustomAxios.get(`get-all-ratings/${id}`)
  
);

const remove = (id: number): Promise<AxiosResponse> => (
  CustomAxios.delete(`${url}${id}/`)
);

const update = (product: IRating): Promise<AxiosResponse<IRating>> => (
  CustomAxios.put(`${url}${product.id}/`, product)
);



const RatingDS = {
  create,
  get,
  getAll,
  remove,
  update,
 
}

export default RatingDS;
