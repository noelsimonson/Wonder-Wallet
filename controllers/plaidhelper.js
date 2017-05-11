module.exports = function(app){

	var envvar = require('envvar');
	//var express = require('express');
	var bodyParser = require('body-parser');
	var moment = require('moment');
	var plaid = require('plaid');

	var PLAID_CLIENT_ID = '5907a8f6bdc6a458a5a63ade';
	var PLAID_SECRET = '087361ead1dc6b3db7ffa7875f1035';
	var PLAID_PUBLIC_KEY = '8a89536dadfc47fd49e8c66bb880d6';
	var PLAID_ENV = 'sandbox';

	// We store the access_token in memory - in production, store it in a secure
	// persistent data store
	var ACCESS_TOKEN = null;
	var PUBLIC_TOKEN = null;

	// Initialize the Plaid client
	var client = new plaid.Client(
	  PLAID_CLIENT_ID,
	  PLAID_SECRET,
	  PLAID_PUBLIC_KEY,
	  plaid.environments[PLAID_ENV]
	);

	//var app = express();
	// app.use(express.static('public'));
	// app.set('view engine', 'ejs');
	// app.use(bodyParser.urlencoded({
	//   extended: false
	// }));
	// app.use(bodyParser.json());

	// app.get('/', function(request, response, next) {
	//   response.render('index.ejs', {
	//     PLAID_PUBLIC_KEY: PLAID_PUBLIC_KEY,
	//     PLAID_ENV: PLAID_ENV,
	//   });
	// });

	app.post('/get_access_token', function(request, response, next) {
	  PUBLIC_TOKEN = request.body.public_token;
	  client.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
	    if (error != null) {
	      var msg = 'Could not exchange public_token!';
	      console.log(msg + '\n' + error);
	      return response.json({
	        error: msg
	      });
	    }
	    ACCESS_TOKEN = tokenResponse.access_token;
	    console.log('Access Token: ' + ACCESS_TOKEN);
	    response.json({
	      'error': false
	    });
	  });
	});

	app.post('/set_access_token', function(request, response, next) {
	  ACCESS_TOKEN = request.body.access_token;
	  console.log('Access Token: ' + ACCESS_TOKEN);
	  response.json({
	    'error': false
	  });
	});

	app.get('/accounts', function(request, response, next) {
	  // Retrieve high-level account information and account and routing numbers
	  // for each account associated with the Item.
	  client.getAuth(ACCESS_TOKEN, function(error, authResponse) {
	    if (error != null) {
	      var msg = 'Unable to pull accounts from the Plaid API.';
	      console.log(msg + '\n' + error);
	      return response.json({
	        error: msg
	      });
	    }

	    console.log(authResponse.accounts);
	    response.json({
	      error: false,
	      accounts: authResponse.accounts,
	      numbers: authResponse.numbers,
	    });
	  });
	});

	app.post('/item', function(request, response, next) {
	  // Pull the Item - this includes information about available products,
	  // billed products, webhook information, and more.
	  var itemResponse;

	  var getInstitutionCB = function(error, iRes) {
	    if (error != null) {
	      //console.log(JSON.stringify(error));
	      return response.json({
	        error: error
	      });
	    }

	    itemResponse = iRes;

	    // Also pull information about the institution
	    client.getInstitutionById(itemResponse.item.institution_id, getItemResponseCB);
	  };

	  var getItemResponseCB = function(err, instRes) {
	      if (err != null) {
	        var msg = 'Unable to pull institution information from the Plaid API.';
	        console.log(msg + '\n' + error);
	        return response.json({
	          error: msg
	        });
	      } else {
	        response.json({
	          item: itemResponse.item,
	          institution: instRes.institution,
	        });
	      }
	  };

	  client.getItem(ACCESS_TOKEN, getInstitutionCB);

	}); // end POST to /item

	app.post('/transactions', function(request, response, next) {

	  // Pull transactions for the Item for the last 30 days
	  var startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
	  var endDate = moment().format('YYYY-MM-DD');
	  client.getTransactions(ACCESS_TOKEN, startDate, endDate, {
	    count: 250,
	    offset: 0,
	  }, function(error, transactionsResponse) {
	    if (error != null) {
	      console.log(JSON.stringify(error));
	      console.log(error.error_code + ': ' + error.error_message);
	      return response.json({
	        error: error
	      });
	    }
	    console.log('pulled ' + transactionsResponse.transactions.length + ' transactions');
	    console.log(transactionsResponse.transactions);

	    response.json(transactionsResponse);
	  });
	});

	app.post('/income', function(request, response){

	 // Handle err
	 //var income = result.income;
	  client.getIncome(ACCESS_TOKEN, function(err, result) {
	   // Handle err
	   //var income = result.income;
	   console.log(response);
	   console.log("-----------------");
	   console.log(response.income);
	   //response.json(income);
	  });

	});

} // end module
