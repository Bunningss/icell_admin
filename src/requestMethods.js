import axios from "axios";

// const baseUrl = 'http://localhost:8080/api/v1/'
const baseUrl = "https://icell.azurewebsites.net/api/v1/";

export const publicRequest = axios.create({
  baseURL: baseUrl,
});

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.token;

export const userReq = axios.create({
  baseURL: baseUrl,
  headers: { "auth-token": TOKEN },
});
