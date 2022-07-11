import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { RegisterResponseBody } from './api/register';

export const errorStyles = css`
  background-color: #c24b4b;
  font-size: 16px;
  color: white;
  text-align: center;
  text-justify: center;
  justify-items: center;
  height: 40px;
  width: 350px;
  padding: 5px;
  margin-top: 5px;
  animation: errorStyles 0.5s 1;
  animation-fill-mode: forwards;
  animation-delay: 2s;
  border-radius: 5px;
  @keyframes errorStyles {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;
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
  }
`;
type Props = {
  refreshUserProfile: () => Promise<void>;
};
export default function Register(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<
    {
      message: string;
    }[]
  >([]);
  const router = useRouter();
  // handle registration onClick
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

    const registerResponseBody: RegisterResponseBody =
      await registerResponse.json();

    console.log(registerResponseBody);

    // if there is an error, show the error message
    if ('errors' in registerResponseBody) {
      setErrors(registerResponseBody.errors);
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
      // await router.push(`/users/${loginResponseBody.user.id}`);
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
                value={password}
                onChange={(event) => {
                  setPassword(event.currentTarget.value);
                }}
              />
            </label>
          </div>
          <button onClick={() => handleRegistration()}>Register</button>
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
