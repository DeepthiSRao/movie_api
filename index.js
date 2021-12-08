const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const Models = require('./models.js');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });
//for connecting to mongoDB
const Movies = Models.Movie;
const Users = Models.User;

//serving static content
app.use(express.static('public'));

//logging using morgan 
app.use(morgan('common'));

//error handling
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(methodOverride());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error has occured!');
})

app.get('/', (req, res) => {
    res.send("Welcome to myFlix api!!!!");
});

// Return a list of ALL movies to the user
app.get('/movies', (req, res) => {
    Movies.find()
        .then((movies) => {
            res.status(200).json(movies)
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send(`Error: ${err}`);
        });
});

// Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
app.get('/movies/:Title', (req, res) => {
    Movies.findOne({ Title: req.params.Title})
        .then((movie)=>{
            res.status(200).json(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send(`Error: ${err}`);
        });
});

// Return data about a genre (description) by name/title (e.g., “Thriller”)
app.get('/movies/genre/:Name', (req, res) => {
    Movies.findOne({ "Genre.Name": req.params.Name})
    .then((genre)=>{
        res.status(200).json(genre);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send(`Error: ${err}`);
    });
});

// Return data about a director (bio, birth year, death year) by name
app.get('/movies/directors/:Name', (req, res) => {
    Movies.findOne({ "Director.Name": req.params.Name})
    .then((director)=>{
        res.status(200).json(director);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send(`Error: ${err}`);
    });
});

// Allow new users to register
app.post('/users', (req, res) => {
    const { Username, Password, Email, Birthday } = req.body;

    Users.findOne({Username: Username})
    .then((user) => {
        if(user) {
            return res.status(400).send(`${Username} already exists`);
        }else{
            Users.create({
                Username,
                Password,
                Email,
                Birthday
            })
            .then((user) => {
                res.status(201).json(user);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send(`Error: ${err}`);
            });
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send(`Error: ${err}`);
    });
});

// Allow users to udpdate their user info (username)
app.put('/users/:Username', (req, res) => {
    const { Username, Password, Email, Birthday } = req.body;

    Users.findOneAndUpdate(
        {Username : req.params.Username},
        {
            $set: { 
                Username,
                Password,
                Email,
                Birthday
            }
        },
        { new: true },
        (err, updatedUser) => {
            if(err){
                console.error(err);
                res.status(500).send(`Error: ${err}`);
            }
            else{
                res.status(200).json(updatedUser);
            }
        }
    );
});

// Allow users to add a movie to their list of favorites (showing only a text that a movie has been added—more on this later)
app.post('/users/:Username/movies/:MovieID', (req, res) => {
    const {Username, MovieID} = req.params;

    Users.findOneAndUpdate(
        { Username },
        {
            $push: { FavoriteMovies: MovieID }
        },
        { new: true },
        (err, updatedUser) => {
            if(err){
                console.error(err);
                res.status(500).send(`Error: ${err}`);
            }
            else{
                res.status(200).json(updatedUser);
            }
        }
    );
});

// Allow users to remove a movie from their list of favorites (showing only a text that a movie has been removed—more on this later)
app.delete('/users/:Username/movies/:MovieID', (req, res) => {
    const {Username, MovieID} = req.params;

    Users.findOneAndUpdate(
        { Username },
        {
            $pull: { FavoriteMovies: MovieID }
        },
        { new: true },
        (err, updatedUser) => {
            if(err){
                console.error(err);
                res.status(500).send(`Error: ${err}`);
            }
            else{
                res.status(200).json(updatedUser);
            }
        }
    );
});

// Allow existing users to deregister (showing only a text that a user email has been removed—more on this later)
app.delete('/users/:Username', (req, res) => {
    const { Username } = req.params;

    Users.findOneAndRemove({Username: Username})
    .then((user) => {
        if(!user){
            res.status(400).send(`${Username} was not found`);
        }else{
            res.status(200).send(`${Username} was deleted.`);
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send(`Error: ${err}`);
    });
});

app.listen(8080, () => {
    console.log('Server started on port 8080');
});