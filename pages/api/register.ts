import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { RegisterResponseBody } from '../../types';
import { createSerializedSessionCookie } from '../../util/cookies';
import {
  createSession,
  createUser,
  getUserByUsername,
} from '../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponseBody>,
) {
  // Check if the request method is POST - we want to POST the registered user to the API
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
    // Function to check if username is available
    if (await getUserByUsername(req.body.username)) {
      res
        .status(401)
        .json({ errors: [{ message: 'Username already taken!' }] });
      return;
    }
    // -------------------------------------------------------------------------------
    // Hash the password - never store the plain password, encrypt it by hashing it
    const passwordHash = await bcrypt.hash(req.body.password, 12);
    // Create the user
    const newUser = await createUser(req.body.username, passwordHash);

    // Create a session for this user
    const token = crypto.randomBytes(80).toString('base64');

    const session = await createSession(token, newUser.id);

    const serializedCookie = await createSerializedSessionCookie(session.token);

    res
      .status(200)
      // Tells the browser to create the cookie for us
      .setHeader('set-Cookie', serializedCookie)
      .json({ user: { id: newUser.id } });
  } else {
    res.status(405).json({ errors: [{ message: 'Method not allowed' }] });
  }
}
