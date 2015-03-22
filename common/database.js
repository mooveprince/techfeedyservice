var pg = require('pg');

var conString = process.env.DATABASE_URL;
var client = new pg.Client(conString);
client.connect();

exports.getAccessToken = function (application, callback) {
    var sql = "SELECT clientid, clientsceret, accesstoken FROM oauth where appname = $1 ";
    client.query(sql, [application], function (err, result) {
        if (err) {
            console.log ("Error in executing the query");
            callback(true);
        } else {
            callback (false, result.rows[0]);
        }  
    });
}

exports.setAccessToken = function (application, accesstoken, callback) {
    var sql = "UPDATE oauth SET accesstoken = $1 where appname = $2"
    client.query (sql, [accesstoken, application], function (err, result) {
        if (err) {
            console.log ("Error in executing the query");
            callback();
        } else {
            console.log("Inserted Successfully");
            callback ( );
        }
    });
}