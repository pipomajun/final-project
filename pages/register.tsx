import 'material-react-toastify/dist/ReactToastify.css';
import { css } from '@emotion/react';
import { toast, ToastContainer } from 'material-react-toastify';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

const mainRegisterStyles = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  align-items: center;
  padding-top: 100px;
  .registerForm {
    background: #f2f2f2;
    width: 450px;
    height: 200px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    .registerInput {
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
        width: 350px;
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
export default function Register(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  // Notifications
  const missingInfo = () => {
    toast('Username or password not provided!', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2300,
    });
  };
  const usernameTaken = () => {
    toast('Username already taken!', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2300,
    });
  };

  // Handle registration
  async function handleRegistration() {
    const registerResponse = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    // Add notifications to onClick
    if (registerResponse.status === 400) {
      missingInfo();
      return;
    }
    if (registerResponse.status === 401) {
      usernameTaken();
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
      // Redirect user to landing page
      await props.refreshUserProfile();
      await router.push(`/`);
    }
  }
  return (
    <div>
      <Head>
        <title>Register</title>
        <meta name="registration" content="register as a new user" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main css={mainRegisterStyles}>
        <h1>Register</h1>
        <div className="registerForm">
          <div className="registerInput">
            <label>
              Username*
              <input
                value={username}
                onChange={(event) => {
                  setUsername(event.currentTarget.value);
                }}
              />
            </label>
            <label>
              Password*
              <input
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.currentTarget.value);
                }}
              />
            </label>
          </div>
          <button onClick={() => handleRegistration()}>Register</button>
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
export function getServerSideProps(context: GetServerSidePropsContext) {
  // Redirect from HTTP to HTTPS on Heroku
  if (
    context.req.headers.host &&
    context.req.headers['x-forwarded-proto'] &&
    context.req.headers['x-forwarded-proto'] !== 'https'
  ) {
    return {
      redirect: {
        destination: `https://${context.req.headers.host}/register`,
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
}
