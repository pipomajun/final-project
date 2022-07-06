import { css, Global } from '@emotion/react';
import { useCallback, useEffect, useState } from 'react';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState();
  // Refresh the user profile everytime we call it
  const refreshUserProfile = useCallback(async () => {
    const profileResponse = await fetch('/api/profile');

    const profileResponseBody = await profileResponse.json();

    if (!('errors' in profileResponseBody)) {
      setUser(profileResponseBody.user);
    } else {
      profileResponseBody.errors.forEach((error) => console.log(error.message));
      setUser(undefined);
    }
  }, []);
  useEffect(() => {
    refreshUserProfile().catch(() => console.log('Fetch api failed'));
  }, [refreshUserProfile]);

  return (
    <>
      <Global
        styles={css`
          html,
          body {
            overflow: auto;
            height: 100vh;
            font-size: 24px;
            background: #f0e4c2;
            margin: 0;
            padding: 0;
            font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI,
              Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
              Helvetica Neue, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          *,
          ::before,
          ::after {
            box-sizing: border-box;
          }
        `}
      />
      <Layout user={user}>
        <Component {...pageProps} refreshUserProfile={refreshUserProfile} />
      </Layout>
    </>
  );
}

export default MyApp;
