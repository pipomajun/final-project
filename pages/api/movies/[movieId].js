import {
  getUserByValidSessionToken,
  removeMovie,
} from '../../../util/database';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    console.log('MESSAGE', req.query);
    const token = req.cookies.sessionToken;
    if (!token) {
      res
        .status(400)
        .json({ errors: [{ message: 'You need to log in first!' }] });
      return;
    }
    const user = await getUserByValidSessionToken(token);
    console.log('USER', user);
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
