const envvar = require('envvar');
const plaid = require('plaid');

//var PLAID_CLIENT_ID = envvar.string('PLAID_CLIENT_ID');
//var PLAID_SECRET = envvar.string('PLAID_SECRET');
//var PLAID_PUBLIC_KEY = envvar.string('PLAID_PUBLIC_KEY');
//var PLAID_ENV = envvar.string('PLAID_ENV', 'sandbox');

var PLAID_CLIENT_ID = '5907a8f6bdc6a458a5a63ade';
var PLAID_SECRET = '087361ead1dc6b3db7ffa7875f1035';
var PLAID_PUBLIC_KEY = '8a89536dadfc47fd49e8c66bb880d6';
var PLAID_ENV = 'sandbox';

var client = new plaid.Client(

	PLAID_CLIENT_ID,
	PLAID_SECRET,
	PLAID_PUBLIC_KEY,
	plaid.environments[PLAID_ENV]
);

module.exports.client = client;

