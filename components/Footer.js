import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';

const footerStyles = css`
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px; /* Height of the footer */
  background: #0f1736;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .tmdbWrapper {
    // margin not working???
    margin-left: 40px;
  }
  .tmdbWrapper:hover {
    cursor: pointer;
  }
  .footerText {
    color: #ccb97c;
    margin: 0 auto;
    font-size: 18px;
    text-align: center;
  }
  a {
    text-decoration: none;
    font-size: 18px;
    font-weight: bold;
    color: #ccb97c;
    margin-right: 40px;
    transition: transform 0.2s;
  }
  a:hover {
    cursor: pointer;
    color: #f2f2f2;
    transform: scale(1.1);
  }
`;

export default function Footer() {
  return (
    <footer css={footerStyles}>
      <Link className="tmdbHomepage" href="https://www.themoviedb.org/">
        <div className="tmdbWrapper">
          <Image src="/images/TMDB_logo.svg" width="70" height="50" />
        </div>
      </Link>
      <div className="footerText">
        © pipomajun - find me on{' '}
        <a href="https://www.github.com/pipomajun">GitHub</a>
      </div>
      <Link href="/about">About</Link>
    </footer>
  );
}
