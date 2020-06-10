import httpService from './httpService';
import logger from './logService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + '/account';

export async function register(email, password, matchingPassword) {
  const body = {
    email: email,
    password: password,
    matchingPassword: matchingPassword,
  };

  logger.log('Registering user ' + JSON.stringify(body));
  const { data } = await httpService.post(apiEndpoint + '/register', body);
  saveJwtAndUser(data);
}

export async function login(email, password) {
  const body = {
    email: email,
    password: password,
  };

  logger.log('Authenticating user ' + JSON.stringify(body));
  const { data } = await httpService.post(apiEndpoint + '/auth', body);
  saveJwtAndUser(data);
}

export function logout() {
  localStorage.removeItem('jwt');
  localStorage.removeItem('email');
}

export function getJwt() {
  return localStorage.getItem('jwt');
}

export function getUser() {
  return localStorage.getItem('email');
}

function saveJwtAndUser(data) {
  localStorage.setItem('jwt', data.jwt);
  localStorage.setItem('email', data.email);
}

function getAuthorizationHeader() {
  const jwt = localStorage.getItem('jwt');
  if (!jwt) return null;

  return `Bearer ${jwt}`;
}

export default {
  register,
  login,
  logout,
  getJwt,
  getUser,
  getAuthorizationHeader,
};
