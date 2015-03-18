var express = require('express');
var request = require('request');
var router = express.Router();

var query = require('../common/database');

var oauthHeader = {
    accept: 'application/json',
    host: 'api.producthunt.com',
    authorization: ''
};
var getItemsUrl =  {
    url: 'https://api.producthunt.com/v1/posts',
    headers: oauthHeader
}

/* GET home page. */
router.get('/', function(req, res) {
    query.getAccessToken ('PRODUCTHUNT',function(err, oauthdetail) {
        if (err) {
            res.json({error: 'Some error occurred while getting access token from DB'});
        } else {
            oauthHeader.authorization = 'Bearer ' + oauthdetail.accesstoken;
            request(getItemsUrl, function (err, response, body) {
                if (err) {
                    console.log("Error in making the request to Product hunt API " + err);
                } else if (response.statusCode == 200) {
                    console.log ("Items Fetched from product hunt API");
                    var itemResult = JSON.parse (body);
                    if (req.query.limit >= 0 ) {
                        res.json (itemResult.posts.slice(0, req.query.limit));
                    } else {
                        res.json (itemResult.posts);
                    }
                } else if (response.statusCode == 401) {
                    console.log ("Need to fetch the new token");
                } else {
                    console.log ("Some error occured");
                }      
            }); 
        }
    });
});






module.exports = router;
