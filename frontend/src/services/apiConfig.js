const API = "http://localhost:9090";

export const APICategoria = `${API}/categoria`;
export const APIProducto = `${API}/producto`;

export const APIAuth = `${API}/auth`;

const token = localStorage.getItem("token");
export const headers = {
  Authorization: `Bearer ${token}`
};
