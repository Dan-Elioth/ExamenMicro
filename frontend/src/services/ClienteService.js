import axios from "axios";

import { APICliente, headers} from "../services/apiConfig"

export const getClientList = () => {
    return axios.get(APICliente, { headers
    });
  };
  
  export const createClient = (cliente) => {
    return axios.post(APICliente, cliente, { headers
    });
  };
  
  export const updateClient = (cliente) => {
    return axios.put(APICliente, cliente, { headers
    });
  };
  
  export const deleteClient = (id) => {
    const url = `${APICliente}/${id}`;
    return axios.delete(url, { headers
    });
  };
  
  export const deleteSelectedClients = (clienteIds) => {
    const deleteRequests = clienteIds.map((id) =>
    deleteClient(id)
    );
    return Promise.all(deleteRequests, { headers
    });
  };
  