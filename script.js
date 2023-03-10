const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


// Get quotes from api
let apiQuotes = [];

//Show Loading
function loading () {
    loader.hidden = false
    quoteContainer.hidden = true;
}

function complete() {
   quoteContainer.hidden = false; 
   loader.hidden = true;
}

//show new quote
function newQuote() {
    //Pick a random quote from api quotes array
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    //Check if author is blank
    if(!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    
    //Check if quote length to determine the styling
    if(quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    //Set quote, Hide loader
    quoteText.textContent = quote.text;
    complete();
}

async function getQuotes() {
    loading();
    const apiURL = 'https://type.fit/api/quotes';

    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json()
        newQuote()
    } catch (error) {
        // catch error
    }

}

//Tweet Quotes
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//on load
getQuotes();