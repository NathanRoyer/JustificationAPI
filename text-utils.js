const carriageReturn = '\n';
const space = ' ';
const correctEndings = [space, ''];

exports.justify = function(toJustify, chunkLength){
	var i = 0, spaceCounter = 0;
	var lastSpace = 0;
	var line = toJustify.substr(i, chunkLength);
	var lines = [];
	while (i < toJustify.length){
		var endingChar = toJustify.charAt(i + chunkLength - spaceCounter);
		var crPosition = line.indexOf(carriageReturn);
		if (crPosition !== -1){

			i += crPosition + 1;
			// console.log('pushed line:', line.substr(0, crPosition));
			lines.push(line.substr(0, crPosition));
			line = toJustify.substr(i, chunkLength);

		} else if (correctEndings.indexOf(endingChar) !== -1){

			i += chunkLength - spaceCounter + 1;
			// console.log('pushed line:', line);
			lines.push(line);
			line = toJustify.substr(i, chunkLength);

			lastSpace = 0;
			spaceCounter = 0;

		} else {
			lastSpace = line.indexOf(space, lastSpace);
			line = line.substr(0, lastSpace) + space + line.substr(lastSpace, chunkLength - lastSpace - 1);
			spaceCounter++;
			lastSpace += 2;
		}
	}
	return lines.join(carriageReturn);
};

exports.removeDoubleLines = function(state){
	var paragraphs = state.text.split(carriageReturn);
	for (var p in paragraphs){
		// replace double lines with protected single lines
		if (paragraphs[p] == '') paragraphs[p] = carriageReturn;
		else state.wordCount++;
	}
	// remove unprotected lines
	state.text = paragraphs.join('');
	// les paragraphes délimitent les mots au même titre que les espaces
	if (paragraphs.length > 0) state.wordCount--;
};

exports.removeDoubleSpaces = function(state){
	var words = state.text.split(space);
	for (var i = 0; i < words.length; i++){
		// remove duplicate and extreme spaces
		if (words[i].length == 0) words.splice(i--, 1);
	}
	state.wordCount += words.length;
	state.text = words.join(space);
};

exports.generateState = function(text){
	return { text, wordCount: 0 };
};