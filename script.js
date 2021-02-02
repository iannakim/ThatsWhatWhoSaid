const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

// Get quote API through async fetching

async function getQuote() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl,
          {headers: {
            'X-Requested-With': 'blah'
          }}
        );
        const data = await response.json();
        // console.log(data);
        authorText.innerText = data.quoteAuthor;
        quoteText.innerText = data.quoteText;
    } catch (error) {
      getQuote();
      // console.log('whoops, no quote', error);
    }
}

// On Load
getQuote();