# MyMDb
## MyMDb is a web application where users can browse and search through movies/shows and add them to their watchlist.
### Disclaimer
This project is powered by "TMDb - The Movie Database". This product uses the TMDB API but is not endorsed or certified by TMDB.

## Description
After registering as a new user, the user is able to browse through three categories of movies and tv shows: **trending, popular and top rated**. Also implemented in this application is a search function, which allows the user to browse through numerous movies and shows. Clicking on the chosen one, directs the user to the respective page and provides the user with further details. With a click on button the user is able to add the chosen movie or show to the user's watchlist.
Upon accessing the user's profile, they will find the chosen items in their watchlist, where a chosen item can be removed upon watching it.

## Functionalities
- A landing page
- User registration, login (with session tokens), logout function
- Movies page - browse through three categories
- TV Shows page - browse through three categories
- Dynamic routes with "Add to watchlist"-button for both
- User profile with respective watchlists

## Technologies
- Next.js
- TypeScript
- JavaScript
- PostgreSQL
- Emotion/css
- Jest for unit testing
- Playwright for E2E testing
- DrawSQL
- FIGMA

## Screenshots
### Landing page
![Screenshot of the landing page](/public/screenshots/landingpage.jpg "This is the landing page")
### Browse through movies
![Screenshot of the movies page](/public/screenshots/moviespage.jpg "Browse through movies")
### Search for a specific movie
![Screenshot of the search page](/public/screenshots/searchpage.jpg "Search for a specific movie")
### See further details and add to watchlist
![Screenshot of the dynamic routes page](/public/screenshots/moviedetailpage.jpg "More info and add to watchlist")
### Check on watchlist on user's profile
![Screenshot of the profile page](/public/screenshots/profilepage.jpg "See the added movie in the watchlist")
