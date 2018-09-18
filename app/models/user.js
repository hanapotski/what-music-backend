const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    spotifyID: {type: String, trim: true},
    display_name: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true},
    image: {type: String},
    spotify_url: {type: String, trim: true},
    favArtists: {type: Array},
    favGenres: {type: Array}
}, {timestamps: true});

mongoose.model('User', userSchema);
const User = mongoose.model('User');

module.exports = User;