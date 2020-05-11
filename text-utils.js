const carriageReturn = '\r';
const lineFeed = '\n';
const space = ' ';
const correctEndings = [space, ''];

class Text {
	constructor(text){
		this.text = text;
		this.wordCount = 0;
	}
	justify(chunkLength){
		var lines = [];
		var paragraphs = this.text.split(lineFeed);
		for (var p in paragraphs){
			var paragraph = paragraphs[p];
			var whereToSearch = 0;
			while (paragraph.length){
				var spaceIndex = paragraph.indexOf(space, whereToSearch);
				if (spaceIndex > chunkLength || spaceIndex === -1){
					if (whereToSearch == 0 || (spaceIndex === -1 && paragraph.length < chunkLength)){
						lines.push(paragraph.substr(0, chunkLength));
						paragraph = paragraph.substr(chunkLength);
					} else {
						var line = paragraph.substr(0, whereToSearch - 1);
						lines.push(this.insertSpaces(line, chunkLength));
						paragraph = paragraph.substr(whereToSearch);
					}
					whereToSearch = 0;
				} else {
					whereToSearch = spaceIndex + 1;
				}
			}
		}
		this.text = lines.join(lineFeed);
	}
	insertSpaces(line, chunkLength){
		var parts = line.split(space);
		for (var p = 1; p < parts.length; p += 2){
			parts.splice(p, 0, ' ');
		}
		var p = 1;
		while (parts.join('').length < chunkLength){
			parts[p++] += ' ';
			if (++p >= parts.length) p = 1;
		}
		return parts.join('');
	}
	removeCarriageReturns(){
		this.text = this.text.split(carriageReturn).join('');
	}
	removeDoubleLines(){
		var paragraphs = this.text.split(lineFeed);
		for (var p in paragraphs){
			// replace double lines with protected single lines
			if (paragraphs[p] == '') paragraphs[p] = lineFeed;
			else this.wordCount++;
		}
		// remove unprotected lines
		this.text = paragraphs.join('');
		// Paragraphs are word-boundaries as much as spaces
		// but for n paragraphs we have n-1 words
		if (this.wordCount > 0) this.wordCount--;
	}
	removeDoubleSpaces(){
		var paragraphs = this.text.split(lineFeed);
		for (var p in paragraphs){
			var words = paragraphs[p].split(space);
			for (var i = 0; i < words.length; i++){
				// remove duplicate and extreme spaces
				if (words[i].length == 0) words.splice(i--, 1);
			}
			this.wordCount += words.length;
			paragraphs[p] = words.join(space);
		}
		this.text = paragraphs.join(lineFeed);
	}
}

exports.Text = Text;