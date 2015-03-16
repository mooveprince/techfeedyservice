var express = require('express');
var router = express.Router();

var feedExtractor = require('../common/rssfeedextractor');
var feedUrl = 'https://news.ycombinator.com/rss';

/* GET home page. */
router.get('/', function(req, res) {
    feedExtractor.getTopTrend (feedUrl, '5', function (itemResult) {
        console.log ("Sending the response for hacker News");
        res.json (itemResult);
    });
    
});

module.exports = router;