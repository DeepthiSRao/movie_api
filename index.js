const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();

let movieData = [
    {
        "title": "Raya and the Last Dragon",
        "director": "Don Hall",
        "genre": [
            "Animation", 
            "Action", 
            "Adventure"
        ]
    },
    {
        "title": "Cowboy Bebop: The Movie",
        "director": "Shin'ichirô Watanabe",
        "genre": [
            "Animation", 
            "Action", 
            "Crime"
        ]
    },
    {
        "title": "Injustice",
        "director": "Matt Peters",
        "genre": [
            "Animation", 
            "Action", 
            "Adventure"
        ]
    },
    {
        "title": "Kung Fu Panda",
        "director": "Mark Osborne",
        "genre": [
            "Animation", 
            "Action", 
            "Adventure"
        ]
    },
    {
        "title": "How to Train Your Dragon: The Hidden World",
        "director": "Dean DeBlois",
        "genre": [
            "Animation", 
            "Action", 
            "Adventure"
        ]
    }
]

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
    res.json(movieData);
});

// Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
app.get('/movies/:title', (req, res) => {
    let movie = movieData.find(( movie ) =>{
        return movie.title === req.params.title
    });

    if(movie){
        res.json(movie);
    }else{
        res.status(404).send('Movie with title ' + req.params.title + ' was not found.');
    }
});

// Return data about a genre (description) by name/title (e.g., “Thriller”)
app.get('/movies/genre/:title', (req, res) => {
    let movie = movieData.find(( movie ) =>{
        return movie.title === req.params.title
    });

    if(movie){
        res.json(movie.genre);
    }else{
        res.status(404).send('Movie with title ' + req.params.title + ' was not found.');
    }
});

// Return data about a director (bio, birth year, death year) by name
app.get('/directors/:name', (req, res) => {
    res.send("Successful GET request - Returns director information");
});

// Allow new users to register
app.post('/users', (req, res) => {
    res.send("Successful POST request - Returns user information with id after registration");
});

// Allow users to udpdate their user info (username)
app.put('/users/:username', (req, res) => {
    res.send("Successful PUT request after updating user info");
});

// Allow users to add a movie to their list of favorites (showing only a text that a movie has been added—more on this later)
app.post('/users/:userID/movies', (req, res) => {
    res.send("Successful POST request - after adding a movie to user favourite list");
});

// Allow users to remove a movie from their list of favorites (showing only a text that a movie has been removed—more on this later)
app.delete('/users/:userID/movies/:movieID', (req, res) => {
    res.send("Successful DELETE request - after deleting a movie from user favorites movie list");
});

// Allow existing users to deregister (showing only a text that a user email has been removed—more on this later)
app.delete('/users/:userID', (req, res) => {
    res.send("Successful DELETE request- after deregistering existing user");
});

app.listen(8080, () => {
    console.log('Server started on port 8080');
});