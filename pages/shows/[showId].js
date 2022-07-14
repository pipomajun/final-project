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

  .showInfo {
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
      h3 {
        text-align: justify;
      }
    }

    .showDetails {
      margin-top: 40px;
      width: 50%;
      display: flex;
      flex-direction: column;
      margin-left: 30px;
      justify-content: space-between;

      .showFacts {
        div {
          margin-left: 40px;
          margin-bottom: 20px;
        }
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
      button {
        width: 400px;
        height: 60px;
        border-radius: 10px;
        align-self: center;
        margin-bottom: 30px;
        background-color: #0f1736;
        color: #ccb97c;
        font-size: 24px;
      }
      button:hover {
        cursor: pointer;
        color: #f2f2f2;
      }
    }
  }
`;

export default function Show({ show }) {
  async function handleAdd() {
    const showResponse = await fetch('/api/showsWatchlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        show_id: show.id,
        show_poster: show.poster_path,
        show_title: show.name,
        show_runtime: show.episode_run_time,
      }),
    });
    const showResponseBody = await showResponse.json();
    console.log(showResponseBody);
  }
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
        <div className="showInfo">
          <div className="showTitleTaglineDescription">
            <h1>{show.title}</h1>
            <h2>{show.tagline}</h2>
            <h3>{show.overview}</h3>
            <p>
              For further information visit the{' '}
              <a href={show.homepage}>Official Website</a>.
            </p>
          </div>
          <div className="showDetails">
            <div className="showFacts">
              <div className="showRuntime">
                <p>Runtime:</p>
                <span>{show.episode_run_time} minutes</span>
              </div>
              <div className="showRating">
                <p>Rating:</p>
                <span>{show.vote_average}/10</span>
              </div>
              <div className="showRelease">
                <p>First Air Date:</p>
                <span>{show.first_air_date.slice(0, 4)}</span>
              </div>
              <div className="noSeasonsEpisodes">
                <p>Number of Seasons/Episodes:</p>
                <span>
                  {show.number_of_seasons}/{show.number_of_episodes}
                </span>
              </div>
            </div>
            <button onClick={() => handleAdd()}>Add to watchlist!</button>
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
    `https://api.themoviedb.org/3/tv/${showIdFromUrl}?api_key=${process.env.API_KEY}&language=en-US`,
  ).then((res) => res.json());
  return {
    props: {
      show: show,
    },
  };
}
