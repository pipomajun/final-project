// import axios from 'axios';
import Head from 'next/head';

// import { movieServer } from '../../config';

export default function Movie() {
  return (
    <div>
      <Head>Movie details</Head>
    </div>
  );
}

// export async function getStaticProps() {
//   const res = await axios(
//     `${movieServer}/popular?api_key=${process.env.API_KEY}&language=en-US`,
//   );
//   const movies = res.data.results;
//   return {
//     props: { movies },
//   };
// }
