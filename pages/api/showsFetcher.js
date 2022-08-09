export default async function handler(req, res) {
  const API_URL = `https://api.themoviedb.org/3/search/tv?language=en-US&page=1&include_adult=false&`;
  const API_KEY = process.env.API_KEY;
  const data = await fetch(
    `${API_URL}api_key=${API_KEY}&query=${req.query.query}`,
  ).then((response) => response.json());

  console.log('DATA FROM API', data);
  res.status(200).json(data);
}

// THE API CALL WORKS, BUT IT RETURNS UNDEFINED -- NEED TO FIND A WAY TO PASS THE DATA TO MOVIEQUERY FROM THE FRONTEND
// export default async function handler(req, res) {
//   const {
//     query: { movieQuery },
//   } = req;
//   const API_KEY = process.env.API_KEY;
//   const data = await fetch(
//     `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${movieQuery}&page=1&include_adult=false`,
//   ).then((response) => response.json());

//   console.log('DATA FROM API', data);
//   res.status(200).json(data);
// }
