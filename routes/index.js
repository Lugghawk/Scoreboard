var express = require('express');
var scoreModel = require('../public/javascripts/score')
var router = express.Router();

router.get('/', function(req,res,next){
  var db = req.db;
  var collection = db.get('scores');
  collection.find({}, function(e,docs){
    res.render('index', {players:docs});
  });
});

router.get('/scores/category/:category', function (req,res,next) {
  var category = req.params.category;  
  var dbCollection = req.db.get('scores');
  dbCollection.find({'category':category}, function(e, docs){
    if (!e){
      res.render('index', {players:docs});
    }else{
      res.status(500).send(e);
    }
  });
 });

router.put('/score', function(req,res,next){
  var score = req.body;
  console.log('player: ' +JSON.stringify(score));
  var db = req.db;
  var dbCollection = db.get('scores');
  if(scoreModel.isValid(score)){
    dbCollection.insert(score);
    res.status(200).send();
  }else{
    res.status(400).send();
  }

});

module.exports = router;
