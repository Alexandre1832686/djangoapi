import { AxiosResponse } from "axios";
import CustomAxios from "./CustomAxios";
import IRating from "../data_interfaces/IRating";


const url = "ratings/";



const create = (
  ratingamount_form: number,
  commentaire_form: string,
  product_form: number
  
): Promise<AxiosResponse<IRating>> => (
  CustomAxios.post<unknown, AxiosResponse<IRating>>(
    'createrating/', 
    { 
      ratingamount : ratingamount_form,
      commentaire : commentaire_form,
      product : product_form }
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
