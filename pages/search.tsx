import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { Movie, Show } from '../types';

const mainSearchStyles = css`
  display: flex;
  justify-content: space-between;
  margin: 40px 20px;
  height: 100vh;
  align-content: center;
  overflow: hidden;
  gap: 15px;

  .movieSearchContainer {
    width: 50%;
    height: 100vh;
    .movieSearchHeader {
      display: flex;
      flex-direction: column;
      align-items: center;
      form {
        display: flex;
        flex-direction: column;
        margin-bottom: 30px;
      }
      h2 {
        text-align: center;
        margin: 0;
        color: #0f1736;
      }
      input {
        margin: 20px 0;
        width: 500px;
        height: 40px;
        border-radius: 10px;
        font-size: 24px;
        text-align: center;
        font-family: 'Fredoka';
      }
      button {
        margin-left: 20px;
        width: 150px;
        height: 40px;
        border-radius: 10px;
        align-self: center;
        background-color: #0f1736;
        color: #ccb97c;
        font-size: 16px;
        font-family: 'Fredoka';
      }
      button:hover {
        cursor: pointer;
        color: #f2f2f2;
      }
    }
    .movieSearchResults {
      height: 80vh;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      align-items: center;
      gap: 15px;
      overflow: auto;
    }
    .movieCard {
      width: 250px;
      .imageInfoOverlay {
        position: relative;
        display: inline-block;
        overflow: hidden;
        img {
          border-top-right-radius: 10px;
          border-top-left-radius: 10px;
        }
      }
      .movieInfoOverlay {
        display: none;
        padding: 20px;
        overflow: hidden;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        overflow: auto;
        background: rgba(0, 0, 0, 0.65);
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        height: 98.5%;

        p {
          height: 50%;
          margin: 0;
          color: white;
          font-weight: lighter;
          font-size: 18px;
        }
      }
      .imageInfoOverlay:hover .movieInfoOverlay {
        width: 100%;
        display: inline-block;
      }
      .movieTitle {
        height: 80px;
        width: 250px;
        background-color: #0f1736;
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        p {
          padding: 5px;
          color: #ccb97c;
          font-size: 20px;
          margin: 0;
          text-align: center;
        }
      }
    }
    .movieCard:hover {
      cursor: pointer;
    }
  }
  .showSearchContainer {
    width: 50%;
    height: 100vh;
    .showSearchHeader {
      display: flex;
      flex-direction: column;
      align-items: center;
      form {
        display: flex;
        flex-direction: column;
        margin-bottom: 30px;
      }
      h2 {
        text-align: center;
        margin: 0;
        color: #0f1736;
      }
      input {
        margin: 20px 0;
        width: 500px;
        height: 40px;
        border-radius: 10px;
        font-size: 24px;
        text-align: center;
        font-family: 'Fredoka';
      }
      button {
        margin-left: 20px;
        width: 150px;
        height: 40px;
        border-radius: 10px;
        align-self: center;
        background-color: #0f1736;
        color: #ccb97c;
        font-size: 16px;
        font-family: 'Fredoka';
      }
      button:hover {
        cursor: pointer;
        color: #f2f2f2;
      }
    }
    .showSearchResults {
      height: 80vh;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      align-items: center;
      gap: 15px;
      overflow: auto;
    }
    .showCard {
      width: 250px;
      .imageInfoOverlay {
        position: relative;
        display: inline-block;
        overflow: hidden;
        img {
          border-top-right-radius: 10px;
          border-top-left-radius: 10px;
        }
      }
      .showInfoOverlay {
        display: none;
        padding: 20px;
        overflow: hidden;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        overflow: auto;
        background: rgba(0, 0, 0, 0.65);
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        height: 98.5%;
        p {
          height: 50%;
          color: white;
          font-weight: lighter;
          font-size: 18px;
        }
      }
      .imageInfoOverlay:hover .showInfoOverlay {
        width: 100%;
        display: inline-block;
      }
      .showTitle {
        height: 80px;
        width: 250px;
        background-color: #0f1736;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        p {
          padding: 5px;
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
  }
`;

export default function Search() {
  const [movieQuery, setMovieQuery] = useState('');
  const [showQuery, setShowQuery] = useState('');
  const [movieResults, setMovieResults] = useState([]);
  const [showResults, setShowResults] = useState([]);

  // HANDLE MOVIE SEARCH
  // FETCH THE MOVIE DATA FROM THE API ROUTE
  const getMovieData = async (query: string) => {
    const params = {
      query: query,
    };
    const response = await fetch(
      `/api/moviesFetcher?` + new URLSearchParams(params).toString(),
    );
    const data = await response.json();
    setMovieResults(data.results);
  };
  // HANDLE THE SUBMIT BUTTON FOR MOVIE SEARCH
  const handleMovieSubmit = (event: FormEvent) => {
    event.preventDefault();
    getMovieData(movieQuery).catch(() => {});
  };
  // HANDLE SHOW SEARCH
  // FETCH THE SHOW DATA FROM THE API ROUTE
  const getShowData = async (query: string) => {
    const params = {
      query: query,
    };
    const response = await fetch(
      `/api/showsFetcher?` + new URLSearchParams(params).toString(),
    );
    const data = await response.json();
    setShowResults(data.results);
  };
  const handleShowSubmit = (event: FormEvent) => {
    event.preventDefault();
    getShowData(showQuery).catch(() => {});
  };
  return (
    <div>
      <Head>
        <title>Search</title>
        <meta
          name="Search"
          content="Search for movies and tv shows to watch!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main css={mainSearchStyles}>
        <div className="movieSearchContainer">
          <div className="movieSearchHeader">
            <form onSubmit={handleMovieSubmit}>
              <h2>Looking for a Movie?</h2>
              <input
                required
                placeholder="Search for a movie..."
                value={movieQuery}
                onChange={(event) => setMovieQuery(event.target.value)}
              />
              <button>Search Movie</button>
            </form>
          </div>

          <div className="movieSearchResults">
            {movieResults.map((movie: Movie) => (
              <Link href={`/movies/${movie.id}`} key={`movie-${movie.id}`}>
                <div className="movieCard">
                  <div className="imageInfoOverlay">
                    {movie.poster_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={`Poster from ${movie.title}`}
                        width={275}
                        height={375}
                      />
                    ) : (
                      <Image
                        src="/public/images/noImage.jpg"
                        alt="No poster available"
                        height={345}
                        width={250}
                      />
                    )}
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
        </div>
        <div className="showSearchContainer">
          <div className="showSearchHeader">
            <form onSubmit={handleShowSubmit}>
              <h2>Looking for a TV Show?</h2>
              <input
                required
                placeholder="Search for a show..."
                value={showQuery}
                onChange={(event) => setShowQuery(event.target.value)}
              />
              <button>Search Show</button>
            </form>
          </div>
          <div className="showSearchResults">
            {showResults.map((show: Show) => (
              <Link href={`/shows/${show.id}`} key={`show-${show.id}`}>
                <div className="showCard">
                  <div className="imageInfoOverlay">
                    {show.poster_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                        alt={`Poster from ${show.name}`}
                        width={275}
                        height={375}
                      />
                    ) : (
                      <Image
                        src="/../public/images/noImage.jpg"
                        alt="No poster available"
                        height={345}
                        width={250}
                      />
                    )}
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
        </div>
      </main>
    </div>
  );
}

// export function getServerSideProps() {
//   const apikey = process.env.API_KEY;
//   return {
//     props: {
//       apikey,
//     },
//   };
// }
