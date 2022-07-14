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
        .status(400)
        .json({ errors: [{ message: 'You need to log in first!' }] });
      return;
    }
    const user = await getUserByValidSessionToken(token);
    console.log(user);
    if (!user) {
      res.status(400).json({
        errors: [
          { message: 'It seems like your session expired. Log in again!' },
        ],
      });
      return;
    }
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
  // FETCH WATCHLIST FROM API
  if (req.method === 'GET') {
    console.log('REQUEST BODY', req.body);
    const token = req.cookies.sessionToken;
    if (!token) {
      res
        .status(400)
        .json({ errors: [{ message: 'You need to log in first!' }] });
      return;
    }
    const user = await getUserByValidSessionToken(token);
    console.log(user);
    if (!user) {
      res.status(400).json({
        errors: [
          { message: 'It seems like your session expired. Log in again!' },
        ],
      });
      return;
    }
    const movieWatchlist = await getMovieWatchlist(user.id);

    return res.status(200).json(movieWatchlist);
  }
}
