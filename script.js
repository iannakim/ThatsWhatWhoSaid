const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

// Get quote API through async fetching

async function getQuote() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'https://www.officeapi.dev/api/quotes/random';
    try {
        const response = await fetch(proxyUrl + apiUrl,
          {headers: {
            'X-Requested-With': 'blah'
          }}
        );
        const data = await response.json();

      // // If Author is blank, add 'Unknow'
      // if (data.quoteAuthor === '') {
      //   authorText.innerText = 'Unknown';
      // } else {
      //   authorText.innerText = data.quoteAuthor;
      // }

      // Reduce font size for long quotes
      if (data.data.content.length > 120) {
        quoteText.classList.add('long-quote');
      } else {
        quoteText.classList.remove('long-quote')
      }
      quoteText.innerText = data.data.content
      authorText.innerText = `- ${data.data.character.firstname} ${data.data.character.lastname}`

    } catch (error) {
      getQuote();
      // console.log('whoops, no quote', error);
    }
}

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

  window.open(twitterUrl, '_blank');
}

// Event Listeners

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();