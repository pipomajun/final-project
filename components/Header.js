import { css } from '@emotion/react';
import Link from 'next/link';

const headerStyles = css`
  padding: 60px 24px;
  background: #0f1736;
  display: flex;
  justify-content: space-between;
  p {
    font-size: 32px;
    font-weight: bold;
    color: #ccb97c;
    margin: 0 auto;
  }
  .navContainer {
    display: flex;
    align-items: center;
    margin-right: 30px;
    width: 500px;
    justify-content: space-around;
    a {
      text-decoration: none;
      color: #ccb97c;
      transition: transform 0.2s;
    }
    a:hover {
      color: #f2f2f2;
      transform: scale(1.1);
    }
  }
`;

export default function Header(props) {
  return (
    <header css={headerStyles}>
      <p>Final Project</p>
      <div className="navContainer">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <a>Shop</a>

        {props.user && (
          <Link href="/users/private-profile">{props.user.username}</Link>
        )}
        {props.user ? (
          // using a instead of Link since we want to force a full refresh
          <a href="/logout">Logout</a>
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
