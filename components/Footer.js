import { css } from '@emotion/react';

const footerStyles = css`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px; /* Height of the footer */
  background: #0f1736;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    color: #ccb97c;
    width: 60%;
    margin: 0 auto;
    font-size: 18px;
    text-align: center;
  }
`;

export default function Footer() {
  return (
    <footer css={footerStyles}>
      <div>© This is a footer with copyright and stuff.</div>
    </footer>
  );
}
