import axios from "axios";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})


export const loginApi = {
    login: (email: string, password: string, rememberMe: boolean) => instance.post('auth/login', {
        email,
        password,
        rememberMe
    }),
}