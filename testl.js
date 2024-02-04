// storage.js - Handling Watched Movies and Local Storage Integration

/**
 * Retrieve watched movies from local storage.
 * @returns {Array} An array of watched movie titles.
 */
function getWatchedMoviesFromLocalStorage() {
    const watchedMovies = localStorage.getItem('watchedMovies');
    return watchedMovies ? JSON.parse(watchedMovies) : [];
}

/**
 * Save watched movies to local storage.
 * @param {Array} watchedMovies - An array of watched movie titles.
 */
function saveWatchedMoviesToLocalStorage(watchedMovies) {
    localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
}

/**
 * Check if a specific movie has been watched.
 * @param {string} movieTitle - The title of the movie to check.
 * @returns {boolean} True if the movie is watched, false otherwise.
 */
function isMovieWatched(movieTitle) {
    const watchedMovies = getWatchedMoviesFromLocalStorage();
    return watchedMovies.includes(movieTitle);
}

/**
 * Toggle the watched status of a movie.
 * @param {string} movieTitle - The title of the movie to toggle.
 */
function toggleWatchedStatus(movieTitle) {
    const watchedMovies = getWatchedMoviesFromLocalStorage();
    const movieIndex = watchedMovies.indexOf(movieTitle);

    if (movieIndex > -1) {
        watchedMovies.splice(movieIndex, 1); // Remove from watched
    } else {
        watchedMovies.push(movieTitle); // Add to watched
    }

    saveWatchedMoviesToLocalStorage(watchedMovies);
    updateUIForWatchedMovies();
}

/**
 * Update UI elements based on watched status.
 */
function updateUIForWatchedMovies() {
    const movies = document.querySelectorAll('.movie-item'); // Assumes your movie items have this class

    movies.forEach(movie => {
        const movieTitle = movie.dataset.title; // Assumes you store the movie title in a data attribute
        const checkbox = movie.querySelector('.watched-checkbox'); // Assumes you have a checkbox for marking as watched

        if (isMovieWatched(movieTitle)) {
            checkbox.checked = true;
        } else {
            checkbox.checked = false;
        }
    });
}

/**
 * Filters out watched movies from the search results.
 * @param {Array} movies - The original array of movie objects.
 * @returns {Array} The filtered array of movie objects.
 */
function filterOutWatchedMovies(movies) {
    return movies.filter(movie => !isMovieWatched(movie.Title));
}

/**
 * Event handler to toggle the watched status from the UI.
 * Call this function when the watched checkbox for a movie is clicked.
 * @param {Event} event - The click event.
 */
function handleWatchedCheckboxClick(event) {
    const movieTitle = event.target.closest('.movie-item').dataset.title;
    toggleWatchedStatus(movieTitle);
}

// TO DO
// Ensure to call `updateUIForWatchedMovies()` after movies are loaded/rendered to the page to reflect the current watched status.
// Add event listeners for the watched checkboxes, e.g., document.querySelectorAll('.watched-checkbox').forEach(checkbox => checkbox.addEventListener('click', handleWatchedCheckboxClick));