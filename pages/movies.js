import { css } from '@emotion/react';
import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import { movieServer } from '../config';

const mainMovieStyles = css`
  display: flex;
  flex-direction: column;
  h1 {
    align-self: center;
    margin-bottom: 0;
  }
  h2 {
    color: black;
  }
  .popularMovies {
    display: flex;
    width: 100%;
    align-items: center;
    gap: 15px;
  }
  .popularMovieCard {
    width: 250px;
    .imageInfoOverlay {
      position: relative;
      display: inline-block;
      vertical-align: top;
    }
    img {
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
    }
    .movieInfoOverlay {
      display: none;

      p {
        margin: 0;
        color: white;
      }
    }
    .imageInfoOverlay:hover .movieInfoOverlay {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      position: absolute;
      top: 0;
      left: 0;
      display: inline-block;
      text-align: center;
    }
    .movieTitle {
      height: 50px;
      width: 250px;
      background-color: white;
      border-bottom-right-radius: 10px;
      border-bottom-left-radius: 10px;
      p {
        font-size: 20px;
        margin: 0;
        text-align: center;
      }
    }
  }
`;

export default function Movies({ movies }) {
  console.log(movies);
  return (
    <div>
      <Head>
        <title>Movies</title>
        <meta name="Movies" content="Browse through our movies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main css={mainMovieStyles}>
        <h1>Movies</h1>

        <h2>Popular Movies</h2>
        <div className="popularMovies">
          {movies.map((movie) => (
            <div key={movie.id} className="popularMovieCard">
              <div className="imageInfoOverlay">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={`Poster from ${movie.title}`}
                  width={275}
                  height={375}
                />
                <div className="movieInfoOverlay">
                  <p>Release: {movie.release_date}</p>
                  <p>Average Rating: {movie.vote_average}/10</p>
                </div>
              </div>
              <div className="movieTitle">
                <p>{movie.title}</p>
                {/* <p>{movie.overview}</p> */}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const res = await axios(
    `${movieServer}/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`,
  );
  const movies = res.data.results;
  return {
    props: { movies },
  };
}
