import axios from "axios";

import { APICategoria, headers} from "../services/apiConfig"


export const getCategoryList = () => {
  return axios.get(APICategoria, { headers
  });
};

export const createCategory = (categoria) => {
  return axios.post(APICategoria, categoria, { headers
  });
};

export const updateCategory = (categoria) => {
  return axios.put(APICategoria, categoria, { headers
  });
};

export const deleteCategory = (id) => {
  const url = `${APICategoria}/${id}`;
  return axios.delete(url, { headers
  });
};

export const deleteSelectedCategories = (categoriaIds) => {
  const deleteRequests = categoriaIds.map((id) =>
    deleteCategory(id)
  );
  return Promise.all(deleteRequests, { headers
  });
};
