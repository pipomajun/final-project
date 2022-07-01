import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';

const mainSinlgeShowStyles = css`
  display: flex;
  flex-direction: column;
  .showBackdropContainer {
    margin: 30px auto;
    width: 100%;
    display: flex;
    justify-content: center;
    img {
      border-radius: 10px;
    }
  }

  .showDetails {
    width: 60%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    background: #f2f2f2;
    padding: 20px 40px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    .showTitleTaglineDescription {
      width: 50%;
      h2 {
        font-style: italic;
      }
    }

    .showHardfacts {
      margin-top: 40px;
      width: 50%;
      display: flex;
      justify-content: space-around;
      p {
        font-size: 24px;
        margin: 0;
        font-weight: bold;
        padding-bottom: 10px;
      }
      span {
        font-size: 24px;
      }
      a {
        font-size: 24px;
      }
    }
  }
`;

export default function Show({ show }) {
  console.log('ihaksjdka', show);
  return (
    <div>
      <Head>Show details</Head>
      <main css={mainSinlgeShowStyles}>
        <div className="showBackdropContainer">
          <Image
            src={`https://image.tmdb.org/t/p/original${show.backdrop_path}`}
            alt={`${show.title} backdrop image`}
            width={1000}
            height={500}
          />
        </div>
        <div className="showDetails">
          <div className="showTitleTaglineDescription">
            <h1>{show.title}</h1>
            <h2>{show.tagline}</h2>
            <h3>{show.overview}</h3>
            <p>
              For further information visit the{' '}
              <a href={show.homepage}>Official Website</a>.
            </p>
          </div>
          <div className="showHardfacts">
            <div className="showRuntime">
              <p>Runtime:</p>
              <span>{show.runtime} minutes</span>
            </div>
            <div className="showRating">
              <p>Rating:</p>
              <span>{show.vote_average}/10</span>
            </div>
            <div className="showRelease">
              <p>Release:</p>
              <span>{show.release_date}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const showIdFromUrl = context.query.showId;
  if (!showIdFromUrl || Array.isArray(showIdFromUrl)) {
    return { props: {} };
  }
  const show = await fetch(
    `https://api.theshowdb.org/3/tv/${showIdFromUrl}?api_key=${process.env.API_KEY}&language=en-US`,
  ).then((res) => res.json());
  return {
    props: {
      show: show,
    },
  };
}
