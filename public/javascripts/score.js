//Defines the score object and handles all its validation
var score = {};
score.isValid = function(score){
	if (!score.catagory){
		return false;
	}
	if (!score.playername){
		return false;
	}
	
	if (!score.score){
		return false;
	}
	return true;
}

module.exports = score;