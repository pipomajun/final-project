import Head from 'next/head';

export default function About() {
  return (
    <div>
      <Head>
        <title>About Us</title>
        <meta name="About" content="Get to know us!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>About Us</h1>
        <h2>About the project</h2>
        <p>This is the final project for the UpLeveled bootcamp</p>
        <h2>About me</h2>
        <p>I am someone</p>
      </main>
    </div>
  );
}
