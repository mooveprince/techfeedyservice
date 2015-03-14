var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.json ({value:'Tech Crunch Values'});
});

module.exports = router;
