import { NextApiRequest, NextApiResponse } from 'next';
// import { MovieResponseBody } from '../../types';
import {
  addMovie,
  getMovieWatchlist,
  getUserByValidSessionToken,
} from '../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // ADD MOVIE TO WATCHLIST
  if (req.method === 'POST') {
    console.log('REQUEST BODY', req.body);
    const token = req.cookies.sessionToken;
    if (!token) {
      res
        .status(401)
        .json({ errors: [{ message: 'You need to log in first!' }] });
      return;
    }
    const user = await getUserByValidSessionToken(token);
    console.log(user);
    if (!user) {
      res.status(401).json({
        errors: [
          { message: 'It seems like your session expired. Log in again!' },
        ],
      });
      return;
    }
    // CHECK TO SEE IF MOVIE ID IN REQUEST BODY IS ALREADY IN LIST
    const movieWatchlist = await getMovieWatchlist(user.id);
    console.log('WHAT IS THE MOVIE WATCHLIST', movieWatchlist);
    console.log('CHECK THE MOVIE ID IN THE REQUEST BODY', req.body.movie_id);
    const foundMovie = movieWatchlist?.find(
      (movie) => movie.movieId === req.body.movie_id,
    );

    if (foundMovie) {
      res.status(400).json({
        errors: [{ message: 'Movie is already in your watchlist!' }],
      });
      return;
    } else {
      const addedMovie = await addMovie(
        user.id,
        req.body.movie_id,
        req.body.movie_poster,
        req.body.movie_title,
        req.body.movie_runtime,
      );
      console.log('movie added to watchlist:', addedMovie);
      return res.status(200).json(addedMovie);
    }
  }
}
