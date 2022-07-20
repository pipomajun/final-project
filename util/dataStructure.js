export function getWatchlistFromUser(watchlists) {
  const userWatchlist = {
    id: watchlists[0].userId,
    userName: watchlists[0].userName,
    movies: watchlists.map((movie) => {
      return {
        id: movie.movieId,
        title: movie.movieTitle,
      };
    }),
  };
  return userWatchlist;
}
