import { NextApiRequest, NextApiResponse } from 'next';
import { ShowResponseBody } from '../../types';
import { addShow, getUserByValidSessionToken } from '../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ShowResponseBody>,
) {
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
