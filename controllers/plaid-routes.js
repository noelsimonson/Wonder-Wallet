var moment = require('moment');
const plaid = require('plaid');

var plaidClient = require('../config/plaidConnection.js');

var ACCESS_TOKEN = null;
var PUBLIC_TOKEN = null;

module.exports = function(app) {

  app.post('/get_access_token', function(request, response, next) {
    PUBLIC_TOKEN = request.body.public_token;
    console.log('public token ' + PUBLIC_TOKEN);
    plaidClient.client.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
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
    res.render('./layouts/dashboard.ejs', { user: req.user });
  });

  app.get('/accounts', function(request, response, next) {
    // Retrieve high-level account information and account and routing numbers
    // for each account associated with the Item.
     plaidClient.client.getAuth(ACCESS_TOKEN, function(error, authResponse) {
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
      plaidClient.client.getInstitutionById(itemResponse.item.institution_id, getItemResponseCB);
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

    plaidClient.client.getItem(ACCESS_TOKEN, getInstitutionCB);

  }); // end POST to /item

  app.post('/transactions', function(request, response, next) {

    //webHooks.trigger('shortname1', 200, {data: 123})

    // Pull transactions for the Item for the last 30 days
    var startDate = moment().subtract(60, 'days').format('YYYY-MM-DD');
    var endDate = moment().format('YYYY-MM-DD');
    plaidClient.client.getTransactions(ACCESS_TOKEN, startDate, endDate, {
      count: 50,
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
    plaidClient.client.getIncome(ACCESS_TOKEN, function(err, result) {
     // Handle err
     //var income = result.income;
     console.log(response);
     console.log("-----------------");
     console.log(response.income);
     //response.json(income);
    });

  });

}