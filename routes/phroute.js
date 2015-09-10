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
};
var getNewAccessTokenUrl = {
    url : 'https://api.producthunt.com/v1/oauth/token',
    form : {
        client_id : '',
        client_secret : '',
        grant_type : 'client_credentials'
    }
};

/* GET home page. */
router.get('/', function(req, res) {

    getAccessToken(function(oauthdetail){
        oauthHeader.authorization = 'Bearer ' + oauthdetail.accesstoken;
        getItems(function (itemResult) {
            if (req.query.limit >= 0 ) {
                res.json (itemResult.posts.slice(0, req.query.limit));
            } else {
                res.json (itemResult.posts);
            }
        }, function(errorMsg) {
        res.json({error:errorMsg})});
    }, function(errorMsg) {
        res.json({error:errorMsg});
    });
});

var getAccessToken = function (callback, error) {
    query.getAccessToken ('PRODUCTHUNT',function(err, oauthdetail) {
        if (err) {
            error("Some error occurred while getting access token from DB");
        } else {
            callback (oauthdetail);
        }
    });
}

var getItems = function (callback, error) {
    request(getItemsUrl, function (err, response, body) {
        if (err) {
            error("Error in making the request to Product hunt API " + err);
        } else if (response.statusCode == 200) {
            console.log ("Items Fetched from product hunt API");
            var itemResult = JSON.parse (body);
            callback(itemResult);
        } else if (response.statusCode == 401) {
            console.log ("Need to fetch the new token");
            setNewAccessToken ( function (itemResult) {
                callback(itemResult);
            }, function (errorMsg) { error(errorMsg);});
        } else {
            error ("Some error occured");
        }
    });
}

//This method get the new access token and persist in DB. This also, make new request to API to get items.
var setNewAccessToken = function (callback, error) {

    getAccessToken (function (oauthdetail) {
        getNewAccessTokenUrl.form.client_id = oauthdetail.clientid;
        getNewAccessTokenUrl.form.client_secret = oauthdetail.clientsceret;
        request.post(getNewAccessTokenUrl, function(err, response,body) {
            if(err) {
                error("Error in getting the access token from Product Hunt API " + err);
            } else if (response.statusCode != 200) {
                error("Some Error Occurred. Pls check the response" + response);
            } else {
                var newAccessDetails = JSON.parse (body); //We are using the access token from service directly to get the items
                query.setAccessToken ('PRODUCTHUNT', newAccessDetails.access_token, function () {
                    oauthHeader.authorization = 'Bearer ' + newAccessDetails.access_token;
                    request(getItemsUrl, function(err, response, body){
                        if (err) {
                           error("Error in getting the new items for new access token API " + err);
                        } else if (response.statusCode != 200) {
                            error ("Error Occurred while getting new items for new access token" + response);
                        } else {
                            var itemResult = JSON.parse (body);
                            callback (itemResult);
                        }
                    });
                });
            }
        });
    }, function (errorMsg) {
        error(errorMsg);
    });
}






module.exports = router;
