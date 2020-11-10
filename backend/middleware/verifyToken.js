const jwt = require('jsonwebtoken');
const db = require('../config/db');

module.exports = function(req, res, next) {

  const bearerHeader = req.headers['authorization'];

  if(typeof bearerHeader !== 'undefined') {

    const bearer = bearerHeader.split(' ');

    const bearerToken = bearer[0];

    jwt.verify(bearerToken, 'SECRET-key-kurwa-321', (err, authData) => {
        if(err) {
        res.json({status: 'failed', message: 'Token expired'});
        } else {
          db.query(`SELECT User_update_date FROM users WHERE User_id = ${authData.userData.User_id}`, (err, result) => {
            if(err) throw err;
            if(new Date(result[0].User_update_date) > new Date(authData.userData.logginDate)) {
                res.json({status: 'failed', message: 'Password change'});
            } else {
                req.tokenData = authData;
                next();
            }
          })
        }
    });
  } else {
    // Forbidden
    res.json({status: 'failed', message: 'Token error'});
  }
}