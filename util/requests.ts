const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const requests = {
  fetchTrendingMovies: `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US`,
  fetchPopularMovies: `${BASE_URL}/popular?api_key=${API_KEY}&language=en-US&page=1`,
  fetchTopratedMovies: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
};
