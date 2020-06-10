import httpService from './httpService';
import logger from './logService';
import { apiUrl } from '../config.json';
import authServcie from './authService';

const apiEndpoint = apiUrl + '/movies';

export function getMovies() {
  logger.log('Fetching movies...');
  return httpService.get(apiEndpoint, config());
}

function config() {
  const jwt = authServcie.getJwt();
  if (jwt) {
    return { headers: { Authorization: `Bearer ${jwt}` } };
  } else {
    return null;
  }
}

export function getMovie(movieId) {
  logger.log('Fetching movie by id = ' + movieId);
  return httpService.get(apiEndpoint + '/' + movieId);
}

export function deleteMovie(movieId) {
  logger.log('Deleting movie by id = ' + movieId);
  return httpService.delete(apiEndpoint + '/' + movieId);
}

export function saveMovie(movie) {
  const body = {
    id: movie.id,
    title: movie.title,
    genre: { id: movie.genreId },
    numberInStock: movie.numberInStock,
    dailyRentalRate: movie.dailyRentalRate,
  };

  if (movie.id) {
    logger.log('Updating movie with id = ', movie.id);
    return httpService.put(apiEndpoint + '/' + movie.id, body);
  } else {
    logger.log('Adding new movie');
    return httpService.post(apiEndpoint, body);
  }
}
