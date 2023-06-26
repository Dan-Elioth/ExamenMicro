import axios from "axios";
import { APIAuth,  headers } from "./apiConfig";


export const createUser = (user) => {
    return axios.post(APIAuth, user, { headers });
};

export const createLogin = (login) => {
    return axios.post(APIAuth, login, { headers });
};