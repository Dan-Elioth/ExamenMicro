import axios from "axios";

import { APIProducto, headers} from "../services/apiConfig"


export const getProductList = () => {
  return axios.get(APIProducto, { headers
  });
};

export const createProduct = (product) => {
  return axios.post(APIProducto, product, { headers
  });
};

export const updateProduct = (product) => {
  return axios.put(APIProducto, product, { headers
  });
};

export const deleteProduct = (id) => {
  const url = `${APIProducto}/${id}`;
  return axios.delete(url, { headers
  });
};

export const deleteSelectedProducts = (productIds) => {
  const deleteRequests = productIds.map((id) => deleteProduct(id));
  return Promise.all(deleteRequests, { headers
  });
};