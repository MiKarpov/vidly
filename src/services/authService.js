import httpService from './httpService';
import logger from './logService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + '/registrations';

export function register(email, password, matchingPassword) {
  const body = {
    email: email,
    password: password,
    matchingPassword: matchingPassword,
  };

  logger.log('Registering user ' + JSON.stringify(body));
  return httpService.post(apiEndpoint, body);
}

export default {
  register,
};
