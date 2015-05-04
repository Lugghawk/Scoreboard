//defines the category model
var extend = require ('extend');
var db = require('./db');
var dbCollection = db.get('categories');
var q = require('q');
var validTypes = ["time","score"];
var category = {
	
	create: function(obj){
		extend(obj, this);	
	},
	isValid : function(category){
		if (!this.name){
			return false;
		}
		if (!this.type){
			if (validTypes.indexOf(this.type) === -1)
				return false;
		}
		return true;
	},
	insert: function(){
		//Check if it exists.
		var deferred = q.defer();
		var that = this;
		dbCollection.find({name: this.name}).success(function(docs){
			if (docs.length > 0){
				deferred.reject("Category with name already exists");
			}else{
				console.log(that);
				var promise = dbCollection.insert(that);
				console.log(promise.type);
				promise.success(function(doc){
					deferred.resolve(doc);
				});
				promise.error(function(err){
					deferred.reject(err);
				});
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

module.exports = category; 