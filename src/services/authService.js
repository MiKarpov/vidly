import httpService from "./httpService";
import logger from "./logService";
import { apiUrl } from "../config.json";

export async function register(email, password, matchingPassword) {
  const body = {
    email: email,
    password: password,
    matchingPassword: matchingPassword,
  };

  logger.log("Registering user " + JSON.stringify(body));
  const { data } = await httpService.post(apiUrl + "/registrations", body);
  saveJwtAndUser(data);
}

export async function login(email, password) {
  const body = {
    email: email,
    password: password,
  };

  logger.log("Authentication user " + JSON.stringify(body));
  const { data } = await httpService.post(apiUrl + "/auth", body);
  saveJwtAndUser(data);
}

export function logout() {
  localStorage.removeItem("jwt");
  localStorage.removeItem("user");
}

export function getJwt() {
  return localStorage.getItem("token");
}

export function getUser() {
  return localStorage.getItem("user");
}

function saveJwtAndUser(data) {
  localStorage.setItem("token", data.jwt);
  localStorage.setItem("user", data.email);
}

export default {
  register,
  login,
  logout,
  getJwt,
  getUser,
};
