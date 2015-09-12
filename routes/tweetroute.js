var express = require('express');
var request = require('request');
var router = express.Router();

/* var consumerKey = process.env.TWEET_CONSUMER_KEY ;
var consumerSecret = process.env.TWEET_CONSUMER_SECRET ;
var toBeEncoded = consumerKey + ':' + consumerSecret; */

var accessToken = process.env.TWEET_ACCESS_TOKEN;

var getTokenOption = {
  url : 'https://api.twitter.com/oauth2/token',
  headers : {
    authorization: ''
  },
  formData : {
    grant_type : 'client_credentials'
  }
}

var getTrendsOption = {
  url : 'https://api.twitter.com/1.1/trends/place.json',
  qs : {
    id : ''
  },
  method: 'GET',
  headers : {
     authorization: '',
    'content-type': 'multipart/form-data'
  }
}

var getWOEIdOption = {
  url : 'https://api.twitter.com/1.1/trends/closest.json',
  qs : {
    lat: '',
    long: ''
  },
  method : 'GET',
  headers : {
    authorization: '',
   'content-type': 'multipart/form-data'
  }
}

//Helper Method to get the Access Token - Request to get Trends will be made using this access token via callback function
function getAccessToken (callback, error) {
  getTokenOption.headers.authorization = 'Basic ' + new Buffer (toBeEncoded).toString('base64'); //ConsumerKey & secret has to be encoded and pass into authorization header

  request.post (getTokenOption, function (err, response, body) {
    if (err) {
      error("Err occurred while calling Twitter Acc");
    } else if (response.statusCode != 200) {
      error(JSON.parse (response));
    } else {
      callback (JSON.parse (body).access_token);
    }
  });
}

//Helper Method to get the Closest WOEID based on the lat & long
function getWOEId (lat, long, callback, error) {
  getWOEIdOption.qs.lat = lat;
  getWOEIdOption.qs.long = long;

  request (getWOEIdOption, function (err, response, body) {
    if (err) {
      console.log ("Err Occurred while calling the Twitter Acc for WOEID");
      error("Err occurred while calling Twitter Acc");
    } else if (response.statusCode != 200) {
      console.log ("Getting error from Twitter to get the closest WOED ID");
      error(JSON.parse (response));
    } else {
      callback (JSON.parse (body)[0].woeid);
    }
  });
}

//This is the method that returns the response for /trends req
function getTrends (woeid, res) {
  getTrendsOption.qs.id = woeid;

  request (getTrendsOption, function (err, response, body) {      //GET call to obtain the TRENDS
    if (err) {
      console.log ("Err Occurred while calling the Twitter Acc for TRENDS");
      res.json( {error: 'Err occurred while getting the trend' } );
    } else if (response.statusCode != 200) {
      console.log ("Getting error from Twitter to get the TRENDS");
      res.json( response );
    } else {
      res.json(JSON.parse(body));
    }
  });

}

router.get('/trends', function(req, res) {

  //call the get access Token method by passing the callback and error function
//  getAccessToken (function (accessToken) {      //Commenting out the accesstoken to make things faster

    getTrendsOption.headers.authorization = 'Bearer ' + accessToken;       //Assigning accesstoken to get the trends
    getWOEIdOption.headers.authorization = 'Bearer ' + accessToken;       //Same accesstoken to get the Woeid too


    if ( typeof req.query.lat != undefined  && req.query.long != undefined) {       //To handle if lat, long is given in QS
      getWOEId (req.query.lat, req.query.long, function (woeid) {       //Passing the lat, long, callback function to get the WOEID and error handling function
        console.log ("Getting the trend for " + woeid);
        getTrends (woeid,res);        //Calling the getTrends method, which is the final method
      }, function (errorMessage) {
        res.json ({error: errorMessage});
      });
    } else {
      console.log ("Getting the World Trend");
      getTrends ('1', res);        //World trend has woeid as 1
    }

/*  }, function (errorMessage) {
    res.json ({error: errorMessage}); //Error Message that occurs while calling the access token
  }); */

});

module.exports = router;
