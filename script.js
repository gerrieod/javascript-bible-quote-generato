const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = []

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//show new quote
function newQuote() {

    showLoadingSpinner();
    //pick random quote from array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    //check if author field is blank and replace
    if (!quote.bookname) {
        authorText.textContent = "Unkown";
    } else {
        authorText.textContent = quote.bookname + " " + quote.chapter + ":" + quote.verse;
    }
    //check quote lenght to determine the styling
    if (quote.text.length > 120){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('logn-quote');
    }

    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

// Get Quotes from API
async function getQuotes() {
    
    showLoadingSpinner();

    //exersize url
    const apiUrl = 'https://labs.bible.org/api/?passage=random&type=json&formatting=plain'
    try {
        
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();

    } catch(error){
        
    }
}

//Tweet a quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

    window.open(twitterUrl, '_blank');
}

//event listeners
newQuoteBtn.addEventListener('click', getQuotes);
twitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuotes();