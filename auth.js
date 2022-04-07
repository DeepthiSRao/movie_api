/**
 * @file The auth file implements the authentication login registered user 
 * @requires passport implements HTTP authentication
 * @requires jwt To generate JWT using username to authorizing the endpoints
 */ 

const jwtSecret = 'myFlix API secret key';

const jwt = require('jsonwebtoken');
const passport = require('passport');
require('./passport');

/**
 * @function generateJWTToken
 * @param {user} user attempts login with username and password
 * @returns {string} JSON wen token.
 */
let generateJWTToken = (user) => {
    return jwt.sign(user, jwtSecret, {
        subject: user.Username, // This is the username you’re encoding in the JWT
        expiresIn: '7d',
        algorithm: 'HS256'
    });
}

/**
 * POST login process
 * Check that the username and password in the body of the request exist in the database. 
 * If they do, you use the generateJWTToken(); 
 * function to create a JWT based on the username and password, 
 * which you then send back as a response to the client
 * @function
 * @param {router} 
 * @returns {Object} An object conatining logged user and JWT data
 */
module.exports = (router) => {
    router.post('/login', (req, res) => {
        passport.authenticate('local', { session: false }, (error, user, info) => {
            if(error || !user){
                return res.status(400).json({
                    message: 'Something is not right',
                    user: user
                });
            }
            req.login(user, { session: false }, (error) => {
                if(error){
                    res.send(error);
                }
                let token = generateJWTToken(user.toJSON());
                return res.json({ user, token });
            });
        })(req, res);
    });
}