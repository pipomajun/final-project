import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { User } from '../../types';
import { getUserByUsername } from '../../util/database';

const mainProfileStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  .avatarWrapper {
    margin-top: 100px;
  }
`;

type Props = {
  user?: User;
};

export default function UserDetail(props: Props) {
  if (!props.user) {
    return (
      <>
        <Head>
          <title>User not found</title>
          <meta name="description" content="User not found" />
        </Head>
        <h1>404 - User not found</h1>
        There is no user with this username.
      </>
    );
  }

  return (
    <div>
      <Head>
        <title>{props.user.username}</title>
        <meta name="description" content="User profile" />
      </Head>

      <main css={mainProfileStyles}>
        <div className="avatarWrapper">
          <Image
            src="/images/avatar.png"
            height="250"
            width="250"
            alt="User Avatar"
          />
        </div>
        <h1>This is {props.user.username}'s profile.</h1>
        <div>He was #{props.user.id} to join.</div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // If you want to use username in the URL name this variable properly
  const usernameFromUrl = context.query.username;

  // Make sure the query param is an string
  if (!usernameFromUrl || Array.isArray(usernameFromUrl)) {
    return { props: {} };
  }

  // Get user by username from database
  const user = await getUserByUsername(usernameFromUrl);

  if (!user) {
    context.res.statusCode = 404;
    return { props: {} };
  }
  // Return the user
  return {
    props: {
      user: user,
    },
  };
}
