import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { LoginResponseBody } from '../../types';
import { createSerializedSessionCookie } from '../../util/cookies';
import {
  createSession,
  getUserWithPasswordHashByUsername,
} from '../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponseBody>,
) {
  // Check if the request method is POST - we want to POST the logged-in user to the API (sessions)
  // req.body is the user object consisting of username and password
  if (req.method === 'POST') {
    if (
      typeof req.body.username !== 'string' ||
      typeof req.body.password !== 'string' ||
      !req.body.username ||
      !req.body.password
    ) {
      res
        .status(400)
        .json({ errors: [{ message: 'Username or password not provided!' }] });
      return;
    }

    // ---------------- Here you can add extra checks and constraints ----------------
    // Get the user WITH password hash
    // CAUTION: we don't want to expose this info anywhere --> use as little as possible
    const userWithPasswordHash = await getUserWithPasswordHashByUsername(
      req.body.username,
    );
    if (!userWithPasswordHash) {
      res.status(401).json({
        errors: [{ message: 'Username or password does not match!' }],
      });
      return;
    }
    // Validate that password entered in login matches password_hash stored in database
    const passwordMatches = await bcrypt.compare(
      req.body.password,
      userWithPasswordHash.passwordHash,
    );
    if (!passwordMatches) {
      res.status(401).json({
        errors: [{ message: 'Username or password does not match!' }],
      });

      return;
    }
    const userId = userWithPasswordHash.id;
    const username = userWithPasswordHash.username;

    // create a session for this user
    const token = crypto.randomBytes(80).toString('base64');

    const session = await createSession(token, userId);
    const serializedCookie = await createSerializedSessionCookie(session.token);

    // if you want to use username as identifier return the username too
    res
      .status(200)
      // Tells the browser to create the cookie for us
      .setHeader('set-Cookie', serializedCookie)
      .json({ user: { id: userId, username: username } });
  } else {
    res.status(405).json({ errors: [{ message: 'Method not allowed' }] });
  }
}
