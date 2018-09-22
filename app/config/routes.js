const controller = require('../controllers/controllers.js');
const router = require('express').Router();

module.exports = router
    .get('/login', controller.login)
    .get('/callback', controller.callback)
    .get('/dbase/user/:email', controller.getUserByEmail)
    .get('/dbase/allUsers', controller.getAllUsers)
    .post('/dbase/user', controller.createUser)
    .delete('/dbase/deleteOne', controller.deleteOne)
;

