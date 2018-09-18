const router = require('express').Router();
const path = require('path');

router.all('*', function(req, res) {
    console.log('*** no such route, redirect to index ***', req.body);
    res.sendFile(path.join(__dirname, '../../public'));
});

module.exports = router;