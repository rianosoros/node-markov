/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    this.chains = {};

    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if (!(word in this.chains)) {
        this.chains[word] = [];
      }

      this.chains[word].push(nextWord);
    }
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let startIdx = Math.floor(Math.random() * this.words.length);
    let currentWord = this.words[startIdx];
    let output = [];

    for (let i = 0; i < numWords; i++) {
      output.push(currentWord);
      let possibleNextWords = this.chains[currentWord];
      
      if (!possibleNextWords || possibleNextWords.length === 0) {
        break;  // End of chain
      }

      let nextWordIdx = Math.floor(Math.random() * possibleNextWords.length);
      currentWord = possibleNextWords[nextWordIdx];
    }

    return output.join(" ");
  }
}

module.exports = {
  MarkovMachine,
};
