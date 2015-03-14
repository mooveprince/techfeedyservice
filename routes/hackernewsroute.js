var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.json ({value:'Hacker News Values'});
});

module.exports = router;
