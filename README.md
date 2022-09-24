# myFlixDB API

This is a backend "movie" application build using Node.js. This application will provide users with access to information about different movies, directors, and genres. Users will be able to sign up, update their personal information, and create list of their favorite movies.Authentication and authorization is implemented using JWT tokens.

## App Features 

* Allows users to see a list of all movies in the database
* Allows users to get detailed information about a single movie by movie title
* Allows users to get detailed information about a genre by genre name
* Allows users to get detailed information about a director by name
* Allows new users to create an user account
* Allows existing users to update their user info or to delete their account
* Allows existing users to add or remove movies to/from their list of favorites

## Technology Used
* Javascript
* Node.js
* Express
* MongoDB

The app is deployed to Heroku. Read about all the features and relevant endpoints <a href="https://my-flix-movie-api.herokuapp.com/documentation.html">here.</a>

## API Reference 📋

| Action  | Method |  Query Parameters | Endpoint URL | Response
| ------------- | ----------- | ------------- | ------------ | ------------- |
| Return a list of all movies | GET  | None | /movies  |Returns a JSON array of all movies |
| Return data about a single movie By TITLE  | GET  | Title  |	/movies/:Title |  Returns a JSON object of movie matching the title passed in the url
| Return data about a single movie By GENRE  | GET  | Genre  |	/movies/genre/:Genre |  Returns a JSON array of all movies matching the genre passed in the url
| Return a list of movies BY DIRECTOR NAME  | GET  | Name  |	'/directors/:Name' |  Returns a JSON object of all the movies matching by the director name that was passed in the url
| Allow new user to register | POST  | None |	'/users' |  Returns a JSON Object holding data about the new user created, with an id
| Allow users to update their user info | PUT  | Username  | /users/:Username | Returns a JSON object with updated user data
| Allow users to add a movie to their list of favorite movies | POST  | :UserID, :MovieID  |	/users/:UserID/movies/:MovieID |  Returns a JSON object with updated user data
| Allow users to remove a movie from their list of favorite movies | DELETE  | UserID, MovieID  | /users/:UserID/movies/:MovieID |  Returns a JSON object with updated user data
| Allow existing users to deregister| DELETE  | Username  | /users/:Username | Returns a text confirming that the user was deleted successfully
