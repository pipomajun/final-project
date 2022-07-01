import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';

const mainLandingStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  h1 {
    margin-bottom: 0;
  }
  img {
    border-radius: 10px;
    margin-top: 100px;
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
        <Image src="/images/heroImage.jpg" width="600" height="400" />
      </main>
    </div>
  );
}
