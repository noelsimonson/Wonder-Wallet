var User = require('../models/user');

var plaidClient = require('../config/plaidConnection.js');

var data = require('../models/bankdata');

module.exports = function(app, passport){
	app.get('/', function(req, res){
<<<<<<< HEAD
<<<<<<< HEAD
		res.render('./layouts/index.ejs')
	});
	app.get('/home', isLoggedIn, function(req, res){
		res.render('./layouts/home.ejs', { user: req.user });
	}); 
=======
		res.render('./layouts/index.ejs');
=======
		res.render('./layouts/index.ejs')
>>>>>>> origin/develop
	});
	app.get('/home', function(req, res){
		res.render('./layouts/home.ejs');
	});
>>>>>>> 41cc5157284d9008e65f1a518b6fbe1ea7625f18
	app.get('/dashboard', isLoggedIn, function(req, res){
		res.render('./layouts/dashboard.ejs', { user: req.user });
	}); 

	app.get('/insights/:mo', isLoggedIn, function(req, res){
	    res.render('./layouts/insights.ejs', 
			{ user: req.user,
			  account: data.account,
			  categories: data.categories,
			  transactions: data.transactions
	
	            })
	});
	app.get('/insights', isLoggedIn, function(req, res){

	    res.render('./layouts/insights.ejs', 
			{ user: req.user,
			  account: data.account,
			  categories: data.categories,
			  transactions: data.transactions
	
	            })
	});
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));

	app.get('/signup', function(req, res){
		res.render('./layouts/signup.ejs', { message: req.flash('signupMessage') });
	});

	app.get('/login', function(req, res){
		res.render('./layouts/login.ejs', { message: req.flash('signupMessage') });
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

<<<<<<< HEAD
<<<<<<< HEAD
=======

	// app.get('/dashboard', isLoggedIn, function(req, res){
	// 	res.render('./layouts/dashboard.ejs', { user: req.user });
	// });

	app.get('/dashboard', isLoggedIn, function(req, res){
		res.render('./layouts/dashboard.ejs', { user: req.user });
	});

	app.get('/goals', isLoggedIn, function(req, res){
		res.render('./layouts/goals.ejs', { user: req.user });
	});

>>>>>>> 41cc5157284d9008e65f1a518b6fbe1ea7625f18
=======
>>>>>>> origin/develop
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
