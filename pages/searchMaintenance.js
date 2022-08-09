import { css } from '@emotion/react';
import Head from 'next/head';

const mainAboutStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  h1 {
    margin-top: 30vh;
  }
`;
export default function About() {
  return (
    <div>
      <Head>
        <title>About</title>
        <meta name="About" content="Get to know me and the project!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main css={mainAboutStyles}>
        <h1>I'm sorry - the search page is currently under construction!</h1>
        <h2>It will be back online soon!</h2>
      </main>
    </div>
  );
}
