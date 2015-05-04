//Defines the score object and handles all its validation
var extend = require ('extend');
var db = require('./db');
var dbCollection = db.get('scores');
var score = {
	create: function(obj){
		extend(obj, this);	
	},
	isValid : function(){
		if (!this.categoryid){
			return false;
		}
		if (!this.playername){
			return false;
		}
		if (!this.score){
			return false;
		}
		return true;
	},
	insert: function(){
		return dbCollection.insert(this);//Promise
	},
	find: function(criteria){
		return dbCollection.find(criteria);
	}
}

module.exports = score;