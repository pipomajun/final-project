import { css } from '@emotion/react';
import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { movieServer } from '../config';

const mainMovieStyles = css`
  display: flex;
  flex-direction: column;
  overflow: auto;
  h1 {
    color: black;
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
    overflow: auto;
  }

  .popularMovieCard {
    width: 250px;
    .imageInfoOverlay {
      position: relative;
      display: inline-block;
    }
    img {
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
    }
    .movieInfoOverlay {
      display: none;
      padding: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      p {
        height: 50%;
        margin: 0;
        color: white;
      }
    }
    .imageInfoOverlay:hover .movieInfoOverlay {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.65);
      position: absolute;
      top: 0;
      left: 0;
      display: inline-block;
    }
    .movieTitle {
      height: 50px;
      width: 250px;
      background-color: #0f1736;
      border-bottom-right-radius: 10px;
      border-bottom-left-radius: 10px;
      p {
        color: #ccb97c;
        font-size: 20px;
        margin: 0;
        text-align: center;
      }
    }
  }
  .popularMovieCard:hover {
    cursor: pointer;
  }
`;

export default function Movies({ movies }) {
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
            <Link
              href={`/movies/${movie.id}`}
              key={`popular-movie-${movie.id}`}
            >
              <div className="popularMovieCard">
                <div className="imageInfoOverlay">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={`Poster from ${movie.title}`}
                    width={275}
                    height={375}
                  />
                  <div className="movieInfoOverlay">
                    <p>{movie.overview}</p>
                  </div>
                </div>
                <div className="movieTitle">
                  <p>{movie.title}</p>
                </div>
              </div>
            </Link>
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
