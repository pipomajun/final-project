import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Show } from '../types';

const mainShowStyles = css`
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
  .showsContainer {
    padding: 0 40px;
    display: flex;
    width: 100%;
    align-items: center;
    gap: 15px;
    overflow: auto;
  }

  .showCard {
    width: 250px;
    .imageInfoOverlay {
      position: relative;
      display: inline-block;
    }
    img {
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
    }
    .showInfoOverlay {
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
    .imageInfoOverlay:hover .showInfoOverlay {
      width: 100%;
      height: 98%;
      background: rgba(0, 0, 0, 0.65);
      position: absolute;
      top: 0;
      left: 0;
      display: inline-block;
    }
    .showTitle {
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
  .showCard:hover {
    cursor: pointer;
  }
`;
type Props = {
  trendingShows: Show[];
  popularShows: Show[];
  topratedShows: Show[];
};

export default function Shows({
  trendingShows,
  popularShows,
  topratedShows,
}: Props) {
  return (
    <div>
      <Head>
        <title>TV Shows</title>
        <meta name="TV Shows" content="Browse through our tv shows" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main css={mainShowStyles}>
        <h1>TV Shows</h1>
        <h2>Trending TV Shows</h2>
        <div className="showsContainer">
          {trendingShows.map((show) => (
            <Link href={`/shows/${show.id}`} key={`trending-show-${show.id}`}>
              <div className="showCard">
                <div className="imageInfoOverlay">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                    alt={`Poster from ${show.name}`}
                    width={275}
                    height={375}
                  />
                  <div className="showInfoOverlay">
                    <p>{show.overview}</p>
                  </div>
                </div>
                <div className="showTitle">
                  <p>{show.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <h2>Popular TV Shows</h2>
        <div className="showsContainer">
          {popularShows.map((show) => (
            <Link href={`/shows/${show.id}`} key={`popular-show-${show.id}`}>
              <div className="showCard">
                <div className="imageInfoOverlay">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                    alt={`Poster from ${show.name}`}
                    width={275}
                    height={375}
                  />
                  <div className="showInfoOverlay">
                    <p>{show.overview}</p>
                  </div>
                </div>
                <div className="showTitle">
                  <p>{show.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <h2>Top Rated TV Shows</h2>
        <div className="showsContainer">
          {topratedShows.map((show) => (
            <Link href={`/shows/${show.id}`} key={`toprated-show-${show.id}`}>
              <div className="showCard">
                <div className="imageInfoOverlay">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                    alt={`Poster from ${show.name}`}
                    width={275}
                    height={375}
                  />
                  <div className="showInfoOverlay">
                    <p>{show.overview}</p>
                  </div>
                </div>
                <div className="showTitle">
                  <p>{show.name}</p>
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
  const trendingShows = await fetch(
    `https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.API_KEY}&language=en-US`,
  ).then((res) => res.json());
  const popularShows = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY}&language=en-US`,
  ).then((res) => res.json());
  const topratedShows = await fetch(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.API_KEY}&language=en-US`,
  ).then((res) => res.json());
  return {
    props: {
      trendingShows: trendingShows.results,
      popularShows: popularShows.results,
      topratedShows: topratedShows.results,
    },
  };
}
