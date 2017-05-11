var User = require('../models/user');

var plaidClient = require('../config/plaidConnection.js');

module.exports = function(app, passport){
	app.get('/', function(req, res){
		res.render('./layouts/index.ejs')
	});
	app.get('/insights', isLoggedIn, function(req, res){
		res.render('./layouts/insights.ejs', { user: req.user });
	});

	app.get('/login', function(req, res){
		res.render('./layouts/login.ejs', { message: req.flash('loginMessage') });
	});
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));

	app.get('/signup', function(req, res){
		res.render('./layouts/signup.ejs', { message: req.flash('signupMessage') });
	});


	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/login',
		failureRedirect: '/signup',
		failureFlash: true
	}));

	app.get('/profile', isLoggedIn, function(req, res){
		res.render('./layouts/profile.ejs', 
			{ user: req.user,    
				PLAID_PUBLIC_KEY: plaidClient.client.public_key,
    			PLAID_ENV: 'sandbox', 
    		});
	});

	app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

	app.get('/auth/google/callback', 
	  passport.authenticate('google', { successRedirect: '/dashboard',
	                                      failureRedirect: '/' }));


	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	})
};

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}

	res.redirect('/login');
}