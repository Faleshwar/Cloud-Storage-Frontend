import http from "./http";

export const authApi = {

    login: (data)=> http.post("/auth/login", data),

    register: (data)=> http.post("/auth/register", data),

    googleLogin: (idToken)=> http.post("/auth/google", idToken)
}