var express = require('express');
var router = express.Router();

router.get('/', function(req,res,next){
  var db = req.db;
  var collection = db.get('scores');
  collection.find({}, function(e,docs){
    res.render('index', {players:docs});
  });
});


router.put('/score', function(req,res,next){
  var player = req.body;
  console.log('player: ' +JSON.stringify(player));
  var db = req.db;
  var dbCollection = db.get('scores');
   dbCollection.insert(req.body);
   res.status(200).send();
});

module.exports = router;
