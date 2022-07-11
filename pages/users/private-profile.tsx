import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { MovieWatchlist, ShowWatchlist } from '../../types';
// import Link from 'next/link';
import {
  getMovieWatchlist,
  getShowWatchlist,
  getUserByValidSessionToken,
  User,
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
      /* border: 2px solid blue; */
      align-items: center;
      overflow: auto;
    }
    .showsWatchlist {
      display: flex;
      flex-direction: column;
      height: 400px;
      /* border: 2px solid blue; */
      align-items: center;
      overflow: auto;
    }
    .watchlistItem {
      background-color: #0f1736;
      border-radius: 10px;
      /* border: 2px red solid; */
      height: 250px;
      width: 550px;
      display: flex;
      margin-top: 15px;

      img {
        margin: 5px;
        border-radius: 10px;
      }

      .movieOverlay {
        width: 70%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        /* border: 2px yellow solid; */
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
        }
      }
    }
    .watchlistItem:hover {
      cursor: pointer;
    }
  }
`;

type Props = {
  user: User;
  movieWatchlist: MovieWatchlist;
  showWatchlist: ShowWatchlist;
};

export default function UserDetail(props: Props) {
  console.log('SHOW WATCHLIST', props.showWatchlist);
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
            height="250"
            width="250"
            alt="User Avatar"
          />
        </div>
        <h1>Hey, {props.user.username}!</h1>
        <h2>What to watch today?</h2>
        <div className="watchlistContainer">
          <div className="watchlistHeader">
            <h2>Your Movies</h2>
            <div className="moviesWatchlist">
              {props.movieWatchlist.map((movie) => (
                <div key={movie.movieId}>
                  <div className="watchlistItem">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.moviePoster}`}
                      width={175}
                      height={275}
                      alt={`Poster from ${movie.movieTitle}`}
                    />
                    <div className="movieOverlay">
                      <p>{movie.movieTitle}</p>
                      <p>{movie.movieRuntime} minutes</p>
                      <button>Remove from watchlist</button>
                    </div>
                    {/* <div className="buttonContainer">
                    </div> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="watchlistHeader">
            <h2>Your Shows</h2>
            <div className="showsWatchlist">
              {props.showWatchlist.map((show) => (
                <div key={show.showId}>
                  <div className="watchlistItem">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${show.showPoster}`}
                      width={175}
                      height={275}
                      alt={`Poster from ${show.showTitle}`}
                    />
                    <div className="movieOverlay">
                      <p>{show.showTitle}</p>
                      <p>~ {show.showRuntime} minutes</p>
                      <button>Remove from watchlist</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const user = await getUserByValidSessionToken(
    context.req.cookies.sessionToken,
  );
  if (!user) {
    return 'error';
  }
  console.log('USER', user);
  const movieWatchlist = await getMovieWatchlist(user.id);
  const showWatchlist = await getShowWatchlist(user.id);
  if (user) {
    return {
      props: {
        user: user,
        movieWatchlist: movieWatchlist,
        showWatchlist: showWatchlist,
      },
    };
  }
  return {
    redirect: {
      destination: `/login?returnTo=/users/private-profile`,
      permanent: false,
    },
  };
}
