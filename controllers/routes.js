var User = require('../models/user');

module.exports = function(app, passport){
	app.get('/', function(req, res){
		res.render('./layouts/index.ejs');
	});

	app.get('/dashboard', isLoggedIn, function(req, res){
		res.render('./layouts/dashboard.ejs', { user: req.user });
	}); 

	app.get('/insights',  function(req, res){

		var account = [
			{ name: 'checking',
			  data: [1000, 3300, 4244, 5858, 9999, 2726]
			},
			{ name: 'Plaid Credit',
			  data: [1050, 300, 244, 588, 999, 226]
			}
			 ];
		var categories = [
			{ name: 'Entertainment',
			  total: 400		
			},
			{ name: 'Groceries',
			  total: 2000	
			},
			{ name: 'Mortgage',
			  total: 4000	
			},
			{ name: 'Utilities',
			  total: 100	
			}
			];
	    res.render('./layouts/insights.ejs', 
			{ user: req.user,
			  account: account,
			  categories: categories
	
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


	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/login',
		failureRedirect: '/signup',
		failureFlash: true
	}));

	app.get('/profile', isLoggedIn, function(req, res){
		res.render('./layouts/profile.ejs', { user: req.user });
	});

	app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

	app.get('/auth/facebook/callback', 
	  passport.authenticate('facebook', { successRedirect: '/profile',
	                                      failureRedirect: '/' }));

	app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

	app.get('/auth/google/callback', 
	  passport.authenticate('google', { successRedirect: '/profile',
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