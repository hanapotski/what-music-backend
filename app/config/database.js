let mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true});
mongoose.connection.on('connected', function() {
    console.log(`*** mongoose connected on ${process.env.DB_URL} ***`);
});
mongoose.connection.on('error', function(err) {
    console.log('*** mongoose connection error ***', err);
});