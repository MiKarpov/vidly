import httpService from "./httpService";
import { apiUrl } from "../config.json";

export function getGenres() {
  console.log("Fetching genres...");
  return httpService.get(apiUrl + "/genres");
}
