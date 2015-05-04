//Defines the score object and handles all its validation
var extend = require ('extend');
var db = require('./db');
var dbCollection = db.get('scores');
var categoryModel = require('./category');
var q = require('q');
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
		var deferred = q.defer();
		console.log("asd");
		var that = this;
		categoryModel.find({_id : this.categoryid}).success(function(docs){
			if (docs.length > 0){
				var newPromise = dbCollection.insert(that);//Promise
				newPromise.success(function(docs){
					deferred.resolve(docs);
				}).error(function(e){
					deferred.reject(e);
				});
			}else{
				deferred.reject("No such category");
			}
			
		}).error(function(e){
			deferred.reject(e);
		});
		
		return deferred.promise;
	},
	find: function(criteria){
		return dbCollection.find(criteria);
	}
}

module.exports = score;