import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { User } from '../types';
import { getUserByValidSessionToken } from '../util/database';

const mainLandingStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;

  .landingHeaderContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
      margin-bottom: 0;
    }
  }

  .heroImageWrapper {
    background-image: url('/public/images/heroImage.jpg');
    background-position: cover;
    margin: 0 auto;
    padding-top: 20px;

    img {
      border-radius: 10px;
    }
  }
`;
type Props = {
  user: User;
};
export default function Home(props: Props) {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="Project landing page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main css={mainLandingStyles}>
        {!props.user ? (
          <div className="landingHeaderContainer">
            <h1>Hey, you! </h1>
            <h2>
              This is the place to organize your (soon to be) favourite movies
              and tv shows
            </h2>
          </div>
        ) : (
          <div className="landingHeaderContainer">
            <h1>Welcome back, {props.user.username}!</h1>
            <h2>Ready to browse some more?</h2>
          </div>
        )}

        <div className="heroImageWrapper">
          <Image src="/images/heroImage.jpg" width="600" height="400" />
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const user = await getUserByValidSessionToken(
    context.req.cookies.sessionToken,
  );

  if (user) {
    return {
      props: {
        user: user,
      },
    };
  }

  return {
    props: {},
  };
}
