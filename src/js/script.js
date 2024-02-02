// script.js
// This script will set up the event listener for the generate button on the index.html page

// Ensure the DOM is fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    
    // Get the generate button by its ID
    const generateButton = document.getElementById('generate');
    
    // Add a click event listener to the generate button
    generateButton.addEventListener('click', function() {
      console.log('Generate button clicked');
      // Call the function to generate a random movie from omdb.js
      generateRandomMovie();
    });
  });