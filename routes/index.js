var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Tom Chambers', page: 'index' });
});

router.get('/portfolio', function(req, res) {
  var db = req.db;
  var collection = db.get('portfolioSites');
  collection.find({},{ sort: { order: 1 }},function(e,docs){
  	console.log(docs);
  	res.render('portfolio', { title: 'Tom Chambers', page: 'portfolio', sites: docs });
  })
});

router.get('/contact', function(req, res) {
  res.render('contact', { title: 'Tom Chambers', page: 'contact' });
});

router.get('/admin', function(req, res) {
  res.render('contact', { title: 'Tom Chambers' });
});


module.exports = router;
