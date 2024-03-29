import { css } from '@emotion/react';
import Link from 'next/link';

const headerStyles = css`
  padding: 40px 50px;
  background: #0f1736;
  display: flex;
  justify-content: space-between;
  .logoHomeContainer {
    a {
      margin-left: 50px;
      text-decoration: none;
      font-size: 36px;
      font-weight: bold;
      color: #ccb97c;
      transition: transform 0.2s;
    }
    a:hover {
      cursor: pointer;
      color: #f2f2f2;
      transform: scale(1.1);
    }
  }
  .navContainerScreen {
    display: flex;
    align-items: center;
    width: 400px;
    justify-content: space-between;
    a {
      text-decoration: none;
      font-size: 28px;
      font-weight: bold;
      color: #ccb97c;
      transition: transform 0.2s;
    }
    a:hover {
      cursor: pointer;
      color: #f2f2f2;
      transform: scale(1.1);
    }
  }
  .navContainerProfile {
    display: flex;
    align-items: center;
    width: 250px;
    justify-content: space-around;
    a {
      text-decoration: none;
      font-size: 24px;
      font-weight: bold;
      color: #ccb97c;
      transition: transform 0.2s;
    }
    a:hover {
      cursor: pointer;
      color: #f2f2f2;
      transform: scale(1.1);
    }
  }
`;

// <Anchor> instead of <Link> --> forces page refresh
function Anchor({ children, ...restProps }) {
  return <a {...restProps}>{children}</a>;
}

export default function Header(props) {
  return (
    <header css={headerStyles}>
      <div className="logoHomeContainer">
        <Link href="/">MyMDb</Link>
      </div>
      <div className="navContainerScreen">
        <Link href="/movies">Movies</Link>
        <Link href="/shows">TV Shows</Link>
        <Link href="/search">Search</Link>
      </div>
      <div className="navContainerProfile">
        {props.user && (
          <Link href="/users/private-profile">{props.user.username}</Link>
        )}
        {props.user ? (
          // use <a> to force page reload
          <Anchor href="/logout">Logout</Anchor>
        ) : (
          <>
            <Link href="/register">Register</Link>
            <Link href="/login">Login</Link>
          </>
        )}
      </div>
    </header>
  );
}
