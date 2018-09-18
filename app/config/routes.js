const controller = require('../controllers/controllers.js');
const router = require('express').Router();

module.exports = router
    .get('/login', controller.login)
    .get('/callback', controller.callback)
    .get('/api/user/:email', controller.getUserByEmail)
    .post('/api/user', controller.createUser)
;

