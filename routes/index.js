var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req,res,next){
  var db = req.db;
  var collection = db.get('scoreboarditems');
  collection.find({}, function(e,docs){
    console.log(JSON.stringify(docs));
    res.render('index', {title: docs[0].playername});
  });
});

module.exports = router;
