var express = require('express');
var request = require('request');
var router = express.Router();

var sendYo = {
  url : 'https://api.justyo.co/yo/',
  form : {
    username: ' ',
    api_token: process.env.YO_API_KEY,
    link: 'http://techfeedyservice.herokuapp.com/tweet/trends'  //This is where we need to serve our HTML page and call the required service
  }
}

router.get('/', function(req, res) {
  //Doing a yo call over here

  sendYo.form.username = req.query.username;

  if (typeof req.query.lat != undefined  && req.query.long != undefined) {
    sendYo.form.link += '?lat=' +req.query.lat+ '&long=' + req.query.long;
  }

  request.post (sendYo, function(error, response, body) {
    if (error) {
      console.log ("Error in making call to YO " + error);
    } else if (response.statusCode != 200) {
      console.log ("Not a sucessful status code " + response.statusCode);
    } else {
      console.log ("Yoed successfully !!");
    }
  });


});


module.exports = router;
