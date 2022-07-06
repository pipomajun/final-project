import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';

const mainLandingStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;

  h1 {
    margin-bottom: 0;
  }

  .heroImageWrapper {
    background-image: url('/public/images/heroImage.jpg');
    background-position: cover;
    margin: 0 auto;
    padding-top: 40px;
    img {
      border-radius: 10px;
    }
  }
`;
export default function Home() {
  return (
    <div>
      <Head>
        <title>Final Project</title>
        <meta name="description" content="Project landing page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main css={mainLandingStyles}>
        <h1>Hey, you!</h1>
        <h2>
          This is the place to organize your (soon to be) favourite movies and
          tv shows
        </h2>
        <div className="heroImageWrapper">
          <Image src="/images/heroImage.jpg" width="600" height="400" />
        </div>
      </main>
    </div>
  );
}
