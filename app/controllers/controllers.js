let mongoose = require('mongoose');
let User = mongoose.model('User');
let request = require('request');
let querystring = require('querystring');
let dotenv = require('dotenv');
dotenv.config();

let redirect_uri = process.env.REDIRECT_URI;


module.exports = {
    login: function(req, res) {
        // console.log('*** controller.login & request ***', req.body);
        res.redirect(
            'https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: process.env.CLIENT_ID,
                scope: 'user-read-private user-read-email user-top-read',
                redirect_uri
            })
        );
    },

    callback: function(req, res) {
        console.log('*** controller.callback & request ***', req.body);

        let code = req.query.code || null;
        let authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                Authorization:
                    'Basic ' +
                    new Buffer(
                        process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET
                    ).toString('base64')
            },
            json: true
        };

        request.post(authOptions, function(error, response, body) {
            let access_token = body.access_token;
            let uri = process.env.FRONTEND_URI/user;
            res.redirect(uri + '?access_token=' + access_token);
        });
    },

    getUserByEmail: function(req, res) {
        console.log('*** controller.getUserByEmail & request ***', req.body, req.params.email);
        User.findOne({email: req.params.email}, function(err, user) {
            if (err) {
                console.log('*** err in user.findOne() ***');
                res.json(err);
            } else if (!user) {
                console.log('*** no such user ***');
                res.json();
            } else if (user) {
                console.log('*** found a user with that email ***', user);
                res.json(user);
            }
        });
    },

    createUser: function(req, res) {
        console.log('*** controller createUser ***', req.body);

        User.findOne({email: req.body.email}, function(err, user) {
            if (err) {
                console.log('*** error in user.findOne ***', err);
                res.json(err);


            } else if (user) {
                // if user exists, then create update doc and update user;
                let userData = {};
                for (let i of Object.keys(req.body)) {
                    userData[i] = req.body[i];
                }
                console.log('*** userData to update dbase ***', userData);

                User.findOneAndUpdate({email: req.body.email}, { $set: userData}, { returnNewDocument: true }, function(err, doc) {
                    if (err) {
                        console.log('*** error in User.findOne... ***', err);
                        res.json(err);
                    }
                    console.log('*** User.findOne... finished ***', doc);
                    res.json('{result: "success"}');
                });


            } else if (!user) {
                // if no user exists, then create user;
                User.create(req.body, function(err) {
                    if (err) {
                        console.log('*** error in User.create ***', err);
                        res.json(err);
                    }
                    console.log('*** User.create finished ***');
                    res.json('{result: "success"}');
                });
            }
        });
    }

};