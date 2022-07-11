import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { monitorEventLoopDelay } from 'perf_hooks';
import {
  getMovieWatchlist,
  getUserByValidSessionToken,
  MovieWatchlist,
  User,
} from '../../util/database';

const mainProfileStyles = css`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .avatarWrapper {
    margin-top: 80px;
  }

  h1,
  h2 {
    margin: 20px;
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
      }
    }
  }
`;

type Props = {
  user: User;
  movieWatchlist: MovieWatchlist;
};

export default function UserDetail(props: Props) {
  console.log(props.movieWatchlist);
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
            <div className="watchlistContainer">
              {props.movieWatchlist.map((movie) => (
                <div key={movie.movieId}>
                  <li>{movie.movieId}</li>
                  <li>{movie.movieTitle}</li>
                  <li>{movie.movieRuntime}</li>
                  <li>{movie.moviePoster}</li>
                </div>
              ))}
            </div>
          </div>
          <div className="watchlistHeader">
            <h2>Your Shows</h2>
            <div>planning on mapping through shows in watchlist here</div>
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
  if (user) {
    return {
      props: {
        user: user,
        movieWatchlist: movieWatchlist,
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
