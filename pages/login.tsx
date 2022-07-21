import 'material-react-toastify/dist/ReactToastify.css';
import { css } from '@emotion/react';
import { toast, ToastContainer } from 'material-react-toastify';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

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
    .toast-container {
      height: 90px;
      width: 800px;
      border-radius: 10px;
      justify-content: center;
      display: flex;
      flex-direction: column;
      .toast-wrapper {
        background-color: #c24b4b;
        height: 900px;
        width: 400px;
        align-self: center;
        justify-self: center;
      }
      .toast-body {
        margin-top: 13px;
        font-size: 18px;
        color: white;
        height: 90px;
        text-align: center;
        text-justify: center;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;
type Props = {
  refreshUserProfile: () => Promise<void>;
};
export default function Login(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  // Notification if username or password do not match
  const noMatch = () => {
    toast('Username or password does not match!', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2300,
    });
  };
  // Handle login
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
    // Add notification to onClick
    if (loginResponse.status === 401) {
      noMatch();
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
      // Redirect user to user profile
      await router.push(`/users/private-profile`);
      await props.refreshUserProfile();
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
                data-test-id="input-username"
                value={username}
                onChange={(event) => {
                  setUsername(event.currentTarget.value);
                }}
              />
            </label>
            <label>
              Password
              <input
                data-test-id="input-password"
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.currentTarget.value);
                }}
              />
            </label>
          </div>
          <button data-test-id="button-login" onClick={() => handleLogin()}>
            Login
          </button>
          <ToastContainer
            className="toast-container"
            toastClassName="toast-wrapper"
            bodyClassName="toast-body"
            closeButton={false}
          />
        </div>
      </main>
    </div>
  );
}
