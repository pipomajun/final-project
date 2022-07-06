import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
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
      border: 2px solid red;
      display: flex;
      flex-direction: column;
      align-items: center;
      h2 {
        margin: 0;
        color: #0f1736;
      }
      input {
        margin: 20px 0;
        width: 500px;
        height: 40px;
        border-radius: 5px;
        font-size: 24px;
        text-align: center;
      }
    }
    .movieSearchResults {
      height: 100%;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      align-items: center;
      gap: 15px;
      overflow: auto;
    }
    .movieCard {
      /* display: grid; */
      /* grid-template-columns: repeat (3, 1fr); */
      /* grid-auto-rows: auto; */
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
        text-overflow: ellipsis;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        overflow: auto;
        background: rgba(0, 0, 0, 0.65);
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        height: 98%;

        p {
          height: 50%;
          margin: 0;
          color: white;
          font-weight: lighter;
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
      border: 2px solid red;
      display: flex;
      flex-direction: column;
      align-items: center;
      h2 {
        margin: 0;
        color: #0f1736;
      }
      input {
        margin: 20px 0;
        width: 500px;
        height: 40px;
        border-radius: 5px;
        font-size: 24px;
        text-align: center;
      }
    }
    .showSearchResults {
      height: 100%;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      align-items: center;
      gap: 15px;
      overflow: auto;
    }
    .showCard {
      /* display: grid; */
      /* grid-template-columns: repeat(3, 1fr); */
      /* grid-auto-rows: auto; */
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
        text-overflow: ellipsis;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        overflow: auto;
        background: rgba(0, 0, 0, 0.65);
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        height: 98%;
        p {
          height: 50%;
          color: white;
          font-weight: lighter;
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
          color: #ccb97c;
          font-size: 20px;
          padding: 5px;

          margin: 5px;
          text-align: center;
        }
      }
    }
    .showCard:hover {
      cursor: pointer;
    }
  }
`;
type Props = {
  apikey: string;
};

export default function Search(props: Props) {
  const [movieQuery, setMovieQuery] = useState('');
  const [showQuery, setShowQuery] = useState('');
  const [movieResults, setMovieResults] = useState([]);
  const [showResults, setShowResults] = useState([]);
  const onChangeMovie = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setMovieQuery(event.target.value);
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${props.apikey}&language=en-US&query=${event.target.value}&page=1&include_adult=false`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setMovieResults(data.results);
        } else {
          setMovieResults([]);
        }
      })
      .catch((err) => console.log(err));
  };
  const onChangeShow = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setShowQuery(event.target.value);
    fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=${props.apikey}&language=en-US&query=${event.target.value}&page=1&include_adult=false`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setShowResults(data.results);
        } else {
          setShowResults([]);
        }
      })
      .catch((err) => console.log(err));
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
            <h2>Looking for a movie?</h2>
            <div className="searchInputWrapper">
              <input
                placeholder="Search for a movie..."
                value={movieQuery}
                onChange={onChangeMovie}
              />
            </div>
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
                        src="/../public/images/noImage.jpg"
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
            <h2>Looking for a TV Show?</h2>
            <div className="searchInputWrapper">
              <input
                placeholder="Search for a show..."
                value={showQuery}
                onChange={onChangeShow}
              />
            </div>
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

export function getServerSideProps() {
  const apikey = process.env.API_KEY;
  return {
    props: {
      apikey,
    },
  };
}
