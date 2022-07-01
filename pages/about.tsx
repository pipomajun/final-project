import { css } from '@emotion/react';
import Head from 'next/head';

const mainAboutStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  h2 {
    padding-top: 30px;
    margin: 0;
  }
  p {
    width: 75%;
  }
`;
export default function About() {
  return (
    <div>
      <Head>
        <title>About Us</title>
        <meta name="About" content="Get to know us!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main css={mainAboutStyles}>
        {/* <h1>About Us</h1> */}
        <h2>About the project</h2>
        <p>
          This is the final project for the UpLeveled bootcamp. This project is
          powered by "TMDb - The Movie Database". This product uses the TMDB API
          but is not endorsed or certified by TMDB.
        </p>
        <h2>About me</h2>
        <p>I am kinda lost.</p>
      </main>
    </div>
  );
}
