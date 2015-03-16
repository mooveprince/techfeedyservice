var express = require('express');
var router = express.Router();

var feedExtractor = require('../common/rssfeedextractor');
var feedUrl = 'http://fulltextrssfeed.com/techcrunch.com/feed';

/* GET home page. */
router.get('/', function(req, res) {
    feedExtractor.getTopTrend (feedUrl, '5', function (itemResult) {
        console.log ("Sending the response for hacker News");
        res.json (itemResult);
    });
    
});

module.exports = router;
