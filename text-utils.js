const carriageReturn = '\n';
const space = ' ';
const correctEndings = [space, ''];

class Text {
	constructor(text){
		this.text = text;
		this.wordCount = 0;
	}
	justify(chunkLength){
		var i = 0, insertedSpaces = 0;
		var lastSpace = 0;
		var line = this.text.substr(0, chunkLength);
		var lines = [];
		while (i < this.text.length){
			var endingChar = this.text.charAt(i + chunkLength - insertedSpaces);
			var lastIsSpace = line.charAt(chunkLength - 1) == space;
			// console.log(line, lastIsSpace, endingChar);
			var crPosition = line.indexOf(carriageReturn);
			if (crPosition !== -1){
				// the line has a carriage return

				// console.log('pushed line2:', line.substr(0, crPosition));
				lines.push(line.substr(0, crPosition));
				i += crPosition + 1;
				line = this.text.substr(i, chunkLength);

				// reset of lastSpace and insertedSpaces not needed because
				// this is triggered before any modification to them.

			} else if ((correctEndings.indexOf(endingChar) !== -1) && !lastIsSpace){
				// the line is justified

				// console.log('pushed line1:', line);
				lines.push(line);
				i += chunkLength - insertedSpaces + 1;
				line = this.text.substr(i, chunkLength);

				lastSpace = 0;
				insertedSpaces = 0;

			} else {
				// the line is to be justified

				// locate a space to double
				if (lastIsSpace) line = line.substr(0, line.length - 1);
				if (line.lastIndexOf(space) <= lastSpace) lastSpace = 0;
				// console.log('justifying @', lastSpace, line);
				lastSpace = line.indexOf(space, lastSpace);
				// console.log('line', line);
				// double the space
				line = (line.substr(0, lastSpace) + space + line.substr(lastSpace)).substr(0, chunkLength);
				insertedSpaces++;
				// the next space locating
				// will have 2 spaces to skip:
				lastSpace += 2;

			}
		}
		this.text = lines.join(carriageReturn);
	}
	removeDoubleLines(){
		var paragraphs = this.text.split(carriageReturn);
		for (var p in paragraphs){
			// replace double lines with protected single lines
			if (paragraphs[p] == '') paragraphs[p] = carriageReturn;
			else this.wordCount++;
		}
		// remove unprotected lines
		this.text = paragraphs.join('');
		// Paragraphs are word-boundaries as much as spaces
		// but for n paragraphs we have n-1 words
		if (paragraphs.length > 0) this.wordCount--;
	}
	removeDoubleSpaces(){
		var words = this.text.split(space);
		for (var i = 0; i < words.length; i++){
			// remove duplicate and extreme spaces
			if (words[i].length == 0) words.splice(i--, 1);
		}
		this.wordCount += words.length;
		this.text = words.join(space);
	}
}

exports.Text = Text;