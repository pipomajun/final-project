import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';

const mainSinlgeMovieStyles = css`
  display: flex;
  flex-direction: column;
  .movieBackdropContainer {
    margin: 30px auto;
    width: 100%;
    display: flex;
    justify-content: center;
    img {
      border-radius: 10px;
    }
  }

  .movieInfo {
    width: 60%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    background: #f2f2f2;
    padding: 20px 40px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    .movieTitleTaglineDescription {
      width: 50%;
      h2 {
        font-style: italic;
      }
      h3 {
        text-align: justify;
      }
    }

    .movieDetails {
      margin-top: 40px;
      width: 50%;
      display: flex;
      flex-direction: column;
      margin-left: 30px;
      justify-content: space-between;

      .movieFacts {
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

export default function Movie({ movie }) {
  async function handleAdd() {
    const movieResponse = await fetch('/api/moviesWatchlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        movie_id: movie.id,
        movie_poster: movie.poster_path,
        movie_title: movie.title,
        movie_runtime: movie.runtime,
      }),
    });
    const movieResponseBody = await movieResponse.json();
    console.log(movieResponseBody);
  }
  return (
    <div>
      <Head>Movie details</Head>
      <main css={mainSinlgeMovieStyles}>
        <div className="movieBackdropContainer">
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={`${movie.title} backdrop image`}
            width={1000}
            height={500}
          />
        </div>
        <div className="movieInfo">
          <div className="movieTitleTaglineDescription">
            <h1>{movie.title}</h1>
            <h2>{movie.tagline}</h2>
            <h3>{movie.overview}</h3>
            <p>
              For further information visit the{' '}
              <a href={movie.homepage}>Official Website</a>.
            </p>
          </div>
          <div className="movieDetails">
            <div className="movieFacts">
              <div className="movieRuntime">
                <p>Runtime:</p>
                <span>{movie.runtime} minutes</span>
              </div>
              <div className="movieRating">
                <p>Rating:</p>
                <span>{movie.vote_average}/10</span>
              </div>
              <div className="movieRelease">
                <p>Release:</p>
                <span>{movie.release_date.slice(0, 4)}</span>
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
  const movieIdFromUrl = context.query.movieId;
  if (!movieIdFromUrl || Array.isArray(movieIdFromUrl)) {
    return { props: {} };
  }
  const movie = await fetch(
    `https://api.themoviedb.org/3/movie/${movieIdFromUrl}?api_key=${process.env.API_KEY}&language=en-US`,
  ).then((res) => res.json());
  return {
    props: {
      movie: movie,
    },
  };
}
