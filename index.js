require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));
// this adds some logging to each request
app.use(require('morgan')('dev'));

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/movies', function(req, res) {
    axios.get('https://www.omdbapi.com/?s='+ req.query.movie +'&apikey='+ process.env.API_KEY)
    .then(function(result) {
    //   res.json(result.data.Search);
      res.render('movie', {movies: result.data.Search});
    });
});

app.get('/movies/:id', function(req, res) {
    axios.get('https://www.omdbapi.com/?i='+ req.params.id +'&apikey='+ process.env.API_KEY)
    .then(function(result) {
       //res.json(result.data);
       res.render('show', {movie: result.data});
    });
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
