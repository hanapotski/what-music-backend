// set us up the server
let express = require('express');
let cors = require('cors');
let path = require('path');
let bodyParser = require('body-parser');
let dotenv = require('dotenv');

dotenv.config();
let app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// require j00r dbase
require('./app/config/database.js');
require('./app/models/user.js');

// serve react files


// require j00r route files
app.use(require('./app/config/routes.js'));
// app.use(require('./app/config/catch-all.routes.js'));
// app.use('/api', require('./app/config/routes.js'));

// start backend server
app.listen(process.env.PORT, function() {
    console.log(`*** johnahnz0rs is l33t on port ${process.env.PORT}***`);
});