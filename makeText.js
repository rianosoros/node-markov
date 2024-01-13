/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require('./markov');

async function getText(input) {
  try {
    if (input.startsWith('http')) {
      // If the input is a URL, fetch content using axios
      const response = await axios.get(input);
      return response.data;
    } else {
      // If the input is a file path, read the file using fs
      return fs.readFileSync(input, 'utf-8');
    }
  } catch (error) {
    // Handle errors such as unable to read file or fetch URL
    console.error(`Error: Unable to read input - ${error.message}`);
    process.exit(1);
  }
}

async function generateText(input) {
  const text = await getText(input);
  const mm = new MarkovMachine(text);
  const generatedText = mm.makeText();
  console.log(generatedText);
}

// Check if a file path or URL is provided as a command-line argument
const input = process.argv[2];

if (!input) {
  console.error('Error: Please provide a file path or URL as a command-line argument.');
  process.exit(1);
}

generateText(input);
