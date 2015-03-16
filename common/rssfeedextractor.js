var FeedParser = require ('feedparser');
var request = require('request');


exports.getTopTrend = function (feedUrl, numberOfTrend, callback) {
    console.log ("Inside RSS Feed Extractor");
    var req = request (feedUrl);
    var fp = new FeedParser ( );
    var itemResult = [];
    
    req.on('error', function(error) {
        console.log ("Error in making the req." + error);
    });
    
    req.on('response', function (res) {
        var stream = this;
        if (res.statusCode != 200) {
            console.log (res);
            return this.emit('error', new Error('Bad status code'));
        }
        stream.pipe(fp);
    });
    
    fp.on('error', function(error) {
        console.log ("Error in getting the feed parser.." + error);
    });
    
    fp.on('readable', function() {
      var stream = this;
      var item;
      while (item = stream.read()) {
        if (itemResult.length < numberOfTrend) {
            itemResult.push({title: item.title, link: item.link});  
        }
      }    
    });
    
    fp.on('end', function ( ) {
          callback (itemResult);
    } );
    
    
}