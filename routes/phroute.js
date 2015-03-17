var express = require('express');
var router = express.Router();

var query = require('../common/database');

/* GET home page. */
router.get('/', function(req, res) {
    query.getAccessToken ('PRODUCTHUNT',function(err, accesstoken) {
        if (err) {
            res.json({error: 'Some error occurred while getting access token from DB'});
        } else {
            console.log ('Access token is ' + accesstoken);
            res.json ({value:'Product Hunt Values'});
        }
        //res.json ({value:'Product Hunt Values'});
    });
});

module.exports = router;
