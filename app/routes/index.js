var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.write("Angularjs tutorials in express!")
});

module.exports = router;