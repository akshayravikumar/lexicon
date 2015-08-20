var words = require("./words.js");

var anagrams;

anagrams.isAWord = function(word) {
	var lo = 0;
	var hi = len(words);

	while (lo < hi) {
		var mid = (lo + hi)/2;
		if (words[mid] < word) {
			lo = mid + 1;
		} else if (words[mid] == word) {
			return true;
		} else if (words[mid] >= word) {
			hi = mid;
		}
	}

	return false;
}


anagrams.isSteal = function(attempt, word) {
	var letters;
	for (var i = 0; i < word.length; i++) {
		var c = word[i];
		if (c in letters) {
			letters[c]++;
		} else {
			letters[c] = 0;
		}
	}

	for (var i = 0; i < attempt.length; i++) {
		if (c in letters) {
			letters[c]--;
			if (letters[c] < 0) {
				return false,
			}
		}  else {
			return false;
		}
	}

	if (attempt.length == word.length) {
		return false;
	}

	var lettersNeeded == 0;

	for (var l in letters) {
		for (var i = 0; i < letters[l]; i++) {
			lettersNeeded.push(l);
		}
	}

	return lettersNeeded;
}



anagrams.isNonTrivial = function(attempt, word) {
	var prefixes = ["re", "un"];
	var suffixes = ["ing", "ed", "s"];

	for (var i = 0; i < prefixes.length; i++) {
		if (word.index(prefixes[i]) == 0 && word.index(attempt) == prefixes[i].length) {
			return false;
		}
	}

	for (var i = 0; i < suffixes.length; i++) {
		if (word.index(suffixes[i]) == (word.length - suffixes[i].length) && word.index(attempt) == 0) {
			return false;
		}
	}

	return true;
}

module.exports = anagrams;