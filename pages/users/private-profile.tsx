import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { MovieWatchlist, ShowWatchlist, User } from '../../types';
import {
  getMovieWatchlist,
  getShowWatchlist,
  getUserByValidSessionToken,
} from '../../util/database';

const mainProfileStyles = css`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .avatarWrapper {
    margin-top: 60px;
  }

  h1,
  h2 {
    color: #0f1736;
    margin: 10px;
  }
  h2 {
    font-style: italic;
  }
  .watchlistContainer {
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    padding-bottom: 30px;
    .watchlistHeader {
      width: 100%;
      text-align: center;

      h2 {
        font-style: normal;
        padding-bottom: 20px;
      }
    }
    .moviesWatchlist {
      display: flex;
      flex-direction: column;
      height: 400px;
      align-items: center;
      overflow: auto;
    }
    .showsWatchlist {
      display: flex;
      flex-direction: column;
      height: 400px;
      align-items: center;
      overflow: auto;
    }
    .watchlistItem {
      background-color: #0f1736;
      border-radius: 10px;
      height: 250px;
      width: 550px;
      display: flex;
      margin-top: 15px;

      img {
        margin: 5px;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }
      img:hover {
        cursor: pointer;
      }

      .movieOverlay {
        width: 70%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        p {
          font-size: 28px;
          text-justify: center;
          margin: 0;
          color: #ccb97c;
          font-weight: lighter;
        }
        p + p {
          font-size: 22px;
        }
        button {
          width: 200px;
          height: 60px;
          border-radius: 10px;
          border: 2px #ccb97c solid;
          align-self: center;
          margin-bottom: 30px;
          background-color: #0f1736;
          color: #ccb97c;
          font-size: 16px;
          font-weight: lighter;
        }
        button:hover {
          cursor: pointer;
          color: #f2f2f2;
          background-color: #141f52;
        }
      }
    }
  }
`;

type Props = {
  user: User;
  movieWatchlist: MovieWatchlist;
  showWatchlist: ShowWatchlist;
};

export default function UserDetail(props: Props) {
  const [movieWatchlist, setMovieWatchlist] = useState(props.movieWatchlist);
  const [showWatchlist, setShowWatchlist] = useState(props.showWatchlist);

  // Handle remove movie from list
  async function handleRemoveMovie(movieId: number) {
    console.log('MOVIE ID', movieId);
    const response = await fetch(`/api/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const removedMovie = await response.json();
    console.log(removedMovie);
    const updatedMovieWatchlist = movieWatchlist.filter(
      (movie) => movie.movieId !== removedMovie.movieId,
    );
    setMovieWatchlist(updatedMovieWatchlist);
  }
  // Handle remove show from list
  async function handleRemoveShow(showId: number) {
    console.log('SHOW ID', showId);
    const response = await fetch(`/api/shows/${showId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const removedShow = await response.json();
    console.log(removedShow);
    const updatedShowWatchlist = showWatchlist.filter(
      (show) => show.showId !== removedShow.showId,
    );
    setShowWatchlist(updatedShowWatchlist);
  }

  return (
    <div>
      <Head>
        <title>{props.user.username}</title>
        <meta name="description" content="About the app" />
      </Head>

      <main css={mainProfileStyles}>
        <div className="avatarWrapper">
          <Image
            src="/images/avatar.png"
            height="175"
            width="175"
            alt="User Avatar"
          />
        </div>
        <h1>Hey, {props.user.username}!</h1>
        <h2>What to watch today?</h2>
        {movieWatchlist.length < 1 && showWatchlist.length < 1 ? (
          <div className="watchlistContainer">
            Oh, it seems like there is nothing in your watchlists... Browse some
            more!
          </div>
        ) : (
          <div className="watchlistContainer">
            <div className="watchlistHeader">
              <h2>Your Movies</h2>
              <div className="moviesWatchlist">
                {movieWatchlist.map((movie) => (
                  <div key={movie.movieId}>
                    <div className="watchlistItem">
                      <Link href={`/movies/${movie.movieId}`}>
                        <Image
                          src={`https://image.tmdb.org/t/p/w500${movie.moviePoster}`}
                          width={175}
                          height={275}
                          alt={`Poster from ${movie.movieTitle}`}
                        />
                      </Link>
                      <div className="movieOverlay">
                        <p>{movie.movieTitle}</p>
                        <p>{movie.movieRuntime} minutes</p>
                        <button
                          onClick={() =>
                            handleRemoveMovie(movie.movieId).catch(() => {
                              console.log(
                                'Removing movie from watchlist failed.',
                              );
                            })
                          }
                        >
                          Remove from watchlist
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="watchlistHeader">
              <h2>Your Shows</h2>
              <div className="showsWatchlist">
                {showWatchlist.map((show) => (
                  <div key={show.showId}>
                    <div className="watchlistItem">
                      <Link href={`/shows/${show.showId}`}>
                        <Image
                          src={`https://image.tmdb.org/t/p/w500${show.showPoster}`}
                          width={175}
                          height={275}
                          alt={`Poster from ${show.showTitle}`}
                        />
                      </Link>
                      <div className="movieOverlay">
                        <p>{show.showTitle}</p>
                        <p>~{show.showRuntime} minutes</p>
                        <button
                          onClick={() =>
                            handleRemoveShow(show.showId).catch(() => {
                              console.log(
                                'Removing show from watchlist failed.',
                              );
                            })
                          }
                        >
                          Remove from watchlist
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const user = await getUserByValidSessionToken(
    context.req.cookies.sessionToken,
  );
  if (!user) {
    return {
      redirect: {
        destination: `/login?returnTo=/users/private-profile`,
        permanent: false,
      },
    };
  }
  console.log('USER', user);
  const movieWatchlist = await getMovieWatchlist(user.id);
  const showWatchlist = await getShowWatchlist(user.id);

  return {
    props: {
      user: user,
      movieWatchlist: movieWatchlist,
      showWatchlist: showWatchlist,
    },
  };
}
