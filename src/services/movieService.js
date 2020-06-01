import httpService from "./httpService";
import logger from "./logService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/movies";

export function getMovies() {
  logger.log("Fetching movies...");
  return httpService.get(apiEndpoint);
}

export function getMovie(movieId) {
  logger.log("Fetching movie by id = " + movieId);
  return httpService.get(apiEndpoint + "/" + movieId);
}

export function deleteMovie(movieId) {
  logger.log("Deleting movie by id = " + movieId);
  return httpService.delete(apiEndpoint + "/" + movieId);
}

export function saveMovie(movie) {
  const body = { ...movie };
  delete body._id;

  if (movie._id) {
    logger.log("Updating movie with id = ", movie._id);
    return httpService.put(apiEndpoint + "/" + movie._id, body);
  } else {
    logger.log("Adding new movie");
    return httpService.post(apiEndpoint, body);
  }
}
