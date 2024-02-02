const OMDB_API_KEY = 'db6226'; 

import top250MovieTitles from './imdbTop250.js';

// Function to get a random page number between 1 and 100 (as OMDB's  page parameter has 1-100 as valid options)
function getRandomPageNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

// Function to fetch movies from a specific page
function getMoviesFromPage(pageNumber) {
    // Construct the URL with the page number and type 'movie'
    const url = `http://www.omdbapi.com/?s=&page=${pageNumber}&type=movie&apikey=${OMDB_API_KEY}`;
    console.log(`Fetching movies from page number: ${pageNumber}`) // Log the page number for future/potential debugging
    return fetch(url).then(response => response.json());
}

// Function to select a random movie from the list
function getRandomMovie(movies) {
    const randomIndex = Math.floor(Math.random() * movies.length);
    console.log(`Random index generated: ${randomIndex}`);  // Log the random index generated for future/potential debugging
    return movies[randomIndex];
}

// Function to fetch details for a specific movie by IMDb ID
function getMovieDetails(imdbID) {
    // Ensure the IMDb ID is a string that starts with 'tt' and followed by digits
    if (typeof imdbID !== 'string' || !imdbID.startsWith('tt') || !/tt\d+/.test(imdbID)) {
        console.error(`Invalid IMDb ID: ${imdbID}`);
        return;
    }

    // Construct the URL with IMDb ID
    const url = `http://www.omdbapi.com/?i=${imdbID}&plot=short&apikey=${OMDB_API_KEY}`;
    console.log(`Fetching details for movie with IMDb ID: ${imdbID}`); // Log the generated IMDb ID
    console.log(`Constructed URL; ${url}`); // Log the constructed url

    // Fetch the detailed infomration of the selected movie
    return fetch(url).then(response => response.json())
    .then(details => {
        if (details.Response === 'True') {
            console.log(`Movie detials: ${details}`); // Log the details to the console
        } else {
            console.log(`Error with movie details responses: ${details.Error}`);
        }
    }).catch(error => {
        console.error(`Error fetching movie details: ${error}`);
    });
}

// Main function to "generate" a random move
function generateRandomMovie() {
    console.log(`Generating a random movie...`)
    // Get a random page number to start the search
    const pageNumber = getRandomPageNumber(); 

    // Fetch movies from the generated page
    getMoviesFromPage(pageNumber).then(data => {
        if (data.Response === 'True') {
            const movies = data.Seatch; 
            console.log(`Number of movies fetched: ${movies.length}`); // Log number of movies fetched
            // Create an array of IMDb IDs
            const imdbIDs = movies.map(movie => movie.imdbID);
            console.log(`IMDb IDs collected: ${imdbIDs}`);

            // Select a random IMDb ID from the array
            const randomImdbID = imdbIDs[Math.floor(Math.random() * imdbIDs.length)];
            console.log(`Random IMDb ID selected: ${randomImdbID}`); // Log the randomly selected IMDb ID

            // Fetch details for the selected movie using the IMDb ID
            getMovieDetails(randomImdbID).then(details => {
                console.log(`Movie detials: ${details}`); // Log the details to the console
            }).catch(error => {
                console.error(`Error fetching movie details: ${error}`);
            });

        } else {
            console.log(`Error fetching movies: ${data.Error}`);
        }
    }).catch(error => {
        console.error(`Error fetching movies from page: ${error}`);
    });
}