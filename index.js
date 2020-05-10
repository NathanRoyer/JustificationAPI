const express = require('express');
const textUtils = require('./text-utils');
const crypto = require('crypto');
const app = express();
// The following snippet adds the
// request body to the request object
app.use((req, res, next) => {
	if (req.is('text/*')) {
		req.body = '';
		req.setEncoding('utf8');
		req.on('data', function(chunk){ req.body += chunk });
		req.on('end', next);
	} else next();
});
// --- HTTP ---
const port = 8080;
const tokenHeaderName = 'token';

// --- Justification ---
const chunkLength = 80;

// --- Users & Tokens ---
/* testing values:*/
const maxWordsPerToken = 100;
const oneDayInMilliseconds = 1000 * 60; // actually 1mn

/* correct values:
const maxWordsPerToken = 80000;
const oneDayInMilliseconds = 1000 * 60 * 60 * 24;
//                           1s     1mn  1h   1d
 */
var users = {  };

class User {
	constructor(email, availableWords){
		this.email = email;
		this.availableWords = availableWords;
		this.usedWords = 0;
		this.lastReset = Date.now();
	}
	canUseWords(wordCount){
		var success = (this.usedWords + wordCount) <= this.availableWords;
		if (!success){
			let elapsedMs = Date.now() - this.lastReset;
			if (elapsedMs > oneDayInMilliseconds){
				success = true;
				this.usedWords = 0;
				this.lastReset = Date.now();
			}
		}
		return success;
	}
	useWords(wordCount){
		this.usedWords += wordCount;
	}
}

function newTokenHandler(req, res){
	var param = JSON.parse(req.body);
	if (typeof(param.email) === 'string'){
		let tokenId = crypto.randomBytes(16).toString('hex');
		if (users[tokenId] !== undefined){
			// unfortunate collision, let's try again
			return newTokenHandler(req, res);
		} else {
			users[tokenId] = new User(param.email, maxWordsPerToken);
			console.log('new user:', tokenId, 'with email =', param.email)
			res.send(tokenId);
		}
	} else {
		res.status(400).send("Error 400: Bad Request<br>Invalid request body");
	}
}

function justifyHandler(req, res){
	var toJustify = req.body;
	if (toJustify === undefined){
		res.status(400).send("Error 400: Bad Request<br>Invalid request body");
	} else {
		let tokenId = req.get(tokenHeaderName);
		var user = users[tokenId];
		if (user === undefined){
			res.status(400).send("Error 400: Bad Request<br>Invalid token");
		} else {
			var text = new textUtils.Text(toJustify);
			text.removeDoubleLines();
			text.removeDoubleSpaces();
			console.log("User ", user.email, "wants to use", text.wordCount, "words.");

			if (user.canUseWords(text.wordCount)){
				text.justify(chunkLength);
				user.useWords(text.wordCount);
				res.send(text.text);
				console.log("Accepted.");
			} else {
				res.status(402).send("Error 402: Payment Required");
				console.log("Denied.");
			}
		}
	}
}

app.post('/api/token', newTokenHandler);
app.post('/api/justify', justifyHandler);
app.use(express.static('public'));

app.listen(port, () => console.log(`http://localhost:${ port }`));