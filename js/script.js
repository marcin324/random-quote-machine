/* Aplikacja, która losowo pobiera cytat - przez API - wyświetla jego treść i autora i pozwala wrzucać treść cytatu na Twittera */
'use strict';

/* Zmienna z linkiem do wysyłania tweetów na Twittera (treść jest 'doklejana' po znaku równości) */
var tweetLink = 'https://twitter.com/intent/tweet?text=';
/* Link do API Quotes on Design, pozwalający pobiarać losowe cytaty */
var quoteUrl = 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1';

/* Logika pozwalająca na pobranie losowego cytatu za pomocą Fetch API */
function getQuote() {
    fetch(quoteUrl, { cache: "no-store" })
        .then(function(resp) {
            return resp.json();
        })
        .then(createTweet); // Jeżeli jest odpowiedź pozytywna, wykonuje się funkcja createTweet
}

/* Funkcja createTweet - jest na końcu 'logiki' powyżej - wyświetla pobrany cytat, podaje jego autora, tworzy linki z tweetami
 i podpina je pod przycisk do tweetowania */
function createTweet(input) {
    var data = input[0];

    var dataElement = document.createElement('div');
    dataElement.innerHTML = data.content;
    var quoteText = dataElement.innerText.trim();
    var quoteAuthor = data.title;

    if (!quoteAuthor.length) {
        quoteAuthor = "Unknown author";
    }

	var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;

	if(tweetText.length > 140){
		getQuote();
	}
	else {
		var tweet = tweetLink + encodeURIComponent(tweetText);
		document.querySelector('.quote').innerText = quoteText;
		document.querySelector('.author').innerText = 'Author: ' + quoteAuthor;
		document.querySelector('.tweet').setAttribute('href', tweet);
	}
}

/* Skrypt zacznie działać po załadowaniu całej zawartości DOM strony */
document.addEventListener('DOMContentLoaded', function() {
    
    /* Nasłuchiwacz uruchamiający funkcję getQuote() po kliknięciu w przycisk */
    document.querySelector('.trigger').addEventListener('click', function() {
        getQuote();
    });
    getQuote();
});