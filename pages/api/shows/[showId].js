import { getUserByValidSessionToken, removeShow } from '../../../util/database';

export default async function handler(req, res) {
  // Remove the show from the watchlist and the database
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
    const showId = parseInt(req.query.showId);
    const removedShow = await removeShow(showId, user.id);
    res.status(200).json(removedShow);
  }
}
