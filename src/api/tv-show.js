import axios from "axios";
import { FAKE_POPULARS, FAKE_RECOMMENDATIONS } from "./fake-data";
import { BASE_URL, API_KEY_PARAM, GENRE, MOVIE } from "../config";

export class TVShowAPI {
  static async fetchPopulars() {
    const response = await axios.get(
      `${BASE_URL}/movie/popular${API_KEY_PARAM}`
    );
    // console.log(response.data.results);
    return response.data.results;
    // return FAKE_POPULARS;
  }

  static async fetchRecommendations(tvShowId) {
    const response = await axios.get(
      `${BASE_URL}movie/${tvShowId}/recommendations${API_KEY_PARAM}`
    );
    // console.log(response.data.results);
    return response.data.results;
    // return FAKE_RECOMMENDATIONS;
  }

  static async fetchByTitle(title) {
    const response = await axios.get(
      `${BASE_URL}search/movie${API_KEY_PARAM}&query=${title}`
    );
    // console.log(response.data.results);
    return response.data.results;
    // return FAKE_RECOMMENDATIONS;
  }

  static async fetchGenre() {
    const response = await axios.get(`${GENRE}${API_KEY_PARAM}`);
    // console.log("===>", response.data);
    return response.data;
  }

  static async fetchByGenre(genreId) {
    console.log("WAS TRIGGERED ");
    try {
      const response = await axios.get(
        `${MOVIE}${API_KEY_PARAM}&with_genres=${genreId}`
      );
      console.log("====>", response.data.results);
      return response.data.results;
    } catch (error) {
      console.log("===ERR=>", error);
    }
  }
}
