import { getWatchlistFromUser } from '../dataStructure';

test("Reduce user's watchlist ", () => {
  const userWatchlist = [
    {
      userId: 1,
      userName: 'pipomajun',
      movieId: 616037,
      movieTitle: 'Thor: Love and Thunder',
    },
    {
      userId: 1,
      animalFirstName: 'pipomajun',
      movieId: 361743,
      movieTitle: 'Top Gun: Maverick',
    },
    {
      userId: 1,
      animalFirstName: 'pipomajun',
      movieId: 810693,
      movieTitle: 'Jujutsu Kaisen 0',
    },
  ];

  expect(getWatchlistFromUser(userWatchlist)).toStrictEqual({
    id: 1,
    userName: 'pipomajun',
    movies: [
      { id: 616037, title: 'Thor: Love and Thunder' },
      { id: 361743, title: 'Top Gun: Maverick' },
      { id: 810693, title: 'Jujutsu Kaisen 0' },
    ],
  });
});
