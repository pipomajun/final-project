import {
  getUserByValidSessionToken,
  removeMovie,
} from '../../../util/database';

export default async function handler(req, res) {
  // Remove the movie from the watchlist and the database
  if (req.method === 'DELETE') {
    const token = req.cookies.sessionToken;
    if (!token) {
      res
        .status(400)
        .json({ errors: [{ message: 'You need to log in first!' }] });
      return;
    }
    const user = await getUserByValidSessionToken(token);
    if (!user) {
      res.status(400).json({
        errors: [
          { message: 'It seems like your session expired. Log in again!' },
        ],
      });
      return;
    }
    const movieId = parseInt(req.query.movieId);
    const removedMovie = await removeMovie(movieId, user.id);
    res.status(200).json(removedMovie);
  }
}
