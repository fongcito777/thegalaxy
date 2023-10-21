document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  
  // Add an event listener to the search form
  document.querySelector('form[role="search"]').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Get the user's search query
    const query = searchInput.value;

    // Clear the search results
    searchResults.innerHTML = '';

    // Make an API request to search for characters
    fetch(`/search/${query}`)
      .then((response) => response.json())
      .then((data) => {
        // Display the search results
        displaySearchResults(data);
      })
      .catch((error) => {
        console.error('Error searching for characters:', error);
      });
  });

  // Function to display search results
  function displaySearchResults(results) {
    if (results.error) {
      searchResults.innerHTML = `<p>${results.error}</p>`;
    } else {
      // Iterate through the results and display them
      results.forEach((character) => {
        const characterCard = createCharacterCard(character);
        searchResults.appendChild(characterCard);
      });
    }
  }

  // Function to create a character card
  function createCharacterCard(character) {
    const card = document.createElement('div');
    card.className = 'card';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.textContent = character.name;

    // Include other character details here, for example:
    const cardDetails = document.createElement('p');
    cardDetails.className = 'card-text';
    cardDetails.textContent = `Species: ${character.species}, Gender: ${character.gender}, Height: ${character.height}, Mass: ${character.mass}`;

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardDetails);
    card.appendChild(cardBody);

    return card;
  }
});

