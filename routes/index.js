var express = require('express');
var scoreModel = require('../public/javascripts/score')
var categoryModel = require('../public/javascripts/category')
var router = express.Router();

router.get('/', function(req,res,next){
  scoreModel.find({}).success(function(docs){
    res.render('index', {players:docs});
  }).error(function(e){
    res.status(500).send(e);
  });
});

router.get('/scores/category/:categoryid', function (req,res,next) {
  var categoryid = Number(req.params.categoryid);  
  console.log('categoryid: ' + categoryid);
  scoreModel.find({'categoryid':categoryid}).success(function(docs){
    console.log('success: ' + JSON.stringify(docs));
      res.render('index', {players:docs});
  }).error(function(e){
      res.status(500).send(e);
  });
 });
 
router.put('/category', function(req,res,next){
  var category = req.body;
  categoryModel.create(category);
  var promise = category.insert();
  promise.then(function(doc){
    res.status(200).send(doc);
  }, function(e){
    res.status(500).send(e);
  });
});

router.put('/score', function(req,res,next){
  var score = req.body;
  scoreModel.create(score);
  if(score.isValid()){
    var promise = score.insert();
    promise.then(function(doc){
      res.status(200).send(doc);  
    },function(e){
      res.status(500).send(e);
    });
    
  }else{
    res.status(400).send('invalid score');
  }

});

module.exports = router;
