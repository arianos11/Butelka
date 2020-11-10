const db = require('./db');

module.exports = {
    ensureAuthenticated: function(req, res, next) {
        console.log("Auth");
        if(req.isAuthenticated()) {
            db.query(`SELECT passwordDate FROM users WHERE id = ${req.user.id}`, (err, data) => {
                if(err) throw err;
                console.log(data[0].passwordDate, new Date(req.user.logginDate));
                if(data[0].passwordDate > new Date(req.user.logginDate)) {
                    console.log('if');
                    return res.redirect('/user/logout');
                } else {
                    console.log('else');
                    return next();
                }
                
            })
        } else {
        return res.redirect('/user/login');
        }
    },

    moderatorAuth: function(req, res, next) {
        console.log("modAuth");
        if(req.isAuthenticated()) {
            if(req.user.permission < 7) {
                req.flash('error_msg', "You do not have access to this page");
                res.redirect('/account');
            }
            return next();
        }
        res.redirect('/user/login');
    },

    adminAuth: function(req, res, next) {
        console.log("adminAuth");
        if(req.isAuthenticated()) {
            console.log(req.user);
            if(req.user.permission !== 10) {
                res.redirect('/account');
            }
            return next();
        }
        res.redirect('/user/login');
    }
}