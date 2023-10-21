document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const characterCards = document.getElementById('character-cards');
    const nextButton = document.getElementById('next-page');
    const prevButton = document.getElementById('prev-page');
  
    let characterData = []; // To store character data
    let currentPage = 1;
    const cardsPerPage = 6; // 3 cards per row, 2 rows maximum
  
    // Function to fetch character data from the API
    function fetchCharacterData() {
      fetch('https://raw.githubusercontent.com/akabab/starwars-api/master/api/all.json')
        .then((response) => response.json())
        .then((data) => {
          characterData = data; // Store the character data
          generateCharacterCards(currentPage);
        })
        .catch((error) => {
          console.error('Error fetching character data:', error);
        });
    }
  
    // Function to generate character cards
    function generateCharacterCards(currentPage) {
      const startIndex = (currentPage - 1) * cardsPerPage;
      const endIndex = Math.min(startIndex + cardsPerPage, characterData.length);
  
      // Clear previous cards
      characterCards.innerHTML = '';
  
      for (let i = startIndex; i < endIndex; i++) {
        const char = characterData[i];
        const card = document.createElement('div');
        card.className = 'col';
  
        card.innerHTML = `
        <div class="card shadow-sm">
          <div class="aspect-ratio">
            <img src="${char.image}" alt="${char.name}" class="card-img-top">
          </div>
          <div class="card-body">
            <h5 class="card-title">${char.name}</h5>
            <p class="card-text">ID: ${char.id}</p>
            <p class="card-text">Species: ${char.species}</p>
          </div>
        </div>
      `;
  
        characterCards.appendChild(card);
      }
    }
  
    // Function to handle next page button click
    nextButton.addEventListener('click', function () {
      if (currentPage < Math.ceil(characterData.length / cardsPerPage)) {
        currentPage++;
        generateCharacterCards(currentPage);
      }
    });
  
    // Function to handle previous page button click
    prevButton.addEventListener('click', function () {
      if (currentPage > 1) {
        currentPage--;
        generateCharacterCards(currentPage);
      }
    });
  
    // Initial fetch of character data
    fetchCharacterData();
  });
  