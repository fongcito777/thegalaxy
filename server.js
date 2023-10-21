const express = require('express');
const app = express();
const port = 3000; // You can use any port you prefer

// Serve your static HTML file
app.use(express.static(__dirname)); // Serve files from the current directory

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

const axios = require('axios');

let currentCharacterIndex = 1;

// Next character route
app.get('/next', (req, res) => {
  // Increment the current character index
  currentCharacterIndex++;

  // Handle wrap-around logic when reaching the end of the list
  if (currentCharacterIndex > maxCharacterIndex) {
    currentCharacterIndex = 1; // Back to the first character
  }

  // Fetch character data for the updated index and send it to the frontend
  fetchAndSendCharacterData(currentCharacterIndex, res);
});

// Previous character route
app.get('/previous', (req, res) => {
  // Decrement the current character index
  currentCharacterIndex--;

  // Handle wrap-around logic when going to the previous character
  if (currentCharacterIndex < 1) {
    currentCharacterIndex = maxCharacterIndex; // Go to the last character
  }

  // Fetch character data for the updated index and send it to the frontend
  fetchAndSendCharacterData(currentCharacterIndex, res);
});

// Character search route
app.get('/search/:name', async (req, res) => {
    try {
      const searchName = req.params.name;
  
      // Fetch data from your provided JSON dataset
      const response = await axios.get('https://raw.githubusercontent.com/akabab/starwars-api/master/api/all.json');
      const characters = response.data;
  
      // Filter characters that match the searchName
      const matchingCharacters = characters.filter(character => character.name.toLowerCase().includes(searchName.toLowerCase()));
  
      if (matchingCharacters.length === 0) {
        // Handle and display an error message if no characters are found
        res.json({ error: 'No characters found with the given name' });
      } else {
        // Return the search results to the frontend
        res.json(matchingCharacters);
      }
    } catch (error) {
      res.status(500).send('Error fetching data from the API');
    }
  });

// Function to fetch character data by index and send it to the frontend
async function fetchAndSendCharacterData(index, res) {
  try {
    const response = await axios.get(`https://swapi.dev/api/people/${index}/`);
    const characterData = response.data;
    res.json(characterData);
  } catch (error) {
    res.status(500).send('Error fetching character data');
  }
}
