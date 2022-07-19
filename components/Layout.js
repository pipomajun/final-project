import { css } from '@emotion/react';
import Footer from './Footer';
import Header from './Header';

const layoutContainer = css`
  min-height: 100vh;
  position: relative;
`;
export default function Layout(props) {
  return (
    <div css={layoutContainer}>
      <Header user={props.user} refreshUserProfile={props.refreshUserProfile} />
      {
        // Page content
        props.children
      }
      <Footer />
    </div>
  );
}
