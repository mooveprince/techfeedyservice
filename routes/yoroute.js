var express = require('express');
var request = require('request');
var router = express.Router();

var sendYo = {
  url : 'https://api.justyo.co/yo/',
  form : {
    username: ' ',
    api_token: process.env.YO_API_KEY,
    link: 'http://techfeedy.herokuapp.com/trends'  //This is where we need to serve our HTML page and call the required service
  }
}

router.get('/', function(req, res) {
  //Doing a yo call over here

  sendYo.form.username = req.query.username;

  var location = req.query.location;

  if ( typeof location != 'undefined' ) {

    var localPointers = location.split(";");

    console.log ("Fetching the values for.. Lat " + localPointers[0] + " Long " + localPointers[1]);

    sendYo.form.link += '?lat=' +localPointers[0]+ '&long=' + localPointers[1];
  }

  request.post (sendYo, function(error, response, body) {
    if (error) {
      console.log ("Error in making call to YO " + error);
      res.json({isError: true, cause: error});
    } else if (response.statusCode != 200) {
      console.log ("Not a sucessful status code " + response.statusCode);
      res.json({isError: true, statusCode: response.statusCode});
    } else {
      console.log ("Yoed Successfully !!!");
      res.json({isSuccess: true});
    }
  });


});


module.exports = router;
