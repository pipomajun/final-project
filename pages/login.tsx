import { css } from '@emotion/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { LoginResponseBody } from './api/login';
import { errorStyles } from './register';

const mainLoginStyles = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  align-items: center;
  padding-top: 100px;
  .loginForm {
    background: #f2f2f2;
    width: 450px;
    height: 200px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    .loginInput {
      display: flex;
      flex-direction: column;
      height: 60px;
      width: 300px;
      font-size: 20px;
      justify-content: center;
      input {
        float: right;
        border-radius: 5px;
      }
    }
    button {
      height: 30px;
      width: 120px;
      background: #0f1736;
      color: #eee;
      border: 1px solid #eee;
      border-radius: 10px;
      box-shadow: 5px 5px 5px #eee;
      text-shadow: none;
    }
    button:hover {
      background: #b9dfff;
      color: #0f1736;
      border: 1px solid #eee;
      border-radius: 10px;
      box-shadow: 5px 5px 5px #eee;
      text-shadow: none;
      cursor: pointer;
    }
  }
`;
type Props = {
  refreshUserProfile: () => Promise<void>;
};
export default function Login(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<
    {
      message: string;
    }[]
  >([]);
  const router = useRouter();
  // handle login onClick
  async function handleLogin() {
    const loginResponse = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const loginResponseBody: LoginResponseBody = await loginResponse.json();

    console.log(loginResponseBody);

    // if there is an error, show the error message
    if ('errors' in loginResponseBody) {
      setErrors(loginResponseBody.errors);
      return;
    }

    const returnTo = router.query.returnTo;

    if (
      returnTo &&
      !Array.isArray(returnTo) &&
      // Security: Validate returnTo parameter against valid path
      // (because this is untrusted user input)
      /^\/[a-zA-Z0-9-?=/]*$/.test(returnTo)
    ) {
      await props.refreshUserProfile();
      await router.push(returnTo);
    } else {
      // redirect user to user profile
      // if you want to use userProfile with username redirect to /users/username
      await router.push(`/users/${loginResponseBody.user.username}`);
      await props.refreshUserProfile();
      // await router.push(`/`);
    }
  }
  return (
    <div>
      <Head>
        <title>Login</title>
        <meta name="login" content="log into your account" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main css={mainLoginStyles}>
        <h1>Login</h1>
        <div className="loginForm">
          <div className="loginInput">
            <label>
              Username
              <input
                value={username}
                onChange={(event) => {
                  setUsername(event.currentTarget.value);
                }}
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.currentTarget.value);
                }}
              />
            </label>
          </div>
          <button onClick={() => handleLogin()}>Login</button>
        </div>
        {errors.map((error) => (
          <div css={errorStyles} key={`error-${error.message}`}>
            {error.message}
          </div>
        ))}{' '}
      </main>
    </div>
  );
}
