var express = require('express');
var router = express.Router();

var feedExtractor = require('../common/rssfeedextractor');
//var feedUrl = 'http://fulltextrssfeed.com/techcrunch.com/feed';
var feedUrl = 'http://techcrunch.com/feed/';

/* GET home page. */
router.get('/', function(req, res) {
    feedExtractor.getTopTrend (feedUrl, function (itemResult) {
        console.log ("Sending the response for techcrunch");
        if (req.query.limit >= 0 ) {
            res.json (itemResult.slice(0, req.query.limit));
        } else {
            res.json (itemResult);
        }
    });
    
});

module.exports = router;
