/**
 * imdbTop250.js
 * 
 * This file contains a manually curated array of movie titles from IMDb's Top 250 list.
 * The OMDb API, which we are using for fetching movie details, restricts searches to specific movie titles
 * or IMDb ID parameters. While OMDb has access to a wide range of movie data, it does not offer a direct
 * endpoint to fetch a list of movies based on rankings or categories, such as IMDb's Top 250.
 * 
 * To create a movie decision maker tool using the OMDb API, we require a pre-existing list of movie titles
 * to randomly select from. As IMDb's own API access comes with a substantial cost (approximately $150,000/year),
 * we opt for this manual approach as a cost-effective alternative. The list provided in this file allows our
 * application to randomly pick a title and then use the OMDb API to fetch and display the details for the
 * selected movie.
 * 
 * The titles included in this array are sourced from IMDb's publicly available Top 250 list, accessible at:
 * https://www.imdb.com/chart/top/
 * The array is static and may not reflect the current rankings or new entries in the actual IMDb Top 250 list.
 */

const top250MovieTitles = [
    'The Shawshank Redemption',
    'The Godfather',
    'The Dark Knight', 
    'The Godfather Part II', 
    ''
    // ... rest of the titles
  ];
  
  export default top250MovieTitles;
  