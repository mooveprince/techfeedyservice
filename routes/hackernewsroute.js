var express = require('express');
var router = express.Router();

var feedExtractor = require('../common/rssfeedextractor');
var feedUrl = 'https://news.ycombinator.com/rss';

/* GET home page. */
router.get('/', function(req, res) {
    feedExtractor.getTopTrend (feedUrl, function (itemResult) {
        console.log ("Sending the response for hacker News");
        if (req.query.limit >= 0 ) {
            res.json (itemResult.slice(0, req.query.limit));
        } else {
            res.json (itemResult);
        }
    });
    
});

module.exports = router;