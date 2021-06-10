

const searchEl = document.getElementById('search-input')
const quoteContainerEl = document.getElementById('quote-container')
const cancelButtonEl = document.getElementById('cancel-button')
const generateButtonEl = document.getElementById('generate-button')

const templateQuote = ({quote, title}) => `<h2>${quote}</h2><small>${title}</small>`

const randomChoice = list => list[Math.floor(Math.random() * list.length)]

const ENDPOINTS = [
	{title: 'Donald Trump', type: 'quote', url: 'https://api.tronalddump.io/random/quote', value: json => json.value},
	{title: 'Ron Swanson', type: 'quote', url: 'http://ron-swanson-quotes.herokuapp.com/v2/quotes', value: json => json},
	{title: 'philosphy', type: 'quote', url: 'https://philosophy-quotes-api.glitch.me/quotes', value: json => randomChoice(json).quote},
	{title: 'star wars', type: 'quote', url: 'https://swquotesapi.digitaljedi.dk/api/SWQuote/RandomStarWarsQuote', value: json => json.content},
	{title: "Chuck Norris", type: 'quote', url: "https://api.chucknorris.io/jokes/random", value: json => json.value},
	{title: "Cat Facts", type: 'fact', url: "https://meowfacts.herokuapp.com/", value: json => json.data[0]},
	{title: "Kanye West", type: 'quote', url: "https://api.kanye.rest/", value: json => json.quote},
	{title: "Useless Facts", type: 'fact', url: "https://uselessfacts.jsph.pl/random.json?language=en", value: json => json.text},
	{title: "Geek Jokes", type: 'quote', url: "https://geek-jokes.sameerkumar.website/api?format=json", value: json => json.joke},
	{title: "Advice Slip", type: 'quote', url: "https://api.adviceslip.com/advice", value: json => json.slip.advice},

]



async function fetchEndpoint(endpoint, searchQuery) {
	let raw = await fetch(endpoint.url)
	try { return await raw.json() }
	catch(err) { console.log(err.message); return false; }
}

async function setQuoteHtml(endpoint, searchQuery) {
	let json = await fetchEndpoint(endpoint, searchQuery)
	quoteContainerEl.innerHTML = templateQuote({quote: endpoint.value(json), title: endpoint.title})
}


async function addApiContainer({ target }) {
	let endpoint = { title: target[0].value, url: target[1].value, type: target[2].value }
	console.log("\n\nNew Endpoint", await fetchEndpoint({...endpoint, value: json => json }), "\n\n", endpoint)
}

//generateButtonEl.addEventListener( 'click', () => setQuoteHtml(ENDPOINTS[ENDPOINTS.length - 1]), searchEl.value ) 
generateButtonEl.addEventListener( 'click', () => setQuoteHtml(randomChoice( ENDPOINTS )), searchEl.value )


async function sendEmail(body) {
  try {
  	console.log(await Email.send({
    	SecureToken: 'fb37106d-4c4e-4de1-bbe8-e13f29d92779',
	    To: 'sagar@chaddha.com',
	    From: "mikecarroll.idrc@gmail.com",
	    Subject: "A new endpoint, check it out!",
	    Body: body,
	  }))
  	return true
  }
  catch(err) { return err }
}


/* 

{title: 'Evil Insults', url: 'https://evilinsult.com/generate_insult.php?lang=en&type=json', key: 'insult'},
{title: 'Dad Joke', url: 'https://dad-jokes.p.rapidapi.com/random/joke', value: json => `${json.body.setup}\n${json.body.punchline}`}
	{title: 'Yo momma', url: 'https://api.yomomma.info/', value: json => json.joke},
	{title: "Taunt", url: "https://api.fungenerators.com/taunt/generate?category=new-age-insult&limit=1", value: json => json.contents[0][0].description}


e46c2f2b-dc09-4614-851c-a5091103f601
c19f3541-5d91-406a-b689-066a26178278

*/