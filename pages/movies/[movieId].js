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

  .movieDetails {
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
    }

    .movieHardfacts {
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

export default function Movie({ movie }) {
  console.log(movie);
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
        <div className="movieDetails">
          <div className="movieTitleTaglineDescription">
            <h1>{movie.title}</h1>
            <h2>{movie.tagline}</h2>
            <h3>{movie.overview}</h3>
            <p>
              For further information visit the{' '}
              <a href={movie.homepage}>Official Website</a>.
            </p>
          </div>
          <div className="movieHardfacts">
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
              <span>{movie.release_date}</span>
            </div>
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
