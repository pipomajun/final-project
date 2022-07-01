import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '../types';

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
    margin-left: 40px;
    color: black;
  }
  .popularMovies {
    padding: 0 40px;
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
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
      overflow: auto;

      p {
        height: 50%;
        margin: 0;
        color: white;
        font-weight: lighter;
      }
    }
    .imageInfoOverlay:hover .movieInfoOverlay {
      width: 100%;
      height: 98%;
      background: rgba(0, 0, 0, 0.65);
      position: absolute;
      bottom: 0;
      top: 0;
      left: 0;
      display: inline-block;
      /* transform: translateY(0%); */
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
type Props = {
  trendingMovies: Movie[];
  popularMovies: Movie[];
  topratedMovies: Movie[];
};

export default function Movies({
  trendingMovies,
  popularMovies,
  topratedMovies,
}: Props) {
  return (
    <div>
      <Head>
        <title>Movies</title>
        <meta name="Movies" content="Browse through our movies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main css={mainMovieStyles}>
        <h1>Movies</h1>
        <h2>Trending Movies</h2>
        <div className="popularMovies">
          {trendingMovies.map((movie) => (
            <Link
              href={`/movies/${movie.id}`}
              key={`trending-movie-${movie.id}`}
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
        <h2>Popular Movies</h2>
        <div className="popularMovies">
          {popularMovies.map((movie) => (
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
        <h2>Top Rated Movies</h2>
        <div className="popularMovies">
          {topratedMovies.map((movie) => (
            <Link
              href={`/movies/${movie.id}`}
              key={`toprated-movie-${movie.id}`}
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

export async function getServerSideProps() {
  // const [trendingMovies, popularMovies] = await Promise.all([
  //   fetch(requests.fetchTrendingMovies).then((res) => res.json()),
  //   fetch(requests.fetchPopularMovies).then((res) => res.json()),
  // fetch(requests.fetchTopratedMovies).then((res) => res.json()),
  // ]);
  const trendingMovies = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.API_KEY}&language=en-US`,
  ).then((res) => res.json());
  const popularMovies = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US`,
  ).then((res) => res.json());
  const topratedMovies = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US`,
  ).then((res) => res.json());
  return {
    props: {
      trendingMovies: trendingMovies.results,
      popularMovies: popularMovies.results,
      topratedMovies: topratedMovies.results,
    },
  };
}
