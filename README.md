# myFlixDB API

This is a backend "movie" application build using Node.js. This application will provide users with access to information about different movies, directors, and genres. Users will be able to sign up, update their personal information, and create list of their favorite movies.Authentication and authorization is implementated using JWT tokens.

## App Features 🚀

- Scalable design
- Security Middleware: cors, sessiontokens
- Security in controller: user permission levels, sanitization, data filtering
- In pattern Model-View-Controller this backend is easy to implement different Models

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