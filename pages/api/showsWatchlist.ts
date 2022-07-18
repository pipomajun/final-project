import { NextApiRequest, NextApiResponse } from 'next';
// import { ShowResponseBody } from '../../types';
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
    // CHECK TO SEE IF SHOW ID IN REQUEST BODY IS ALREADY IN LIST
    const showWatchlist = await getShowWatchlist(user.id);
    console.log('A', showWatchlist);
    console.log('B', req.body.show_id);
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
    res.status(200);
    console.log('show added to watchlist:', addedShow);
  }
}
