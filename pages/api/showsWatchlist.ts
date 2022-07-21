import { NextApiRequest, NextApiResponse } from 'next';
import {
  addShow,
  getShowWatchlist,
  getUserByValidSessionToken,
} from '../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // ADD SHOW TO WATCHLIST
  if (req.method === 'POST') {
    const token = req.cookies.sessionToken;
    if (!token) {
      res
        .status(401)
        .json({ errors: [{ message: 'You need to log in first!' }] });
      return;
    }
    const user = await getUserByValidSessionToken(token);
    if (!user) {
      res.status(401).json({
        errors: [
          { message: 'It seems like your session expired. Log in again!' },
        ],
      });
      return;
    }
    // CHECK TO SEE IF SHOW ID IN REQUEST BODY IS ALREADY IN LIST
    const showWatchlist = await getShowWatchlist(user.id);
    const foundMovie = showWatchlist.find(
      (show) => show.showId === req.body.show_id,
    );

    if (foundMovie) {
      res.status(400).json({
        errors: [{ message: 'Show is already in your watchlist!' }],
      });
      return;
    }
    const addedShow = await addShow(
      user.id,
      req.body.show_id,
      req.body.show_poster,
      req.body.show_title,
      req.body.show_runtime,
    );
    return res.status(200).json(addedShow);
  }
}
