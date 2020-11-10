const express = require('express');
const router = express.Router();
const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');

/* POST login */
router.post('/login', function(req, res, next) {
    try {
        if(!validator.isEmail(req.body.email)) {throw 'email error'};
        db.query(`SELECT User_id, User_email, User_password FROM users WHERE User_email = '${req.body.email}'`,
        ((err, user) => {
            if (user.length !== 1) {
                return res.json({ status: 'failed', message: 'That email is not registered' });
            }
            // Match password
            bcrypt.compare(req.body.password, user[0].User_password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                delete user[0].User_password;
                delete user[0].User_email;
                userData = {
                ...user[0],
                logginDate: new Date()
                }
                jwt.sign({userData}, 'SECRET-key-kurwa-321', { expiresIn: '120s' }, (err, token) => {
                    if(err) throw err;
                    return res.json({ status: 'success', token });
                })
            } else {
                return res.json({ status: 'failed', message: 'Password incorrect' });
            }
            });
        }));
        } catch(err) {
            console.log(err);
            res.json({ status: 'failed', message: err})
        }
});

// POST register
router.post('/register', function(req, res, next) {
    try {
        if(!validator.isEmail(req.body.email)) {return res.json({ status: 'failed', code: 403, message: 'Email error' })};
        db.query(`SELECT User_email FROM users WHERE User_email = '${req.body.email}'`,
        ((err, user) => {
            if (user.length === 1) {
                return res.json({ status: 'failed', code: 403, message: 'That email is registered' });
            }
            if(req.body.firstName === undefined || req.body.firstName === "" ) { return res.json({ status: 'failed', code: 403, message: 'First name is required' })};
            if(req.body.lastName === undefined || req.body.lastName === "" ) { return res.json({ status: 'failed', code: 403, message: 'Last name is required' })};
            let userData = {
                User_first_name: req.body.firstName.toString(),
                User_last_name: req.body.lastName.toString(),
                User_adress: req.body.adress ? req.body.adress.toString() : "",
                User_city: req.body.city ? req.body.city.toString() : "",
                User_postal_code: req.body.postalCode ? req.body.postalCode.toString() : "",
                User_country: req.body.country ? req.body.country.toString() : "",
                User_tel: req.body.tel ? req.body.tel.toString() : "",
                User_email: req.body.email.toString(),
                User_password: "",
                User_create_date: new Date(),
                User_update_date: new Date()
            }
            bcrypt.genSalt(12, function(err, salt) {
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                    userData.User_password = hash;
                    db.query(`INSERT INTO users SET ?`, userData, (err) => {
                        if (err) throw err;
                        return res.json({ status: 'success', code: 200, message: 'Kurwa udało się'});
                    })
                });
            });            
        }));
    } catch(err) {
        console.log(err);
        return res.json(err);
    }
});

module.exports = router;