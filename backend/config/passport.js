const LocalStrategy = require('passport-local').Strategy;
const db = require('./db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      try{
      db.query(`SELECT User_id, User_email, User_password FROM users WHERE email = '${email}'`,
      ((err, user) => {
        if (user.length !== 1) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        bcrypt.compare(password, user[0].User_password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            delete user[0].password;
            userData = {
              ...user[0],
              logginDate: new Date()
            }
            return done(null, userData);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      }));
    } catch(err) {
        console.log(err);
    }
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(userData, done) {
    db.query(`SELECT id FROM users WHERE id = ${userData.id}`, (err, user) => {
      if(err) throw err;
      done(err, userData);
    });
  });
};