import { css } from '@emotion/react';
import Head from 'next/head';

const mainAboutStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
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
        <title>About</title>
        <meta name="About" content="Get to know us!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main css={mainAboutStyles}>
        {/* <h1>About Us</h1> */}
        <h2>About the project</h2>
        <p>
          As the final project I chose to create a Next.js application, which
          allows users to create an account, browse through recommended movies
          and shows and allows them to organize and curate a watchlist of their
          (soon to be) favourites.
        </p>
        <p>
          Once a movie/show is of interest, the user gets access to further
          information by clicking on it, where they will also find an "Add to
          watchlist" button, which adds the chosen movie/show to a watchlist,
          which is accessible in the user's profile.
        </p>
        <h2>About me</h2>
        <p>
          My name is Philipp and I soon am a graduate of the UpLeveled Web
          Developement Bootcamp. With a background in economics, I chose to
          change my career by switching into tech.
        </p>
        <h2>Disclaimer</h2>
        <p>
          This is the final project for the UpLeveled bootcamp. This project is
          powered by "TMDb - The Movie Database". This product uses the TMDB API
          but is not endorsed or certified by TMDB.
        </p>
      </main>
    </div>
  );
}
